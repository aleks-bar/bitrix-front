import {testsection} from "../../sections/testsection";

document.addEventListener('DOMContentLoaded', () => {
  const appElem = document.querySelector('#app');

  if (appElem) {
    appElem.innerHTML = testsection
  }
})