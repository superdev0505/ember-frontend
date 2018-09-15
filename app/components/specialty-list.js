import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  modelType: 'specialty', // Exactly the same can be used for job titles
  joinModelType: 'user-specialty',

  isJoin: true, // Determines if the association requires a join model

  allSpecialties: Ember.A(),
  selectedJoins: Ember.A(),
  availableSpecialties: Ember.A(),
  selectedSpecialty: null,

  selectedSpecialties: Ember.computed('selectedJoins', function(){
    if(!this.get('isJoin')){return this.get('selectedJoins'); }
    var _this = this;
    return this.get('selectedJoins').map(function(x){
      return x.get(_this.get('modelType'));
    });
  }),
  sortedSpecialties: Ember.computed.sort('selectedSpecialties', 'modelSorting'),
  allSpecialtiesSorted: Ember.computed.sort('allSpecialties', 'modelSorting'),
  availableSpecialtiesSorted: Ember.computed.sort('availableSpecialties', 'modelSorting'),
    modelSorting: ['name'],

  canEdit: false,
  hideNewSpecialty: true,
  classNames: ['specialty-list'],
  select2Class: "specialty-list-select2",

  addText: 'Add a specialty', // Placeholder in the select2 box
  emptyText: 'No specialties selected.', // Displayed when the array is empty.

  loadAllSpecialties: Ember.on('init', function(){
    var _this = this;
    var store = this.get('store');
    var allSpecs = store.peekAll(this.get('modelType'));
    if(allSpecs.get('length') === 0){
      allSpecs = store.findAll(this.get('modelType'));
    }
    Ember.RSVP.all([allSpecs]).then(function(){
      _this.set('allSpecialties', allSpecs);
    });
  }),

  doAddSpecialty: Ember.observer('selectedSpecialty', function(){
    var s = this.get('selectedSpecialty');
    if(!s){return false;}
    var store = this.get('store');

    if(this.get('isJoin')){

      // Add a join model (user-location etc.) to the selectedJoins array
      var join;
      if(this.get('modelType') === 'specialty'){
        join = store.createRecord('user-specialty', {
          user: this.get('session.currentUser'),
          specialty: s
        });
      }else{
        if(this.get('modelType') === 'location'){
          join = store.createRecord('user-location', {
            user: this.get('session.currentUser'),
            location: s
          });
        }
      }

      join.save();
      this.get('selectedJoins').addObject(join);

    }else{
      this.get('selectedJoins').addObject(s);
    }


    //this.get('selectedSpecialties').addObject(s);
    this.set('selectedSpecialty', null);
  }),

  getAvailableSpecialties: Ember.observer('allSpecialties.[]', 'selectedJoins.[]', function(){
    var _this = this;
    var all = this.get('allSpecialties');
    var joins = this.get('selectedJoins');

    if(this.get('isJoin')){
      // Need to load the join models then load the associations separately
      Ember.RSVP.all([joins]).then(function(){
        if(_this.get('isJoin')){
          var selected = joins.map(function(x){
            return x.get(_this.get('modelType'));
          })
        }else{
          var selected = joins;
        }

        Ember.RSVP.all([all, selected]).then(function(){
          var available = Ember.A();
          var selectedNames = selected.map(function(x){
            return x.get('name');
          });

          all.forEach(function(s){
            if(!selectedNames.includes(s.get('name'))){
              available.addObject(s);
            }
          })
          _this.set('availableSpecialties', available);
        })
      });
    }else{
      Ember.RSVP.all([all, joins]).then(function(){
        var available = all.filter(function(x){
          return !joins.map(function(y){return y.get('name'); }).includes(x.get('name'));
        })
        _this.set('availableSpecialties', available);
      });
    }
  }),

  actions: {
    toggleAddSpecialty: function(){
      this.set('hideNewSpecialty', !this.get('hideNewSpecialty'));
    },

    removeSpecialty: function(specialty){
      if(confirm("Remove '"+specialty.get('name')+"'?")){

        console.log("Deleting " + specialty.get('name'))
        var _this = this;

        if(this.get('isJoin')){
          // Remove the join model
          this.get('selectedJoins').filter(function(x){
            return x.get(_this.get('modelType')).get('name') === specialty.get('name');
          }).forEach(function(x){
            x.destroyRecord();
          });
        }else{
          // Remove from the array
          this.get('selectedSpecialties').removeObject(specialty);
        }

      }
    }
  }


});
