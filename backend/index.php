<?php
/**
 * GW2 Location receiver/ajax backend
 *
 * @filesource index.php
 * @version    0.1.0
 * @link       https://github.com/codemasher/Overwolf-Locationtracker
 * @created    01.09.14
 *
 * @author     Smiley <smiley@chillerlan.net>
 * @copyright  Copyright (c) 2014 Smiley <smiley@chillerlan.net>
 * @license    http://opensource.org/licenses/mit-license.php The MIT License (MIT)
 */

// global settings
error_reporting(E_ALL);
date_default_timezone_set('UTC');
mb_internal_encoding('UTF-8');

/**
 * Unset unnessecary variables and throw an error if something attempts to set illegal/unwanted ones
 */

// Save some memory.. (since we don't use these anyway.)
unset($GLOBALS['HTTP_POST_VARS'], $GLOBALS['HTTP_POST_VARS']);
unset($GLOBALS['HTTP_POST_FILES'], $GLOBALS['HTTP_POST_FILES']);

// These keys shouldn't be set...ever.
if(isset($_REQUEST['GLOBALS']) || isset($_COOKIE['GLOBALS'])){
	exit('THE HIVE CLUSTER IS UNDER ATTACK');
}

// Same goes for numeric keys.
foreach(array_merge(array_keys($_POST), array_keys($_GET), array_keys($_FILES)) as $key){
	if(is_numeric($key)){
		exit('THE HIVE CLUSTER IS UNDER ATTACK');
	}
}

// Numeric keys in cookies are less of a problem. Just unset those.
foreach($_COOKIE as $key => $value){
	if(is_numeric($key)){
		unset($_COOKIE[$key]);
	}
}

// Get the correct query string.  It may be in an environment variable...
if(!isset($_SERVER['QUERY_STRING'])){
	$_SERVER['QUERY_STRING'] = getenv('QUERY_STRING');
}

/**
 * set include paths and load stuff
 */

define('BASEDIR', dirname(__FILE__).'/');
define('CLASSDIR', BASEDIR.'classes/');
define('INCLUDEDIR', BASEDIR.'inc/');

set_include_path(get_include_path().PATH_SEPARATOR.CLASSDIR.PATH_SEPARATOR.INCLUDEDIR);

spl_autoload_extensions('.class.php');
spl_autoload_register();

require_once(INCLUDEDIR.'config.inc.php');
require_once(INCLUDEDIR.'func_common.inc.php');

$db = new SQL();
$db->connect($mysql['server'], $mysql['user'], $mysql['password'], $mysql['dbname']);

$gw2api = new GW2API();


// the response array
$response = [];

/**
 * location receiver
 */
