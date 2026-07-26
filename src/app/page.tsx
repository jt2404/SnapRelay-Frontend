import Link from "next/link";
import {
  CalendarPlus,
  Lock,
  MessageCircleHeart,
  QrCode,
  ScanFace,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: ScanFace,
    title: "AI Face Matching",
    description:
      "Guests take a selfie and instantly find every photo they appear in across thousands of event shots.",
  },
  {
    icon: MessageCircleHeart,
    title: "WhatsApp & Email Delivery",
    description:
      "High-resolution galleries land directly in your guests' hands. No app installs, no logins.",
  },
  {
    icon: Lock,
    title: "Private, Secure Galleries",
    description:
      "You control who sees what. Tokenized links, opt-out support, and studio-level data isolation.",
  },
];

const STEPS = [
  {
    icon: CalendarPlus,
    title: "Create an Event",
    description: "Set up a wedding, sangeet, or reception in seconds.",
  },
  {
    icon: Upload,
    title: "Upload Photos",
    description: "Bulk upload straight to secure cloud storage.",
  },
  {
    icon: QrCode,
    title: "Share the Gallery",
    description: "Generate a QR code and let guests find their photos.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <nav className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between bg-background/80 px-6 shadow-sm backdrop-blur-md md:px-16">
        <span className="font-heading text-2xl font-bold text-gold">
          SnapRelay
        </span>
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            How it Works
          </a>
          <Link
            href="/pricing"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            Pricing
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        <section className="relative flex min-h-[720px] items-center overflow-hidden px-6 md:px-16">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-secondary blur-[140px]" />
            <div className="absolute top-[40%] -right-[10%] h-[45%] w-[45%] rounded-full bg-primary/30 blur-[140px]" />
          </div>

          <div className="mx-auto max-w-3xl py-24">
            <span className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase">
              Premium Event Photo Sharing
            </span>
            <h1 className="font-heading text-4xl leading-tight font-bold text-foreground md:text-6xl md:leading-[1.1]">
              Your event memories, <br />
              <span className="text-gold italic">privately delivered.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              A digital heirloom experience for photographers and studios. Use
              AI to instantly match guests to their photos and deliver them
              straight to WhatsApp — secure, seamless, and stunningly elegant.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="h-13 rounded-lg px-8 text-base" asChild>
                <Link href="/register">Start Your Studio</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-13 rounded-lg px-8 text-base"
                asChild
              >
                <Link href="/login">Photographer Login</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="bg-card px-6 py-24 md:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="font-heading text-3xl font-semibold text-foreground">
                Experience Modern Tradition
              </h2>
              <div className="mx-auto mt-4 h-1 w-20 bg-primary" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex flex-col items-center rounded-2xl p-8 text-center transition-all duration-500 hover:bg-primary"
                >
                  <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-card">
                    <feature.icon className="size-7 text-primary" />
                  </div>
                  <h3 className="font-heading mb-3 text-xl font-semibold text-foreground group-hover:text-primary-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-6 py-24 md:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <span className="mb-2 block text-xs font-bold tracking-widest text-primary uppercase">
                For Photographers
              </span>
              <h2 className="font-heading text-3xl font-semibold text-foreground">
                Three Steps to Delighted Guests
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {STEPS.map((step, index) => (
                <div key={step.title} className="relative rounded-2xl border border-border bg-card p-8">
                  <span className="font-heading text-4xl font-bold text-primary/30">
                    0{index + 1}
                  </span>
                  <div className="mt-4 mb-5 flex size-12 items-center justify-center rounded-lg bg-secondary">
                    <step.icon className="size-5 text-secondary-foreground" />
                  </div>
                  <h3 className="font-heading mb-2 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-16">
          <div className="mx-auto max-w-4xl rounded-[32px] border border-primary/20 bg-card p-12 text-center shadow-[0_32px_64px_rgba(74,74,74,0.08)] md:p-20">
            <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">
              Preserve the Magic
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Whether you&apos;re a photographer delivering a premium
              experience or a guest waiting for your favorite shots,
              SnapRelay is your digital heirloom home.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-13 rounded-full px-10" asChild>
                <Link href="/register">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex w-full flex-col items-center gap-8 border-t border-border bg-card px-6 py-12 md:px-16">
        <span className="font-heading text-xl font-semibold text-gold">
          SnapRelay
        </span>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Contact Us
          </a>
        </div>
        <p className="text-sm text-muted-foreground/70">
          © {new Date().getFullYear()} SnapRelay. A Digital Heirloom Experience.
        </p>
      </footer>
    </div>
  );
}
