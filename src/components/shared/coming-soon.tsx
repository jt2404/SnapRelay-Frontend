import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

export function ComingSoonPage({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div>
      <PageHeader title={title} />
      <EmptyState
        icon={icon}
        title="Coming soon"
        description={description}
      />
    </div>
  );
}
