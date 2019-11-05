import React, {Component,useState }from 'react'
import { getList, addToList, deleteItem, updateItem } from './ListFunctions'
import axios from 'axios'

class List extends Component { 
  constructor() {
    super()
    this.state = {
      id: '',
      Kname: '',
      Kkalor: '',
      src: './images/first.png',
      editDisabled: false,
      items: [],
      file: [],
      filename: 'Choose File',
      uploadedFile:{},
      message:'',
      uploadPercentage:0
    } 

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeKalor = this.onChangeKalor.bind(this)
  } 
  componentDidMount() {
    this.getAll()
  }

  onChange = event => {
    this.setState({ Kname: event.target.value, editDisabled: 'disabled' })
  }
  onChangeKalor = event => {
    this.setState({ Kkalor: event.target.value, editDisabled: 'disabled' })
  }
  
  onChangeFile = event => {
    this.setState({ file: event.target.files[0], editDisabled: 'disabled' })
    console.log(this.state.file)

    this.setState({ filename: event.target.files[0].name, editDisabled: 'disabled' })
  }

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          Kname: '',
          Kkalor: '',
          items: [...data]
        },
        () => {
          console.log(this.state.items)
        }
      )
    })
  }

  onSubmit = async e => {    
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('file', file);

    // try { await axios.post('/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });

    // } catch (err) {
    //   if (err.response.status === 500) {
    //   } else {
    //   }
    // }

  const formData = new FormData();
  formData.append('file', this.state.file);
    addToList(this.state.Kname,this.state.Kkalor,formData).then(() => {
      this.getAll()
    })
    this.setState({ editDisabled: false })
  }

  onUpdate = e => {
    e.preventDefault()
    updateItem(this.state.Kname,this.state.Kkalor, this.state.id).then(() => {
      this.getAll()
    })
    this.setState({ editDisabled: false })
  }

  onEdit = (item, itemid, e) => {
    e.preventDefault()
    this.setState({
      id: itemid,
      Kname: item,
      Kkalor: item
    })
  }

  onDelete = (val, e) => {
    e.preventDefault()
    deleteItem(val).then(() => {
      this.getAll()
    })
  }
  render() {
    return (
      <div className="col-md-12">
          {/*  */}
          {localStorage.getItem('usertoken') != null &&
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Task Name</label>
            <div className="row">
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={this.state.Kname || ''}
                  onChange={this.onChange.bind(this)}
                />
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={this.state.Kkalor || ''}
                  onChange={this.onChangeKalor.bind(this)}
                />
                <input
                  type="file"
                  className="form-control"
                  id="exampleInputEmail1"
                  onChange={this.onChangeFile}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary"
                  onClick={this.onUpdate.bind(this)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={this.onSubmit.bind(this)}
            className="btn btn-success btn-block"
          >
            Submit
          </button>
        </form>
      }
          {/*  */}
        <table className="table">
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item.task_name}</td>
                <td className="text-left">{item.kalor}</td>
                <td className="text-left"><img width="50" height="50" src={item.image}/></td>
          {/*  */}
          {localStorage.getItem('usertoken') != null &&
                <td className="text-right">
                  <button
                    href=""
                    className="btn btn-info mr-1"
                    disabled={this.state.editDisabled}
                    onClick={this.onEdit.bind(this, item.task_name,item.kalor, item.id)}
                  >
                    Edit
                  </button>
                  <button
                    href=""
                    className="btn btn-danger"
                    onClick={this.onDelete.bind(this, item.id)}
                  >
                    Delete
                  </button>
                </td>
          }
          {/*  */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default List
