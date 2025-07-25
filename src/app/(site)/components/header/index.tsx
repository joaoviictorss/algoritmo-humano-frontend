import { Bell, Info } from "lucide-react";
import { CourseSearch } from "@/components/search-course";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => (
  <header className="flex items-center justify-between gap-4 bg-white px-6 py-4">
    <div className="flex w-full items-center gap-4 md:w-[350px]">
      <SidebarTrigger className="flex md:hidden" size={"icon"} />
      <CourseSearch />
    </div>

    <div className="flex items-center gap-2">
      <Button size={"icon"} variant={"outline"}>
        <Bell />
      </Button>

      <Button size={"icon"} variant={"outline"}>
        <Info />
      </Button>
    </div>
  </header>
);
