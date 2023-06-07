// const API_KEY = "ca8c8312b9e94aad91d9a7e73b77cb68";
const url = "https://api.worldnewsapi.com/search-news?api-key=ca8c8312b9e94aad91d9a7e73b77cb68&text=";

window.addEventListener("load", ()=> fetchNews(""));
// ()=> arrow functions do not allow duplicate parameters, 
// whether in strict or non-strict mode.Duplicate parameters 
// will cause a Syntax Error to be thrown. 

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&earliest-publish-date=2023-01-25`);
    const data = await res.json();
    bindData(data.news);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        // if (!article.image) return;
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
    
    if(!article.image) newsImg.src = "https://via.placeholder.com/400x200";
    else newsImg.src = article.image;
    
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.text;

    // const date = new Date(article.publishedAt).toLocaleString("en-US", {
    //     timeZone: "Asia/Jakarta"
    // })

    // The toLocaleString() method returns a string with a 
    // language-sensitive representation of this date. In 
    // implementations with Intl.DateTimeFormat API support, 
    // this method simply calls Intl.DateTimeFormat.

    newsSource.innerHTML = `${article.author} • ${article.publish_date}`;

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
