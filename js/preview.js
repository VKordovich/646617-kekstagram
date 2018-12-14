'use strict';
(function () {
  var socCommentUl = document.querySelector('.social__comments');

  var createCooment = function (data) {
    var myP = document.createElement('p');
    var fragment = document.createDocumentFragment();
    myP.classList.add('social__text');
    myP.textContent = data.message;
    fragment.appendChild(myP);
    return fragment;
  };

  var createIcon = function (data) {
    var myImg = document.createElement('img');
    var fragment = document.createDocumentFragment();
    myImg.classList.add('social__picture');
    myImg.src = data.avatar;
    myImg.alt = 'Аватар комментатора фотографии';
    myImg.width = 35;
    myImg.height = 35;
    fragment.appendChild(myImg);
    return fragment;
  };

  var createListElement = function (comment) {
    var myLi = document.createElement('li');
    myLi.classList.add('social__comment');
    myLi.appendChild(createIcon(comment));
    myLi.appendChild(createCooment(comment));
    return myLi;
  };

  // создание комментариев
  var createCommentsList = function (data) {
    while (socCommentUl.firstChild) {
      socCommentUl.removeChild(socCommentUl.firstChild);
    }
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 5; i++) {
      var liOn = createListElement(data[i]);
      fragment.appendChild(liOn);
    }
    socCommentUl.appendChild(fragment);
  };

  window.preview = {
    bigPictureElement: document.querySelector('.big-picture'),
    renderBigPictureElement: function (bigPic) {
      window.preview.bigPictureElement.querySelector('.big-picture__img img').src = bigPic.url;
      window.preview.bigPictureElement.querySelector('.likes-count').textContent = bigPic.likes;
      window.preview.bigPictureElement.querySelector('.comments-count').textContent = bigPic.comments.length;
      window.preview.bigPictureElement.querySelector('.social__caption').textContent = bigPic.description;
      createCommentsList(bigPic.comments);
      return window.preview.bigPictureElement;
    }
  };

  // отрисовка большой фотографии
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
})();
