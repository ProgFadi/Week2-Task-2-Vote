import 'babel-polyfill'
let news;


window.addEventListener('popstate',(state)=>{
    console.log('state is : '+state.state.searchTerm);
});

document.addEventListener('DOMContentLoaded', ()=>{
  news = document.getElementById('news');
  let search = document.getElementById('search')

  search.addEventListener('keyup', (event)=>{
    // console.log(event)/
    if(event.key == 'Enter') {
      history.pushState({searchTerm:search.value},"",search.value)
      getNews(search.value)
    }
  })

  getNews('iraq')
})

async function getNews(query) {
  let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=978d6c3818ff431b8c210ae86550fb1f`)
  let content = await response.json()
  console.log(content)
  updateUI(content.articles.map(createArticle).join('\n'))
}

function updateUI(content) {
  news.innerHTML = content
  let imgs=document.getElementsByClassName('im')
  for (let index = 0; index < imgs.length; index++) {
    
    imgs[index].addEventListener('click',function(){
    
     let counter= document.getElementById('counter'+parseInt(this.getAttribute('id')))
     
     counter.innerText=parseInt(counter.innerText)+1;
    });
    
  }
}

function createArticle(article, i) {
    article.counter=2;
  return `

  
  
    <article>
      <img width="124px" height="124px" src="${article.urlToImage}" alt="">
      <div id="text">
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <time>${article.publishedAt}</time>
      </div>
      <div id="voter">
        <img  class="im" id="${i}"  height="13px" src="${require('./assets/upvote.svg')}" alt="">
        <div id="counter${i}">${article.counter}</div>
        <img  id=img${i}" onclick="if(document.getElementById('counter${i}').innerText>0){document.getElementById('counter${i}').innerText=parseInt(document.getElementById('counter${i}').innerText)-1;${article.counter--} }" height="13px" src="${require('./assets/downvote.svg')}" alt="">
      </div>
    </article>
    <script src="${require('./app.js')}"></script>
  
  `
}




