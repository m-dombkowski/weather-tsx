import { Route, Routes } from "react-router-dom";
import "./App.css";

import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import {
  faLock,
  fas,
  faPenToSquare,
  faEye,
  faEyeSlash,
  faTemperatureFull,
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faWind,
  faLocationDot,
  faClock,
  faCloudRain,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import SelectedCityDetailsPage from "./pages/selected-city-details";
import RegisterFormPage from "./pages/register-page";
import MainPage from "./pages/main-page";

function App() {
  library.add(
    fas,
    faPenToSquare,
    faEnvelope,
    faLock,
    faEye,
    faEyeSlash,
    faTemperatureFull,
    faTemperatureArrowDown,
    faTemperatureArrowUp,
    faWind,
    faLocationDot,
    faClock,
    faCloudRain,
    faDroplet
  );

  return (
    <>
      <Routes>
        <Route
          path="register"
          element={<RegisterFormPage />}
          errorElement={<ErrorBoundary />}
        />
        <Route path="/" element={<MainPage />} />
        <Route path="/city/:cityId" element={<SelectedCityDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
