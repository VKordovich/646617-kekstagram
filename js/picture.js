'use strict';
(function () {
  var pictureElementTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var allPhotos = document.querySelector('.pictures');
  var imgUpl = allPhotos.querySelector('.img-upload');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
  var buttonPopular = document.getElementById('filter-popular');
  var buttonNew = document.getElementById('filter-new');
  var buttonDiscussed = document.getElementById('filter-discussed');
  var photosFromServer = [];
  var copyPhotosDis = [];
  var copyPhotosNew = [];
  var QTY_NEW_PHOTO = 10;

  var openBigPicture = function () {
    window.preview.bigPictureElement.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        window.preview.bigPictureElement.classList.add('hidden');
      }
    });
  };
  var closeBigPicture = function () {
    window.preview.bigPictureElement.classList.add('hidden');
  };

  bigPictureCancel.addEventListener('click', function () {
    closeBigPicture();
  });

  // создание DOM элемента
  var renderPictureElement = function (pic) {
    var pictureElement = pictureElementTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = pic.url;
    pictureElement.querySelector('.picture__likes').textContent = pic.likes;
    pictureElement.querySelector('.picture__comments').textContent = pic.comments.length;
    pictureElement.addEventListener('click', function () {
      openBigPicture();
      window.preview.renderBigPictureElement(pic);
    });
    return pictureElement;
  };

  // формирование списка фото
  var renderPhotos = function (picture, num) {
    var takeNumber = num;
    allPhotos.innerHTML = '';
    allPhotos.appendChild(imgUpl);
    for (var i = 0; i < takeNumber; i++) {
      allPhotos.appendChild(renderPictureElement(picture[i]));
    }
  };

  buttonPopular.addEventListener('click', function () {
    renderPhotos(photosFromServer, photosFromServer.length);
    buttonPopular.classList.add('img-filters__button--active');
    buttonNew.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
  });
  buttonNew.addEventListener('click', function () {
    sortNewPhotos(copyPhotosNew, 10);
    buttonNew.classList.add('img-filters__button--active');
    buttonPopular.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
  });
  buttonDiscussed.addEventListener('click', function () {
    sortDiscussedPhoto(copyPhotosDis);
    buttonDiscussed.classList.add('img-filters__button--active');
    buttonPopular.classList.remove('img-filters__button--active');
    buttonNew.classList.remove('img-filters__button--active');
  });

  var sortNewPhotos = function (photos) {
    var compareRandom = function () {
      return Math.random() - 0.5;
    };
    renderPhotos(photos.sort(compareRandom), QTY_NEW_PHOTO);
  };

  var sortDiscussedPhoto = function (photos) {
    photos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    renderPhotos(photos, photos.length);
  };

  // отрисовка элементов
  var onLoad = function (picture) {
    photosFromServer = picture;
    copyPhotosDis = photosFromServer.slice();
    copyPhotosNew = photosFromServer.slice();
    renderPhotos(photosFromServer, photosFromServer.length);
  };


  var onErrorLoad = function () {
    var errorWindow = errorTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', errorWindow);
  };

  window.backend.load(onLoad, onErrorLoad);
})();
