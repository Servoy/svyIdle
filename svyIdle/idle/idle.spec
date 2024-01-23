{
	"name": "svy-idle",
	"displayName": "Idle",
	"version": 1,
 	"definition": "svyIdle/idle/idle.js",
 	"ng2Config": {
       "packageName": "@servoy/svyidle",
       "serviceName": "SvyIdleService",
       "entryPoint": "dist/servoy/svyidle",
       "moduleName": "SvyIdleModule"
    },	
	"libraries": [{
			"name": "idle.js",
			"version": "1.2.6",
			"url": "svyIdle/idle/jquery.idle.js",
			"mimetype": "text/javascript"
		}],
	"model":
	{
	    "internalOnIdle" : {"type":"function", "pushToServer": "shallow", "elementConfig": {"pushToServer": "shallow"} , "tags": { "scope" :"private" }},
	   	"internalOnActive" : {"type":"function", "pushToServer": "shallow", "elementConfig": {"pushToServer": "shallow"} , "tags": { "scope" :"private" }},
	    "internalOnHide" : {"type":"function", "pushToServer": "shallow", "elementConfig": {"pushToServer": "shallow"} , "tags": { "scope" :"private" }},
	    "internalOnShow" : {"type":"function", "pushToServer": "shallow", "elementConfig": {"pushToServer": "shallow"} , "tags": { "scope" :"private" }},
	    "internalEvents" : {"type":"string", "pushToServer": "shallow", "elementConfig": {"pushToServer": "shallow"} , "tags": { "scope" :"private" }},
	    "internalIdle" : {"type":"int", "pushToServer": "shallow", "elementConfig": {"pushToServer": "shallow"} , "tags": { "scope" :"private" }},
	    "internalKeepTracking" : {"type":"boolean", "pushToServer": "shallow", "elementConfig": {"pushToServer": "shallow"} , "tags": { "scope" :"private" }},
	   	"internalStartAtIdle" : {"type":"boolean", "pushToServer": "shallow", "elementConfig": {"pushToServer": "shallow"} , "tags": { "scope" :"private" }},
	    "internalRecurIdleCall" : {"type":"boolean", "pushToServer": "shallow", "elementConfig": {"pushToServer": "shallow"} , "tags": { "scope" :"private" }}
 	},
 	"api":
 	{
	   	"onIdle": 
	   	{
	    	"parameters":
	    	[
		    	{
					"name":"onIdle",
					"type":"function"
				},
				{
					"name":"onActive",
					"type":"function"
				},
				{
					"name":"onHide",
					"type":"function"
				},
				{
					"name":"onShow",
					"type":"function"
				},
				{
					"name":"events",
					"type":"string"
				},				
				{
					"name":"idle",
					"type":"int"
				},
				{
					"name":"keepTracking",
					"type":"boolean"
				},
				{
					"name":"startAtIdle",
					"type":"boolean"
				},
				{
					"name":"recurIdleCall",
					"type":"boolean"
				}
			]
		}
 	}
}