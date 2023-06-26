import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Header from './Components/Header/header';
import Home from './Components/Home/home';
import EachCountry from './Components/EachCountry/eachCountry';
import ThemeContextProvider from "./Context/context";
import NotFound from "./Components/NotFound/notFound";
import { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component{
  render(){
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:code" component={EachCountry} />
          <Route component={NotFound} />
        </Switch>
      </ThemeContextProvider>
    </BrowserRouter>
  );
  }
}
export default App;

