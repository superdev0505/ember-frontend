import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('availability-info', 'Integration | Component | availability-info', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{availability-info}}`);

  assert.equal(this.$().text().trim(), 'Session Details');

  // Template block usage:
  this.render(hbs`
    {{#availability-info}}
      template block text
    {{/availability-info}}
  `);

  assert.equal(this.$().text().trim(), 'Session Details');
});
