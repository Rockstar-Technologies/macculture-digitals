"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/config/site";
import { mailto } from "@/lib/mailto";
import { Button } from "@/components/ui/Button";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Stopgap until an email-list provider is chosen: submitting opens a prefilled
// email to the founder. Swap the body of `onSubmit` for a provider call later;
// the form UI stays the same.
export function NewsletterForm() {
  const t = useTranslations("media.newsletter");
  const locale = useLocale();
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "sent">("idle");

  return (
    <form
      noValidate
      className="max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        if (!EMAIL.test(email.trim())) {
          setStatus("invalid");
          return;
        }
        setStatus("sent");
        window.location.href = mailto({
          to: site.emails.founder,
          cc: site.emails.copy,
          subject: t("subject"),
          body: t("body", { email: email.trim(), locale }),
        });
      }}
    >
      <label htmlFor={id} className="block text-sm font-semibold text-white">
        {t("label")}
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          placeholder={t("placeholder")}
          aria-invalid={status === "invalid"}
          aria-describedby={`${id}-msg`}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          className="min-h-12 flex-1 rounded-ui bg-surface px-4 text-base text-white placeholder:text-muted focus-visible:outline-accent"
        />
        <Button type="submit">{t("submit")}</Button>
      </div>
      <p
        id={`${id}-msg`}
        role="status"
        className={`mt-3 text-sm ${status === "invalid" ? "text-accent" : "text-light"}`}
      >
        {status === "invalid" && t("invalid")}
        {status === "sent" && t("success")}
      </p>
    </form>
  );
}
