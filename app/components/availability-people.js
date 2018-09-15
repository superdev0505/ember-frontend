import Ember from 'ember';

export default Ember.Component.extend({
  canEditPrivate: false,
  canAdd: false,
  remodal: Ember.inject.service(),

  actions: {
    showAddUsersModal: function(){
      this.get('remodal').open('inviteUserModal');
    }
  }

});
