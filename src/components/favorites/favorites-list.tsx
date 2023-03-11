import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import { CityInterface } from "../../state";
import { convertUnixToTime } from "../../helpers";
import { useEffect } from "react";
import { removeFromFavorites } from "../../state/slices/favorite-cities";
import "./favorites-list.css";
import { setSelectedCity } from "../../state/slices/selected-city";

const FavoriteList: React.FC = () => {
  const citiesList = useAppSelector((state) => state.cities.favoriteCities);
  const dispatch = useAppDispatch();

  return (
    <div>
      {citiesList.length > 0 && (
        <ul
          className="city-list"
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px 0  0 15px",
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "calc(100vh - 100px)",
          }}
        >
          {citiesList.map((city: CityInterface, index: number) => (
            <li
              key={index}
              className="single-city"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px",
                alignItems: "center",
              }}
              onClick={() => dispatch(setSelectedCity(city))}
            >
              <span>
                {city.name}, {city.sys.country}.{" "}
              </span>

              <img
                src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
              />
              <span>{Math.round(city.main.temp)}°C</span>
              <button
                className="button-close"
                style={{ transform: "translateX(40px)", opacity: "0" }}
                onClick={() => dispatch(removeFromFavorites(city))}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
      {citiesList.length === 0 && (
        <p style={{ marginTop: "40px" }}>Your list is empty.</p>
      )}
    </div>
  );
};

export default FavoriteList;
