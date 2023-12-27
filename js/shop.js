//variables
import articles from "../assets/json/articles.json" assert { type: "json" };

let sortBy = document.getElementById("sort");
const productContainer = document.getElementById("productGridContainer");
const sortFieldset = document.getElementById("sortFieldset");
const filterTypeFieldset = document.getElementById("filterTypeFieldset");
const filterBrandFieldset = document.getElementById("filterBrandFieldset");
const cartContainer = document.getElementById("cartContainer");

//functions

//--Function to add a cartain product to cart.
const addToCart = (product) => {
  if (!product.isOnCart) {
    product.isOnCart = true;
    product.count = 1;
  } else {
    product.count++;
  }
  loadCart();
};
//--Function to add cartain item to wishlist
const addToWish = (product, buttonItem) => {
  if (!product.isOnCart) {
    product.isOnCart = true;
    buttonItem.className = `fas fa-heart`;
  } else {
    product.isOnCart = false;
    buttonItem.className = `far fa-heart`;
  }
};
//--Function to calculate the cart total
const calcTotal = (cartArr) => {
  let total = 0;
  for (const article of cartArr) {
    total += article.price * article.count;
  }
  return total.toFixed(2);
};
//--Function to load the entire cart
const loadCart = () => {
  //Make cart array
  let shoppingCart = [];
  //Get all elements from db that are Have prop. isOnCart = true and insert into cart array
  for (const article of articles) {
    if (article.isOnCart) {
      shoppingCart.push(article);
    }
  }
  //clear the cart element of all its child elements to start from clean slate.
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
  //if cart is empty display "cart empty", else display cart.
  let h1ShoppingCart = document.createElement("h1");
  if (shoppingCart.length == 0) {
    h1ShoppingCart.textContent = `Winkelmandje is leeg`;
    cartContainer.appendChild(h1ShoppingCart);
  } else {
    h1ShoppingCart.textContent = `Winkelmandje `;
    cartContainer.appendChild(h1ShoppingCart);
  }

  let shoppingCartElement = document.createElement("article");
  cartContainer.appendChild(shoppingCartElement);
  shoppingCartElement.id = `shoppingCart`;

  for (const product of shoppingCart) {
    //create elements
    let cartItemDiv = document.createElement("div");
    let cartItemA = document.createElement("a");
    let cartItemImg = document.createElement("img");
    let cartItemPName = document.createElement("p");
    let cartItemPPrice = document.createElement("p");
    let cartItemButtonDiv = document.createElement("div");
    let cartItemBtnMore = document.createElement("button");
    let cartItemBtnLess = document.createElement("button");
    let cartItemBtnDelete = document.createElement("button");
    let cartItemPAmount = document.createElement("p");
    //append elements
    shoppingCartElement.appendChild(cartItemDiv);
    cartItemDiv.appendChild(cartItemA);
    cartItemA.appendChild(cartItemImg);
    cartItemA.appendChild(cartItemPName);
    cartItemA.appendChild(cartItemPPrice);
    cartItemDiv.appendChild(cartItemButtonDiv);
    cartItemButtonDiv.appendChild(cartItemBtnLess);
    cartItemButtonDiv.appendChild(cartItemPAmount);
    cartItemButtonDiv.appendChild(cartItemBtnMore);
    cartItemButtonDiv.appendChild(cartItemBtnDelete);
    //insert data
    cartItemA.href = `product.html`;
    //--If clicked on link, store productIndex to local storage so that product page knows what to load.
    cartItemA.addEventListener("click", () => {
      localStorage.setItem("product", product.index);
    });
    cartItemImg.src = product.imageSrc;
    cartItemImg.alt = `product photo`;
    cartItemPName.textContent = product.articleName;
    cartItemPPrice.textContent = `€ ${product.price}`;
    cartItemPPrice.style.fontStyle = `bold`;
    cartItemButtonDiv.id = `buttonDiv`;
    cartItemBtnMore.textContent = `+`;
    cartItemBtnLess.textContent = `-`;
    cartItemBtnDelete.className = `fas fa-trash-can`;
    //--eventlistener to increase amount of item in cart
    cartItemBtnMore.addEventListener("click", () => {
      product.count += 1;
      cartItemPAmount.textContent = product.count;
      //--call function to reload cart.
      loadCart();
    });
    //--eventlistener to decrease amount of item in cart
    cartItemBtnLess.addEventListener("click", () => {
      if (product.count > 1) {
        product.count -= 1;
        cartItemPAmount.textContent = product.count;
      } else {
        product.count = 0;
        product.isOnCart = false;
      }
      //--call function to reload cart.
      loadCart();
    });
    //--eventlistener to delete item from cart.
    cartItemBtnDelete.addEventListener("click", () => {
      product.count = 0;
      product.isOnCart = false;
      //--call function to reload cart.
      loadCart();
    });
    cartItemPAmount.textContent = product.count;
  }
  //if cart not empty, calculate and display total price.
  if (shoppingCart.length != 0) {
    let calcTotalp = document.createElement("p");
    cartContainer.appendChild(calcTotalp);
    calcTotalp.textContent = `Totaal: €${calcTotal(shoppingCart)}`;
    calcTotalp.style.fontSize = `1.5rem`;
  }
};
//--Function to generate the filter menu at top of page.
const generateFilterMenu = (articles) => {
  //Get all brands and types of all products and add them to coresponding arrays.
  let brands = [];
  let types = [];
  for (const article of articles) {
    if (!brands.includes(article.brand)) {
      brands.push(article.brand);
    }
    if (!types.includes(article.type)) {
      types.push(article.type);
    }
  }
  //sort types and brands alphabethically.
  brands.sort((a, b) => a.localeCompare(b));
  types.sort((a, b) => a.localeCompare(b));

  //create elements
  let sortLegend = document.createElement("h2");
  let sortDropdownIcon = document.createElement("i");
  let sortElementsDiv = document.createElement("div");
  let noSortDiv = document.createElement("div");
  let priceAscDiv = document.createElement("div");
  let priceDescDiv = document.createElement("div");
  let alphabethicalDiv = document.createElement("div");
  let alphabethicalRevDiv = document.createElement("div");
  let noSortRadio = document.createElement("input");
  let noSortLabel = document.createElement("label");
  let priceAscRadio = document.createElement("input");
  let priceAscLabel = document.createElement("label");
  let priceDescRadio = document.createElement("input");
  let priceDescLabel = document.createElement("label");
  let alphabethicalRadio = document.createElement("input");
  let alphabethicalLabel = document.createElement("label");
  let alphabethicalRevRadio = document.createElement("input");
  let alphabethicalRevLabel = document.createElement("label");
  let filterTypeLegend = document.createElement("h2");
  let filterTypeDropdownIcon = document.createElement("i");
  let filterTypeElementsDiv = document.createElement("div");
  let filterBrandLegend = document.createElement("h2");
  let filterBrandDropdownIcon = document.createElement("i");
  let filterBrandElementsDiv = document.createElement("div");

  //append children
  sortFieldset.appendChild(sortLegend);
  sortFieldset.appendChild(sortElementsDiv);
  sortLegend.textContent = `Sorteer op`;
  sortLegend.appendChild(sortDropdownIcon);
  sortElementsDiv.appendChild(noSortDiv);
  sortElementsDiv.appendChild(priceAscDiv);
  sortElementsDiv.appendChild(priceDescDiv);
  sortElementsDiv.appendChild(alphabethicalDiv);
  sortElementsDiv.appendChild(alphabethicalRevDiv);
  noSortDiv.appendChild(noSortRadio);
  noSortDiv.appendChild(noSortLabel);
  priceAscDiv.appendChild(priceAscRadio);
  priceAscDiv.appendChild(priceAscLabel);
  priceDescDiv.appendChild(priceDescRadio);
  priceDescDiv.appendChild(priceDescLabel);
  alphabethicalDiv.appendChild(alphabethicalRadio);
  alphabethicalDiv.appendChild(alphabethicalLabel);
  alphabethicalRevDiv.appendChild(alphabethicalRevRadio);
  alphabethicalRevDiv.appendChild(alphabethicalRevLabel);
  filterTypeFieldset.appendChild(filterTypeLegend);
  filterTypeLegend.textContent = `Filter op type van product`;
  filterTypeLegend.appendChild(filterTypeDropdownIcon);
  filterTypeFieldset.appendChild(filterTypeElementsDiv);
  filterBrandFieldset.appendChild(filterBrandLegend);
  filterBrandLegend.textContent = `Filter op merk`;
  filterBrandLegend.appendChild(filterBrandDropdownIcon);
  filterBrandFieldset.appendChild(filterBrandElementsDiv);

  //insert data
  sortLegend.className = `dropDown`;
  sortElementsDiv.className = `content`;
  sortDropdownIcon.className = `fas fa-angle-down`;
  sortDropdownIcon.id = `dropDownIcon`;
  noSortRadio.type = `radio`;
  noSortRadio.name = `sort`;
  noSortRadio.value = `no-sort`;
  noSortRadio.checked = true;
  noSortLabel.textContent = `Niet gesorteerd`;
  priceAscRadio.type = `radio`;
  priceAscRadio.name = `sort`;
  priceAscRadio.value = `price-asc`;
  priceAscLabel.textContent = `prijs (laag -> hoog)`;
  priceDescRadio.type = `radio`;
  priceDescRadio.name = `sort`;
  priceDescRadio.value = `price-desc`;
  priceDescLabel.textContent = `prijs (hoog -> laag)`;
  alphabethicalRadio.type = `radio`;
  alphabethicalRadio.name = `sort`;
  alphabethicalRadio.value = `alphabethical`;
  alphabethicalLabel.textContent = `alfabetisch A-Z`;
  alphabethicalRevRadio.type = `radio`;
  alphabethicalRevRadio.name = `sort`;
  alphabethicalRevRadio.value = `alphabethical-rev`;
  alphabethicalRevLabel.textContent = `alfabetisch Z-A`;
  filterTypeLegend.className = `dropDown`;
  filterTypeDropdownIcon.className = `fas fa-angle-down`;
  filterTypeDropdownIcon.id = `dropDownIcon`;
  filterTypeElementsDiv.className = `content`;
  for (const type of types) {
    let filterTypeDiv = document.createElement("div");
    let filterTypeInput = document.createElement("input");
    let filterTypeLabel = document.createElement("label");
    filterTypeElementsDiv.appendChild(filterTypeDiv);
    filterTypeDiv.appendChild(filterTypeInput);
    filterTypeDiv.appendChild(filterTypeLabel);
    filterTypeInput.type = "checkbox";
    filterTypeInput.id = type;
    filterTypeInput.className = "type";
    filterTypeInput.name = type;
    filterTypeLabel.htmlFor = type;
    filterTypeLabel.textContent = type;
  }
  filterBrandLegend.className = `dropDown`;
  filterBrandDropdownIcon.className = `fas fa-angle-down`;
  filterBrandDropdownIcon.id = `dropDownIcon`;
  filterBrandElementsDiv.className = `content`;
  for (const brand of brands) {
    let filterBrandDiv = document.createElement("div");
    let filterBrandInput = document.createElement("input");
    let filterBrandLabel = document.createElement("label");
    filterBrandElementsDiv.appendChild(filterBrandDiv);
    filterBrandDiv.appendChild(filterBrandInput);
    filterBrandDiv.appendChild(filterBrandLabel);
    filterBrandInput.type = "checkbox";
    filterBrandInput.id = brand;
    filterBrandInput.className = "brand";
    filterBrandInput.name = brand;
    filterBrandLabel.htmlFor = brand;
    filterBrandLabel.textContent = brand;
  }
};
//--Function to filter and sort the articles on the shopPage.
const filterAndSortArticles = () => {
  //Get wich types are checked to filter
  let typesChecked = document.querySelectorAll(".type:checked");
  let typesCheckedId = [];
  for (const checkbox of typesChecked) {
    typesCheckedId.push(checkbox.id);
  }
  //get wich brands are checked to filter
  let brandsChecked = document.querySelectorAll(".brand:checked");
  let brandsCheckedId = [];
  for (const checkbox of brandsChecked) {
    brandsCheckedId.push(checkbox.id);
  }
  //execute filter
  let filteredDataArray = articles.filter(
    (item) =>
      (typesCheckedId.length === 0 || typesCheckedId.includes(item.type)) &&
      (brandsCheckedId.length === 0 || brandsCheckedId.includes(item.brand))
  );
  //get what to sort by
  let sortBy = document.querySelectorAll('input[type="radio"]');
  let sortAlg = "";

  for (let i = 0; i < sortBy.length; i++) {
    if (sortBy[i].checked == true) {
      sortAlg = sortBy[i].value;
    }
  }
  filteredDataArray.sort((a, b) => {
    if (sortAlg == "no-sort") {
      return;
    } else if (sortAlg == "alphabethical") {
      return a.articleName.localeCompare(b.articleName);
    } else if (sortAlg == "alphabethical-rev") {
      return b.articleName.localeCompare(a.articleName);
    } else if (sortAlg == "price-asc") {
      return a.price - b.price;
    } else if (sortAlg == "price-desc") {
      return b.price - a.price;
    }
  });
  //reload all articles
  loadArticles(filteredDataArray);
};
//make an item for shop
const makeProductItem = (article) => {
  //make all elements
  let productArticle = document.createElement("article");
  let productA = document.createElement("a");
  let productFigure = document.createElement("figure");
  let productFigCaption = document.createElement("figcaption");
  let productImg = document.createElement("img");
  let productName = document.createElement("h2");
  let productInfo = document.createElement("p");
  let productPrice = document.createElement("p");
  let productCartButton = document.createElement("button");
  let productCartButtonItem = document.createElement("i");
  let productWishButton = document.createElement("button");
  let productWishButtonItem = document.createElement("i");

  //append all elements to correct parents
  productContainer.appendChild(productArticle);
  productArticle.appendChild(productA);
  productArticle.appendChild(productCartButton);
  productArticle.appendChild(productWishButton);
  productWishButton.appendChild(productWishButtonItem);
  productA.appendChild(productFigure);
  productA.appendChild(productName);
  productA.appendChild(productInfo);
  productA.appendChild(productPrice);
  productFigure.appendChild(productImg);
  productFigure.appendChild(productFigCaption);

  //insert nececary data into elements
  productFigCaption.textContent = `"${article.articleName}" - Dall-E`;
  productArticle.className = "product";
  productA.href = "product.html";
  productA.target = "_blank";
  productA.addEventListener("click", setLocalStorage("product", article.index));
  productA.addEventListener(
    "auxclick",
    setLocalStorage("product", article.index)
  );
  productImg.src = article.imageSrc;
  productName.textContent = article.articleName;
  productInfo.textContent = article.infoShort;
  productPrice.textContent = `€ ${article.price}`;
  productCartButton.textContent = `Voeg toe aan winkelwagentje `;
  productCartButton.addEventListener("click", () => {
    addToCart(article);
    loadCart();
  });
  productCartButton.appendChild(productCartButtonItem);
  productWishButton.id = `wishButton`;
  productCartButtonItem.className = `fas fa-shopping-basket`;
  productWishButtonItem.className = `far fa-heart`;
  productWishButton.addEventListener("click", () => {
    addToWish(article, productWishButtonItem);
  });
  productWishButton.addEventListener("mouseover", () => {
    productWishButton.style.color = `#e57373`;
  });
  productWishButton.addEventListener("mouseleave", () => {
    productWishButton.style.color = `#444444`;
  });
};
const setLocalStorage = (key, value) => () => {
  localStorage.setItem(key, value);
};

