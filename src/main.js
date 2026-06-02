import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

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
      if (images.length == 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topLeft',
        });
        hideLoader();
        return;
      }
      createGallery(images);
      hideLoader();
    })
    .catch(err => {
      hideLoader();
      console.log(err);
    });
}
