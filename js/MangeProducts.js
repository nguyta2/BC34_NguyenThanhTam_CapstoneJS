let service = new Service();

const fetchData = () => {
  service
    .getListProduct()
    .then((response) => {
      renderHTML(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const renderHTML = (data) => {
  let content = "";
  data.forEach((product, index) => {
    content += `<tr>
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td><img class='img-fluid' style='height: 100px' src='${
        product.img
      }' /></td>
      <td>${product.desc}</td>
      <td style='display: flex; justify-content: center;' >
        <button class='btn btn-info' data-toggle="modal" data-target="#myModal" onclick='editProduct(${
          product.id
        })'>Update</button>
        <button class='btn btn-danger ml-2' onclick='deleteProduct(${
          product.id
        })'>Delete</button>
      </td>
    </tr>`;
  });

  document.querySelector("#tblDanhSachSP").innerHTML = content;
};

const addProducts = () => {
  let name = document.querySelector("#name").value;
  let price = document.querySelector("#price").value;
  let screen = document.querySelector("#screen").value;
  let backCamera = document.querySelector("#backCamera").value;
  let fontCamera = document.querySelector("#fontCamera").value;
  let img = document.querySelector("#img").value;
  let desc = document.querySelector("#desc").value;
  let type = document.querySelector("#type").value;

  var product = new Products(
    name,
    price,
    screen,
    backCamera,
    fontCamera,
    img,
    desc,
    type
  );

  service
    .postProduct(product)
    .then((response) => {
      fetchData();
    })
    .catch((err) => log(err));
};

const deleteProduct = (id) => {
  service
    .deleteProductById(id)
    .then((response) => {
      fetchData();
    })
    .catch((err) => console.log(err));
};

const updateProduct = (id) => {
  let name = document.querySelector("#name").value;
  let price = document.querySelector("#price").value;
  let screen = document.querySelector("#screen").value;
  let backCamera = document.querySelector("#backCamera").value;
  let frontCamera = document.querySelector("#frontCamera").value;
  let img = document.querySelector("#img").value;
  let desc = document.querySelector("#desc").value;
  let type = document.querySelector("#type").value;
  let product = new Products(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  service
    .putProduct(id, product)
    .then((response) => {
      fetchData();
      // close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch((err) => console.log(err));
};

const editProduct = (id) => {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit product";
  // Update button
  let btnEdit = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnEdit;
  service
    .getProductById(id)
    .then((response) => {
      document.querySelector("#name").value = response.data.name;
      document.querySelector("#price").value = response.data.price;
      document.querySelector("#screen").value = response.data.screen;
      document.querySelector("#backCamera").value = response.data.backCamera;
      document.querySelector("#frontCamera").value = response.data.frontCamera;
      document.querySelector("#img").value = response.data.img;
      document.querySelector("#desc").value = response.data.desc;
      document.querySelector("#type").value = response.data.type;
    })
    .catch((err) => console.log(err));
};

fetchData();
