import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterForm from "./components/forms/register/register-form";
import SearchBar from "./components/search/search-bar";
import SelectedCity from "./components/selected-city/selected-city";
import Sidebar from "./components/sidebar/sidebar";
import { useAppSelector } from "./hooks/rtk-hooks";
import ErrorBoundary from "./components/errorBoundry/error-boundry";
import {
  faLock,
  fas,
  faPenToSquare,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import SelectedCityDetails from "./components/selected-city/selected-city-details";

function App() {
  library.add(fas, faPenToSquare, faEnvelope, faLock, faEye, faEyeSlash);

  const selectedCityData = useAppSelector(
    (state) => state.selectedCity.selectedCity
  );
  return (
    <div className="App">
      <Routes>
        <Route
          path="register"
          element={<RegisterForm />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/"
          element={
            <>
              <Sidebar />
              <SearchBar />
              {selectedCityData && <SelectedCity />}
            </>
          }
        />
        <Route path="/city/:cityId" element={<SelectedCityDetails />} />
      </Routes>
    </div>
  );
}

export default App;
