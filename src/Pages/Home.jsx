import { useEffect, useState } from "react";
import "./Home.css";
import CountryCard from "../Components/CountryCard";
import { getAllCountries } from "../Services/CountryAPI";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Logo from "../assets/logoworldmap.jpg"

function Home() {
  const [countryList, setCountryList] = useState([]);
  const [region, setRegion] = useState("");
  const [countryName, setCountryName] = useState("");
  const [filterCountriesList, setFilterCountriesList] = useState([]);

  const handleCountryChange = (event) => {
    setCountryName(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  useEffect(() => {
    if (region === "" && countryName === "") {
      setFilterCountriesList(countryList);
    } else {
      let filterCountries = countryList;
      if (region.length) {
        filterCountries = filterCountries.filter((country) => {
          if (country.region === region) return true;
          else false;
        });
      }
      if (countryName.length) {
        filterCountries = filterCountries.filter((country) => {
          const lowercaseName = country.name.common.toLowerCase();

          if (lowercaseName.includes(countryName.toLowerCase())) return true;
          else false;
        });
      }

      setFilterCountriesList(filterCountries);
    }
  }, [region, countryName, countryList]);

  useEffect(() => {
    getAllCountries()
      .then((result) => {
        // Ensure result.data contains the correct data structure
        const countries = result.data;

        setCountryList(countries);
        setFilterCountriesList(countries);
        console.log(countries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  return (
    <div className="container-home">
      <div className="App container flex justify-between items-center">
        <div className="logo">
        <img src={Logo} alt="Logo" className="h-20 w-20 mr-4 mb-5 flex" />
        </div>
        <div className="filters-wrapper mr-3">
          <TextField
            onChange={handleCountryChange}
            value={countryName}
            id="outlined-basic"
            label="Search Country By Name"
            variant="outlined"
        
          />

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Filter by Region
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={region}
              label="Filter by Region"
              onChange={handleRegionChange}
            >
              <MenuItem value={"Africa"}>Africa</MenuItem>
              <MenuItem value={"Americas"}>Americas</MenuItem>
              <MenuItem value={"Asia"}>Asia</MenuItem>
              <MenuItem value={"Europe"}>Europe</MenuItem>
              <MenuItem value={"Oceania"}>Oceania</MenuItem>
              <MenuItem value={"Antarctic"}>Antarctic</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <div className="country-card-wrapper">
          {filterCountriesList.map((country) => (
            // Use a unique identifier instead of index if available

            <div key={country.cca3}>
              <Link to={`/countries/${country.cca3}`}>
                <CountryCard
                  name={country.name.common}
                  capital={country.capital}
                  population={country.population}
                  flagUrl={country.flags.png}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
