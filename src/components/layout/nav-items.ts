import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  Palette,
  Settings,
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Events", href: "/dashboard/events", icon: CalendarDays },
  { label: "Branding", href: "/dashboard/branding", icon: Palette },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
