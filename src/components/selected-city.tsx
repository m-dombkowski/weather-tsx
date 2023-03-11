import { useAppDispatch, useAppSelector } from "../hooks/rtk-hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../state/slices/favorite-cities";
import "./selected-city.css";
import { convertUnixToTime } from "../helpers";

interface SelectedCityProps {
  selectedCityData: any;
}

const SelectedCity: React.FC<SelectedCityProps> = ({ selectedCityData }) => {
  const dispatch = useAppDispatch();
  const cityList = useAppSelector((state) => state.cities.favoriteCities);
  const isAlreadyInFavorites = cityList.find(
    (city: any) => city.id === selectedCityData.id
  );

  const addToFavoriteHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const button = event.target as HTMLDivElement;
    if (isAlreadyInFavorites) {
      button.classList.add("liked");
    }
    if (button.classList.contains("liked")) {
      button.classList.remove("liked");
      dispatch(removeFromFavorites(selectedCityData));
    } else {
      button.classList.add("liked");
      dispatch(addToFavorites(selectedCityData));
    }
  };

  console.log(selectedCityData);

  return (
    <>
      <div>
        <span>{Math.round(selectedCityData.main.temp)}°C</span>
        <img
          src={`http://openweathermap.org/img/wn/${selectedCityData.weather[0].icon}@2x.png`}
        />
        <span>{selectedCityData.name}</span>
        <p>{convertUnixToTime(selectedCityData.dt, selectedCityData)}</p>
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
    </>
  );
};

export default SelectedCity;

// setFavoriteCities((prevState: any) => [
//   ...prevState,
//   selectedCityData,
// ]);
