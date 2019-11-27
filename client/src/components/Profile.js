import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import './Profile.css'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
    })
  }

  render() {
    return (
      <div className="container">
        {/* <div className="jumbotron mt-5"> */}
        <div className="row">
          <div className="col-sm-6 mx-auto">
            <div className="jumbotron mt-5">
              <div className="col-sm-8 mx-auto">
                <h1 className="text-center">ХЭРЭГЛЭГЧ</h1>
              </div>
              <table className="table col-md-6 mx-auto">
                <tbody className="mx-auto">
                  <tr>
                    <td>ОВОГ</td>
                    <td>{this.state.first_name}</td>
                  </tr>
                  <tr>
                    <td>НЭР</td>
                    <td>{this.state.last_name}</td>
                  </tr>
                  <tr>
                    <td>Е-МАЙЛ</td>
                    <td>{this.state.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-6 mx-auto">
            <div className="jumbotron mt-5">
              <div className="col-sm-8 mx-auto">
                <h1 className="text-center">Admin</h1>
              </div>
            </div>
            <div className="jumbotron mt-5">
              <div className="col-sm-8 mx-auto">
                <h1 className="text-center">Chat</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
