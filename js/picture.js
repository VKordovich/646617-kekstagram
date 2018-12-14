'use strict';
(function () {
  var pictureElementTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var QTY_PHOTOS = 25;
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
  var onLoad = function (picture) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < QTY_PHOTOS; j++) {
      fragment.appendChild(renderPictureElement(picture[j]));
    }
    allPhotos.appendChild(fragment);
  };


  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; width: 1000px; min-height: 100px; padding-top: 20px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '60px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onErrorLoad);
})();
