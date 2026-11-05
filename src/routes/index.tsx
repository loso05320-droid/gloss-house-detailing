import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, Copy, MessageSquare, Phone, Sparkles } from "lucide-react";

import heroCar from "@/assets/hero-car.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT,
  SERVICES,
  buildBookingMessage,
  smsLink,
  validateBooking,
  type BookingRequest,
} from "@/lib/booking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gloss House — Car Detailing with a Mirror Finish" },
      {
        name: "description",
        content:
          "Gloss House details cars inside and out. See services, how it works, and request a booking.",
      },
      { property: "og:title", content: "Gloss House — Car Detailing with a Mirror Finish" },
      {
        property: "og:description",
        content: "Hand wash, interior detail, paint correction and protection. Request a booking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    name: "Signature Hand Wash",
    blurb: "A careful two-bucket wash that leaves paint clean, dry and glossy.",
    points: ["Foam pre-soak", "Hand wash & dry", "Wheels & tyres dressed"],
  },
  {
    name: "Interior Detail",
    blurb: "Cabin refreshed from carpets to vents.",
    points: ["Deep vacuum", "Seats & surfaces cleaned", "Glass streak-free"],
  },
  {
    name: "Paint Correction",
    blurb: "Machine polishing to lift swirls and restore depth.",
    points: ["Paint inspection", "Swirl reduction", "Finishing polish"],
  },
  {
    name: "Ceramic Protection",
    blurb: "A durable layer that keeps the gloss and sheds water.",
    points: ["Surface prep", "Coating applied", "Care advice"],
  },
];