if(gpc_in('data', 'post')){
	$data = json_decode(gpc_in('data', 'post', 'raw'), true);

	if(!$data){
		// send a HTTP/500 along
		header('HTTP/1.1 500 Internal Server Error');
		$response['error'][] = 'json decode error.';
		$response['msg'] = gpc_in('data', 'post', 'raw');
	}
	else{

		// check the account name
		if(isset($data['account_name']) && !empty($data['account_name'])){
			// check for illegal characters
			preg_match('#(?P<name>^[a-z\s]+.[\d]{4}$)#i', $data['account_name'], $pcre_acc);
			if(empty($pcre_acc)){
				// we need a valid account name to work - so exit here if it doesn't match because it's possibly a hacking attempt
				$response['error'][] = 'invalid account name.';
			}
		}
		else{
			$response['error'][] = 'account_name missing.';
		}

		// check for the avatar_front value and if the position array exists and has at least 2 values
		// we don't care about the values here - anything invalid will be converted by floatval() anyway
		if(!isset($data['avatar_front']) || !is_array($data['avatar_position'])
			|| !isset($data['avatar_position'][0]) || !isset($data['avatar_position'][1])){
			$response['error'][] = 'position data missing.';
		}

		// check the guild id if it's not empty
		if(isset($data['guild_id']) && !empty($data['guild_id'])){
			preg_match('#(?P<id>^[a-f\d]{8}-(:?[a-f\d]{4}-){3}[a-f\d]{12}$)#i', $data['guild_id'], $pcre_guild);
			if(empty($pcre_guild)){
				// if the guild id doesn't match, it's possibly a hacking attempt. surprisingly.
				$response['error'][] = 'invalid guild id.';
			}
		}
		else{
			$pcre_guild['id'] = '00000000-0000-0000-0000-000000000000';
		}

		// same with the channel id
		if(isset($data['channel_id']) && !empty($data['channel_id'])){
			preg_match('#(?P<id>^[a-f\d]{40}$)#i', $data['channel_id'], $pcre_channel);
			if(empty($pcre_channel)){
				// ...ya know...
				$response['error'][] = 'invalid channel id.';
			}
		}
		else{
			$pcre_channel['id'] = sha1('');
		}


		// check for character data
		if(isset($data['character_data'])){

			if(isset($data['character_data']['name'])){
				// check the length of the charname
				if(mb_strlen($data['character_data']['name'], 'UTF-8') > 19){
					// everything > 19 bytes is possibly a hacking attempt due to ArenaNet's naming guidelines
					$response['error'][] = 'character name too long.';
				}

				// check for any XSS relevant characters in the charname (you can be more restrictive, actually), see:
				// https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet#RULE_.231_-_HTML_Escape_Before_Inserting_Untrusted_Data_into_HTML_Element_Content
				preg_match('#([\d\'&%<>"/;])#', $data['character_data']['name'], $pcre_char);
				if(!empty($pcre_char)){
					// any invalid character in the name can be considered as hacking attempt
					$response['error'][] = 'invalid characters in the character name.';
				}
			}
			else{
				$response['error'][] = 'name missing.';
			}

			// clamp the world IDs since overflow and WvW servers seem to return garbage values
			if(isset($data['character_data']['world_id'])){
				// this value can be considered obsolete since megaservers were introduced - you have to rely on user input now
				if((int)$data['character_data']['world_id'] < 1001 || (int)$data['character_data']['world_id'] > 2206){
					$data['character_data']['world_id'] = 0;
				}
			}
			else{
				$response['error'][] = 'world_id missing.';
			}

			// same for the professions
			if(isset($data['character_data']['profession'])){
				if((int)$data['character_data']['profession'] < 0 || (int)$data['character_data']['profession'] > 8){
					$data['character_data']['profession'] = 0;
				}
			}
			else {
				$response['error'][] = 'profession missing.';
			}

			// just make sure the following keys are set
			foreach(['commander', 'map_id', 'team_color_id'] as $key){
				if(!isset($data['character_data'][$key])){
					$response['error'][] = $key.' missing.';
				}
			}

		}
		else{
			$response['error'][] = 'character_data missing.';
		}


		// enough checks for now
		if(!isset($response['error'])){
			// prepare the SQL statement
			$sql = 'REPLACE INTO '.TABLE_PLAYER_POS.' (`player_uid`,
						`acc_name`, `char_name`, `profession`, `team_color`,
						`commander`, `guild_id`, `guild_secret`, `world_id`,
						 `map_id`, `pos_x`, `pos_y`, `pos_angle`, `pos_time`)
					VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

			// prepare values
			// keep in mind, that you may receive postdata from anywhere, not just the location sender, so sanitize your data!
			// inserting raw data into the DB isn't much of a problem here since we use prepared statements anyway
			// but still be careful when retrieving the values and send them to the client

			// for PHPStorm's sake - the variables have been defined once we reach this point
			/** @noinspection PhpUndefinedVariableInspection */
			$values = [
				sha1($pcre_acc['name']),
				$pcre_acc['name'],
				$data['character_data']['name'],
				intval($data['character_data']['profession']),
				intval($data['character_data']['team_color_id']),
				intval($data['character_data']['commander']),
				$pcre_guild['id'],
				$pcre_channel['id'],
				intval($data['character_data']['world_id']),
				intval($data['character_data']['map_id']),
				round(floatval($data['avatar_position'][0]), 4),
				round(floatval($data['avatar_position'][1]), 4),
				intval($data['avatar_front']),
				time()
			];

			$db->P($sql, $values);

			// return the inserted values
			$response['msg'] = $values;

			// also check if the guild is already in the DB and add it if not
			if($pcre_guild['id'] !== '00000000-0000-0000-0000-000000000000'){
				$count = $db->P('SELECT COUNT(*) FROM `gw2_guilds` WHERE `guild_id` = ?', [$pcre_guild['id']], null, false);
				if((int)$count[0][0] === 0){
					$gw2api->request('guild_details.json', ['guild_id' => $pcre_guild['id']]);
					$data = $gw2api->api_response;
					if(is_array($data) && isset($data['guild_id'])){
						$values = [
							$data['guild_id'],
							$data['guild_name'],
							$data['tag'],
							!isset($data['emblem']) ?: $data['emblem']['foreground_id'],
							!isset($data['emblem']) ?: $data['emblem']['background_id'],
							!isset($data['emblem']) ?: $data['emblem']['foreground_primary_color_id'],
							!isset($data['emblem']) ?: $data['emblem']['foreground_secondary_color_id'],
							!isset($data['emblem']) ?: $data['emblem']['background_color_id'],
							!isset($data['emblem']) ?: set_bitflag($data['emblem']['flags']),
						];

						$sql = 'INSERT INTO '.TABLE_GUILDS.' (`guild_id`, `name`, `tag`,
									`foreground_id`, `background_id`, `foreground_primary_color_id`,
									`foreground_secondary_color_id`, `background_color_id`, `flags`)
								VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

						$db->P($sql, $values);
					}
				}
			}

		}
		else{
			// return the received data on error...
			$response['msg'] = $data;
			// ...and add a HTTP/400
			header('HTTP/1.1 400 Bad Request');
		}
	}
}

