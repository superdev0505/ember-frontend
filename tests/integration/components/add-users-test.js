import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-users', 'Integration | Component | add users', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(0)
  // TODO: Complete testing


  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Needs inputs.
  // This can use used for adding users to an availability
  // Try scenarios:
  //   Adding to an availability
  //   Adding to a conversation

  // this.inject.service('store')
  //
  // this.set('target', this.get('store').findRecord('availability', 1));
  //
  // this.render(hbs`{{add-users model=target joinModel='availability-user' isJoin=true}}`);
  //
  // assert.equal(this.$().text().trim(), '');
  //
  //
  // this.set('target', this.get('store').findRecord('conversation', 1));
  //
  // this.render(hbs`{{add-users model=target joinModel='availability-user' isJoin=true}}`);
  //
  // assert.equal(this.$().text().trim(), '');

  // Template block usage:
  // this.render(hbs`
  //   {{#add-users}}
  //     template block text
  //   {{/add-users}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
});
