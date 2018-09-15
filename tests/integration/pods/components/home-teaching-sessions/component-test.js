import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('home-teaching-sessions', 'Integration | Component | home teaching sessions', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{home-teaching-sessions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#home-teaching-sessions}}
      template block text
    {{/home-teaching-sessions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
