/**
* Home page
*
* @module Home
* @class route-app.main.home.learn
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
