import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'div',
  classNames: ['loadingSpinnerWrapper'],

  // By default, don't show this unless the 'hidden' tag is removed
  // Allow it to be shown by default
  startHidden: true
});
