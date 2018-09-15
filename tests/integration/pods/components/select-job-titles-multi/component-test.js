import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-job-titles-multi', 'Integration | Component | select job titles multi', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{select-job-titles-multi}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#select-job-titles-multi}}
      template block text
    {{/select-job-titles-multi}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
