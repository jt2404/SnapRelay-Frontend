"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUser, registerUser } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { createStudio } from "@/lib/api/studios";
import { useAuth } from "@/lib/hooks/use-auth";
import { slugify } from "@/lib/slugify";
import { registerSchema, type RegisterValues } from "@/lib/validation/auth";

async function createStudioAccount(values: RegisterValues) {
  const slug = `${slugify(values.studioName)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;

  const studio = await createStudio({ name: values.studioName, slug });

  await registerUser({
    studio_id: studio.id,
    name: values.name,
    email: values.email,
    password: values.password,
  });

  return loginUser({ email: values.email, password: values.password });
}

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuth();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      studioName: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createStudioAccount,
    onSuccess: (token) => {
      setAuth(token.access_token, token.user);
      toast.success("Studio account created");
      router.push("/dashboard");
    },
    onError: (error) => {
      const message =
        error instanceof ApiError
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    },
  });

  function onSubmit(values: RegisterValues) {
    mutation.mutate(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="studioName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  Studio Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Ethereal Union Studios" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  Your Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Priya Sharma"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="e.g. hello@studio.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-12 w-full rounded-lg text-base font-semibold"
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Loader2 className="animate-spin" />}
            Create Studio Account
          </Button>
        </form>
      </Form>

      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
