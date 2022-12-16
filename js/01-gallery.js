import { galleryItems } from "./gallery-items.js";
// Change code below this line

// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
let instance;
const gallery = document.querySelector(".gallery");

const markup = galleryItems.reduce(
  (acc, { preview, original, description }) =>
    acc +
    `<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      loading = "lazy"
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`,
  ""
);

gallery.insertAdjacentHTML("beforeend", markup);
gallery.addEventListener("click", onClickOpen);

function onClickOpen(evt) {
  evt.preventDefault();
  const target = evt.target;
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  instance = basicLightbox.create(
    `<img class="gallery__image" src="${evt.target.dataset.source}" alt="${evt.target.alt}" width="800" height="600"/>`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", closeInstance);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", closeInstance);
      },
    }
  );
  instance.show();
}
function closeInstance(evt) {
  if (evt.code === "Escape") {
    instance.close();
  }
}
