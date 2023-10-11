import { Route, Routes } from "react-router-dom";

import ErrorBoundary from "./components/error-boundry/error-boundry";
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
  faKey,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import SelectedCityDetailsPage from "./pages/selected-city-details";
import RegisterFormPage from "./pages/register-page";
import MainPage from "./pages/main-page";
import LoginForm from "./components/forms/login/login-form";

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
    faDroplet,
    faKey,
    faDoorOpen
  );

  return (
    <main className="flex">
      <Routes>
        <Route
          path="register"
          element={<RegisterFormPage />}
          errorElement={<ErrorBoundary />}
        />
        <Route path="login" element={<LoginForm />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/city/:cityId" element={<SelectedCityDetailsPage />} />
      </Routes>
    </main>
  );
}

export default App;
