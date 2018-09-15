/**
* Edit Availability Route.
*
* Rendered as a sub-route of the show route
*
* Edit basic details e.g. location, time, information about the teaching
*
* @module Availabilities
* @class controller-app.main.availabilities.show.edit
*/
import Ember from 'ember';

export default Ember.Controller.extend({
  showController: Ember.inject.controller("app/main/availabilities/show"),

  model: Ember.computed.reads('showController.model'),
  joinModel: Ember.computed.reads('showController.joinModel'),
  changeset: Ember.computed.reads('showController.changeset'),

  canEdit: true,

  // Don't allow unauthorised users to see this page
  checkUser: Ember.on('init', function(){
    if(!this.get('joinModel.admin')){
      this.transitionToRoute('app.main.availabilities/show.index', this.get('model'));
    }
  }),

  actions: {
    saveChanges(){
      this.get('changeset').save();
      this.set('editInfo', false);
    },
    cancelChanges(){
      if(confirm("Discard all changes?")){
        this.get('changeset').rollback();
        this.set('editInfo', false);
      }
    }
  }
});
