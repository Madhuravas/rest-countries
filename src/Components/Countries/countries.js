import { Link } from "react-router-dom"
import "./countries.css"
import { Component } from "react"


class Countries extends Component {
    render() {
        const { countryData } = this.props
        return (
            <div className="country-card">
                <Link to={`/${countryData.name}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <img className="country-flag" alt={countryData.name} src={countryData.flag} />
                <div className="country-details">
                    <h3>{countryData.name}</h3>
                    <p className="details"><span className="sub-heading">Population: </span>{countryData.population}</p>
                    <p className="details"><span className="sub-heading">Region: </span>{countryData.region}</p>
                    <p className="details"><span className="sub-heading">Capital: </span>{countryData.capital}</p>

                    {/* <h3>Borders:</h3>

                    <div className="home-borders">
                        {borders === undefined ? <p> No Borders </p> : borders.map((eachBorder, i) => {
                            return (
                                <div className="border-card" key={i}>
                                    <Link to={`/${eachBorder}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                        <p className="border-text">{eachBorder}</p>
                                    </Link>
                                </div>
                            )
                        })}
                    </div> */}
                </div>
            </Link>
            </div >
            
        )
    }
}

export default Countries
