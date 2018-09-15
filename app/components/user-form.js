import Ember from 'ember';

export default Ember.Component.extend({

  user: Ember.A(),

  actions: {
    saveUser: function(){
      this.get('user').save();
    }
  }
});
