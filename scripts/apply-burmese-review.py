#!/usr/bin/env python3
"""Apply uncle's reviewed Burmese edits back into messages/my.json.

Reads:
  - messages/my.json (current state; also used to regenerate the keymap)
  - ~/Downloads/swh-burmese-review.docx (uncle's edited version)

Writes:
  - messages/my.json (in place, edits applied)
  - ~/Downloads/swh-burmese-review-changelog.md

Companion to scripts/generate-burmese-review.py. The keymap is rebuilt from
the current my.json on every run so a stale ~/Downloads keymap is never trusted.
This is only safe while no keys have been added or removed since the docx was
generated (E17.3 only edited values, so labels stay stable).

Requires: python-docx
"""
import json
import re
from collections import OrderedDict
from pathlib import Path

from docx import Document

REPO_ROOT = Path(__file__).resolve().parent.parent
MY_JSON = REPO_ROOT / "messages" / "my.json"
EDITED_DOCX = Path.home() / "Downloads" / "swh-burmese-review.docx"
CHANGELOG = Path.home() / "Downloads" / "swh-burmese-review-changelog.md"

EMPTY_MARKER = "[မရှိသေး — ထည့်ပါ]"
REF_RE = re.compile(r"^\[ကုဒ်:\s*(.+?)\s*\]$")
ENTRY_RE = re.compile(r"^(\d+[a-z]?)\.\s+(.*)$", re.DOTALL)

# Per user instruction (Phase E18): uncle added a second phone number on this
# entry that does not match the live site. Flag, do not auto-apply.
REQUIRES_DECISION = {"contact.form.illustrativeNote"}


def build_keymap_from_json(data):
    """Replicate generate-burmese-review.py walk order to produce label->keypath."""
    keymap = OrderedDict()
    entry_counter = 0

    for section_key, section_data in data.items():
        entries = []

        def walk(node, path):
            if isinstance(node, dict):
                for k, v in node.items():
                    walk(v, path + [k])
            elif isinstance(node, list):
                parent_key = ".".join(path)
                for i, v in enumerate(node):
                    if isinstance(v, str):
                        entries.append({
                            "key": ".".join(path + [str(i)]),
                            "is_array_item": True,
                            "array_parent_key": parent_key,
                        })
                    elif isinstance(v, (dict, list)):
                        walk(v, path + [str(i)])
            elif isinstance(node, str):
                entries.append({
                    "key": ".".join(path),
                    "is_array_item": False,
                    "array_parent_key": None,
                })

        walk(section_data, [section_key])

        current_array_parent = None
        array_letter_offset = 0

        for ent in entries:
            if ent["is_array_item"]:
                if ent["array_parent_key"] != current_array_parent:
                    entry_counter += 1
                    current_array_parent = ent["array_parent_key"]
                    array_letter_offset = 0
                letter = chr(ord("a") + array_letter_offset)
                array_letter_offset += 1
                label = f"{entry_counter}{letter}"
            else:
                current_array_parent = None
                entry_counter += 1
                label = str(entry_counter)

            keymap[label] = ent["key"]

    return keymap


def parse_docx_entries(docx_path):
    """Walk docx paragraphs, return {label: plain_text_value}.

    Strips ALL run-level formatting (bold etc.) — uncle used bold as a visual
    marker for what he changed, not as part of the value.
    Ignores reference-code paragraphs (gray "[ကုဒ်: ...]" lines).
    """
    doc = Document(docx_path)
    entries = {}
    for p in doc.paragraphs:
        text = p.text.strip()
        if not text:
            continue
        if REF_RE.match(text):
            continue
        m = ENTRY_RE.match(text)
        if not m:
            continue
        label = m.group(1)
        value = m.group(2).strip()
        entries[label] = value
    return entries


def get_by_path(data, key_path):
    parts = key_path.split(".")
    node = data
    for p in parts:
        if isinstance(node, list):
            node = node[int(p)]
        else:
            node = node[p]
    return node


def set_by_path(data, key_path, value):
    parts = key_path.split(".")
    node = data
    for p in parts[:-1]:
        if isinstance(node, list):
            node = node[int(p)]
        else:
            node = node[p]
    last = parts[-1]
    if isinstance(node, list):
        node[int(last)] = value
    else:
        node[last] = value


def label_sort_key(label):
    m = re.match(r"^(\d+)([a-z]?)$", label)
    return (int(m.group(1)), m.group(2) or "")


