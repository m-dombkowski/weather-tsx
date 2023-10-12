import SearchBar from "../components/search/search-bar";
import Sidebar from "../components/sidebar/sidebar";
import { useAppSelector } from "../hooks/rtk-hooks";
import SelectedCity from "../components/selected-city/selected-city";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { User } from "@supabase/supabase-js";

const MainPage: React.FC = () => {
  const selectedCityData = useAppSelector(
    (state: { selectedCity: { selectedCity: unknown } }) =>
      state.selectedCity.selectedCity
  );

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null | undefined>();

  useEffect(() => {
    async function checkIfLogged() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        setUserData(user);
      } else {
        setUserData(null);
        setIsLoggedIn(false);
      }
    }
    checkIfLogged();
  }, []);

  return (
    <section className="fixed top-0 left-0 flex justify-center align-center">
      <Sidebar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userData={userData}
      />
      <div className="mt-5 ml-10">
        <SearchBar />
        {selectedCityData != null && <SelectedCity />}
      </div>
    </section>
  );
};

export default MainPage;
