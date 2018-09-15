import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  target: DS.belongsTo('alertable', {polymorphic: true}),
  availability: DS.belongsTo('availability'),
  subject: DS.attr('string'),
  entryType: DS.attr('string'),
  date: DS.attr(),
  createdAt: DS.attr('string'),
  updatedAt: DS.attr('string'),
  includeInReport: false,

  // Functions to determine which component to show in the feed
  isAvailability: Ember.computed('entryType', function(){
    var et = this.get('entryType');
    return et === 'taught' | et === 'attended';
  }),

  isReflection: Ember.computed('entryType', function(){
    return this.get('entryType') === 'reflection';
  }),

  // Pass the target ID separately to facilitate links more easily
  targetId: DS.attr()
});
