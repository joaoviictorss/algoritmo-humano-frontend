export interface ISidebarProps {}

export interface ISidebarData extends ISidebarProps {
  items: ISidebarItem[];
}

interface ISidebarItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  isActive: boolean;
}
