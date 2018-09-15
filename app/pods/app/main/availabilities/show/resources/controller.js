import Ember from 'ember';

export default Ember.Controller.extend({

  showController: Ember.inject.controller("app/main/availabilities/show"),

  model: Ember.computed.reads('showController.model'),
  changeset: Ember.computed.reads('showController.changeset'),
  canEdit: Ember.computed.reads('showController.canEdit'),
  // teachers: Ember.computed.reads('showController.teachers'),
  // students: Ember.computed.reads('showController.students'),

  showAddResource: false,

  actions: {
    toggleAddResource: function(){
      this.set('showAddResource', !this.get('showAddResource'));
    },

    selectResourceType: function(rtype){
            Ember.$('.resource-type').addClass('hidden');
            Ember.$('.resource-type-' + rtype).removeClass('hidden');
            Ember.$('.' + rtype + "-search-field").focus();
        },

    saveWebsite: function(){
            var url = this.get('websiteUrl');
            var description = this.get('websiteDescription');
            var notes = this.get('websiteNotes');

            if(url.trim() === ""){
                alert("Please enter a website address e.g. www.google.com");
                return;
            }

            var website = this.store.createRecord('resource-website', {
                url: url,
                name: description,
                description: notes
            });
            var _this = this;
            website.save().then(function(ws){
                var link = _this.store.createRecord('availability-item', {
                    availability: _this.get('model'),
                    item: ws,
                    notes: notes
                });
                link.save();
                Ember.$('.resource-type').addClass('hidden');
        _this.set('showAddResource', false);
        _this.set('websiteUrl', null);
        _this.set('websiteDescription', null);
        _this.set('websiteNotes', null);
            });
        },

    deleteAvailabilityResource: function(link){
            if(confirm('Delete this teaching resource?')){
                link.destroyRecord();
            }
        },


    // Search the Kortext database for books matching the user's search
        searchKortext: function(){
            var str = this.get('bookSearchText');
            // Replace spaces with +
            str = str.replace(" ", "+");
            str = escape(str);
            console.log(str);
            var _this = this;
            _this.set('kortextResults', Ember.A());
            _this.set('doneKortextSearch', false);
            Ember.$('.kortext-loading').html("<div class='text-center'>Loading results...</div>");
            // Load the Kortext results page
            Ember.$.ajax({
                url: _this.get('apiUrl') + "/resource_textbooks/kortext_search?query=" + str,
                type: 'get',
                dataType: 'json',
                success: function(data){
                    console.log(data);
                    _this.set('kortextResults', Ember.A(data));
                    _this.set('doneKortextSearch', true);
                    Ember.$('.kortext-loading').html("");
                },
                beforeSend: function(xhr){
                    _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
                        xhr.setRequestHeader(headerName, headerValue);
                    });
                }
            });

        },

    selectTextbook: function(book){
            this.set('selectedTextbook', book);
            this.set('kortextResults', Ember.A());
            Ember.$('.selected-kortext-notes-field').focus();
        },

        saveTextbook: function(){
            // name: DS.attr('string'),
          // isbn: DS.attr('string'),
          // kortext_link: DS.attr('string'),
          // description: DS.attr('string'),

            var book = this.get('selectedTextbook');
            var _this = this;
            var resource = this.store.createRecord('resource-textbook', {
                name: book.name,
                kortextLink: book.link,
                imgLink: book.img
            });
            resource.save().then(function(r){
                var ar = _this.store.createRecord('availability-item', {
                    availability: _this.get('model'),
                    item: r,
                    notes: _this.get('textbookNotes')
                });
                ar.save();
                // Reset the form
                Ember.$('.resource-type').addClass('hidden');
                _this.set('kortextResults', Ember.A());
                _this.set('selectedTextbook', null);
                _this.set('doneKortextSearch', false);
                _this.set('bookSearchText', "");
            });
        },
  }

});