const steps = [
  { title: "Request", text: "Fill in the form below and send it by text." },
  { title: "Confirm", text: "Gloss House replies to confirm the time and details." },
  { title: "Detail", text: "Your car gets the full treatment, unhurried." },
  { title: "Hand back", text: "A walk-around together before you drive off." },
];

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-display text-2xl tracking-wide">
          Gloss <span className="text-gradient-champagne italic">House</span>
        </a>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <a href="#services" className="hover:text-primary">Services</a>
          <a href="#reviews" className="hover:text-primary">Reviews</a>
          <a href="#process" className="hover:text-primary">Process</a>
        </nav>
        <Button asChild variant="gold" size="sm" className="px-5">
          <a href="#book">Book</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroCar}
          alt="Black sedan with a polished finish under a beam of warm light"
          width={1920}
          height={1088}
          className="h-full w-full object-cover object-[70%_center]"
        />
        <div className="gloss-sheen" aria-hidden />
        <div className="absolute inset-0 bg-gradient-fade" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" aria-hidden />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-32 md:pb-28">
        <p className="eyebrow animate-rise">Car detailing · By appointment</p>
        <h1 className="mt-5 max-w-2xl text-5xl leading-[0.95] animate-rise [animation-delay:120ms] md:text-7xl lg:text-8xl">
          Paint that <em className="text-gradient-champagne">holds the light.</em>
        </h1>
        <p className="mt-6 max-w-md text-base text-muted-foreground animate-rise [animation-delay:240ms] md:text-lg">
          Careful, punctual detailing for people who notice the difference.
        </p>
        <div className="mt-9 flex flex-wrap gap-3 animate-rise [animation-delay:360ms]">
          <Button asChild variant="gold" size="xl">
            <a href="#book">Request a booking</a>
          </Button>
          <Button asChild variant="ghostGold" size="xl">
            <a href={`tel:${CONTACT.phoneE164}`}>
              <Phone /> {CONTACT.phoneDisplay}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-14 max-w-xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl md:text-5xl">{title}</h2>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHead eyebrow="Services" title="Four ways to bring the shine back." />
      <div className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-2">
        {services.map((s, i) => (
          <article key={s.name} className="group bg-card p-8 transition-colors hover:bg-secondary md:p-10">
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl">{s.name}</h3>
              <span className="font-display text-xl italic text-primary/60">0{i + 1}</span>
            </div>
            <p className="mt-3 text-muted-foreground">{s.blurb}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <Check className="size-4 text-primary" /> {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden border-y bg-card py-28">
      <div className="absolute inset-0 bg-gradient-plum" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="eyebrow">Reviews</p>
        <div className="mt-8 grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Sparkles className="size-8 text-primary" />
            <p className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              What customers keep coming back for.
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.24em] text-muted-foreground">
              Highlighted by Bret Karlovich
            </p>
          </div>
          <ul className="flex flex-wrap gap-3 md:flex-col md:items-start">
            {["Punctuality", "Professionalism"].map((t) => (
              <li
                key={t}
                className="rounded-full border border-primary/40 bg-background/40 px-6 py-3 font-display text-2xl italic text-primary"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHead eyebrow="Process" title="Simple from first text to hand-back." />
      <ol className="grid gap-10 md:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="border-t border-primary/30 pt-6">
            <span className="font-display text-5xl italic text-gradient-champagne">{i + 1}</span>
            <h3 className="mt-3 text-2xl">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const emptyForm: BookingRequest = {
  name: "",
  phone: "",
  vehicle: "",
  service: "",
  date: "",
  time: "",
  notes: "",
};

function Booking() {
  const [form, setForm] = useState<BookingRequest>(emptyForm);
  const [message, setMessage] = useState<string | null>(null);
  const [missing, setMissing] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const set = (k: keyof BookingRequest) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setMessage(null);
    setCopied(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const m = validateBooking(form);
    setMissing(m);
    setMessage(m.length ? null : buildBookingMessage(form));
  };

  const copy = async () => {
    if (!message) return;
    await navigator.clipboard.writeText(message);
    setCopied(true);
  };

  const field = "bg-background/60 h-11";

  return (
    <section id="book" className="mx-auto max-w-6xl px-6 pb-28">
      <div className="grid gap-12 rounded-3xl border bg-card p-8 shadow-card md:grid-cols-[1fr_1.3fr] md:p-14">
        <div>
          <p className="eyebrow">Booking</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Request your detail.</h2>
          <p className="mt-5 text-muted-foreground">
            Fill this in and we'll put your request together. You send it to Gloss House by text,
            and they'll reply to confirm.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <a href={`tel:${CONTACT.phoneE164}`} className="flex items-center gap-3 hover:text-primary">
              <Phone className="size-4 text-primary" /> {CONTACT.phoneDisplay}
            </a>
            {CONTACT.email && (
              <a href={`mailto:${CONTACT.email}`} className="block hover:text-primary">
                {CONTACT.email}
              </a>
            )}
            {CONTACT.address && <p className="text-muted-foreground">{CONTACT.address}</p>}
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" className={field} value={form.name} onChange={(e) => set("name")(e.target.value)} aria-invalid={missing.includes("name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Your phone *</Label>
            <Input id="phone" type="tel" className={field} value={form.phone} onChange={(e) => set("phone")(e.target.value)} aria-invalid={missing.includes("phone")} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="service">Service *</Label>
            <select
              id="service"
              value={form.service}
              onChange={(e) => set("service")(e.target.value)}
              aria-invalid={missing.includes("service")}
              className="flex h-11 w-full rounded-md border border-input bg-background/60 px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-[invalid=true]:border-destructive"
            >
              <option value="">Choose a service</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="vehicle">Vehicle</Label>
            <Input id="vehicle" placeholder="Year, make, model" className={field} value={form.vehicle} onChange={(e) => set("vehicle")(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Preferred date</Label>
            <Input id="date" type="date" className={field} value={form.date} onChange={(e) => set("date")(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Preferred time</Label>
            <Input id="time" placeholder="e.g. morning" className={field} value={form.time} onChange={(e) => set("time")(e.target.value)} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" rows={3} className="bg-background/60" value={form.notes} onChange={(e) => set("notes")(e.target.value)} />
          </div>

          {missing.length > 0 && (
            <p role="alert" className="text-sm text-destructive sm:col-span-2">
              Please add your {missing.join(", ")}.
            </p>
          )}

          <div className="sm:col-span-2">
            <Button type="submit" variant="gold" size="xl" className="w-full">
              Prepare my request
            </Button>
          </div>

          {message && (
            <div className="space-y-4 rounded-xl border border-primary/30 bg-background/50 p-5 sm:col-span-2" aria-live="polite">
              <p className="text-sm text-muted-foreground">
                Your request is ready. <strong className="text-foreground">It hasn't been sent yet</strong> — text it to Gloss House or copy it.
              </p>
              <pre className="whitespace-pre-wrap font-sans text-sm">{message}</pre>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="gold">
                  <a href={smsLink(message)}>
                    <MessageSquare /> Text it to Gloss House
                  </a>
                </Button>
                <Button type="button" variant="ghostGold" onClick={copy}>
                  {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy request"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row">
        <span className="font-display text-xl text-foreground">
          Gloss <span className="italic text-primary">House</span>
        </span>
        <a href={`tel:${CONTACT.phoneE164}`} className="hover:text-primary">{CONTACT.phoneDisplay}</a>
        <span>© {new Date().getFullYear()} Gloss House</span>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <Reviews />
      <Process />
      <Booking />
      <Footer />
    </main>
  );
}
