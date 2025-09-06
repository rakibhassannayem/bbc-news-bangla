const categoryContainer = document.getElementById("category-container");

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

  categoryContainer.addEventListener('click', (e) =>{
    if(e.target.localName === 'li'){
      const allLi = document.querySelectorAll('li')
      allLi.forEach(li => {
        li.classList.remove('border-b-4')
      });


      e.target.classList.add('border-b-4')
    }
    
  })
};
loadCategory();
