let news = [];

let a = "korea";

let searchlie = true;

let selectall = document.querySelectorAll(".news-button button");

let category = Array.from(selectall);

const newsapi = async () => {
  let url = new URL(
    `https://newsapi.org/v2/everything?q=${a}&pagesize=10&language=es&apiKey=168047dcc3fa452aaeffcc94e399f6b2`
  );
  //   let header = new Headers({
  //     "X-Api-Key": "168047dcc3fa452aaeffcc94e399f6b2",
  //   });

  let response = await fetch(url);
  let data = await response.json();

  news = data.articles;

  console.log("This is data", data);
  console.log(news);
  uiupdate();
};

newsapi();

let uiupdate = () => {
  let resulthtml = "";

  news.forEach((item) => {
    let newsummary = item.description;

    let newssource = item.publishedAt;

    let newsimage = item.urlToImage;

    resulthtml += `<div class= "row main-tag">
        <div class="news-img col-lg-4">
          <img
            src="${newsimage || "./images/이미지 못찾음.png"}"
            alt=""
          />
        </div>
        <div class="news-text col-lg-8">
          <h2>${item.title}</h2>
          <p>${newsummary || "내용없음"}</p>
          <p>${newssource || "no source"}</p>
        </div>
      </div>`;
  });

  document.getElementById("main-input").innerHTML = resulthtml;
};

let searchbar = () => {
  let search = "";

  searchlie = !searchlie;

  if (searchlie == false) {
    search += `<input type=" text" placeholder="검색창">
        <button id="search-button">Search</button>`;
  }

  document.getElementById("search-box").innerHTML = search;
};

category.forEach((item) =>
  item.addEventListener("click", (event) => topicevent(event))
);

let topicevent = (event) => {
  a = event.target.textContent;
  newsapi();
};
