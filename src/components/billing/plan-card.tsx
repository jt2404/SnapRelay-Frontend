import { Check } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Plan } from "@/lib/api/plans";

function formatBytes(bytes: number) {
  const gb = bytes / 1024 ** 3;
  if (gb >= 1024) return `${(gb / 1024).toFixed(gb % 1024 === 0 ? 0 : 1)} TB`;
  return `${gb.toFixed(gb % 1 === 0 ? 0 : 1)} GB`;
}

function formatPrice(paise: number, currency: string) {
  const amount = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PlanCard({
  plan,
  highlighted,
}: {
  plan: Plan;
  highlighted?: boolean;
}) {
  return (
    <Card
      className={cn(
        "relative flex h-full flex-col border-none shadow-sm",
        highlighted && "ring-2 ring-primary shadow-lg"
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          Most Popular
        </span>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <div className="mt-2">
          <span className="font-heading text-3xl font-bold text-foreground">
            {formatPrice(plan.price_paise, plan.currency)}
          </span>
          <span className="text-sm text-muted-foreground">
            {" "}
            / {plan.duration_days >= 365 ? "year" : `${plan.duration_days} days`}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <ul className="flex-1 space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <Check className="size-4 text-primary" />
            {formatBytes(plan.storage_limit_bytes)} storage
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 text-primary" />
            {plan.ai_quota.toLocaleString()} AI face-match credits
          </li>
        </ul>
        <Button className="mt-6" variant={highlighted ? "default" : "outline"} asChild>
          <Link href="/register">Get Started</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
