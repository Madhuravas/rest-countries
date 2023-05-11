import { createContext, Component } from "react";

export const ThemeContext = createContext()

class ThemeContextProvider extends Component {
    state = {
        isLightTheme: false,
        dark: { bg: "hsl(207, 26%, 17%)" , color:"hsl(0, 0%, 98%)"},
        light:{bg:"hsl(0, 0%, 98%)",color:"hsl(207, 26%, 17%)"}
    }
    
    changeTheme = () =>{
        this.setState({isLightTheme: !this.state.isLightTheme})
    }

    render() {
        return (
            <ThemeContext.Provider value={{...this.state, changeTheme:this.changeTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}


export default ThemeContextProvider
