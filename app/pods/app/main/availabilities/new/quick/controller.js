/**
* New Availability Quick Controller
*
* Create a quick teaching session using default options for 'teach now'
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
        _this.transitionToRoute('app.main.availabilities/show', _this.get('model'));
      });
    }

  }
});
