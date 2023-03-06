import { useState } from "react";
import SearchResult from "./search-result";

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div>
      <input
        onChange={(event) => setSearchInput(event.target.value)}
        type="search"
        style={{ padding: "18px 36px", fontSize: "2rem" }}
        placeholder="Search for a city"
      />
      <SearchResult setSearchInput={setSearchInput} searchInput={searchInput} />
    </div>
  );
};

export default SearchBar;
