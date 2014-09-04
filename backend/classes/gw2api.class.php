<?php
/**
 * GW2API
 *
 * @filesource gw2api.class.php
 * @version    0.1.0
 * @link       https://github.com/codemasher/gw2-wvwstats/blob/master/classes/gw2api.class.php
 * @created    08.03.14
 *
 * @author     Smiley <smiley@chillerlan.net>
 * @copyright  Copyright (c) 2014 Smiley <smiley@chillerlan.net>
 * @license    http://opensource.org/licenses/mit-license.php The MIT License (MIT)
 */

/**
 * Class GW2API
 */
class GW2API{

	/**
	 * Language used for translations. This does not affect request()
	 * Possible values: de, en, es, fr, also ko and zh with API v2 (maybe).
	 * @var string
	 */
	public $lang = 'en';

	/**
	 * GW2 API version to use
	 * @var int
	 */
	public $api_version = 1;

	/**
	 * Holds the API response after a successful call to request()
	 * @var mixed
	 */
	public $api_response = null;

	/**
	 * Will be set to true when request() fails
	 * @var bool
	 */
	public $api_error = false;

	/**
	 * Holds an error message when request() fails
	 * @var string
	 */
	public $api_error_message = '';

	/**
	 * languages supported by the API
	 * @var array
	 */
	public $api_languages = ['de', 'en', 'es', 'fr']; //, 'ko', 'zh'

	/**
	 * GW2 API request
	 *
	 * sends a request to the given API endpoint and fills $api_response on success
	 *
	 * @param string $endpoint
	 * @param array  $params
	 *
	 * @return bool
	 */
	public function request($endpoint, array $params = []){

		// reset fields
		$this->api_response = null;
		$this->api_error = false;
		$this->api_error_message = '';

		$url = parse_url('https://api.guildwars2.com/v'.$this->api_version.'/'.$endpoint);

		// open the socket
		if(!$fp = @fsockopen('ssl://'.$url['host'], 443, $errno, $errstr, 3)){
			$this->api_error = true;
			$this->api_error_message = 'connection error: '.$errno.', '.$errstr;
			return false;
		}

		// prepare the request header...
		$n = "\r\n";
		$header =
			'GET '.$url['path'].(count($params) > 0 ? '?'.http_build_query($params) : '').' HTTP/1.1'.$n.
			'Host: '.$url['host'].$n.
			'Connection: Close'.$n.$n;

		// ...and send it.
		fwrite($fp, $header);
		stream_set_timeout($fp, 3);

		// receive the response
		$response = '';
		do{
			$in = @fread($fp, 1024);
			if(strlen($in) === 0){
				break;
			}
			$response .= $in;
		}
		while(true);

		// now the nasty stuff... explode the response at the newlines
		$r = explode($n, $response);

		// you may want some advanced error handling over here, too
		if(isset($r[0]) && $r[0] === 'HTTP/1.1 200 OK'){
			// the response is non chunked, so we can assume the data is contained in the last line
			$this->api_response = json_decode($r[count($r)-1], true);
			return true;
		}
		else if(isset($r[0]) && $r[0] === 'HTTP/1.1 500 Internal Server Error'){
			$this->api_error = true;
			$this->api_error_message = json_decode($r[count($r)-1], true);
			return false;
		}

		// just return the whole response if we encountered an error over here
		$this->api_error = true;
		$this->api_response = $response;
		$this->api_error_message = 'an unknown error happened.';
		return false;
	}

	/**
	 * The ugly coordinate recalculation
	 *
	 * @param array $continent_rect
	 * @param array $map_rect
	 * @param array $point
	 *
	 * @return array point
	 */
	public function recalc_coords($continent_rect, $map_rect, $point){
		// don't look at it. really! it will melt your brain and make your eyes bleed!
		return [
			round($continent_rect[0][0]+($continent_rect[1][0]-$continent_rect[0][0])*($point[0]-$map_rect[0][0])/($map_rect[1][0]-$map_rect[0][0])),
			round($continent_rect[0][1]+($continent_rect[1][1]-$continent_rect[0][1])*(1-($point[1]-$map_rect[0][1])/($map_rect[1][1]-$map_rect[0][1])))
		];
	}

}
