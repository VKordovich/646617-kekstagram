'use strict';
(function () {

  var socCommentParent = document.querySelector('.social');
  var socCommentUl = document.querySelector('.social__comments');

  // удаление каждого комментария
  var removeElements = function (parent, child) {
    parent.removeChild(child);
  };

  var createCooment = function (data) {
    var myP = document.createElement('p');
    var fragmente = document.createDocumentFragment();
    for (var i = 0; i < data[1].comments.length; i++) {
      myP.classList.add('social__text');
      myP.textContent = data[1].comments[i];
      fragmente.appendChild(myP);
    }
    return fragmente;
  };

  var createIcon = function (data) {
    var myImg = document.createElement('img');
    var fragmentu = document.createDocumentFragment();
    for (var i = 0; i < data; i++) {
      myImg.classList.add('social__picture');
      myImg.src = 'img/avatar-' + window.data.generateNumber(1, 6) + '.svg';
      myImg.alt = 'Аватар комментатора фотографии';
      myImg.width = 35;
      myImg.height = 35;
      fragmentu.appendChild(myImg);
    }
    return fragmentu;
  };

  // создание комментариев
  var createCommentsList = function (dataa) {
    removeElements(socCommentParent, socCommentUl);
    var myUl = document.createElement('ul');
    var myLi = document.createElement('li');

    var fragment = document.createDocumentFragment();
    myUl.classList.add('social__comments');

    for (var i = 0; i < dataa; i++) {
      myLi.classList.add('social__comment');
      myLi.appendChild(createIcon(5));
      myLi.appendChild(createCooment(window.data.createPhoto(25)));
      fragment.appendChild(myLi);
    }

    myUl.appendChild(fragment);
    return socCommentParent.insertBefore(myUl, socCommentParent.children[2]);
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
