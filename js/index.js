//variables
import articles from "../assets/json/articles.json" assert { type: "json" };
const popularItems = document.getElementById("popularItems");

// constants
const FIRST_ITEM_INDEX = 4;
const SEDCOND_ITEM_INDEX = 7;
const THIRD_ITEM_INDEX = 20;
//functions
//--function to store a key and a value to the browser local storage.
const setLocalStorage = (key, value) => () => {
  localStorage.setItem(key, value);
};
//--function to make an li element with its contents.
const makeItem = (item) => {
  //Create elements.
  let itemLi = document.createElement("li");
  let itemA = document.createElement("a");
  let itemImg = document.createElement("img");
  let itemH2 = document.createElement("h2");
  let itemH3 = document.createElement("h3");
  let itemP = document.createElement("p");
  //Append elements.
  scrollerInnerUl.appendChild(itemLi);
  itemLi.appendChild(itemA);
  itemA.appendChild(itemImg);
  itemA.appendChild(itemH2);
  itemA.appendChild(itemH3);
  itemA.appendChild(itemP);
  //Insert data.
  itemA.href = `product.html`;
  itemA.target = `_blank`;
  itemA.addEventListener("click", setLocalStorage("product", item.index));
  itemA.addEventListener("auxclick", setLocalStorage("product", item.index));
  itemImg.src = item.imageSrc;
  itemH2.textContent = item.articleName;
  itemH3.textContent = item.infoShort;
  itemP.textContent = `€ ${item.price}`;

  //Append to correct parent.
  scrollerDiv.appendChild(scrollerInnerUl);
};

//Code to be executed.
//--Create page layout.
//---Create elements.
let title = document.createElement("h1");
let scrollerDiv = document.createElement("div");
let scrollerInnerUl = document.createElement("ul");
//---Append Elements.
popularItems.appendChild(title);
popularItems.appendChild(scrollerDiv);
//---Insert data.
title.textContent = `Populaire artikelen`;
scrollerDiv.className = `scroller`;
scrollerInnerUl.className = `scroller_inner`;
//--Create items for scroll element
makeItem(articles[FIRST_ITEM_INDEX]);
makeItem(articles[SEDCOND_ITEM_INDEX]);
makeItem(articles[THIRD_ITEM_INDEX]);

//JS for scroller element.
const scrollers = document.querySelectorAll(".scroller");
scrollers.forEach((scroller) => {
  const scrollerInner = scroller.querySelector(".scroller_inner");
  const scrollerContent = Array.from(scrollerInner.children);

  scrollerContent.forEach((item) => {
    const duplicatedItem = item.cloneNode(true);
    scrollerInner.appendChild(duplicatedItem);
  });
});
