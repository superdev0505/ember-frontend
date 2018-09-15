import Ember from 'ember';
/**
* This module handles teaching requests.
*
* Functions:
* * A user can post a teaching request
* * Other users can up-vote that request
* * Teachers can respond to a request by creating a teaching session
*
* @module AvailabilityRequests
* @main AvailabilityRequests
* @class model-availability-request
*/
import DS from 'ember-data';
import Alertable from './alertable';

export default Alertable.extend({
  user: DS.belongsTo('user', {async: true}),
  location: DS.belongsTo('location', {async: true}),
  info: DS.attr('string'),
  // targetExperienceMin: DS.attr('number'),
  // targetExperienceMax: DS.attr('number'),

  availabilityRequestVotes: DS.hasMany('availability-request-vote'),
  availabilityRequestVotesCount: DS.attr('number', {readOnly: true}),

  // comments: DS.hasMany('comment', {async: true}),

  // Pick out the last activity object
    lastObjectActivity: Ember.computed('objectActivities.[]', function(){
        return this.get('objectActivities').get('lastObject');
    }),

  // Return availabilities created from this request
  availabilities: DS.hasMany('availability', {async: true}),
  savedAvailabilities: Ember.computed('availabilities.@each', function(){
    return this.get('availabilities').filter(function(x){
      return x.get('id') !== null;
    });
  }),

  // To set up new availabilities we need _unbound_ versions of several variables:
  // unboundInfo: function(){ return this.get('info'); }.property()
});
