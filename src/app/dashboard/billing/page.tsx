import { CreditCard } from "lucide-react";
import { ComingSoonPage } from "@/components/shared/coming-soon";

export default function BillingPage() {
  return (
    <ComingSoonPage
      title="Billing"
      icon={CreditCard}
      description="Plan details, usage, and Razorpay checkout are coming in the next build phase."
    />
  );
}
