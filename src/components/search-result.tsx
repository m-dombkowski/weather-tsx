import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Search } from ".";

interface SearchResultProps {
  setSearchInput?: Dispatch<SetStateAction<string>>;
  searchResult?: Search[] | undefined;
  isLoading: boolean;
  getCityPromise: (query: string, limit: string) => Promise<any>;
}

const SearchResult: React.FC<SearchResultProps> = ({
  setSearchInput,
  searchResult,
  isLoading,
  getCityPromise,
}) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const onClickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = (event.target as HTMLInputElement)?.value;
    const tabIndex = (event.target as HTMLInputElement)?.tabIndex;

    const citiesArray = await getCityPromise(value, "5");
    console.log(citiesArray);

    citiesArray.forEach((element: Search, index: string) => {
      if (element.name === value && tabIndex === +index) {
        axios(
          `https://api.openweathermap.org/data/2.5/weather?lat=${element.lat}&lon=${element.lon}&appid=${apiKey}&units=metric`
        ).then((resp) => resp.data);
      }
    });

    if (setSearchInput) {
      setSearchInput("");
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {searchResult && searchResult.length > 0 && (
        <ul>
          {searchResult.map((element, index) => (
            <li key={index}>
              {!isLoading && (
                <button
                  tabIndex={index}
                  value={element.name}
                  onClick={onClickHandler}
                >
                  {element.name}, {element.state && element.state}.{" "}
                  {element.country}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResult;
