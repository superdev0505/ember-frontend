/**
* Show Availability Route (index)
*
* Show details about the session. Rendered as a sub-route of show.
*
* @module Availabilities
* @class controller-app.main.availabilities.show.index
*/
import Ember from 'ember';

export default Ember.Route.extend({
  // afterModel: function(){
  //   this.set('model', this.modelFor('app.main.availabilities/show'))
  // }

  renderTemplate: function() {
    this.render();
    this.render('components/bottom-navbar',{
      outlet: 'footer',
      into: 'app.main'
    });
  }

});
