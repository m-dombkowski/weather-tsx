/* eslint-disable react/no-unescaped-entities */
import { useState, useRef } from "react";
import SearchResult from "./search-result";
import "./search-bar.css";
import { CSSTransition } from "react-transition-group";
import { supabase } from "../../services/supabase";

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const nodeRef = useRef(null);
  const [testState, setTestState] = useState();

  const toggleInfoHandler = async () => {
    setShowInfo((prevState) => !prevState);

    const infoWindow = document.querySelector(".info-window");

    infoWindow?.classList.contains("active") ?? false
      ? infoWindow?.classList.remove("active")
      : infoWindow?.classList.add("active");
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start relative ">
        <div className="flex gap-5 items-center justify-center">
          <input
            onChange={(event) => setSearchInput(event.target.value)}
            className="py-3 px-6 min-w-300px focus-visible:border-[#646cff]"
            type="search"
            placeholder="Search for a city"
          />

          <button className="rounded-full" onClick={toggleInfoHandler}>
            {" "}
            i{" "}
          </button>
          <CSSTransition
            in={showInfo}
            nodeRef={nodeRef}
            classNames="info-window"
            timeout={500}
            unmountOnExit
            onEnter={() => setShowInfo(true)}
            onExited={() => setShowInfo(false)}
          >
            <div
              ref={nodeRef}
              className="info-window max-w-500px py-2 px-7 mx-auto my-0 border-solid border-[#666eff] border-2 rounded-xl absolute top-0 cursor-default bg-[#3b3b3b]  text-white transition-all duration-500 "
            >
              <p className="text-base text-justify">
                If you want to make sure your search is as precise as possible
                you can add name of the state and/or country that the city you
                are searching for is located in. Example: "Chicago,Illinois,US"
                or just "Chicago,US". It is highly recommended to search using
                as much information as possible.
              </p>
            </div>
          </CSSTransition>
        </div>

        <SearchResult
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      </div>
    </>
  );
};

export default SearchBar;
