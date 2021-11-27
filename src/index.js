import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');
const imagesGallery = document.querySelector('.gallery')

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24541391-b479c34a264a17829baf6aba8';

searchForm.addEventListener('submit', onSubmitButtonClick);

function onSubmitButtonClick(evt) {
    evt.preventDefault();
    const searchQuery = searchForm.elements.searchQuery.value;
    console.log(searchQuery);
    searchForm.reset();

    getPhotoByName(searchQuery).then(renderGallery);
}

function getPhotoByName(searchQuery) {
   return axios.get(`${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
}

function renderGallery(images) {
    const markup = images.data.hits.map((images) => {
        return `<div class="photo-card">
  <img src="${images.webformatURL}" alt="${images.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${images.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${images.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${images.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${images.downloads}</b>
    </p>
  </div>
</div>
`
    }).join('');
    imagesGallery.innerHTML = markup;
    
}