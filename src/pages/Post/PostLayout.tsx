import { Navbar } from "@/components/navbar/Navbar";

export function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-custom-1">
      <main className="w-full flex-grow">{children}</main>
      <Navbar />
    </div>
  );
}
