import axios from 'axios'

export const getList = () => {
  return axios
    .get('/users/tasks', {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      return res.data
    })
}

export const addToList = (kalor_name, kalor, src) => {

  return axios.post('/users/task', {
    post: {
      task_name: kalor_name,
      kalor: kalor,
      image: src.name,
      file:"dfasda"
    }
  },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  ).then(function (response) {
    console.log(response)
  });

}

export const deleteItem = term => {
  return axios
    .delete(`/users/task/${term}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export const updateItem = (term, id) => {
  return axios
    .put(
      `/users/task/${id}`,
      {
        task_name: term
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(function (response) {
      console.log(response)
    })
}
