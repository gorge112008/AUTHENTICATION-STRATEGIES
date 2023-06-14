/*INDEX*/
/*******************************************************CONSTANTES/VARIABLES*************************************************************/
/*ALL*/
let RouteIndex = "";
const navHeader = document.querySelector(".header__nav"),
  navFilters = document.querySelector(".static__container--header"),
  navPages = document.querySelector(".dinav__container--pages"),
  formAddProduct = document.querySelector(".dinamic__container--addProduct"),
  listProduct = document.querySelector(".dinamic__container--listProduct"),
  btnReturn = document.querySelector("#return"),
  btnAddNewCart = document.querySelector(".btnAddNewCart"),
  btnAddNewProductMLD = document.querySelector(".btnAsideMLD"),
  btnAddNewProductSD = document.querySelector(".asideSD__dropdown--button"),
  btnExitCart = document.querySelector(".btnExitCart"),
  btnClearCart = document.querySelector(".btnCleanCart");

/*MLD*/
const asideMLD = document.querySelector(".aside__MLD"),
  mldAsideDropdown = document.querySelector(".asideMLD__dropdown"),
  mldasideAddProduct = document.querySelector(".asideMLD__menu--addProduct"),
  mldBtnAddProduct = document.querySelector(
    ".asideMLD__menu--addProduct button"
  ),
  btnNavigationPanel = document.querySelector(
    ".asideMLD__menu--options button"
  ),
  optionNavigationPanel = document.querySelector(".asideMLD__menu--options-ul");

/*SD*/
const asideSD = document.querySelector(".aside__SD"),
  sdAsideDropdown = document.querySelector(".asideSD__dropdown"),
  sdasideAddProduct = document.querySelector(".asideSD__dropdown--addProduct"),
  sdBtnAddProduct = document.querySelector(
    ".asideSD__dropdown--addProduct button"
  );

/*****************************************************************FUNCIONES*************************************************************/
function actionRoute() {
  const route = window.location.pathname;
  const regex = /^\/[^/]+/;
  const routeName = route.match(regex);

  if (routeName == "/login") {
    RouteIndex = "login";
  }
  if (routeName == "/home") {
    RouteIndex = "home";
    modulesActive();
  }

  if (routeName == "/realtimeproducts") {
    const single = validID(route);
    single == 1 ? (RouteIndex = "realTP/") : (RouteIndex = "realTP");
    mldasideAddProduct.classList.remove("hidden");
    sdasideAddProduct.classList.remove("hidden");
    single == 0 && modulesActive();
  }

  if (routeName == "/products") {
    const single = validID(route);
    single == 1 ? (RouteIndex = "productP/") : (RouteIndex = "productP");
    single == 0 && modulesActive();
  }

  if (routeName == "/cart") {
    const single = validID(route);
    single == 1 ? (RouteIndex = "cartP/") : (RouteIndex = "cartP");
    single == 0 && modulesActive();
  }

  if (routeName == "/chat") {
    RouteIndex = "chat";
    modulesActive();
  }
}

function modulesActive() {
  navHeader.classList.remove("hidden");
  asideMLD.classList.remove("hidden");
  asideSD.classList.remove("hidden");
}

function validID(route) {
  const regex = /^\/[^/]+\/([^/]+)/;
  const match = route.match(regex);
  let existId;
  if (match) {
    existId = match[1];
  }
  if (existId) {
    navHeader.classList.add("hidden");
    navFilters && navFilters.classList.add("hidden");
    navPages && navPages.classList.add("hidden");
    btnAddNewCart && btnAddNewCart.classList.add("hidden");
    asideMLD.classList.add("hidden");
    asideSD.classList.add("hidden");
    btnExitCart && btnExitCart.classList.remove("hidden");
    formAddProduct && formAddProduct.classList.remove("inactiveAdd");
    listProduct && listProduct.classList.remove("m12");
    listProduct && listProduct.classList.add("m7");
    btnReturn.classList.add("hidden");
    return 1;
  } else {
    return 2;
  }
}

function controlerForm() {
  if (
    formAddProduct.className == "dinamic__container--addProduct inactiveAdd"
  ) {
    btnAddNewProductMLD.innerHTML = `<i class="fa-regular fa-square-minus fa-bounce"><p>Add Close</p></i>`;
    btnAddNewProductSD.innerHTML = `<i class="fa-regular fa-square-minus fa-bounce"><b>Add Close<b></i>`;
    formAddProduct.classList.remove("inactiveAdd");
    listProduct.classList.remove("m12");
    listProduct.classList.add("m7");
  } else if (formAddProduct.className == "dinamic__container--addProduct") {
    btnAddNewProductMLD.innerHTML = `<i class="fa-regular fa-square-plus fa-bounce"><p>Add Product</p></i>`;
    btnAddNewProductSD.innerHTML = `<i class="fa-regular fa-square-plus fa-bounce"><b>Add Product<b></i>`;
    formAddProduct.classList.add("inactiveAdd");
    listProduct.classList.remove("m7");
    listProduct.classList.add("m12");
  }
}

/*****************************************************************EVENTOS*************************************************************/

mldBtnAddProduct != null
  ? (mldBtnAddProduct.onclick = () => {
      controlerForm();
    })
  : null;

sdBtnAddProduct != null
  ? (sdBtnAddProduct.onclick = () => {
      controlerForm();
    })
  : null;

btnNavigationPanel != null
  ? (btnNavigationPanel.onclick = () => {
      optionNavigationPanel.className == "asideMLD__menu--options-ul hidden"
        ? optionNavigationPanel.classList.remove("hidden")
        : optionNavigationPanel.classList.add("hidden");
    })
  : null;

actionRoute();
