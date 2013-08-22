suite( 'muigui/useful-util', function() {

	test( '<static> util.assign', function( done ) {
		var expected = { one : { two : { three : true, four : [1, 2, 3, 4] } } },
			returned = {};

		util.assign( returned, 'one', {} );
		util.assign( returned, 'one.two', {} );
		util.assign( returned, 'one.two.three', true );
		util.assign( returned, 'one.two.four', [1, 2, 3, 4] );

		expect( returned ).to.eql( expected );

		done();
	} );

	test( '<static> util.bless', function( done ) {
		var expected = { foo : { bar : 'hello' } };

		expect( util.bless( 'foo.bar' ) ).to.be.an( 'object' );

		expect( util.bless( 'foo.bar', expected ) ).to.equal( 'hello' );

		done();
	} );

	test( '<static> util.coerce', function( done ) {
		expect( util.coerce( 'false'     ) ).to.equal( false );
		expect( util.coerce( 'null'      ) ).to.equal( null );
		expect( util.coerce( 'true'      ) ).to.equal( true );
		expect( util.coerce( 'undefined' ) ).to.equal( undefined );
		expect( isNaN( util.coerce( 'NaN' ) ) ).to.equal( true );
		expect( util.coerce( '1' ) ).to.equal( 1 );
		expect( util.coerce( '12' ) ).to.equal( 12 );
		expect( util.coerce( '123' ) ).to.equal( 123 );
		expect( util.coerce( '123.4' ) ).to.equal( 123.4 );
		expect( util.coerce( '123.45' ) ).to.equal( 123.45 );
		expect( util.coerce( '123.456' ) ).to.equal( 123.456 );
		expect( util.coerce( '1e10' ) ).to.equal( 10000000000 );
		expect( util.coerce( '.0000000001e10' ) ).to.equal( 1 );

		done();
	} );

	test( '<static> util.copy', function( done ) {
		var expected = { foo : { bar : 'hello' } };

		expect( util.copy( {}, expected ) ).to.eql( expected );
		expect( util.copy( expected, { foo : { bar : 'goodbye' } }, true ) ).to.eql( expected );
		expect( util.copy( { foo : { bar : 'goodbye' } }, expected ) ).to.eql( expected );

		done();
	} );

	test( '<static> util.empty', function( done ) {
		expect( util.empty( '' ) ).to.equal( true );
		expect( util.empty( [] ) ).to.equal( true );
		expect( util.empty( NaN ) ).to.equal( true );
		expect( util.empty( {} ) ).to.equal( true );
		expect( util.empty( null ) ).to.equal( true );
		expect( util.empty( undefined ) ).to.equal( true );
		expect( util.empty() ).to.equal( true );
		expect( util.empty( 0 ) ).to.equal( false );
		expect( util.empty( ' ' ) ).to.equal( false );
		expect( util.empty( [''] ) ).to.equal( false );
		expect( util.empty( { foo : '' } ) ).to.equal( false );

		done();
	} );

	test( '<static> util.exists', function( done ) {
		expect( util.exists( 0 ) ).to.equal( true );
		expect( util.exists( false ) ).to.equal( true );
		expect( util.exists( '' ) ).to.equal( true );
		expect( util.exists( NaN ) ).to.equal( false );
		expect( util.exists( null ) ).to.equal( false );
		expect( util.exists( undefined ) ).to.equal( false );

		done();
	} );

	test( '<static> util.format', function( done ) {
		expect( util.format( '{0}, {1}, {2}, {3}, {4}, {5}, {6}, ${7}, ${8}, ${9}', 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ) ).to.deep.equal( 'zero, one, two, three, four, five, six, seven, eight, nine' );
		expect( util.format( '{ "{0}" : \'{1}\', "${2}" : \'${3}\' }', 'zero', 'one', 'two', 'three' ) ).to.deep.equal( '{ "zero" : \'one\', "two" : \'three\' }' );

		done();
	} );

	test( '<static> util.id', function( done ) {
		var expected = { id : 'foo' }, empty_obj = {};

		expect( util.id( expected ) ).to.equal( 'foo' );
		expect( empty_obj.id ).to.equal( undefined );
		expect( util.id( empty_obj ) ).to.equal( empty_obj.id );
		expect( util.id( {}, 'foo' ).split( '-' )[0] ).to.equal( 'foo' );

		done();
	} );

	test( '<static> util.interpolate', function( done ) {
		expect( util.interpolate( 'The {one} {two} {three} jumps over the ${four} ${five}.', {
			one   : 'quick', two  : 'brown',
			three : 'fox',   four : 'lazy',
			five  : 'dog'
		} ) ).to.deep.equal( 'The quick brown fox jumps over the lazy dog.' );
		expect( util.interpolate( 'The ===one=== ===two=== ===three=== jumps over the ===four=== ===five===.', {
			one   : 'quick', two  : 'brown',
			three : 'fox',   four : 'lazy',
			five  : 'dog'
		}, /={3}([^=]+)={3}/g ) ).to.deep.equal( 'The quick brown fox jumps over the lazy dog.' );

		done();
	} );

	test( '<static> util.iter', function( done ) {
		var undef;
		expect( util.iter( [] ) ).to.equal( true );
		expect( util.iter( {} ) ).to.equal( true );
		expect( util.iter( Object.create( null ) ) ).to.equal( true );
		expect( util.iter( '' ) ).to.equal( true );
		expect( util.iter( new Date() ) ).to.equal( true );
		expect( util.iter( /.*/ ) ).to.equal( true );
		expect( util.iter( undef ) ).to.equal( false );
		expect( util.iter( null ) ).to.equal( false );
		expect( util.iter( 3 ) ).to.equal( false );

		done();
	} );

	test( '<static> util.k', function( done ) {
		var expected = { one : 1, three : 3, five : 5 };

		expect( util.k( true ) ).to.equal( true );
		expect( util.k( expected ) ).to.equal( expected );

		done();
	} );

	test( '<static> util.len', function( done ) {
		expect( util.len( { foo : 'bar' } ) ).to.equal( 1 );
		expect( util.len( ['foo', 'bar'] ) ).to.equal( 2 );

		done();
	} );

	test( '<static> util.merge', function( done ) {
		var expected = { foo : 'bar', items : [ { value : 1 }, { items : [ { value : 1 }, { items : [ { value : 1 }, { value : 2 }, { value : 3 } ], value : 2 }, { value : 3 } ], value : 2 }, { value : 3 } ] },
			returned = util.merge( Object.create( null ), expected ),
			overwritten = util.merge( { items : [ { value : '1 2 3' }, { items : util.range( 1, 100 ) } ] }, expected );

		expect( returned ).to.not.equal( expected );
		expect( returned ).to.eql( expected );
		expect( returned.items ).to.not.equal( expected.items );
		expect( returned.items[1].items[1] ).to.not.equal( expected.items[1].items[1] );

		expect( overwritten.items[0].value ).to.equal( 1 );
		expect( overwritten.items[1].items.length ).to.equal( 3 );
		expect( overwritten.items[1].items ).to.not.equal( expected.items[1].items );
		expect( overwritten.items[2].value ).to.equal( 3 );

		done();
	} );

	test( '<static> util.range:Number', function( done ) {
		var returned = util.range( 1, 10 );

		expect( returned ).to.eql( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] );
		expect( returned ).to.be.an( 'array' );

		done();
	} );

	test( '<static> util.range:String', function( done ) {
		var returned = util.range( 'a', 'z' );

		expect( returned ).to.be.an( 'array' );
		expect( returned.join( ' ' ) ).to.eql( 'a b c d e f g h i j k l m n o p q r s t u v w x y z' );

		expect( util.range( 'A', 'z' ).join( ' ' ) ).to.eql( 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z' );
		expect( util.range( 'α', 'ω' ).join( ' ' ) ).to.eql( 'α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ ς σ τ υ φ χ ψ ω' );

		done();
	} );

	test( '<static> util.remove', function( done ) {
		var expected = { one : 1, three : 3, five : 5 };

		expect( util.remove( { one : 1, two : 2, three : 3, four : 4, five : 5 }, 'two', 'four' ) ).to.eql( expected );
		expect( util.remove( { one : 1, two : 2, three : 3, four : 4, five : 5 }, ['two', 'four'] ) ).to.eql( expected );

		done();
	} );

	test( '<static> util.update', function( done ) {
		var expected = { foo : 'bar', items : [ { id : 1, value : 1 }, { items : [ { value : 1 }, { items : [ { value : 1 }, { value : 2 }, { value : 3 } ], value : 2 }, { value : 3 } ], value : 2 }, { value : 3 } ] },
			returned = util.update( Object.create( null ), expected ),
			overwritten = util.update( { foo : 'foo', items : [ { value : '1 2 3' }, { items : [ { id : 0 }, { items : [ { id : 2 } ] }].concat( util.range( 0, 3 ) ) } ] }, expected );

		expect( returned ).to.not.equal( expected );
		expect( returned ).to.eql( expected );
		expect( returned.items ).to.not.equal( expected.items );
		expect( returned.items[1].items[1] ).to.not.equal( expected.items[1].items[1] );

		expect( overwritten.foo ).to.equal( 'foo' );
		expect( overwritten.items[1].items.length ).to.equal( 6 );
		expect( overwritten.items[0].id ).to.equal( 1 );
		expect( overwritten.items[0].value ).to.equal( '1 2 3' );
		expect( overwritten.items[0] ).to.not.equal( expected.items[0] );
		expect( overwritten.items[1].items[0].id ).to.equal( 0 );
		expect( overwritten.items[1].items[0].value ).to.equal( 1 );
		expect( overwritten.items[1].items[1].items.length ).to.equal( 3 );
		expect( overwritten.items[1].items[1].items[0].id ).to.equal( 2 );
		expect( overwritten.items[1].items[1].items[0].value ).to.equal( 1 );
		expect( overwritten.items[1].items[1].items.length ).to.not.equal( expected.items[1].items[1].items );

		done();
	} );

	test( '<static> util.value', function( done ) {
		var d = { one : { two : { three : true, four : [1, 2, 3, 4] } } };

		expect( util.value( d, 'one' ) ).to.eql( d.one );
		expect( util.value( d, 'one.two' ) ).to.eql( d.one.two );
		expect( util.value( d, 'one.two.three' ) ).to.eql( d.one.two.three );
		expect( util.value( d, 'one.two.four' ) ).to.eql( d.one.two.four );
		expect( util.value( d, 'one.two.four.2' ) ).to.eql( d.one.two.four[2] );
		expect( util.value( d, 'one.three.four.2' ) ).to.equal( undefined );
		expect( util.value( d, 'one.two.beep.7' ) ).to.equal( undefined );
		expect( util.value( d, 'one.two.four.7' ) ).to.equal( undefined );

		done();
	} );
} );
