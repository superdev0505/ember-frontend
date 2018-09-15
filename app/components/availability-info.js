import Ember from 'ember';

export default Ember.Component.extend({

  canEdit: false,

  editInfo: false,

  originalInfo: null,
  getOriginalInfo: Ember.on('init', function(){
    this.set('originalInfo', this.get('availability.info'));
  }),

  actions: {
    toggleEditMode(){
      this.set('editInfo', !this.get('editInfo'));
    },
    saveInfo(){
      // this.get('availability').save();
      this.set('editInfo', false);
    },
    cancelInfo(){
      this.get('availability').set('info', this.get('originalInfo'));
      this.set('editInfo', false);
    }
  }
});
