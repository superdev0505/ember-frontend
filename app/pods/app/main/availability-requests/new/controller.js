/**
* Create a new teaching request
*
* @module AvailabilityRequests
* @class controller-app.main.availability-requests-new
*/
import Ember from 'ember';

export default Ember.Controller.extend({
  pageTitle: "Request Teaching",

  requestText: "",
  location: null,

  setDefaultLocation: Ember.on('init', function(){
    this.set('location', this.get('session.currentUser.locations.firstObject'));
  }).observes('session.currentUser.locations.[]'),

  actions: {
    postRequest: function(){
      var text = this.get('requestText');
      if(location == null | location == undefined){
        alert("Please enter a location")
        return false;
      }
      if(text == "" || text == undefined){
        alert("Please enter a description of what you want to learn")
        return false;
      };
      var _this = this;
      Ember.$('.post-teaching-request-button').attr('disabled', 'disabled');
      this.store.createRecord('availability-request', {
        user: this.get('session.currentUser'),
        location: this.get('location'),
        info: text
      }).save().then(function(tr){
        Ember.$('.post-teaching-request-button').removeAttr('disabled');
        _this.set('requestText', "");
        _this.transitionToRoute('app.main.availability-requests.show', tr);
      });
    }
  }
});
