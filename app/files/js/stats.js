/**
 * Created by Smiley on 11.09.14.
 */

(function(){
	document.observe('dom:loaded', function(){

		WvW.refreshMatches();
		var config = localStorage.GW2LocationTracker.evalJSON(true);
		var match = localStorage.GW2LocationCurrentWvWMatch.evalJSON(true);
		var matchdata = localStorage.GW2LocationWvWMatches.evalJSON(true);

		$('stats-toggle-overall').down().update(i18n[config.lang].regions[match.region]+', '+i18n[config.lang].ui.text.tier+' '+match.tier)
			.insert(new Element('span', {'class': 'countdown'}).countdown(matchdata.times[match.region].end));

		$$('.toggle').invoke('observe', 'click', function(){
			Effect.toggle(this.dataset.toggle, 'blind');
		});

		$('stats-toggle-objective').down().update(i18n[config.lang].ui.text.objectives);

		if(match.match_id){
			['green', 'blue', 'red'].each(function(color){
				var worldname = Worlds[matchdata.matches[match.region][match.tier][color]].name[config.lang];

				$$('#overall-'+color+' > .name')[0].update(worldname);
				$('stats-toggle-'+color).down().update(worldname);

				['GreenHome', 'BlueHome', 'RedHome', 'Center', 'Total'].each(function(mapScore){
					var mapname;
					if(phpjs.in_array(mapScore, ['GreenHome', 'BlueHome', 'RedHome'])){
						mapname = Worlds[matchdata.matches[match.region][match.tier][mapScore.toLowerCase().replace('home', '')]].name[config.lang];
						mapname = phpjs.sprintf(i18n[config.lang].ui.text.wvw_border, mapname);
					}
					else if(mapScore === 'Center'){
						mapname = i18n[config.lang].ui.text.wvw_eb;
					}
					else{
						// todo: i18n
						mapname = 'Total';
					}

					$$('#stats-'+color+' .name.'+mapScore)[0].update(mapname);
//					if(mapScore !== 'Total'){
//						$$('#stats-toggle-objective-'+mapScore+' > div')[0].update(mapname);
//					}
				});
			});
		}

		var tsort = function(element, rows, col, dir){
			if(!(element = $(element))){
				return;
			}

			if(!(rows = element.select(rows))){
				return;
			}

			rows.sort(function(a, b){
				a = parseInt(a.childElements()[col].innerText);
				b = parseInt(b.childElements()[col].innerText);
				if(isNaN(a)){
					a = 0;
				}
				if(isNaN(b)){
					b = 0;
				}
				return a-b;
			});

			if(dir === 'desc'){
				rows.reverse();
			}

			rows.each(function(row){
				element.appendChild(row);
			});

		};

		var ojectiveCheck = [];

		// will cause some cpu load on < 3s refresh...
		var statsUpdater = function(){
			if(match.match_id){
				var stats = localStorage['GW2LocationWvWStats_'+match.match_id].evalJSON(true);

				// todo: de-uglyfy primary stats table, add bloodlust
				['green', 'blue', 'red'].each(function(color){
					// update overall stats
					$$('#overall-'+color+' > .score')[0].update(stats.worlds[color].scores.Total.score);
					$$('#overall-'+color+' > .income')[0].update(stats.worlds[color].scores.Total.income);

					// sort the table by score
					tsort('stats-overall', 'tr', 1, 'desc');

					['GreenHome', 'BlueHome', 'RedHome', 'Center', 'Total'].each(function(mapScore){
						['income', 'camp', 'tower', 'keep', 'castle', 'score'].each(function(type){
							$$('#stats-'+color+' .'+type+'.'+mapScore)[0].update(stats.worlds[color].scores[mapScore][type]);
						});
					});

					// -> Object.observe
					// todo: fix guild claims
					$H(stats.worlds[color].objectives).each(function(objective){
						if(Objectives[objective.key].type !== 'ruin'){

							if(ojectiveCheck.indexOf(objective.key) === -1){

								var claimed = new Element('img', {'src': 'img/guild.png', 'class': 'claimed'});
//								if(objective.value.owner.id === ''){
									claimed.hide();
//								}

								var container = new Element('div', {'id': Objectives[objective.key].type+objective.key, 'data-color': color, 'data-owner': objective.value.owner.id})
									.insert(new Element('div')
										.insert(new Element('img', {'src':'img/wvw/'+Objectives[objective.key].type+'_l.png'}))
										.insert(claimed)
										.insert(new Element('span').update(Objectives[objective.key].name[config.lang]))
									)
									.insert(new Element('div')
										.insert(new Element('span', {'class': 'captime'}).update('-'))
										.insert(new Element('span', {'class': 'countdown'}))
									);

								$$('.objectives .'+color)[0].insert({top: container});//.'+Objectives[objective.key].map+'
								ojectiveCheck.push(objective.key);
							}
							else{
								var obj = $(Objectives[objective.key].type+objective.key);
								if(obj.dataset.color !== color){
									var now = phpjs.time();
									obj.dataset.color = color;

									obj.down('.captime').update(phpjs.date('H:i:s', now)).next('.countdown').countdown(now+300);
/*
									if(obj.dataset.owner !== objective.value.owner.id && objective.value.owner.id.length === 36){
										obj.down('.claimed').show();
									}
									else{
										obj.down('.claimed').hide();
									}
*/
									$$('.objectives .'+color)[0].insert({top:obj}); //.'+Objectives[objective.key].map+'
								}
							}
						}
					});


				});
			}
		};

		statsUpdater();
		var interval = !config.statsInterval || phpjs.intval(config.statsInterval) <= 0 ? 1 : phpjs.intval(config.statsInterval);
		new PeriodicalExecuter(statsUpdater, interval);

	});
})();