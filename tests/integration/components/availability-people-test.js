import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('availability-people', 'Integration | Component | availability people', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{availability-people}}`);

  assert.equal(this.$().text().trim(), 'People');

  // Template block usage:
  this.render(hbs`
    {{#availability-people}}
      template block text
    {{/availability-people}}
  `);

  assert.equal(this.$().text().trim(), 'People');
});
