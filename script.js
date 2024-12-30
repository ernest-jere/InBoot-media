const articleContainer = document.getElementById('article-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const ads = [
"./images/Melon",
"./images/Mountain",
"./images/Construction",
"./images/Sundays"
]
let startingIndex = 0;
let endingIndex = 8;
let articleDataArr = [];

fetch('https://saurav.tech/NewsAPI/everything/cnn.json')
  .then((res) => res.json())
  .then((data) => {
    articleDataArr = data.articles;
    displayArticles(articleDataArr.slice(startingIndex, endingIndex)); 
  })
  .catch((err) => {
   articleContainer.innerHTML = '<p class="error-msg">There was an error loading the articles</p>';
  });

const fetchMoreArticles = () => {
  startingIndex += 8;
  endingIndex += 8;

  displayArticles(articleDataArr.slice(startingIndex, endingIndex));
  if (articleDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'No more articles to load';
  }
};

const displayArticles = (article) => {
  article.forEach(({ author, title, description, url, urlToImage, content }, index) => {
      articleContainer.innerHTML += `
      <div id="${index}" class="user-card">
        <a class="article-link" href="${url}" target="_blank" style="color: black; text-decoration: none;">
         <img class="user-img" src="${urlToImage}" alt="Article Image">
         <h3 class="article-name">${title}</h3>
         <p class="desc">${description.length > 50 ? description.slice(0, 50) + '...' : description}</p>
        </a>
      </div>
      `;
  });

};
loadMoreBtn.addEventListener('click', fetchMoreArticles);