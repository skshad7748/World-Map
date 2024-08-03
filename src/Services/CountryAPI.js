
import axios from "axios"

const COUNTRY_API = 'https://restcountries.com/v3.1'

export function getAllCountries(){
    // call API & the results
   return  axios.get(`${COUNTRY_API}/all`)
}

export function getCountryDetails(countryCode){
        return axios.get(`${COUNTRY_API}/alpha/${countryCode}`)
}