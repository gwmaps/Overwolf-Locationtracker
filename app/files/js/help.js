/**
 * Created by Smiley on 12.09.14.
 */



// todo: i18n
(function(){
	document.observe('dom:loaded', function(){
		// some asuran sorcery to create a simple dynamic TOC
		var toc = new Element('ul');
		$('header').insert({after: toc});
		toc.insert({before:new Element('div', {'id':'toc-header'}).update('Table of contents')});
		$$('h1:not(#header)', 'h2', 'h3').each(function(e){
			// todo: moar list
			var sub = '';
			sub += e.tagName === 'H2' ? '&nbsp;&bull;&nbsp;' : '';
			sub += e.tagName === 'H3' ? '&nbsp;&nbsp;&nbsp;&bull;&nbsp;' : '';
			toc.insert(new Element('li').update(sub+e.innerText).observe('click', function(){Effect.ScrollTo(e);}));
			e.insert(new Element('span', {'class':'hover uplink'}).update('top').observe('click', function(){Effect.ScrollTo('header');}));
		});

		// even more asuran sorcery to open all links in a new window
		$$('a').invoke('observe', 'click', function(event){
			Event.stop(event);
			window.open(this.readAttribute('href'));
		});

	});
})();
