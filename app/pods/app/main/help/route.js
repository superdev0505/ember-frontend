/**
* Help page. Displays option for about, FAQ, walkthrough
*
* @module Help
* @class route-app.main.help
*/
import Ember from 'ember';
import config from '../../../../config/environment';

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
  },

  setupController(controller, model){
    this._super(controller, model);
    controller.set('appVersion', config.APP.appVersion);
  }

});
