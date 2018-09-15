import Ember from 'ember';

export default Ember.Component.extend({

  remodal: Ember.inject.service(),

  actions: {
    openAvailabilityFiltersModal: function(){
      this.get('remodal').open('availability-filters-modal');
    }
  }
});
