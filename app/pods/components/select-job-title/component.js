import Ember from 'ember';

export default Ember.Component.extend({

  value: null,
  classNames: ['job-title-select'],

  actions: {
    selectJobTitle: function(jt){
      this.set('value', jt);
    }
  }

});
