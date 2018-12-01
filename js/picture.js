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
    currentComment[t] = comment[generateNumber(0, comment.length - 1)];
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
  pictureElement.addEventListener('click', function () {
    openBigPicture();
    renderBigPictureElement(pic);
  });
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
// bigPictureElement.classList.remove('hidden');

// список комментариев
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
    commentItem.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(1, 6) + '.svg';
    commentItem.querySelector('.social__text').textContent = data.comments[i];
    fragment.appendChild(commentItem.cloneNode(true));
  }

  removeElements(socComments, socCommentAll);

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


// скрытие блока счетчика комментариев и загрузки новых комментов
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');


// Загрузка изображения и показ формы редактирования
// загрузка изображения
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadButton = document.getElementById('upload-file');
var imgCloseButton = document.getElementById('upload-cancel');
var imgUploadForm = document.querySelector('.img-upload__form');

var openUploadWindow = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      imgUploadOverlay.classList.add('hidden');
      imgUploadForm.reset();
    }
  });
};

var closeUploadWindow = function () {
  imgUploadOverlay.classList.add('hidden');
  imgUploadForm.reset();
};

imgUploadButton.addEventListener('change', function () {
  openUploadWindow();
});

imgCloseButton.addEventListener('click', function () {
  closeUploadWindow();
});


// Применение эффекта для изображения
var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');
var allClassRadio = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];

effectLevelPin.addEventListener('mousep', function () {
});

var addEffect = function (radio, effect) {
  radio.addEventListener('click', function () {
    if (effect === 'effects__preview--none') {
      effectLevelPin.classList.add('hidden');
    } else {
      effectLevelPin.classList.remove('hidden');
    }
    imgUploadPreview.querySelector('img').removeAttribute('class');
    imgUploadPreview.querySelector('img').classList.add(effect);
  });
};

for (var i = 0; i < effectsRadio.length; i++) {
  addEffect(effectsRadio[i], allClassRadio[i]);
}

// Редактирование размера изображения
var scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value').getAttribute('value'); // считает от этого значения
var scaleControlValueMonitor = imgUploadOverlay.querySelector('.scale__control--value');
var SCALE_STEP = 25;
var MIN_SCALE = 25;
var MAX_SCALE = 100;

var decreaseScale = function () {
  if (parseFloat(scaleControlValue) !== MIN_SCALE) {
    var currentValue = parseFloat(scaleControlValue) - SCALE_STEP + '%';
    scaleControlValueMonitor.setAttribute('value', currentValue);
    imgUploadPreview.querySelector('img').style.transform = 'scale(0.75)';
  } else {
    currentValue = parseFloat(scaleControlValue);
    imgUploadPreview.querySelector('img').style.transform = 'scale(0.25)';
  }
};

var increaseScale = function () {
  if (parseFloat(scaleControlValue) !== MAX_SCALE) {
    var currentValue = parseFloat(scaleControlValue) + SCALE_STEP + '%';
    scaleControlValueMonitor.setAttribute('value', currentValue);
    imgUploadPreview.querySelector('img').style.transform = 'scale(0.' + currentValue + ')'; // в таком формате не работает
  } else {
    currentValue = parseFloat(scaleControlValue);
    imgUploadPreview.querySelector('img').style.transform = 'scale(1)';
  }
};

scaleControlSmaller.addEventListener('click', function () {
  decreaseScale();
});

scaleControlBigger.addEventListener('click', function () {
  increaseScale();
});

// Показ изображения в полноэкранном режиме

var bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');

var openBigPicture = function () {
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      bigPictureElement.classList.add('hidden');
    }
  });
};

var closeBigPicture = function () {
  bigPictureElement.classList.add('hidden');
};

bigPictureCancel.addEventListener('click', function () {
  closeBigPicture();
});
