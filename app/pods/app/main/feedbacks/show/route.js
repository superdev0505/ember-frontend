/**
* View submitted feedback
*
* @module Feedbacks
* @class route app.main.feedbacks.show
*/
import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params){
    return this.store.find('feedback', params.feedback_id);
  },

  renderTemplate: function() {
    // Render the page
    this.render();
    this.render("buttons/backbutton",{
      outlet: 'secondaryButton',
      into: "app.main"
    });
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    });
    this.render('components/bottom-navbar',{
      outlet: 'footer',
      into: 'app.main'
    })
  }

});
