import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import { CityInterface } from "../../state";
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
                justifyContent: "flex-start",
                padding: "8px 20px",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => dispatch(setSelectedCity(city))}
            >
              <span style={{ minWidth: "100px", fontSize: "14px" }}>
                {city.name}, {city.sys.country}.{" "}
              </span>

              <img
                style={{ width: "55px" }}
                src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
              />
              <span style={{ fontSize: "14px" }}>
                {Math.round(city.main.temp)}°C
              </span>
              <button
                className="button-close"
                style={{
                  transform: "translateX(40px)",
                  opacity: "0",
                  marginLeft: "auto",
                }}
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
