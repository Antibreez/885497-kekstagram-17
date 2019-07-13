'use strict';

(function (Random, RenderGallery) {
  var getLengthSorting = Random.getLengthSorting;
  var getSorting = Random.getSorting;

  var GalleryCollection = {
    default: [],
    sorted: [],
    random: []
  };

  var FilterIdToCollection = function () {
    this['filter-popular'] = GalleryCollection.default;
    this['filter-new'] = GalleryCollection.random;
    this['filter-discussed'] = GalleryCollection.sorted;
  };

  var imagesFilter = document.querySelector('.img-filters');
  var filtersForm = imagesFilter.querySelector('.img-filters__form');
  var filtersButtons = imagesFilter.querySelectorAll('.img-filters__button');

  var getRandomImages = function (images) {
    return images.slice().sort(getSorting).slice(0, 10);
  };

  var getSortedImages = function (images) {
    return images.slice().sort(getLengthSorting);
  };

  var clearButtonClass = function () {
    filtersButtons.forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });
  };

  var onButtonClick = function (evt) {
    var classList = evt.target.classList;
    if (classList.contains('img-filters__button--active')) {
      return;
    }

    clearButtonClass();
    classList.add('img-filters__button--active');
  };

  var onFiltersFormClick = function (evt) {
    if (evt.target.id === 'filter-new') {
      GalleryCollection.random = getRandomImages(GalleryCollection.default);
    }

    var filterIdToCollection = new FilterIdToCollection();

    if (!filterIdToCollection[evt.target.id]) {
      return;
    }

    onButtonClick(evt);
    RenderGallery.update(filterIdToCollection[evt.target.id]);
  };

  window.GalleryController = {
    onLoad: function (images) {
      imagesFilter.classList.remove('img-filters--inactive');
      RenderGallery.add(images);
    },

    makeCollection: function (images) {
      GalleryCollection.default = images;

      GalleryCollection.sorted = getSortedImages(images);
    },

    addEventListener: function () {
      filtersForm.addEventListener('click', onFiltersFormClick);
    }
  };
})(window.Random, window.RenderGallery);
