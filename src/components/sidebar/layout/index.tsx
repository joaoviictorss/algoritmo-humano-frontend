"use client";

import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { ISidebarData } from "../data";

export const Sidebar = ({ items }: ISidebarData) => {
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
                    <Link
                      className="flex gap-3 font-medium text-sidebar-foreground/80"
                      href={item.url}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Link
            className="flex gap-3 font-medium text-sidebar-foreground/80"
            href={"sign-in"}
          >
            <LogIn />
            <span>Fazer login</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </ShadSidebar>
  );
};
