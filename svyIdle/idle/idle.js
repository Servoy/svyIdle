angular.module('svyIdle',['servoy'])
.factory("svyIdle",function($services, $window) {
	var scope = $services.getServiceScope('svyidleIdle');
	return {
		/**
		 * Setup Idle options and callbacks
		 *
		 * @param {function} onIdle triggers when user is idle
		 * @param {function} onActive triggers when user is active
		 * @param {function} onHide triggers when window is hidden
		 * @param {function} onShow	triggers when window is shown
		 * @param {string} events string of events that will reset idle time (default : 'mousemove keydown mousedown touchstart')
		 * @param {Number} idle idle time in ms, default: 60000
		 * @param {Boolean} keepTracking set to false if we only want to track the first time (true by default)
		 * @param {Boolean} startAtIdle if you want to start at idle, set to true
		 * @param {Boolean} recurIdleCall use setInterval versus timeout, by default uses setTimeout
		 */
		onIdle: function(onIdle, onActive, onHide, onShow, events, idle, keepTracking, startAtIdle, recurIdleCall) {
			$(document).idle({
				onIdle: function() {
					if (onIdle) {
						$window.executeInlineScript(onIdle.formname, onIdle.script, []);
					}
				},
				onActive: function(cb) {
					if (onActive) {
						$window.executeInlineScript(onActive.formname, onActive.script, []);
					}
				},
				onHide: function() {
					if (onHide) {
						$window.executeInlineScript(onHide.formname, onHide.script, []);
					}
				},
				onShow: function(cb) {
					if (onShow) {
						$window.executeInlineScript(onShow.formname, onShow.script, []);
					}
				},
				events: (events == null) || (events.length == 0) || (events == ' ') ? 'mousemove keydown mousedown touchstart' : events,
				keepTracking: keepTracking,
				startAtIdle: startAtIdle,
				recurIdleCall: recurIdleCall,
				idle: idle
			})
		}

	}
}).run(function($rootScope, $services) { })