import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feed-availability', 'Integration | Component | feed availability', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
assert.expect(0)
  this.render(hbs`{{feed-availability}}`);

  // assert.equal(this.$().text().trim(), '');
  //
  // // Template block usage:
  // this.render(hbs`
  //   {{#feed-availability}}
  //     template block text
  //   {{/feed-availability}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
});
