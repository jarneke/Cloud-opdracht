// Variables
import articles from "../assets/json/articles.json" assert { type: "json" };

let sortBy = document.getElementById("sort");

const productContainer = document.getElementById("productGridContainer");
const sortFieldset = document.getElementById("sortFieldset");
const filterTypeFieldset = document.getElementById("filterTypeFieldset");
const filterBrandFieldset = document.getElementById("filterBrandFieldset");
const cartContainer = document.getElementById("cartContainer");

// functions

/**
 * A fuction to add a specific item to the cart.
 * @param {Article} product Article to be adde dto cart.
 */
const addToCart = (product) => {
  if (!product.isOnCart) {
    product.isOnCart = true;
    product.count = 1;
  } else {
    product.count++;
  }
  loadCart();
};

/**
 * A function to add a specific item to the wishlist.
 * @param {Article} product Article to be added to wishlist.
 * @param {Element} buttonItem Item of a button to be changed.
 */
const addToWish = (product, buttonItem) => {
  if (!product.isOnCart) {
    product.isOnCart = true;
    buttonItem.className = `fas fa-heart`;
  } else {
    product.isOnCart = false;
    buttonItem.className = `far fa-heart`;
  }
};

/**
 * A function to calculate the total of the cart array.
 * @param {Array} cartArr Array of the cart.
 * @returns Int of the calculated total of the cart.
 */
const calcTotal = (cartArr) => {
  let total = 0;
  for (const article of cartArr) {
    total += article.price * article.count;
  }
  return total.toFixed(2);
};

/**
 * A function to load the entire cart with all its elements.
 */
const loadCart = () => {
  // Make cart array
  let shoppingCart = [];
  // Get all elements of the articles JSON that are on the cart.
  for (const article of articles) {
    if (article.isOnCart) {
      shoppingCart.push(article);
    }
  }
  // Clear the cart element.
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
  // If cart is empty display "cart empty", else display cart.
  let h1ShoppingCart = document.createElement("h1");
  if (shoppingCart.length == 0) {
    h1ShoppingCart.textContent = `Winkelmandje is leeg`;
    cartContainer.appendChild(h1ShoppingCart);
  } else {
    h1ShoppingCart.textContent = `Winkelmandje `;
    cartContainer.appendChild(h1ShoppingCart);
  }

  // Create article element to store all cart items in.
  let shoppingCartElement = document.createElement("article");
  cartContainer.appendChild(shoppingCartElement);
  shoppingCartElement.id = `shoppingCart`;

  for (const product of shoppingCart) {
    // Create elements
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

    // Append elements
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

    // Insert data
    cartItemA.href = `product.html`;
    cartItemImg.src = product.imageSrc;
    cartItemImg.alt = `product photo`;
    cartItemPName.textContent = product.articleName;
    cartItemPPrice.textContent = `€ ${product.price}`;
    cartItemPPrice.style.fontStyle = `bold`;
    cartItemButtonDiv.id = `buttonDiv`;
    cartItemBtnMore.textContent = `+`;
    cartItemBtnLess.textContent = `-`;
    cartItemBtnDelete.className = `fas fa-trash-can`;
    cartItemPAmount.textContent = product.count;

    // Add eventlisteners.

    // --eventlistener to increase amount of item in cart
    cartItemBtnMore.addEventListener("click", () => {
      product.count += 1;
      cartItemPAmount.textContent = product.count;
      // --As cart changed, call function to reload cart.
      loadCart();
    });

    // --eventlistener to decrease amount of item in cart (if amount == => delete)
    cartItemBtnLess.addEventListener("click", () => {
      if (product.count > 1) {
        product.count -= 1;
        cartItemPAmount.textContent = product.count;
      } else {
        product.count = 0;
        product.isOnCart = false;
      }
      // --As cart changed, call function to reload cart.
      loadCart();
    });

    // --eventlistener to delete item from cart.
    cartItemBtnDelete.addEventListener("click", () => {
      product.count = 0;
      product.isOnCart = false;
      // --As cart changed, call function to reload cart.
      loadCart();
    });

    //--If clicked on link, store productIndex to local storage so that product page knows what to load.
    cartItemA.addEventListener("click", () => {
      localStorage.setItem("product", product.index);
    });
  }

  // if cart not empty, calculate and display total price.
  if (shoppingCart.length != 0) {
    let calcTotalp = document.createElement("p");
    cartContainer.appendChild(calcTotalp);
    calcTotalp.textContent = `Totaal: €${calcTotal(shoppingCart)}`;
    calcTotalp.style.fontSize = `1.5rem`;
  }
};
/**
 * A function to generate the filter menu.
 * @param {ObjectArray} articles The Object array of all the articles.
 */
