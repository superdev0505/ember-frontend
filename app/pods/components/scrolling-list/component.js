/**
* Scrolling list component - lazy loads content when user scrolls down.
*
* The route's model is passed as a parameter. On scrolling it is re-loaded with the page[offset] parameter increased.
*
* @module AppCore
*/
import Ember from 'ember';

export default Ember.Component.extend({

  model: Ember.A(),

  offset: 0,
  perPage: 10,
  store: Ember.inject.service(),

  /**
  * Load more objects into model and increase the offset variable.
  *
  * It is confusing because it uses this, to mean the current component, then uses this again within the el.scroll function to refer to the element being scrolled.
  *
  * @method loadObjects
  */
  loadObjects: function(){
    var _this = this;
    Ember.run(function(){
      _this.set('offset', _this.get('offset') + _this.get('perPage'));

      // Rerun the query used to define the model with the new offset
      var mType = _this.get('model.type.modelName');
      var mQuery = _this.get('model.query');
      mQuery["page[offset]"] = _this.get('offset');

      _this.get('store').query(mType, mQuery).then(function(results){
        results.forEach(function(x){
          _this.get('model').pushObject(x._internalModel);
        })
      })
    });

  },

  /**
  * This method calls the loadObjects method when the user scrolls to the bottom of the div.
  *
  * It is confusing because it uses this, to mean the current component, then uses this again within the el.scroll function to refer to the element being scrolled.
  *
  * @method setupScroll
  */
  setupScroll: Ember.on('didInsertElement', function(){
    var _this = this;
    var el = $("#" + this.elementId + " .scrolling-list");
    el.scroll( function(){
      if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){
        _this.loadObjects();
      }
    });
  })
});
