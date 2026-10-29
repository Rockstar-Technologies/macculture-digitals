type MailtoOptions = {
  to: string;
  cc?: string;
  subject?: string;
  body?: string;
};

export function mailto({ to, cc, subject, body }: MailtoOptions): string {
  const params: string[] = [];
  if (cc) params.push(`cc=${encodeURIComponent(cc)}`);
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${to}${params.length ? `?${params.join("&")}` : ""}`;
}
