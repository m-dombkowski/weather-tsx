import { useState } from "react";
import SearchResult from "./search-result";

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const toggleInfoHandler = () => {
    setShowInfo((prevState) => !prevState);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          position: "relative",
        }}
      >
        <input
          onChange={(event) => setSearchInput(event.target.value)}
          type="search"
          style={{ padding: "18px 36px", fontSize: "18px", minWidth: "400px" }}
          placeholder="Search for a city"
        />

        <button onClick={toggleInfoHandler} style={{ borderRadius: "100px" }}>
          {" "}
          i{" "}
        </button>
        {showInfo && (
          <div
            style={{
              maxWidth: "450px",
              margin: "0 auto",
              padding: "10px 30px",
              border: "3px solid #666eff",
              borderRadius: "15px",
              position: "absolute",
              right: "-120%",
              color: "#000",
              background: "#666666",
            }}
          >
            <p
              style={{
                textAlign: "justify",
                fontSize: "19px",
                fontWeight: "500",
              }}
            >
              If you want to make sure your search is as precise as possible you
              can add name of the state and/or country that the city you are
              searching for is. Example: "Chicago,Illinois,US" or just
              "Chicago,US". It is highly recommended to search using as much
              information as possible
            </p>
          </div>
        )}
      </div>
      <SearchResult setSearchInput={setSearchInput} searchInput={searchInput} />
    </div>
  );
};

export default SearchBar;
