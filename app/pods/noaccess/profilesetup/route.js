import Ember from 'ember';

export default Ember.Route.extend({

  // The model is the logged in user
  model: function(){
    return this.store.find('user', this.get('session.data.authenticated.user_id'))
  }
});
