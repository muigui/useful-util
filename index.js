	function guid_replace( match ) {
		var num = ( Math.random() * 16 ) | 0;
		return ( match == 'x' ? num : ( num & 0x3 | 0x8 ) ).toString( 16 );
	}

	function id_create( prefix ) {
		return ( prefix || id_prefix ) + '-' + ( ++id_count );
	}

	function range_num( i, j ) {
		var a = [i];

		while ( ++i <= j )
			a.push( i );

		return a;
	}

	function range_str( i, j ) {
		i = String( i ).charCodeAt( 0 );
		j = String( j ).charCodeAt( 0 );

		var a = [],
			m = -1,
			n = Math.abs( i - j );

		--i;

		while ( ++m <= n )
			a.push( String.fromCharCode( ++i ) );

		return a;
	}

	function remove_array( val ) {
		var i = this.indexOf( val );

		i = !!~i ? i : !isNaN( val ) && val in this ? val : i;

		if ( !!~i )
			this.splice( i, 1 );
	}

	function remove_object( key ) {
		delete this[key];
	}

	var id_count  = 999,
		id_prefix = 'anon',
		re_gsub   =  /\$?\{([^\}'"]+)\}/g,
		re_guid   = /[xy]/g,
		root      = typeof global == 'undefined' ? window : global,
		tpl_guid  = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
		util      = module.exports = {
			global      : root,
			format      : function format( str ) {
				return util.interpolate( str, Array.prototype.slice.call( arguments, 1 ) );
			},
			guid        : function guid() { // credit for guid goes here: gist.github.com/2295777
				return tpl_guid.replace( re_guid, guid_replace );
			},
			id          : function id( item, prefix ) {
				return item ? 'id' in Object( item ) && item.id ? item.id : ( item.id = id_create( prefix ) ) : id_create( prefix );
			},
			interpolate : function interpolate( str, o, pattern ) {
				return String( str ).replace( ( pattern || re_gsub ), function( m, p ) {
					return o[p] || '';
				} );
			},
			iter        : function iter( item ) {
				return !!( ( item || typeof item == 'string' ) && ( 'length' in Object( item ) || typeof item == 'object' ) );
			},
			k           : function k( item ) { return item; },
			len         : function len( item ) {
				return ( 'length' in ( item = Object( item ) ) ? item : Object.keys( item ) ).length;
			},
			noop        : function noop() {},
			range       : function range( i, j ) {
				return isNaN( i ) ? range_str( i, j ) : range_num( i, j );
			},
			remove      : function remove( item, keys ) {
				keys = Array.isArray( keys ) ? keys : Array.prototype.slice.call( arguments, 1 );

				var remove_type = Array.isArray( item ) ? remove_array : remove_object;

				if ( keys.length == 1 )
					remove_type.call( item, keys[0] );
				else
					keys.forEach( remove_type, item );

				return item;
			}
		};
