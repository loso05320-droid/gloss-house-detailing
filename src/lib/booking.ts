export const CONTACT = {
  phoneE164: "+16123864237",
  phoneDisplay: "(612) 386-4237",
  email: "",
  address: "",
};

export const SERVICES = [
  "Signature Hand Wash",
  "Interior Detail",
  "Paint Correction",
  "Ceramic Protection",
  "Not sure yet",
] as const;

export type BookingRequest = {
  name: string;
  phone: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  notes: string;
};

export function validateBooking(r: BookingRequest): string[] {
  const missing: string[] = [];
  if (!r.name.trim()) missing.push("name");
  if (!r.phone.trim()) missing.push("phone");
  if (!r.service.trim()) missing.push("service");
  return missing;
}

export function buildBookingMessage(r: BookingRequest): string {
  const lines = [
    "Gloss House booking request",
    `Name: ${r.name.trim()}`,
    `Phone: ${r.phone.trim()}`,
    `Service: ${r.service.trim()}`,
  ];
  if (r.vehicle.trim()) lines.push(`Vehicle: ${r.vehicle.trim()}`);
  if (r.date) lines.push(`Preferred date: ${r.date}`);
  if (r.time.trim()) lines.push(`Preferred time: ${r.time.trim()}`);
  if (r.notes.trim()) lines.push(`Notes: ${r.notes.trim()}`);
  return lines.join("\n");
}

export function smsLink(message: string): string {
  return `sms:${CONTACT.phoneE164}?&body=${encodeURIComponent(message)}`;
}
