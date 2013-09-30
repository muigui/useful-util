suite( 'muigui/useful-util', function() {
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
} );
