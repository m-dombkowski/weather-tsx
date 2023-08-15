import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../state/slices/favorite-cities";
import "./selected-city.css";
import { convertUnixToTime } from "../../utils";
import { CityForecastInterface } from "../../state";

import { useNavigate } from "react-router-dom";

const SelectedCity: React.FC = () => {
  const cityList = useAppSelector((state) => state.cities.favoriteCities);

  const cityData = useAppSelector((state) => state.selectedCity.selectedCity);

  const isAlreadyInFavorites: object | undefined = cityList?.find(
    (selectedCity: CityForecastInterface) =>
      selectedCity.city.id === cityData?.city.id
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const addToFavoriteHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const button = event.target as HTMLDivElement;

    if (button.classList.contains("liked")) {
      dispatch(removeFromFavorites(cityData));
    } else {
      dispatch(addToFavorites(cityData));
    }
  };

  const detailedForecastOnClick = () => {
    navigate(`/city/${cityData?.city.id}`);
  };

  return (
    <>
      {cityData && (
        <div className="flex flex-col">
          <div className="selected-city-container flex justify-center items-center gap-2.5">
            <span>{cityData.city.name}</span>
            <span>{Math.round(cityData.list[0].main.temp)}°C</span>
            <img
              src={`http://openweathermap.org/img/wn/${cityData.list[0].weather[0].icon}@2x.png`}
            />
            <p>{convertUnixToTime(cityData.list[0].dt, cityData)}</p>
            <div className="ml-auto">
              <div
                onClick={addToFavoriteHandler}
                className={
                  isAlreadyInFavorites === undefined
                    ? "heart-like-button"
                    : "heart-like-button liked"
                }
              ></div>
            </div>
          </div>
          <div>
            <button onClick={detailedForecastOnClick}>
              Check detailed forecast
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedCity;
