<?php
/**
 * config.inc.php
 * created: 04.03.14
 */


// mysql connection data
$mysql = [
	'server'   => 'localhost',
	'user'     => 'user',
	'password' => 'password',
	'dbname'   => 'dbname',
	'use_ssl'  => false,
	'ssl_ca'   => null,
];

define('TABLE_WORLDS', 'gw2_worlds');
define('TABLE_MAPS', 'gw2_maps');
define('TABLE_GUILDS', 'gw2_guilds');
define('TABLE_PLAYER_POS', 'gw2_player_pos');
