// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).directive('dualPicker', function () {

        template =  '<div id="dualScroll" class="animation" style="position: fixed;  width: 100%;  bottom: 0px;  height: calc(100% - 177px);z-index: 10;">' +
                     '<div class="dual-picker animation" ng-class="{\'show-picker show-picker-top\': showPicker}">' +
                         '<div class="item item-divider min-height-60 pad-top-20 row">' +
                            '<div class="col col-33 col-offset-10 cancel-set-dual" ng-click="clearTime($event)">CANCEL</div>' +
                         '<div ng-hide="update" class="col col-33 col-offset-33 save-set-dual" ng-click="setTime(selectedStartTime,selectedEndTime,$event)">SET</div>' +
                         '<div ng-show="update" class="col col-33 col-offset-33 save-set-dual" ng-click="updateTime(selectedStartTime,selectedEndTime,$event, idx)">SET</div>'+
                    '</div>' +
                         '<select class="date" id="endTime" name="endTime">' +
                             '<option ng-repeat="EndTimeSet in endTime">{{EndTimeSet}}</option>' +
                          '</select>' +
                             '<select class="date" id="startTime" name="startTime">' +
                                 '<option ng-repeat="startTimeSet in startTime">{{startTimeSet}}</option>' +
                              '</select>' +
                         '</div>' +
                     '</div>';

    return {
        restrict: 'EA', //Default in 1.3+
        scope: {
            todaysDate: '=',
            selectedStartTime: '=',
            selectedEndTime: '=',
            clearTime: '=',
            showTimePicker: '=',
            showPicker: '=',
            updateTime:'=',
            availableTime:'=',
            setTime:'=',
            removeItem:'=',
            displayPicker:'=',
            update: '='
        },
        controller: 'main',
        template: template,
        link: function (scope) {

            scope.selectedStartTime  = "12:00 AM";
            scope.selectedEndTime  = "12:00 AM";
            $(document).ready(function () {
                var startTemplate =    '<div class="start-time-lable animation" ng-class="{\'sstart-time-lable\': showPicker}">Start Time</div>';
                var endTemplate  =  '<div class="end-time-lable animation" ng-class="{\'end-time-lable\': showPicker}">End Time</div>';
                $("select.date").drum({
                    onChange : function (elem) {
                        if(elem.id == "startTime"){
                            scope.$apply(function() { // <= change scope properties inside scope.$apply()
                                scope.selectedStartTime = elem.value;
                            });
                        }else if(elem.id == "endTime"){
                            scope.$apply(function() {
                                scope.selectedEndTime = elem.value;
                            });
                        }
                    }
                });
                $("#drum_startTime > .inner").append(startTemplate);
                $("#drum_endTime > .inner").append(endTemplate);
            });
        }
    };
})
.controller('main',['$scope','$timeout','$ionicScrollDelegate', function ($scope,$timeout,$ionicScrollDelegate) {
        $scope.availableTime = [];
        var date = new Date();
        var dualScrollHeight = $('#dualScroll')[0].getBoundingClientRect().height;
        $scope.todaysDate = date.getTime();
        $scope.update = false;
        $scope.showPicker = false;
        $scope.displayPicker = 'none';
        $scope.startTime = [
            '12:00 AM','12:15 AM','12:30 AM','12:45 AM',
            '01:00 AM','01:15 AM','01:30 AM','01:45 AM',
            '02:00 AM','02:15 AM','02:30 AM','02:45 AM',
            '03:00 AM','03:15 AM','03:30 AM','03:45 AM',
            '04:00 AM','04:15 AM','04:30 AM','04:45 AM',
            '05:00 AM','05:15 AM','05:30 AM','05:45 AM',
            '06:00 AM','06:15 AM','06:30 AM','06:45 AM',
            '07:00 AM','07:15 AM','07:30 AM','07:45 AM',
            '08:00 AM','08:15 AM','08:30 AM','08:45 AM',
            '09:00 AM','09:15 AM','09:30 AM','09:45 AM',
            '10:00 AM','10:15 AM','10:30 AM','10:45 AM',
            '11:00 AM','11:15 AM','11:30 AM','11:45 AM',
            '12:00 PM','12:15 PM','12:30 PM','12:45 PM',
            '01:00 PM','01:15 PM','01:30 PM','01:45 PM',
            '02:00 PM','02:15 PM','02:30 PM','02:45 PM',
            '03:00 PM','03:15 PM','03:30 PM','03:45 PM',
            '04:00 PM','04:15 PM','04:30 PM','04:45 PM',
            '05:00 PM','05:15 PM','05:30 PM','05:45 PM',
            '06:00 PM','06:15 PM','06:30 PM','06:45 PM',
            '07:00 PM','07:15 PM','07:30 PM','07:45 PM',
            '08:00 PM','08:15 PM','08:30 PM','08:45 PM',
            '09:00 PM','09:15 PM','09:30 PM','09:45 PM',
            '10:00 PM','10:15 PM','10:30 PM','10:45 PM',
            '11:00 PM','11:15 PM','11:30 PM','11:45 PM'
        ];
        $scope.endTime = [
            '12:00 AM','12:15 AM','12:30 AM','12:45 AM',
            '01:00 AM','01:15 AM','01:30 AM','01:45 AM',
            '02:00 AM','02:15 AM','02:30 AM','02:45 AM',
            '03:00 AM','03:15 AM','03:30 AM','03:45 AM',
            '04:00 AM','04:15 AM','04:30 AM','04:45 AM',
            '05:00 AM','05:15 AM','05:30 AM','05:45 AM',
            '06:00 AM','06:15 AM','06:30 AM','06:45 AM',
            '07:00 AM','07:15 AM','07:30 AM','07:45 AM',
            '08:00 AM','08:15 AM','08:30 AM','08:45 AM',
            '09:00 AM','09:15 AM','09:30 AM','09:45 AM',
            '10:00 AM','10:15 AM','10:30 AM','10:45 AM',
            '11:00 AM','11:15 AM','11:30 AM','11:45 AM',
            '12:00 PM','12:15 PM','12:30 PM','12:45 PM',
            '01:00 PM','01:15 PM','01:30 PM','01:45 PM',
            '02:00 PM','02:15 PM','02:30 PM','02:45 PM',
            '03:00 PM','03:15 PM','03:30 PM','03:45 PM',
            '04:00 PM','04:15 PM','04:30 PM','04:45 PM',
            '05:00 PM','05:15 PM','05:30 PM','05:45 PM',
            '06:00 PM','06:15 PM','06:30 PM','06:45 PM',
            '07:00 PM','07:15 PM','07:30 PM','07:45 PM',
            '08:00 PM','08:15 PM','08:30 PM','08:45 PM',
            '09:00 PM','09:15 PM','09:30 PM','09:45 PM',
            '10:00 PM','10:15 PM','10:30 PM','10:45 PM',
            '11:00 PM','11:15 PM','11:30 PM','11:45 PM'
        ];
        $timeout(function () {
            $("select").drum();
        },1000);
        Hammer.plugins.fakeMultitouch();
        $scope.clearTime = function (evt) {
            $timeout(function () {
                $ionicScrollDelegate.scrollTop(true)
                //$('.scroll').css('transform','translate3d(0px, 0px, 0px) scale(1)');
            });
            evt.stopPropagation();
            $('#start-Time')[0].innerText = "12:00 AM - 12:00 AM";
            $scope.showPicker = false;
            $scope.displayPicker ='none';
            $("#startTime").val("12:00 AM");
            $("#endTime").val("12:00 AM");
        };
        $scope.removeItem = function(array, item) {
            var index = $scope.availableTime.indexOf(item);
            array.splice(index, 1);
            return array;
        };
        $scope.showTimePicker = function (evt, index) {
            if(index || index == 0){
                $scope.update= true;
                $scope.idx= index;

                var val=evt.pageY-50;
                $timeout(function () {
                    $ionicScrollDelegate.scrollTo(0,val,true);
                },700)
            }
            evt.stopPropagation();
            $scope.showPicker = !$scope.showPicker;
            $scope.displayPicker = 'block';
            if($scope.showPicker){
                $timeout(function () {
                    $('.height-ctrl2')[0].style.height = (screen.height - dualScrollHeight)+'px';
                },100)
            }
            $('#start-Time')[0].innerText = $scope.selectedStartTime +" - "+ $scope.selectedEndTime;

            $timeout(function () {
                //$('.scroll').css('transform','translate3d(0px, -'+(evt.pageY-80)+'px, 0px) scale(1)');
            },100);
        };
        $scope.setTime = function (startTime,endTime, evt) {
            evt.stopPropagation();
            $scope.showPicker = false;
            var obj ={
                start:  startTime,
                end:endTime
            };
            console.log(obj);
            $scope.availableTime.push(obj);
             $timeout(function() {
                 $scope.displayPicker = 'none';
             }, 100);
          //  $("select.date").drum();

        };
        $scope.updateTime = function(startTime, endTime, evt,idx) {
            evt.stopPropagation();
            var obj = {
                start:  startTime,
                end:endTime
            };
            console.log(obj);
            $scope.availableTime[idx] =obj;
            $ionicScrollDelegate.scrollTop(true);
            $scope.selectedStartTime = startTime;
            $scope.selectedEndTime = endTime;
            $scope.showPicker = false;
            $scope.update= false;
            $timeout(function() {
                $scope.displayPicker = 'none';
            }, 100);
        };
        $scope.displayPicker = 'block';
    }]);