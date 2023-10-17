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
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
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
    if (!isLoggedIn) {
      console.log("Aby dodac miasto do ulubionych zaloguj sie na swoje konto");
      return;
    }
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
        <div className="flex flex-col items-center mt-[100%] ml-[100%]">
          <div className="selected-city-container flex justify-center items-center gap-2.5">
            <span>{cityData.city.name}</span>
            <span>{Math.round(cityData.list[0].main.temp)}°C</span>
            <img
              src={`http://openweathermap.org/img/wn/${cityData.list[0].weather[0].icon}@2x.png`}
            />
            <p className="w-[50px]">
              {convertUnixToTime(cityData.list[0].dt, cityData)}
            </p>
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
            <button className="w-[150px]" onClick={detailedForecastOnClick}>
              Check detailed forecast
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedCity;
