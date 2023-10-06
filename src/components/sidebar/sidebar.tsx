import FavoriteList from "./favorites/favorites-list";
import { useState } from "react";

import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [favFlag, setFavFlag] = useState<boolean>(false);

  const favHandler = () => {
    setFavFlag(true);
  };

  return (
    <div className="h-100vh w-400px border-r border-solid border-color-white">
      <div className="sidebar-nav flex justify-evenly py-5 px-0 border-b border-solid border-white">
        <button className="text-white" onClick={favHandler}>
          Fav
        </button>
        <Link to={"register"}>
          <button className="text-white">Register</button>
        </Link>
        <Link to={"/"}>
          <button className="text-white">Main</button>
        </Link>
      </div>
      {favFlag && <FavoriteList />}
    </div>
  );
};

export default Sidebar;
