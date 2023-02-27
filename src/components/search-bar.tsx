import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import SearchResult from "./search-result";
import { Search } from ".";

const SearchBar: React.FC = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Search[] | undefined>([]);

  const getCityData = (query: string, limit: string) =>
    axios(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${apiKey}`
    ).then((resp) => resp.data);

  useEffect(() => {
    setSearchResult([]);

    if (!searchInput) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const getCityName = setTimeout(() => {
      const data = Promise.resolve(getCityData(searchInput, "5"));

      data.then((value) =>
        value.map((element: Search) => {
          setSearchResult((prevState) => [...(prevState ?? []), element]);
        })
      );

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(getCityName);
  }, [searchInput]);

  return (
    <div>
      <input
        onChange={(event) => setSearchInput(event.target.value)}
        type="search"
        style={{ padding: "18px 36px", fontSize: "2rem" }}
        placeholder="Search for a city"
      />
      <SearchResult
        setSearchInput={setSearchInput}
        getCityPromise={getCityData}
        isLoading={isLoading}
        searchResult={searchResult}
      />
    </div>
  );
};

export default SearchBar;

//1dd8639e06977072c7c8fcaea598d700
