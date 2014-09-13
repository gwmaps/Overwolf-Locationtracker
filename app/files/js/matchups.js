/**
 * Created by Smiley on 01.09.14.
 */

(function(){
	document.observe('dom:loaded', function(){
		// create overlay
		var o = new Element('div', {'id': 'overlay'});
		var overlay = new Overlay(o);
		$$('body')[0].insert({top: o});

		WvW.refreshMatches();
		var config = localStorage.GW2LocationTracker.evalJSON(true);
		var matchdata = localStorage.GW2LocationWvWMatches.evalJSON(true);

		var miniStats = function(data){
			var container = new Element('div', {'id': 'ministats'});

			if(!data || !data.match_id){
				return container.update('no data received');
			}

			data = WvW.parseStats(data);

			// now here the world colors in order according to rank order
			['green', 'blue', 'red'].each(function(color){
				var table = new Element('table', {'class':'stats-table ' + color});

				table.insert(new Element('tr').insert(new Element('td', {'colspan': 7}).update(Worlds[data.worlds[color].id].name[config.lang])));
				table.insert(new Element('tr')
					.insert(new Element('td').update(''))// todo: i18n
					.insert(new Element('td').update(''))
					.insert(new Element('td').update(new Element('img',{'src':'img/wvw/camp_l.png'})))
					.insert(new Element('td').update(new Element('img',{'src':'img/wvw/tower_l.png'})))
					.insert(new Element('td').update(new Element('img',{'src':'img/wvw/keep_l.png'})))
					.insert(new Element('td').update(new Element('img',{'src':'img/wvw/castle_l.png'})))
					.insert(new Element('td').update(''))
				);

				['GreenHome', 'BlueHome', 'RedHome', 'Center', 'Total'].each(function(mapScore){
					var mapname = 'Total';
					if(phpjs.in_array(mapScore, ['GreenHome', 'BlueHome', 'RedHome'])){
						mapname = phpjs.sprintf(i18n[config.lang].ui.text.wvw_border, Worlds[data.match.maps[mapScore]].name[config.lang]);
					}
					else if(mapScore === 'Center'){
						mapname = i18n[config.lang].ui.text.wvw_eb;
					}

					var score = data.worlds[color].scores[mapScore];

					table.insert(new Element('tr')
						.insert(new Element('td').update(mapname))
						.insert(new Element('td').update(score.income))
						.insert(new Element('td').update(score.camp))
						.insert(new Element('td').update(score.tower))
						.insert(new Element('td').update(score.keep))
						.insert(new Element('td').update(score.castle))
						.insert(new Element('td').update(score.score))
					);

				});

				container.insert(table);
			});
			return container;
		};

		var showStats = function(){
			var matchID = this.dataset.match;
			var ajaxCallback = function(request){
				var json = request.responseJSON;
				if(json.match_id){
					localStorage['GW2LocationWvWStats_'+matchID] = Object.toJSON(json);
				}
				else{
					// no data received? lets check if we have some older stats available
					json = localStorage['GW2LocationWvWStats_'+matchID].evalJSON(true);
				}
				overlay.showOverlay(miniStats(json));
			};
			ajaxRequest('https://api.guildwars2.com/v1/wvw/match_details.json', 'get', true, {match_id: matchID}, ajaxCallback);
		};

		$H(matchdata.matches).each(function(region){
			var container = new Element('div', {'class': 'matchup-table', 'id': 'matchups-'+region.key});
			$H(region.value).each(function(match){
				var row = new Element('div', {'class': 'table-row', 'data-match': region.key+'-'+match.key})
					.insert(new Element('div', {'class': 'table-cell neutral'}).update(match.key))
					.observe('click', showStats);
				$H(match.value).each(function(world){
					var cell = new Element('div', {'class': 'table-cell '+world.key}).update(Worlds[world.value].name[config.lang]);
					row.insert(cell);
				});
				container.insert(row);
			});
			$('container').insert(new Element('div', {'class': 'region-header neutral'}).insert(new Element('span').update(i18n[config.lang].regions[region.key])))
				.insert(new Element('div', {'class': 'region-countdown neutral'}).insert(new Element('span').countdown(matchdata.times[region.key].end)))
				.insert(container);
		});

	});
})();
