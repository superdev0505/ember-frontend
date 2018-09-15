/**
* LEGACY - view for proposed sessions
*
* @module Unclassified
*/
import Ember from 'ember';

export default Ember.Route.extend({

  model(params){
    return this.store.findRecord('availability', params.availability_id);
  },

  afterModel(availability, transition){
    if(availability.get('aasmState') !== 'proposed'){
      this.transitionTo('app.main.availabilities/' + availability.get('aasmState'), availability);
    }
  }

});
