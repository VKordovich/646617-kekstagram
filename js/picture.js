'use strict';
(function () {
  var pictureElementTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var allPhotos = document.querySelector('.pictures');
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

  // отрисовка элементов
  var renderBlockElements = function (quantity) {
    var fragment = document.createDocumentFragment();
    for (var j = 1; j <= quantity; j++) {
      fragment.appendChild(renderPictureElement(window.data.createPhoto(window.preview.QUANTITY_PHOTOS)[j]));
    }
    return allPhotos.appendChild(fragment);
  };
  renderBlockElements(window.preview.QUANTITY_PHOTOS);
})();
