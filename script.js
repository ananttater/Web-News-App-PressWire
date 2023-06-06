// const API_KEY = "d610846649df47cb9e6c28ad453c53bb";
// const url = "https://newsapi.org/v2/everything?q=";

// const API_KEY = "pub_24112f08fbfebe6f0376a79ab781b250e8aae";
const url = "https://newsdata.io/api/1/news?apikey=pub_24112f08fbfebe6f0376a79ab781b250e8aae&q="

window.addEventListener("load", ()=> fetchNews("India"));
// ()=> arrow functions do not allow duplicate parameters, 
// whether in strict or non-strict mode.Duplicate parameters 
// will cause a Syntax Error to be thrown. 

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}`);
    const data = await res.json();
    bindData(data.results);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image_url || article.language!="english") return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

// The cloneNode() method of the Node interface returns a duplicate of 
// the node on which this method was called. Its parameter controls if 
// the subtree contained in a node is also cloned or not.

// The appendChild() method of the Node interface adds a node to the 
// end of the list of children of a specified parent node.

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.image_url;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    // const date = new Date(article.pubDate).toLocaleString("en-US", {
    //     timeZone: "Asia/Jakarta"
    // })

    // The toLocaleString() method returns a string with a 
    // language-sensitive representation of this date. In 
    // implementations with Intl.DateTimeFormat API support, 
    // this method simply calls Intl.DateTimeFormat.

    newsSource.innerHTML = `${article.source_id} • ${article.pubDate}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.link, "_blank");
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
