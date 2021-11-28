export default class LoadMoreBtn {
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