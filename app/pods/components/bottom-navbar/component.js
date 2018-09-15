/**
* The footer used on many pages including the home pages
*
* @module Home
* @class component-page-footer
*/
import Ember from 'ember';

export default Ember.Component.extend({

  // Select the appropriate button - may be different from linkTo defaults
  doSelection: Ember.on('didInsertElement', function(){
    Ember.$('.navbar-footer-button').removeClass('active');
    switch(this.get('selected')){
      case 'teach':
        Ember.$('.navbar-footer-button-teach').addClass('active');
        break;
      case 'learn':
        Ember.$('.navbar-footer-button-learn').addClass('active');
        break;
      case 'log':
        Ember.$('.navbar-footer-button-log').addClass('active');
        break;
      case 'more':
        Ember.$('.navbar-footer-button-more').addClass('active');
        break;
    }
  })

});
