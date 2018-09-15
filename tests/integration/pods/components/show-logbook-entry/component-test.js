import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('show-logbook-entry', 'Integration | Component | show logbook entry', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{show-logbook-entry}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#show-logbook-entry}}
      template block text
    {{/show-logbook-entry}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
