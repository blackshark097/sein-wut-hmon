import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type RenderArgs = {
  eyebrow: string;
  title: string;
  photoPath?: string;
};

const NAVY = "#0A0F1C";
const NAVY_DEEP = "#070B15";
const CYAN = "#00ADEE";
const TEXT = "#F0F0F0";
const TEXT_MUTED = "#9CA3AF";

async function loadPhoto(photoPath?: string) {
  if (!photoPath) return null;
  try {
    const buf = await readFile(join(process.cwd(), "public", photoPath));
    const ext = photoPath.toLowerCase().endsWith(".png") ? "png" : "jpeg";
    return `data:image/${ext};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function renderOgCard({ eyebrow, title, photoPath }: RenderArgs) {
  const photoSrc = await loadPhoto(photoPath);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: NAVY,
          position: "relative",
        }}
      >
        {photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoSrc}
            alt=""
            width={OG_SIZE.width}
            height={OG_SIZE.height}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.32,
            }}
          />
        ) : null}

        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(10,15,28,0.75) 0%, rgba(10,15,28,0.92) 70%, ${NAVY_DEEP} 100%)`,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            padding: "72px 80px",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 8,
                height: 48,
                background: CYAN,
              }}
            />
            <span
              style={{
                color: CYAN,
                fontSize: 24,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {eyebrow}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxWidth: 980,
            }}
          >
            <div
              style={{
                color: TEXT,
                fontSize: 84,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                fontWeight: 700,
              }}
            >
              {title}
            </div>
            <div
              style={{
                color: TEXT_MUTED,
                fontSize: 26,
                letterSpacing: "0.04em",
              }}
            >
              Sein Wut Hmon Group
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              color: TEXT_MUTED,
              fontSize: 22,
              letterSpacing: "0.08em",
            }}
          >
            <span>Yangon · Myanmar</span>
            <span style={{ color: CYAN, letterSpacing: "0.12em" }}>SWH</span>
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
