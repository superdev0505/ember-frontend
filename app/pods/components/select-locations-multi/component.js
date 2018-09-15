import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['location-select-multi'],

  actions: {
    /**
    * Respond to selection of locations
    * Uses ember-power-select
    *
    * @method setUserLocations
    */
    setLocations: function(locations){
      this.set('value', locations);
    }
  }

});
