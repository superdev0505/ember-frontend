/**
* Browse teaching requests
*
* @module AvailabilityRequests
* @class controller-app.main.availability-requests.index
*/
import Ember from 'ember';

export default Ember.Controller.extend({
  searchText: '',

  searchRequests: Ember.observer('searchText', function(){
    var q = "%" + this.get('searchText') + "%";
    var _this = this;
    _this.store.query('availability-request',{
      'filter[for_user]': _this.get('session.data.authenticated.user_id'),
      'filter[query]': q
    }).then(function(requests){
      _this.set('model', requests);
    });
  })
});
