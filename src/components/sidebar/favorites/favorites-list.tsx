import { useAppDispatch, useAppSelector } from "../../../hooks/rtk-hooks";
import { CityInterface } from "../../../state";
import { removeFromFavorites } from "../../../state/slices/favorite-cities";
import { setSelectedCity } from "../../../state/slices/selected-city";

const FavoriteList: React.FC = () => {
  const citiesList = useAppSelector((state) => state.cities.favoriteCities);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn && (
        <div>
          {citiesList != undefined && citiesList.length > 0 && (
            <ul className="city-list flex flex-col pt-5 pb-4 px-4 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-100px)] rounded-xl gap-3">
              {citiesList.map((city: CityInterface, index: number) => (
                <li
                  key={index}
                  className="group single-city flex justify-center items-center  py-2 px-5 text-left rounded-lg transition duration-300 border-solid border-2 border-transparent hover:bg-[#3b3b3b] hover:border-[#646cff] hover:cursor-pointer"
                  onClick={() => {
                    console.log(citiesList);
                    dispatch(setSelectedCity(city));
                  }}
                >
                  <span
                    title={city.name}
                    className="w-120px text-sm inline-block overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {city.name}, {city.sys.country}.{" "}
                  </span>

                  <img
                    width={60}
                    src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                  />
                  <span className="text-sm inline-block overflow-hidden text-ellipsis whitespace-nowrap">
                    {Math.round(city.main.temp)}°C
                  </span>
                  <button
                    className="group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0  button-close ml-auto transition duration-300 opacity-0 translate-x-[40px] pointer-events-none"
                    onClick={() => dispatch(removeFromFavorites(city))}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
          {citiesList != undefined && citiesList.length === 0 && (
            <p className="mt-10 text-center">Your list is empty.</p>
          )}
        </div>
      )}
      {!isLoggedIn && (
        <div className="mt-10 text-center flex justify-center items-center">
          <p className="w-[225px]">
            In order to check list of your favorite cities please log in.
          </p>
        </div>
      )}
    </>
  );
};

export default FavoriteList;
