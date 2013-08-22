
# useful-util

  useful functions i never really know where to put

## Installation

  Install with [component(1)](http://component.io):

    $ component install muigui/useful-util

  Install with npm:

    $ npm install useful-util

## API

### assign( item:Object, path:String, value:Mixed ):Mixed
Assign a `value` to an `item` using the given `path`.

Returns the passed `value`.

#### Example:

```javascript

	var util = require( 'useful-util' );

    var data = {};

    util.assign( data, 'one', {} );                   // data == { one : {} }

    util.value( data, 'one.two', {} );                // data == { one : { two : {} } }

    util.value( data, 'one.two.three', true );        // data == { one : { two : { three : true } } }

    util.value( data, 'one.two.four', [1, 2, 3, 4] ); // data == { one : { two : { three : true, four : [1, 2, 3, 4] } } }

```

### bless( namespace:String[, context:Object] ):Object
Creates an Object representation of the passed `namespace` String and returns it.

If a `context` Object is given, the Object tree created will be added to the `context` Object, otherwise it will be added to the global namespace.

**NOTE:** If any existing Objects with the same name already exist, they will **NOT** be replaced and any child Objects will be appended to them.

#### Example:

```javascript

	var util = require( 'useful-util' );

// util.ENV == 'browser'
    util.bless( 'foo.bar' );       // creates => global.foo.bar

// you can now do:
    foo.bar.Something = function() {};

    util.bless( 'foo.bar', util );   // creates => util.foo.bar

    var bar = util.bless( 'foo.bar' );

    bar === foo.bar              // returns => true

```

**IMPORTANT:** When using `util.bless` within a commonjs module: if you want your namespace Object to be assigned to the correct `module.exports`, then you should always pass the `module` — not `module.exports` — instance as the context (`ctx`) of your namespace.

#### Example:

```javascript

	var util = require( 'useful-util' );

// util.ENV == 'commonjs'

// inside my_commonjs_module.js
    util.bless( 'foo.bar', module );            // creates => module.exports.foo.bar

// you can now do:
    module.exports.foo.bar.Something = function() {};

// if you want to include "exports" in your namespace, you can do so by placing a carat (^) at the start of the String
    util.bless( 'exports.foo.bar', module ); // creates => module.exports.foo.bar

// otherwise, you will end up creating an extra exports Object, e.g:
    util.bless( 'exports.foo.bar', module ); // creates => module.exports.exports.foo.bar

// alternatively, you can also do:
    util.bless( 'foo.bar', module.exports ); // creates => module.exports.foo.bar

```

### coerce( item:Mixed ):Mixed
Attempts to coerce primitive values "trapped" in Strings, into their real types.

#### Example:

```javascript

	var util = require( 'useful-util' );

    util.coerce( 'false' );       // returns false

    util.coerce( 'null' );        // returns null

    util.coerce( 'true' );        // returns true

    util.coerce( 'undefined' );   // returns undefined

    util.coerce( 'NaN' );         // returns NaN

    util.coerce( '0001' );        // returns 1

    util.coerce( '0012' );        // returns 12

    util.coerce( '0123' );        // returns 123

    util.coerce( '123.4' );       // returns 123.4

    util.coerce( '123.45' );      // returns 123.45

    util.coerce( '123.456' );     // returns 123.456

    util.coerce( '123.456.789' ); // returns "123.456.789"

```

### copy( target:Object, source:Object[, no_overwrite:Boolean] ):Object
Copies the properties – accessible via `Object.keys` – from the `source` Object to the `target` Object and returns the `target` Object.

#### Example:

```javascript

	var util = require( 'useful-util' );

    var foo = { one : 1, two : 2, three : 3 },
        bar = util.copy( {}, foo );

    bar          // returns => { "one" : 1, "two" : 2, "three" : 3 }

    foo === bar  // returns => false

    util.copy( foo, { three : 3.3, four : 4 }, true ); // returns => { "one" : 1, "two" : 2, "three" : 3, "four" : 4 }

```

### empty( value:Mixed ):Boolean
Returns `true` if the passed `value` does not exist (see `exist` below), is an empty Array, Object, String or any other enumerable type.

#### Example:

```javascript

	var util = require( 'useful-util' );

    util.empty( undefined );    // returns => true

    util.empty( null );         // returns => true

    util.empty( '' );           // returns => true

    util.empty( [] );           // returns => true

    util.empty( {} );           // returns => true

    util.empty( ' ' );          // returns => false

    util.empty( [1] );          // returns => false

    util.empty( { 0 : null } ); // returns => false

```

### exists( value:Mixed ):Boolean
Returns `false` if the passed `value` is `undefined` , `NaN` or `null`, returns `true` otherwise.

#### Example:

```javascript

	var util = require( 'useful-util' );

    util.exists( undefined ); // returns => false

    util.exists( NaN );       // returns => false

    util.exists( null );      // returns => false

    util.exists( 0 );         // returns => true

    util.exists( false );     // returns => true

    util.exists( {} );        // returns => true

```

### format( tpl:String, arg1:String[, arg2:String, ..., argN:String] ):String
Replaces the – zero indexed – numeric tokens in the String with the passed parameters.

If a token does not have a value, an empty String is used in its place.

**NOTE:** `format` calls `interpolate` internally.

#### Example:

```javascript

	var util = require( 'useful-util' );

    util.format( '{0} {1} {2} {3}', 'lorem', 'ipsum', 'dolor' ) // returns => "lorem ipsum dolor "

```

### interpolate( tpl:String, dictionary:String[]|String{}[, pattern:RegExp] ):String
Replaces the tokens in the String with the values of the corresponding properties from the passed `dictionary` Object.

Also accepts an optional second parameter allowing you to define your own token matching `pattern`.

If a token does not have a value, an empty String is used in its place.

#### Example:

```javascript

	var util = require( 'useful-util' );

    util.interpolate( '{one} {two} {three} {four}', { one : 'lorem', two : 'ipsum', three : 'dolor' } ) // returns => "lorem ipsum dolor "

```

### guid():String
Generates a guid/uuid, the code for this was adapted from [this gist](https://gist.github.com/2295777).

```javascript

	var util = require( 'useful-util' );

	util.guid(); // returns something like => "286cb768-df10-4466-aabf-f5cb4ba406a2"

```

### id( item:Mixed[, prefix:String] ):String
Returns the `id` property of the passed item – item can be an Object, HTMLElement, "JavaScript Class" instance, etc...

If an `id` does not exist on the passed `item`, the item is assigned an auto-generated `id` and the value is returned.

If a `prefix` is supplied then it is used as the prefix for the `id` – if not `anon` is used as the `prefix`.

An internal counter that is automatically incremented is appended to the end of the `prefix` and is separated from the prefix by a hyphen.

#### Example:

```javascript

	var util = require( 'useful-util' );

    var foo = { id   : 'foo' },
       bar = { name : 'bar' },
       yum = { nam  : 'yum' };

    util.id( foo );         // returns => "foo"

    util.id( bar );         // returns => "anon-1000"

    util.id( yum, 'yum' );  // returns => "yum-1001"

```

### iter( item:Mixed ):Boolean
Returns `true` if the passed item can be iterated over.

### k( item:Mixed ):Mixed
A Function which returns the the first parameter passed to it.

#### Example

```javascript

	var util = require( 'useful-util' );

    util.k( true );            // returns => true

    util.k( 'foo' );           // returns => "foo"

    util.k( { foo : 'bar' } ); // returns => { "foo" : "bar" }

```

### len( item:Mixed ):Number
Tries the returns the `length` property of the passed `item`.

#### Example:

```javascript

	var util = require( 'useful-util' );

    util.len( { one : 1, two : 2, three : 3 } ); // returns => 3

    util.len( [1, 2, 3] );                       // returns => 3

    util.len( 'foobar' );                        // returns => 6

    util.len( { one : 1, two : 2, three : 3 } ) === Object.keys( { one : 1, two : 2, three : 3 } ).length
    // returns => true

```

### merge( target:Array|Object, source:Array|Object ):Boolean
Performs a "deep copy" of all the properties in `source` to `target`, so that `target` does not reference any child Arrays and/ or Objects that belong to `source`.

### noop():void
An empty Function that returns nothing.

### range( begin:Number|String, end:Number|String ):Array
Returns an Array starting at `begin` where each value is incremented by `1` until `end` is reached.

#### Example:

```javascript

	var util = require( 'useful-util' );

    util.range(  1,   10 );  // returns => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    util.range( 20, 1000 );  // returns => [20, 21, 22, ..., 1000]

    util.range( 'A', 'z' );  // returns => ['A', 'B', 'C', ..., 'x', 'y', 'z']
    util.range( 'α', 'ω' ); // returns => ['α', 'β', 'γ', ..., 'χ', 'ψ', 'ω']

```

**NOTE:** Only the first character will be incremented in a `String` range.

### remove( item:Array, value_or_index1:Number|Mixed|Number[]|Mixed[][, value_or_index2:Number|Mixed, ..., value_or_indexN:Number|Mixed] ):item
### remove( item:Object, property1:String|String[][, property2:String, ..., propertyN:String] ):item
Removes items from the passed Array or Object and returns the passed Array or Object.

If removing items from an Array, you can either pass the index of the item you want to remove or the item itself.
If removing items from an Object, you simply pass the key of the item you want to remove.

#### Example:

```javascript

	var util = require( 'useful-util' );

    var foo_arr = ['one', 'two', 'three'],
       foo_obj = { one : 1, two : 2, three : 3 };

    util.remove( foo_arr, 'one', 'three' );   // returns => ['two']

    util.remove( foo_arr, ['one', 'three'] ); // same as above

    util.remove( foo_arr, 0, 2 );             // same as above

    util.remove( foo_arr, [0, 2] );           // same as above

    util.remove( foo_obj, 'one', 'three' );   // returns => { two : 2 }

    util.remove( foo_obj, ['one', 'three'] ); // same as above

```

### update( target:Array|Object, source:Array|Object ):Boolean
Performs a "deep copy" of all the properties in `source` **that are not already contained in** `target`, so that `target` does not reference any child Arrays and/ or Objects that belong to `source`.

This works similarly to `util.merge` except that existing properties are not overwritten.

### value( item:Object, path:String ):Mixed
Returns the property value at the specified path in an Object.

#### Example:

```javascript

	var util = require( 'useful-util' );

    var data = { one : { two : { three : true, four : [1, 2, 3, 4] } } };

    util.value( data, 'one' );            // returns => { two : { three : true, four : [1, 2, 3, 4] } }

    util.value( data, 'one.two' );        // returns => { three : true, four : [1, 2, 3, 4] }

    util.value( data, 'one.two.three' );  // returns => { three : true }

    util.value( data, 'one.two.four' );   // returns => [1, 2, 3, 4]

    util.value( data, 'one.two.four.2' ); // returns => 3

```

## License

(The MIT License)

Copyright (c) 2011 christos "constantology" constandinou http://muigui.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

