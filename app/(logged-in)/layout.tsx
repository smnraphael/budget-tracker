import Navbar from '@/components/navbar/navbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className='mx-auto mb-12 mt-20 flex h-max w-full max-w-7xl flex-col gap-6 px-6'>
        {children}
      </div>
    </>
  );
}
