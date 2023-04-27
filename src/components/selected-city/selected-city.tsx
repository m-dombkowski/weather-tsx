import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../state/slices/favorite-cities";
import "./selected-city.css";
import { convertUnixToTime } from "../../helpers";
import { CityForecastInterface } from "../../state";
import { useEffect } from "react";

const SelectedCity: React.FC = () => {
  const cityList = useAppSelector((state) => state.cities.favoriteCities);

  const cityData = useAppSelector((state) => state.selectedCity.selectedCity);

  const isAlreadyInFavorites = cityList.find(
    (selectedCity: CityForecastInterface) =>
      selectedCity.city.id === cityData?.city.id
  );
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    console.log(cityData);
  });

  return (
    <>
      {cityData && (
        <>
          <div className="selected-city-container">
            <span>{cityData.city.name}</span>
            <span>{Math.round(cityData.list[0].main.temp)}°C</span>
            <img
              src={`http://openweathermap.org/img/wn/${cityData.list[0].weather[0].icon}@2x.png`}
            />
            <p>{convertUnixToTime(cityData.list[0].dt, cityData)}</p>
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
          <div
            className="selected-city-chart"
            style={{ display: "flex", flexDirection: "row", gap: "10px" }}
          >
            {cityData.list.map((record, index) => (
              <li key={index} style={{ listStyle: "none" }}>
                <p>{convertUnixToTime(record.dt, cityData)}</p>
                <p>{Math.round(record.main.temp)}</p>
              </li>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SelectedCity;
