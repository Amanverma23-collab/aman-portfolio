document.querySelectorAll('nav a').forEach(anchor => {

anchor.addEventListener("click", function(e) {

const href = this.getAttribute("href");

if(href.startsWith("#")){

e.preventDefault();

const target = document.querySelector(href);

if(target){
target.scrollIntoView({
behavior: "smooth"
});
}

}

});

});

// Prevent scroll restoration on page refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});