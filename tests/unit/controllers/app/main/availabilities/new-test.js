import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:app/main/availabilities/new', 'Unit | Controller | app/main/availabilities/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['model:location', 'adapter:application', 'service:session']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
