import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('availability-useractions', 'Integration | Component | availability useractions', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{availability-useractions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  // this.render(hbs`
  //   {{#availability-useractions}}
  //     template block text
  //   {{/availability-useractions}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
});
