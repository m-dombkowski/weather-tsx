import { User } from "@supabase/supabase-js";
import FavoriteList from "./favorites/favorites-list";
import { useState } from "react";
import SidebarMenu from "./sidebar-menu";

interface SidebarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData: User | null | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [favFlag, setFavFlag] = useState<boolean>(false);

  const favHandler = () => {
    setFavFlag(true);
  };

  return (
    <div className="h-100vh w-400px border-r border-solid border-color-white">
      <SidebarMenu
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        favHandler={favHandler}
      />
      {favFlag && <FavoriteList />}
    </div>
  );
};

export default Sidebar;
