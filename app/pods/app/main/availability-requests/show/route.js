/**
* Show a teaching request
*
* @module AvailabilityRequests
* @class route-app.main.availability-requests.show
*/
import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params){
    return this.store.findRecord('availability-request', params.availability_request_id);
  },

  renderTemplate: function() {
    // Render the page
    this.render();
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    });
    this.render("buttons/backbutton",{
      outlet: 'secondaryButton',
      into: "app.main"
    });
    this.render("components/bottom-navbar",{
      outlet: 'footer',
      into: 'app.main'
    });
  },

  /**
  * Functions in setupController:
  * * Set the page title
  * * Check if a user can upvote this (they can unless they have already voted) and set the canVote variable
  *
  * @method setupController
  */
  setupController: function(controller,model){
    this._super(controller,model);
    controller.set('pageTitle', 'Teaching Request');

    // Figure out if the current user can vote for this
    // They can vote if they haven't already
    this.store.query('availability-request-vote',{
      "filter[user_id]": this.get('session.data.authenticated.user_id'),
      "filter[availability_request_id]": model.get('id')
    }).then(function(votes){
      if(votes.get('length') > 0){
        controller.set('canVote', false);
      }else{
        controller.set('canVote', true);
      }
    });
  }
});
