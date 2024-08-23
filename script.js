//Defining Elements
const submit = document.querySelector(".divider");
const birthDay = document.querySelector("#day-input");
const birthMonth = document.querySelector("#month-input");
const birthYear = document.querySelector("#year-input");
const numberYears = document.querySelector(".year-output");
const numberMonth = document.querySelector(".month-output");
const numberDays = document.querySelector(".day-output");
const errorDay = document.querySelector(".error-day");
const errorMonth = document.querySelector(".error-month");
const errorYear = document.querySelector(".error-year");

//Defining variables
let year;
let month;
let day;
let ageYear;
let ageMonth;
let ageDays;
let today = new Date();
let birthDate;
let diff;

function getBirthDate() {
  if (year && month && day) {
    birthDate = new Date(`${year}, ${month}, ${day}`);
    console.log(`Your birth date is: ${birthDate}`);
  }
}

function calcAge() {
  if (birthDate) {
    // calculate time difference in milliseconds
    let timeDiff = today - birthDate;

    // calculate milliseconds in a day, month and a year
    const msInDay = 1000 * 60 * 60 * 24;
    const msInMonth = msInDay * 30.44;
    const msInYear = msInDay * 365.25;

    //calculate the age difference in days, month and year
    ageDays = Math.ceil(Math.floor(timeDiff / msInDay) % 30.44);
    ageMonth = Math.ceil(Math.floor(timeDiff / msInMonth) % 12);
    ageYear = Math.floor(timeDiff / msInYear);
  }
  console.log(ageYear, ageMonth, ageDays);
}
birthYear.addEventListener("input", () => {
  birthYear.classList.remove("empty");
  errorYear.style.display = "none";
  year = Number(birthYear.value);
  getBirthDate();
});

birthMonth.addEventListener("input", () => {
  birthMonth.classList.remove("empty");
  errorMonth.style.display = "none";
  month = Number(birthMonth.value);
  getBirthDate();
});

birthDay.addEventListener("input", () => {
  birthDay.classList.remove("empty");
  errorDay.style.display = "none";
  day = Number(birthDay.value);
  getBirthDate();
});

submit.addEventListener("click", () => {
  if (birthDate) {
    calcAge();
    numberYears.textContent = ageYear;
    numberDays.textContent = ageDays;
    numberMonth.textContent = ageMonth;
  } else {
    numberYears.textContent = "--";
    numberDays.textContent = "--";
    numberMonth.textContent = "--";
  }
  if (!year || year.length < 4) {
    birthYear.classList.add("empty");
    errorYear.style.display = "contents";
  }
  if (!month) {
    birthMonth.classList.add("empty");
    errorMonth.style.display = "contents";
  }
  if (!day || day > 31) {
    birthDay.classList.add("empty");
    errorDay.style.display = "contents";
  }
  if (birthDate.getFullYear() > today.getFullYear()) {
    birthYear.classList.add("empty");
    errorYear.style.display = "contents";
    errorYear.textContent = "Must be a past Year";
    numberYears.textContent = "--";
    numberDays.textContent = "--";
    numberMonth.textContent = "--";
  }
});
