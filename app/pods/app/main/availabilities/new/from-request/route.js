/**
* This utility route is for creating a teaching session from a teaching request.
*
* * The default new availability model is already loaded in the 'new' parent route
* * Here we load the request, modify the model and redirect to the 'when' sibling route
*
* @module Availabilities
* @class route-app.main.availabilities.new.from-request
*/
import Ember from 'ember';

export default Ember.Route.extend({

  // model: function(params){
  //   // Set the start time as now (rounded)
  //   var t = new Date();
  //   var m = (((t.getMinutes() + 7.5)/15 | 0) * 15) % 60;
  // 	var h = ((((t.getMinutes()/105) + .5) | 0) + t.getHours()) % 24;
  // 	t.setHours(h);
  // 	t.setMinutes(m);
  //
  //   // Calculate the end time from the start time and duration
  //   var endTime = new Date(t.getTime() + 60*60000);
  //
  //
  //   var a = this.store.createRecord('availability',{
  //     startTime: t,
  //     endTime: endTime,
  //     maxStudents: 6,
  //     isPrivate: false,
  //     user: this.get('session.currentUser'),
  //     info: "TEST"
  //   });
  //
  //
  //
  //   // Additional bit - add in the availability request
  //   this.store.findRecord('availability-request', params.availability_request_id).then(function(x){
  //     a.set('info', x.get('info'));
  //   });
  //
  //   return a;
  // },

  // afterModel: function(model, transition){
  //   model.set('info', 'TEST')
  //   this.replaceWith('app.main.availabilities.new.when');
  // },

  setupController: function(controller, model) {
    var parentController = this.controllerFor('app.main.availabilities.new')

    parentController.get('model').set('info', "TEST");

    // this is necessary if you want, for example,
    // to display the name or a link to the default video
    // when a specific video is being displayed
    // parentController.set('model', model);

    // this.replaceWith('app.main.availabilities.new.when')
  },

  redirect: function(model, transition){
    model.set('info', "TEST")
    this.transitionTo('app.main.availabilities.new.when')
  }

});
