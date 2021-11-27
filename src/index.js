import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24541391-b479c34a264a17829baf6aba8';

searchForm.addEventListener('submit', onSubmitButtonClick);

function onSubmitButtonClick(evt) {
    evt.preventDefault();
    const searchQuery = searchForm.elements.searchQuery.value;
    console.log(searchQuery);

    getPhotoByName(searchQuery);
    console.log(getPhotoByName(searchQuery));
}

export function getPhotoByName(searchQuery) {
   return axios.get(`${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
}
