
# useful-util

  useful functions i never really know where to put

## Installation

  Install with [component(1)](http://component.io):

    $ component install muigui/useful-util

  Install with npm:

    $ npm install useful-util

## API

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

## License

(The MIT License)

Copyright (c) 2011 christos "constantology" constandinou http://muigui.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

