import articles from "../assets/json/articles.json" assert { type: "json" };
let articlesArr = articles;

let productIndex = localStorage.getItem("product") - 1;
let reviewScore = 0;
const makeProductPage = (product) => {
  document.title = product.articleName;
  const sectionView = document.getElementById("view");
  const sectionBottom = document.getElementById("bottom");

  while (sectionView.firstChild) {
    sectionView.removeChild(sectionView.firstChild);
  }
  while (sectionBottom.firstChild) {
    sectionBottom.removeChild(sectionBottom.firstChild);
  }
  //create all elements
  let articleLeft = document.createElement("article");
  let productName = document.createElement("h1");
  let pInfoShort = document.createElement("h2");
  let pInfo = document.createElement("p");
  let productSpecs = document.createElement("h1");
  let specsUl = document.createElement("ul");
  let articleRight = document.createElement("article");
  let productFigure = document.createElement("figure");
  let productFigCaption = document.createElement("figcaption");
  let productImage = document.createElement("img");
  let articleTop = document.createElement("article");
  let reviewStarDiv = document.createElement("div");
  let avgreview = getreviewScore(product);
  let articleReviews = document.createElement("article");
  let reviewsContainerH2 = document.createElement("h2");
  let reviewContainerH3 = document.createElement("h3");
  let articleScrollContainer = document.createElement("article");
  let addToWishlistButton = document.createElement("button");
  let addToWishlistButtonItem = document.createElement("i");
  let reviewForm = document.createElement("form");
  let reviewFormFieldset = document.createElement("fieldset");
  let reviewFormLegend = document.createElement("legend");
  let reviewFormNameLabel = document.createElement("label");
  let reviewFormNameInput = document.createElement("input");
  let reviewFormRatingLabel = document.createElement("label");
  let reviewFormRatingDiv = document.createElement("div");
  for (let i = 0; i < 5; i++) {
    let reviewStar = document.createElement("i");
    reviewFormRatingDiv.appendChild(reviewStar);
    reviewStar.className = `far fa-star writeReview`;
    reviewStar.addEventListener("click", () => {
      setStar(i);
    });
  }
  let reviewFormMessageLabel = document.createElement("label");
  let reviewFormMessageField = document.createElement("textarea");
  let reviewFormSubmit = document.createElement("input");

  //append elements to correct parent
  articleReviews.appendChild(articleTop);
  sectionView.appendChild(articleLeft);
  articleLeft.appendChild(productName);
  articleLeft.appendChild(pInfoShort);
  articleLeft.appendChild(pInfo);
  articleLeft.appendChild(productSpecs);
  articleLeft.appendChild(specsUl);
  addToWishlistButton.appendChild(addToWishlistButtonItem);
  sectionView.appendChild(articleRight);
  articleRight.appendChild(productFigure);
  productFigure.appendChild(productImage);
  productFigure.appendChild(productFigCaption);
  articleRight.appendChild(addToWishlistButton);
  articleTop.appendChild(reviewsContainerH2);
  articleTop.appendChild(reviewStarDiv);
  articleTop.appendChild(reviewForm);
  reviewForm.appendChild(reviewFormFieldset);
  sectionBottom.appendChild(articleReviews);
  articleReviews.appendChild(reviewContainerH3);
  articleReviews.appendChild(articleScrollContainer);
  reviewFormFieldset.appendChild(reviewFormLegend);
  reviewFormFieldset.appendChild(reviewFormNameLabel);
  reviewFormFieldset.appendChild(reviewFormNameInput);
  reviewFormFieldset.appendChild(reviewFormRatingLabel);
  reviewFormFieldset.appendChild(reviewFormRatingDiv);
  reviewFormFieldset.appendChild(reviewFormMessageLabel);
  reviewFormFieldset.appendChild(reviewFormMessageField);
  reviewFormFieldset.appendChild(reviewFormSubmit);

  //insert nececary data
  productFigCaption.textContent = `"${product.articleName}" - Dall-E `;
  reviewFormNameLabel.htmlFor = `userName`;
  reviewFormNameLabel.textContent = `Gebruikers naam`;
  reviewFormSubmit.type = `submit`;
  reviewFormSubmit.value = `Plaats review`;
  reviewFormSubmit.id = `reviewSubmit`;
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let userName = reviewFormNameInput.value;
    let comment = reviewFormMessageField.value;
    let review = {
      username: `${userName}`,
      rating: reviewScore,
      comment: `${comment}`,
    };
    let index = localStorage.getItem("product") - 1;
    if (userName != "" && comment != "") {
      articles[index].reviews.push(review);
      console.log("added");
    }

    makeProductPage(articlesArr[productIndex]);
  });
  reviewForm.id = `reviewFrom`;
  reviewFormLegend.textContent = `Schrijf review`;
  reviewFormNameInput.required = true;
  reviewFormMessageField.required = true;
  reviewFormRatingLabel.htmlFor = `rating`;
  reviewFormRatingLabel.textContent = `Geef je score:`;
  reviewFormMessageLabel.textContent = `Schrijf je review`;
  addToWishlistButtonItem.className = `far fa-heart`;
  addToWishlistButton.addEventListener("click", () => {
    addToWish(product, addToWishlistButtonItem);
  });
  addToWishlistButton.id = `wishButton`;
  articleLeft.className = `left`;
  productName.textContent = product.articleName;
  pInfoShort.textContent = product.infoShort;
  pInfo.textContent = product.info;
  productSpecs.textContent = `Product specificaties`;
  productSpecs.className = `specs`;
  for (const spec of product.specifications) {
    //create spec element
    let liSpec = document.createElement("li");
    //apend to parent
    specsUl.appendChild(liSpec);
    //insert data
    liSpec.textContent = spec;
  }
  articleRight.className = `right`;
  productImage.src = product.imageSrc;
  articleTop.className = `top`;
  reviewStarDiv.className = `overallReview`;
  for (let i = 0; i < avgreview; i++) {
    let fullStar = document.createElement("i");
    reviewStarDiv.appendChild(fullStar);
    fullStar.className = `fas fa-star`;
  }
  for (let i = 0; i < 5 - avgreview; i++) {
    let emptyStar = document.createElement("i");
    reviewStarDiv.appendChild(emptyStar);
    emptyStar.className = `far fa-star`;
  }
  articleReviews.className = `popularReviews`;
  reviewsContainerH2.textContent = `Reviews`;
  reviewContainerH3.textContent = `Reviews zijn subjectief en kunnen sterk variëren op basis van individuele ervaringen.`;
  articleScrollContainer.className = `scrollContainer`;
  for (const review of product.reviews) {
    let articleReview = document.createElement("article");
    let reviewH2 = document.createElement("h2");
    let reviewStarDiv = document.createElement("div");
    articleScrollContainer.appendChild(articleReview);
    articleReview.appendChild(reviewStarDiv);
    articleReview.appendChild(reviewH2);
    articleReview.className = `review`;
    reviewH2.textContent = review.username;
    reviewStarDiv.className = `reviewStar`;
    for (let i = 0; i < review.rating; i++) {
      let fullStar = document.createElement("i");
      reviewStarDiv.appendChild(fullStar);
      fullStar.className = `fas fa-star`;
    }
    for (let i = 0; i < 5 - review.rating; i++) {
      let emptyStar = document.createElement("i");
      reviewStarDiv.appendChild(emptyStar);
      emptyStar.className = `far fa-star`;
    }
    let reviewP = document.createElement("p");
    articleReview.appendChild(reviewP);
    reviewP.textContent = review.comment;
  }
};
const setStar = (i) => {
  const stars = document.getElementsByClassName("writeReview");
  for (const star of stars) {
    star.className = `far fa-star writeReview`;
  }
  for (let j = 0; j <= i; j++) {
    stars[j].className = `fas fa-star writeReview`;
    reviewScore = i + 1;
  }
};
const getreviewScore = (product) => {
  let reviewsArr = product.reviews;
  let ratingsArr = [];
  for (const review of reviewsArr) {
    ratingsArr.push(review.rating);
  }

  let reviewScore = 0;
  reviewScore = getAvgOfAray(ratingsArr);
  return reviewScore;
};
const addToWish = (product, buttonItem) => {
  if (!product.isOnCart) {
    product.isOnCart = true;
    buttonItem.className = `fas fa-heart`;
  } else {
    product.isOnCart = false;
    buttonItem.className = `far fa-heart`;
  }
};
const getAvgOfAray = (array) => {
  let arrSum = 0;
  let count = 0;
  let avg = 0;
  for (const number of array) {
    arrSum += number;
    count++;
  }
  avg = Math.round(arrSum / count);

  return avg;
};
makeProductPage(articlesArr[productIndex]);

let collapsibles = document.getElementsByClassName("dropDown");
for (let i = 0; i < collapsibles.length; i++) {
  let collapsible = collapsibles[i];
  collapsible.addEventListener("click", function () {
    let content = this.nextElementSibling;
    if (content.style.display == `block`) {
      content.style.display = `none`;
      collapsible.style.borderRadius = `var(--borderRadius)`;
    } else {
      content.style.display = `block`;
      collapsible.style.borderRadius = `var(--borderRadius) var(--borderRadius) 0 0`;
    }
  });
}
