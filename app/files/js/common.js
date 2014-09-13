/**
 * Created by Smiley on 27.08.14.
 */

var defaultConfig = {
	ajaxUrl: 'http://gw2location.buildwars.net/',
	channelKey: '',
	cKeySHA1: phpjs.sha1(''),
	lang: 'en',
	worldID: 0,
	regionID: 0,
	ajaxInterval: 5,
	senderInterval: 5,
	receiverInterval: 5,
	statsInterval: 3,
	accname: '',
	guildID: '00000000-0000-0000-0000-000000000000',
	guildName: '',
	guildTag: '',
	colorSelf: '00FFFF',
	colorOnline: '00FF00',
	colorAway: 'FFE000',
	colorAfk: 'FF9000',
	colorOffline: 'FF0000',
	colorCommander: '2966FF',
	colorGuild: 'FF00CC',
	enableSender: true,
	enableReceiver: true
};

var professionIcons = {
	0: 'unknown.png',
	1: 'guardian.png',
	2: 'warrior.png',
	3: 'engineer.png',
	4: 'ranger.png',
	5: 'thief.png',
	6: 'elementalist.png',
	7: 'mesmer.png',
	8: 'necromancer.png'
};


/**
 * Get rid of the message "Refused to get unsafe header X-JSON"
 * https://gist.github.com/codemasher/8373493
 */
Ajax.Response.prototype._getHeaderJSON = Prototype.emptyFunction;

var ajaxRequest = function(url, method, async, params, callback, onLoadingCallback){
	new Ajax.Request(url, {
		method: method || 'get',
		parameters: params || {},
		asynchronous: async !== false,
		requestHeaders: {
			'X-Requested-With': null,
			'X-Prototype-Version': null
		},
		onLoading: onLoadingCallback || Prototype.emptyFunction,
		onSuccess: callback || Prototype.emptyFunction
	});
};


Element.addMethods({
	/**
	 * a counter, bound to an element
	 * just make it more convinient to use
	 *
	 * @param element
	 * @param timestamp
	 * @returns {*}
	 */
	countdown: function(element, timestamp){
		if(!(element = $(element))){
			return;
		}

		new PeriodicalExecuter(function(pe){
			var now = phpjs.time();
			if(timestamp <= now){
				element.update('');
				pe.stop();
			}
			else{
				var end = phpjs.mktime(
					phpjs.date('G', timestamp),
					phpjs.date('i', timestamp),
					phpjs.date('s', timestamp),
					phpjs.date('n', timestamp),
					phpjs.date('j', timestamp),
					phpjs.date('Y', timestamp)
				);
				var diff = end-now;
				var days = Math.floor(diff/(24*3600));
				diff = diff%(24*3600);
				var hours = Math.floor(diff/(60*60));
				diff = diff%(60*60);

				var str = days > 0 ? days+':' : '';
				str += hours > 0 ? phpjs.sprintf('%1$02d', hours)+':' : '';
				str += phpjs.sprintf('%1$02d', Math.floor(diff/60))+':'+phpjs.sprintf('%1$02d', Math.floor(diff%60));

				element.update(str);
			}
		}, 1);

		return element;
	}
});


var OW = {
	dragResize: function(edge){
		overwolf.windows.getCurrentWindow(function(result){
			if(result.status === 'success'){
				overwolf.windows.dragResize(result.window.id, edge);
			}
		});
	},

	dragMove: function(){
		overwolf.windows.getCurrentWindow(function(result){
			if(result.status === 'success'){
				overwolf.windows.dragMove(result.window.id);
			}
		});
	},

	closeWindow: function(){
		overwolf.windows.getCurrentWindow(function(result){
			if(result.status === 'success'){
				overwolf.windows.close(result.window.id);
			}
		});
	},

	openWindow: function(window){
		overwolf.windows.obtainDeclaredWindow(window, function(result){
			if(result.status === 'success'){
				overwolf.windows.restore(result.window.id, function(result){
//					console.log(result);
				});
			}
		});
	},

	getGame: function(callback){
		overwolf.games.getRunningGameInfo(function(result){
			if(result !== null){
				callback(result);
			}
		});
	}
};


