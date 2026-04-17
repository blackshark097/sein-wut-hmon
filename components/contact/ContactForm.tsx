"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const inputClass =
  "mt-2 w-full rounded-md border border-border/70 bg-bg px-4 py-3 text-text placeholder-text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold/60 transition";
const labelClass = "text-subheading text-gold";

export function ContactForm() {
  const reduce = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  const formBlock = (
    <>
      <span className="text-subheading text-gold">Send a note</span>
      <h2
        id="contact-form-heading"
        className="mt-4 text-heading text-text"
      >
        Write to the head office
      </h2>

      {sent ? (
        <div
          aria-live="polite"
          className="mt-10 rounded-md border border-border/60 bg-bg p-8"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 text-gold">
              <Check className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="font-display text-2xl text-text">Message queued</h3>
          </div>
          <p className="mt-4 text-body text-text-muted">
            Thanks. The form isn&apos;t wired to a backend yet, but the address, phone, and email above reach the right desk.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-6 text-sm uppercase tracking-[0.12em] text-gold transition hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Send another
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8" noValidate={false}>
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                minLength={2}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={inputClass}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className={labelClass}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className={labelClass}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={inputClass}
                placeholder="How can we help?"
              />
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#0A0F1C] transition hover:bg-[#d4b762] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60"
              >
                Send Message
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </form>

          <p className="mt-6 text-caption">
            We typically respond within 2 business days.
          </p>
        </>
      )}
    </>
  );

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="relative bg-bg-elev py-20 md:py-28"
    >
      {reduce ? (
        <div className="mx-auto max-w-3xl px-6 md:px-10">{formBlock}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-3xl px-6 md:px-10"
        >
          {formBlock}
        </motion.div>
      )}
    </section>
  );
}

export default ContactForm;
