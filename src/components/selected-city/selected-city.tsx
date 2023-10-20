import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../state/slices/favorite-cities";
import "./selected-city.css";
import { convertUnixToTime } from "../../utils";
import { CityForecastInterface } from "../../state";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
  addCityToFavs,
  checkIfCityIsAlreadyInFavs,
  removeCityFromFavs,
} from "../../services/supabase";
import { triggerErrMessage } from ".";

const SelectedCity: React.FC = () => {
  const cityList = useAppSelector((state) => state.cities.favoriteCities);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userData = useAppSelector((state) => state.auth.user);
  const cityData = useAppSelector((state) => state.selectedCity.selectedCity);
  const [favError, setFavError] = useState<string>("");
  const errRef = useRef<HTMLDivElement | null>(null);

  const isAlreadyInFavorites: object | undefined = cityList?.find(
    (selectedCity: CityForecastInterface) =>
      selectedCity.city.id === cityData?.city.id
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const addToFavoriteHandler = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setFavError("");
    if (!isLoggedIn) {
      triggerErrMessage(
        setFavError,
        errRef,
        "In order to add city to favorites, please log in."
      );
      return;
    }
    const button = event.target as HTMLDivElement;

    if (button.classList.contains("liked")) {
      removeCityFromFavs(userData, cityData);
      dispatch(removeFromFavorites(cityData));
    } else {
      const isAlreadyInFavs = await checkIfCityIsAlreadyInFavs(
        userData,
        cityData,
        setFavError,
        errRef
      );

      if (!isAlreadyInFavs) {
        addCityToFavs(userData, cityData);
        dispatch(addToFavorites(cityData));
      }
      return;
    }
  };

  const detailedForecastOnClick = () => {
    navigate(`/city/${cityData?.city.id}`);
  };

  return (
    <>
      {cityData && (
        <div className="flex flex-col items-center mt-[75%] ml-[100%]">
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
          {favError.length > 0 && (
            <div
              className="w-[250px] text-center mt-10 relative transition-all duration-500"
              ref={errRef}
            >
              <p className="py-3 px-6 rounded-md font-bold bg-[#ff444f] text-[#383838]">
                {favError}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SelectedCity;
