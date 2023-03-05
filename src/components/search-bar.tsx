import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import SearchResult from "./search-result";
import { Search } from ".";
import { useGetCityByNameQuery } from "../services/cities";
import useDebounce from "../hooks/useDebounce";

const SearchBar: React.FC = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [skip, setSkip] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Search[] | undefined>([]);

  const debounceSearchTerm = useDebounce(searchInput, 1500);

  const result = useGetCityByNameQuery(
    {
      debounceSearchTerm,
      apiKey,
    },
    { skip }
  );

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    setSkip(false);
    setSearchResult([]);
    console.log(searchInput);
    if (searchInput === "") {
      console.log("here");
      setSkip(true);
    }
  };

  console.log(result);

  return (
    <div>
      {/* <button>+</button>
      <span></span>
      <button>-</button> */}
      <input
        onChange={onChangeHandle}
        type="search"
        style={{ padding: "18px 36px", fontSize: "2rem" }}
        placeholder="Search for a city"
      />
      <button onClick={() => setSkip((prevState) => !prevState)}>
        Skip value: {skip.toString()}
      </button>
      <SearchResult
        setSearchInput={setSearchInput}
        // getCityPromise={getCityData}
        // isFetching={result.status}
        searchResult={searchResult}
        searchTerm={debounceSearchTerm}
      />
    </div>
  );
};

export default SearchBar;
