/**
* Alerts page
* Show recent alerts
*
* @module Alerts
* @class route-app.main.alerts.index
*/
import Ember from 'ember';
import config from '../../../../../config/environment';

export default Ember.Route.extend({

  model: function(){
    return this.store.query('alert', {
      "filter[user_id]": this.get('session.data.authenticated.user_id'),
      "filter[unique_read_link]": true,
      "page[limit]": 50
    });
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
    this.render("buttons/alertconfiglink",{
      outlet: 'primaryButton',
      into: 'app.main'
    });
  },

  setupController: function(controller, model){
    this._super(controller, model);

    // Define all loaded alerts - this is observed for changes
    controller.set('allAlerts', this.store.peekAll('alert'));
  },

  actions: {
    readAlert: function(link){
      // Decrement the alert counter
      this.get('unreadAlerts').set('all', this.get('unreadAlerts.all') - 1);
      // Open the URL
      this.transitionTo(link);
    }
  }


});
