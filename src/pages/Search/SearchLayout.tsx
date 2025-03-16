import { Navbar } from "@/components/navbar/Navbar";

export function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-custom-1">
      <main className="w-full flex-grow pb-14 lg:pb-0 mt-10 lg:pl-64">
        <div className="w-full max-w-4xl mx-auto lg:px-4">{children}</div>
      </main>
      <Navbar />
    </div>
  );
}
