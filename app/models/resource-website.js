import DS from 'ember-data';
import Item from './item';

export default Item.extend({
  name: DS.attr('string'),
  url: DS.attr('string'),
  description: DS.attr('string'),

  isWebsite: true
});
