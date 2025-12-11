import { useState } from "react";
import "./SearchBar.css";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";

const SearchBar = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="search-wrapper">
      <h1 className="search-title">Find Your Next Journey</h1>
      <p className="search-subtitle">
        Discover available trips and book your seats with ease.
      </p>

      <div className="search-card">
        <div className="field-group">
          <label>From</label>
          <div className="input-box">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              placeholder="Departure Location"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
        </div>

        <div className="field-group">
          <label>To</label>
          <div className="input-box">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              placeholder="Arrival Location"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        <div className="field-group">
          <label>Date</label>
          <div className="input-box">
            <FaRegCalendarAlt className="input-icon" />
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
            />
          </div>
        </div>

        <button className="btn-search">Search Trips</button>
      </div>
    </div>
  );
};

export default SearchBar;
