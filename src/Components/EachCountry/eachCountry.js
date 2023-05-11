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
            console.log(err)
            this.setState({ eachCountryData: "", isLoading: false, isError: true })
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.match.params.code !== this.props.match.params.code) {
            const { code } = this.props.match.params
            try {
                const data = await CountryAPI.getEachCountryData(code)
                this.setState({
                    eachCountryData: data,
                    isLoading: false,
                    isError: false
                })
            } catch (err) {
                console.log(err)
                this.setState({ eachCountryData: "", isLoading: false, isError: true })
            }
        }
    }

    render() {
        const { eachCountryData, isLoading, isError } = this.state

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
                            const { name, flag, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders } = eachCountryData

                            let allLanguages = languages.reduce((acc, eachLanguage) => {
                                acc += eachLanguage.name + ' ,'
                                return acc
                            }, "")
                            allLanguages = allLanguages.slice(0, allLanguages.length - 1)

                            const bordersData = () => {
                                if (borders === undefined) {
                                    return (<p> No borders</p>)
                                } else {
                                    return (
                                        <>
                                            {borders.map(eachBorder => {
                                                return <Borders key={eachBorder} border={eachBorder} />
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
                                            <p>Back</p>
                                        </div>
                                    </Link>

                                    <div key={name} className="each-country-details">
                                        <div>
                                            <img className="country-flag-img" src={flag} alt={`${name} flag`} />
                                        </div>
                                        <div>
                                            <h2>{name}</h2>
                                            <ul className="each-country-text-details">
                                                <div className="details-part-one">
                                                    <li className="each-detield-details"><span className="sub-heading text-size">Natvive name: </span>{nativeName}</li>
                                                    <li className="each-detield-details"><span className="sub-heading text-size">Population: </span>{population}</li>
                                                    <li className="each-detield-details"><span className="sub-heading text-size">Region: </span>{region}</li>
                                                    <li className="each-detield-details"><span className="sub-heading text-size">Sub Region: </span>{subregion}</li>
                                                    <li className="each-detield-details"><span className="sub-heading text-size">Capital: </span>{capital}</li>
                                                </div>
                                                <div>
                                                    <li className="each-detield-details"><span className="sub-heading text-size">Top Level Domin: </span>{topLevelDomain[0]}</li>
                                                    <li className="each-detield-details"><span className="sub-heading text-size">currencies: </span>{currencies[0].name}</li>
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
