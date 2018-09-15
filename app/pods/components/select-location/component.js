/**
* Change the session location. Uses ember-power-select.
*
* @module Availabilities
* @class component-select-duration
*/
import Ember from 'ember';

export default Ember.Component.extend({

  value: null,
  classNames: ['location-select'],

  actions: {
    selectLocation: function(location){
      this.set('value', location);
    }
  }
});
