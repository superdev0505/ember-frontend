import { moduleForModel, test } from 'ember-qunit';

moduleForModel('availability-item', 'Unit | Model | availability item', {
  // Specify the other units that are required for this test.
  needs: ['model:availability', 'model:item', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
