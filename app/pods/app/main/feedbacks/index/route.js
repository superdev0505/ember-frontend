/**
* Browse and search received feedback
*
* @module Feedbacks
* @class route-app.main.feedbacks.index
*/
import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    return this.store.query('feedback',{
      "filter[target_id]": this.get('session.data.authenticated.user_id'),
      "filter[query]": this.get('searchText')
    })
  },

  // setupController: function(controller, model){
  //   this._super(controller, model);
  //
  //   controller.set('offset', 0);
  //   controller.set('loadedOnce', false);
  //   controller.loadEntries();
  //
  //
  //
  //   // // Get the current user's locations and set as a filter
  //   // this.store.query('logbook-entry', {
  //   //   "filter[user_id]": this.get('session.data.authenticated.user_id')
  //   //   // include: "location"
  //   // }).then(function(uls){
  //   //   controller.set('searchLocations', uls.map(function(x){ return x.get('location'); }));
  //   // });
  //   //
  //   // // Load all locations - used for filtering so need to be cached
  //   // this.store.findAll('location');
  // },

  renderTemplate: function() {
    // Render the page
    this.render();
    // this.render("buttons/newavailability",{
    //   outlet: 'primaryButton',
    //   into: "app.main"
    // })
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
  }

});
