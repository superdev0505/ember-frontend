/**
* Home "Teach" page
*
* Shows options for creating sessions and shows most recent teaching requests
*
* @module Home
* @class route-app.main.home.teach
*/
import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function() {
    this.render();
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    });
    this.render('components/bottom-navbar',{
      outlet: 'footer',
      into: 'app.main'
    });
  }


});
