import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import { CityInterface } from "../../state";
import { removeFromFavorites } from "../../state/slices/favorite-cities";
import "./favorites-list.css";
import { setSelectedCity } from "../../state/slices/selected-city";

const FavoriteList: React.FC = () => {
  const citiesList = useAppSelector((state) => state.cities.favoriteCities);
  const dispatch = useAppDispatch();

  return (
    <div>
      {citiesList.length > 0 && (
        <ul className="city-list">
          {citiesList.map((city: CityInterface, index: number) => (
            <li
              key={index}
              className="single-city"
              onClick={() => dispatch(setSelectedCity(city))}
            >
              <span className="single-city-description">
                {city.name}, {city.sys.country}.{" "}
              </span>

              <img
                src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
              />
              <span className="single-city-description no-width">
                {Math.round(city.main.temp)}°C
              </span>
              <button
                className="button-close"
                onClick={() => dispatch(removeFromFavorites(city))}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
      {citiesList.length === 0 && (
        <p className="city-list-description no-city">Your list is empty.</p>
      )}
    </div>
  );
};

export default FavoriteList;
