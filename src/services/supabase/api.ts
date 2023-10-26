import { User } from "@supabase/supabase-js";
import { CityInterface } from "../../state";
import { triggerErrMessage } from "../../components/selected-city";
import { supabase } from ".";

export const addCityToFavsDb = async (
  userData: User | undefined,
  cityData: CityInterface | undefined
) => {
  const { data, error } = await supabase
    .from("favs")
    .insert([
      {
        user: userData?.email,
        city_data: cityData,
        city_id: cityData?.id,
      },
    ])
    .select();
};

export const removeCityFromFavs = async (
  userData: User | undefined,
  cityData: CityInterface | undefined
) => {
  const { data: favs } = await supabase.from("favs").select("user,city_id");

  const isAdded = favs?.filter(
    (el) => el.user == userData?.email && el.city_id == cityData?.id
  );
  if (isAdded) {
    const { error } = await supabase
      .from("favs")
      .delete()
      .eq("city_id", isAdded[0].city_id as string);
  }
};

export const checkIfCityIsAlreadyInFavs = async (
  userData: User | undefined,
  cityData: CityInterface | undefined,
  setFavError: React.Dispatch<React.SetStateAction<string>>,
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  const { data: favs, error } = await supabase
    .from("favs")
    .select("user,city_id");

  const isAdded = favs?.find(
    (el) => el.user == userData?.email && el.city_id == cityData?.id
  );

  if (!isAdded) {
    return false;
  }
  triggerErrMessage(
    setFavError,
    ref,
    "This city is already on your favorites list"
  );
  return true;
};

export const getUserCities = async (userData: User | undefined) => {
  const arr: { city_id: number }[] = [];
  const { data: favs, error } = await supabase
    .from("favs")
    .select("user,city_id");

  favs?.forEach((el) => {
    if (el.user == userData?.email) {
      arr.push(el.city_id);
    }
  });
  return arr;
};
