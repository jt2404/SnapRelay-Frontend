"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlanCard } from "@/components/billing/plan-card";
import { listPlans } from "@/lib/api/plans";

export default function PricingPage() {
  const plansQuery = useQuery({ queryKey: ["plans"], queryFn: listPlans });
  const plans = [...(plansQuery.data ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex h-20 w-full items-center justify-between px-6 md:px-16">
        <Link href="/" className="font-heading text-2xl font-bold text-gold">
          SnapRelay
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </nav>

      <main className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-2 block text-xs font-bold tracking-widest text-primary uppercase">
              Simple, Transparent Pricing
            </span>
            <h1 className="font-heading text-4xl font-bold text-foreground">
              Plans for every studio
            </h1>
            <p className="mt-4 text-muted-foreground">
              Storage and AI face-matching credits that scale with your
              events.
            </p>
          </div>

          {plansQuery.isLoading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-xl" />
              ))}
            </div>
          ) : plansQuery.isError ? (
            <p className="text-center text-sm text-muted-foreground">
              Could not load plans right now. Please try again shortly.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {plans.map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  highlighted={index === 1}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
