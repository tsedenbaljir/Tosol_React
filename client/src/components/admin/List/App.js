import React, { Component } from 'react'
import './App.css'
import List from './List'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      items: []
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md mx-auto">
            <h1 className="text-center">Хүнсний илчэлгүүд </h1>
            <List />
          </div>
        </div>
      </div>
    )
  }
}

export default App
