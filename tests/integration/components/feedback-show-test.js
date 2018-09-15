import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feedback-show', 'Integration | Component | feedback show', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{feedback-show}}`);

  assert.equal(this.$().text().trim(), '');

  // // Template block usage:
  // this.render(hbs`
  //   {{#feedback-show}}
  //     template block text
  //   {{/feedback-show}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
});
