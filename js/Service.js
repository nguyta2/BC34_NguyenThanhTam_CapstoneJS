class Service {
  getListProduct = () => {
    return axios({
      url: `https://62ff796234344b6431fa3aab.mockapi.io/api/products`,
      method: "GET",
    });
  };

  getProductById = (id) => {
    return axios({
      url: `https://62ff796234344b6431fa3aab.mockapi.io/api/products/${id}`,
      method: "GET",
    });
  };

  deleteProductById = (id) => {
    return axios({
      url: `https://62ff796234344b6431fa3aab.mockapi.io/api/products/${id}`,
      method: "DELETE",
    });
  };

  postProduct = (product) => {
    return axios({
      url: `https://62ff796234344b6431fa3aab.mockapi.io/api/products`,
      method: "POST",
      data: product,
    });
  };

  putProduct = (id, product) => {
    return axios({
      url: `https://62ff796234344b6431fa3aab.mockapi.io/api/products/${id}`,
      method: "PUT",
      data: product,
    });
  };
}
