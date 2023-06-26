import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import { CityForecastInterface } from "../../state";
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
          {citiesList.map((city: CityForecastInterface, index: number) => (
            <li
              key={index}
              className="single-city"
              onClick={() => dispatch(setSelectedCity(city))}
            >
              <span title={city.city.name} className="single-city-description">
                {city.city.name}, {city.city.country}.{" "}
              </span>

              <img
                src={`http://openweathermap.org/img/wn/${city.list[0].weather[0].icon}@2x.png`}
              />
              <span className="single-city-description no-width">
                {Math.round(city.list[0].main.temp)}°C
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
