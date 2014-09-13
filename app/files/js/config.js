/**
 * Created by Smiley on 31.08.14.
 */

(function(){
	document.observe('dom:loaded', function(){
		var config = localStorage.GW2LocationTracker.evalJSON(true);

		// check language radio inputs
		$('lang').previous('label').update(i18n[config.lang].ui.text.language);
		['de', 'en', 'es', 'fr'].each(function(lang){
			if(lang === config.lang){
				$('lang_'+lang).writeAttribute('checked', 'checked');
			}
		});


		// check the checkboxes
		['enableSender', 'enableReceiver'].each(function(val){
			if(config[val] === true){
				$(val).writeAttribute('checked', 'checked');
			}
		});


		// fill world select list
		$('worldID').insert(new Element('option', {'value': 0}).update('[none]'))
			.previous('label').update(i18n[config.lang].ui.text.homeworld);

		$H(Worlds).each(function(world){
			var option = new Element('option', {'value': world.key})
				.insert('['+(world.value.lang === 'us' ? 'NA' : 'EU')+'] ')
				.insert(world.value.name[config.lang]);
			if(phpjs.intval(world.key) === phpjs.intval(config.worldID)){
				option.writeAttribute('selected', 'selected');
			}
			$('worldID').insert(option);
		});


		// fill labels with the correct language snippets and insert current config values
		var configOptions =[
			'ajaxInterval', 'senderInterval', 'receiverInterval', 'statsInterval', 'ajaxUrl',
			'channelKey', 'guildName', 'guildID', 'accname', 'colorSelf', 'colorOnline',
			'colorAway', 'colorAfk', 'colorOffline', 'colorCommander', 'colorGuild',
			'enableSender', 'enableReceiver'
		];

		configOptions.each(function(option){
			var placeholder = i18n[config.lang].ui.text[option];

			if(option === 'accname'){
				placeholder += '.1234'
			}

			$(option)
				.writeAttribute('placeholder', placeholder)
				.writeAttribute('value', config[option])
				.previous('label').update(i18n[config.lang].ui.text[option]);
		});



		$('clear_matchdata').update('clear wvw matchdata').observe('click', function(){
			localStorage.GW2LocationWvWMatches = Object.toJSON({});
		});


		$('reset_config').update('restore default config').observe('click', function(){
			localStorage.GW2LocationTracker = Object.toJSON(defaultConfig);
		});


		// save the data
		$('save').update(i18n[config.lang].ui.btn.save).observe('click', function(event){
			Event.stop(event);

			var data = $('config').serialize(true);

			if(data.worldID > 1000 && data.worldID < 2000){
				data.regionID = 1;
			}
			else if(data.worldID > 2000 && data.worldID < 3000){
				data.regionID = 2;
			}

			// make sure these are integers
			['ajaxInterval', 'senderInterval', 'receiverInterval', 'statsInterval', 'worldID'].each(function(val){
				data[val] = phpjs.intval(data[val]);
			});

			// set boolean values for the checkboxes
			['enableSender', 'enableReceiver'].each(function(val){
				data[val] = !data[val] ? false : true;
			});

			data.cKeySHA1 = phpjs.sha1(data.channelKey);

			var guildUpdate = function(guild){
				data.guildID = guild.guild_id;
				data.guildName = guild.guild_name;
				data.guildTag = guild.tag;
			};

			// get guild data from the API
			if(data.guildName.length > 0){
				ajaxRequest('https://api.guildwars2.com/v1/guild_details.json', 'get', false, {'guild_name': data.guildName}, function(request){
					if(request.responseJSON.guild_id){
						guildUpdate(request.responseJSON);
					}
				});
			}
			// save an empty guild
			else{
				guildUpdate({
					guild_id: '00000000-0000-0000-0000-000000000000',
					guild_name: '',
					tag: ''
				});
			}

			$('guildName').value = data.guildName;
			$('guildID').value = data.guildName;

			Object.extend(defaultConfig, data || {});

//			console.log(defaultConfig);
			localStorage.GW2LocationTracker = Object.toJSON(defaultConfig);
			$('message').update(i18n[config.lang].ui.text.restart);
			OW.closeWindow.delay(3);

		});

		// just close the window on cancel
		$('cancel').update(i18n[config.lang].ui.btn.cancel).observe('click', function(event){
			Event.stop(event);
			OW.closeWindow();
		});

	});
})();
