import FavoriteList from "../favorites/favorites-list";
import { useState } from "react";

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
    <div style={{ position: "fixed", top: "2%", left: "0", minWidth: "400px" }}>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button onClick={favHandler}>Fav</button>
        <button onClick={bHandler}>b</button>
        <button onClick={cHandler}>c</button>
      </div>
      {favFlag && <FavoriteList />}
    </div>
  );
};

export default Sidebar;
