import Ember from 'ember';

export default Ember.Route.extend({

  offset: 0,

  renderTemplate: function() {
    this.render();
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    }),
    this.render('components/bottom-navbar',{
      outlet: 'footer',
      into: 'app.main'
    });
    this.render('buttons/backbutton',{
      outlet: 'secondaryButton',
      into: 'app.main'
    })
  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('pageTitle', 'Logbook')
  },

  model: function(){
    return this.store.query('logbook-entry',{
      "filter[user_id]": this.get('session.data.authenticated.user_id'),
      "page[offset]": this.get('offset')
    });
  }

});
