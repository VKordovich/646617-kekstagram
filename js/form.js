'use strict';
(function () {
  // ...........................................................................................Загрузка изображения и показ формы редактирования
  // загрузка изображения
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadButton = document.getElementById('upload-file');
  var imgCloseButton = document.getElementById('upload-cancel');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');
  var allClassRadio = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
  var allEffects = ['filter: none', 'filter: grayscale(1)', 'filter: sepia(1)', 'filter: invert(1)', 'filter: blur(3)', 'filter: brightness(3)'];
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
  var scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value').getAttribute('value');
  var scaleControlValueMonitor = imgUploadOverlay.querySelector('.scale__control--value');
  var textHashtags = document.querySelector('.text__hashtags');
  var SCALE_STEP = 25;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var QTY_MAX_HASHTAG = 5;
  var QTY_MAX_SYMBOLS = 20;
  var QTY_MIN_SYMBOLS = 1;
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

  var openUploadWindow = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onButtonEsc);
  };

  // eslint-disable-next-line no-unused-vars
  var onLoadToServer = function (response) {
    imgUploadOverlay.classList.add('hidden');
  };

  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; width: 1000px; min-height: 100px; padding-top: 20px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '60px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(imgUploadForm), onLoadToServer, onErrorLoad);
    evt.preventDefault();
  });
  // ......................................................................................................................................................................................
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
  // ......................................................................................................................................................................................
  // Применение эффекта для изображения
  effectLevelPin.classList.add('hidden');

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

  // range
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

  // двигает ползунок
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

  // ..............................Хэш-теги

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
})();
