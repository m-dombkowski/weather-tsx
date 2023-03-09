import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/rtk-hooks";
import { removeFromFavorites } from "../state/slices/favorite-cities";
import "./selected-city.css";

interface SelectedCityProps {
  selectedCityData: any;
}

const SelectedCity: React.FC<SelectedCityProps> = ({ selectedCityData }) => {
  const cities = useAppSelector((state) => state.counter.favoriteCities);
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
    const test = dispatch(removeFromFavorites(selectedCityData));
    console.log(test.payload);
    if (button.classList.contains("liked")) {
      button.classList.remove("liked");
      setFavoriteCities((prevState: any) => {
        return prevState.filter((city: any) => city.id !== selectedCityData.id);
      });
    } else {
      button.classList.add("liked");
      if (favoriteCities.length > 0) {
        const isAlreadyInFavorites = favoriteCities.find(
          (city: any) => city.id === selectedCityData.id
        );
        !isAlreadyInFavorites
          ? setFavoriteCities((prevState: any) => [
              ...prevState,
              selectedCityData,
            ])
          : setFavoriteCities((prevState: any) => prevState);
      } else {
        setFavoriteCities((prevState: any) => [...prevState, selectedCityData]);
      }
    }
  };

  useEffect(() => {
    console.log(favoriteCities);
  });

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
