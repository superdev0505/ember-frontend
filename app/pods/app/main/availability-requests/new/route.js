/**
* Create a new teaching request
*
* @module AvailabilityRequests
* @class route-app.main.availability-requests-new
*/
import Ember from 'ember';

export default Ember.Route.extend({

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
  }
  
});
