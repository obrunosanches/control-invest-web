import { Navbar, Sidebar } from "flowbite-react";
import {
  ChartPieIcon,
  BuildingLibraryIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

import logo from "~/assets/images/logo.svg";

export default function Index() {
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Control Money
          </span>
        </Navbar.Brand>
      </Navbar>
      <div className="w-fit">
        <Sidebar aria-label="Sidebar with options to control pages">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={TagIcon} href="/category">
                Category
              </Sidebar.Item>
              <Sidebar.Item icon={BuildingLibraryIcon} href="#">
                Account
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={ChartPieIcon}>
                Transações
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </>
  );
}
