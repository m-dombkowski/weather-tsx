import axios from "axios";
import { Search } from ".";

interface SearchResultProps {
  searchResult?: Search[] | undefined;
  isLoading: boolean;
  getCityPromise: (query: string, limit: string) => Promise<any>;
}

const SearchResult: React.FC<SearchResultProps> = ({
  searchResult,
  isLoading,
  getCityPromise,
}) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const onClickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = (event.target as HTMLInputElement).value;

    const test = await getCityPromise(value, "1");
    const { lat, lon } = test[0];

    const getCityData = axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    ).then((resp) => console.log(resp.data));

    // console.log(getCityData);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {searchResult && searchResult.length > 0 && (
        <ul>
          {searchResult.map((element, index) => (
            <li key={index}>
              {!isLoading && (
                <button value={element.name} onClick={onClickHandler}>
                  {element.name}, {element.country}
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
