// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';



const refs = {
  form: document.forms[0],
  gallery: document.querySelector('.gallery'),
  div: document.createElement('div'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  addLoader();



  const userQuery = e.target.query.value.trim();
  if (!userQuery) {
    //  Прибираємо лоадер, який всередині gallery
    refs.gallery.innerHTML = '';

    iziToast.warning({
      title: 'Attention!',
      message: 'Search field must not be empty',
      messageSize: '16',
      position: 'center',
      close: false,
      displayMode: 1,
    });
    return;
  }
  //Імітуємо завантаження сторінки
  setTimeout(() => {
    getImages(userQuery)
      .then(images => {
        console.log(images);
        if (!images.hits.length|| !images.hits) {
          throw new Error('Error! Nothing to load');
        }
        renderGallery(images, refs.gallery);
      })
      .catch(() => {
        //  Прибираємо лоадер, який всередині gallery
        refs.gallery.innerHTML = '';
        iziToast.error({
          title: 'Error!',
          message:
            `Sorry, there are no images matching your search query. Please try again!`,
          messageSize: '16',
          backgroundColor: '#ef4040',
          position: 'center',
          close: false,
          displayMode: 1,
        });
      })
  }, 2000);



});

function addLoader() {
  refs.div.classList.add('loader');
  refs.gallery.append(refs.div);
}
