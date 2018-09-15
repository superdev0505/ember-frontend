/**
* Browse and search received feedback
*
* @module Feedbacks
* @class controller-app.main.feedbacks.index
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  pageTitle: "Feedback",

  searchText: "",

  /**
  * Allow searching of feedback by:
  * * Name of person submitting
  * * Feedback fields
  *
  * @method doSearch
  */
  doSearch: Ember.observer('searchText', function(){
    var _this = this;
    this.store.query('feedback',{
      "filter[target_id]": this.get('session.data.authenticated.user_id'),
      "filter[query]": this.get('searchText')
    }).then(function(feedbacks){
      _this.set('model', feedbacks);
    })
  })

/// BELOW IS LEGACY CODE


  // sortedEntries: Ember.computed.sort('model', 'modelSorting'),
  // modelSorting: ["date:desc"],
  //
  // showTaught: true,
  // showAttended: true,
  // showReflections: false,
  //
  // startDate: null,
  // endDate: null,
  //
  // showDownloads: false,
    // selectAll: false,
  //
  // limit: 20,
  // offset: 0,
  //
  // loadEntries: function(){
  //   // this.store.query('logbook-entry', {
  //   //   "filter[user_id]": this.get('session.data.authenticated.user_id'),
  //   //   include: 'availability.user,availability.location,availability.feedbacks'
  //   // }).then(function(items){
  //   //   _this.get('model').pushObjects(items);
  //   // });
  //   Ember.$('.loadingSpinner').removeClass('hidden');
  //
  //   var _this = this;
  //   var etypes = [];
  //   if(this.get('showTaught')){ etypes.push('taught'); };
  //   if(this.get('showAttended')){ etypes.push('attended'); };
  //   if(this.get('showReflections')){ etypes.push('reflection'); };
  //   var filterStartDate = this.get('startDate');
  //   var filterEndDate = this.get('endDate');
  //   if(!this.get('showDates')){
  //     filterStartDate = null;
  //     filterEndDate = null;
  //   }
  //   this.store.query('logbook-entry',{
  //     "filter[user_id]": this.get('session.data.authenticated.user_id'),
  //     "filter[entry_type]": etypes,
  //     "filter[start_date]" : filterStartDate,
  //     "filter[end_date]" : filterEndDate,
  //     include: 'availability.user,availability.location,availability.feedbacks',
  //     "page[offset]": this.get('offset'),
  //     "page[limit]": this.get('limit'),
  //     sort: '-date'
  //   }).then(function(as){
  //     // _this.get('model').pushObjects(as);
  //     as.forEach(function(x){
  //       _this.get('model').pushObject(x);
  //     });
  //     _this.set('offset', _this.get('offset') + _this.get('limit'));
  //     _this.set('loadedOnce', true);
  //     Ember.$('.loadingSpinner').addClass('hidden');
  //   });
  // },
  // refreshEntries: function(){
  //   this.set('model', Ember.A());
  //   this.set('offset', 0);
  //   this.loadEntries();
  // }.observes('startDate', 'endDate'),
  //
  // actions: {
  //   loadMore: function(){
  //     this.loadEntries();
  //   },
  //
  //   toggleShowTaught: function(){
  //     this.set('showTaught', !this.get('showTaught'));
  //     this.refreshEntries();
  //   },
  //   toggleShowAttended: function(){
  //     this.set('showAttended', !this.get('showAttended'));
  //     this.refreshEntries();
  //   },
  //   toggleShowReflections: function(){
  //     this.set('showReflections', !this.get('showReflections'));
  //     this.refreshEntries();
  //   },
  //
  //   toggleShowDates: function(){
  //     this.set('showDates', !this.get('showDates'));
  //     // If turning off the filter, refresh the list
  //     this.refreshEntries();
  //   },
  //
  //   toggleShowDownloads: function(){
  //     this.set('showDownloads', !this.get('showDownloads'));
  //   },
  //
  //   toggleIncludeInReport: function(entry){
  //     entry.set('includeInReport', !entry.get('includeInReport'));
    // 		return false;
  //   },
  //   selectAllAvailabilities: function(){
    // 		this.set('selectAll', true);
    // 		this.get('model').forEach(function(a){
    // 			a.set('includeInReport', true);
    // 		});
    // 	},
    // 	deselectAllAvailabilities: function(){
    // 		this.set('selectAll', false);
    // 		this.get('model').forEach(function(a){
    // 			a.set('includeInReport', false);
    // 		});
    // 	},
  //
  //   requestFeedbackDownload: function(){
  //
    // 		var _this = this;
    // 		var logbookEntryIds = this.get('model').filter(function(a){
    // 			return a.get('includeInReport');
    // 		}).map(function(a){
    // 			return a.get('id');
    // 		});
  //
    // 		var allLogbookEntryIds = this.get('model').map(function(a){return a.get('id');})
  //
    // 		Ember.$('.requestFeedbackButton').attr('disabled', 'disabled');
    // 		Ember.$('.requestFeedbackButton').html("Generating report...");
    // 		Ember.$('.loadingSpinner').removeClass('hidden');
  //
    // 		Ember.$.ajax({
    // 			url: _this.get('apiUrl') + "/feedbacks/download_report",
    // 			type: 'post',
    // 			data: {
    // 				logbook_entry_ids: logbookEntryIds,
    // 				all_logbook_entry_ids: allLogbookEntryIds,
    // 				select_all: this.get('selectAll')
    // 			},
    // 			success: function(response){
    // 				alert(response);
    // 				Ember.$('.requestFeedbackButton').removeAttr('disabled');
    // 				Ember.$('.requestFeedbackButton').html("Email me my feedback");
    // 				Ember.$('.loadingSpinner').addClass('hidden');
    // 			},
    // 			beforeSend: function(xhr){
    // 				_this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
    // 					xhr.setRequestHeader(headerName, headerValue);
    // 				});
    // 			}
    // 		});
  //
    // 	}
  // }
});
