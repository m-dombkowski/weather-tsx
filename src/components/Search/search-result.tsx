import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./search-result.css";
import { Search } from ".";
import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import useDebounce from "../../hooks/use-debounce";
import { setSelectedCity } from "../../state/slices/selected-city";
import { setError } from "../../state/slices/errors";
import { validateSearchInput } from "../../helpers";

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
  const dispatch = useAppDispatch();
  const errMsg = useAppSelector((state) => state.errorMessage.errorMessage);

  const getCityDataByName = async (
    cityQuery: string,
    limit: string,
    apiKey: string
  ) => {
    try {
      if (validateSearchInput(cityQuery)) {
        const axiosResponse = await axios(
          `${baseURL}geo/1.0/direct?q=${cityQuery}&limit=${limit}&appid=${apiKey}`
        ).catch(({ response }) => {
          if (response.status >= 400) {
            setIsLoading(false);
            throw new Error(
              "There has been a problem with a request, please try again"
            );
          }
          return;
        });
        setIsLoading(false);
        const data = axiosResponse?.data;
        return data;
      } else {
        setIsLoading(false);
        throw new Error("Don't be like that buddy, use only letters.");
      }
    } catch (err: any) {
      console.log(err.message);
      dispatch(setError(err.message));
    }
  };

  useEffect(() => {
    const setSearchData = async () => {
      try {
        if (!debounceSearchTerm) {
          dispatch(setError(""));
          setIsLoading(false);
          setSelectedCityData(null);
          setCitiesSearchResult([]);
        } else {
          dispatch(setError(""));
          setSelectedCityData(null);
          const data = await getCityDataByName(debounceSearchTerm, "5", apiKey);
          if (!data) {
            return;
          }

          if (data.length <= 0) {
            setCitiesSearchResult([]);
            throw new Error(
              "There is no city matching your search. Please try again."
            );
          }
          setCitiesSearchResult(data);
        }
      } catch (err: any) {
        dispatch(setError(err.message));
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
        )
          .then(({ data }) => setSelectedCityData(data))
          .catch((response) => {
            if (response.status >= 400)
              dispatch(
                setError(
                  "Oopsie, this should not happened. Please reach app creator"
                )
              );
          });
      }
    }
  };

  useEffect(() => {
    dispatch(setSelectedCity(selectedCityData));
  }, [selectedCityData]);

  return (
    <>
      <div className="search-result-container">
        {isLoading && (
          <div className="fetching-message">
            Fetching data, please standby...
          </div>
        )}
        {!isLoading && errMsg && (
          <div className="fetching-message">{errMsg}</div>
        )}
        {citiesSearchResult?.length > 0 && !isLoading && (
          <ul className="cities-search-result-list">
            {citiesSearchResult.map((element, index) => (
              <li className="cities-search-result" key={index}>
                <button
                  tabIndex={index}
                  value={element.name}
                  onClick={onClickHandler}
                  className="search-result-city-btn"
                >
                  {element.name}, {element.country}.{" "}
                  {element.state && element.state}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchResult;
