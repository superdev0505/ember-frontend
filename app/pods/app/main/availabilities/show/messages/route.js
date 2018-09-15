/**
* Show messages associated with a teaching session.
*
* Very similar to the messages page but rendered within the availabilities/show page.
*
* @module Messages
* @class route-app.main.availabilities.show.messages
*/
import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function() {
    this.render();
    this.render('footers/messaging',{
      outlet: 'footer',
      into: 'app.main'
    });
  }

});
