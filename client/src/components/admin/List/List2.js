import React, { Component } from 'react'
// import { getList, addToList, deleteItem, updateItem } from './ListFunctions'
import axios from 'axios'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }

    // this.onSubmit = this.onSubmit.bind(this)
    // this.onChange = this.onChange.bind(this)
    // this.onChangeKalor = this.onChangeKalor.bind(this)
  }
  maxSelectFile=(event)=>{
    let files = event.target.files // create file object
        if (files.length > 3) { 
           const msg = 'Only 3 images can be uploaded at a time'
           event.target.value = null // discard selected file
           console.log(msg)
          return false;
 
      }
    return true;
 
 }
onChangeHandler=event=>{
      var files = event.target.files
      if(this.maxSelectFile(event)){ 
      // if return true allow to setState
         this.setState({
         selectedFile: files
      })
   }
}
  onClickHandler = () => {
    const data = new FormData()
    for(var x = 0; x<this.state.selectedFile.length; x++) {
        data.append('file', this.state.selectedFile[x])
    }
 
   axios.post("http://localhost:5000/upload", data).then(res => { // then print response status
     console.log(res.statusText)
  })
 
}
  render() {
    return (
      <div className="col-md-12">
          <form onSubmit={this.onSubmit}>
            {/* <input type="file" name="file" onChange={this.onChangeHandler} /> */}
            <input type="file" class="form-control" multiple onChange={this.onChangeHandler}/>
            <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 

          </form>
      </div>
    )
  }
}

export default List
