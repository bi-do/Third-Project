let news = [];

let a = "korea";

let page = 1;

let totalpages = 0;

let searchlie = true;

let selectall = document.querySelectorAll(".news-button button");

let category = Array.from(selectall);

const newsapi = async () => {
  try {
    let url = new URL(
      `https://newsapi.org/v2/everything?q=${a}&page=1&pagesize=5&language=es&apiKey=168047dcc3fa452aaeffcc94e399f6b2`
    );
    //   let header = new Headers({
    //     "X-Api-Key": "168047dcc3fa452aaeffcc94e399f6b2",
    //   });

    let response = await fetch(url);
    let data = await response.json();

    console.log(response);
    console.log(data);
    if (response.status == 200) {
      if (data.articles.length == 0) {
        throw new Error(`No search results`);
      }
      news = data.articles;
      totalpages = Math.ceil(data.totalResults / 5);
      uiupdate();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("에러:", error.message);
    errorupdate(error.message);
  }
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

const pagenation = () => {};

let searchbar = () => {
  let search = "";

  searchlie = !searchlie;

  if (searchlie == false) {
    search += `<input type=" text" placeholder="Search" id = "input-real" onkeypress ="enterkey(event)">
        <button id="search-button" onclick="enterkey(event)">GO</button>`;
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

function enterkey(event) {
  if (event.key === "Enter" || event.target.id == `search-button`) {
    a = document.getElementById("input-real").value;
    newsapi();
  }
}

const errorupdate = (message) => {
  let errorhtml = `<div class="alert alert-danger" role="alert">
  ${message}
</div>`;
  document.getElementById("main-input").innerHTML = errorhtml;
};
