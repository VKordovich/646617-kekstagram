'use strict';
(function () {
  var comment = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами.....', 'Вот это тачка!'];

  var QUANTITY_LIKES_MIN = 15;
  var QUANTITY_LIKES_MAX = 200;
  var QUANTITY_COMMENTS_MIN = 1;
  var QUANTITY_COMMENTS_MAX = 2;

  window.data = {
    generateNumber: function (min, max) { // генератор случайных чисел
      var randomNumber = min - 0.5 + Math.random() * (max - min + 1);
      randomNumber = Math.round(randomNumber);
      return randomNumber;
    },
    createPhoto: function (qty) { // описание фотографий других пользователей
      var picture = [];
      for (var i = 0; i <= qty; i++) {
        picture[i] = {
          url: 'photos/' + i + '.jpg',
          likes: this.generateNumber(QUANTITY_LIKES_MIN, QUANTITY_LIKES_MAX),
          comments: qtyComments(this.generateNumber(QUANTITY_COMMENTS_MIN, QUANTITY_COMMENTS_MAX)),
          description: descriptions[this.generateNumber(0, descriptions.length - 1)]
        };
      }
      return picture;
    }
  };

  // колличество комментариев под одно фото
  var qtyComments = function (qty) {
    var currentComment = [];
    for (var t = 0; t < qty; t++) {
      currentComment[t] = comment[window.data.generateNumber(0, comment.length - 1)];
    }
    return currentComment;
  };
})();
