// Variables
let page = 1;
let pageP = document.getElementById("page");
let btnLeft = document.getElementById("btnleft");
let btnRight = document.getElementById("btnright");

// Functions

/**
 *
 * @param {int} page Page number (default = 1)
 * @returns fetch of api.
 */
function getUsers(page = 1) {
  return fetch(
    `https://randomuser.me/api/?page=${page}&results=12&seed=Merel&exc=login,registered,phone,nat`
  )
    .then((response) => response.json())
    .then((data) => data.results)
    .then((usersData) => {
      //console.log(usersData);
      let flex = document.getElementById("clientsFlex");
      while (flex.firstChild) {
        flex.removeChild(flex.firstChild);
      }
      if (usersData.length > 0) {
        for (const user of usersData) {
          let article = document.createElement("article");
          let img = document.createElement("img");
          let userP = document.createElement("p");
          let countryP = document.createElement("p");

          flex.appendChild(article);
          article.appendChild(img);
          article.appendChild(userP);
          article.appendChild(countryP);

          img.src = user.picture.large;
          img.style.borderRadius = `1rem`;
          userP.textContent = `${user.name.title}. ${user.name.last} ${user.name.first} `;
          countryP.textContent = `Uit ${user.location.country}`;
        }
      } else {
        let h1 = document.createElement("h1");
        flex.appendChild(h1);
        h1.textContent = `!ERROR! -error loading api, make sure to check your internet connection.- !ERROR!`;
      }
    })
    .catch((error) => {
      console.error("Error fetching random users:", error);
      return [];
    });
}
/**
 * A function to change pages.
 * @param {bool} action if true go page up else go page down (default = false)
 */
const changePage = (action = false) => {
  if (action) {
    page += 1;
  } else {
    if (page > 1) {
      page -= 1;
    }
  }
  pageP.textContent = page;
};
// Add eventListeners.
btnLeft.addEventListener("click", () => {
  changePage(false);
  getUsers(page);
});
btnRight.addEventListener("click", () => {
  changePage(true);
  getUsers(page);
});

// Code to be executed
pageP.textContent = page;
getUsers();
