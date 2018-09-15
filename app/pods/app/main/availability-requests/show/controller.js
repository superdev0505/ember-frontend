/**
* Show a teaching request
*
* @module AvailabilityRequests
* @class controller-app.main.availability-requests.show
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    upvote: function(){
      this.set('canVote', false);
      this.store.createRecord('availability-request-vote', {
        availabilityRequest: this.get('model'),
        user: this.get('session.currentUser')
      }).save().then(function(vote){
        // Everything should auto-update...
      });
    }
  }
});
