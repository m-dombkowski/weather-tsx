import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Search } from ".";
import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import useDebounce from "../../hooks/use-debounce";
import {
  setSelectedCity,
  setSelectedCityName,
} from "../../state/slices/selected-city";
import { setError } from "../../state/slices/errors";
import { validateSearchInput } from "../../utils";
import { setSelectedCityAirPollution } from "../../state/slices/air-pollution";
import { instanceOf } from "prop-types";

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
            // `${baseURL}data/2.5/weather?q=${cityQuery}&appid=${apiKey}&limit=${limit}`
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
          console.log(data);
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
      setCitiesSearchResult([]);
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
        console.log(cityData);
        try {
          const forecast = await axios(
            `${baseURL}data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}&units=metric`
          );

          if (forecast.status >= 400) {
            throw new Error(
              "There has been a problem with api call, please try again soon or contact app creator if problem persists"
            );
          }
          console.log(forecast.data);
          dispatch(setSelectedCityName(buttonValue));

          const getCityByID = await axios(
            `${baseURL}/data/2.5/group?id=${forecast.data.city.id}&appid=${apiKey}&units=metric`
          );

          if (getCityByID.status >= 400) {
            throw new Error(
              "There has been a problem with api call, please try again soon or contact app creator if problem persists"
            );
          }
          console.log(getCityByID.data.list[0]);
          dispatch(setSelectedCity(getCityByID.data.list[0]));
        } catch (err) {
          if (err instanceof Error) {
            dispatch(setError(err.message));
          }
        }
        // const forecast = axios(
        //   `${baseURL}data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}&units=metric`
        // )
        //   .then(({ data }) => {
        //     console.log(data);
        //     dispatch(setSelectedCity(data));
        //     dispatch(setSelectedCityName(buttonValue));
        //   })
        //   .catch((response) => {
        //     if (response.status >= 400)
        //       dispatch(
        //         setError(
        //           "Oopsie, this should not have happened. Please reach app creator"
        //         )
        //       );
        //   });

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
        <div className="mt-5 ml-5">Fetching data, please standby...</div>
      )}
      <div>
        {!isLoading && errMsg !== "" && <div className="mt-5">{errMsg}</div>}
        {citiesSearchResult?.length > 0 && !isLoading && (
          <ul className="list-none w-300px test [&>*:not(:last-child)]:border-b-0 ">
            {citiesSearchResult.map((element, index) => (
              <li className="border-solid border-2 border-black" key={index}>
                <button
                  tabIndex={index}
                  value={element.name}
                  onClick={onClickHandler}
                  className="hover:bg-[#1a1a1a] hover:border-transparent focus:outline-0 focus-visible:outline-0 active:bg-[#1a1a1a] w-296px h-50px rounded-none bg-[#313131] overflow-hidden transition-all duration-300"
                  title={`${element.name}, ${element.country}. ${
                    element.state ?? ""
                  }`}
                >
                  <span className="whitespace-nowrap text-ellipsis overflow-hidden inline-block pointer-events-none w-9/12">
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
