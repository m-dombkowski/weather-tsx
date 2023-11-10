import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../state/slices/favorite-cities";
import "./selected-city.css";
import { convertUnixToTime } from "../../utils";
import { CityInterface } from "../../state";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  addCityToFavsDb,
  checkIfCityIsAlreadyInFavs,
  removeCityFromFavs,
} from "../../services/supabase/api";
import { triggerErrMessage } from ".";

const SelectedCity: React.FC = () => {
  const cityList = useAppSelector((state) => state.cities.favoriteCities);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userData = useAppSelector((state) => state.auth.user);
  const cityData = useAppSelector((state) => state.selectedCity.selectedCity);
  const [favError, setFavError] = useState<string>("");
  const errRef = useRef<HTMLDivElement | null>(null);

  const isAlreadyInFavorites: object | undefined = cityList?.find(
    (selectedCity: CityInterface) => selectedCity.id === cityData?.id
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const manageFavorites = async (
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
    console.log("klikam");

    if (button.classList.contains("liked")) {
      removeCityFromFavs(userData, cityData);
      dispatch(removeFromFavorites(cityData));
    } else {
      // const isAlreadyInFavs = await checkIfCityIsAlreadyInFavs(
      //   userData,
      //   cityData,
      //   setFavError,
      //   errRef
      // );

      // if (!isAlreadyInFavs) {
      //   addCityToFavsDb(userData, cityData);
      // }
      dispatch(addToFavorites(cityData));
      return;
    }
  };

  useEffect(() => {}, []);

  const detailedForecastOnClick = () => {
    navigate(`/city/${cityData?.id}`);
  };

  return (
    <>
      {cityData && (
        <div className="flex flex-col items-center bg-black w-[700px] pl-[4%] pr-0 py-[4%];">
          <div className="selected-city-container flex w-[100%] items-center justify-between">
            <span>{cityData.name}</span>
            <span>{Math.round(cityData.main.temp)}°C</span>
            <img
              src={`http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
            />
            <p className="w-[50px]">
              {convertUnixToTime(cityData.dt, cityData)}
            </p>
            <div>
              <div
                onClick={manageFavorites}
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
