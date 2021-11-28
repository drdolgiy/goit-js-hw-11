import './sass/main.scss';
// import axios from 'axios';
import Notiflix from 'notiflix';
import ApiService from './components/api-service';
import { renderGallery } from './components/render-gallery';

const searchForm = document.querySelector('#search-form');
const imagesGallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');


// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '24541391-b479c34a264a17829baf6aba8';

const apiService = new ApiService();

// loadMoreBtn.classList.add('is-hidden');

class LoadMoreBtn {
    #element
    #className
    #onClick
    constructor({ selector, className = 'hidden', isHidden = false, onClick = () => null}) {
        this.#element = document.querySelector(selector);
        this.#className = className;
        this.#onClick = onClick;

        this.#bindEvents();
        if (isHidden) this.hide();
    }

    show() {
            this.#element.classList.remove(this.#className)
         }
        
    hide() {
            this.#element.classList.add(this.#className)
            
    }
    
    #bindEvents() {
        this.#element.addEventListener('click', this.#onClick)
    }
}

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    className: 'is-hidden',
    isHidden: true,
    onClick() {
        onLoadClick()
    }
})

// кнопка загрузить еще

// loadMoreBtn.addEventListener('click', onLoadClick)

async function onLoadClick() {

     if (apiService.page  !== 2) {
        apiService.decrementPage();
    }
        
    apiService.getPhotoByName().then(renderGallery);

    
    const getValue = await apiService.getPhotoByName();
    console.log(getValue);

    const hitsLength = getValue.data.hits.length;
    console.log(hitsLength);
    // const totalHits = getValue.data.totalHits;
    // console.log(totalHits);
    // const pageValue = Math.floor(totalHits / hitsLength);
    // console.log(pageValue);
        
    if (hitsLength < 40) {
        loadMoreBtn.hide();
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        
    }
    
}

// кнопка поиска

searchForm.addEventListener('submit', onSearch);

async function onSearch(evt) {
    evt.preventDefault();

    clearGallery();
    loadMoreBtn.hide();
    apiService.query = evt.currentTarget.elements.searchQuery.value.trim();

     if (apiService.query === '') {
        Notiflix.Notify.info('enter your search query!')
         loadMoreBtn.hide();
         return
    }
    apiService.resetPage();
    apiService.getPhotoByName().then(renderGallery);

    const getValue = await apiService.getPhotoByName();
    const hitsLength = getValue.data.hits.length;

    if (hitsLength < 1) {
        loadMoreBtn.hide();
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return
        
    } else   if (hitsLength < 40) {
        loadMoreBtn.hide()
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        return
    }

    loadMoreBtn.show(); 

}


function clearGallery() {
    imagesGallery.innerHTML = '';
}


