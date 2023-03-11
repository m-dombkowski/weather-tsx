import { useAppDispatch, useAppSelector } from "../hooks/rtk-hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../state/slices/favorite-cities";
import "./selected-city.css";
import { convertUnixToTime } from "../helpers";
import { CityInterface } from "../state";

interface SelectedCityProps {
  selectedCityData?: CityInterface;
}

const SelectedCity: React.FC<SelectedCityProps> = ({ selectedCityData }) => {
  const cityList = useAppSelector((state) => state.cities.favoriteCities);
  const cityData = useAppSelector((state) => state.selectedCity.selectedCity);
  const isAlreadyInFavorites = cityList.find(
    (city: CityInterface) => city.id === cityData?.id
  );
  const dispatch = useAppDispatch();

  const addToFavoriteHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const button = event.target as HTMLDivElement;
    if (isAlreadyInFavorites) {
      button.classList.add("liked");
    }
    if (button.classList.contains("liked")) {
      button.classList.remove("liked");
      dispatch(removeFromFavorites(cityData));
    } else {
      button.classList.add("liked");
      dispatch(addToFavorites(cityData));
    }
  };

  return (
    <>
      {cityData && (
        <div>
          <span>{Math.round(cityData.main.temp)}°C</span>
          <img
            src={`http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
          />
          <span>{cityData.name}</span>
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
