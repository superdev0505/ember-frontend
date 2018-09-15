import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('show-teaching-request', 'Integration | Component | show teaching request', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{show-teaching-request}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#show-teaching-request}}
      template block text
    {{/show-teaching-request}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
