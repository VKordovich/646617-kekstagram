'use strict';

// список комментариев
var comment = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

// описание фотографии
var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами.....', 'Вот это тачка!'];
// шаблон фотографии пользователя
var pictureElementTemplate = document.querySelector('#picture').content.querySelector('.picture');

// блок с фотографиями
var allPhotos = document.querySelector('.pictures');

// блок полноразмерных фотографий
var bigPictureElement = document.querySelector('.big-picture');

// константы
var QUANTITY_PHOTOS = 25;
var QUANTITY_LIKES_MIN = 15;
var QUANTITY_LIKES_MAX = 200;
var QUANTITY_COMMENTS_MIN = 1;
var QUANTITY_COMMENTS_MAX = 2;
// генератор случайных чисел
var generateNumber = function (min, max) {
  var randomNumber = min - 0.5 + Math.random() * (max - min + 1);
  randomNumber = Math.round(randomNumber);
  return randomNumber;
};

// колличество комментариев под одно фото
var qtyComments = function (qty) {
  var currentComment = [];
  for (var t = 0; t < qty; t++) {
    currentComment[t] = comment[generateNumber(0, comment.length)];
  }
  return currentComment;
};

// описание фотографий других пользователей
var createPhoto = function (qty) {
  var picture = [];
  for (var i = 0; i <= qty; i++) {
    picture[i] = {
      url: 'photos/' + i + '.jpg',
      likes: generateNumber(QUANTITY_LIKES_MIN, QUANTITY_LIKES_MAX),
      comments: qtyComments(generateNumber(QUANTITY_COMMENTS_MIN, QUANTITY_COMMENTS_MAX)),
      description: descriptions[generateNumber(0, descriptions.length - 1)]
    };
  }
  return picture;
};

// создание DOM элемента
var renderPictureElement = function (pic) {
  var pictureElement = pictureElementTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = pic.url;
  pictureElement.querySelector('.picture__likes').textContent = pic.likes;
  pictureElement.querySelector('.picture__comments').textContent = pic.comments.length;
  return pictureElement;
};

// отрисовка элементов
var photo = createPhoto(QUANTITY_PHOTOS);
var renderBlockElements = function (quantity) {
  var fragment = document.createDocumentFragment();
  for (var j = 1; j <= quantity; j++) {
    fragment.appendChild(renderPictureElement(photo[j]));
  }
  return allPhotos.appendChild(fragment);
};
renderBlockElements(QUANTITY_PHOTOS);
// показывет блок полноразмерных фото
bigPictureElement.classList.remove('hidden');

// список комментариев
var socComments = document.querySelector('.social__comments');
var socComment = document.querySelectorAll('.social__comment');

// удаление каждого комментария
var removeElements = function (parent, child) {
  for (var i = 0; i < child.length; i++) {
    parent.removeChild(child[i]);
  }
};

// создание комментариев
var renderComments = function (data) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.comments.length; i++) {
    var commentItem = socComment[i].cloneNode(true);
    commentItem.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(1, 6) + '.svg';
    commentItem.querySelector('.social__text').textContent = data.comments[i];
    fragment.appendChild(commentItem);
  }

  removeElements(socComments, socComment);


  return socComments.appendChild(fragment);
};

// отрисовка большой фотографии
var renderBigPictureElement = function (bigPic) {
  bigPictureElement.querySelector('.big-picture__img img').src = bigPic.url;
  bigPictureElement.querySelector('.likes-count').textContent = bigPic.likes;
  bigPictureElement.querySelector('.comments-count').textContent = bigPic.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = bigPic.description;
  renderComments(photo[1]);
  return bigPictureElement;
};

renderBigPictureElement(photo[1]);

// скрытие блока счетчика комментариев и загрузки новых комментов
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
