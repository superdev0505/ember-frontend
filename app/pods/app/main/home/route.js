/**
* Wrapper route for the four 'home' pages (teach, learn, log, more)
*
* @module Home
* @class route-app.main.home
*/
import Ember from 'ember';

export default Ember.Route.extend({

  // All home pages have an alerts link in the top right
  renderTemplate: function() {
    this.render();
    if(this.get('enabledModules').includes('Alerts')){
      this.render("buttons/alertslink",{
        outlet: 'primaryButton',
        into: "app.main"
      });
    }
  },

  actions: {
    didTransition: function(){
      this._super(...arguments);
      Ember.$('.containerBody').scrollTop(0);
    }
  }

});
