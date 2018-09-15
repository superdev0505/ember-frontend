/**
* Very simple tests - check all four home pages render and we can click between them successfully
*
* @class acceptance-test:home-test
* @module Home
*/
import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import signIn from 'oslr-ui/tests/helpers/sign-in';


module('Acceptance | home', function(hooks) {
  setupApplicationTest(hooks);

  test('Home pages render when logged in', async function(assert) {

    var homePages = [
      "teach",
      "learn",
      "log",
      "more"
    ];
    await visit('/');
    await signIn(assert, 'test1@oslr.co.uk');
    for(var i=0;i<homePages.length;i++){
      var page = homePages[i];
      var pageUrl = "/app/main/home/" + page;
      await visit(pageUrl);
      assert.equal(currentURL(), pageUrl, "Successfully rendered page " + pageUrl);

      // Check the alerts link is present
      assert.equal($('.alertsBTN').length, 1, "Alerts button present on page");

      // Check the bottom navbar is present
      assert.equal($('.navbar-footer').length, 1, "Footer menu is rendered");
      homePages.forEach(function(footerPage){
        assert.equal($('.navbar-footer-button-' + footerPage).length, 1, "Footer has " + footerPage + ' button');
        if(footerPage === page){
          assert.equal($('.navbar-footer-button-' + footerPage + '.active').length, 1, footerPage + " footer button is active");
        }else{
          assert.equal($('.navbar-footer-button-' + footerPage + '.active').length, 0, footerPage + " footer button is not active");
        }
      });

      // Check the alerts link
      await click('.alertsBTN');

      assert.equal(currentURL(), "/app/main/alerts", "Alert link works");

      // Check all links work in the footer
      for(var i=0;i<homePages.length;i++){
        var footerPage = homePages[i];
        if(footerPage === page){return false;}
        await visit(pageUrl);

        await click('.navbar-footer-button-' + footerPage);

        assert.equal(currentURL(), "/app/main/home/" + footerPage, "Link from "+page+" to "+footerPage+ " page successful");
      }
    }
    
  });
});
