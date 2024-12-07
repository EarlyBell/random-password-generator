const button = document.querySelector("button");
const password = document.querySelector(".para");
const select = document.querySelector("select");
const input = document.querySelector("input");
const span = document.querySelector("#span");

let passwordLength = 8;
input.addEventListener("input", () => {
  passwordLength = input.value;
  span.innerHTML = passwordLength;
});

let data = {};
fetch("./passwordOption.json")
  .then((response) => response.json())
  .then((res) => (data = res));

let passwordChar;
let length;

function genPassword() {
  if (select.value == "alphaNum") {
    passwordChar = data.AlphaNum;
    length = passwordChar.length;
  } else if (select.value == "sym") {
    length = passwordChar.length;
    passwordChar = data.AlphaNumsym;
  } else if (select.value == "alpha") {
    passwordChar = data.Alphabetic;
    length = passwordChar.length;
  } else if (select.value == "num") {
    passwordChar = data.Numeric;
    length = passwordChar.length;
  } else {
    passwordChar = data.AlphaNumsym;
    length = passwordChar.length;
  }

  password.innerHTML = "";
  let i = 0;
  for (; i < passwordLength; i++) {
    let random = Math.floor(
      Math.random() * length
    );
    password.innerHTML += passwordChar[random];
  }
}

password.addEventListener("click", () => {
  navigator.clipboard
    .writeText(password.textContent)
    .then(() => {
      alert("text is copied");
    })
    .catch(() => {
      alert("something went wrong");
    })
});

button.addEventListener("click", () => {
  genPassword();
});
