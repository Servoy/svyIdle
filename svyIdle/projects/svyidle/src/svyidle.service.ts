import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ServoyPublicService } from '@servoy/public';

type CallableFunction = (...args: unknown[]) => void;

const DEFAULT_IDLE_TRIGGER_EVENTS = 'mousemove keydown mousedown touchstart';
const DEFAULT_IDLE_TIME = 60000;

@Injectable()
export class SvyIdleService implements OnDestroy {
	
	private _onIdle: CallableFunction;
	private _onActive: CallableFunction;
	private _onHide: CallableFunction;
	private _onShow: CallableFunction;
	
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
    
    private _initialized: boolean;
    private _initializing: boolean;
		
	// getter & setter for internal model properties
    get internalOnIdle(): CallableFunction {
        return this._onIdle;
    }

    set internalOnIdle(callback: CallableFunction) {
        this._onIdle = callback;
        this.restoreOnIdleState();
    }
    
    // onActive
    get internalOnActive(): CallableFunction {
        return this._onActive;
    }

    set internalOnActive(callback: CallableFunction) {
        this._onActive = callback;
        this.restoreOnIdleState();
    }
    
    // onHide
    get internalOnHide(): CallableFunction {
        return this._onHide;
    }

    set internalOnHide(callback: CallableFunction) {
        this._onHide = callback;
        this.restoreOnIdleState();
    }
    
    // onShow
    get internalOnShow(): CallableFunction {
        return this._onShow;
    }

    set internalOnShow(callback: CallableFunction) {
        this._onShow = callback;
        this.restoreOnIdleState();
    }
    
    // events
    get internaEvents(): string {
        return this.events;
    }

    set internalEvents(arg: string) {
        this.events = arg;
    }
    
    // idle
    get internalIdle(): number {
        return this.idle;
    }

    set internalIdle(arg: number) {
        this.idle = arg;
    }
    
    // keepTracking
    get internaKeepTracking(): boolean {
        return this.keepTracking;
    }

    set internaKeepTracking(arg: boolean) {
        this.keepTracking = arg;
    }
    
    // startAtIdle
    get internaStartAtIdle(): boolean {
        return this.startAtIdle;
    }

    set internaStartAtIdle(arg: boolean) {
        this.startAtIdle = arg;
    }
    
    // keepTracking
    get internaRecurIdleCall(): boolean {
        return this.recurIdleCall;
    }

    set internaRecurIdleCall(arg: boolean) {
        this.recurIdleCall = arg;
    }

    constructor(private servoyService: ServoyPublicService, @Inject(DOCUMENT) private doc: Document) {
		// constructor
    }

    onIdle(onIdle: (...args: unknown[]) => void, onActive: (...args: unknown[]) => void, onHide: (...args: unknown[]) => void, onShow: (...args: unknown[]) => void, events: string, idle: number, keepTracking: boolean, startAtIdle: boolean, recurIdleCall: boolean) {

		// set the internal variables
		this._onIdle = onIdle;
        this._onActive = onActive;
        this._onHide = onHide;
        this._onShow = onShow;
        this.events = (events == null) || (events.length == 0) || (events == ' ') ? DEFAULT_IDLE_TRIGGER_EVENTS : events;
        this.idle = idle == null ? DEFAULT_IDLE_TIME : idle;
        this.keepTracking = keepTracking == null ? true : keepTracking;
        this.startAtIdle = startAtIdle == null ? false : startAtIdle;
        this.recurIdleCall = recurIdleCall == null ? false : recurIdleCall;
        
        // always re-initialize upon onIdle
        this.onIdleSetup();
        
        // persist the params in internal model
        this.servoyService.sendServiceChanges('svyIdle', 'internalOnIdle', this._onIdle);
        this.servoyService.sendServiceChanges('svyIdle', 'internalOnActive', this._onActive);
        this.servoyService.sendServiceChanges('svyIdle', 'internalOnHide', this._onHide);
        this.servoyService.sendServiceChanges('svyIdle', 'internalOnShow', this._onShow);
        this.servoyService.sendServiceChanges('svyIdle', 'internalEvents', this.events);
        this.servoyService.sendServiceChanges('svyIdle', 'internalIdle', this.idle);
        this.servoyService.sendServiceChanges('svyIdle', 'internalKeepTracking', this.keepTracking);
        this.servoyService.sendServiceChanges('svyIdle', 'internalStartAtIdle', this.startAtIdle);
        this.servoyService.sendServiceChanges('svyIdle', 'internalRecurIdleCall', this.recurIdleCall);
    }
    
    // TODO can i use the this. instead of all thes params ?
    private onIdleSetup() {
		// flag the onIdle as initialized
		this._initialized = true;

		this.stop();
		this.onIdleCallback = () => {
			if (this._onIdle) {
				 this._onIdle();
			}            
		};
		this.onActiveCallback = () => {
			if (this._onActive) {
				this._onActive();
			}            
		};
		this.onHideCallback = () => {
			if (this._onHide) {
				this._onHide();
			}            
		};
		this.onShowCallback = () => {
			if (this._onShow) {
				this._onShow();
			}            
		};
				        
		this.isIdle = this.startAtIdle || false;
		this.isVisible = !this.startAtIdle || true;
				
		this.lastId = this.timeout();
				
		this.eventToListenCallback = () => {
			this.lastId = this.resetTimeout(this.lastId);
		};
		const eventsToListen = this.events.split(' ');
		for (const eventToListen of eventsToListen) {
			this.doc.addEventListener(eventToListen, this.eventToListenCallback);
		}
				
		if(this._onShow || this._onHide) {
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
    
    /**
	 * Private method used to restore the onIdle upon browser refresh
	 */
    private restoreOnIdleState() {
		if (!this._initializing) {
			if (!this._initialized) {
				this._initializing = true;
				setTimeout(() => {
					// setup only has not been initialized already
					if (!this._initialized) this.onIdleSetup();
				})
			}
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
