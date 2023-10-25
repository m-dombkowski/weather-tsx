import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { useAppSelector } from "../../hooks/rtk-hooks";
import { useDispatch } from "react-redux";
import { unsetUser } from "../../state/slices/auth-state";
import { emptyFavorites } from "../../state/slices/favorite-cities";
import { setSelectedCity } from "../../state/slices/selected-city";

interface SidebarMenuProps {
  favHandler: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ favHandler }) => {
  const [logoutMessage, setLogoutMessage] = useState<string>("");
  const logoutMessageRef = useRef<HTMLDivElement | null>(null);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error?.message == null) {
      setLogoutMessage("You have been logged out");
      dispatch(emptyFavorites);
      dispatch(setSelectedCity(undefined));
      // localStorage.clear();
    } else {
      setLogoutMessage(error.message);
    }
    setTimeout(() => {
      if (logoutMessageRef.current)
        logoutMessageRef.current.style.opacity = "0";
    }, 3000);
    setTimeout(() => {
      setLogoutMessage("");
    }, 3400);
    dispatch(unsetUser());
  };

  return (
    <>
      <div className="sidebar-nav flex justify-evenly py-5 px-0 border-b border-solid border-white">
        <button className="text-white" onClick={favHandler}>
          Fav
        </button>
        {!isLoggedIn ? (
          <Link to={"/login"}>
            <button className="text-white">Sign in</button>
          </Link>
        ) : (
          <button onClick={logoutHandler}>Log out</button>
        )}
        {isLoggedIn && (
          <Link to={"/settings"}>
            <button className="text-white">
              <FontAwesomeIcon size={"lg"} icon={["fas", "gear"]} />
            </button>
          </Link>
        )}
      </div>
      {logoutMessage.length > 0 && (
        <div
          ref={logoutMessageRef}
          className="flex justify-center w-[250px] mt-[30px] m-auto py-3 px-6 rounded-md font-bold bg-[#077a22] transition-all duration-500"
        >
          <p>{logoutMessage}</p>
        </div>
      )}
    </>
  );
};

export default SidebarMenu;
