import axios from "axios";
let BASE_API = "https://restcountries.com/v3.1"

export const getCountriesData = () =>{
    return axios 
    .get( BASE_API + "/all")
    .then(res => res.data)
}

export const getEachCountryDataByname = (name) =>{
    return axios
    .get(`${BASE_API}/alpha/${name}`)
    .then(res => res.data)
}

// export const getEachCountryData = (code) =>{
//     return axios
//     .get(`${BASE_API}/alpha/${code}`)
//     .then(res => res.data)
// }
