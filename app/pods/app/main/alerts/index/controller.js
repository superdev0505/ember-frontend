/**
* Alerts page
* Show recent alerts
*
* @module Alerts
* @class controller-app.main.alerts.index
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  sortedModels: Ember.computed.sort('filteredModel', 'modelSorting'),
  modelSorting: ['updatedAt:desc'],

  pageTitle: 'Alerts',

  // We want to group the models by readLink and return only the most recent of them
  // If there are any unread ones, return the most recent unread, otherwise the most recent overall
  filteredModel: Ember.A(),
  filterModel: Ember.observer('model.@each.unread', 'model.[]', function(){
    console.log("FILTERING MODELS")

    var result = [];

    this.get('model').forEach(function(item) {
      var hasUrl = result.findBy('readLink', item.get('readLink'));

      // If there is aready an object, replace it if:
      //  the new object is newer OR
      //  the new object is older but is unread and the existing object is read
      if(hasUrl) {
        if(item.get('unread') && !hasUrl.get('unread')){
          result.removeObject(hasUrl);
          result.pushObject(item);
        }
        if(!(!item.get('unread') && hasUrl.get('unread')) & (item.get('createdAt') > hasUrl.get('createdAt'))){
          result.removeObject(hasUrl);
          result.pushObject(item);
        }

      }else{
        //  result.pushObject(Ember.Object.create({
        //     type: item.get('type'),
        //     contents: []
        //  }));
        result.pushObject(item);
      }

      // result.findBy('type', item.get('type')).get('contents').pushObject(item);
    });

    // Add a uniqBy step to ensure no duplicates
    this.set('filteredModel', result.uniqBy('id'));
  }),


  // Observe all alerts (as defined by peekAll) and update model if new ones appear
  checkForUpdates: Ember.observer('allAlerts.[]', function(){
    var counter = 0;
    var _this = this;
    this.get('allAlerts').forEach(function(x){
      if(!_this.get('model').includes(x)){
        _this.get('model').pushObject(x._internalModel);
      }

    })
  })

  // actions: {
  //   clickAlertLink: function(link){
  //     this.transitionTo(link);
  //   }
  // }

});
