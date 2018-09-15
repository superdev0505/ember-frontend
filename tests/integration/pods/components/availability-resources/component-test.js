import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('availability-resources', 'Integration | Component | availability resources', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{availability-resources}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#availability-resources}}
      template block text
    {{/availability-resources}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
