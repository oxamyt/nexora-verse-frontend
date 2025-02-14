import { Toaster } from "@/components/ui/sonner";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-1">
      <main className="flex flex-col items-center justify-center space-y-8">
        {children}
      </main>
      <Toaster className="bg-custom-1" />
    </div>
  );
}
