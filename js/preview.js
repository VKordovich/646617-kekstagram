'use strict';
(function () {
  var socCommentUl = document.querySelector('.social__comments');
  var QTY_COMMENTS = 5;
  var CONSTCOMM = 1;
  var socCommentsLoader = document.querySelector('.social__comments-loader');
  var socCommCount = document.querySelector('.social__comment-count');

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
    myLi.classList.add('social__comment', 'visually-hidden');
    myLi.appendChild(createIcon(comment));
    myLi.appendChild(createCooment(comment));
    return myLi;
  };

  // more 5 comm
  var createMoreComments = function (comments, qty) {
    var takeNumber = qty;
    socCommentUl.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      socCommentUl.appendChild(createListElement(comments[i]));
    }
  };

  // создание комментариев
  var createCommentsList = function (data, defQtyComm) {
    var qtyComments = defQtyComm;
    var qtyData = data.length;
    while (socCommentUl.firstChild) {
      socCommentUl.removeChild(socCommentUl.firstChild);
    }
    createMoreComments(data, qtyData);
    while (qtyComments && qtyData) {
      socCommentUl.querySelector('li.visually-hidden').classList.remove('visually-hidden');
      qtyComments--;
      qtyData--;
    }
    if (!qtyData) {
      socCommentsLoader.classList.add('visually-hidden');
    } else {
      if (socCommentsLoader.classList.contains('visually-hidden')) {
        socCommentsLoader.classList.remove('visually-hidden');
      }
    }
    socCommCount.innerHTML = '';
    var newSpan = document.createElement('span');
    newSpan.classList.add('comments-count');
    newSpan.textContent = data.length - qtyData + ' из ' + data.length + ' комментариев';
    socCommCount.insertBefore(newSpan, socCommCount.firstChild);
  };

  var calculateClicks = function (a) {
    if (a > 3) {
      return a;
    }
    return ++a;
  };

  window.preview = {
    bigPictureElement: document.querySelector('.big-picture'),
    renderBigPictureElement: function (bigPic) {
      window.preview.bigPictureElement.querySelector('.big-picture__img img').src = bigPic.url;
      window.preview.bigPictureElement.querySelector('.likes-count').textContent = bigPic.likes;
      window.preview.bigPictureElement.querySelector('.comments-count').textContent = bigPic.comments.length;
      window.preview.bigPictureElement.querySelector('.social__caption').textContent = bigPic.description;
      createCommentsList(bigPic.comments, QTY_COMMENTS);
      socCommentsLoader.addEventListener('click', function () {
        CONSTCOMM = calculateClicks(CONSTCOMM);
        createCommentsList(bigPic.comments, QTY_COMMENTS * CONSTCOMM);
      });
      return window.preview.bigPictureElement;
    }
  };
})();
