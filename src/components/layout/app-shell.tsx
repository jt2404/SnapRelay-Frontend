"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, LogOut, Plus } from "lucide-react";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/hooks/use-auth";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function BrandMark() {
  return (
    <Link href="/dashboard" className="flex flex-col px-1">
      <span className="font-heading text-xl leading-tight font-bold text-gold">
        SnapRelay
      </span>
      <span className="text-xs text-muted-foreground">
        Premium Management
      </span>
    </Link>
  );
}

function NewEventButton({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Button
      className="w-full justify-start rounded-lg font-semibold"
      asChild
      onClick={onNavigate}
    >
      <Link href="/dashboard/events/new">
        <Plus />
        New Event
      </Link>
    </Button>
  );
}

function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="size-9">
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {initials(user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-medium">{user.name}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            logout();
            router.push("/login");
          }}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col bg-muted/60 md:flex">
        <div className="flex h-20 items-center px-4 pt-2">
          <BrandMark />
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarNav />
        </div>
        <div className="border-t border-border/60 p-3">
          <NewEventButton />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-card/80 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3 md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-lg" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex w-64 flex-col bg-muted/60 p-0">
                <div className="flex h-20 items-center px-4 pt-2">
                  <BrandMark />
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                  <SidebarNav onNavigate={() => setMobileOpen(false)} />
                </div>
                <div className="border-t border-border/60 p-3">
                  <NewEventButton onNavigate={() => setMobileOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <span className="font-heading text-lg font-bold text-gold">
              SnapRelay
            </span>
          </div>
          <div className="hidden md:block" />
          <UserMenu />
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
