import { Component } from "react"
import { Bars } from "react-loader-spinner"
import { ThemeContext } from "../../Context/context"
import { Link } from "react-router-dom"
import * as CountryAPI from "../Api/api"

import NotFound from "../NotFound/notFound"

import Borders from "../Borders/borders"
import "./eachCountry.css"

class EachCountry extends Component {

    state = {
        eachCountryData: "",
        isLoading: true,
        isError: false,

    }
    
    async componentDidMount() {
        const { code } = this.props.match.params
    
        try {
            const data = await CountryAPI.getEachCountryDataByname(code)
            this.setState({
                eachCountryData: data[0],
                isLoading: false,
                isError: false
            })
        } catch (err) {
            this.setState({ eachCountryData: "", isLoading: false, isError: true })
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.match.params.code !== this.props.match.params.code) {

            const { code } = this.props.match.params
            try {
                const data = await CountryAPI.getEachCountryDataByname(code)
                this.setState({
                    eachCountryData: data[0],
                    isLoading: false,
                    isError: false
                })
            } catch (err) {
                this.setState({ eachCountryData: "", isLoading: false, isError: true })
            }
        }
    }

    render() {
        const { eachCountryData, isLoading, isError } = this.state;
        return (<ThemeContext.Consumer>
            {(value) => {
                const { light, dark, isLightTheme } = value
                const theme = isLightTheme ? light : dark
                if (isLoading) {
                    return (<div style={{ background: theme.bg, color: theme.color, height: "100vh" }} className="loader-container">
                        <Bars type="ThreeDots" color="#0b69ff" height="50" width="50" />
                    </div>)
                } else {
                    if (isError) {
                        return (<NotFound />)
                    } else {
                        if (eachCountryData !== "") {
                            const { name, flags, population, region, subregion, capital, currencies, languages, borders } = eachCountryData;
                            let langCodes = Object.keys(eachCountryData?.languages);
                            let allCurrencies = "";
                            let allLanguages = "";
                            Object.keys(currencies).forEach(item =>{
                                allCurrencies = allCurrencies + currencies[item].name + ", "
                            });
                            allCurrencies = allCurrencies.slice(0,-2);
                            
                            langCodes.forEach(item =>{
                               allLanguages = allLanguages + languages[item] + ", "
                            });
                            allLanguages = allLanguages.slice(0, -2);

                            const bordersData = () => {
                                if (borders === undefined) {
                                    return (<p> No borders</p>)
                                } else {
                                    return (
                                        <>
                                            {borders.map(eachBorder => {
                                                return <Borders key={eachBorder} border={eachBorder} code={eachCountryData.cca2}  />
                                            })}
                                        </>
                                    )
                                }
                            }

                            return (
                                <div className="eachCountry-card" style={{ background: theme.bg, color: theme.color }}>
                                    <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                        <div className="back-card">
                                            <i className="arrow fa fa-arrow-left"></i>
                                            <p className="back-text">Back</p>
                                        </div>
                                    </Link>

                                    <div key={name.common} className="each-country-details">
                                        <div className="flag-card">
                                            <img className="country-flag-img" src={flags.svg} alt={flags.alt} />
                                        </div>
                                        <div className="country-details-card">
                                            <h2>{name.official}</h2>
                                            <ul className="each-country-text-details">
                                                <div className="details-part-one">
                                                    <li className="each-detield-details"><span className="sub-heading text-size">Capital: </span>{capital}</li>
                                                    <li className="each-detield-details"><span className="sub-heading text-size">Region: </span>{region}</li>
                                                    <li className="each-detield-details"><span className="sub-heading text-size">Sub Region: </span>{subregion}</li>
                                                </div>
                                                <div>
                                                    <li className="each-detield-details"><span className="sub-heading text-size">Population: </span>{population}</li>
                                                    <li className="each-detield-details"><span className="sub-heading text-size">currencies: </span>{allCurrencies}</li>
                                                    <li className="each-detield-details"><span className="sub-heading text-size">languages: </span>{allLanguages}</li>
                                                </div>
                                            </ul>
                                            <div className="borders-container">
                                                <h3>Border Countries: </h3>
                                                {bordersData()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                }
            }}
        </ThemeContext.Consumer>)

    }
}

export default EachCountry