const loadArticles = (filteredAndSortedArray) => {
  while (productContainer.firstChild) {
    productContainer.removeChild(productContainer.firstChild);
  }
  if (filteredAndSortedArray.length != 0) {
    for (const article of filteredAndSortedArray) {
      makeProductItem(article);
    }
  } else {
    let FilterErrorH1 = document.createElement("h1");
    productContainer.appendChild(FilterErrorH1);
    FilterErrorH1.textContent = `< - - No items match your filter - - >`;
  }
};
//code
generateFilterMenu(articles);
let collapsibles = document.getElementsByClassName("dropDown");
for (let i = 0; i < collapsibles.length; i++) {
  let collapsible = collapsibles[i];
  collapsible.addEventListener("click", function () {
    let content = this.nextElementSibling;
    let icon = collapsible.querySelector("#dropDownIcon");
    if (content.style.display == `block`) {
      content.style.display = `none`;
      icon.className = `fas fa-angle-down`;
      collapsible.style.borderRadius = `var(--borderRadius)`;
    } else {
      content.style.display = `block`;
      icon.className = `fas fa-angle-up`;
      collapsible.style.borderRadius = `var(--borderRadius) var(--borderRadius) 0 0`;
    }
  });
}

filterAndSortArticles();

//eventListeners
let allCheckBoxes = document.querySelectorAll(".type, .brand");
for (const checkbox of allCheckBoxes) {
  checkbox.addEventListener("change", filterAndSortArticles);
}
sortBy = document.querySelectorAll('input[type="radio"');
for (let i = 0; i < sortBy.length; i++) {
  sortBy[i].addEventListener("change", () => {
    filterAndSortArticles();
  });
}
