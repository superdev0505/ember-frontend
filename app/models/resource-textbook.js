import DS from 'ember-data';
import Item from './item';

export default Item.extend({

  name: DS.attr('string'),
  isbn: DS.attr('string'),
  kortextLink: DS.attr('string'),
  imgLink: DS.attr('string'),
  description: DS.attr('string'),

  isTextbook: true

});
