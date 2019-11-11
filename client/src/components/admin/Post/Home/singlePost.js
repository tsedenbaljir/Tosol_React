import React, { Component } from 'react'
import { getSinglePost } from "../PostFunctions";

class singlePost extends Component {

    constructor() {
        super();
        this.state = {
        };
    }
    componentDidMount() {
        this.getSinglePost();
    }

    getSinglePost = () => {
        getSinglePost(this.props.match.params.id).then(data => {
            this.setState(
                {
                    title: data.title,
                    src: data.src,
                    data: data.data
                },
                () => {
                    console.log(this.state.items);
                }
            );
        });
    };

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-12 mx-auto">
                        {/* <h1 className="text-center">WELCOME</h1> */}
                        <div class="article-detail">
                            <h2>{this.state.title}</h2>
                            <div class="img-holder">
                                <img src={'/uploads/posts_img/' + this.state.src} />
                            </div>
                            <div class="article-body">
                                {this.state.data}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default singlePost
