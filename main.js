const form = document.querySelector(".form__body");
const inputFields = form.getElementsByClassName("form__input");
const formButton = document.querySelector(".form__button");


for (const item of inputFields) {
   item.addEventListener("blur", (event) => {
      validateForm(event);
   })
}

const setError = (element, message) => {
   const errorSection = element.parentElement.querySelector(".error");
   errorSection.innerText = message;
   element.classList.add("invalid");
   element.classList.remove("valid");
}
const setValid = (element) => {
   const errorSection = element.parentElement.querySelector(".error");
   errorSection.innerText = "";
   element.classList.remove("invalid");
   element.classList.add("valid");

}
const validateEmail = (emailField) => {
   const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
   if (emailField.value === "") {
      setError(emailField, "Email є обов'язковим");
   } else if (!regex.test(emailField.value)) {
      setError(emailField, "Email написано некоректно");
   } else {
      setValid(emailField);
   }
}
const validateName = (nameField) => {
   if (nameField.value === "") {
      setError(nameField, "Ім'я є обов'язковим");
   } else {
      setValid(nameField);
   }
}
const validatePhone = (phoneField) => {
   const regex = /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/;
   if (phoneField.value === "") {
      setError(phoneField, "Телефон є обов'язковим");
   } else if (!regex.test(phoneField.value)) {
      setError(phoneField, "Мобільний телефон написано некоректно");
   } else {
      setValid(phoneField);
   }
}

const validateForm = (event) => {
   switch (event.target.id) {
      case "formEmail":
         validateEmail(event.target);
         break;
      case "formPhone":
         validatePhone(event.target);
         break;
      case "formName":
         validateName(event.target);
         break;
      case "forMessage":
         break;
      default:
         alert("validation error");
   }
}

const phoneField = document.querySelector(".phoneField");
const nameField = document.querySelector(".name");


document.addEventListener('DOMContentLoaded', function () {

   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let formData = new FormData(form);
      if (phoneField.classList.contains("valid") && nameField.classList.contains("valid")) {
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });
         if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
         } else {
            alert("помилка");
         }
      } else {
         alert("Заповніть обов'язкові поляя");
      }

   }
})



