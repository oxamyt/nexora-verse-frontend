export function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center min-h-screen l bg-custom-3">
      <main className=" w-full">{children}</main>
    </div>
  );
}
