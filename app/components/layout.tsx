import { Navbar, Sidebar } from "flowbite-react";
import {
  HomeIcon,
  ChartPieIcon,
  BuildingLibraryIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

import logo from "~/assets/images/logo.svg";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <Navbar className="fixed w-full border-y border-gray-700 z-10">
        <Navbar.Brand>
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Control Money
          </span>
        </Navbar.Brand>
      </Navbar>

      <div className="flex h-full bg-gray-900 pt-14">
        <Sidebar
          aria-label="Sidebar with options to control pages"
          className="h-full fixed top-14 left-0 w-64 hidden md:block border-r border-gray-700"
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HomeIcon} href="/dashboard">
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item icon={TagIcon} href="/category">
                Categorias
              </Sidebar.Item>
              <Sidebar.Item icon={BuildingLibraryIcon} href="#">
                Contas
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={ChartPieIcon}>
                Transações
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <main className="w-full ml-64 p-5 text-white">{children}</main>
      </div>
    </div>
  );
}
