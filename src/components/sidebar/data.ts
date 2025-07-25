import type { IUser } from "@/types/user";
import type { DropdownOption } from "../dropdown";

export interface ISidebarProps {}

export interface ISidebarLayout extends ISidebarProps {
  items: ISidebarItem[];
  user?: IUser | null;
  userOptions: DropdownOption[];
}

interface ISidebarItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  isActive: boolean;
}
