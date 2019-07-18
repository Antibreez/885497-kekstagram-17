'use strict';

(function () {
  var Style = {
    INACTIVE: 'img-filters--inactive',
    ACTIVE: 'img-filters__button--active'
  };

  var filter = document.querySelector('.img-filters');
  var buttons = filter.querySelectorAll('.img-filters__button');
  var filterForm = filter.querySelector('.img-filters__form');

  var setFilterState = function (button, selected) {
    button.classList[selected ? 'add' : 'remove'](Style.ACTIVE);
  };

  var selectFilter = function (id) {
    buttons.forEach(function (button) {
      setFilterState(button, button.id === 'filter-' + id);
    });
  };

  var activateFilter = function () {
    filter.classList.remove(Style.INACTIVE);
  };

  var FilterBar = function (onChange) {
    this.onChange = onChange;
    this._onFilterChange = this._onFilterChange.bind(this);
  };

  FilterBar.prototype.show = function () {
    this._addEventListeners();
    activateFilter();
    selectFilter('popular');
  };

  FilterBar.prototype.hide = function () {
    this._removeEventListeners();
  };

  FilterBar.prototype._addEventListeners = function () {
    filterForm.addEventListener('click', this._onFilterChange);
  };

  FilterBar.prototype._removeEventListeners = function () {
    filterForm.removeEventListener('click', this._onFilterChange);
  };

  FilterBar.prototype._onFilterChange = function (evt) {
    var id = evt.target.id.slice(7);
    selectFilter(id);
    this.onChange(id);
  };

  window.FilterBar = FilterBar;
})();
