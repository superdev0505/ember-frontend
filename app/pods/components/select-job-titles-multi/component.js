import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    /**
    * Respond to selection of locations
    * Uses ember-power-select
    *
    * @method setUserLocations
    */
    setJobTitles: function(jts){
      this.set('value', jts);
    }
  }
});
