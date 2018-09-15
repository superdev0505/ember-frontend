import Ember from 'ember';
/**
* The Availabilities module is the core module for creating and editing availabilities.
* It includes setting times and descriptions.
*
* It does not include signing up/inviting people, resources, feedback etc. which are covered in other modules.
*
* @module Availabilities
* @main Availabilities
* @class model-availability
*/
import Alertable from './alertable';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Alertable.extend({
  startTime: attr(),
  endTime: attr(),
  maxStudents: attr(),
  info: attr(),
  locationInfo: attr(),
  aasmState: attr(),
  isPrivate: attr(),
  isPublic: Ember.computed('isPrivate', function(){ return !this.get('isPrivate'); }),
  completedNotes: attr(),
  createdAt: attr({readOnly: true}),
  updatedAt: attr({readOnly: true}),

  user: belongsTo('user'),
  location: belongsTo('location'),

  availabilityUsers: hasMany('availability-user'),
  users: hasMany('user'),
  messages: hasMany('message'),
  jobTitles: hasMany('job-title'),
  // availabilityMessages: hasMany('availability-message'),

  studentCount: Ember.computed('availabilityUsers', function(){
    return this.get('availabilityUsers').filter(function(x){
      return !x.get('teacher') && (x.get('aasmState') === 'confirmed' || x.get('aasmState') === 'interested');
    }).get('length');
  }),

  inviteCount: Ember.computed('availabilityUsers', function(){
    return this.get('availabilityUsers').filter(function(x){
      return !x.get('teacher') && (x.get('aasmState') === 'invited');
    }).get('length');
  }),

  feedbackRequests: hasMany('feedback-request'),
  feedbacks: hasMany('feedback'),

  availabilityItems: hasMany('availability-item', {polymorphic: true}),

  // Calculate the session length in minutes
  duration: Ember.computed('startTime', 'endTime', function(){
    return (this.get('endTime') - this.get('startTime'))/60000;
  })

  // teacherJoins: function(){
  //   return this.get('availabilityUsers').then(function(joins){
  //     return joins.filter(function(x){
  //       return x.get('teacher');
  //     })
  //   });
  // }.property('availabilityUsers'),
  //
  // teachers: function(){
  //   var users = Ember.A();
  //   this.get('availabilityUsers').then(function(joins){
  //     // debugger
  //     joins.filter(function(x){
  //       return x.get('teacher');
  //     }).forEach(function(x){
  //       // return x.get('user');
  //       users.pushObject(x.get('user'));
  //     });
  //     return users;
  //   })
  //   // debugger
  //   // return users
  //   // return this.get('teacherJoins').then(function(joins){
  //   //   return joins.map(function(x){
  //   //     return x.get('user');
  //   //   })
  //   // })
  // }.property('availabilityUsers')

  // teachers: function(){
  //   var users = this.get('availabilityUsers').then(function(joins){
  //     var teacherJoins = joins.filter(function(x){
  //       return x.get('teacher');
  //     })
  //     var ts = teacherJoins.map(function(x){
  //       return x.get('user');
  //     });
  //
  //     return ts
  //   });
  //
  //   return users;
  // }.property('availabilityUsers')

});
