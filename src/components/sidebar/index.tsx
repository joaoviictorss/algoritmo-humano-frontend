"use client";

import { MonitorPlay } from "lucide-react";
import { usePathname } from "next/navigation";
import type { ISidebarProps } from "./data";
import { Sidebar as Layout } from "./layout";

export const Sidebar = (props: ISidebarProps) => {
  const pathname = usePathname();

  const items = [
    {
      title: "Catálogo",
      url: "/",
      icon: <MonitorPlay />,
      isActive: pathname === "/",
    },
  ];

  const layoutProps = {
    items,
    ...props,
  };

  return <Layout {...layoutProps} />;
};
