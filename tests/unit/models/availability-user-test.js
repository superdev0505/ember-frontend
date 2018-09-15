import { moduleForModel, test } from 'ember-qunit';

moduleForModel('availability-user', 'Unit | Model | availability user', {
  // Specify the other units that are required for this test.
  needs: ['model:availability','model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
