'use strict';
(function () {
  var socCommentUl = document.querySelector('.social__comments');

  var createCooment = function (data) {
    var myP = document.createElement('p');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data[1].comments.length; i++) {
      myP.classList.add('social__text');
      myP.textContent = data[1].comments[i];
      fragment.appendChild(myP);
    }
    return fragment;
  };

  var createIcon = function (data) {
    var myImg = document.createElement('img');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data; i++) {
      myImg.classList.add('social__picture');
      myImg.src = 'img/avatar-' + window.data.generateNumber(1, 6) + '.svg';
      myImg.alt = 'Аватар комментатора фотографии';
      myImg.width = 35;
      myImg.height = 35;
      fragment.appendChild(myImg);
    }
    return fragment;
  };

  var createListElement = function () {
    var QTY_COMMENTS = 5;
    var myLi = document.createElement('li');
    myLi.classList.add('social__comment');
    myLi.appendChild(createIcon(QTY_COMMENTS));
    myLi.appendChild(createCooment(window.data.createPhoto(25)));
    return myLi;
  };

  // создание комментариев
  var createCommentsList = function (dataa) {
    while (socCommentUl.firstChild) {
      socCommentUl.removeChild(socCommentUl.firstChild);
    }
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < dataa; i++) {
      var liOn = createListElement();
      fragment.appendChild(liOn);
    }
    socCommentUl.appendChild(fragment);
  };

  window.preview = {
    QUANTITY_PHOTOS: 25,
    bigPictureElement: document.querySelector('.big-picture'),
    renderBigPictureElement: function (bigPic) {
      window.preview.bigPictureElement.querySelector('.big-picture__img img').src = bigPic.url;
      window.preview.bigPictureElement.querySelector('.likes-count').textContent = bigPic.likes;
      window.preview.bigPictureElement.querySelector('.comments-count').textContent = bigPic.comments.length;
      window.preview.bigPictureElement.querySelector('.social__caption').textContent = bigPic.description;
      createCommentsList(5);
      return window.preview.bigPictureElement;
    }
  };

  // отрисовка большой фотографии
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
})();
