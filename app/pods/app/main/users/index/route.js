/**
* Users Index route
* Allows searching and browsing of users
* Should be able to search and filter users
*
* @module Directory
* @class route-app.main.users.index
*
*
*/
import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function() {
    this.render();
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    });
    this.render("buttons/backbutton",{
      outlet: 'secondaryButton',
      into: "app.main"
    })
  }

});
