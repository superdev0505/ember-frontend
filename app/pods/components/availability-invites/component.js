/**
* This is a complex component which handles inviting users to a teaching session.
*
* It shows a list of invited/attending users and allows inviting of new ones if admin=true.
*
* @module AvailabilitiesSignUp
* @class component-availability-invites
*/
import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  classNames: ['availability-invites'],

  // Shows a list of invited/attending users and allows inviting of new ones if admin=true

  // The availability you're adding users to
  // availability: Ember.Object(),

  // Determines if you can add/edit people
  admin: false,

  // Query users
  searchQuery: "",

  // List of users already added
  addedUsers: Ember.A(),
  // List of users who can be added
  usersList: Ember.A(),

  getAddedUsers: Ember.on('init', function(){
    // TODO: why is this called lots of times?
    var _this = this;
    this.get('availability.availabilityUsers').then(function(joins){
      _this.set('addedUsers', joins.map(function(x){ return x.get('user') }));
    })
  }).observes('availability.availabilityUsers.[]'),

  getUsersList: Ember.observer('addedUsers.[]', 'searchQuery', function(){
    var _this = this;
    this.get('store').query('user', {
      'page[limit]': 50,
      'filter[exclude]': this.get('addedUsers').map(function(x){ return x.get('id') }),
      'filter[name_or_email]': this.get('searchQuery')
    }).then(function(users){
      _this.set('usersList', users);
    })
  }),

  // Adjust the width of the list to allow appropriate scrolling
  resizeAddedUsersList: Ember.observer('addedUsers.[]', function(){
    var w = 0;
    var els = Ember.$('.added-user');
    w = (1 + els.length) * 57

    Ember.$('.availability-invites-added-users').css('width', w);
  }),

  actions: {
    addUser: function(user){
      this.get('store').createRecord('availability-user', {
        availability: this.get('availability'),
        user: user,
        inviter: user,
        teacher: false,
        admin: false,
        aasmState: 'new'
      });

      // this.get('usersList').removeObject(user);
      // this.get('addedUsers').pushObject(user);
    },

    removeUser: function(join){
      this.get('addedUsers').removeObject(join.get('user'));
      join.destroy();
    },

    sendInvites: function(){
      if(this.get('availability.isNew')){
        // Do nothing - invites created on save
      }else{
        this.get('availability.availabilityUsers').forEach(function(x){
          if(x.get('aasmState') == 'new'){
            x.save();
          }
        })
      }
    }
  }

});
