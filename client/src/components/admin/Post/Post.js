import React, { Component, useState } from "react";
import { getPosts, addToList, deleteItem, updateItem } from "./PostFunctions";
import axios from "axios";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      data: "",
      editDisabled: true,
      items: [],
      file: "",
      filename: "Choose File",
      uploadedFile: {},
      message: "",
      uploadPercentage: 0,
      stop: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeKalor = this.onChangeKalor.bind(this);
    this.Cancel = this.Cancel.bind(this);
  }
  componentDidMount() {
    this.getAll();
  }

  Cancel = (e) => {
    e.preventDefault();
    this.setState({
      id: "",
      title: "",
      data: "",
      editDisabled: true,
      items: [],
      file: "",
      filename: "Choose File",
      uploadedFile: {},
      message: "",
      uploadPercentage: 0,
      stop: true
    });
    this.getAll();
  };
  onChange = event => {
    this.setState({ title: event.target.value, stop: false });
  };
  onChangeKalor = event => {
    this.setState({ data: event.target.value, stop: false });
  };

  onChangeFile = event => {
    if (event.target.files[0]) {
      this.setState({
        file: event.target.files[0],
        stop: false
      })
      //.then(err => console.log(err));
    } else {
      console.log("Something went wrong");
    }
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

  onSubmit = async e => {
    e.preventDefault();
    if (!this.state.stop) {
      const formData = new FormData();
      formData.append("image", this.state.file);
      // if (!this.state.file) {
      fetch("/post/posts/upload", {
        method: "POST",
        body: formData
      }).then(response => response.json())
        .then(response =>
          addToList(this.state.title, response.path, this.state.data).then(() => {
            this.getAll();
          })
        );
      // } else {
      // console.log("file havent")
      // }
    } else {
      this.setState({
        message: "wait a minut ..."
      })
    }
  };

  onUpdate = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.file);
    fetch("/post/posts/upload", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(response =>
        updateItem(this.state.id, this.state.title, response.path, this.state.data).then(() => {
          this.getAll();
        })
      );
  };

  onEdit = (itemid, title, data, image, e) => {
    e.preventDefault();
    this.setState({
      id: itemid,
      title: title,
      data: data,
      file: image,
      editDisabled: false
    });
  };

  onDelete = (val, e) => {
    e.preventDefault();
    deleteItem(val).then(() => {
      this.getAll();
    });
  };
  render() {
    return (
      <div className="col-md-12">
        {/*  */}
        <div className="row">
          <div className="mx-auto col-md-9">
            <div className="row">
              {localStorage.getItem("usertoken") != null && (
                <div className="mx-auto col-md-12">
                  <form onSubmit={this.onSubmit} noValidate>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1"></label>
                      <div className="row">
                        <div className="col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Хүнсний нэр"
                            value={this.state.title || ""}
                            onChange={this.onChange.bind(this)}
                            required
                          />
                          <input
                            type="file"
                            id="file"
                            onChange={this.onChangeFile}
                            style={{ display: "none" }}
                            required
                          />
                          <label className="form-control" for="file">
                            <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i>
                            Зураг сонгоно уу.</label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="desc"
                            placeholder="Агуулагдах Калор"
                            value={this.state.data || ""}
                            onChange={this.onChangeKalor.bind(this)}
                            required
                          />
                          {!this.state.editDisabled ?
                            <button className="btn btn-primary btn-block"
                              onClick={this.Cancel.bind(this)}
                            >Болих</button> : <div></div>}
                          {this.state.editDisabled ? <button
                            type="submit"
                            onClick={this.onSubmit.bind(this)}
                            className="btn btn-success btn-block"
                          >Хадгалах</button>
                            : <button
                              type="submit"
                              onClick={this.onUpdate.bind(this)}
                              className="btn btn-warning btn-block"
                            >Шинэчлэх</button>}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {/*  */}
              <table className="mx-auto col-md-12">
                <tbody className="table-bordered">
                  <tr class="text-primary">
                    <td className="text-left"><h3>Гарчиг</h3></td>
                    <td className="text-center col-md-6"><h3>Нийтлэл</h3></td>
                    <td className="text-center col-md-4"><h3>Зураг</h3></td>
                    {localStorage.getItem("usertoken") != null && (
                      <td className="text-right col-4"></td>
                    )}
                  </tr>
                  {this.state.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td className="text-center col-6">{item.data}</td>
                      <td className="text-center col-4">
                        <img width="150" height="auto" src={'uploads/posts_img/' + item.src} />
                      </td>
                      {/*  */}
                      {localStorage.getItem("usertoken") != null && (
                        <td className="text-right">
                          <button
                            href=""
                            className="btn btn-info mr-1"
                            onClick={this.onEdit.bind(
                              this, item.id, item.title, item.src, item.data,
                            )}
                            >Засах</button>
                            <td style={{border:"none"}}>
                          <button
                            href=""
                            className="btn btn-danger"
                            onClick={this.onDelete.bind(this, item.id)}
                          >Устгах</button>
                          </td>
                        </td>
                      )}
                      {/*  */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
