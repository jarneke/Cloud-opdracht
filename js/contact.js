// Variables
let collapsibles = document.getElementsByClassName("dropDown");
let contactForm = document.getElementById("contactForm");

// Functions

// Code to be executed

// - JS for collapsible areas.
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

// - Check if form is filled in correctly else unveil error messages.
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formFNameField = document.getElementById("vnaam").value;
  let formLNameField = document.getElementById("anaam").value;
  let formEmailField = document.getElementById("email").value;
  let formMessageField = document.getElementById("vraag").value;
  let errormessages = [
    document.getElementById("fNameError").style,
    document.getElementById("lNameError").style,
    document.getElementById("emailError").style,
    document.getElementById("messageError").style,
  ];

  for (const errormessage of errormessages) {
    errormessage.display = `none`;
  }
  if (formFNameField == "") {
    errormessages[0].display = `block`;
  }
  if (formLNameField == "") {
    errormessages[1].display = `block`;
  }
  if (formEmailField == "") {
    errormessages[2].display = `block`;
  }
  if (formMessageField == "") {
    errormessages[3].display = `block`;
  }
  if (
    formFNameField != "" &&
    formLNameField != "" &&
    formEmailField != "" &&
    formMessageField != ""
  ) {
    alert(
      `Je hebt een bericht gestuurd:\n\n    voornaam: ${formFNameField}\n    achternaam: ${formLNameField}\n    e-mail: ${formEmailField}\n    Message:\n       ${formMessageField}`
    );
  }
});
