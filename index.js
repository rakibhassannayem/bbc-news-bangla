const categoryContainer = document.getElementById("category-container");
const newsContainer = document.getElementById("news-container");
const bookmarkContainer = document.getElementById("bookmark-container");
let bookmarks = [];
const bmCounts = document.getElementById("bm-counts");

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      displayCategories(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayCategories = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
        <li id="${cat.id}" class="hover:border-b-4 border-red-700 hover:border-red-700 py-3 cursor-pointer">${cat.title}</li>
      `;
  });
  categoryContainer.querySelector("li").classList.add("border-b-4");
  categoryContainer.addEventListener("click", (e) => {
    if (e.target.localName === "li") {
      displayLoading();
      const allLi = document.querySelectorAll("li");
      allLi.forEach((li) => {
        li.classList.remove("border-b-4");
      });
      e.target.classList.add("border-b-4");
      loadNewsByCategory(e.target.id);
    }
  });
};

const loadNewsByCategory = (categoryId) => {
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      displayNewsByCategory(data.articles);
    })
    .catch((err) => {
      displayError();
    });
};

const displayNewsByCategory = (articles) => {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    newsContainer.innerHTML += `
    <div id="${article.id}" class="cursor-pointer border border-gray-200 p-2 shadow-sm rounded-lg flex flex-col justify-between gap-1">
      <img class="rounded-md" src="${article.image.srcset[7].url}">
      <h1 class="font-bold">${article.title}</h1>
      <p class="font-medium text-gray-600">${article.time}</p>
      <button id="btn-bookmark" class="btn text-red-700  w-fit font-bold border-red-700">Bookmark</button>
    </div>
      `;
  });
};

newsContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Bookmark") {
    handleBookmarks(e);
  }
});

const handleBookmarks = (e) => {
  const title = e.target.parentNode.children[1].innerText;
  const id = e.target.parentNode.id;
  bookmarks.push({
    title: title,
    id: id,
  });
  displayBookmarks(bookmarks);
  bmCounts.innerText = bookmarks.length;
};

const displayBookmarks = (bookmarks) => {
  bookmarkContainer.innerHTML = "";
  bookmarks.forEach((bookmark) => {
    bookmarkContainer.innerHTML += `
    <div class="border border-gray-300 rounded-lg shadow mt-3 p-2 flex flex-col items-end gap-2">
      <h1 class="font-bold">${bookmark.title}</h1>
      <button onclick="handleDeleteBookmarks('${bookmark.id}')" class="btn bg-red-100 text-red-700 border-red-700"><i class="fa-solid fa-trash-can"></i></button>
    </div>
    `;
  });
};

const handleDeleteBookmarks = (bookmarkId) => {
  const filteredBookmarks = bookmarks.filter(
    (bookmark) => bookmark.id !== bookmarkId
  );
  bookmarks = filteredBookmarks;
  displayBookmarks(bookmarks);
  bmCounts.innerText = bookmarks.length;
};

const displayLoading = () => {
  newsContainer.innerHTML = `<span class="col-span-full loading loading-ring loading-xl text-red-700 mt-20 p-30 mx-auto"></span>`;
};

const displayError = () => {
  newsContainer.innerHTML = `
    <div role="alert" class="alert alert-error bg-red-700 text-white text-bold">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Error! Something went wrong.</span>
    </div>
  `;
};

loadCategory();
loadNewsByCategory("main");
