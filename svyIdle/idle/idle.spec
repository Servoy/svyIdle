{
	"name": "svy-idle",
	"displayName": "idle",
	"version": 1,
 	"definition": "svyIdle/idle/idle.js",
	"libraries": [{
			"name": "idle.js",
			"version": "1.2.6",
			"url": "svyIdle/idle/jquery.idle.js",
			"mimetype": "text/javascript"
		}],
	"model":
	{
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
		},
		"onClose": 
	   	{
	    	"parameters":
	    	[		    	
				{
					"name":"onClose",
					"type":"function"
				}
			]
		}
 	}
}