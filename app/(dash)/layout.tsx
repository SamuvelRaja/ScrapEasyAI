import Sidebar from "@/components/sidebar";


export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    < >
        <Sidebar/>
        <main className="ml-[240px] py-[68px]" id="layout">
        {children}
        </main>
      </>
  );
}
