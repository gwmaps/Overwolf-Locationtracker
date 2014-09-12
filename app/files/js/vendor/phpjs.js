/*!
 * More info at: http://phpjs.org
 *
 * php.js is copyright 2011 Kevin van Zonneveld.
 */

/**
 * Portions copyright Brett Zamir (http://brett-zamir.me), Kevin van Zonneveld
 * (http://kevin.vanzonneveld.net), Onno Marsman, Theriault, Michael White
 * (http://getsprink.com), Waldo Malqui Silva, Paulo Freitas, Jack, Jonas
 * Raoni Soares Silva (http://www.jsfromhell.com), Philip Peterson, Legaev
 * Andrey, Ates Goral (http://magnetiq.com), Alex, Ratheous, Martijn Wieringa,
 * Rafał Kukawski (http://blog.kukawski.pl), lmeyrick
 * (https://sourceforge.net/projects/bcmath-js/), Nate, Philippe Baumann,
 * Enrique Gonzalez, Webtoolkit.info (http://www.webtoolkit.info/), Carlos R.
 * L. Rodrigues (http://www.jsfromhell.com), Ash Searle
 * (http://hexmen.com/blog/), Jani Hartikainen, travc, Ole Vrijenhoek,
 * Erkekjetter, Michael Grier, Rafał Kukawski (http://kukawski.pl), Johnny
 * Mast (http://www.phpvrouwen.nl), T.Wild, d3x,
 * http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript,
 * Rafał Kukawski (http://blog.kukawski.pl/), stag019, pilus, WebDevHobo
 * (http://webdevhobo.blogspot.com/), marrtins, GeekFG
 * (http://geekfg.blogspot.com), Andrea Giammarchi
 * (http://webreflection.blogspot.com), Arpad Ray (mailto:arpad@php.net),
 * gorthaur, Paul Smith, Tim de Koning (http://www.kingsquare.nl), Joris, Oleg
 * Eremeev, Steve Hilder, majak, gettimeofday, KELAN, Josh Fraser
 * (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/),
 * Marc Palau, Kevin van Zonneveld (http://kevin.vanzonneveld.net/), Martin
 * (http://www.erlenwiese.de/), Breaking Par Consulting Inc
 * (http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7),
 * Chris, Mirek Slugen, saulius, Alfonso Jimenez
 * (http://www.alfonsojimenez.com), Diplom@t (http://difane.com/), felix,
 * Mailfaker (http://www.weedem.fr/), Tyler Akins (http://rumkin.com), Caio
 * Ariede (http://caioariede.com), Robin, Kankrelune
 * (http://www.webfaktory.info/), Karol Kowalski, Imgen Tata
 * (http://www.myipdf.com/), mdsjack (http://www.mdsjack.bo.it), Dreamer,
 * Felix Geisendoerfer (http://www.debuggable.com/felix), Lars Fischer, AJ,
 * David, Aman Gupta, Michael White, Public Domain
 * (http://www.json.org/json2.js), Steven Levithan
 * (http://blog.stevenlevithan.com), Sakimori, Pellentesque Malesuada,
 * Thunder.m, Dj (http://phpjs.org/functions/htmlentities:425#comment_134018),
 * Steve Clay, David James, Francois, class_exists, nobbler, T. Wild, Itsacon
 * (http://www.itsacon.net/), date, Ole Vrijenhoek (http://www.nervous.nl/),
 * Fox, Raphael (Ao RUDLER), Marco, noname, Mateusz "loonquawl" Zalega, Frank
 * Forte, Arno, ger, mktime, john (http://www.jd-tech.net), Nick Kolosov
 * (http://sammy.ru), marc andreu, Scott Cariss, Douglas Crockford
 * (http://javascript.crockford.com), madipta, Slawomir Kaniecki,
 * ReverseSyntax, Nathan, Alex Wilson, kenneth, Bayron Guevara, Adam Wallner
 * (http://web2.bitbaro.hu/), paulo kuong, jmweb, Lincoln Ramsay, djmix,
 * Pyerre, Jon Hohle, Thiago Mata (http://thiagomata.blog.com), lmeyrick
 * (https://sourceforge.net/projects/bcmath-js/this.), Linuxworld, duncan,
 * Gilbert, Sanjoy Roy, Shingo, sankai, Oskar Larsson Högfeldt
 * (http://oskar-lh.name/), Denny Wardhana, 0m3r, Everlasto, Subhasis Deb,
 * josh, jd, Pier Paolo Ramon (http://www.mastersoup.com/), P, merabi, Soren
 * Hansen, Eugene Bulkin (http://doubleaw.com/), Der Simon
 * (http://innerdom.sourceforge.net/), echo is bad, Ozh, XoraX
 * (http://www.xorax.info), EdorFaus, JB, J A R, Marc Jansen, Francesco, LH,
 * Stoyan Kyosev (http://www.svest.org/), nord_ua, omid
 * (http://phpjs.org/functions/380:380#comment_137122), Brad Touesnard, MeEtc
 * (http://yass.meetcweb.com), Peter-Paul Koch
 * (http://www.quirksmode.org/js/beat.html), Olivier Louvignes
 * (http://mg-crea.com/), T0bsn, Tim Wiel, Bryan Elliott, Jalal Berrami,
 * Martin, JT, David Randall, Thomas Beaucourt (http://www.webapp.fr), taith,
 * vlado houba, Pierre-Luc Paour, Kristof Coomans (SCK-CEN Belgian Nucleair
 * Research Centre), Martin Pool, Kirk Strobeck, Rick Waldron, Brant Messenger
 * (http://www.brantmessenger.com/), Devan Penner-Woelk, Saulo Vallory, Wagner
 * B. Soares, Artur Tchernychev, Valentina De Rosa, Jason Wong
 * (http://carrot.org/), Christoph, Daniel Esteban, strftime, Mick@el, rezna,
 * Simon Willison (http://simonwillison.net), Anton Ongson, Gabriel Paderni,
 * Marco van Oort, penutbutterjelly, Philipp Lenssen, Bjorn Roesbeke
 * (http://www.bjornroesbeke.be/), Bug?, Eric Nagel, Tomasz Wesolowski,
 * Evertjan Garretsen, Bobby Drake, Blues (http://tech.bluesmoon.info/), Luke
 * Godfrey, Pul, uestla, Alan C, Ulrich, Rafal Kukawski, Yves Sucaet,
 * sowberry, Norman "zEh" Fuchs, hitwork, Zahlii, johnrembo, Nick Callen,
 * Steven Levithan (stevenlevithan.com), ejsanders, Scott Baker, Brian Tafoya
 * (http://www.premasolutions.com/), Philippe Jausions
 * (http://pear.php.net/user/jausions), Aidan Lister
 * (http://aidanlister.com/), Rob, e-mike, HKM, ChaosNo1, metjay, strcasecmp,
 * strcmp, Taras Bogach, jpfle, Alexander Ermolaev
 * (http://snippets.dzone.com/user/AlexanderErmolaev), DxGx, kilops, Orlando,
 * dptr1988, Le Torbi, James (http://www.james-bell.co.uk/), Pedro Tainha
 * (http://www.pedrotainha.com), James, Arnout Kazemier
 * (http://www.3rd-Eden.com), Chris McMacken, gabriel paderni, Yannoo,
 * FGFEmperor, baris ozdil, Tod Gentille, Greg Frazier, jakes, 3D-GRAF, Allan
 * Jensen (http://www.winternet.no), Howard Yeend, Benjamin Lupton, davook,
 * daniel airton wermann (http://wermann.com.br), Atli Þór, Maximusya, Ryan
 * W Tenney (http://ryan.10e.us), Alexander M Beedie, fearphage
 * (http://http/my.opera.com/fearphage/), Nathan Sepulveda, Victor, Matteo,
 * Billy, stensi, Cord, Manish, T.J. Leahy, Riddler
 * (http://www.frontierwebdev.com/), Rafał Kukawski, FremyCompany, Matt
 * Bradley, Tim de Koning, Luis Salazar (http://www.freaky-media.com/), Diogo
 * Resende, Rival, Andrej Pavlovic, Garagoth, Le Torbi
 * (http://www.letorbi.de/), Dino, Josep Sanz (http://www.ws3.es/), rem,
 * Russell Walker (http://www.nbill.co.uk/), Jamie Beck
 * (http://www.terabit.ca/), setcookie, Michael, YUI Library:
 * http://developer.yahoo.com/yui/docs/YAHOO.util.DateLocale.html, Blues at
 * http://hacks.bluesmoon.info/strftime/strftime.js, Ben
 * (http://benblume.co.uk/), DtTvB
 * (http://dt.in.th/2008-09-16.string-length-in-bytes.html), Andreas, William,
 * meo, incidence, Cagri Ekin, Amirouche, Amir Habibi
 * (http://www.residence-mixte.com/), Luke Smith (http://lucassmith.name),
 * Kheang Hok Chin (http://www.distantia.ca/), Jay Klehr, Lorenzo Pisani,
 * Tony, Yen-Wei Liu, Greenseed, mk.keck, Leslie Hoare, dude, booeyOH, Ben
 * Bryan
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

var phpjs = {
	/**
	 * @link http://phpjs.org/functions/intval/
	 *
	 * @param {*} mixed_var
	 * @param {number} base
	 * @returns {number}
	 */
	intval: function(mixed_var, base){
		var tmp;
		var type = typeof(mixed_var);

		if(type === 'boolean'){
			return +mixed_var;
		}
		else if(type === 'string'){
			tmp = parseInt(mixed_var, base || 10);
			return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
		}
		else if(type === 'number' && isFinite(mixed_var)){
			return mixed_var|0;
		}
		else{
			return 0;
		}
	},

	/**
	 * @link http://phpjs.org/functions/utf8_encode/
	 *
	 * @param argString
	 * @returns {string} utf8 encoded string
	 */
	utf8_encode: function(argString){
		if(argString === null || typeof argString === "undefined"){
			return "";
		}

		var start, end, n;
		var string = (argString+''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		var utftext = "";
		var stringl = string.length;

		start = end = 0;

		for(n = 0; n < stringl; n++){
			var c1 = string.charCodeAt(n),
				enc = null;

			if(c1 < 128){
				end++;
			}
			else if(c1 > 127 && c1 < 2048){
				enc = String.fromCharCode((c1 >> 6)|192)+String.fromCharCode((c1&63)|128);
			}
			else{
				enc = String.fromCharCode((c1 >> 12)|224)+String.fromCharCode(((c1 >> 6)&63)|128)+String.fromCharCode((c1&63)|128);
			}
			if(enc !== null){
				if(end > start){
					utftext += string.slice(start, end);
				}
				utftext += enc;
				start = end = n+1;
			}
		}

		if(end > start){
			utftext += string.slice(start, stringl);
		}

		return utftext;
	},

	/**
	 * @link http://phpjs.org/functions/sha1/
	 *
	 * @param str
	 * @returns {string} SHA1 hash
	 */
	sha1: function(str){
		str = phpjs.utf8_encode(str);

		var blockstart, i, j, k, A, B, C, D, E, temp;
		var str_len = str.length;
		var W = new Array(80);
		var word_array = [];
		var H0 = 0x67452301;
		var H1 = 0xEFCDAB89;
		var H2 = 0x98BADCFE;
		var H3 = 0x10325476;
		var H4 = 0xC3D2E1F0;

		var rotate_left = function(n, s){
			return (n << s)|(n >>> (32-s));
		};

		var cvt_hex = function(val){
			var v;
			var str = '';
			for(i = 7; i >= 0; i--){
				v = (val >>> (i*4))&0x0f;
				str += v.toString(16);
			}
			return str;
		};

		for(i = 0; i < str_len-3; i += 4){
			j = str.charCodeAt(i) << 24|str.charCodeAt(i+1) << 16|str.charCodeAt(i+2) << 8|str.charCodeAt(i+3);
			word_array.push(j);
		}

		switch(str_len%4){
			case 0:
				i = 0x080000000;
				break;
			case 1:
				i = str.charCodeAt(str_len-1) << 24|0x0800000;
				break;
			case 2:
				i = str.charCodeAt(str_len-2) << 24|str.charCodeAt(str_len-1) << 16|0x08000;
				break;
			case 3:
				i = str.charCodeAt(str_len-3) << 24|str.charCodeAt(str_len-2) << 16|str.charCodeAt(str_len-1) << 8|0x80;
				break;
		}

		word_array.push(i);

		while((word_array.length%16) != 14){
			word_array.push(0);
		}

		word_array.push(str_len >>> 29);
		word_array.push((str_len << 3)&0x0ffffffff);

		for(blockstart = 0, k = word_array.length; blockstart < k; blockstart += 16){
			for(i = 0; i < 16; i++){
				W[i] = word_array[blockstart+i];
			}

			for(i = 16; i <= 79; i++){
				W[i] = rotate_left(W[i-3]^W[i-8]^W[i-14]^W[i-16], 1);
			}

			A = H0;
			B = H1;
			C = H2;
			D = H3;
			E = H4;

			for(i = 0; i <= 19; i++){
				temp = (rotate_left(A, 5)+((B&C)|(~B&D))+E+W[i]+0x5A827999)&0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}

			for(i = 20; i <= 39; i++){
				temp = (rotate_left(A, 5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}

			for(i = 40; i <= 59; i++){
				temp = (rotate_left(A, 5)+((B&C)|(B&D)|(C&D))+E+W[i]+0x8F1BBCDC)&0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}

			for(i = 60; i <= 79; i++){
				temp = (rotate_left(A, 5)+(B^C^D)+E+W[i]+0xCA62C1D6)&0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}

			H0 = (H0+A)&0x0ffffffff;
			H1 = (H1+B)&0x0ffffffff;
			H2 = (H2+C)&0x0ffffffff;
			H3 = (H3+D)&0x0ffffffff;
			H4 = (H4+E)&0x0ffffffff;
		}

		temp = cvt_hex(H0)+cvt_hex(H1)+cvt_hex(H2)+cvt_hex(H3)+cvt_hex(H4);
		return temp.toLowerCase();
	},

	/**
	 * @link http://phpjs.org/functions/time/
	 *
	 * @returns {number}
	 */
	time: function(){
		return Math.floor(new Date().getTime()/1000);
	},

	/**
	 * @link http://phpjs.org/functions/date/
	 *
	 * @param format
	 * @param timestamp
	 * @returns {*}
	 */
	date: function(format, timestamp){
		var that = this;
		var jsdate, f;
		// Keep this here (works, but for code commented-out below for file size reasons)
		// var tal= [];
		var txt_words = [
			'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
			'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'
		];
		// trailing backslash -> (dropped)
		// a backslash followed by any character (including backslash) -> the character
		// empty string -> empty string
		var formatChr = /\\?(.?)/gi;
		var formatChrCb = function(t, s){
			return f[t] ? f[t]() : s;
		};
		var _pad = function(n, c){
			n = String(n);
			while(n.length < c){
				n = '0'+n;
			}
			return n;
		};
		f = {
			// Day
			d: function(){ // Day of month w/leading 0; 01..31
				return _pad(f.j(), 2);
			},
			D: function(){ // Shorthand day name; Mon...Sun
				return f.l().slice(0, 3);
			},
			j: function(){ // Day of month; 1..31
				return jsdate.getDate();
			},
			l: function(){ // Full day name; Monday...Sunday
				return txt_words[f.w()]+'day';
			},
			N: function(){ // ISO-8601 day of week; 1[Mon]..7[Sun]
				return f.w() || 7;
			},
			S: function(){ // Ordinal suffix for day of month; st, nd, rd, th
				var j = f.j();
				var i = j%10;
				if(i <= 3 && parseInt((j%100)/10, 10) == 1){
					i = 0;
				}
				return ['st', 'nd', 'rd'][i-1] || 'th';
			},
			w: function(){ // Day of week; 0[Sun]..6[Sat]
				return jsdate.getDay();
			},
			z: function(){ // Day of year; 0..365
				var a = new Date(f.Y(), f.n()-1, f.j());
				var b = new Date(f.Y(), 0, 1);
				return Math.round((a-b)/864e5);
			},

			// Week
			W: function(){ // ISO-8601 week number
				var a = new Date(f.Y(), f.n()-1, f.j()-f.N()+3);
				var b = new Date(a.getFullYear(), 0, 4);
				return _pad(1+Math.round((a-b)/864e5/7), 2);
			},

			// Month
			F: function(){ // Full month name; January...December
				return txt_words[6+f.n()];
			},
			m: function(){ // Month w/leading 0; 01...12
				return _pad(f.n(), 2);
			},
			M: function(){ // Shorthand month name; Jan...Dec
				return f.F()
					.slice(0, 3);
			},
			n: function(){ // Month; 1...12
				return jsdate.getMonth()+1;
			},
			t: function(){ // Days in month; 28...31
				return (new Date(f.Y(), f.n(), 0)).getDate();
			},

			// Year
			L: function(){ // Is leap year?; 0 or 1
				var j = f.Y();
				return j%4 === 0&j%100 !== 0|j%400 === 0;
			},
			o: function(){ // ISO-8601 year
				var n = f.n();
				var W = f.W();
				var Y = f.Y();
				return Y+(n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
			},
			Y: function(){ // Full year; e.g. 1980...2010
				return jsdate.getFullYear();
			},
			y: function(){ // Last two digits of year; 00...99
				return f.Y()
					.toString()
					.slice(-2);
			},

			// Time
			a: function(){ // am or pm
				return jsdate.getHours() > 11 ? 'pm' : 'am';
			},
			A: function(){ // AM or PM
				return f.a().toUpperCase();
			},
			B: function(){ // Swatch Internet time; 000..999
				var H = jsdate.getUTCHours()*36e2;
				// Hours
				var i = jsdate.getUTCMinutes()*60;
				// Minutes
				var s = jsdate.getUTCSeconds(); // Seconds
				return _pad(Math.floor((H+i+s+36e2)/86.4)%1e3, 3);
			},
			g: function(){ // 12-Hours; 1..12
				return f.G()%12 || 12;
			},
			G: function(){ // 24-Hours; 0..23
				return jsdate.getHours();
			},
			h: function(){ // 12-Hours w/leading 0; 01..12
				return _pad(f.g(), 2);
			},
			H: function(){ // 24-Hours w/leading 0; 00..23
				return _pad(f.G(), 2);
			},
			i: function(){ // Minutes w/leading 0; 00..59
				return _pad(jsdate.getMinutes(), 2);
			},
			s: function(){ // Seconds w/leading 0; 00..59
				return _pad(jsdate.getSeconds(), 2);
			},
			u: function(){ // Microseconds; 000000-999000
				return _pad(jsdate.getMilliseconds()*1000, 6);
			},

			// Timezone
			e: function(){ // Timezone identifier; e.g. Atlantic/Azores, ...
				// The following works, but requires inclusion of the very large
				// timezone_abbreviations_list() function.
				/*              return that.date_default_timezone_get();
				 */
				throw 'Not supported (see source code of date() for timezone on how to add support)';
			},
			I: function(){ // DST observed?; 0 or 1
				// Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
				// If they are not equal, then DST is observed.
				var a = new Date(f.Y(), 0);
				// Jan 1
				var c = Date.UTC(f.Y(), 0);
				// Jan 1 UTC
				var b = new Date(f.Y(), 6);
				// Jul 1
				var d = Date.UTC(f.Y(), 6); // Jul 1 UTC
				return ((a-c) !== (b-d)) ? 1 : 0;
			},
			O: function(){ // Difference to GMT in hour format; e.g. +0200
				var tzo = jsdate.getTimezoneOffset();
				var a = Math.abs(tzo);
				return (tzo > 0 ? '-' : '+')+_pad(Math.floor(a/60)*100+a%60, 4);
			},
			P: function(){ // Difference to GMT w/colon; e.g. +02:00
				var O = f.O();
				return (O.substr(0, 3)+':'+O.substr(3, 2));
			},
			T: function(){ // Timezone abbreviation; e.g. EST, MDT, ...
				// The following works, but requires inclusion of the very
				// large timezone_abbreviations_list() function.
				/*
				var abbr, i, os, _default;
				if(!tal.length){
					tal = that.timezone_abbreviations_list();
				}
				if(that.php_js && that.php_js.default_timezone){
					_default = that.php_js.default_timezone;
					for(abbr in tal){
						for(i = 0; i < tal[abbr].length; i++){
							if(tal[abbr][i].timezone_id === _default){
								return abbr.toUpperCase();
							}
						}
					}
				}
				for(abbr in tal){
					for(i = 0; i < tal[abbr].length; i++){
						os = -jsdate.getTimezoneOffset()*60;
						if(tal[abbr][i].offset === os){
							return abbr.toUpperCase();
						}
					}
				}
				 */
				return 'UTC';
			},
			Z: function(){ // Timezone offset in seconds (-43200...50400)
				return -jsdate.getTimezoneOffset()*60;
			},

			// Full Date/Time
			c: function(){ // ISO-8601 date.
				return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
			},
			r: function(){ // RFC 2822
				return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
			},
			U: function(){ // Seconds since UNIX epoch
				return jsdate/1000|0;
			}
		};
		this.date = function(format, timestamp){
			that = this;
			jsdate = (timestamp === undefined ? new Date() : // Not provided
				(timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
					new Date(timestamp*1000) // UNIX timestamp (auto-convert to int)
				);
			return format.replace(formatChr, formatChrCb);
		};
		return this.date(format, timestamp);
	},

	/**
	 * @link http://phpjs.org/functions/strtotime/
	 *
	 * @param text
	 * @param now
	 * @returns {*}
	 */
	strtotime: function(text, now){
		var parsed, match, today, year, date, days, ranges, len, times, regex, i;

		if(!text){
			return false;
		}

		// Unecessary spaces
		text = text.replace(/^\s+|\s+$/g, '')
			.replace(/\s{2,}/g, ' ')
			.replace(/[\t\r\n]/g, '')
			.toLowerCase();

		// in contrast to php, js Date.parse function interprets:
		// dates given as yyyy-mm-dd as in timezone: UTC,
		// dates with "." or "-" as MDY instead of DMY
		// dates with two-digit years differently
		// etc...etc...
		// ...therefore we manually parse lots of common date formats
		match = text.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);

		if(match && match[2] === match[4]){
			if(match[1] > 1901){
				switch(match[2]){
					case '-':
					{ // YYYY-M-D
						if(match[3] > 12 || match[5] > 31){
							return false;
						}

						return new Date(match[1], parseInt(match[3], 10)-1, match[5],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0)/1000;
					}
					case '.':
					{ // YYYY.M.D is not parsed by strtotime()
						return false;
					}
					case '/':
					{ // YYYY/M/D
						if(match[3] > 12 || match[5] > 31){
							return false;
						}

						return new Date(match[1], parseInt(match[3], 10)-1, match[5],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0)/1000;
					}
				}
			}
			else if(match[5] > 1901){
				switch(match[2]){
					case '-':
					{ // D-M-YYYY
						if(match[3] > 12 || match[1] > 31){
							return false;
						}

						return new Date(match[5], parseInt(match[3], 10)-1, match[1],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0)/1000;
					}
					case '.':
					{ // D.M.YYYY
						if(match[3] > 12 || match[1] > 31){
							return false;
						}

						return new Date(match[5], parseInt(match[3], 10)-1, match[1],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0)/1000;
					}
					case '/':
					{ // M/D/YYYY
						if(match[1] > 12 || match[3] > 31){
							return false;
						}

						return new Date(match[5], parseInt(match[1], 10)-1, match[3],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0)/1000;
					}
				}
			}
			else{
				switch(match[2]){
					case '-':
					{ // YY-M-D
						if(match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)){
							return false;
						}

						year = match[1] >= 0 && match[1] <= 38 ? +match[1]+2000 : match[1];
						return new Date(year, parseInt(match[3], 10)-1, match[5],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0)/1000;
					}
					case '.':
					{ // D.M.YY or H.MM.SS
						if(match[5] >= 70){ // D.M.YY
							if(match[3] > 12 || match[1] > 31){
								return false;
							}

							return new Date(match[5], parseInt(match[3], 10)-1, match[1],
								match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0)/1000;
						}
						if(match[5] < 60 && !match[6]){ // H.MM.SS
							if(match[1] > 23 || match[3] > 59){
								return false;
							}

							today = new Date();
							return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
								match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0)/1000;
						}

						return false; // invalid format, cannot be parsed
					}
					case '/':
					{ // M/D/YY
						if(match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)){
							return false;
						}

						year = match[5] >= 0 && match[5] <= 38 ? +match[5]+2000 : match[5];
						return new Date(year, parseInt(match[1], 10)-1, match[3],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0)/1000;
					}
					case ':':
					{ // HH:MM:SS
						if(match[1] > 23 || match[3] > 59 || match[5] > 59){
							return false;
						}

						today = new Date();
						return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
							match[1] || 0, match[3] || 0, match[5] || 0)/1000;
					}
				}
			}
		}

		// other formats and "now" should be parsed by Date.parse()
		if(text === 'now'){
			return now === null || isNaN(now) ? new Date()
				.getTime()/1000|0 : now|0;
		}
		if(!isNaN(parsed = Date.parse(text))){
			return parsed/1000|0;
		}

		date = now ? new Date(now*1000) : new Date();
		days = {
			'sun': 0,
			'mon': 1,
			'tue': 2,
			'wed': 3,
			'thu': 4,
			'fri': 5,
			'sat': 6
		};
		ranges = {
			'yea': 'FullYear',
			'mon': 'Month',
			'day': 'Date',
			'hou': 'Hours',
			'min': 'Minutes',
			'sec': 'Seconds'
		};

		function lastNext(type, range, modifier){
			var diff;
			var day = days[range];

			if(typeof day !== 'undefined'){
				diff = day-date.getDay();

				if(diff === 0){
					diff = 7*modifier;
				}
				else if(diff > 0 && type === 'last'){
					diff -= 7;
				}
				else if(diff < 0 && type === 'next'){
					diff += 7;
				}

				date.setDate(date.getDate()+diff);
			}
		}

		function process(val){
			var splt = val.split(' '); // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
			var type = splt[0];
			var range = splt[1].substring(0, 3);
			var typeIsNumber = /\d+/.test(type);
			var ago = splt[2] === 'ago';
			var num = (type === 'last' ? -1 : 1)*(ago ? -1 : 1);

			if(typeIsNumber){
				num *= parseInt(type, 10);
			}

			if(ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)){
				return date['set'+ranges[range]](date['get'+ranges[range]]()+num);
			}

			if(range === 'wee'){
				return date.setDate(date.getDate()+(num*7));
			}

			if(type === 'next' || type === 'last'){
				lastNext(type, range, num);
			}
			else if(!typeIsNumber){
				return false;
			}

			return true;
		}

		times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
		regex = '([+-]?\\d+\\s'+times+'|'+'(last|next)\\s'+times+')(\\sago)?';

		match = text.match(new RegExp(regex, 'gi'));
		if(!match){
			return false;
		}

		for(i = 0, len = match.length; i < len; i++){
			if(!process(match[i])){
				return false;
			}
		}

		// ECMAScript 5 only
		// if (!match.every(process))
		//    return false;

		return (date.getTime()/1000);
	},

	/**
	 * @link http://phpjs.org/functions/in_array/
	 *
	 * @param needle
	 * @param haystack
	 * @param argStrict
	 * @returns {boolean}
	 */
	in_array: function(needle, haystack, argStrict){
		var key;
		var strict = !!argStrict;

		//we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
		//in just one for, in order to improve the performance
		//deciding wich type of comparation will do before walk array
		if(strict){
			for(key in haystack){
				if(haystack.hasOwnProperty(key)){
					if(haystack[key] === needle){
						return true;
					}
				}
			}
		}
		else{
			for(key in haystack){
				if(haystack.hasOwnProperty(key)){
					if(haystack[key] == needle){
						return true;
					}
				}
			}
		}

		return false;
	},

	/**
	 * @link http://phpjs.org/functions/sprintf/
	 *
	 * @returns {XML|string|void|*}
	 */
	sprintf: function(){
		var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
		var a = arguments;
		var i = 0;
		var format = a[i++];

		// pad()
		var pad = function(str, len, chr, leftJustify){
			if(!chr){
				chr = ' ';
			}
			var padding = (str.length >= len) ? '' : new Array(1+len-str.length >>> 0)
				.join(chr);
			return leftJustify ? str+padding : padding+str;
		};

		// justify()
		var justify = function(value, prefix, leftJustify, minWidth, zeroPad, customPadChar){
			var diff = minWidth-value.length;
			if(diff > 0){
				if(leftJustify || !zeroPad){
					value = pad(value, minWidth, customPadChar, leftJustify);
				}
				else{
					value = value.slice(0, prefix.length)+pad('', diff, '0', true)+value.slice(prefix.length);
				}
			}
			return value;
		};

		// formatBaseX()
		var formatBaseX = function(value, base, prefix, leftJustify, minWidth, precision, zeroPad){
			// Note: casts negative numbers to positive ones
			var number = value >>> 0;
			prefix = prefix && number && {
				'2': '0b',
				'8': '0',
				'16': '0x'
			}[base] || '';
			value = prefix+pad(number.toString(base), precision || 0, '0', false);
			return justify(value, prefix, leftJustify, minWidth, zeroPad);
		};

		// formatString()
		var formatString = function(value, leftJustify, minWidth, precision, zeroPad, customPadChar){
			if(precision != null){
				value = value.slice(0, precision);
			}
			return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
		};

		// doFormat()
		var doFormat = function(substring, valueIndex, flags, minWidth, _, precision, type){
			var number, prefix, method, textTransform, value;

			if(substring === '%%'){
				return '%';
			}

			// parse flags
			var leftJustify = false;
			var positivePrefix = '';
			var zeroPad = false;
			var prefixBaseX = false;
			var customPadChar = ' ';
			var flagsl = flags.length;
			for(var j = 0; flags && j < flagsl; j++){
				switch(flags.charAt(j)){
					case ' ':
						positivePrefix = ' ';
						break;
					case '+':
						positivePrefix = '+';
						break;
					case '-':
						leftJustify = true;
						break;
					case "'":
						customPadChar = flags.charAt(j+1);
						break;
					case '0':
						zeroPad = true;
						break;
					case '#':
						prefixBaseX = true;
						break;
				}
			}

			// parameters may be null, undefined, empty-string or real valued
			// we want to ignore null, undefined and empty-string values
			if(!minWidth){
				minWidth = 0;
			}
			else if(minWidth === '*'){
				minWidth = +a[i++];
			}
			else if(minWidth.charAt(0) == '*'){
				minWidth = +a[minWidth.slice(1, -1)];
			}
			else{
				minWidth = +minWidth;
			}

			// Note: undocumented perl feature:
			if(minWidth < 0){
				minWidth = -minWidth;
				leftJustify = true;
			}

			if(!isFinite(minWidth)){
				throw new Error('sprintf: (minimum-)width must be finite');
			}

			if(!precision){
				precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined;
			}
			else if(precision === '*'){
				precision = +a[i++];
			}
			else if(precision.charAt(0) == '*'){
				precision = +a[precision.slice(1, -1)];
			}
			else{
				precision = +precision;
			}

			// grab value using valueIndex if required?
			value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

			switch(type){
				case 's':
					return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
				case 'c':
					return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
				case 'b':
					return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
				case 'o':
					return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
				case 'x':
					return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
				case 'X':
					return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
						.toUpperCase();
				case 'u':
					return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
				case 'i':
				case 'd':
					number = +value || 0;
					number = Math.round(number-number%1); // Plain Math.round doesn't just truncate
					prefix = number < 0 ? '-' : positivePrefix;
					value = prefix+pad(String(Math.abs(number)), precision, '0', false);
					return justify(value, prefix, leftJustify, minWidth, zeroPad);
				case 'e':
				case 'E':
				case 'f': // Should handle locales (as per setlocale)
				case 'F':
				case 'g':
				case 'G':
					number = +value;
					prefix = number < 0 ? '-' : positivePrefix;
					method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
					textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type)%2];
					value = prefix+Math.abs(number)[method](precision);
					return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
				default:
					return substring;
			}
		};

		return format.replace(regex, doFormat);
	},

	/**
	 * @link http://phpjs.org/functions/round/
	 *
	 * @param value
	 * @param precision
	 * @param mode
	 * @returns {number}
	 */
	round: function(value, precision, mode){
		var m, f, isHalf, sgn; // helper variables
		// making sure precision is integer
		precision |= 0;
		m = Math.pow(10, precision);
		value *= m;
		// sign of the number
		sgn = (value > 0)| -(value < 0);
		isHalf = value%1 === 0.5*sgn;
		f = Math.floor(value);

		if(isHalf){
			switch(mode){
				case 'PHP_ROUND_HALF_DOWN':
					// rounds .5 toward zero
					value = f+(sgn < 0);
					break;
				case 'PHP_ROUND_HALF_EVEN':
					// rouds .5 towards the next even integer
					value = f+(f%2*sgn);
					break;
				case 'PHP_ROUND_HALF_ODD':
					// rounds .5 towards the next odd integer
					value = f+ !(f%2);
					break;
				default:
					// rounds .5 away from zero
					value = f+(sgn > 0);
			}
		}

		return (isHalf ? value : Math.round(value))/m;
	},

	/**
	 * @link http://phpjs.org/functions/mktime/
	 * @returns {*}
	 */
	mktime: function(){

		var d = new Date();
		var r = arguments;
		var i = 0;
		var e = ['Hours', 'Minutes', 'Seconds', 'Month', 'Date', 'FullYear'];

		for(i = 0; i < e.length; i++){
			if(typeof r[i] === 'undefined'){
				r[i] = d['get'+e[i]]();
				// +1 to fix JS months.
				r[i] += (i === 3);
			}
			else{
				r[i] = parseInt(r[i], 10);
				if(isNaN(r[i])){
					return false;
				}
			}
		}

		// Map years 0-69 to 2000-2069 and years 70-100 to 1970-2000.
		r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2e3 : (r[5] <= 100 ? 1900 : 0)) : 0);

		// Set year, month (-1 to fix JS months), and date.
		// !This must come before the call to setHours!
		d.setFullYear(r[5], r[3]-1, r[4]);

		// Set hours, minutes, and seconds.
		d.setHours(r[0], r[1], r[2]);

		// Divide milliseconds by 1000 to return seconds and drop decimal.
		// Add 1 second if negative or it'll be off from PHP by 1 second.
		return (d.getTime()/1e3 >> 0)-(d.getTime() < 0);
	}

};