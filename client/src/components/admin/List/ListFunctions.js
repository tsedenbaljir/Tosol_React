import axios from "axios";

export const getList = () => {
  return axios
    .get("/users/tasks", {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};

export const getCagetory = () => {
  return axios
    .get("/users/category", {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};

export const addToList = (selectValue, kalor_name, kalor, src) => {
  console.log(src);
  return axios
    .post(
      "/users/task",
      {
        category_id:selectValue,
        task_name: kalor_name,
        kalor: kalor,
        image: src,
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(function(response) {
      console.log(response);
    });
};
 
export const updateItem = (id, kalor_name, kalor, src) => {
  return axios
    .put(
      `/users/task/${id}`,
      {
        task_name: kalor_name,
        kalor: kalor,
        image: src
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(function(response) {
      console.log(response);
    });
};

export const deleteItem = term => {
  return axios
    .delete(`/users/task/${term}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
