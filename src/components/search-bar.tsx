import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import SearchResult from "./search-result";
import { Search } from ".";
import { useGetCityByNameQuery } from "../services/cities";
import useDebounce from "../hooks/useDebounce";

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
