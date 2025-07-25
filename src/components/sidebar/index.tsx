"use client";

import { LaptopMinimal, LogOut, MonitorPlay, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import type { DropdownOption } from "@/components/dropdown";
import { useAuth, useLogout } from "@/hooks";
import type { ISidebarProps } from "./data";
import { Sidebar as Layout } from "./layout";

export const Sidebar = (props: ISidebarProps) => {
  const pathname = usePathname();
  const { user } = useAuth();

  const { mutateAsync: logout } = useLogout();

  const items = [
    {
      title: "Catálogo",
      url: "/",
      icon: <MonitorPlay />,
      isActive: pathname === "/",
    },
    {
      title: "Gerenciar meus cursos",
      url: "/gerenciar-cursos",
      icon: <LaptopMinimal />,
      isActive: pathname === "/gerenciar-cursos",
    },
  ];

  const userOptions: DropdownOption[] = [
    {
      id: "1",
      label: "Configurações",
      action: () => ({}),
      icon: <Settings className="h-4 w-4" />,
    },
    {
      id: "2",
      label: "Sair",
      action: logout,
      icon: <LogOut className="h-4 w-4" />,
    },
  ];

  const layoutProps = {
    items,
    user,
    userOptions,
    logout,
    ...props,
  };

  return <Layout {...layoutProps} />;
};
