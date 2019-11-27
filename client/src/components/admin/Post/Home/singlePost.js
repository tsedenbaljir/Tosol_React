import React, { Component } from 'react'
import { getSinglePost } from "../PostFunctions";
import Rows from "../rows/index";

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
                    data: data.data,
                    created: data.created,
                    updated: data.updated
                },
                () => {
                    console.log(this.state.items);
                }
            );
        });
    };

    render() {
        const { title, data, src, created } = this.state;
        if (title != null && data != null && src != null && created != null) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 mx-auto">
                            <div class="article-detail">
                                <h2>{title}</h2>
                                <div class="img-holder">
                                    <img src={'/uploads/posts_img/' + src} style={{ width: "100%" }} />
                                </div>
                                <div class="article-body">
                                    {data}
                                    {created}
                                </div>
                            </div>
                        </div>
                        <Rows />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 mx-auto">
                            <h1 className="mt-5 mx-auto">Энэ мэдээлэл олдсонгүй.</h1>
                        </div>
                        <Rows />
                    </div>
                </div>
            )
        }
    }
}

export default singlePost
