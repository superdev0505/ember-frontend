/**
* LEGACY - view for confirmed sessions
*
* @module Unclassified
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  canEdit: false,
  editInfo: false,
  editTimes: false,
  editPlace: false,

  inviteOpts: {
    aasmState: 'invited',
    teacher: false,
    admin: false,
  },

  actions: {
    saveChanges(){
      this.get('changeset').save();
      this.set('editInfo', false);
    },
    cancelChanges(){
      if(confirm("Discard all changes?")){
        this.get('changeset').rollback();
        this.set('editInfo', false);
      }
    }
  }

});
