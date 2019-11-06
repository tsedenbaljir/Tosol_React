import React, { Component, useState } from "react";
import { getList, addToList, deleteItem, updateItem } from "./ListFunctions";
import axios from "axios";

class List extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      Kname: "",
      Kkalor: "",
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
      Kname: "",
      Kkalor: "",
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
    this.setState({ Kname: event.target.value, stop: false });
  };
  onChangeKalor = event => {
    this.setState({ Kkalor: event.target.value, stop: false });
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
    getList().then(data => {
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
    if (!this.state.stop) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", this.state.file);
      fetch("/users/task/upload", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(response =>
          addToList(this.state.Kname, this.state.Kkalor, response.path).then(() => {
            this.getAll();
          })
        );
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
    fetch("/users/task/upload", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(response =>
        updateItem(this.state.id, this.state.Kname, this.state.Kkalor, response.path).then(() => {
          this.getAll();
        })
      );
  };

  onEdit = (itemid, Kname, Kkalor, image, e) => {
    e.preventDefault();
    this.setState({
      id: itemid,
      Kname: Kname,
      Kkalor: Kkalor,
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
        {localStorage.getItem("usertoken") != null && (
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1"></label>
              <div className="row">
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Хүнсний нэр"
                    value={this.state.Kname || ""}
                    onChange={this.onChange.bind(this)}
                  />
                  <input
                    type="number"
                    className="form-control"
                    id="desc"
                    placeholder="Агуулагдах Калор"
                    value={this.state.Kkalor || ""}
                    onChange={this.onChangeKalor.bind(this)}
                  />
                  <input
                    type="file"
                    id="file"
                    onChange={this.onChangeFile}
                    style={{display:"none"}}
                  />
                  <label className="form-control"  for="file">Зураг сонгоно уу.</label>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-primary"
                    onClick={this.Cancel.bind(this)}
                  >Болих</button>
                </div>
              </div>
            </div>
            {this.state.editDisabled ? <button
              type="submit"
              onClick={this.onSubmit.bind(this)}
              className="btn btn-success btn-block"
            >Илгээх</button>
              : <button
                type="submit"
                onClick={this.onUpdate.bind(this)}
                className="btn btn-success btn-block"
              >Шинэчлэх</button>}
          </form>
        )}
        {/*  */}
        <table className="table">
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item.task_name}</td>
                <td className="text-left">{item.kalor}</td>
                <td className="text-left">
                  <img width="50" height="50" src={'uploads/' + item.image} />
                </td>
                {/*  */}
                {localStorage.getItem("usertoken") != null && (
                  <td className="text-right">
                    <button
                      href=""
                      className="btn btn-info mr-1"
                      // disabled={this.state.editDisabled}
                      onClick={this.onEdit.bind(
                        this, item.id, item.task_name, item.kalor, item.image,
                      )}
                    >Засах</button>
                    <button
                      href=""
                      className="btn btn-danger"
                      onClick={this.onDelete.bind(this, item.id)}
                    >Устгах</button>
                  </td>
                )}
                {/*  */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
