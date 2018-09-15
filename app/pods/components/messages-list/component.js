/**
* Displays a list of messages
* Automatically scrolls down when a new one appears
*
* @module Messages
* @class component-messages-list
*/
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'messages-list',

  filteredMessages: Ember.computed.filter('messages', function(message, index, array){
    if(!message.get('id')){return false;}
    return message.get('conversationId').toString() === this.get('conversationId').toString();
  }),
  uniqMessages: Ember.computed.uniqBy('messages', 'id'),
  sortedMessages: Ember.computed.sort('uniqMessages', 'messageSorting'),
  messageSorting: ["createdAt:asc"],

  /**
  * didInsertElement method - makes the didRenderElement function run at appropriate times
  *
  * @method didInsertElement
  */
  didInsertElement: function(){

        // Load messages when the page is loaded
        // this.get('controller').getMessages();

        this._super();
        Ember.run.scheduleOnce('afterRender', this, this.didRenderElement);
    var _this = this;

    // Focus on the new message box (not actually in this component!)
    Ember.$('.newMessageBody').focus(function(){
      Ember.$('.subContainerMessage').addClass("messageFocus");
      _this.didRenderElement();
        });

        Ember.$('.newMessageBody').focusout(function(){
            if(Ember.$('.newMessageBody').val() === ""){
                Ember.$('.subContainerMessage').removeClass("messageFocus");
        _this.didRenderElement();
            }
        });
    },

    init: function(){
        this._super();
        // var elHeight = 0;
        Ember.run.scheduleOnce('afterRender', this, this.didRenderElement);
    },

  /**
  * Sets up the scrollDown function to run regularly.
  * This checks if the element height has changed and scrolls down if it has.
  *
  * @method didRenderElement
  */
  didRenderElement: function(){

        var elHeight = 0;
    var el = Ember.$("#" + this.elementId);

        var scrollDown = function(){
            if(el[0].scrollHeight !== elHeight){

                elHeight = el[0].scrollHeight;
                el.scrollTop(el[0].scrollHeight);

                // Force the element to redraw - corrects an issue on iOS
                el.hide().show(0);

            }
        };

        // When the page opens scroll.
        // Repeat the function regularly checking for a change in element height.
        console.log("Prepare to scroll...");

        var myInterval = setInterval(scrollDown, 50);


    }

});
