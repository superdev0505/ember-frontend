import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Availability from '../../../../../models/availability';

moduleForComponent('availability-invites', 'Integration | Component | availability-invites', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  const store = Ember.getOwner(this).lookup('service:store');
  var _this = this;
  Ember.run(function(){
    var model = store.createRecord('availability',{
      startTime: new Date,
      endTime: new Date
    });

    Ember.run(function(){
      _this.render(hbs`{{availability-invites availability=model}}`);

      assert.equal(_this.$().text().trim(), '');

      // Template block usage:
      _this.render(hbs`
        {{#availability-invites}}
          template block text
        {{/availability-invites}}
      `);

      assert.equal(_this.$().text().trim(), 'template block text');
    })
  });

  // var model = Ember.Object.create({});
  // this.inject.service('store');
  // var _this = this;
  // var model = Ember.run(function(){
  //   _this.get('store').createRecord('availability');
  // });

});
