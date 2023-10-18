import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const largeImageWidth = 1280;
let largeImagePopup;

const galleryList = document.querySelector(".gallery");
galleryList.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems));

galleryList.addEventListener("click", onGalleryListClick);

function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
      </a>
    </li>
    `
    )
    .join("");
}

function onGalleryListClick(event) {
  event.preventDefault();

  const isGalleryImage = event.target.classList.contains("gallery__image");
  if (!isGalleryImage) {
    return;
  }

  const galleryImage = event.target;
  const galleryImageSrc = galleryImage.dataset.source;

  const popupOptions = {
    onShow: () => {
      document.addEventListener("keydown", onKeyboardKeyPress);
    },
    onClose: () => {
      document.removeEventListener("keydown", onKeyboardKeyPress);
    },
  };

  largeImagePopup = showLargeImagePopup(
    galleryImageSrc,
    largeImageWidth,
    popupOptions
  );
}

function showLargeImagePopup(imageSource, imageWidth, options) {
  const instance = basicLightbox.create(
    `
        <img src="${imageSource}" width="${imageWidth}">
    `,
    options
  );

  instance.show();
  return instance;
}

function closeLargeImagePopup() {
  if (largeImagePopup !== undefined) {
    largeImagePopup.close();
    largeImagePopup = undefined;
  }
}

function onKeyboardKeyPress(event) {
  if (event.code === "Escape") {
    closeLargeImagePopup();
  }
}
