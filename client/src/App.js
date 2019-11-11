import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Kalor from './components/admin/List/App'
import Post from './components/admin/Post/App'
import PostSingle from './components/admin/Post/Home/singlePost'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="row" style={{/*float:"left",width:*/}}>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/Kalor" component={Kalor} />
            <Route exact path="/Post" component={Post} />
            <Route exact path="/Post/:id" component={PostSingle} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
