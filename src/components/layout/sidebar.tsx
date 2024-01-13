import Image from 'next/image'
import Link from 'next/link'
import { BadgeDollarSignIcon, Landmark, LayoutDashboard, Tags } from 'lucide-react'

import type { ReactNode } from 'react'

function SidebarItem({ children, ...item }: {
  id: string
  path: string
  children: ReactNode
}) {
  return (
    <li key={item.id}>
      <Link href={item.path} className="flex items-center p-3 rounded-lg hover:bg-muted">
        <div className="flex gap-4">
          {children}
        </div>
      </Link>
    </li>
  )
}

function Sidebar() {
  return (
    <aside
      className="h-full w-56 fixed border-r bg-background border-foreground[0.07]"
      aria-label="Sidebar"
    >
      <div className="flex justify-center py-4 mt-4">
        <Image src="/logo.svg" width={36} height={36} className="mr-3" alt="Control Money Logo" />
        <span className="self-center text-xl font-semibold whitespace-nowrap">Control Invest</span>
      </div>
      
      <ul className="px-3 py-4 space-y-2">
        <SidebarItem id="dashboard" path="/">
          <LayoutDashboard strokeWidth={1.5} />
          Dashboard
        </SidebarItem>
        
        <SidebarItem id="transactions" path="/transactions">
          <BadgeDollarSignIcon strokeWidth={1.5} />
          Transações
        </SidebarItem>
        
        <SidebarItem id="categories" path="/categories">
          <Tags strokeWidth={1.5} />
          Categorias
        </SidebarItem>
        
        <SidebarItem id="accounts" path="/accounts">
          <Landmark strokeWidth={1.5} />
          Contas
        </SidebarItem>
      </ul>
    </aside>
  )
}

export default Sidebar
