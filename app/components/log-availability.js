import Ember from 'ember';

export default Ember.Component.extend({

  showFeedback: false,

  isByCurrentUser: Ember.computed('availability', function(){
    return this.get('availability.user.id').toString() === this.get('session.data.authenticated.user_id').toString();
  }),

  actions: {

    toggleFeedback: function(){
      this.set('showFeedback', !this.get('showFeedback'));
    }

  }

});
