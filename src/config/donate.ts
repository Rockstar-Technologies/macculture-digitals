// Path of the QR code image that points to the banking information
// (e.g. "/images/donate-qr.png"). Empty until the owner supplies it.
export const donateQrImage = "";

// Public supporters, shown on the Donate page once the list has an entry.
export type Supporter = { name: string; url?: string; logo?: string };
export const supporters: Supporter[] = [];
