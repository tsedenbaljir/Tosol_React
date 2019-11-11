import axios from "axios";

export const getPosts = () => {
  return axios
    .get("/post/posts", {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};


export const getSinglePost = (id) => {
  console.log(id)
  return axios
    .get(`/post/posts/${id}`,{
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      return res.data;
    });
};

export const addToList = (title, src, data) => {
  console.log(src);
  return axios
    .post(
      "/post/posts",
      {
        title,
        src,
        data
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(function(response) {
      console.log(response);
    });
};
 
export const updateItem = (id, title, src, data) => {
  return axios
    .put(
      `/post/posts/${id}`,
      {
        title,
        src,
        data
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
    .delete(`/post/posts/${term}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