/**
 * ajax backend/position sender
 */
else if(gpc_in('json', 'post')){
	$data = json_decode(gpc_in('json', 'post', 'raw'), true);

	if(!$data){
		header('HTTP/1.1 500 Internal Server Error');
		$response['error'][] = 'json decode error.';
		$response['msg'] = gpc_in('json', 'post', 'raw');
	}
	else{
		if(isset($data['get']) && $data['get'] === 'playerdata'
			&& isset($data['key']) && preg_match('#^[a-f\d]{40}$#i', $data['key'])
			&& isset($data['continent'])){

			$lang = isset($data['lang']) && in_array($data['lang'], $gw2api->api_languages) ? $data['lang'] : 'en';

			$sql = 'SELECT pos.`player_uid`, pos.`char_name`, pos.`profession`, pos.`guild_id`, pos.`commander`,
						pos.`pos_x`, pos.`pos_y`, pos.`pos_angle`, pos.`pos_time`, pos.`world_id`, map.`continent_id`,
						map.`name_'.$lang.'` AS `map_name`, map.`map_id`, map.`continent_rect`, map.`map_rect`,
						guild.`guild_id`, guild.`name` AS `guild_name`, guild.`tag`, world.`name_'.$lang.'` AS `world_name`
					FROM '.TABLE_PLAYER_POS.' AS pos, '.TABLE_MAPS.' AS map, '.TABLE_GUILDS.' AS guild, '.TABLE_WORLDS.' AS world
					WHERE pos.`guild_secret` = ? AND map.`continent_id` = ? AND pos.`guild_id` = guild.`guild_id`
						AND map.`map_id` = pos.`map_id` AND `pos_time` > ? AND world.`world_id` = pos.`world_id`
					ORDER BY pos.`commander` DESC, guild.`name` ASC, pos.`profession` ASC, pos.`char_name` ASC';

			$values = [
				$data['key'],
				intval($data['continent']),
				// you may add a config value for the position time frame to not overcrowd the map with markers
				time() - 7200 // 2h
			];

			$result = $db->P($sql, $values);

			if(!$result){
				// if you run into this error, you might not have the gw2_maps, gw2_worlds and gw2_guilds tables available
				header('HTTP/1.1 500 Internal Server Error');
				$response['error'][] = 'playerdata select error.';
				$response['msg'] = $result;
			}
			else{
				if(is_array($result)){

					foreach($result as $r){
						// add some player states
						switch(true){
							case $r['pos_time'] < time()-60*60: $state = 3; break; // last seen > 1h ago -> gray
							case $r['pos_time'] < time()-60*30: $state = 2; break; // 30min -> red
							case $r['pos_time'] < time()-60*15: $state = 1; break; // 15min -> orange
							default: $state = 0; break; // online -> green
						}

						$response[$r['player_uid']] = [
							'charname' => $r['char_name'],
							'commander' => $r['commander'],
							'profession' => $r['profession'],
							'state' => $state,
							'guild' => [
								'id' => $r['guild_id'],
								'name' => $r['guild_name'],
								'tag' => $r['tag'],
							],
							'continent' => $r['continent_id'],
							'world' => [
								'id' => $r['world_id'],
								'name' => $r['world_name'],
							],
							'map' => [
								'id' => $r['map_id'],
								'name' => stripslashes($r['map_name']),
							],
							'pos' => $gw2api->recalc_coords(json_decode($r['continent_rect'], true), json_decode($r['map_rect'], true), [$r['pos_x'], $r['pos_y']]),
							'angle' => $r['pos_angle'] * -1,
							'time' => $r['pos_time'],
						];

					}
				}
				else{
					header('HTTP/1.1 204 No Content');
					$response['msg'] = 'go along, nothing to see here.';
				}
			}
		}
		else{
			header('HTTP/1.1 400 Bad Request');
			$response['error'][] = 'invalid request.';
			$response['msg'] = $data;
		}
	}
}

// anything else is an invalid request
else{
	header('HTTP/1.1 400 Bad Request');
	$response['error'][] = 'invalid request.';
	$response['msg'] = ['$_GET' => $_GET, '$_POST' => $_POST];
}


$response = json_encode($response);

header('Content-type: application/json;charset=utf-8;');
header('Last-Modified: '.date('r'));
// CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Expose-Headers: X-JSON');
// prevent caching
header('Expires: Tue, 23 May 1989 13:37:23 GMT');
header('Cache-Control: max-age=0, private, no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
header('Pragma: no-cache');
echo gzoutput($response);
exit;
