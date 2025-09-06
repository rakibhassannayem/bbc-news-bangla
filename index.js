const categoryContainer = document.getElementById("category-container");

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      categories.forEach((cat) => {
        categoryContainer.innerHTML += `
          <li class="hover:border-b-4 hover:border-red-700 py-3 cursor-pointer">${cat.title}</li>
        `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
loadCategory();
