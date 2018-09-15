/**
* Toggle whether a session is private or public
*
* @module AvailabilitiesSignUp
* @class component-select-private
*/
import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['select-private'],

  actions: {
    togglePrivate: function(){
      this.get('model').set('isPrivate', !this.get('model.isPrivate'));
    }
  }
});
