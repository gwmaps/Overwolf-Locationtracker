<?php
/**
 * Common used functions
 *
 * @filesource func_common.inc.php
 * @version    0.1.0
 * @link       https://github.com/codemasher/gw2-wvwstats/blob/master/inc/func_common.inc.php
 * @created    08.03.14
 *
 * @author     Smiley <smiley@chillerlan.net>
 * @copyright  Copyright (c) 2014 Smiley <smiley@chillerlan.net>
 * @license    http://opensource.org/licenses/mit-license.php The MIT License (MIT)
 */


/**
 * Receive a GPC var and return it's value with filter applied
 *
 * @param string $name name of the var
 * @param string $mode get, post, cookie - defaults to get
 * @param string $type type of the var: string, int, float, escape, raw - defaults to string
 *
 * @return bool|string true if variable exists but empty, filtered value or false if not exist
 */
function gpc_in($name, $mode = 'get', $type = 'string'){
	$gpc = [
		'get'    => isset($_GET[$name]) ? $_GET[$name] : false,
		'post'   => isset($_POST[$name]) ? $_POST[$name] : false,
		'cookie' => isset($_COOKIE[$name]) ? $_COOKIE[$name] : false
	];

	$mode = strtolower($mode);

	if($gpc[$mode]){
		$var = gpc_filter($gpc[$mode], $type);
		return empty($var) ? true : $var;
	}
	return false;
}

/**
 * @param mixed  $var
 * @param string $type type of the var: string, int, float, escape, raw - defaults to string
 *
 * @return mixed
 */
function gpc_filter($var, $type = 'string'){
	switch(strtolower($type)){
		case 'string':
			$filter = FILTER_SANITIZE_STRING;
			break;
		case 'int':
			$filter = FILTER_SANITIZE_NUMBER_INT;
			break;
		case 'float':
			$filter = FILTER_SANITIZE_NUMBER_FLOAT;
			break;
		case 'escape':
			$filter = FILTER_SANITIZE_SPECIAL_CHARS;
			break;
		case 'raw':
			$filter = FILTER_UNSAFE_RAW;
			break;
		default:
			$filter = FILTER_SANITIZE_STRING;
			break;
	}
	return filter_var($var, $filter);
}

/**
 * gzoutput
 *
 * gzip output compression
 *
 * @param string $content
 *
 * @return string
 */
function gzoutput($content){
	if(headers_sent()){
		$encoding = false;
	}
	else if(isset($_SERVER['HTTP_ACCEPT_ENCODING']) && strstr($_SERVER['HTTP_ACCEPT_ENCODING'], 'x-gzip')){
		$encoding = 'x-gzip';
	}
	else if(isset($_SERVER['HTTP_ACCEPT_ENCODING']) && strstr($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')){
		$encoding = 'gzip';
	}
	else{
		$encoding = false;
	}

	if($encoding){
		header('Content-Encoding: '.$encoding);
		$content = gzencode($content, 9);
	}
	return $content;
}

/**
 * set_bitflag
 *
 * set a bitflag value
 *
 * @param array $flags
 *
 * @return int
 */
function set_bitflag($flags){
	$val = 0;
	foreach($flags as $flag){
		$val = $val|constant($flag);
	}
	return $val;
}

/**
 * get_bitflag
 *
 * get a bitflag value
 *
 * @param int $flag
 * @param int $val
 *
 * @return bool
 */
function get_bitflag($flag, $val){
	return ($val&$flag) === $flag;
}

