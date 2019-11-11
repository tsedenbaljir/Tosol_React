import React, { Component } from 'react' 

class Body extends Component { 

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
                          value={this.state.Kname || ""}
                          onChange={this.onChange.bind(this)}
                          required
                        />
                        <input
                          type="number"
                          className="form-control"
                          id="desc"
                          placeholder="Агуулагдах Калор"
                          value={this.state.Kkalor || ""}
                          onChange={this.onChangeKalor.bind(this)}
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
                <tr>
                  <td className="text-left col-4"><h3>Хүнсний нэр</h3></td>
                  <td className="text-center"><h3>Агуулагдах илчлэг</h3></td>
                  <td className="text-center col-4"><h3>Зураг</h3></td>
                  {localStorage.getItem("usertoken") != null && (
                    <td className="text-right col-4"></td>
                  )}
                </tr>
                {this.state.items.map((item, index) => (
                  <tr key={index}>
                    <td className="text-left col-4">{item.task_name}</td>
                    <td>{item.kalor}</td>
                    <td className="text-center col-4">
                      <img width="150" height="auto" src={'uploads/' + item.image} />
                    </td>
                    {/*  */}
                    {localStorage.getItem("usertoken") != null && (
                      <td className="text-right">
                        <button
                          href=""
                          className="btn btn-info mr-1"
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
        </div>
        <div className="mx-auto col-md-3">
          <div>
            <a href="#">
              ХҮНИЙ ИЛЧЛЭГ
            </a>
          </div>
          <div>
            <a href="#">
              АМЬТНЫ ИЛЧЛЭГ
            </a>
          </div>
          <div>
            <a href="#">
              ХООЛНЫ ИЛЧЛЭГ
            </a>
          </div>
          <div>
            <a href="#">
              ЖИМСНИЙ ИЛЧЛЭГ
            </a>
          </div>
          <div>
            <a href="#">
              ХҮНСНИЙ ИЛЧЛЭГ
            </a>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Body
