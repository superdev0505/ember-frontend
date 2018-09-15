/**
* This shows a list of teaching requests on the home page for the current user.
*
* @module AvailabilityRequests
* @class component-home-teaching-requests
*/
import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  loadRequests: Ember.on('init', function(){
    var _this = this;
    this.get('store').query('user-location', {
      "filter[user_id]": this.get('session.data.authenticated.user_id'),
      include: 'location'
    }).then(function(joins){
      _this.get('store').query('availability-request', {
        "filter[location_id]": joins.map(function(x){ return x.get('location.id'); }),
        "page[limit]": 5,
        include: 'user.job-title,location'
      }).then(function(requests){
        // Update the component's model property.
        // Avoid doing this if the component is being destroyed e.g. if the page is transitioning before the request completes.
        if(!_this.get('isDestroyed')){
          _this.set('model', requests);
        }
      });
    });
  })

});
