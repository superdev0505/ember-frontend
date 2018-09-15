/**
* Browse teaching requests
*
* @module AvailabilityRequests
* @class route-app.main.availability-requests.index
*/
import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller, model){
    this._super(controller,model);
    controller.set('pageTitle', 'Teaching Requests')
  },
  renderTemplate: function() {
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

  model: function(){
    return this.store.query('availability-request',{
      'filter[for_user]': this.get('session.data.authenticated.user_id')
    });
  }
});
