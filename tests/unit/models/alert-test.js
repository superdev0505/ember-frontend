import { moduleForModel, test } from 'ember-qunit';

moduleForModel('alert', 'Unit | Model | alert', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:alertable']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
