import { User, createClient } from "@supabase/supabase-js";
import { CityForecastInterface } from "../../state";
import { triggerErrMessage } from "../../components/selected-city";

// Create a single supabase client for interacting with your database

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApi = import.meta.env.VITE_SUPABASE_API;

export const supabase = createClient(
  supabaseUrl as string,
  supabaseApi as string
);

export const addCityToFavs = async (
  userData: User | undefined,
  cityData: CityForecastInterface | undefined
) => {
  const { data, error } = await supabase
    .from("favs")
    .insert([
      {
        user: userData?.email,
        city_data: cityData,
        city_id: cityData?.city.id,
      },
    ])
    .select();
};

export const checkIfCityIsAlreadyInFavs = async (
  userData: User | undefined,
  cityData: CityForecastInterface | undefined,
  setFavError: React.Dispatch<React.SetStateAction<string>>,
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  const { data: favs, error } = await supabase
    .from("favs")
    .select("user,city_id");

  const isAdded = favs?.find(
    (el) => el.user == userData?.email && el.city_id == cityData?.city.id
  );
  if (isAdded) {
    triggerErrMessage(
      setFavError,
      ref,
      "This city is already on your favorites list"
    );
    return;
  }
  addCityToFavs(userData, cityData);
};
