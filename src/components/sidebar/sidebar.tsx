import FavoriteList from "../favorites/favorites-list";

const Sidebar: React.FC = () => {
  return (
    <div style={{ position: "fixed", top: "0", left: "0", minWidth: "400px" }}>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button>a</button>
        <button>b</button>
        <button>c</button>
      </div>
      <FavoriteList />
    </div>
  );
};

export default Sidebar;
