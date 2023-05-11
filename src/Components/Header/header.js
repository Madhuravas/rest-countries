import "./header.css"
import { ThemeContext } from "../../Context/context"
import { Component } from "react"

class Header extends Component{

  render(){
  return (
    <ThemeContext.Consumer>
      {(value) => {
        const { light, dark, isLightTheme, changeTheme } = value
        const theme = isLightTheme ? light : dark
        
        const themeText = isLightTheme ? "Light Mode" : "Dark Mode" 

        const onClickTheme = () => {
          changeTheme()
        }

        return (
          <nav className="navbar-card" style={{ background: theme.bg, color: theme.color }}>
            <h2>Where is my World?</h2>
            <button style={{ color: theme.color }} className="button" onClick={onClickTheme}><i className="darklight fa fa-moon"></i>{themeText}</button>
          </nav>
        )
      }}
    </ThemeContext.Consumer>
  )
}
}

export default Header