const generateFilterMenu = (articles) => {
  // Get all brands and types of all products and add them to coresponding arrays.
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
  // Sort types and brands alphabethically.
  brands.sort((a, b) => a.localeCompare(b));
  types.sort((a, b) => a.localeCompare(b));

  // Create elements
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
/**
 * A function to filter the products and sort them.
 */
const filterAndSortArticles = () => {
  // Get wich types are checked to filter
  let typesChecked = document.querySelectorAll(".type:checked");
  let typesCheckedId = [];
  for (const checkbox of typesChecked) {
    typesCheckedId.push(checkbox.id);
  }
  // Get wich brands are checked to filter
  let brandsChecked = document.querySelectorAll(".brand:checked");
  let brandsCheckedId = [];
  for (const checkbox of brandsChecked) {
    brandsCheckedId.push(checkbox.id);
  }
  // Execute filter
  let filteredDataArray = articles.filter(
    (item) =>
      (typesCheckedId.length === 0 || typesCheckedId.includes(item.type)) &&
      (brandsCheckedId.length === 0 || brandsCheckedId.includes(item.brand))
  );
  // Get what to sort by
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

  // As it changed reload all articles
  loadArticles(filteredDataArray);
};

/**
 * A function to create an item for the product grid container.
 * @param {Artilce} article Article object to read data from.
 */
const makeProductItem = (article) => {
  // Create elements
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

  // Append children
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

  // Insert data
  productFigCaption.textContent = `"${article.articleName}" - Dall-E`;
  productArticle.className = "product";
  productA.href = "product.html";
  productA.target = "_blank";
  productImg.src = article.imageSrc;
  productName.textContent = article.articleName;
  productInfo.textContent = article.infoShort;
  productPrice.textContent = `€ ${article.price}`;
  productCartButton.textContent = `Voeg toe aan winkelwagentje `;
  productCartButton.appendChild(productCartButtonItem);
  productWishButton.id = `wishButton`;
  productCartButtonItem.className = `fas fa-shopping-basket`;
  productWishButtonItem.className = `far fa-heart`;

  // Add eventListeners.
  productA.addEventListener("click", setLocalStorage("product", article.index));
  productA.addEventListener(
    "auxclick",
    setLocalStorage("product", article.index)
  );
  productCartButton.addEventListener("click", () => {
    addToCart(article);
    loadCart();
  });
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

/**
 * A function to store a key and a value to browser local storage.
 * @param {string} key The key for local storage.
 * @param {string} value The value to be stored.
 * @returns localStorage.setItem(key, value);
 */
const setLocalStorage = (key, value) => () => {
  localStorage.setItem(key, value);
};

/**
 * A function to load all items in the product grid container.
 * @param {ObjectArray} filteredAndSortedArray
 */
const loadArticles = (filteredAndSortedArray) => {
  // Clear product grid container.
  while (productContainer.firstChild) {
    productContainer.removeChild(productContainer.firstChild);
  }

  // Load all items or display error message.
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

// Code to be executed
generateFilterMenu(articles);

// JS for collapsible areas.
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

// EventListeners
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
