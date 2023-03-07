import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Search } from ".";
import useDebounce from "../hooks/useDebounce";
import SelectedCity from "./selected-city";

interface SearchResultProps {
  setSearchInput?: Dispatch<SetStateAction<string>>;
  searchInput: string;
}

export interface SelectedCityInterface {
  cityName: string;
  temp: {
    min: number;
    max: number;
    feelsLike: number;
    actual: number;
  };
  pressure: number;
  humidity: number;
  time: {
    dt: number;
    sunrise: number;
    sunset: number;
  };
  weather: {
    description: string;
    iconID: string;
    main: string;
  };
  country: string;
}

const SearchResult: React.FC<SearchResultProps> = ({
  setSearchInput,
  searchInput,
}) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const debounceSearchTerm = useDebounce(searchInput, 1500);
  const [citiesSearchResult, setCitiesSearchResult] = useState<Search[]>([]);
  const [selectedCityData, setSelectedCityData] =
    useState<SelectedCityInterface>();

  const getCityDataByName = async (
    cityQuery: string,
    limit: string,
    apiKey: string
  ) => {
    try {
      const response = await axios(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityQuery}&limit=${limit}&appid=${apiKey}`
      );
      if (response.status >= 400) {
        throw new Error("Error has occured, please try again.");
      }
      const { data } = response;
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setSelectedCityData(undefined);
    const setSearchData = async () => {
      try {
        if (debounceSearchTerm) {
          const data = await getCityDataByName(debounceSearchTerm, "5", apiKey);
          if (!data) {
            throw new Error("Error has occured, please try again.");
          }
          console.log(data);
          setCitiesSearchResult(data);
        }
      } catch (err) {
        console.error(err);
        // throw new Error("Error has occured, please try again.");
      }
    };
    setSearchData();
  }, [debounceSearchTerm]);

  const onClickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = (event.target as HTMLInputElement)?.value;
    const tabIndex = (event.target as HTMLInputElement)?.tabIndex;

    for (const cityIndex in citiesSearchResult) {
      const cityData = citiesSearchResult[cityIndex];
      if (cityData.name === buttonValue && +cityIndex === tabIndex) {
        axios(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}&units=metric`
        ).then(({ data }) => setSelectedCityData(data));
      }
    }
    if (setSearchInput) {
      setSearchInput("");
    }
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
      {selectedCityData && <SelectedCity selectedCityData={selectedCityData} />}
    </div>
  );
};

export default SearchResult;

// `https://api.openweathermap.org/data/2.5/weather?lat=${element.lat}&lon=${element.lon}&appid=${apiKey}&units=metric`
// if (element.name === value && tabIndex === +index)
