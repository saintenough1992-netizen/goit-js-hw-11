import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/render-functions';

let searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  clearGallery();
  showLoader();
  const input = event.currentTarget.elements[`search-text`].value.trim();
  Promise.all([
    getImagesByQuery(input),
    new Promise(resolve => setTimeout(resolve, 1000)),
  ])
    .then(([images]) => {
      createGallery(images);
      hideLoader();
    })
    .catch(err => {
      hideLoader();
      console.log(err);
    });
}
