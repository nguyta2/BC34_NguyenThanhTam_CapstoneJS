let productList = [];
let cartDetails = [];

let loadData = () => {
  return JSON.parse(localStorage.getItem("cartDetails"));
};

let saveData = (data) => {
  localStorage.setItem("cartDetails", JSON.stringify(data));
};

cartDetails = loadData();
RenderCart();
CartItemsTotal();
function getEle(id) {
  return document.getElementById(id);
}

function sideNav(e) {
  let t = document.getElementsByClassName("side-nav")[0];
  let n = document.getElementsByClassName("cover")[0];
  t.style.right = e ? "0" : "-100%";
  n.style.display = e ? "block" : "none";
}

function order() {
  let e = document.getElementsByClassName("invoice")[0];
  (e.style.height = "500px"),
    (e.style.width = "400px"),
    (e.innerHTML = OrderConfirm()),
    ToggleBackBtns(),
    Stocks(),
    clearCart();
}

function okay(e) {
  let t = document.getElementsByClassName("invoice")[0];
  "continue" == e.target.innerText
    ? ((t.style.display = "none"),
      (document.getElementsByClassName("purchase-cover")[0].style.display =
        "none"))
    : ((e.target.innerText = "continue"),
      (e.target.parentElement.getElementsByClassName(
        "order-details"
      )[0].innerHTML = "<em class='thanks'>Thanks for shopping with us</em>"),
      (t.style.height = "180px"));
}

function Stocks() {
  cartDetails.forEach((e) => {
    productList.forEach((t) => {
      e.name == t.name &&
        t.quantity >= 0 &&
        ((t.quantity -= e.quantity),
        t.quantity < 0
          ? ((t.quantity += e.quantity),
            (document.getElementsByClassName("invoice")[0].style.height =
              "180px"),
            (document.getElementsByClassName("order-details")[0].innerHTML =
              "<em class='thanks'>Stocks Limit Exceeded</em>"))
          : 0 == t.quantity
          ? OutOfStock(t, 1)
          : t.quantity <= 5 && OutOfStock(t, 0));
    });
  });
}

function buy(e) {
  0 != cartDetails.length &&
    (sideNav(!e),
    (document.getElementsByClassName("purchase-cover")[0].style.display = e
      ? "block"
      : "none"),
    (document.getElementsByClassName("order-now")[0].innerHTML = e
      ? purchase()
      : ""));
}

function purchase() {
  let e = document.getElementsByClassName("total")[0].innerText,
    t = cartDetails.map((e) => `<span>${e.quantity} x ${e.name}</span>`),
    n = cartDetails.map((e) => `<span>$ ${e.price * e.quantity}</span>`);
  return `\n  <div class='invoice'>\n    <div class='shipping-items'>\n      <div class='item-names'>${t.join(
    ""
  )}</div>\n      <div class='items-price'>${n.join(
    "+"
  )}</div>\n    </div>\n  <hr>\n    <div class='payment'>\n      <em>payment</em>\n      <div>\n        <p>total amount to be paid:</p><span class='pay'>$ ${e}</span>\n      </div>\n    </div>\n    <div class='order'>\n      <button onclick='order()' class='btn-order btn'>Order Now</button>\n      <button onclick='buy(0)' class='btn-cancel btn'>Cancel</button>\n    </div>\n  </div>`;
}

function OrderConfirm() {
  return `\n  <div>\n    <div class='order-details'>\n      <em>your order has been placed</em>\n      <p>Your order-id is : <span>${Math.round(
    1e3 * Math.random()
  )}</span></p>\n      <p>your order will be delivered to you in 3-5 working days</p>\n      <p>you can pay <span>$ ${
    document.getElementsByClassName("total")[0].innerText
  }</span> by card or any online transaction method after the products have been dilivered to you</p>\n    </div>\n    <button onclick='okay(event)' class='btn-ok'>okay</button>\n  </div>`;
}

