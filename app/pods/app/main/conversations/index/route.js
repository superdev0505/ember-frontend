/**
* Lists conversations which a user is a member of.
* This does include those associated with availabilities.
*
* @module Messages
* @class route-app.main.conversations.index
*/
import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    // Return the current user's conversation_member objects
    // Include the conversation object
    // var user_id = this.get('session.data.authenticated.user_id');
    // return this.store.query('conversation-member', {
    //   "filter[user_id]": user_id,
    //   include: 'conversation.conversation-members.user,user'
    // })
    return Ember.A();
  },

  renderTemplate: function() {
    // Render the page
    this.render();
    // Render buttons
    this.render("buttons/backbutton", {
        outlet: "secondaryButton",
        into: "app.main"
    });
    this.render("buttons/newgroup", {
        outlet: "primaryButton",
        into: "app.main"
    });
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    });
    this.render("components/bottom-navbar",{
      outlet: 'footer',
      into: "app.main"
    });
  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('filteredModel', model);
    controller.set('offset', 0);
    controller.set('loadedOnce', false);
    controller.loadMessages();
  }

});
