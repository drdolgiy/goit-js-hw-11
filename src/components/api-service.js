import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24541391-b479c34a264a17829baf6aba8';


export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
     };

    async getPhotoByName() {
     const getImg = await axios.get(`${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${this.page}`)
        this.incrementPage()
        return getImg;
    }

   

    incrementPage() {
        this.page += 1;
    }

       resetPage() {
        this.page = 1;
    }

    decrementPage() {
        this.page -= 1;
    }

    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    
}

