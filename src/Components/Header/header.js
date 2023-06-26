import "./header.css";
import { ThemeContext } from "../../Context/context";
import { Component } from "react";
import { Tooltip } from "react-bootstrap";
import { OverlayTrigger } from 'react-bootstrap';

class Header extends Component {

  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => {
          const { light, dark, isLightTheme, changeTheme } = value
          const theme = isLightTheme ? light : dark

          const themeText = isLightTheme ? "Light Mode" : "Dark Mode"

          const renderTooltip = (props) => (
            <Tooltip id="tooltip" {...props}>
             In this website you can know the details of all the countries in the world, you can click on the country flag and get more details of country.
            </Tooltip>
          );

          const onClickTheme = () => {
            changeTheme()
          }

          return (
            <nav className="navbar-card" style={{ background: theme.bg, color: theme.color }}>
              <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                 <h3 className="header-text">Where is my World?</h3>
              </OverlayTrigger>
              <button style={{ color: theme.color }} className="button" onClick={onClickTheme}><i className="darklight fa fa-moon"></i>{themeText}</button>
            </nav>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Header
