import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Search } from ".";
import useDebounce from "../../hooks/useDebounce";
import SelectedCity from "../selected-city";

interface SearchResultProps {
  setSearchInput?: Dispatch<SetStateAction<string>>;
  searchInput: string;
}

const SearchResult: React.FC<SearchResultProps> = ({
  setSearchInput,
  searchInput,
}) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debounceSearchTerm = useDebounce(searchInput, 1500, setIsLoading);
  const [citiesSearchResult, setCitiesSearchResult] = useState<Search[]>([]);
  const [selectedCityData, setSelectedCityData] = useState<any>();

  const getCityDataByName = async (
    cityQuery: string,
    limit: string,
    apiKey: string
  ) => {
    try {
      setIsLoading(true);
      const response = await axios(
        `${baseURL}geo/1.0/direct?q=${cityQuery}&limit=${limit}&appid=${apiKey}`
      );
      if (!debounceSearchTerm) {
        setIsLoading(false);
        setSelectedCityData(null);
      }
      setIsLoading(false);
      const { data } = response;
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const setSearchData = async () => {
      try {
        if (debounceSearchTerm) {
          setSelectedCityData(null);
          const data = await getCityDataByName(debounceSearchTerm, "5", apiKey);
          if (!data) {
            throw new Error("Error has occurred, please try again.");
          }
          setCitiesSearchResult(data);
        }
        if (setSearchInput && !debounceSearchTerm) {
          setCitiesSearchResult([]);
        }
      } catch (err) {
        console.error(err);
        // throw new Error("Error has occurred, please try again.");
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
          `${baseURL}data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}&units=metric`
        ).then(({ data }) => setSelectedCityData(data));
      }
    }
  };

  return (
    <div>
      {isLoading && (
        <div style={{ marginTop: "20px" }}>
          Fetching data, please standby...
        </div>
      )}
      {citiesSearchResult?.length > 0 && !isLoading && (
        <ul
          style={{ listStyle: "none", textAlign: "left", paddingLeft: "unset" }}
        >
          {citiesSearchResult.map((element, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {/* {!isFetching && ( */}
              <button
                tabIndex={index}
                value={element.name}
                onClick={onClickHandler}
                style={{ minWidth: "465px" }}
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