var Overlay = Class.create({
	initialize: function(element, options){
		this.element = $(element);
		this.options = {
			containerID: 'overlay-inner',
			containerWidth: 600
		};

		Object.extend(this.options, options || {});

		this.element.setStyle({
			'display': 'none',
			'position': 'absolute',
			'top': '0px',
			'left': '0px',
			'width': '100%',
			'height': '100%',
			'z-index': 99
		});

		this.container = $(this.options.containerID);
		if(!this.container){
			this.container = new Element('div', {
				'id': this.options.containerID
			});
		}

		this.container.setStyle({
			'display': 'none',
			'position': 'fixed',
			'width': this.options.containerWidth+'px',
			'z-index': 100
		});

		this.element.insert(this.container).observe('click', function(event){
			if(event.target === this.element){
				this.hideOverlay();
			}
		}.bind(this));

		window.onresize = function(){
			var viewport = document.viewport.getDimensions();
			var dimensions = document.body.getDimensions();
			this.element.setStyle({
				width: viewport.width+'px',
				height: viewport.height+'px'
			});

			this.container.setStyle({
				'max-height': Math.ceil(viewport.height*0.8)+'px',
				'top': Math.ceil(viewport.height*0.1)+'px',
				'left': Math.ceil((dimensions.width-this.options.containerWidth)/2)+'px'
			});

		}.bind(this);
	},

	maximize: function(){
		var dimensions = document.body.getDimensions();
		var viewport = document.viewport.getDimensions();

		this.element.setStyle({
			width: (viewport.width > dimensions.width ? viewport.width : dimensions.width)+'px',
			height: (viewport.height > dimensions.height ? viewport.height : dimensions.height)+'px'
		});
	},

	showOverlay: function(content){
		var dimensions = this.element.getDimensions();
		var viewport = document.viewport.getDimensions();

		this.maximize();
		this.container.update(content).setStyle({
			'max-height': Math.ceil(viewport.height*0.8)+'px',
			'top': Math.ceil(viewport.height*0.1)+'px',
			'left': Math.ceil((dimensions.width-this.options.containerWidth)/2)+'px'
		});

		if(this.element.getStyle('display') === 'none'){
			Effect.Appear(this.element);
		}

		Effect.Appear(this.container);
	},

	hideOverlay: function(){
		Effect.Fade(this.container);
		Effect.Fade(this.element);
		this.container.update('');
	}

});


