import "./App.css";
import SearchBar from "./components/search/search-bar";
import FavoriteList from "./components/favorites/favorites-list";
import Sidebar from "./components/sidebar/sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <SearchBar />
    </div>
  );
}

export default App;
