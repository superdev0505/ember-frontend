import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    return this.store.query('notification-preference',{
      'user_id': this.get('session.data.authenticated.user_id')
    }).then(function(x){
      return x.get('firstObject');
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
  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('pageTitle', "Preferences");
  }
});
