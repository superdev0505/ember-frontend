import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-location', 'Unit | Model | user location', {
  // Specify the other units that are required for this test.
  needs: ['model:user','model:location']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
