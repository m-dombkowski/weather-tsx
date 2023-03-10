import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/rtk-hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../state/slices/favorite-cities";
import "./selected-city.css";

interface SelectedCityProps {
  selectedCityData: any;
}

const SelectedCity: React.FC<SelectedCityProps> = ({ selectedCityData }) => {
  const cities = useAppSelector((state) => state.cities.favoriteCities);
  const dispatch = useAppDispatch();
  const [favoriteCities, setFavoriteCities] = useState<any>([]);
  const cityData = {
    icon: selectedCityData.weather[0].icon,
    time: selectedCityData.dt,
  };

  const convertUnixToTime = (unixTimestamp: number) => {
    const date = new Date(
      (unixTimestamp + selectedCityData.timezone - 3600) * 1000
    );
    const hours =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    // const seconds = "0" + date.getSeconds();

    return `${hours}:${minutes}`;
  };

  const addToFavoriteHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const button = event.target as HTMLDivElement;

    if (button.classList.contains("liked")) {
      button.classList.remove("liked");
      dispatch(removeFromFavorites(selectedCityData));
    } else {
      button.classList.add("liked");
      dispatch(addToFavorites(selectedCityData));
    }
  };

  return (
    <>
      <div>
        <span>{Math.round(selectedCityData.main.temp)}°C</span>
        <img src={`http://openweathermap.org/img/wn/${cityData.icon}@2x.png`} />
        <span>{selectedCityData.name}</span>
        <p>{convertUnixToTime(cityData.time)}</p>
        <div id="container">
          <div
            onClick={addToFavoriteHandler}
            className="heart-like-button"
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
