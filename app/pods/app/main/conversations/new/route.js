/**
* Create a new conversation. Should be able to set the name and invite people to it in the creation process.
*
* @module Messages
* @class route-app.main.conversations.new
*/
import Ember from 'ember';

export default Ember.Route.extend({


  contacts: Ember.A(),

  // Want to return all users in the current user's hospitals
  setupController: function(controller, model){
    this._super(controller, model);

    var _this = this;
    this.store.query('user-location', {
      "filter[user_id]": this.get('session.data.authenticated.user_id'),
      include: 'location'
    }).then(function(currentUserLocations){

      var locs = currentUserLocations.map(function(x){ return x.get('location'); });
      _this.store.query('user-location', {
        "filter[location_id]": locs.map(function(x){ return x.get('id'); }),
        include: 'user.job-title,user.user-locations.location,location'
      }).then(function(uls){
        var users = uls.map(function(x){
          return x.get('user');
        });
        users = Ember.A(users);
        // Make the list unique
        users = users.uniqBy('id');
        users = users.sortBy('name');
        controller.set('contacts', users);
        controller.set('filteredContacts', users);
        Ember.$('.loadingSpinner').addClass('hidden');
      });
    });
  },

  model: function(){
    // return this.store.createRecord('conversation', {
    //   'user': this.get('session.currentUser')
    // });
  },

  renderTemplate: function() {
    // Render the page
    this.render();
    // Render buttons
    this.render("buttons/backbutton", {
        outlet: "secondaryButton",
        into: "app.main"
    });
    this.render("pagetitle", {
        outlet: "pageTitle",
        into: "app.main"
    });

  }

});
