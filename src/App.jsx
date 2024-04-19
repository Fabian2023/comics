import "./App.css";
import Charactersquery from "./components/Characters/GetCharacters";
// import Navbar from "./components/Navbar/Navbar";
//mport { useState } from "react";

function App() {
  // const [statusFilter, setStatusFilter] = useState("");
  // const [speciesFilter, setSpeciesFilter] = useState("");
  // const [genderFilter, setGenderFilter] = useState("");

  return (
    <div className="mt-16 flex flex-col items-center ">
      {/* <Navbar
        setStatusFilter={setStatusFilter}
        setSpeciesFilter={setSpeciesFilter}
        setGenderFilter={setGenderFilter}
      /> */}
      <Charactersquery
   
      />
    </div>
  );
}

export default App;
