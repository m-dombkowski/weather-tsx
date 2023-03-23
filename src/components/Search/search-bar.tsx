import { useState, useRef } from "react";
import SearchResult from "./search-result";
import "./search-bar.css";
import { CSSTransition } from "react-transition-group";

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const nodeRef = useRef(null);

  const toggleInfoHandler = () => {
    setShowInfo((prevState) => !prevState);

    const infoWindow = document.querySelector(".info-window");

    infoWindow?.classList.contains("active")
      ? infoWindow?.classList.remove("active")
      : infoWindow?.classList.add("active");

    console.log(infoWindow);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "2%",
        left: "25%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <input
          onChange={(event) => setSearchInput(event.target.value)}
          type="search"
          style={{ padding: "12px 24px", fontSize: "16px", minWidth: "300px" }}
          placeholder="Search for a city"
        />

        <button onClick={toggleInfoHandler} style={{ borderRadius: "100px" }}>
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
          <div ref={nodeRef} className="info-window">
            <p>
              If you want to make sure your search is as precise as possible you
              can add name of the state and/or country that the city you are
              searching for is located in. Example: "Chicago,Illinois,US" or
              just "Chicago,US". It is highly recommended to search using as
              much information as possible.
            </p>
          </div>
        </CSSTransition>
      </div>
      <SearchResult setSearchInput={setSearchInput} searchInput={searchInput} />
    </div>
  );
};

export default SearchBar;
