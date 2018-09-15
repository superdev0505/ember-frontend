import { moduleForModel, test } from 'ember-qunit';

moduleForModel('availability-message', 'Unit | Model | availability message', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:availability']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
