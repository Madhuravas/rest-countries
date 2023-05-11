import "./borders.css"
import { Component } from "react"
import { Link } from "react-router-dom"

class Borders extends Component {

   render() {
      const { border } = this.props
      return (
         <Link to={`/${border}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
         <div className="border-card">
            <p className="border-text">{border}</p>
         </div>
         </Link>
      )
   }
}


export default Borders
