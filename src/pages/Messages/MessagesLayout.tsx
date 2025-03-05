import { Navbar } from "@/components/navbar/Navbar";

export function MessagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-custom-1">
      <main className="w-full flex-grow pb-14">{children}</main>
      <Navbar />
    </div>
  );
}
