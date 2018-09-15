import Ember from 'ember';

export default Ember.Component.extend({

  editTimes: false,
  editPlace: false,
  store: Ember.inject.service(),

  locations: Ember.A(),
  loadLocations: Ember.on('init', function(){
    var _this = this;
    this.get('store').findAll('location').then(function(locs){
      _this.set('locations', locs);
    });
  }),

  actions: {
    toggleEditTimes(){
      this.set('editTimes', !this.get('editTimes'));
    },
    saveTimes(){
      // this.get('availability').save();
      this.set('editTimes', false);
    },

    toggleEditPlace(){
      this.set('editPlace', !this.get('editPlace'));
    },
    savePlace(){
      // this.get('availability').save();
      this.set('editPlace', false);
    }
  }
});
