import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bottom-navbar', 'Integration | Component | bottom navbar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bottom-navbar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bottom-navbar}}
      template block text
    {{/bottom-navbar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
