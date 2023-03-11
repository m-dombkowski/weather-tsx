import { useAppDispatch, useAppSelector } from "../../hooks/rtk-hooks";
import { CityInterface } from "../../state";
import { convertUnixToTime } from "../../helpers";
import { useEffect } from "react";
import { removeFromFavorites } from "../../state/slices/favorite-cities";

const FavoriteList: React.FC = () => {
  const citiesList = useAppSelector((state) => state.cities.favoriteCities);
  const dispatch = useAppDispatch();

  return (
    <div>
      <ul style={{ display: "flex", flexDirection: "column" }}>
        {citiesList.map((city: CityInterface, index: number) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <span>
              {city.name}, {city.sys.country}.{" "}
              {convertUnixToTime(city.dt, city)}
            </span>

            <img
              src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
            />
            <button onClick={() => dispatch(removeFromFavorites(city))}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
