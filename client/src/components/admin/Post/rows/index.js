import React, { Component } from 'react'
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
        return (
            <div className="col-sm-2">
                <h3>bar</h3>
                <h3>bar</h3>
                <h3>bar</h3>
                <h3>bar</h3>
                <h3>bar</h3>
            </div>
        )
    }
}

export default App