function QtyBtn(e = 1) {
  return 0 == e
    ? AddBtn()
    : `\n  <div>\n    <button class='btn-qty' onclick="qtyChange(this,'sub')"><i class='fas fa-chevron-left'></i></button>\n    <p class='qty'>${e}</p>\n    <button class='btn-qty' onclick="qtyChange(this,'add')"><i class='fas fa-chevron-right'></i></button>\n  </div>`;
}

function AddBtn() {
  return "\n  <div>\n    <button onclick='addItem(this)' class='add-btn'>Add <i class='fas fa-chevron-right'></i></button>\n  </div>";
}

function RenderCart() {
  document.getElementsByClassName("cart-items")[0].innerHTML =
    DisplayCartItems();
}

function DisplayCartItems() {
  if (cartDetails) {
    return cartDetails.map((e) => CartItems(e)).join("");
  }
}

function CartItemsTotal() {
  if (cartDetails) {
    let e = cartDetails.reduce((e, t) => e + t.price * t.quantity, 0),
      t = cartDetails.reduce((e, t) => e + t.quantity, 0);
    (document.getElementsByClassName("total")[0].innerText = e),
      (document.getElementsByClassName("total-qty")[0].innerText = t);
  }
}

function limitPurchase(e) {
  (document.getElementsByClassName("purchase-cover")[0].style.display = "none"),
    (e.parentElement.style.display = "none"),
    sideNav(1);
}

function addItem(e) {
  let t =
    e.parentElement.parentElement.parentElement.parentElement.parentElement;
  if ("flex" == t.getElementsByClassName("out-of-stock-cover")[0].style.display)
    return;
  let name = t.getElementsByClassName("product-name")[0].innerText,
    price = parseFloat(
      t.getElementsByClassName("product-price")[0].innerText.replace("$ ", "")
    ),
    id = t.getElementsByClassName("productId")[0].innerText,
    type = t.getElementsByClassName("type")[0].innerText,
    desc = t.getElementsByClassName("desc")[0].innerText,
    screen = t.getElementsByClassName("screen")[0].innerText,
    frontCamera = t.getElementsByClassName("frontCamera")[0].innerText,
    backCamera = t.getElementsByClassName("backCamera")[0].innerText,
    imgSrc = t.getElementsByClassName("product-img")[0].src;

  SwitchBtns(t);
  // let i = { name: n, price: p, imgSrc: s, qty: 1 };
  let item = new Products(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    imgSrc,
    desc,
    type,
    1
  );
  cartDetails = cartDetails || [];
  CartItems(item),
    cartDetails.push(item),
    saveData(cartDetails),
    RenderCart(),
    CartItemsTotal();
}

function SwitchBtns(e) {
  let t = e.getElementsByClassName("btn-add")[0];
  t.classList.toggle("qty-change");
  let n = t.classList.contains("qty-change");
  e.getElementsByClassName("btn-add")[0].innerHTML = n ? QtyBtn() : AddBtn();
}

function removeItem(e) {
  let t = e.parentElement.getElementsByClassName("name")[0].innerText,
    n = document.getElementsByClassName("product-name");
  cartDetails.forEach((e, a) => {
    if (t == e.name) {
      cartDetails.splice(a, 1);
      for (let e of n)
        if (t == e.innerText) {
          SwitchBtns(e.parentElement.parentElement);
        }
    }
  }),
    saveData(cartDetails),
    RenderCart(),
    CartIsEmpty(),
    CartItemsTotal();
}

function clearCart() {
  ToggleBackBtns(),
    (cartDetails.length = 0),
    RenderCart(),
    CartIsEmpty(),
    CartItemsTotal(),
    saveData(cartDetails);
}

function ToggleBackBtns() {
  let e = document.getElementsByClassName("btn-add");
  for (let t of e)
    t.classList.contains("qty-change") && t.classList.toggle("qty-change"),
      (t.innerHTML = AddBtn());
}

