import SearchBar from "../components/search/search-bar";
import Sidebar from "../components/sidebar/sidebar";
import { useAppSelector } from "../hooks/rtk-hooks";
import SelectedCity from "../components/selected-city/selected-city";

const MainPage: React.FC = () => {
  const selectedCityData = useAppSelector(
    (state: { selectedCity: { selectedCity: unknown } }) =>
      state.selectedCity.selectedCity
  );

  return (
    <main className="flex justify-start">
      <Sidebar />
      <SearchBar />
      {selectedCityData != null && <SelectedCity />}
    </main>
  );
};

export default MainPage;
