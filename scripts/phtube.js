function getTime(time) {
  const hour = parseInt(time / 3600);
  let remainingSeconds = time % 3600;
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return `${hour} hr ${minute} min ${remainingSeconds} s ago`;
}
const removeActiveClass = () => {
  const removeActiveBtn = document.getElementsByClassName('category-btn')
  for(let btn of removeActiveBtn){
    btn.classList.remove('active')
  }
}

const loadSortedCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data => {
  removeActiveClass();

  const categoryBtn = document.getElementById(`btn-${id}`) 
  categoryBtn.classList.add("active");
  displayVideos(data.category)
  })
  .catch(error => console.log(error))
}
const loadDetails = (videoId) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
  .then(res => res.json())
  .then(data => displayDetails(data.video))
  .catch(error => console.log(error))
}

const displayDetails = (video) => {
  document.getElementById('showModalData').click()
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = 
  `
    <img src=${video.thumbnail}>
    <p class="mt-5">${video.description}</p>
  `
}
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayingCategories(data.categories))
    .catch((error) => console.log(error));
};

const displayingCategories = (categories) => {
  const buttonContainer = document.getElementById("button-container");
  for (const item of categories) {
    const buttonDivs = document.createElement("div");

    buttonDivs.innerHTML = 
    `
    <button id="btn-${item.category_id}" onclick = "loadSortedCategory(${item.category_id})" class="btn category-btn">${item.category}</button>
    `
    buttonContainer.appendChild(buttonDivs);
  }
};

const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const displayVideos = (videos) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  if(videos.length == 0){
    cardsContainer.classList.remove('grid');
    cardsContainer.innerHTML = `
    <div class="min-h-80 flex flex-col gap-5 items-center justify-center">
       <img src="assets/Icon.png" alt="">
       <h2 class="text-center text-3xl font-bold">
       Oops!! Sorry, There is no content here.
       </h2>
    </div>
    `;
    return;
  }
  else{
    cardsContainer.classList.add('grid');
  }

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img 
    class="h-full w-full object-cover"
    src=${video.thumbnail} 
    />

    ${
      video.others.posted_date?.length == 0 ? "" :` <span class="absolute text-xs bg-black text-white p-1 rounded right-2 bottom-2">
      ${getTime(video.others.posted_date)}
    </span>`
    }

  </figure>
  <div class="px-0 py-4 flex">
    <div>
  <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}>
    </div>
    <div>
      <div>
        <h2 class="font-bold ml-2">${video.title}</h2>
      </div>
     <div class="flex items-center gap-2">
       <p class="text-gray-400 ml-2">${video.authors[0].profile_name}</p>

       ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">` : ''}
     </div>
      <div>
        <button onclick ="loadDetails('${video.video_id}')" class='btn btn-error'>details</button>
       </div>
    </div>
  </div>
    `;

    cardsContainer.appendChild(card);
  });
};

const openModal = ()=> {
  document.getElementById("showModalData").click();
}

document.getElementById('search-bar').addEventListener('keyup', (e)=> {
  loadVideos(e.target.value)
})

loadCategories();
loadVideos();
