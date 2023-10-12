import { User } from "@supabase/supabase-js";
import FavoriteList from "./favorites/favorites-list";
import { useState } from "react";

import { Link } from "react-router-dom";
import { supabase } from "../../services/supabase";

interface SidebarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData: User | null | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({
  isLoggedIn,
  userData,
  setIsLoggedIn,
}) => {
  const [favFlag, setFavFlag] = useState<boolean>(false);

  const favHandler = () => {
    setFavFlag(true);
  };

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    setIsLoggedIn(false);
    console.log(isLoggedIn);
    console.log(error);
  };

  console.log(isLoggedIn, userData);

  return (
    <div className="h-100vh w-400px border-r border-solid border-color-white">
      <div className="sidebar-nav flex justify-evenly py-5 px-0 border-b border-solid border-white">
        <button className="text-white" onClick={favHandler}>
          Fav
        </button>
        {!isLoggedIn ? (
          <Link to={"register"}>
            <button className="text-white">Sign up</button>
          </Link>
        ) : (
          <button onClick={logoutHandler}>Log out</button>
        )}

        <Link to={"/"}>
          <button className="text-white">Main</button>
        </Link>
      </div>
      {favFlag && <FavoriteList />}
    </div>
  );
};

export default Sidebar;