def main():
    raw = MY_JSON.read_text(encoding="utf-8")
    data = json.loads(raw, object_pairs_hook=OrderedDict)

    keymap = build_keymap_from_json(data)
    parsed = parse_docx_entries(EDITED_DOCX)

    applied = []
    skipped_identical = []
    skipped_empty = []
    requires_decision = []
    not_in_doc = []
    extras_in_doc = []

    for label, key_path in keymap.items():
        if label not in parsed:
            not_in_doc.append((label, key_path))
            continue

        new_value = parsed[label]
        current = get_by_path(data, key_path)

        # Uncle skipped: still empty marker or blank — leave current untouched.
        if EMPTY_MARKER in new_value or new_value == "":
            skipped_empty.append((label, key_path))
            continue

        if new_value == current:
            skipped_identical.append((label, key_path))
            continue

        if key_path in REQUIRES_DECISION:
            requires_decision.append({
                "label": label, "key_path": key_path,
                "old": current, "new": new_value,
            })
            continue

        applied.append({
            "label": label, "key_path": key_path,
            "old": current, "new": new_value,
        })

    for label in parsed:
        if label not in keymap:
            extras_in_doc.append(label)

    # Sort applied/decision by entry-label order for changelog readability.
    applied.sort(key=lambda c: label_sort_key(c["label"]))
    requires_decision.sort(key=lambda c: label_sort_key(c["label"]))

    # Apply changes
    for change in applied:
        set_by_path(data, change["key_path"], change["new"])

    new_text = json.dumps(data, ensure_ascii=False, indent=2)
    if raw.endswith("\n"):
        new_text += "\n"
    MY_JSON.write_text(new_text, encoding="utf-8")

    # --- Changelog ---
    lines = []
    lines.append("# Burmese Review Changelog — Phase E18")
    lines.append("")
    lines.append(f"Source docx: `{EDITED_DOCX}`")
    lines.append(f"Target JSON: `{MY_JSON.relative_to(REPO_ROOT)}`")
    lines.append("")
    lines.append("## Summary")
    lines.append(f"- Total keymap entries:     {len(keymap)}")
    lines.append(f"- Entries parsed from docx: {len(parsed)}")
    lines.append(f"- Changes APPLIED:          {len(applied)}")
    lines.append(f"- REQUIRES_DECISION:        {len(requires_decision)}")
    lines.append(f"- Skipped (identical):      {len(skipped_identical)}")
    lines.append(f"- Skipped (still empty):    {len(skipped_empty)}")
    lines.append(f"- Missing from docx:        {len(not_in_doc)}")
    lines.append(f"- Extras in docx, no key:   {len(extras_in_doc)}")
    lines.append("")

    if requires_decision:
        lines.append("## REQUIRES_DECISION — not auto-applied")
        lines.append("")
        for r in requires_decision:
            lines.append(f"### Entry {r['label']} — `{r['key_path']}`")
            lines.append("")
            lines.append("**OLD (current my.json):**")
            lines.append("")
            lines.append("```")
            lines.append(r["old"] if r["old"] != "" else "(empty)")
            lines.append("```")
            lines.append("")
            lines.append("**NEW (uncle proposed):**")
            lines.append("")
            lines.append("```")
            lines.append(r["new"])
            lines.append("```")
            lines.append("")

    if applied:
        lines.append("## Applied changes")
        lines.append("")
        for c in applied:
            lines.append(f"### Entry {c['label']} — `{c['key_path']}`")
            lines.append("")
            lines.append("**OLD:**")
            lines.append("")
            lines.append("```")
            lines.append(c["old"] if c["old"] != "" else "(empty)")
            lines.append("```")
            lines.append("")
            lines.append("**NEW:**")
            lines.append("")
            lines.append("```")
            lines.append(c["new"])
            lines.append("```")
            lines.append("")

    if skipped_empty:
        lines.append("## Skipped — uncle did not fill in")
        lines.append("")
        for label, kp in skipped_empty:
            lines.append(f"- {label}  `{kp}`")
        lines.append("")

    if not_in_doc:
        lines.append("## Keymap entries with no matching docx paragraph")
        lines.append("")
        for label, kp in not_in_doc:
            lines.append(f"- {label}  `{kp}`")
        lines.append("")

    if extras_in_doc:
        lines.append("## Docx labels with no keymap entry")
        lines.append("")
        for label in extras_in_doc:
            lines.append(f"- {label}")
        lines.append("")

    CHANGELOG.write_text("\n".join(lines), encoding="utf-8")

    print(f"Applied:           {len(applied)}")
    print(f"Requires decision: {len(requires_decision)}")
    print(f"Skipped identical: {len(skipped_identical)}")
    print(f"Skipped empty:     {len(skipped_empty)}")
    print(f"Missing from doc:  {len(not_in_doc)}")
    print(f"Extras in doc:     {len(extras_in_doc)}")
    print(f"Changelog: {CHANGELOG}")


if __name__ == "__main__":
    main()
