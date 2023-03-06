import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Search } from ".";
import { useGetCityByNameQuery } from "../services/cities";
import useDebounce from "../hooks/useDebounce";

interface SearchResultProps {
  setSearchInput?: Dispatch<SetStateAction<string>>;
  searchInput: string;
  // getCityPromise: (query: string, limit: string) => Promise<any>;
}

const SearchResult: React.FC<SearchResultProps> = ({
  setSearchInput,
  searchInput,
}) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const debounceSearchTerm = useDebounce(searchInput, 1500);
  const [citiesSearchResult, setCitiesSearchResult] = useState<Search[]>([]);

  const getCityDataByName = async (
    cityQuery: string,
    limit: string,
    apiKey: string
  ) => {
    try {
      const response = await axios(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityQuery}&limit=${limit}&appid=${apiKey}`
      );

      const { data } = response;
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const setSearchData = async () => {
      if (debounceSearchTerm) {
        const data = await getCityDataByName(debounceSearchTerm, "5", apiKey);
        setCitiesSearchResult(data);
      }
    };
    setSearchData();
  }, [debounceSearchTerm, getCityDataByName]);

  const onClickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = (event.target as HTMLInputElement)?.value;
    const tabIndex = (event.target as HTMLInputElement)?.tabIndex;

    for (const city of citiesSearchResult) {
      console.log(city);
    }

    // citiesSearchResult.forEach((value: Search, index: number) => {
    //   if (value.name === buttonValue && tabIndex === +index) {
    //     axios(
    //       `https://api.openweathermap.org/data/2.5/weather?lat=${value.lat}&lon=${value.lon}&appid=${apiKey}&units=metric`
    //     ).then(({ data }) => console.log(data));
    //   }
    // });
  };

  return (
    <div>
      {citiesSearchResult?.length > 0 && (
        <ul>
          {citiesSearchResult.map((element, index) => (
            <li key={index}>
              {/* {!isFetching && ( */}
              <button
                tabIndex={index}
                value={element.name}
                onClick={onClickHandler}
              >
                {element.name}, {element.state && element.state}.{" "}
                {element.country}
              </button>
              {/* )} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResult;

// `https://api.openweathermap.org/data/2.5/weather?lat=${element.lat}&lon=${element.lon}&appid=${apiKey}&units=metric`
// if (element.name === value && tabIndex === +index)
