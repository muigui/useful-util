	function bless_ctx( ctx ) {
		return ENV == 'commonjs'
			? ( ctx ? is_mod( ctx ) ? ctx.exports : ctx : module.exports ) // todo: this won't work in component.io's structure
			: ctx || root;
	}

	function guid_replace( match ) {
		var num = ( Math.random() * 16 ) | 0;
		return ( match == 'x' ? num : ( num & 0x3 | 0x8 ) ).toString( 16 );
	}

	function id_create( prefix ) {
		return ( prefix || id_prefix ) + '-' + ( ++id_count );
	}

	function is_mod( mod ) {
		if ( Module === null )
			return false;

		try {
			return mod instanceof Module;
		}
		catch ( e ) {}

		return false;
	}

	function is_plain_object( item ) {
		if ( item === UNDEF || item === null || typeof item !== 'object' )
			return false;

		var proto = Object.getPrototypeOf( item );

		return !!( proto === null || proto.constructor === Object );
	}

	function merge_array( target, source, i ) {
		target[i] = util.merge( target[i], source );

		return target;
	}

	function merge_object( o, key ) {
		o.target[key] = util.merge( o.target[key], o.source[key] );

		return o;
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

	function update_array( target, source, i ) {
		target[i] = util.update( target[i], source );

		return target;
	}

	function update_object( o, key ) {
		o.target[key] = util.update( o.target[key], o.source[key] );

		return o;
	}

	var UNDEF,
		ENV       = typeof navigator != 'undefined' ? 'browser' : typeof module != 'undefined' && 'exports' in module && typeof require == 'function' ? 'commonjs' : 'other',
		Module    = ENV != 'commonjs' ? null : require( 'module' ),
		force     = [false, NaN, null, true, UNDEF].reduce( function( res, val ) {
			res[String( val )] = val;

			return res;
		}, Object.create( null ) ),
		id_count  = 999,
		id_prefix = 'anon',
		re_gsub   =  /\$?\{([^\}'"]+)\}/g,
		re_guid   = /[xy]/g,
		root      = typeof global == 'undefined' ? window : global,
		tpl_guid  = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
		util      = module.exports = {
			ENV         : ENV,
			global      : root,
			assign      : function assign( item, key, value ) {
				var prop = key;

				if ( util.exists( item ) ) {
					if ( !!~key.indexOf( '.' ) ) {
						key    = key.split( '.' );
						prop   = key.pop();
						item   = util.bless( key, item );
					}

					item[prop] = value;

// we're using == instead of ===
// because html attributes may coerce the value into a string when it is assigned, this is fine.
					if ( item[prop] != value ) {
						if ( typeof item.set == 'function' )
							item.set( prop, value );
						else if ( typeof item.setAttribute == 'function' )
							item.setAttribute( prop, value );
					}
				}

				return value;
			},
			bless       : function bless( ns, ctx ) {
				if ( !Array.isArray( ns ) ) {
					if ( typeof ns == 'string' )
						ns = ns.split( '.' );
					else
						return bless_ctx( ctx );
				}

				if ( !ns.length )
					return bless_ctx( ctx );

				ctx = bless_ctx( ctx );

				var o;

				while ( o = ns.shift() )
					ctx = ctx[o] || ( ctx[o] = Object.create( null ) );

				return ctx;
			},
			coerce      : function coerce( item ) {
				var num = Number( item ), str;

				return !isNaN( num ) ? num : ( str = String( item ) ) in force ? force[str] : item;
			},
			copy        : function copy( target, source, no_overwrite ) {
				no_overwrite = no_overwrite === true;

				if ( !source ) {
					source = target;
					target = {};
				}

				source = Object( source );

				for ( var key in source )
					if ( Object.prototype.hasOwnProperty.call( source, key ) && ( no_overwrite !== true || !Object.prototype.hasOwnProperty.call( target, key ) ) )
						target[key] = source[key];

				return target;
			},
			empty       : function empty( item ) {
				return !util.exists( item ) || ( !util.len( item ) && util.iter( item ) ) || false;
			},
			exists      : function exists( item ) {
				return !( item === null || item === UNDEF || ( typeof item == 'number' && isNaN( item ) ) );
			},
			format      : function format( str ) {
				return util.interpolate( str, Array.prototype.slice.call( arguments, 1 ) );
			},
			guid        : function guid() { // credit for guid goes here: gist.github.com/2295777
				return tpl_guid.replace( re_guid, guid_replace );
			},
			id          : function id( item, prefix ) {
				return item ? 'id' in Object( item ) && !util.empty( item.id ) ? item.id : ( item.id = id_create( prefix ) ) : id_create( prefix );
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
			merge       : function merge( target, source ) {
				if ( source === UNDEF ) {
					if ( target === UNDEF ) // todo: test
						return  target;

					if ( Array.isArray( target ) )
						return  target.reduce( merge_array, [] );

					else if ( is_plain_object( target ) )
						return  Object.keys( target ).reduce( merge_object, {
									source : target,
									target : {}
								} ).target;

					return target;
				}

				if ( Array.isArray( source ) ) {
					if ( !Array.isArray( target ) )
						target = [];
					else
						target.length = source.length; // remove any extra items on the merged Array

						return source.reduce( merge_array, target );
				}
				else if ( is_plain_object( source ) )
					return  Object.keys( source ).reduce( merge_object, {
								source : source,
								target : is_plain_object( target ) ? target : {}
							} ).target;

				return source;
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
			},
			update      : function update( target, source ) {
				if ( source === UNDEF )
					return util.merge( target );

				if ( target === UNDEF || target === null )
					return util.merge( source );

				if ( Array.isArray( source ) ) {
					if ( !Array.isArray( target ) )
						return target;

					return source.reduce( update_array, target )
				}
				else if ( is_plain_object( source ) ) {
					if ( !is_plain_object( target ) )
						return target;

					return Object.keys( source ).reduce( update_object, { source : source, target : target } ).target;
				}

				return target;
			},
			value       : function value( item, key )  {
				var val;

				if ( !util.exists( item ) )
					return UNDEF;

				if ( key in item )
					return item[key];

				if ( isNaN( +key ) ) {
					if ( !!~key.indexOf( '.' ) ) {
						key = key.split( '.' );

						while ( val = key.shift() )
							if ( ( item = util.value( item, val ) ) === UNDEF )
								break;

						return item;
					}
				}

				return item[key] !== UNDEF
					 ? item[key]                : typeof item.get          == 'function'
					 ? item.get( key )          : typeof item.getAttribute == 'function'
					 ? item.getAttribute( key ) : UNDEF;
			}
		};
