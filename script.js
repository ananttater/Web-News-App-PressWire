const url = "https://api.nytimes.com/svc/news/v3/content/all/";
const API_KEY = ".json?api-key=oeJRUhXapfEYkvDwSOPiOcBYDSqzdPhr";
window.addEventListener("load", ()=> fetchNews("all"));

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}${API_KEY}`);
    const data = await res.json();
    bindData(data.results);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        // if (!article.thumbnail_standard) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    
    newsImg.src = article.multimedia[2].url;
    
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.abstract;

    const date = new Date(article.published_date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
    newsSource.innerHTML = `${article.byline} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let currSelectedNav = null;
function onNavItemClick(item){
    fetchNews(item);
    const navItem = document.getElementById(item);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navItem;
    currSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
});
