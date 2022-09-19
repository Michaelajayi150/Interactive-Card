const form = document.getElementById("form");
const form_complete = document.getElementById("form-complete");

// Card Number Containers
const card_plate_number = document.getElementById("card-number"),
  input_number = document.getElementById("number"),
  input_number_error = document.getElementById("number-error"),
  card_plate_date = document.getElementById("card-date");

// Name Containers
const card_plate_name = document.getElementById("card-name"),
  input_name = document.getElementById("name"),
  input_name_error = document.getElementById("name-error");

// Month Containers
const card_plate_month = document.getElementById("card-month"),
  input_month = document.getElementById("month");

// Year Containers
const card_plate_year = document.getElementById("card-year"),
  input_year = document.getElementById("year"),
  input_date_error = document.getElementById("date-error");

// CVV Containers
const card_plate_cvv = document.getElementById("card-cvv"),
  input_cvv = document.getElementById("cvv"),
  input_cvv_error = document.getElementById("cvv-error");

const inputs = [
  {
    alt: card_plate_name,
    input: input_name,
    message: input_name_error,
    origin: "Jane Appleseed",
    type: "name",
  },
  {
    alt: card_plate_number,
    input: input_number,
    message: input_number_error,
    origin: "0000 0000 0000 0000",
    type: "card-number",
  },
  {
    alt: card_plate_month,
    input: input_month,
    message: input_date_error,
    origin: "00",
    type: "card-month",
  },
  {
    alt: card_plate_year,
    input: input_year,
    message: input_date_error,
    origin: "00",
    type: "card-year",
  },
  {
    alt: card_plate_cvv,
    input: input_cvv,
    message: input_cvv_error,
    origin: "000",
    type: "card-cvv",
  },
];

function verifyYear() {
  let year = new Date().getUTCFullYear();
  let month = new Date().getMonth();

  year = year.toString().split("");
  if (
    input_year.value < parseInt(year[2] + year[3]) ||
    (input_year.value == parseInt(year[2] + year[3]) &&
      input_month.value <= month)
  ) {
    if (
      !input_year.classList.contains("error") ||
      !input_month.classList.contains("error")
    ) {
      input_year.classList.add("error");
      input_month.classList.add("error");
      input_date_error.innerHTML = "Can't accept expired card";
    }
    return false;
  } else {
    return true;
  }
}

function verifyInputs(e, el) {
  switch (el.type) {
    case "name":
      if (!el.input.value || el.input.value.length === 0) {
        el.input.classList.add("error");
        el.message.innerHTML = "Can't be blank";
        el.alt.innerHTML = el.origin;
      } else if (!el.input.value.match(/^[a-zA-Z\s]+$/)) {
        el.input.classList.add("error");
        el.message.innerHTML = "Wrong format, alphabets only";
        el.alt.innerHTML = el.input.value;
      } else {
        el.message.innerHTML = "";
        el.input.classList.remove("error");
        el.alt.innerHTML = el.input.value;
        return true;
      }
      break;

    case "card-number":
      if (!el.input.value || el.input.value.length === 0) {
        el.input.classList.add("error");
        el.message.innerHTML = "Can't be blank";
        el.alt.innerHTML = el.origin;
      } else if (!el.input.value.match(/^[0-9\s]+$/)) {
        el.input.classList.add("error");
        el.message.innerHTML = "Wrong format, numbers only";

        const card_number = el.input.value;
        let formatNumber = card_number
          .replace(/[^a-zA-Z0-9]/g, "")
          .replace(/(.{1,4})/g, "$1 ")
          .trim();

        el.input.value = formatNumber;
        el.alt.innerHTML = formatNumber;
      } else {
        const card_number = el.input.value;
        let formatNumber = card_number
          .replace(/[^0-9]/g, "")
          .replace(/(.{1,4})/g, "$1 ")
          .trim();

        if (card_number.length < 19) {
          el.input.classList.add("error");
          el.message.innerHTML = "Numbers must be 16 numeric value";
        } else {
          el.message.innerHTML = "";
          el.input.classList.remove("error");
          el.input.value = formatNumber;
          el.alt.innerHTML = formatNumber;
          return true;
        }

        el.input.value = formatNumber;
        el.alt.innerHTML = formatNumber;
      }
      break;

    case "card-month":
      if (!el.input.value || el.input.value.length === 0) {
        el.input.classList.add("error");
        el.message.innerHTML = "Can't be blank";
        el.alt.innerHTML = el.origin;
      } else if (
        !el.input.value.match(/^[0-9]+$/) ||
        el.input.value > 12 ||
        el.input.value < 1
      ) {
        el.input.classList.add("error");
        el.message.innerHTML = "Wrong format, invalid date";
        el.alt.innerHTML = el.input.value;
      } else {
        el.message.innerHTML = "";
        el.input.classList.remove("error");
        el.alt.innerHTML = el.input.value;
        return true;
      }
      break;

    case "card-year":
      if (!el.input.value || el.input.value.length === 0) {
        el.input.classList.add("error");
        el.message.innerHTML = "Can't be blank";
        el.alt.innerHTML = el.origin;
      } else if (!el.input.value.match(/^[0-9]+$/)) {
        el.input.classList.add("error");
        el.message.innerHTML = "Wrong format, invalid date";
        el.alt.innerHTML = el.input.value;
      } else {
        el.message.innerHTML = "";
        el.input.classList.remove("error");
        el.alt.innerHTML = el.input.value;
        return true;
      }
      break;

    case "card-cvv":
      if (!el.input.value || el.input.value.length === 0) {
        el.input.classList.add("error");
        el.message.innerHTML = "Can't be blank";
        el.alt.innerHTML = el.origin;
      } else if (!el.input.value.match(/^[0-9]+$/)) {
        el.input.classList.add("error");
        el.message.innerHTML = "Numbers only";
        el.alt.innerHTML = el.input.value;
      } else {
        el.message.innerHTML = "";
        el.input.classList.remove("error");
        el.alt.innerHTML = el.input.value;
        return true;
      }
      break;
  }
}

function verifyComplete(e) {
  const state = [];

  function AllareTrue(arr) {
    return arr.every((item) => item === true);
  }

  inputs.map((element) => {
    verifyInputs(e, element);
    if (verifyInputs(e, element) === true) {
      state.push(true);
    } else {
      state.push(false);
    }
  });

  verifyYear();

  if (AllareTrue(state) === true && verifyYear() === true) {
    form.classList.remove("show");
    form_complete.classList.add("show");
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  verifyComplete(e);
});

form_complete.addEventListener("submit", function (e) {
  e.preventDefault();
  form.reset();
  form_complete.classList.remove("show");
  inputs.forEach((element) => {
    element.alt.innerHTML = element.origin;
    element.input.value = "";
  });
  form.classList.add("show");
});

inputs.map((element) => {
  element.input.addEventListener("input", function (e) {
    verifyInputs(e, element);
  });
});
