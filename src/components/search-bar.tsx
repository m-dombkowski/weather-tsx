import { useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { useState } from "react";
import SearchResult from "./search-result";

const SearchBar: React.FC = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [searchResult, setSearchResult] = useState<string[] | undefined>(
    undefined
  );

  const getCityData = (query: string, limit: string) =>
    axios(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${apiKey}`
    ).then((resp) => {
      return resp.data;
    });

  useEffect(() => {
    if (!searchInput) {
      setIsLoading(false);
      return;
    }

    setSearchResult([]);
    setIsLoading(true);
    const getCity = setTimeout(() => {
      const data = Promise.resolve(getCityData(searchInput, "3"));

      data.then((value) =>
        value.map((element: { name: string }) =>
          setSearchResult((prevState) => [...(prevState ?? []), element.name])
        )
      );
      // data.map((element: { name: string }) =>
      //   setSearchResult((prevState) => [...(prevState ?? []), element.name])
      // )
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(getCity);
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
        getCityPromise={getCityData}
        isLoading={isLoading}
        searchResult={searchResult}
      />
    </div>
  );
};

export default SearchBar;

//1dd8639e06977072c7c8fcaea598d700
