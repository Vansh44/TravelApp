import "./Home.css";

import SearchBar from "../../components/SearchBar/SearchBar";
import TripsSection from "../../components/TripsSection/TripsSection";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <SearchBar />
        <TripsSection />
      </div>
    </>
  );
};

export default Home;
