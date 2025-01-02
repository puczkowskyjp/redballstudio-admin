import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <>
      <header className="p-4 bg-white flex flex-row gap-x-2 shadow-sm items-center">
        Redball Studio Admin
      </header>
      <main className="p-4 pt-0 mx-auto w-full min-h-screen bg-[#f4f4f4]">
        <Outlet />
      </main>
    </>
  );
}
