import React, { Component } from 'react'
import { getPosts } from "../PostFunctions";
import Rows from "../rows/index";

class index extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
        };
    }
    componentDidMount() {
        this.getAll();
    }

    getAll = () => {
        getPosts().then(data => {
            this.setState(
                {
                    items: [...data]
                },
                () => {
                    console.log(this.state.items);
                }
            );
        });
    };

    render() {
        const postStyle = {
            marginBottom: "10px",
            padding: "50px",
            borderColor: "black",
            overflow: "hidden",
            margin: "20px 0",
            padding: "20px 0",
            position: "relative",
            background: "#fff",
            boxShadow: "0 1px 4px #ddd",
        };
        const postImg = {
            float: 'left',
            width: 'auto',
            height: '150px',
            margin: '0 15px 0 15px',
        };
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-10 mx-auto">
                        {this.state.items.map((item, index) => (
                            <a key={index} class="font lightbox" href={"Post/" + item.id}>
                                <div class="row article-brief" style={postStyle} >
                                    <div class="col-sm-3 article-thumb">
                                        <div class="rel">
                                            <img class="col-sm-12 article-thumb" style={postImg} src={'uploads/posts_img/' + item.src} />
                                        </div>
                                    </div>
                                    <div class="col-sm-9 article-text text-left">
                                        <div class="article-title"><h4 style={{ textTransform: 'uppercase' }}>{item.title}</h4></div>
                                        <div class="brief">{item.data}</div>
                                        {/* <div class="brief text-right">{item.created.substring(0, 10)}</div> */}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                    <Rows/>
                </div>
            </div>
        )
    }
}

export default index;