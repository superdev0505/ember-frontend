import Ember from 'ember';

export default Ember.Component.extend({

    dateFormat: "DD/MM/YYYY HH:mm",


    classNames: ['datepicker-component'],

    didInsertElement: function(){
        var el_id = this.get('elementId');
        var el = Ember.$("#" + el_id).find('.datetimepicker')
        var _this = this;
        el.datetimepicker({
            format: this.get('dateFormat'),
            defaultDate: this.get('value'),
            stepping: 5,
            inline:true,
            sideBySide: true,
            keepOpen: true,
            debug:true

        });

        el.on('dp.change', function(){
            // debugger
            var date = moment(el.val(), _this.get('dateFormat'))
            _this.set('value', date);

            // Update the end time, if passed in
            if(_this.get('updateEnd')){
                _this.set('updateEnd', new Date((new Date(date).getTime() + _this.get('updateDuration')*60000)))
            }
        })


        Ember.$('#' + this.elementId + ' .bootstrap-datetimepicker-widget').addClass('hidden');
    },

    actions: {

        togglePicker: function(){
            // If this is an app, use the built in picker
            if(!!window.cordova){
                cordova.plugins.DateTimePicker.show({
            mode: "date",
            date: this.get('value'),
            allowOldDates: true,
            allowFutureDates: true,
            minuteInterval: 15,
            locale: "EN",
            okText: "Select",
            cancelText: "Cancel"
        }, function(newDate) {
          // Handle new date.
          this.set('value', newDate);
        }, function (err) {
          // Handle error.
            console.error(err);
        });
            }else{
                Ember.$('#' + this.elementId + ' .bootstrap-datetimepicker-widget').toggleClass('hidden');
                Ember.$('#' + this.elementId + ' .arrow-up').toggleClass('hidden');
            }

        }
    }

});
