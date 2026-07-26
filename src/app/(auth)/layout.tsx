import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-40">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-secondary blur-[120px]" />
        <div className="absolute top-[60%] -right-[5%] h-[30%] w-[30%] rounded-full bg-primary/40 blur-[100px]" />
      </div>

      <main className="relative z-10 flex flex-grow items-center justify-center px-5 py-12 md:px-16">
        <div className="w-full max-w-[480px] rounded-xl border border-outline-variant/20 bg-card p-8 shadow-[0_32px_64px_rgba(74,74,74,0.08)] md:p-12">
          <div className="mb-10 text-center">
            <Link href="/" className="inline-block">
              <h1 className="font-heading text-4xl font-bold text-gold md:text-5xl">
                SnapRelay
              </h1>
            </Link>
            <p className="mt-2 text-sm font-semibold tracking-[0.1em] text-muted-foreground uppercase">
              Photography Suite
            </p>
          </div>
          {children}
        </div>
      </main>

      <footer className="relative z-10 mt-auto w-full border-t border-outline-variant/20 bg-card px-5 py-8 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6">
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
          </div>
          <p className="text-sm text-muted-foreground/70">
            © {new Date().getFullYear()} SnapRelay. A Digital Heirloom Experience.
          </p>
        </div>
      </footer>
    </div>
  );
}
