import "./App.css";
import SearchBar from "./components/search/search-bar";
import FavoriteList from "./components/favorites/favorites-list";

function App() {
  return (
    <div className="App">
      <FavoriteList />
      <SearchBar />
    </div>
  );
}

export default App;
