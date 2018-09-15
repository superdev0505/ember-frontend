/**
* New Availability Preview Controller
*
* Preview a new teaching session.
* The create session button is on this page.
*
* @module Availabilities
* @class controller-app.main.availabilities.new.preview
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    /**
    * Save the session created in the 'new' parent route.
    *
    * @method postSession
    */
    postSession: function(){
      var _this = this;

      this.get('model').save().then(function(){
        _this.get('model.availabilityUsers').forEach(function(x){
          x.save();
        });
        _this.get('model.availabilityItems').forEach(function(x){
          // This saves the Website object first, then saves the AvailabilityItem object which points to that website
          // Using the then() function waits to get an ID for the website before trying to save the polymorphic pointer object
          x.get('item.content').save().then(function(){
            x.save();
          });
        });
        _this.transitionToRoute('app.main.availabilities/show', _this.get('model'));
      });
    }
  }
});
