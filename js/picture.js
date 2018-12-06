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

// .....................список комментариев
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


// ..........................Загрузка изображения и показ формы редактирования
// загрузка изображения
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadButton = document.getElementById('upload-file');
var imgCloseButton = document.getElementById('upload-cancel');
var imgUploadForm = document.querySelector('.img-upload__form');

var openUploadWindow = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onButtonEsc);
};

var onButtonEsc = function (evt) {
  if (evt.keyCode === 27) {
    imgUploadOverlay.classList.add('hidden');
    imgUploadForm.reset();
  }
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


// .............................Применение эффекта для изображения
var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');
var allClassRadio = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
var allEffects = ['filter: none', 'filter: grayscale(1)', 'filter: sepia(1)', 'filter: invert(1)', 'filter: blur(3)', 'filter: brightness(3)'];

var addEffect = function (radio, classPic, effect) {
  radio.addEventListener('click', function () {
    if (classPic === 'effects__preview--none') {
      effectLevelPin.classList.add('hidden');
    } else {
      effectLevelPin.classList.remove('hidden');
    }
    imgUploadPreview.querySelector('img').removeAttribute('class');
    imgUploadPreview.querySelector('img').classList.add(classPic);
    imgUploadPreview.querySelector('img').style = effect;
  });
};

for (var i = 0; i < effectsRadio.length; i++) {
  addEffect(effectsRadio[i], allClassRadio[i], allEffects[i]);
}

// ..........range
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');

var effects = [
  {
    name: 'chrome',
    filter: 'grayscale',
    minValue: 0,
    maxValue: 1
  },
  {
    name: 'sepia',
    filter: 'sepia',
    minValue: 0,
    maxValue: 1
  },
  {
    name: 'marvin',
    filter: 'invert',
    minValue: 0,
    maxValue: 1
  },
  {
    name: 'phobos',
    filter: 'blur',
    minValue: 0,
    maxValue: 3
  },
  {
    name: 'heat',
    filter: 'brightness',
    minValue: 1,
    maxValue: 3
  }
];

// расчитывает соотношение между пином и уровнем эффекта и возвращает уровень эффекта
var findRatio = function (positionPin, maxWidthLin, minLevelEffect, maxLevelEffect) {
  var level = maxLevelEffect / maxWidthLin * positionPin;
  if (!minLevelEffect) {
    return (Math.round(level * 100) / 100);
  } else {
    var difference = maxLevelEffect - minLevelEffect;
    level = (difference / maxWidthLin * positionPin) + minLevelEffect;
    return (Math.round(level * 100) / 100);
  }
};

// определяет что за фильтр включен и возвращает нужный стиль
var findFilter = function (classPic) {
  for (var j = 0; j < effects.length; j++) {
    if (classPic.indexOf(effects[j].name) > -1) {
      return effects[j];
    }
  }
  return null;
};

var onPinMouseDown = function (evt) {
  evt.preventDefault();
  var startPositionPin = evt.clientX;
  var currentClassPic = imgUploadPreview.querySelector('img').className;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shiftPin = startPositionPin - moveEvt.clientX;
    var allStylesLine = getComputedStyle(effectLevelLine);
    var maxWidthLine = parseInt(allStylesLine.width, 10);
    startPositionPin = moveEvt.clientX;

    var getPositionIntoLine = function (position, min, max) {
      return Math.min(Math.max(position, min), max);
    };

    var positionPinIntoLine = getPositionIntoLine(effectLevelPin.offsetLeft - shiftPin, 0, maxWidthLine);

    effectLevelPin.style.left = positionPinIntoLine + 'px';
    effectLevelDepth.style.width = positionPinIntoLine + 'px';
    var currentFilter = findFilter(currentClassPic);
    var currentValueEffect = findRatio(positionPinIntoLine, maxWidthLine, currentFilter.minValue, currentFilter.maxValue);
    effectLevelValue.value = currentValueEffect * 100;
    imgUploadPreview.querySelector('img').style = 'filter: ' + currentFilter.filter + '(' + currentValueEffect + ')';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

effectLevelPin.addEventListener('mousedown', onPinMouseDown);

// .........................Редактирование размера изображения
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

// ..............................Хэш-теги

var textHashtags = document.querySelector('.text__hashtags');
// var textDescription = document.querySelector('.text__description');
var QTY_MAX_HASHTAG = 5;
var QTY_MAX_SYMBOLS = 20;
var QTY_MIN_SYMBOLS = 1;

// хэш-тег начинается с символа # (решётка)
var checkSharp = function (str) {
  return str[0] === '#';
};

// хеш-тег не может состоять только из одной решётки
var checkLength = function (str) {
  return str.length > QTY_MIN_SYMBOLS;
};

// максимальная длина одного хэш-тега 20 символов, включая решётку
var checkLengthHashtag = function (str) {
  return str.length < QTY_MAX_SYMBOLS;
};

// хэш-теги разделяются пробелами
var checkSpace = function (hashTags) {
  return hashTags.indexOf(',') > -1;
};

// один и тот же хэш-тег не может быть использован дважды
// теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом
var checkDoubleHashtag = function (hashTags) {
  hashTags.sort();
  for (var j = 0; j < hashTags.length - 1; j++) {
    if (hashTags[j].toLowerCase() === hashTags[j + 1].toLowerCase()) {
      return false;
    }
  }
  return true;
};

// нельзя указать больше пяти хэш-тегов
var checkQtyHashtags = function (hashTags) {
  return hashTags.length < QTY_MAX_HASHTAG;
};

var checkValidity = function (hashtags) {
  var message = '';

  // проверка для одиночных хештегов
  for (var j = 0; j < hashtags.length; j++) {

    if (!checkSharp(hashtags[j])) {
      message += 'Хэш-тег должен начинаться с символа # (решётка). ';
    }
    if (!checkLength(hashtags[j])) {
      message += 'Хэш-тег не может состоять только из одной решётки. ';
    }
    if (!checkLengthHashtag(hashtags[j])) {
      message += 'Максимальная длина одного хэш-тега 20 символов, включая решётку. ';
    }
    if (checkSpace(hashtags[j])) {
      message += 'Хэш-теги разделяются пробелами. ';
    }
  }

  // проверка для всего массива хештегов
  if (!checkDoubleHashtag(hashtags)) {
    message += 'Хештеги повторяются. ';
  }

  if (!checkQtyHashtags(hashtags)) {
    message += 'Нельзя указать больше пяти хэш-тегов. ';
  }

  if (message) {
    textHashtags.setCustomValidity(message);
  } else {
    textHashtags.setCustomValidity('');
  }
};

textHashtags.addEventListener('input', function (evt) {
  var hashtags = evt.target.value.split(' ');
  checkValidity(hashtags);
});

imgUploadForm.addEventListener('submit', function () {
  checkValidity(textHashtags.value.split(' '));
});

textHashtags.addEventListener('focus', function () {
  document.removeEventListener('keydown', onButtonEsc);
});

textHashtags.addEventListener('blur', function () {
  document.addEventListener('keydown', onButtonEsc);
});

