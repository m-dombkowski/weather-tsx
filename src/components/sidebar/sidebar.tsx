import FavoriteList from "../favorites/favorites-list";
import { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [favFlag, setFavFlag] = useState<boolean>(false);

  const favHandler = () => {
    setFavFlag(true);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <button onClick={favHandler}>Fav</button>
        <Link to={"register"}>
          <button>Register</button>
        </Link>
        <Link to={"/"}>
          <button>Main</button>
        </Link>
      </div>
      {favFlag && <FavoriteList />}
    </div>
  );
};

export default Sidebar;
