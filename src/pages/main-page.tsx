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
