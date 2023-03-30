import "./App.css";
import RegisterForm from "./components/forms/register-form";
import SearchBar from "./components/search/search-bar";
import SelectedCity from "./components/selected-city/selected-city";
import Sidebar from "./components/sidebar/sidebar";
import { useAppSelector } from "./hooks/rtk-hooks";

function App() {
  const selectedCityData = useAppSelector(
    (state) => state.selectedCity.selectedCity
  );

  return (
    <div className="App">
      <Sidebar />
      {/* <SearchBar /> */}
      {/* {selectedCityData && <SelectedCity />} */}
      <RegisterForm />
    </div>
  );
}

export default App;
