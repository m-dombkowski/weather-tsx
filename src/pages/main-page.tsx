import SearchBar from "../components/search/search-bar";
import Sidebar from "../components/sidebar/sidebar";
import { useAppDispatch, useAppSelector } from "../hooks/rtk-hooks";
import SelectedCity from "../components/selected-city/selected-city";
import { useEffect } from "react";

import { getUserData } from "../state/slices/auth-state";
import { setFavorites } from "../state/slices/favorite-cities";

const MainPage: React.FC = () => {
  const selectedCityData = useAppSelector(
    (state: { selectedCity: { selectedCity: unknown } }) =>
      state.selectedCity.selectedCity
  );

  const fav = useAppSelector((state) => state.cities.favoriteCities);
  const favDb = useAppSelector((state) => state.citiesDb.favoriteCities);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
    if (favDb !== undefined && favDb.length > 0) {
      dispatch(setFavorites(favDb));
    }
  }, [dispatch, favDb]);

  return (
    <section className="fixed top-0 left-0 flex justify-center align-center">
      <Sidebar />
      <div className="mt-5 ml-10">
        <SearchBar />
        {selectedCityData != null && <SelectedCity />}
      </div>
    </section>
  );
};

export default MainPage;