var WvW = {
	/**
	 * wvw matchdata refresh
	 */
	refreshMatches: function(){
		var config = localStorage.GW2LocationTracker.evalJSON(true);
		var matchdata = localStorage.GW2LocationWvWMatches.evalJSON(true);
		var now = phpjs.time();

		if(!matchdata.times || now > matchdata.times[2].end || now > matchdata.times[1].end){

			var ajaxCallback = function(request){
				var json = request.responseJSON;
				if(json.wvw_matches.length >= 17){
					// first get the mess in matches.json in the right order
					var matchdata = {
						regions: {
							1: 'NA',
							2: 'EU'
						},
						times: {},
						matches: {
							1: {}, // NA
							2: {}  // EU
						}
					};

					$A(json.wvw_matches).each(function(match){
						var rt = match.wvw_match_id.split('-'); // region/tier

						// add match end times
						if((rt[0] === '1' && rt[1] === '1') || (rt[0] === '2' && rt[1] === '1')){
							matchdata.times[rt[0]] = {
								start: phpjs.strtotime(match.start_time),
								end: phpjs.strtotime(match.end_time)
							};
						}

						var m = {
							green: match.green_world_id,
							blue: match.blue_world_id,
							red: match.red_world_id
						};
						matchdata.matches[rt[0]][rt[1]] = m;

						if(phpjs.in_array(config.worldID, m)){
							localStorage.GW2LocationCurrentWvWMatch = Object.toJSON({
								region: phpjs.intval(rt[0]),
								tier: phpjs.intval(rt[1]),
								match_id: match.wvw_match_id
							});
						}
					});

					// save to local storage
					localStorage.GW2LocationWvWMatches = Object.toJSON(matchdata);
				}
			};

			// we're doing this request synchronous to make sure we have the latest data
			ajaxRequest('https://api.guildwars2.com/v1/wvw/matches.json', 'get', false, {}, ajaxCallback);
		}
	},

	/**
	 * WvW stats parser
	 * https://github.com/codemasher/gw2-wvwstats/blob/master/classes/gw2api.class.php#L208
	 *
	 * @param matchDetails
	 */
	parseStats: function(matchDetails){
		var stats = WvW.statsObject();
		var rt = matchDetails.match_id.split('-');
		var matchdata = localStorage.GW2LocationWvWMatches.evalJSON(true);

		// add some base info
		stats.match.lastupdate = phpjs.time();
		stats.match.id = matchDetails.match_id;
		stats.match.region = phpjs.intval(rt[0]);
		stats.match.tier = phpjs.intval(rt[1]);

		// loop out the maps
		matchDetails.maps.each(function(map){
			['red', 'blue', 'green', 'neutral'].each(function(color, i){

				if(color !== 'neutral'){
					var world_id = matchdata.matches[rt[0]][rt[1]][color];
					var home = ('-'+color+'-home').camelize(); // name to match the maptype in match_details.json
					stats.match.maps[home] = world_id; // possibly redundant
					stats.worlds[color].id = world_id;
					stats.worlds[color].scores[map.type].score = phpjs.intval(map.scores[i]);
				}

				// check for bonuses and push them to their respective array
				map.bonuses.each(function(bonus){
					if(bonus.type === 'bloodlust' && bonus.owner.toLowerCase() === color){
						stats.worlds[color].bonus.bloodlust.push(map.type);
					}
					// other bonuses may come...
				});

				// loop the objectives out and calculate scores
				map.objectives.each(function(objective){
					if(objective.owner.toLowerCase() === color){
						var o = Objectives[objective.id];

						stats.worlds[color].objectives[objective.id] = {
							owner: {
								id: ''
							}
						};

						if(color !== 'neutral'){
							// assign owner guild
							if(objective.owner_guild){
								stats.worlds[color].objectives[objective.id].owner.id = objective.owner_guild;
							}

							// add the objective's score to the income
							stats.worlds[color].scores[map.type].income += o.score;

							// count up the objectives
							['camp', 'castle', 'keep', 'ruin', 'tower'].each(function(objective_type){
								if(o.type === objective_type){
									stats.worlds[color].scores[map.type][objective_type]++;
								}
							});
						}
					}
				});

				// add the income and type to the total scores
				if(color !== 'neutral'){
					['score', 'income', 'camp', 'castle', 'keep', 'tower'].each(function(score_type){
						stats.worlds[color].scores.Total[score_type] += stats.worlds[color].scores[map.type][score_type];
					});
				}

			});
		});
		return stats;
	},

	/**
	 * creates the stats object which holds the scores
	 * https://github.com/codemasher/gw2-wvwstats/blob/master/classes/gw2api.class.php#L302
	 *
	 * @returns object
	 */
	statsObject: function(){
		var obj = {
			match: {
				lastupdate: 0,
				id: '',
				region: 0,
				tier: 0,
				maps: {}
			},
			worlds: {}
		};

		// create base arrays for each color
		['red', 'blue', 'green', 'neutral'].each(function(color){
			// base objective and bonuses arrays
			obj['worlds'][color] = {
				bonus: {
					bloodlust: []
				},
				objectives: {}
			};

			if(color !== 'neutral'){
				obj['worlds'][color]['id'] = 0;
				obj['worlds'][color]['name'] = null;
				obj['worlds'][color]['scores'] = {};

				// create the scores array for each color except neutral
				['RedHome', 'BlueHome', 'GreenHome', 'Center', 'Total'].each(function(type){
					obj['worlds'][color]['scores'][type] = {
						score: 0,
						income: 0,
						camp: 0,
						castle: 0,
						keep: 0,
						ruin: 0,
						tower: 0
					};
				})
			}
		});
		return obj;
	}

};

