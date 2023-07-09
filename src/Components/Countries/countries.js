import { Link } from "react-router-dom"
import "./countries.css"
import { Component } from "react"

class Countries extends Component {
    render() {
        const { countryData } = this.props;
        return (
            <div className="country-card">
                <Link to={`/${countryData.cca3}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <div className="country-flag-card">
                  <img className="country-flag" alt={countryData.flags.alt} src={countryData.flags.svg} />
                  </div>
                  <div className="country-details">
                      <h4>{countryData.name.common}</h4>
                      <p className="details"><span className="sub-heading">Population: </span>{countryData.population}</p>
                      <p className="details"><span className="sub-heading">Region: </span>{countryData.region}</p>
                      <p className="details"><span className="sub-heading">Capital: </span>{countryData.capital}</p>
                  </div>
               </Link>
            </div >
            
        )
    }
}

export default Countries
