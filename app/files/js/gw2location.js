/*!
 * gw2location.js
 * Created by Smiley on 07.10.13.
 *
 * based on the GW2 Map tile service (https://tiles.guildwars2.com/)
 * using the Google Maps API (https://developers.google.com/maps/)
 * and the Mumble positional audio API (http://mumble.sourceforge.net/Positional-Audio)
 *
 * used libraries:
 * prototype.js (http://prototypejs.org/)
 * scriptaculous (http://script.aculo.us/)
 * excerpts of phpJS (http://phpjs.org/)
 * Object.observe polyfill (https://github.com/jdarling/Object.observe)
 * and of course the Overwolf API
 *
 * initial example code on GitHub (https://github.com/codemasher/gw2api-tools)
 * Location Sender source on CodePlex (https://gw2apicpp.codeplex.com/)
 *
 *
 * Hope you like vogon poetry...
 */


// one ugly code block, wrapped in a closure for memory's sake
(function(){
	navigator.plugins.refresh(true);
	document.observe('dom:loaded', function(){

		/**
		 * some DOM manipulations
		 */


		// create overlay & menu
//		var overlay = new Element('div', {'id': 'overlay'}).hide();
//		$$('body')[0].insert({top: overlay});

//		var slider = new Element('div', {'class': 'slider'});
//		var handle = new Element('div', {'class': 'handle'});

		var nav = new Element('nav', {'class': 'table-cell', 'id': 'nav'});
		var menu = new Element('div', {'class': 'table-row', 'id': 'menu'})
				.insert(nav)//.update('&nbsp;')
//			.insert(new Element('div', {'class':'table-cell', 'id':'opacity'}).update(new Element('div').update(slider.insert(handle))))
//			.insert(new Element('div', {'class':'table-cell', 'id':'move'}).update('<a>move</a>').observe('mousedown', OW.dragMove))// todo: i18n
//			.insert(new Element('div', {'class':'table-cell', 'id':'close'}).update('<a>X</a>').observe('mousedown', OW.closeWindow))
//			.insert(new Element('div', {'class':'table-cell', 'id':'resize'}).observe('mousedown', function(){OW.dragResize('TopRight');}))
			;

//		overlay.insert({after: menu});

		$$('body')[0].insert({top: menu});

/*
		// opacity slider for borderless mode
		var range = $R(50, 100);
		new Control.Slider(handle, slider, {
			range: range,
			values: $A(range),
			sliderValue: 100,
			onSlide: function(value){
				console.log(value);
				$('page').setStyle({'opacity': value/100});
			},
			onChange: function(value){
				console.log(value);
				$('page').setStyle({'opacity': value/100});
			}
		});
*/

		// magically resize the containers to not show scrollbars
		var resizeContainer = function(){
			var layout = new Element.Layout('menu', true);
			menu = layout.get('height');
			var height = document.viewport.getDimensions().height-menu;

			$('container').setStyle({height: height+'px'});
			$('map-controls').setStyle({height: height+'px', top: menu+'px'});
		};

		window.onresize = resizeContainer;
		resizeContainer();


		// set some default options if no config available
		if(!localStorage.GW2LocationTracker){
			localStorage.GW2LocationTracker = Object.toJSON(defaultConfig);
			OW.openWindow('config');
		}


		// retrieve the config
		var config = localStorage.GW2LocationTracker.evalJSON(true);


		// create the matchdata storage
		localStorage.GW2LocationWvWMatches = Object.toJSON({});
		if(!localStorage.GW2LocationCurrentWvWMatch){
			localStorage.GW2LocationCurrentWvWMatch = Object.toJSON({
				region: 0,
				tier: 0,
				match_id: false
			});
		}


		// populate the main navigation
		['config', 'stats', 'matchups', 'help'].each(function(item){
			nav.insert(new Element('a').update(i18n[config.lang].ui.nav[item]).observe('click', function(){
				OW.openWindow(item);
			}));
		});

		nav.insert(new Element('a', {'id': 'sidebar'}).update(i18n[config.lang].ui.nav.sidebar).observe('click', function(){
			Effect.toggle('map-controls', 'appear');
		}));


		// listen to the map-control select buttons
		['players', 'objectives', 'log'].each(function(item){
			$('tab-'+item).update(i18n[config.lang].ui.text[item]).observe('click', function(){
				$$('#map-controls-select > div').invoke('removeClassName', 'selected');
				this.addClassName('selected');
				$$('#map-controls > div:not(#map-controls-select)').invoke('hide');
				$(this.dataset.toggle).show();
			});
		});


		// listen to the map control headers
		$$('.controls-header').invoke('observe', 'click', function(){
			Effect.toggle(this.next('.controls-body'), 'blind');
		});


		// add a "follow player" button
		$('map-players').insert({
			top: new Element('div', {'id': 'follow', 'class': '', 'data-player': ''})
				.update(i18n[config.lang].ui.text.followmode)
				.observe('click', function(){
					this.toggleClassName('follow-enabled');
				})
		});


		// populate the objective map control
		var objectiveOrder = [
			9,
			3, 11,12,13,14, 4,10, // green
			2, 15,16,21,22, 7,8, // blue
			1, 17,18,19,20, 5,6, // red
			// borderlands towers and camps ordered cw, starting north
			46,44,41, 57,42,45,47, 56,54,55,43,49,48, 75,74,72,73,76, // green
			23,27,31, 28,26,25,30, 29,60,61,24,59,58, 70,69,67,68,71, // blue
			37,33,32, 40,36,35,38, 39,51,50,34,53,52, 63,64,66,65,62 // red
		];

		objectiveOrder.each(function(id){
			var objective = Objectives[id];
			$(objective.map).insert(
				new Element('div', {'id': objective.type+id}) //, 'data-id':id, 'data-type':objective.type, 'data-pos-x': objective.coords[0], 'data-pos-y': objective.coords[1]
					.insert(new Element('div')
						.insert(new Element('img', {'src': 'img/wvw/'+(objective.type === 'ruin' ? objective.name.en.replace(/[\s']/g, '')+'_neutral' : objective.type+'_l')+'.png'}))
						.insert(new Element('img', {'src': 'img/guild.png', 'class': 'claimed'}).hide())
						.insert(objective.name[config.lang])
						.insert(new Element('span', {'class': 'countdown'}))
					)
			);
		});


		// add the mumble object
		var mumbleObject = new Element('object', {
			'id': 'mumble',
			'type': 'application/x-mumble-link'
		});

		$$('body')[0].insert({'bottom': mumbleObject});


		/**
		 * Google map stuff
		 */

		// gw2 wvw map settings
		var maxZoom = 6;
		var clamp = [
			[5118, 6922],
			[16382, 16382]
		];

		/**
		 * translate lat/lng coordinates to pixel values
		 *
		 * @param {google.maps.latlng} ll
		 * @param {number} max_zoom
		 * @returns {google.maps.Point}
		 */
		var fromLatLngToPoint = function(ll, max_zoom){
			var bound = function(value, min, max){
				if(min != null){
					value = Math.max(value, min);
				}
				if(max != null){
					value = Math.min(value, max);
				}
				return value;
			};
			var point = new google.maps.Point(0, 0);
			var origin = new google.maps.Point(128, 128);
			var tiles = 1 << max_zoom;
			var sin_y = bound(Math.sin(ll.lat()*(Math.PI/180)), -0.9999, 0.9999);
			point.x = origin.x+ll.lng()*(256/360);
			point.y = origin.y+0.5*Math.log((1+sin_y)/(1-sin_y))* -(256/(2*Math.PI));
			return new google.maps.Point(Math.floor(point.x*tiles), Math.floor(point.y*tiles));
		};

		/**
		 * translate pixel values to GMaps lat/lng
		 *
		 * @param {google.maps.Point} point
		 * @param {number} max_zoom
		 * @returns {google.maps.LatLng}
		 */
		var fromPointToLatLng = function(point, max_zoom){
			var size = (1 << max_zoom)*256;
			var lat = (2*Math.atan(Math.exp((point.y-size/2)/ -(size/(2*Math.PI))))-(Math.PI/2))*(180/Math.PI);
			var lng = (point.x-size/2)*(360/size);
			return new google.maps.LatLng(lat, lng);
		};

		/**
		 * a shorthand for the latlng to point conversion
		 * @param {google.maps.LatLng} latlng
		 * @returns {google.maps.Point}
		 */
		var ll2p = function(latlng){
			return fromLatLngToPoint(latlng, maxZoom);
		};

		/**
		 * same as before, just vice versa
		 * @param {google.maps.Point} point
		 * @returns {google.maps.LatLng}
		 */
		var p2ll = function(point){
			return fromPointToLatLng(point, maxZoom);
		};


		// create the map container
		var map = new google.maps.Map($('map-canvas'), {
			zoom: 3,
			minZoom: 2,
			maxZoom: maxZoom,
			center: p2ll(new google.maps.Point(10500, 12200)),
			streetViewControl: false,
			mapTypeId: 'wvw',
			mapTypeControlOptions: {
				mapTypeIds: []//'wvw'
			}
		});


		// set the image map type
		map.mapTypes.set('wvw', new google.maps.ImageMapType({
			maxZoom: maxZoom,
			alt: 'WvW',
			name: 'WvW',
			tileSize: new google.maps.Size(256, 256),
			getTileUrl: function(coords, zoom){
				var project = function(point){
					var div = 1 << (maxZoom-zoom);
					return [point[0]/div, point[1]/div];
				};
				var nw = project(clamp[0]);
				var se = project(clamp[1]);
				if(coords.x < Math.ceil(se[0]/256)
					&& coords.y < Math.ceil(se[1]/256)
					&& coords.x >= Math.floor(nw[0]/256)
					&& coords.y >= Math.floor(nw[1]/256)
					){
					return 'https://tiles.guildwars2.com/2/3/'+zoom+'/'+coords.x+'/'+coords.y+'.jpg';
				}
				return 'img/blank.png';
			}
		}));


		// limit panning
		// http://stackoverflow.com/a/16939440/3185624
		var lastValidCenter = map.getCenter();
		var allowedBounds = new google.maps.LatLngBounds(
			// decreased bound size for clamped view
			p2ll(new google.maps.Point(clamp[0][0]+900, clamp[1][1]-750)), //W,S
			p2ll(new google.maps.Point(clamp[1][0]-1300, clamp[0][1]+750)) //E,N
		);
		var boundLimits = {
			maxLat: allowedBounds.getNorthEast().lat(),
			maxLng: allowedBounds.getNorthEast().lng(),
			minLat: allowedBounds.getSouthWest().lat(),
			minLng: allowedBounds.getSouthWest().lng()
		};

		google.maps.event.addListener(map, 'center_changed', function(){
			var center = map.getCenter();
			if(allowedBounds.contains(center)){
				lastValidCenter = map.getCenter();
				return;
			}
			var newLat = lastValidCenter.lat();
			var newLng = lastValidCenter.lng();
			if(center.lng() > boundLimits.minLng && center.lng() < boundLimits.maxLng){
				newLng = center.lng();
			}
			if(center.lat() > boundLimits.minLat && center.lat() < boundLimits.maxLat){
				newLat = center.lat();
			}
			map.panTo(new google.maps.LatLng(newLat, newLng));
		});


		// global info window
		var popup = new google.maps.InfoWindow();
		google.maps.event.addListener(map, 'click', function(){
			popup.close();
		});

/*
		// add a click-listener and show the original and calculated coordinates for debug purposes
		google.maps.event.addListener(map, 'click', function(e){
			var latlng2pixel = ll2p(e.latLng);
			var pixel2latlng = p2ll(latlng2pixel);
			popup.setContent('latlng:'+e.latLng.toString()+'<br />pixel:'+latlng2pixel.toString()+'<br />latlng:'+pixel2latlng.toString()+' (from pixel)');
			popup.setPosition(e.latLng);
			popup.open(map);
		});
*/


		/**
		 * GW2 API/WvW stuff
		 */

		// refresh match data
		WvW.refreshMatches.delay(1);
		new PeriodicalExecuter(WvW.refreshMatches, 300);


		var interval;

		var objectiveList = {};
		var objectiveMarkers = {};
		var objectivePopups = {};

		var playerList = {};
		var playerMarkers = {};
		var playerPopups = {};

		var matchMaps = {};
		var guildList = {};


		/**
		 * guild data updater
		 *
		 * @param id
		 * @param async
		 */
		var getGuild = function(id, async){
			if(!guildList[id]){
				ajaxRequest('https://api.guildwars2.com/v1/guild_details.json', 'get', async, {guild_id: id}, function(request){
					var json = request.responseJSON;
					if(json && json.guild_id){
						guildList[json.guild_id] = {
							name: json.guild_name,
							tag: json.tag
						};
					}
				});
			}
		};

		/**
		 * logger
		 *
		 * @param type
		 * @param color
		 * @param image
		 * @param msg
		 */
		var addLog = function(type, color, image, msg){
			var header = new Element('div', {'class': color});
			var body = new Element('div', {'class': 'neutral'});
			var container = new Element('div', {'class': 'log-entry log-'+type}).insert(header).insert(body);

			if(image){
				header.insert(new Element('img', {'src': image}));
			}
			header.insert(new Element('span').update(phpjs.date('H:i:s')));
			body.update(msg);

			$('map-log').insert({top: container});

			// experimental, may cause instability because of a crapload event listeners
			$$('.objective-text').invoke('stopObserving').invoke('observe', 'click', function(){
				popup.setContent(objectivePopups[this.dataset.id]);
				popup.open(map, objectiveMarkers[this.dataset.id]);
				map.panTo(p2ll(new google.maps.Point(this.dataset.posX, this.dataset.posY)));
			});
		};


		// populate map names and change them on match update
		$('center-header').update(i18n[config.lang].ui.text.wvw_eb);
		Object.observe(matchMaps, function(changes){
			changes.forEach(function(change){
				if(change.type === 'add' || change.type === 'update'){
					var name;
					if(!matchMaps[change.name]){
						name = ('-'+change.name).camelize(); // cheap ucfirst()
					}
					else{
						name = Worlds[matchMaps[change.name]].name[config.lang];
					}
					$(change.name+'-header').update(phpjs.sprintf(i18n[config.lang].ui.text.wvw_border, name));
				}
			});
		});


		/**
		 * follow mode
		 */
		var followPlayer = function(){
			var follow = $('follow');
			if(follow.hasClassName('follow-enabled') && follow.dataset.player.length === 40){
				var player = $(follow.dataset.player);
				if(player){
					map.panTo(p2ll(new google.maps.Point(player.dataset.posX, player.dataset.posY)));
				}
			}
		};

		new PeriodicalExecuter(followPlayer, 3);


		// draw the matchdata on the map, change the objective list, log match related events
		Object.observe(objectiveList, function(changes){
			changes.forEach(function(change){
				var id = change.name;
				var old = change.oldValue;
				var current = objectiveList[id];
				var obj = Objectives[id];
				var listElement = $(obj.type+id);

				// get guild data from the API
				// synchronous request, may block loading for a while on startup but makes sure we get the data
				if(!guildList[current.owner.id] && current.owner.id.length === 36){
					getGuild(current.owner.id, false);
				}

				if(old && !guildList[old.owner.id] && old.owner.id.length === 36){
					getGuild(old.owner.id, false);
				}

				if(change.type === 'add'){

					var pos = p2ll(new google.maps.Point(obj.coords[0], obj.coords[1]));

					// create a new marker
					objectiveMarkers[id] = new google.maps.Marker({
						map: map,
						title: obj.name[config.lang],
						position: pos,
						animation: google.maps.Animation.DROP
					});

					// listen to that marker
					google.maps.event.addListener(objectiveMarkers[id], 'click', function(){
						popup.setContent(objectivePopups[id]);
						popup.open(map, objectiveMarkers[id]);
					});

					// also color the list element and listen to it
					listElement.observe('click', function(){
						popup.setContent(objectivePopups[id]);
						popup.open(map, objectiveMarkers[id]);
						map.panTo(pos);
					}).down().addClassName(current.color);

					if(current.owner.id !== ''){
						listElement.down('.claimed').show();
					}

				}
				else if(change.type === 'update'){

					if(current.color !== old.color){
						// flip color in the objective list
						listElement.down().removeClassName(old.color).addClassName(current.color);

						// attach a timer to the objective
						// todo: prevent attaching timers on match reset
						if(obj.type !== 'ruin' && current.color !== 'neutral'){
							listElement.down('.countdown').countdown(phpjs.time()+300);
						}
					}

					if(current.owner.id !== old.owner.id){
						if(current.owner.id === ''){
							listElement.down('.claimed').hide();
						}
						else{
							listElement.down('.claimed').show();
						}
					}


					var msg;

					// walk the extra mile to get the home map name
					var mapName = obj.map;
					mapName = mapName.toLowerCase().replace('home', '');
					mapName = obj.map === 'Center'
						? i18n[config.lang].ui.text.wvw_eb
						: phpjs.sprintf(i18n[config.lang].ui.text.wvw_border, Worlds[matchMaps[mapName]].name[config.lang]);

					var objective = '<span class="objective-text" data-id="'+id+'" data-pos-x="'+obj.coords[0]+'" data-pos-y="'+obj.coords[1]+'">'+obj.name[config.lang]+'</span>';

					// non-ruin objective was captured
					if(obj.type !== 'ruin' && current.color !== old.color && current.color !== 'neutral' && old.color !== 'neutral'){
						msg = phpjs.sprintf(i18n[config.lang].ui.text.capture,
							'<span class="'+current.color+'-text">'+Worlds[current.world].name[config.lang]+'</span>',
							objective,
							'<span class="'+old.color+'-text">'+Worlds[old.world].name[config.lang]+'</span>');
						msg += '<span> ('+mapName+')</span>';

						addLog('objective', current.color, 'img/wvw/'+obj.type+'_l.png', msg);
					}

					// objective was (un)claimed
					if(obj.type !== 'ruin' && current.owner.id !== old.owner.id && current.color === old.color){
						// claim
						if(current.owner.id.length === 36 && guildList[current.owner.id] && old && old.owner.id.length === 0){
							msg = phpjs.sprintf(i18n[config.lang].ui.text.claim,
								'<span class="'+current.color+'-text">'+guildList[current.owner.id].name+' ['+guildList[current.owner.id].tag+']'+'</span>', objective);
						}
						// unclaim
						else if(current.owner.id.length === 0 && old && old.owner.id.length === 36 && guildList[old.owner.id]){
							msg = phpjs.sprintf(i18n[config.lang].ui.text.unclaim,
								'<span class="'+current.color+'-text">'+guildList[old.owner.id].name+' ['+guildList[old.owner.id].tag+']'+'</span>', objective);
						}
						// tradeover - may happen rarely
						else if(current.owner.id.length === 36 && guildList[current.owner.id] && old && old.owner.id.length === 36 && guildList[old.owner.id]){
							msg = phpjs.sprintf(i18n[config.lang].ui.text.unclaim,
								'<span class="'+current.color+'-text">'+guildList[old.owner.id].name+' ['+guildList[old.owner.id].tag+']'+'</span>',
								objective, '<span class="'+current.color+'-text">'+guildList[current.owner.id].name+' ['+guildList[current.owner.id].tag+']'+'</span>');
						}
						// should not happen at all
						else{
							console.log(current.owner, old.owner);
							console.table(guildList);
						}

						msg += '<span> ('+mapName+')</span>';

						addLog('objective', current.color, 'img/guild.png', msg);
					}

					// ruin capture
					if(obj.type === 'ruin' && current.color !== 'neutral'){
						msg = phpjs.sprintf(i18n[config.lang].ui.text.ruinCapture,
							'<span class="'+current.color+'-text">'+Worlds[current.world].name[config.lang]+'</span>', objective);
						msg += '<span> ('+mapName+')</span>';

						addLog('objective', current.color, 'img/wvw/'+obj.name.en.replace(/[\s']/g, '')+'_neutral.png', msg);
					}

				}

				// set the marker icon
				objectiveMarkers[id].setIcon({
					// ugly workaround for the stupid ruins & their icons
					url: 'img/wvw/'+(obj.type === 'ruin' ? obj.name.en.replace(/[\s']/g, '') : obj.type)+'_'+current.color+'.png',
					size: new google.maps.Size(26, 26),
					anchor: new google.maps.Point(13, 13)
				});


				// create the popup content
				var objectivePopup = function(){
					var content = new Element('table', {'class':'popup'});
					content.insert(new Element('tr')
						.insert(new Element('td')
							.insert(new Element('img', {'src':'img/wvw/'+(obj.type === 'ruin' ? obj.name.en.replace(/[\s']/g, '')+'_neutral' : obj.type)+'.png'}))
							.insert(obj.name[config.lang])
						)
					);
					if(guildList[current.owner.id]){
						content.insert(new Element('tr').insert(new Element('td').update(guildList[current.owner.id].name+'['+guildList[current.owner.id].tag+']')));
					}
					return content;
				};

				objectivePopups[id] = objectivePopup();

			});
		});


		/**
		 * retrieves match details from the API for the configured home world
		 *
		 * @param pe
		 */
		var getMatchDetails = function(pe){
			var match = localStorage.GW2LocationCurrentWvWMatch.evalJSON(true);
			if(phpjs.intval(config.worldID) === 0 || !match || !match.match_id){

				// draw the objectives in neutral state
				$H(Objectives).each(function(objective){
					objectiveList[objective.key] = {
						owner: {'id': '', 'name': '', 'tag': ''},
						world: false,
						color: 'neutral'
					};
				});

				// trigger the name update
				['red', 'blue', 'green'].each(function(color){
					matchMaps[color] = false;
				});

				// stop the execution since nothing will change anyway
				if(pe){
					pe.stop()
				}

			}
			else{
				var ajaxCallback = function(request){
					var json = request.responseJSON;

					// is it really the match we want?
					if(json.match_id && json.match_id === match.match_id){
						var stats = WvW.parseStats(json);

						// save the current match stats for use in the stats window
						localStorage['GW2LocationWvWStats_'+match.match_id] = Object.toJSON(stats);

						['red', 'blue', 'green', 'neutral'].each(function(color){
							$H(stats.worlds[color].objectives).each(function(objective){
								var old = objectiveList[objective.key];
								var current = objective.value;

								// add some helpful values for use in the objectiveList/observer
								current.world = stats.worlds[color].id || false;
								current.color = color;

								// todo: bulk request in case API v2 is released one day
/*
								// get guild data from the API (may slow things down...)
								if(old && old.owner.id && old.owner.id.length === 36){
									getGuild(old.owner.id, false);
								}

								if(current.owner.id.length === 36){
									getGuild(current.owner.id, false);
								}
*/
								// check if the object exists or has changed
								if(!old || Object.toJSON(old) !== Object.toJSON(current)){
									// trigger map update
									objectiveList[objective.key] = current;
								}

								// trigger the home map name update
								if(color !== 'neutral'){
									matchMaps[color] = stats.worlds[color].id;
								}

							});
						});

					}
				};

				ajaxRequest('https://api.guildwars2.com/v1/wvw/match_details.json', 'get', true, {match_id: match.match_id}, ajaxCallback);
			}
		};

		getMatchDetails.delay(2);
		interval = !config.ajaxInterval || phpjs.intval(config.ajaxInterval) <= 0 ? 5 : phpjs.intval(config.ajaxInterval);
		new PeriodicalExecuter(getMatchDetails, interval);

		/**
		 * Player data
		 */

		// todo: do a proper fix for the playerlist/me overwrite bug.

		// Observe the player object and update the playerlist and markers
		Object.observe(playerList, function(changes){
			changes.forEach(function(change){
				var id = change.name;
				var old = change.oldValue;
				var current = playerList[id];
				var accname = phpjs.sha1(config.accname);
				// todo: add logging

				// just delete that player marker and continue with next
				if(change.type === 'delete'){
					if($('follow').dataset.player === id){
						$('follow').dataset.player = '';
					}
					$(id).stopObserving().remove();
					playerMarkers[id].setMap(null);
					delete playerMarkers[id];
					return;
				}

				// create a new player
				if(change.type === 'add'){

					// add a marker for the new player
					playerMarkers[id] = new google.maps.Marker();

					//listen to that marker
					google.maps.event.addListener(playerMarkers[id], 'click', function(){
						popup.setContent(playerPopups[id]);
						popup.open(map, playerMarkers[id]);
					});

					// create a new player list entry
					var playerListItem = new Element('div', {'id': id, 'data-pos-x': current.pos[0], 'data-pos-y': current.pos[1]})
						.insert(new Element('div').toggleClassName('commander', current.commander)
							.insert(new Element('img', {'class': 'profession', 'src': 'img/profession/'+professionIcons[current.profession], 'alt': current.charname}))
							.insert(new Element('span').update(current.charname+(current.guild.tag ? ' ['+current.guild.tag+']' : ''))
							)
						)
						.observe('click', function(){

							// update the "follow player" id
							$('follow').dataset.player = this.id;

							// change the selected item state
							$$('#map-players > div > div > div').invoke('removeClassName', 'selected');
							this.down().addClassName('selected');

							// update and open the popup
							popup.setContent(playerPopups[id]);
							popup.open(map, playerMarkers[this.id]);

							// move to player
							map.panTo(p2ll(new google.maps.Point(this.dataset.posX, this.dataset.posY)));
						});

					// insert/move the to the correct list
					if(id === accname){
						$('me').insert(playerListItem);
					}
					else if(id !== accname && current.guild.id === config.guildID){
						$('guild').insert(playerListItem);
					}
					else{
						$('others').insert(playerListItem);
					}
				}

				// get the existing player
				else if(change.type === 'update'){

					// update player list data
					$(id).writeAttribute({'data-pos-x': current.pos[0], 'data-pos-y': current.pos[1]})
						.down().toggleClassName('commander', current.commander)
						.down('img').writeAttribute({'src': 'img/profession/'+professionIcons[current.profession], 'alt': current.charname})
						.next('span').update(current.charname+(current.guild.tag ? ' ['+current.guild.tag+']' : ''));

					// insert/move the to the correct list
					if(id === accname){
						$('me').insert($(id));
					}
					else if(id !== accname && current.guild.id === config.guildID){
						$('guild').insert($(id));
					}
					else{
						$('others').insert($(id));
					}
				}

				var pos = p2ll(new google.maps.Point(current.pos[0], current.pos[1]));

				// determine marker fill color
				var fillColor;
				if(current.commander && current.state === 0){
					fillColor = config.colorCommander;
				}
				else if(current.guild.id === config.guildID && current.state === 0 && id !== accname){
					fillColor = config.colorGuild;
				}
				else{
					fillColor = [config.colorOnline, config.colorAway, config.colorAfk, config.colorOffline][current.state];
				}

				// set the marker options
				playerMarkers[id].setPosition(pos);
				playerMarkers[id].setIcon({
					anchor: new google.maps.Point(10, 10),
					path: 'M 20,10 0,4 5,10 0,16 z', // marker icon - SVG path
					fillColor: '#'+fillColor,
					fillOpacity: 1.0,
					rotation: current.angle,
					strokeColor: '#000'
				});

				// assign map to marker only if it has none set (prevents marker flicker)
				if(!playerMarkers[id].getMap()){
					playerMarkers[id].setMap(map);
				}

				// update the popup content
				var playerPopup = function(){

					var mapname = current.map.name;

					// get correct borderland map name
					if(phpjs.in_array(current.map.id, [94, 95, 96])){
						mapname = Maps[current.map.id].map;
						// todo: i18n borderland color names
						mapname = mapname.replace('Home', '');

						var matchdata = localStorage.GW2LocationWvWMatches.evalJSON(true);

						$H(matchdata.matches).each(function(region){
							$H(region.value).each(function(match){
								if(phpjs.in_array(current.world.id, match.value)){
									mapname = Worlds[match.value[mapname.toLowerCase()]].name[config.lang];
								}
							});
						});

						mapname = phpjs.sprintf(i18n[config.lang].ui.text.wvw_border, mapname);
					}


					var professionCell = new Element('td', {'style': 'width: 44px; text-align: center;'}).update(new Element('img', {
						'src': 'img/profession/'+professionIcons[current.profession],
						'alt': i18n[config.lang].professions[current.profession],
						'style': 'width:36px; height: 36px;'
					}));

					var charCell = new Element('td').update(current.charname+'<br />'+
						mapname+', '+(current.world.id !== 0 ? Worlds[current.world.id].name[config.lang] : '')+'<br />'+
						phpjs.date('d.m.y - H:i:s', current.time)+'<br />'+
						current.pos.toString());

					var guildCell = new Element('td', {'colspan': 2, 'style': 'text-align: center;'})
						.update(current.guild.name+(current.guild.tag ? ' ['+current.guild.tag+']' : ''));

					return new Element('table', {'class':'popup'}).insert(new Element('tr').insert(professionCell).insert(charCell)).insert(new Element('tr').insert(guildCell));
				};


				playerPopups[id] = playerPopup();

			});
		});


		/**
		 * retrieves the playerlist from the location backend and draws markers for each of them
		 */
		var getPlayers = function(){

			var ajaxCallback = function(request){
				var json = request.responseJSON;
				var check = [];

				// loop through the result and add the player to the list
				$H(json).each(function(player){
					if(player.key.match(/^[a-f0-9]{40}$/i) && phpjs.in_array(player.value.map.id, [38, 94, 95, 96, 968])){
						if(!playerList[player.key] || Object.toJSON(playerList[player.key]) !== Object.toJSON(player.value)){
							playerList[player.key] = player.value;
						}
						check.push(player.key);
					}
				});

				// loop through the playerlist and remove any missing player
				$H(playerList).each(function(player){
					if(!phpjs.in_array(player.key, check)){
						delete playerList[player.key];
					}
				});

			};

			var params = {
				get: 'playerdata',
				key: config.cKeySHA1,
				continent: 2,
				lang: config.lang
			};

			ajaxRequest(config.ajaxUrl, 'post', true, {json: Object.toJSON(params)}, ajaxCallback);
		};

		if(config.enableReceiver){
			getPlayers.delay(3);
			interval = !config.ajaxInterval || phpjs.intval(config.receiverInterval) <= 0 ? 5 : phpjs.intval(config.receiverInterval);
			new PeriodicalExecuter(getPlayers, interval);
		}


		/**
		 * Location sender
		 */

		// todo: update local player pos in realtime from mumble data

		/**
		 * @param {array} continent_rect  taken from maps.json or map_floor.json
		 * @param {array} map_rect        taken from maps.json or map_floor.json
		 * @param {array} coords          from event_details.json or Mumble Link data.
		 * @returns {*[]}
		 */
/*
		var recalcCoords = function(continent_rect, map_rect, coords){
			return [
				Math.round(continent_rect[0][0]+(continent_rect[1][0]-continent_rect[0][0])*(coords[0]-map_rect[0][0])/(map_rect[1][0]-map_rect[0][0])),
				Math.round(continent_rect[0][1]+(continent_rect[1][1]-continent_rect[0][1])*(1-(coords[1]-map_rect[0][1])/(map_rect[1][1]-map_rect[0][1])))
			]
		};
*/

		/**
		 * the location sender which communicates with the backend server
		 */
		var locationSender = function(){
			if(navigator.mimeTypes['application/x-mumble-link']){
				OW.getGame(function(gameInfo){
					if(gameInfo.id === 78561 && gameInfo.isRunning){
						var mumble = mumbleObject.snapshot();
						var mod = function(a, b){
							return a < 0 ? a+b : a;
						};

						var characterData = {
							commander: false,
							map_id: 0,
							name: '',
							profession: 0,
							team_color_id: 0
						};

						if(mumble.identity.length > 2){
							Object.extend(characterData, mumble.identity.evalJSON(true));
						}

						// fix the broken world_id
						characterData.world_id = config.worldID;

						// GW2 Location sender compatible data block
						var data = {
							version: mumble.version,
							avatar_position: [
								phpjs.round(mumble.avatar.position.x*39.3701, 4),
								phpjs.round(mumble.avatar.position.z*39.3701, 4)
							],
							avatar_front: Math.round(mod(Math.atan2(mumble.avatar.front.z, mumble.avatar.front.x)*180/Math.PI, 360)),
							character_data: characterData,
							build: 0,
							account_name: config.accname,
							guild_id: config.guildID,
							channel_id: config.cKeySHA1,
							tracking: 0
						};
//						console.log(data);

						ajaxRequest(config.ajaxUrl, 'post', true, {data: Object.toJSON(data)}, function(request){
							//console.log(request.responseText);
						});
					}
				});
			}
		};

		if(config.enableSender){
			locationSender.delay(4);
			interval = !config.ajaxInterval || phpjs.intval(config.senderInterval) <= 0 ? 5 : phpjs.intval(config.senderInterval);
			new PeriodicalExecuter(locationSender, interval);
		}

	});
})();