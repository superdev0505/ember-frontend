/**
* Show Availability Route
*
* This is the parent route for show availability. The actual 'show' page is rendered as a subroute (index). Editing and other functions are rendered as separate sub-routes but inherit the same model from this route.
*
* @module Availabilities
* @class controller-app.main.availabilities.show.index
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  pageTitle: 'Teaching',
  backLinkToRoute: 'app.main.availabilities',

  canEdit: false,
  editInfo: false,
  editTimes: false,
  editPlace: false,

  teachers: Ember.computed('model.availabilityUsers.@each', function(){
    var joins = this.get('model.availabilityUsers');
    var teacherJoins = joins.filter(function(x){
      return x.get('teacher') && x.get('aasmState') !== 'cancelled';
    });
    return teacherJoins.map(function(x){ return x.get('user'); })
  }),
  students: Ember.computed('model.availabilityUsers.@each', function(){
    var joins = this.get('model.availabilityUsers');
    var studentJoins = joins.filter(function(x){
      return !x.get('teacher') && x.get('aasmState') !== 'cancelled';
    });
    return studentJoins.map(function(x){ return x.get('user'); })
  }),
  attended: Ember.computed('model.availabilityUsers.@each', function(){
    var joins = this.get('model.availabilityUsers');
    var attendedJoins = joins.filter(function(x){
      return !x.get('teacher') && x.get('aasmState') === 'attended';
    });
    return attendedJoins.map(function(x){ return x.get('user'); })
  })



});
