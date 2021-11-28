import './sass/main.scss';
// import axios from 'axios';
import Notiflix from 'notiflix';
import ApiService from './components/api-service';
import { renderGallery } from './components/render-gallery';

const searchForm = document.querySelector('#search-form');
const imagesGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '24541391-b479c34a264a17829baf6aba8';

const apiService = new ApiService();


// кнопка загрузить еще

loadMoreBtn.addEventListener('click', onLoadClick)

function onLoadClick() {
    
apiService.getPhotoByName().then(renderGallery);


}

// кнопка поиска

searchForm.addEventListener('submit', onSubmitButtonClick);

function onSubmitButtonClick(evt) {
    evt.preventDefault();

    clearGallery();
    
    apiService.query = searchForm.elements.searchQuery.value;
    apiService.resetPage();
    apiService.getPhotoByName().then(renderGallery);


}


function clearGallery() {
    imagesGallery.innerHTML = '';
}


