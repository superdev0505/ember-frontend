/**
* Describe the Users module
*
* @module Users
*
*
*/

import Ember from 'ember';

export default Ember.Route.extend({


  actions: {
    // Open the navbar using CSS
    toggleNav: function(){
            Ember.$('body').toggleClass('navOpen');
        },

    // Close the navbar when the page transitions
    willTransition: function() {
      Ember.$('body').removeClass('navOpen');

        // console.log("TRANSITIONING")
        // console.log(transition)
        // console.log(this.get('currentPath'))

    }
  }
});
