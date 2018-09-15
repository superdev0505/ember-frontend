/**
* Show Availability Users Route
*
* Invite people to your availability and see who has signed up
*
* @module AvailabilitiesSignUp
* @class controller-app.main.availabilities.show.users
*/
import Ember from 'ember';

export default Ember.Controller.extend({
  showController: Ember.inject.controller("app/main/availabilities/show"),

  model: Ember.computed.reads('showController.model'),
  changeset: Ember.computed.reads('showController.changeset'),
  canEdit: Ember.computed.reads('showController.canEdit'),
  teachers: Ember.computed.reads('showController.teachers'),
  students: Ember.computed.reads('showController.students'),

  inviteOpts: {},

  setInviteOpts: Ember.on('init', function(){
    var state = 'invited';
    if(this.get('model.aasmState') == 'completed'){
      state = 'attended';
    }
    var opts = {
      aasmState: state,
      teacher: false,
      admin: false,
      inviter: this.get('session.currentUser'),
      availability: this.get('model')
    }
    this.set('inviteOpts', opts);
  }),



  actions: {
    savePeopleSettings(){
      this.get('changeset').save();
    },
    togglePrivate(){
      this.get('changeset').set('isPrivate', !this.get('changeset.isPrivate'));
    }
  }
});
