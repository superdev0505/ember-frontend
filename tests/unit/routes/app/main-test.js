import { moduleFor, test } from 'ember-qunit';

moduleFor('route:app/main', 'Unit | Route | app/main', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
