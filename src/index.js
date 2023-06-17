import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

import Notiflix from 'notiflix'

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

function showLoad() {
  loaderEl.classList.add('active');
}

function hideLoad() {
  loaderEl.classList.remove('active');
}

function showError() {
  errorEl.classList.add('active');
}

function hideError() {
  errorEl.classList.remove('active');
}

fetchBreeds()
  .then(data => {
    let optionMarkup = '';
    data.forEach(element => {
      optionMarkup += `<option value="${element.id}">${element.name}</option>`;
    });
    selectEl.insertAdjacentHTML('afterbegin', optionMarkup);
  })
  .catch(error => {
    showError();
    Notiflix.Notify.warning(error);
  })
  .finally(() => {
    hideLoad();
  });

selectEl.addEventListener('change', event => {
  hideError();

  catInfoEl.innerHTML = '';
  const selectedCat = event.target.value;
  let catInfoMarkup = '';

  showLoad();

  fetchCatByBreed(selectedCat)
    .then(data => {
      data.forEach(element => {
        catInfoMarkup += `<img class="cat-img" src="${element.url}" alt="${element.breeds[0].name}">
      <div>
      <h2>${element.breeds[0].name}</h2>
      <p>${element.breeds[0].description}</p>
      <p><span class="cat-temperament">Temperament: </span>${element.breeds[0].temperament}</p>
</div>
`;
      });
      catInfoEl.insertAdjacentHTML('afterbegin', catInfoMarkup);
    })
    .catch(error => {
      showError();
      Notiflix.Notify.warning(error);
    })
    .finally(() => {
      hideLoad();
    });
});
