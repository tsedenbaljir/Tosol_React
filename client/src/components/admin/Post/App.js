import React, { Component } from 'react'
import './App.css'
import Post from './Post'
import decode from 'jwt-decode'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      items: [],
      users: ''
    }
  }
  componentDidMount() {
    if (localStorage.getItem("usertoken") != null) {
      this.setState({
        users: decode(localStorage.getItem("usertoken"))
      })
    }
  }

  render() {

    if (this.state.users.users_type == "admin" && localStorage.getItem("usertoken") != null) {
      return (
        <div className="container col-md-12">
          <div className="row">
            <div className="col-md mx-auto col-md-12">
              <h1 className="text-center">Posts</h1>
              <Post />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container col-md-12">
          <div className="row">
            <div className="col-md mx-auto col-md-12">
              <h1 className="text-center">Post</h1>
              OOPS
            </div>
          </div>
        </div>
      )
    }
  }
}

export default App
