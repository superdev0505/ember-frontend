/**
* View and request feedback about a particular session
*
* @module Feedbacks
* @class route app.main.availabilities.show.feedback
*/
import Ember from 'ember';
import config from '../../../../../../config/environment';

export default Ember.Route.extend({

  renderTemplate: function() {
    this.render();
    this.render('components/bottom-navbar',{
      outlet: 'footer',
      into: 'app.main'
    });
  }

});
