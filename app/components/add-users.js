import Ember from 'ember';

export default Ember.Component.extend({
  // Adds users to a given array
  // Can handle join models e.g. availability-users

  // A model is passed. This is assumed to have a users property,
  // unless isJoin is true - then it has an association called 'joinModel'
  model: null,
  isJoin: false,
  joinModel: null, // e.g. 'availability-user'
  joinOpts: {}, // Options to be passed to the created join models

  headerText: "Add Users",
  addButtonText: "Send Invites",
  modalName: 'inviteUserModal',

  // These users will be added to the model on save
  usersToAdd: Ember.A(),

  addUserSearchText: "",

  searchResults: Ember.A(),

  store: Ember.inject.service(),
  remodal: Ember.inject.service(),

  clearAddedUsers: Ember.on('init', function(){
    this.set('usersToAdd', Ember.A());
  }),

  searchUsers: Ember.on('init', Ember.observer('addUserSearchText', 'usersToAdd.[]', function(){
    // Exclude users already added
    var to_exclude = this.get('usersToAdd').map(function(x){ return x.get('id'); });
    if(this.get('isJoin')){
      var joins = this.get('model').get( Ember.String.camelize(this.get('joinModel')) + "s" )
      joins.forEach(function(x){
        to_exclude.pushObject(x.get('user.id'));
      })
    }else{
      this.get('model.users').forEach(function(x){
        to_exclude.pushObject(x.get('id'));
      })
    }

    // Do the search
    var us = this.get('store').query('user',{
      "filter[name_or_email]": this.get('addUserSearchText'),
      "page[limit]": 10,
      "filter[exclude]": to_exclude
    });
    this.set('searchResults', us);
  })),

  focusField: Ember.on('didInsertElement', function(){
    Ember.run.later(function(){
      Ember.$('.add-user-search-input').focus();
    }, 200);
  }),

  actions: {
    // Add a single user to the usersToAdd array
    addUser(user){
      if(!this.get('usersToAdd').includes(user)){
        this.get('usersToAdd').pushObject(user);
      }
    },

    // Remove a user from the usersToAdd array
    removeAddedUser(user){
      if(this.get('usersToAdd').includes(user)){
        this.get('usersToAdd').removeObject(user);
      };
    },

    // Add the usersToAdd array to the model's users property
    // If a join model is used, create the necessary joins
    addUsers(){
      var _this = this;
      if(this.get('isJoin')){
        var modelName = this.get('model._internalModel.modelName');
        // To update things properly, update an array
        // This can be passed in; by default it is the array of join models on the model
        if(this.get('joinArray')){
          var arr = this.get('joinArray');
        }else{
          var arr = this.get('model').get(this.get('joinModel').camelize() + "s")
        }
        this.get('usersToAdd').forEach(function(user){
          var opts = _this.get('joinOpts');
          opts['user'] = user;
          // opts[modelName] = _this.get('model');
          var j = _this.get('store').createRecord(_this.get('joinModel'), opts);
          // debugger
          j.save().then(function(){
            // Unclear why this sometimes needs _internalModel
            // We can figure out which to use using arr.isFulfilled
            // TODO: figure this out!
            if(arr.isFulfilled){
              arr.pushObject(j);
            }
            else{
              arr.pushObject(j._internalModel);
            }
          });
        })
      }else{
        this.get('model.users').pushObjects(this.get('usersToAdd'));
      }
      this.set('usersToAdd', Ember.A());
      this.set('addUserSearchText', "");
      this.get('remodal').close(this.get('modalName'));
    },

    cancelAddUsers(){
      this.set('usersToAdd', Ember.A());
      this.set('addUserSearchText', "");
      this.get('remodal').close(this.get('modalName'));
    }
  }

});
