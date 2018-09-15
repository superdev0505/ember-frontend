/**
* Availabilities index controller. Handles listing and searching of teaching sessions.
*
* @module Availabilities
* @class controller-app.main.availabilities.index
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  pageTitle: "Teaching",

  sortedModels: Ember.computed.sort('model', 'modelSorting'),
  modelSorting: ["startTime:desc"],

  searchLocations: Ember.A(), //Default set in route to user's profile settings
  loadedOnce: false,
  showFilters: false,

  filterStartDate: null,
  filterEndDate: null,
  filterType: 'all',
  filterAttended: true,
  filterSuggested: true,

  offset: 0,
  limit: 10,

  searchText: "",

  /**
  * Load more availabilities, using offset and limit parameters.
  *
  * @method loadAvailabilities
  */
  loadAvailabilities: function(){
    var _this = this;
    this.store.query('availability',{
      "filter[location_id]": this.get('searchLocations').map(function(x){ return x.get('id'); }),
      "filter[startDate]": this.get('filterStartDate'),
      "filter[endDate]": this.get('filterEndDate'),
      "filter[filterType]": this.get('filterType'),
      "filter[query]": this.get('searchText'),
      include: "availability-users.user,location",
      "page[offset]": this.get('offset'),
      "page[limit]": this.get('limit'),
      sort: '-start_time'
    }).then(function(as){
      // _this.get('model').pushObjects(as);
      as.forEach(function(x){
        _this.get('model').pushObject(x);
      });
      _this.set('offset', _this.get('offset') + _this.get('limit'));
      _this.set('loadedOnce', true);
    });
  },

  /**
  * When filters change, reset offset and model and load again
  *
  * @method filterAvailabilities
  */
  filterAvailabilities: Ember.observer(
    'searchLocations.[]',
    'filterStartDate',
    'filterEndDate',
    'filterType',
    'searchText',
    function(){
      this.set('loadedOnce', false);
      this.set('model', Ember.A());
      this.set('offset', 0);
      this.loadAvailabilities();
    }
  ),

  setupScroll: Ember.on('init', function(){
    var _this = this;
    Ember.run.later(function(){
      var el = $(".availability-scrolling-list-wrapper .scrolling-list");
      el.scroll( function(){
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){
          _this.loadAvailabilities();
        }
      });
    }, 500);

  }),

  remodal: Ember.inject.service(),

  actions: {
    toggleFilters: function(){
      this.set('showFilters', !this.get('showFilters'));
    },

    loadMore(){
      this.loadAvailabilities();
    },

    closeAvailabilityFilters: function(){
      this.get('remodal').close('availability-filters-modal');
    }
  }
});
