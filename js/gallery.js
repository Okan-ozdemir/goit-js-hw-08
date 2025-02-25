const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryContainer = document.querySelector(".gallery");

// Tüm galeri öğelerini bir diziye ekleyelim.
const galleryItemsHTML = images.map(image => {
  // Her öğe için lightbox HTML'sini oluşturmamız gerekmiyor çünkü 
  // lightbox instance'larını dinamik olarak oluşturacağız. 
  // Burada yalnızca temel galeri öğesini oluşturuyoruz.
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${image.original}">
        <img 
          class="gallery-image" 
          src="${image.preview}" 
          data-source="${image.original}" 
          alt="${image.description}">
      </a>
    </li>
  `;
});

// Tüm HTML parçalarını tek bir string'e birleştiriyoruz.
galleryContainer.innerHTML = galleryItemsHTML.join("");

// Galeri konteynerine eklenen öğeler üzerinde olay dinleyicilerini tek seferde kurabiliriz.
galleryContainer.addEventListener("click", event => {
  event.preventDefault(); // Varsayılan bağlantı davranışını engelle

  // Tıklanan elementin img olup olmadığını kontrol et
  if (event.target.nodeName !== "IMG") {
    return;
  }

  // Tıklanan resmin orijinal kaynağını al
  const originalImage = event.target.getAttribute("data-source");

  // lightbox instance oluştur
  const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${originalImage}" alt="${event.target.alt}">
    </div>
  `);

  instance.show();

  // Escape tuşu ile lightbox'ı kapatmak için
  const onEscKeyPress = e => {
    if (e.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", onEscKeyPress);
    }
  };

  document.addEventListener("keydown", onEscKeyPress);
});
