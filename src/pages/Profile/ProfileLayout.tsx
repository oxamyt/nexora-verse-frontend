import { Navbar } from "@/components/navbar/Navbar";

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-custom-1">
      <main className="w-full flex-grow flex flex-col items-center pb-14 lg:pb-0 lg:pl-64">
        <div className="w-full max-w-4xl lg:px-4">{children}</div>
      </main>
      <Navbar />
    </div>
  );
}
