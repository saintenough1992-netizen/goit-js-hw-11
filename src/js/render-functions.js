import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = document.querySelector('.gallery');
let loader = document.querySelector('.js-loader');

export function clearGallery() {
  gallery.innerHTML = '';
}
export function showLoader() {
  loader.classList.add('loader');
}
export function hideLoader() {
  loader.classList.remove('loader');
}
let newGallery = new SimpleLightbox('.gallery a', {
  captionsDelay: 250,
  captionsData: 'title',
});

export function createGallery(images) {
  const markup = images
    .map(
      img =>
        `<li class="gallery-item">
        <a class="gallery-link" href="${img.largeImageURL}">
         <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" title="${img.name}" />
        </a>
        <div class="info">
         <p class="info-item"> <b>Likes</b> ${img.likes} </p>
         <p class="info-item"> <b>Views</b> ${img.views} </p>
         <p class="info-item"> <b>Comments</b> ${img.comments} </p>
         <p class="info-item"> <b>Downloads</b> ${img.downloads} </p>
        </div>
        </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  newGallery.refresh();
}
