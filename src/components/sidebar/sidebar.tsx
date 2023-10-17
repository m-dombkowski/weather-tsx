import FavoriteList from "./favorites/favorites-list";
import { useState } from "react";
import SidebarMenu from "./sidebar-menu";

const Sidebar: React.FC = () => {
  const [favFlag, setFavFlag] = useState<boolean>(true);

  const favHandler = () => {
    setFavFlag(true);
  };

  return (
    <div className="h-100vh w-400px border-r border-solid border-color-white">
      <SidebarMenu favHandler={favHandler} />
      {favFlag && <FavoriteList />}
    </div>
  );
};

export default Sidebar;
