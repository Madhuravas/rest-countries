import axios from "axios";

export const getCountriesData = () =>{
    return axios 
    .get("https://restcountries.com/v2/all")
    .then(res => res.data)
}

export const getEachCountryDataByname = (name) =>{
    return axios
    .get(`https://restcountries.com/v2/name/${name}`)
    .then(res => res.data)
}

export const getEachCountryData = (code) =>{
    return axios
    .get(`https://restcountries.com/v2/alpha/${code}`)
    .then(res => res.data)
}
