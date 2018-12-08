'use strict';
(function () {
  var socComments = document.querySelector('.social__comments');
  var socComment = document.querySelector('.social__comment');
  var socCommentAll = document.querySelectorAll('.social__comment');

  // удаление каждого комментария
  var removeElements = function (parent, child) {
    for (var i = 0; i < child.length; i++) {
      parent.removeChild(child[i]);
    }
  };

  // создание комментариев
  var renderComments = function (data) {
    var fragment = document.createDocumentFragment();
    var commentItem = socComment.cloneNode(true);
    for (var i = 0; i < data.comments.length; i++) {
      commentItem.querySelector('.social__picture').src = 'img/avatar-' + window.data.generateNumber(1, 6) + '.svg';
      commentItem.querySelector('.social__text').textContent = data.comments[i];
      fragment.appendChild(commentItem.cloneNode(true));
    }

    removeElements(socComments, socCommentAll);

    return socComments.appendChild(fragment);
  };

  window.preview = {
    QUANTITY_PHOTOS: 25,
    bigPictureElement: document.querySelector('.big-picture'),
    renderBigPictureElement: function (bigPic) {
      window.preview.bigPictureElement.querySelector('.big-picture__img img').src = bigPic.url;
      window.preview.bigPictureElement.querySelector('.likes-count').textContent = bigPic.likes;
      window.preview.bigPictureElement.querySelector('.comments-count').textContent = bigPic.comments.length;
      window.preview.bigPictureElement.querySelector('.social__caption').textContent = bigPic.description;
      renderComments(window.data.createPhoto(this.QUANTITY_PHOTOS)[1]);
      return window.preview.bigPictureElement;
    }
  };

  // отрисовка большой фотографии
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
})();
