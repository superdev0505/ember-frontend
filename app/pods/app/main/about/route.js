/**
* Help page
* Links to FAQs and walkthrough pages
*
* @module Help
* @class route-app.main.about
*/
import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function() {
    // Render the page
    this.render();
    this.render("buttons/backbutton",{
      outlet: 'secondaryButton',
      into: "app.main"
    })
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    })
  }

});
