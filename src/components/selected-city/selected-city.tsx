import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../state/slices/favorite-cities";
import "./selected-city.css";
import { convertUnixToTime } from "../../helpers";
import { CityInterface } from "../../state";
import { ref, set } from "firebase/database";
import { database } from "../../services/firebase/firebaseAuth";

interface SelectedCityProps {
  selectedCityData?: CityInterface;
}

const SelectedCity: React.FC<SelectedCityProps> = () => {
  const cityList = useAppSelector((state) => state.cities.favoriteCities);
  const cityData = useAppSelector((state) => state.selectedCity.selectedCity);
  const isAlreadyInFavorites = cityList.find(
    (city: CityInterface) => city.id === cityData?.id
  );
  const dispatch = useAppDispatch();

  const saveFavCityToDb = (cityObj: CityInterface) => {
    set(ref(database, "city/"), {
      cityObj,
    });
  };

  const addToFavoriteHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const button = event.target as HTMLDivElement;

    if (button.classList.contains("liked")) {
      dispatch(removeFromFavorites(cityData));
    } else {
      dispatch(addToFavorites(cityData));
      button.classList.add("animated");
    }
  };

  return (
    <>
      {cityData && (
        <div className="selected-city-container">
          <span>{Math.round(cityData.main.temp)}°C</span>
          <img
            src={`http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
          />
          <span>{cityData.name} </span>
          <p>{convertUnixToTime(cityData.dt, cityData)}</p>
          <div id="container">
            <div
              onClick={addToFavoriteHandler}
              className={
                !isAlreadyInFavorites
                  ? "heart-like-button"
                  : "heart-like-button liked"
              }
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedCity;
