import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryDetails } from "../Services/CountryAPI";
import "./CountryDetail.css";

function CountryDetail() {
  const { countryCode } = useParams();
  console.log(countryCode);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    getCountryDetails(countryCode).then((result) => {
      console.log(result.data);
      setDetails(result.data[0]); // Access the first element of the array
    }).catch((error) => {
      console.error("Error fetching country details:", error);
    });
  }, [countryCode]);

  if (!details) {
    return <div>Loading...</div>;
  }

  const currencies = details.currencies
    ? Object.values(details.currencies).map((currency) => currency.name).join(", ")
    : "N/A";

  const languages = details.languages
    ? Object.values(details.languages).join(", ")
    : "N/A";

  return (
    <>
      <div className="country-details-wrapper">
        <img src={details.flags?.png} alt={details.name?.common} />
      </div>
      <div className="">
        <div>Name: {details.name?.common}</div>
        <div>Official Name: {details.name?.official}</div>
        <div>Population: {details.population}</div>
        <div>Currency: {currencies}</div> 
        <div>Languages: {languages}</div> 
        <div>Continents: {details.continents?.join(", ")}</div>
        <div>Capital: {details.capital?.join(", ")}</div>
      </div>
    </>
  );
}

export default CountryDetail;
