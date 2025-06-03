
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    < >
        <main id="authlayout" className="h-[100dvh] flex justify-center items-center" >
          <div className="max-w-[320px] w-full">
            {children}
          </div>
        </main>
      </>
  );
}
