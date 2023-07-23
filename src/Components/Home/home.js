import { Component } from "react";
import Countries from "../Countries/countries";
import { Bars } from "react-loader-spinner";
import { ThemeContext } from "../../Context/context";

import * as CountryAPI from "../Api/api"

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import "./home.css"

class Home extends Component {
    state = { countriesData: [], countryInput: "", regionInput: "", isLoading: true, isError: false }
    
    componentDidMount() {
        CountryAPI.getCountriesData().then((countriesData) => {
            this.setState({
                countriesData,
                isLoading: false,
                isError: false
            })
        }).catch(() => {
            this.setState({ isError: true })
        })
    }

    searchBasedOnCountry = (event) => {
        this.setState({ countryInput: event.target.value })
    }

    searchBasedOnRegion = (event) => {
        this.setState({ regionInput: event.target.value })
    }
    render() {

        const { countriesData, countryInput, regionInput, isLoading } = this.state
        const regions = [...countriesData.reduce((acc,eachCountry) =>{
               acc.add(eachCountry.region)
               return acc
        }, new Set())]


        return (
            <ThemeContext.Consumer>
                {(value) => {
                    const { light, dark, isLightTheme } = value
                    const theme = isLightTheme ? light : dark
                    if (isLoading) {
                        return (<div style={{ background: theme.bg, color: theme.color, height: "100vh" }} className="loader-container">
                            <Bars type="ThreeDots" color="#0b69ff" height="50" width="50" />
                        </div>
                        )

                    } else {

                        if (countriesData !== []) {

                            const searchBasedOnResign =  regionInput === "All"? countriesData : countriesData.filter(eachCountryData =>
                                eachCountryData.region.includes(regionInput)
                            )

                            const searchBasedOnCountrys = searchBasedOnResign.filter(eachCountrysData =>
                                eachCountrysData.name.common.toLowerCase().startsWith(countryInput.toLocaleLowerCase())
                            )

                            let data = searchBasedOnCountrys.sort((a,b) =>{
                                return (a.cca3 > b.cca3) ? 1 : ((b.cca3 > a.cca3) ? -1 : 0)
                            })
                            console.log(data)

                            return (
                            <div className="home-card" style={{ background: theme.bg, color: theme.color }}>
                                <div className="search-container">
                                    <div className="input-container">
                                        <SearchOutlinedIcon />
                                        <input style={{ background: theme.bg, color: theme.color }} className="input-card" type="text" placeholder="Search for a country" onChange={this.searchBasedOnCountry} />
                                    </div>
                                    <select style={{ background: theme.bg, color: theme.color }} className="input-scrollbar" onChange={this.searchBasedOnRegion}>
                                        <option key='All'>All</option>
                                        {regions.map(region =>
                                            <option key={region}>{region}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="countrys-card">
                                    {data.map(eachCountry => {
                                        return (
                                            <Countries key={eachCountry.cca3} countryData={eachCountry} />
                                        )
                                    })}
                                </div>
                            </div>)
                        }
                    }
                }}

            </ThemeContext.Consumer>
        )


    }
}
export default Home
