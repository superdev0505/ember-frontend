import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('scrolling-list', 'Integration | Component | scrolling list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{scrolling-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#scrolling-list}}
      template block text
    {{/scrolling-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
