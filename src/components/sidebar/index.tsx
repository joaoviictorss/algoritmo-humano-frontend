"use client"

import { MonitorPlay } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const Sidebar = () => {
  const pathname = usePathname();

  const items = [
    {
      title: "Catálogo",
      url: "/",
      icon: <MonitorPlay />,
      isActive: pathname === "/",
    },
  ];

  return (
    <ShadSidebar>
      <SidebarContent>
        <SidebarGroup className="gap-2">
          <SidebarHeader>
            <div className="flex items-center gap-3">
              <Image
                alt="Logo"
                className="rounded-md"
                height={32}
                src="/nevoa.png"
                width={32}
              />

              <span className="font-semibold text-zinc-900">
                Algoritmo Humano
              </span>
            </div>
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a
                      className="flex gap-3 font-medium text-sidebar-foreground/80"
                      href={item.url}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadSidebar>
  );
};
