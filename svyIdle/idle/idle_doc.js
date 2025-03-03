/* A simple web service for checking if a user is idle or if the browser window is no longer active. */

var internalOnIdle;

var internalOnActive;

var internalOnHide;

var internalOnShow;

var internalEvents;

var internalIdle;

var internalKeepTracking;

var internalStartAtIdle;

var internalRecurIdleCall;



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
function onIdle(onIdle, onActive, onHide, onShow, events, idle, keepTracking, startAtIdle, recurIdleCall) { }