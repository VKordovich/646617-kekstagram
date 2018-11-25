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

// генератор случайных чисел
var renderNumber = function (min, max) {
  var randomNumber = min - 0.5 + Math.random() * (max - min + 1);
  randomNumber = Math.round(randomNumber);
  return randomNumber;
};

// описание фотографий других пользователей
var arrPhoto = function () {
  var picture = [];
  for (var i = 1; i < 26; i++) {
    picture[i] = {
      url: 'photos/' + i + '.jpg',
      likes: renderNumber(15, 200),
      comments: renderNumber(5, 125),
      description: descriptions[renderNumber(0, descriptions.length - 1)]
    };
  }
  return picture;
};

// создание DOM элемента
var renderPictureElement = function (pic) {
  var pictureElement = pictureElementTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = pic.url;
  pictureElement.querySelector('.picture__likes').textContent = pic.likes;
  pictureElement.querySelector('.picture__comments').textContent = pic.comments;
  return pictureElement;
};

// отрисовка элементов
var photo = arrPhoto();
var fragment = document.createDocumentFragment();
for (var j = 1; j < 26; j++) {
  fragment.appendChild(renderPictureElement(photo[j]));
}
allPhotos.appendChild(fragment);

// показывет блок полноразмерных фото
bigPictureElement.classList.remove('hidden');

// список комментариев
var socComment = document.querySelector('.social__comments');

// массив с иконками
var socPicture = socComment.querySelectorAll('.social__picture');

// массив с комментариями
var socText = socComment.querySelectorAll('.social__text');

// описание комментариев с иконкой
var arrComments = function () {
  var socialCommentText = {
    src: 'img/avatar-' + renderNumber(1, 6) + '.svg',
    socialText: comment[renderNumber(0, 5)]
  };
  return socialCommentText;
};

// отрисовка большой фотографии
var renderBigPictureElement = function (bigPic) {
  bigPictureElement.querySelector('.big-picture__img').src = bigPic.url;
  bigPictureElement.querySelector('.likes-count').textContent = bigPic.likes;
  bigPictureElement.querySelector('.comments-count').textContent = bigPic.comments;
  bigPictureElement.querySelector('.social__caption').textContent = bigPic.description;
  for (var k = 0; k < socPicture.length; k++) {
    socPicture[k].src = arrComments().src;
    socText[k].textContent = arrComments().socialText;
  }
  return bigPictureElement;
};
renderBigPictureElement(photo[1]);

// скрытие блока счетчика комментариев и загрузки новых комментов
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
