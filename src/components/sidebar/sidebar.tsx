import FavoriteList from "../favorites/favorites-list";
import { useState } from "react";
import "./sidebar.css";

const Sidebar: React.FC = () => {
  const [favFlag, setFavFlag] = useState<boolean>(false);
  const [bFlag, setBFlag] = useState<boolean>(false);
  const [cFlag, setCFlag] = useState<boolean>(false);

  const favHandler = () => {
    setFavFlag(true);
    setBFlag(false);
    setCFlag(false);
  };

  const bHandler = () => {
    setFavFlag(false);
    setBFlag(true);
    setCFlag(false);
  };
  const cHandler = () => {
    setFavFlag(false);
    setBFlag(false);
    setCFlag(true);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <button onClick={favHandler}>Fav</button>
        <button onClick={bHandler}>b</button>
        <button onClick={cHandler}>c</button>
      </div>
      {favFlag && <FavoriteList />}
    </div>
  );
};

export default Sidebar;
