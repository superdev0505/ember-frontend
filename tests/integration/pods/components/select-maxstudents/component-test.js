import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-maxstudents', 'Integration | Component | select maxstudents', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{select-maxstudents}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#select-maxstudents}}
      template block text
    {{/select-maxstudents}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
