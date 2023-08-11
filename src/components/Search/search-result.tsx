import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./search-result.css";
import { Search } from ".";
import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import useDebounce from "../../hooks/use-debounce";
import {
  setSelectedCity,
  setSelectedCityName,
} from "../../state/slices/selected-city";
import { setError } from "../../state/slices/errors";
import { validateSearchInput } from "../../helpers";
import { setSelectedCityAirPollution } from "../../state/slices/air-pollution";

interface SearchResultProps {
  setSearchInput?: Dispatch<SetStateAction<string>>;
  searchInput: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ searchInput }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debounceSearchTerm = useDebounce(searchInput, 1500, setIsLoading);
  const [citiesSearchResult, setCitiesSearchResult] = useState<Search[]>([]);
  const dispatch = useAppDispatch();
  const errMsg = useAppSelector((state) => state.errorMessage.errorMessage);

  const getCityDataByName = useCallback(
    async (cityQuery: string, limit: string, apiKey: string) => {
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
          console.log("odpalam");
          return data;
        } else {
          setIsLoading(false);
          dispatch(setSelectedCity(undefined));
          throw new Error("Don't be like that buddy, use only letters.");
        }
      } catch (err: unknown) {
        if (err instanceof Error) dispatch(setError(err.message));
      }
    },
    [baseURL, dispatch]
  );

  useEffect(() => {
    const setSearchData = async () => {
      dispatch(setError(""));
      dispatch(setSelectedCity(undefined));

      try {
        if (debounceSearchTerm === "") {
          setIsLoading(false);
          setCitiesSearchResult([]);
        } else {
          const data = await getCityDataByName(debounceSearchTerm, "5", apiKey);
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
      } catch (err: unknown) {
        if (err instanceof Error) dispatch(setError(err.message));
      }
    };
    setSearchData();
  }, [apiKey, debounceSearchTerm, dispatch, getCityDataByName]);

  const onClickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = (event.target as HTMLInputElement)?.value;
    const tabIndex = (event.target as HTMLInputElement)?.tabIndex;
    for (const cityIndex in citiesSearchResult) {
      const cityData = citiesSearchResult[cityIndex];

      if (cityData.name === buttonValue && +cityIndex === tabIndex) {
        axios(
          `${baseURL}data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&cnt=9&appid=${apiKey}&units=metric`
        )
          .then(({ data }) => {
            dispatch(setSelectedCity(data));
            dispatch(setSelectedCityName(buttonValue));
          })
          .catch((response) => {
            if (response.status >= 400)
              dispatch(
                setError(
                  "Oopsie, this should not have happened. Please reach app creator"
                )
              );
          });

        axios(
          `${baseURL}data/2.5/air_pollution?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}`
        )
          .then(({ data }) => {
            dispatch(setSelectedCityAirPollution(data));
            console.log(data);
          })
          .catch((response) => {
            console.log(response);
          });
      }
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fetching-message">Fetching data, please standby...</div>
      )}
      <div className="search-result-container">
        {!isLoading && errMsg !== "" && (
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
                  title={`${element.name}, ${element.country}. ${
                    element.state ?? ""
                  }`}
                >
                  <span>
                    {element.name}, {element.country}. {element.state ?? ""}
                  </span>
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
