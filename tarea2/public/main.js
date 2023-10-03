let currentQuery = "sports";
let currentPage = 1;

const fetchNews = async (page, q) => {
    console.log(`Fetching news for ${q}, page number ${page}...`);
    var url =
    'https://newsapi.org/v2/everything?' +
    'q=' + q +
    '&from=2023-09-24&' +
    'pageSize=20&' +
    'language=en&' +
    'page=' + page + '&' + 
    '&sortBy=popularity&' +
    'apiKey=901f823bfd584f8a8f1778924a448114';

    var req = new Request(url);

    // let a = await fetch(req);
    // let response = await a.json();

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener datos. Estado de la respuesta: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        let str = "";
        document.getElementById('resultCount').textContent = data.totalResults;

        for (let article of data.articles) {
            str += `
                <div class="card my-4 mx-2" style="width: 18rem;">
                    <img heigth="184"  src="${article.urlToImage}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${article.title.slice(0,23)}</h5>
                        <p class="card-text">${article.description.slice(0,123)}...</p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Leer más</a>
                    </div>
                </div>`;
        }

        // Agrega las tarjetas al documento
        const contentDiv = document.querySelector('.content');
        contentDiv.innerHTML = str;

    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

const getQueryFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('query') || "";
  }
  
window.addEventListener('load', () => {
const query = getQueryFromUrl();
if (query) {
    document.getElementById('searchInput').value = query;
    fetchNews(currentPage, query);
}
});

document.querySelector('form').addEventListener("submit", (e) => {
e.preventDefault();
const query = document.getElementById('searchInput').value;
currentPage = 1;
fetchNews(currentPage, query);

const newUrl = `/search?query=${encodeURIComponent(query)}`;
history.pushState(null, null, newUrl);
});

fetchNews(1);
search.addEventListener("click", (e) => {
    e.preventDefault()
    let query = document.getElementById('searchInput').value;
    currentQuery = query;
    currentPage = 1; 
    fetchNews(currentPage, currentQuery);
})

prev.addEventListener("click", (e) => {
    e.preventDefault()
    if(currentPage > 1){
        currentPage = currentPage - 1;
        fetchNews(currentPage, currentQuery); 
    }
})

next.addEventListener("click", (e) => {
    e.preventDefault()
    currentPage = currentPage + 1;
    fetchNews(currentPage, currentQuery); 
})

app.get('/', (req, res) => {
    // Simulación de datos
    const totalResults = 10;
    const articles = [
      { title: 'Noticia 1', description: 'Descripción de la noticia 1', urlToImage: 'imagen1.jpg', url: 'enlace1' },
      { title: 'Noticia 2', description: 'Descripción de la noticia 2', urlToImage: 'imagen2.jpg', url: 'enlace2' },
      // Agrega más noticias aquí...
    ];
  
    // Renderiza la vista Handlebars "home" con los datos
    res.render('home', { totalResults, articles });
  });