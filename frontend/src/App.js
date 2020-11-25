import React, { Component } from "react"
import "./App.css"
import LeftNav from "./Components/nav/leftNav"

class App extends Component {
  _isMounted = false;
  constructor() {
    super()
      this.proxy = "http://localhost:8080";
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentDidUpdate() {
    this._isMounted = false;
  }
  
  render() {
    return ( 
      <div>
      <LeftNav />
      </div>
    )
  }
}

export default App;