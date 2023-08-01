import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ServoyPublicService } from '@servoy/public';

const DEFAULT_IDLE_TRIGGER_EVENTS = 'mousemove keydown mousedown touchstart';
const DEFAULT_IDLE_TIME = 60000;

@Injectable()
export class SvyIdleService implements OnDestroy {

    idle: number //idle time in ms
    events: string; //events that will trigger the idle resetter
    onIdleCallback: Function; //callback function to be executed after idle time
    onActiveCallback: Function; //callback function to be executed after back from idleness
    onHideCallback: Function; //callback function to be executed when window is hidden
    onShowCallback: Function; //callback function to be executed when window is visible
    keepTracking: boolean; //set it to false if you want to track only the first time
    startAtIdle: boolean;
    recurIdleCall: boolean;

    isIdle: boolean;
    isVisible: boolean;
    lastId: any;

    eventToListenCallback: any;
    visibilityChangeCallback: any;

    constructor(private servoyService: ServoyPublicService, @Inject(DOCUMENT) private doc: Document) {
    }

    onIdle(onIdle: any, onActive: any, onHide: any, onShow: any, events: string, idle: number, keepTracking: boolean, startAtIdle: boolean, recurIdleCall: boolean) {

        this.stop();
        this.onIdleCallback = () => {
            if (onIdle) {
                this.servoyService.executeInlineScript(onIdle.formname, onIdle.script, []);
            }            
        };
        this.onActiveCallback = () => {
            if (onActive) {
                this.servoyService.executeInlineScript(onActive.formname, onActive.script, []);
            }            
        };
        this.onHideCallback = () => {
            if (onHide) {
                this.servoyService.executeInlineScript(onHide.formname, onHide.script, []);
            }            
        };
        this.onShowCallback = () => {
            if (onShow) {
                this.servoyService.executeInlineScript(onShow.formname, onShow.script, []);
            }            
        };
        this.events = (events == null) || (events.length == 0) || (events == ' ') ? DEFAULT_IDLE_TRIGGER_EVENTS : events;
        this.idle = idle == null ? DEFAULT_IDLE_TIME : idle;
        this.keepTracking = keepTracking == null ? true : keepTracking;
        this.startAtIdle = startAtIdle == null ? false : startAtIdle;
        this.recurIdleCall = recurIdleCall == null ? false : recurIdleCall;

        this.isIdle = startAtIdle || false;
        this.isVisible = !startAtIdle || true;

        this.lastId = this.timeout();

        this.eventToListenCallback = () => {
            this.lastId = this.resetTimeout(this.lastId);
        };
        const eventsToListen = this.events.split(' ');
        for (const eventToListen of eventsToListen) {
            this.doc.addEventListener(eventToListen, this.eventToListenCallback);
        }

        if(onShow || onHide) {
            this.visibilityChangeCallback = () => {
                if(this.doc.hidden) {
                    if(this.isVisible) {
                        this.isVisible = false;
                        this.onHideCallback();
                    }
                } else {
                    if(!this.isVisible) {
                        this.isVisible = true;
                        this.onShowCallback();
                    }
                }
            }
            this.doc.addEventListener('visibilitychange', this.visibilityChangeCallback);
        }
    }

    private stop() {
        if(this.visibilityChangeCallback) {
            this.doc.removeEventListener('visibilitychange', this.visibilityChangeCallback);
        }
        if(this.events && this.eventToListenCallback) {
            const eventsToListen = this.events.split(' ');
            for (const eventToListen of eventsToListen) {
                this.doc.removeEventListener(eventToListen, this.eventToListenCallback);
            }
        }
        this.keepTracking = false;
        this.resetTimeout(this.lastId);
    }

    private resetTimeout(id: any): any {
        if(this.isIdle) {
            this.onActiveCallback();
            this.isIdle = false;
        }
        clearTimeout(id);
        if(this.keepTracking) {
            return this.timeout();
        }
        return null;
    }

    private timeout(): any {
        const timer = this.recurIdleCall ? setInterval : setTimeout;
        const id = timer(() => {
            this.isIdle = true;
            this.onIdleCallback();
        }, this.idle);
        return id;
    }

    ngOnDestroy() {
        this.stop();
    }
}
