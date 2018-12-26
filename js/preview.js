'use strict';
(function () {
  var socialCommentUl = document.querySelector('.social__comments');
  var QTY_COMMENTS = 5;
  var CONSTCOMM = 1;
  var QTY_PUSH_BUTTON = 3;
  var socialCommentsLoader = document.querySelector('.social__comments-loader');
  var socialCommCount = document.querySelector('.social__comment-count');

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

  var createMoreComments = function (comments, qty) {
    var takeNumber = qty;
    socialCommentUl.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      socialCommentUl.appendChild(createListElement(comments[i]));
    }
  };

  var createCommentsList = function (data, defQtyComm) {
    var qtyComments = defQtyComm;
    var qtyData = data.length;
    while (socialCommentUl.firstChild) {
      socialCommentUl.removeChild(socialCommentUl.firstChild);
    }
    createMoreComments(data, qtyData);
    while (qtyComments && qtyData) {
      socialCommentUl.querySelector('li.visually-hidden').classList.remove('visually-hidden');
      qtyComments--;
      qtyData--;
    }
    if (!qtyData) {
      socialCommentsLoader.classList.add('visually-hidden');
    } else {
      if (socialCommentsLoader.classList.contains('visually-hidden')) {
        socialCommentsLoader.classList.remove('visually-hidden');
      }
    }
    socialCommCount.innerHTML = '';
    var newSpan = document.createElement('span');
    newSpan.classList.add('comments-count');
    newSpan.textContent = data.length - qtyData + ' из ' + data.length + ' комментариев';
    socialCommCount.insertBefore(newSpan, socialCommCount.firstChild);
  };

  var calculateClicks = function (a) {
    return a > QTY_PUSH_BUTTON ? a : ++a;
  };

  window.preview = {
    bigPictureElement: document.querySelector('.big-picture'),
    renderBigPictureElement: function (bigPic) {
      window.preview.bigPictureElement.querySelector('.big-picture__img img').src = bigPic.url;
      window.preview.bigPictureElement.querySelector('.likes-count').textContent = bigPic.likes;
      window.preview.bigPictureElement.querySelector('.comments-count').textContent = bigPic.comments.length;
      window.preview.bigPictureElement.querySelector('.social__caption').textContent = bigPic.description;
      createCommentsList(bigPic.comments, QTY_COMMENTS);
      socialCommentsLoader.addEventListener('click', function () {
        CONSTCOMM = calculateClicks(CONSTCOMM);
        createCommentsList(bigPic.comments, QTY_COMMENTS * CONSTCOMM);
      });
      return window.preview.bigPictureElement;
    }
  };
})();
