/**
* Lists conversations which a user is a member of.
* This does include those associated with availabilities.
*
* @module Messages
* @class route-app.main.conversations.index
*/
import Ember from 'ember';
import config from '../../../../../config/environment';

var messageSearchTimeout;
if(config.APP.environment == 'test'){
  var searchDelay = 0;
}
else{
  var searchDelay = 300;
}

export default Ember.Controller.extend({

  conversationSearchText: "",

  offset: 0,
  limit: 20,
  loadedOnce: false,

  appendResults: false,

  loadMessages: function(){
    var _this = this;
    var search = _this.get('conversationSearchText');
    var user_id = _this.get('session.data.authenticated.user_id');

    Ember.$('.loadingSpinner').removeClass('hidden');
    _this.store.query('conversation-member', {
      "filter[user_id]": user_id,
      include: 'conversation.conversation-members.user,user',
      "page[limit]": _this.get('limit'),
      "page[offset]": _this.get('offset'),
      sort: "-updated_at",
      "filter[search]": _this.get('conversationSearchText')
    }).then(function(groups){
      if(!_this.get('appendResults')){
        _this.set('model', Ember.A());
      }
      _this.set('appendResults', false);
      groups.forEach(function(g){
        _this.get('model').pushObject(g);
      });
      // Check uniqueness
      _this.set('model', _this.get('model').uniqBy('id'));
      _this.set('loadedOnce', true);
      _this.set('offset', _this.get('offset') + _this.get('limit'));
      Ember.$('.loadingSpinner').addClass('hidden');
    });

  },

  filterModel: Ember.observer('conversationSearchText', function(){
    var _this = this;
    clearTimeout(messageSearchTimeout)
    messageSearchTimeout = setTimeout(function(){
      Ember.debug("Calling filterModel")
      // _this.set('model', Ember.A());
      _this.set('offset', 0);
      _this.set('loadedOnce', false);
      _this.loadMessages();
    }, searchDelay);
    // var search = this.get('conversationSearchText');
    // var m = this.get('model').filter(function(x){
    //   if(search === ""){
    //     return true;
    //   }else{
    //     return x.get('displayName').toLowerCase().includes(search.toLowerCase());
    //   }
    // });
    // this.set('filteredModel', m);
  }),

  // filteredModel: Ember.A(),

  sortedModels: Ember.computed.sort('model', 'modelSorting'),
  modelSorting: ['updatedAt:desc'],
  pageTitle: "Messages",

  actions: {
    loadMore(){
      this.set('appendResults', true);
      this.loadMessages();
    }
  }

});