function CartItems(e = {}) {
  return `\n  <div class='cart-item'>\n    <div class='cart-img'>\n      <img src='${
    e.img
  }' alt='' />\n    </div>\n    <strong class='name'>${
    e.name
  }</strong>\n    <span class='qty-change'>${QtyBtn(
    e.quantity
  )}</span>\n    <p class='price'>$ ${
    e.price * e.quantity
  }</p>\n    <button onclick='removeItem(this)'><i class='fas fa-trash'></i></button>\n  </div>`;
}

function qtyChange(e, t) {
  let n = e.parentElement.parentElement,
    a = n.classList.contains("btn-add")
      ? n.parentElement.parentElement.getElementsByClassName("product-name")[0]
          .innerText
      : n.parentElement.getElementsByClassName("name")[0].innerText,
    s = document.getElementsByClassName("product-name");

  for (let e of s)
    if (a == e.innerText) {
      let s =
        e.parentElement.parentElement.getElementsByClassName("qty-change")[0];
      cartDetails.forEach((e, i) => {
        a == e.name &&
          ("add" == t && e.quantity < 10
            ? ((e.quantity += 1),
              (n.innerHTML = QtyBtn(e.quantity)),
              (s.innerHTML = QtyBtn(e.quantity)))
            : "sub" == t
            ? ((e.quantity -= 1),
              (n.innerHTML = QtyBtn(e.quantity)),
              (s.innerHTML = QtyBtn(e.quantity)),
              e.quantity < 1 &&
                (cartDetails.splice(i, 1),
                (s.innerHTML = AddBtn()),
                s.classList.toggle("qty-change")))
            : ((document.getElementsByClassName(
                "purchase-cover"
              )[0].style.display = "block"),
              (document.getElementsByClassName("stock-limit")[0].style.display =
                "flex"),
              sideNav(0)));
      });
    }
  saveData(cartDetails);
  RenderCart(), CartIsEmpty(), CartItemsTotal();
}

function CartIsEmpty() {
  0 == cartDetails.length &&
    (document.getElementsByClassName("cart-items")[0].innerHTML =
      "<span class='empty-cart'>Looks Like You Haven't Added Any Product In The Cart</span>");
}

let product = new Service();
product
  .getListProduct()
  .then((response) => {
    productList = response.data;
    renderHTML(productList);
  })
  .catch((err) => {
    console.log(err);
  });

function renderHTML(data) {
  var content = "";
  data.forEach(function (product, index) {
    content += `
    <div class="card">
      <div class="top-bar">
        <i class="fab fa-apple"></i>
        <em class='productId' style='display:none'>${product.id}</em>
        <em class="stocks">In Stock</em>
      </div>
      <div class="img-container">
        <img
          class="product-img"
          src=${product.img}
          alt="#"
        />
        <div class="out-of-stock-cover">
          <span>Out Of Stock</span>
        </div>
      </div>
      <div class="details">
        <div class="name-fav">
          <strong class="product-name">${product.name}</strong>
          <button onclick="this.classList.toggle('fav')" class="heart">
            <i class="fa fa-heart"></i>
          </button>
        </div>
        <div class="wrapper">
          <h5 class="type">${product.type}</h5>
          <p class="desc">${product.desc}</p>
          <p class="screen">${product.screen}</p>
          <p class="frontCamera">Front camera: ${product.frontCamera}</p>
          <p class="backCamera">Back camera: ${product.backCamera}</p>
        </div>
        <div class="purchase">
          <p class="product-price">$ ${product.price}</p>
          <span class="btn-add">
            <div>
              <button onclick="addItem(this)" class="add-btn">
                Add
                <i class="fa fa-angle-right"></i>
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
    `;
  });
  getEle("main-cart").innerHTML = content;
}

function filterProduct() {
  let samsungProducts = [];
  let iphoneProducts = [];

  iphoneProducts = productList.filter((product) => {
    return product.type.toLowerCase() === "iphone";
  });

  samsungProducts = productList.filter((product) => {
    return product.type.toLowerCase() === "samsung";
  });

  if (getEle("phoneType").value === "iphone") {
    renderHTML(iphoneProducts);
  } else if (getEle("phoneType").value === "samsung") {
    renderHTML(samsungProducts);
  } else {
    renderHTML(productList);
  }
}
