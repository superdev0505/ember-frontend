/**
* New Availability Controller.
*
* All actions are defined in the sub-routes.
*
* @module Availabilities
* @class controller-app.main.availabilities.new
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  pageTitle: "New Teaching",


  // setDefaults: function(){
  //   this.set('teachingMode', null); // Can be adhoc or planner
  //
  //   this.set('sessionDescription', null);
  //   this.set('location', null);
  //   this.set('locationInfo', null);
  //
  //   this.set('maxStudents', 6);
  //   this.set('isPrivate', true);
  //
  //   // How long you are available in minutes
  //   this.set('availableDuration', 60);
  //
  //   // Set the start time as now (rounded)
  //   var t = new Date();
  //   var m = (((t.getMinutes() + 7.5)/15 | 0) * 15) % 60;
  // 	var h = ((((t.getMinutes()/105) + .5) | 0) + t.getHours()) % 24;
  // 	t.setHours(h);
  // 	t.setMinutes(m);
  //   this.set('startTime',t);
  //
  //   // Calculate the end time from the start time and duration
  //   this.set('endTime', new Date(t.getTime() + this.get('availableDuration')*60000));
  //
  //
  //   // For planning sessions, use dates instead of times
  //   this.set('startDate', new Date());
  //   this.set('endDate', this.get('startDate').getTime() + 7*24*60*60000);
  //
  // }.on('init'),
  //
  //
  //
  // locations: Ember.A(), // All locations for the select dropdown
  // // Load all locations on init
  // getLocations: function(){
  //   this.set('locations', this.store.findAll('location'));
  // }.on('init'),
  //
  // actions: {
  //   setTeachingMode: function(mode){
  //     this.set('teachingMode', mode);
  //   },
  //
  //   setPrivate: function(val){
  //     this.set('isPrivate', val);
  //   },
  //
  //   saveSession(){
  //     // TODO: validations
  //     // Desired validations:
  //     //  Must be a location
  //     //  Start time < end time
  //     if(!this.get('location')){
  //       alert('Please select which hospital you are teaching in');
  //       return false;
  //     }
  //     if(this.get('startTime') > this.get('endTime')){
  //       alert("The start time of the session cannot be after the end time!");
  //       return false;
  //     }
  //     if(this.get('startDate') > this.get('endDate')){
  //       alert("The start date cannot be after the end date!");
  //       return false;
  //     }
  //
  //     var _this = this;
  //     if(this.get('teachingMode') == 'adhoc'){
  //       var st = this.get('startTime');
  //       var et = this.get('endTime');
  //       var aasm = 'confirmed';
  //     }else{
  //       var st = this.get('startDate');
  //       var et = this.get('endDate');
  //       var aasm = 'proposed';
  //     }
  //     this.store.createRecord('availability',{
  //       user: this.get('session.currentUser'),
  //       startTime: st,
  //       endTime: et,
  //       info: this.get('sessionDescription'),
  //       aasmState: aasm,
  //       location: this.get('location'),
  //       locationInfo: this.get('locationInfo'),
  //       maxStudents: this.get('maxStudents'),
  //       isPrivate: this.get('isPrivate')
  //     }).save().then(function(availability){
  //       _this.store.createRecord('availability-user',{
  //         availability: availability,
  //         user: _this.get('session.currentUser'),
  //         teacher: true,
  //         admin: true,
  //         aasmState: 'confirmed'
  //       }).save().then(function(){
  //         _this.setDefaults();
  //         _this.transitionToRoute('app.main.availabilities/show', availability);
  //       })
  //     })
  //   }
  // }
});
