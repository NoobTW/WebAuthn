(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('crypto'), require('bignumber.js'), require('stream'), require('buffer'), require('util'), require('node-inspect-extracted'), require('constants'), require('assert')) :
	typeof define === 'function' && define.amd ? define(['exports', 'crypto', 'bignumber.js', 'stream', 'buffer', 'util', 'node-inspect-extracted', 'constants', 'assert'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.webauthn_server = {}, global.require$$0$5, global.require$$0$1, global.require$$0$3, global.require$$0$4, global.require$$0$2, global.require$$6, global.require$$1, global.require$$0$6));
}(this, (function (exports, require$$0$5, require$$0$1, require$$0$3, require$$0$4, require$$0$2, require$$6, require$$1, require$$0$6) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$0__default$4 = /*#__PURE__*/_interopDefaultLegacy(require$$0$5);
	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
	var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);
	var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$4);
	var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
	var require$$6__default = /*#__PURE__*/_interopDefaultLegacy(require$$6);
	var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
	var require$$0__default$5 = /*#__PURE__*/_interopDefaultLegacy(require$$0$6);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire (path) {
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}

	var base64url$9 = {exports: {}};

	var base64url$8 = {};

	var padString$1 = {};

	Object.defineProperty(padString$1, "__esModule", { value: true });
	function padString(input) {
	    var segmentLength = 4;
	    var stringLength = input.length;
	    var diff = stringLength % segmentLength;
	    if (!diff) {
	        return input;
	    }
	    var position = stringLength;
	    var padLength = segmentLength - diff;
	    var paddedStringLength = stringLength + padLength;
	    var buffer = Buffer.alloc(paddedStringLength);
	    buffer.write(input);
	    while (padLength--) {
	        buffer.write("=", position++);
	    }
	    return buffer.toString();
	}
	padString$1.default = padString;

	Object.defineProperty(base64url$8, "__esModule", { value: true });
	var pad_string_1 = padString$1;
	function encode(input, encoding) {
	    if (encoding === void 0) { encoding = "utf8"; }
	    if (Buffer.isBuffer(input)) {
	        return fromBase64(input.toString("base64"));
	    }
	    return fromBase64(Buffer.from(input, encoding).toString("base64"));
	}
	function decode(base64url, encoding) {
	    if (encoding === void 0) { encoding = "utf8"; }
	    return Buffer.from(toBase64(base64url), "base64").toString(encoding);
	}
	function toBase64(base64url) {
	    base64url = base64url.toString();
	    return pad_string_1.default(base64url)
	        .replace(/\-/g, "+")
	        .replace(/_/g, "/");
	}
	function fromBase64(base64) {
	    return base64
	        .replace(/=/g, "")
	        .replace(/\+/g, "-")
	        .replace(/\//g, "_");
	}
	function toBuffer(base64url) {
	    return Buffer.from(toBase64(base64url), "base64");
	}
	var base64url$7 = encode;
	base64url$7.encode = encode;
	base64url$7.decode = decode;
	base64url$7.toBase64 = toBase64;
	base64url$7.fromBase64 = fromBase64;
	base64url$7.toBuffer = toBuffer;
	base64url$8.default = base64url$7;

	(function (module) {
	module.exports = base64url$8.default;
	module.exports.default = module.exports;
	}(base64url$9));

	var base64url$6 = base64url$9.exports;

	var cbor$5 = {};

	var constants$7 = {};

	(function (exports) {

	// Let's get consistent first, then we can think about feature testing
	// for BigNumber support
	let bn = null;
	try {
	  bn = require$$0__default['default'].BigNumber;
	} catch (ignored) {
	  // bignumber.js isn't available
	}
	/** @type {typeof import('bignumber.js').BigNumber?} */
	exports.BigNumber = bn;

	/**
	 * @enum {number}
	 */
	exports.MT = {
	  POS_INT: 0,
	  NEG_INT: 1,
	  BYTE_STRING: 2,
	  UTF8_STRING: 3,
	  ARRAY: 4,
	  MAP: 5,
	  TAG: 6,
	  SIMPLE_FLOAT: 7
	};

	/**
	 * @enum {number}
	 */
	exports.TAG = {
	  DATE_STRING: 0,
	  DATE_EPOCH: 1,
	  POS_BIGINT: 2,
	  NEG_BIGINT: 3,
	  DECIMAL_FRAC: 4,
	  BIGFLOAT: 5,
	  BASE64URL_EXPECTED: 21,
	  BASE64_EXPECTED: 22,
	  BASE16_EXPECTED: 23,
	  CBOR: 24,
	  URI: 32,
	  BASE64URL: 33,
	  BASE64: 34,
	  REGEXP: 35,
	  MIME: 36,
	  // https://github.com/input-output-hk/cbor-sets-spec/blob/master/CBOR_SETS.md
	  SET: 258
	};

	/**
	 * @enum {number}
	 */
	exports.NUMBYTES = {
	  ZERO: 0,
	  ONE: 24,
	  TWO: 25,
	  FOUR: 26,
	  EIGHT: 27,
	  INDEFINITE: 31
	};

	/**
	 * @enum {number}
	 */
	exports.SIMPLE = {
	  FALSE: 20,
	  TRUE: 21,
	  NULL: 22,
	  UNDEFINED: 23
	};

	exports.SYMS = {
	  NULL: Symbol.for('github.com/hildjj/node-cbor/null'),
	  UNDEFINED: Symbol.for('github.com/hildjj/node-cbor/undef'),
	  PARENT: Symbol.for('github.com/hildjj/node-cbor/parent'),
	  BREAK: Symbol.for('github.com/hildjj/node-cbor/break'),
	  STREAM: Symbol.for('github.com/hildjj/node-cbor/stream')
	};

	exports.SHIFT32 = 0x100000000;

	exports.BI = {
	  MINUS_ONE: BigInt(-1),
	  NEG_MAX: BigInt(-1) - BigInt(Number.MAX_SAFE_INTEGER),
	  MAXINT32: BigInt('0xffffffff'),
	  MAXINT64: BigInt('0xffffffffffffffff'),
	  SHIFT32: BigInt(exports.SHIFT32)
	};

	if (exports.BigNumber) {
	  const MINUS_ONE = new exports.BigNumber(-1);
	  exports.BN = {
	    MINUS_ONE,
	    NEG_MAX: MINUS_ONE.minus(
	      new exports.BigNumber(Number.MAX_SAFE_INTEGER.toString(16), 16)
	    ),
	    TWO: new exports.BigNumber(2),
	    MAXINT: new exports.BigNumber('0x20000000000000'),
	    MAXINT32: new exports.BigNumber(0xffffffff),
	    MAXINT64: new exports.BigNumber('0xffffffffffffffff'),
	    SHIFT32: new exports.BigNumber(exports.SHIFT32)
	  };
	}
	}(constants$7));

	var utils$v = {};

	let TD = null;
	// Note: using globalThis is WAY more complicated than is needed.
	if (typeof TextDecoder === 'function') {
	  // This should be in most modern browsers, and node 11+
	  TD = TextDecoder;
	} else if (typeof window !== 'undefined') {
	  // eslint-disable-next-line no-undef
	  TD = window.TextDecoder;
	} else if (typeof self !== 'undefined') {
	  // eslint-disable-next-line no-undef
	  TD = self.TextDecoder;
	} else {
	  try {
	    // Node 8.3 - 10
	    const util = require$$0__default$1['default'];

	    /* istanbul ignore next */
	    if (typeof TD !== 'function') {
	      // node 10
	      TD = util.TextDecoder;
	    }
	  } catch (ignored) {
	    // util couldn't be loaded.  Probably an old browser.
	  }
	}

	if (typeof TD !== 'function') {
	  class TextDecoder {
	    constructor(utfLabel, options) {
	      this.utfLabel = utfLabel;
	      this.options = options;
	    }

	    decode(buf) {
	      // this isn't very good, but people should use more modern things
	      // so they don't need it.
	      const str = buf.toString(this.utfLabel);
	      if (this.options.fatal) {
	        for (const c of str) {
	          // U+FFFD: REPLACEMENT CHARACTER
	          if (c.codePointAt(0) === 0xFFFD) {
	            const err = new TypeError(
	              '[ERR_ENCODING_INVALID_ENCODED_DATA]: ' +
	              'The encoded data was not valid for encoding ' + this.utfLabel
	            );
	            err.code = 'ERR_ENCODING_INVALID_ENCODED_DATA';
	            err.errno = 12;
	            throw err
	          }
	        }
	      }
	      return str
	    }
	  }
	  TD = TextDecoder;
	}
	var textdecoder = TD;

	const stream$3 = require$$0__default$2['default'];
	const { Buffer: Buffer$8 } = require$$0__default$3['default'];
	const TextDecoder$1 = textdecoder;

	let util$1 = null;
	let customInspect = Symbol.for('nodejs.util.inspect.custom');
	try {
	  util$1 = require$$0__default$1['default'];
	  customInspect = util$1.inspect.custom;
	} catch (ignored) {
	  // Do without
	}
	const td = new TextDecoder$1('utf8', {fatal: true, ignoreBOM: true});

	/**
	 * NoFilter stream.  Can be used to sink or source data to and from
	 * other node streams.  Implemented as the "identity" Transform stream
	 * (hence the name), but allows for inspecting data that is in-flight.
	 *
	 * Allows passing in source data (input, inputEncoding) at creation
	 * time.  Source data can also be passed in the options object.
	 *
	 * @example <caption>source</caption>
	 * const n = new NoFilter('Zm9v', 'base64');
	 * n.pipe(process.stdout);
	 *
	 * @example <caption>sink</caption>
	 * const n = new Nofilter();
	 * // NOTE: 'finish' fires when the input is done writing
	 * n.on('finish', function() { console.log(n.toString('base64')); });
	 * process.stdin.pipe(n);
	 */
	class NoFilter$5 extends stream$3.Transform {
	  /**
	   * Create an instance of NoFilter.
	   *
	   * @param {string|Buffer} [input] - Source data
	   * @param {string} [inputEncoding=null] - Encoding name for input,
	   *   ignored if input is not a String
	   * @param {Object} [options={}] - Other options
	   * @param {string|Buffer} [options.input=null] - Input source data
	   * @param {string} [options.inputEncoding=null] - Encoding name for input,
	   *   ignored if input is not a String
	   * @param {number} [options.highWaterMark=16384] - The maximum number of bytes
	   *   to store in the internal buffer before ceasing to read from the
	   *   underlying resource. Default=16kb, or 16 for objectMode streams
	   * @param {string} [options.encoding=null] - If specified, then buffers will
	   *   be decoded to strings using the specified encoding
	   * @param {boolean} [options.objectMode=false] - Whether this stream should
	   *   behave as a stream of objects. Meaning that stream.read(n) returns a
	   *   single value instead of a Buffer of size n
	   * @param {boolean} [options.decodeStrings=true] - Whether or not to decode
	   *   strings into Buffers before passing them to _write()
	   * @param {boolean} [options.watchPipe=true] - Whether to watch for 'pipe'
	   *   events, setting this stream's objectMode based on the objectMode of the
	   *   input stream
	   * @param {boolean} [options.readError=false] - If true, when a read()
	   *   underflows, throw an error.
	   */
	  constructor(input, inputEncoding, options) {
	    if (options == null) {
	      options = {};
	    }
	    let inp = null;
	    let inpE = null;
	    switch (typeof(input)) {
	      case 'object':
	        if (Buffer$8.isBuffer(input)) {
	          inp = input;
	          if ((inputEncoding != null) && (typeof(inputEncoding) === 'object')) {
	            options = inputEncoding;
	          }
	        } else {
	          options = input;
	        }
	        break
	      case 'string':
	        inp = input;
	        if ((inputEncoding != null) && (typeof(inputEncoding) === 'object')) {
	          options = inputEncoding;
	        } else {
	          inpE = inputEncoding;
	        }
	        break
	    }

	    if ((options == null)) {
	      options = {};
	    }
	    if (inp == null) {
	      inp = options.input;
	    }
	    if (inpE == null) {
	      inpE = options.inputEncoding;
	    }
	    delete options.input;
	    delete options.inputEncoding;
	    const watchPipe = options.watchPipe != null ? options.watchPipe : true;
	    delete options.watchPipe;
	    const readError = !! options.readError;
	    delete options.readError;
	    super(options);

	    this.readError = readError;

	    if (watchPipe) {
	      this.on('pipe', readable => {
	        const om = readable._readableState.objectMode;
	        if ((this.length > 0) && (om !== this._readableState.objectMode)) {
	          throw new Error(
	            'Do not switch objectMode in the middle of the stream'
	          )
	        }

	        this._readableState.objectMode = om;
	        this._writableState.objectMode = om;
	      });
	    }

	    if (inp != null) {
	      this.end(inp, inpE);
	    }
	  }

	  /**
	   * Is the given object a {NoFilter}?
	   *
	   * @param {Object} obj The object to test.
	   * @returns {boolean} true if obj is a NoFilter
	   */
	  static isNoFilter(obj) {
	    return obj instanceof this
	  }

	  /**
	   * The same as nf1.compare(nf2). Useful for sorting an Array of NoFilters.
	   *
	   * @param {NoFilter} nf1 - The first object to compare
	   * @param {NoFilter} nf2 - The second object to compare
	   * @returns {number} -1, 0, 1 for less, equal, greater
	   *
	   * @example
	   * const arr = [new NoFilter('1234'), new NoFilter('0123')];
	   * arr.sort(NoFilter.compare);
	   */
	  static compare(nf1, nf2) {
	    if (!(nf1 instanceof this)) {
	      throw new TypeError('Arguments must be NoFilters')
	    }
	    if (nf1 === nf2) {
	      return 0
	    }
	    return nf1.compare(nf2)
	  }

	  /**
	   * Returns a buffer which is the result of concatenating all the
	   * NoFilters in the list together. If the list has no items, or if
	   * the totalLength is 0, then it returns a zero-length buffer.
	   *
	   * If length is not provided, it is read from the buffers in the
	   * list. However, this adds an additional loop to the function, so
	   * it is faster to provide the length explicitly if you already know it.
	   *
	   * @param {Array<NoFilter>} list Inputs.  Must not be all either in object
	   *   mode, or all not in object mode.
	   * @param {number} [length=null] Number of bytes or objects to read
	   * @returns {Buffer|Array} The concatenated values as an array if in object
	   *   mode, otherwise a Buffer
	   */
	  static concat(list, length) {
	    if (!Array.isArray(list)) {
	      throw new TypeError('list argument must be an Array of NoFilters')
	    }
	    if ((list.length === 0) || (length === 0)) {
	      return Buffer$8.alloc(0)
	    }
	    if ((length == null)) {
	      length = list.reduce((tot, nf) => {
	        if (!(nf instanceof NoFilter$5)) {
	          throw new TypeError('list argument must be an Array of NoFilters')
	        }
	        return tot + nf.length
	      }, 0);
	    }
	    let allBufs = true;
	    let allObjs = true;
	    const bufs = list.map(nf => {
	      if (!(nf instanceof NoFilter$5)) {
	        throw new TypeError('list argument must be an Array of NoFilters')
	      }
	      const buf = nf.slice();
	      if (Buffer$8.isBuffer(buf)) {
	        allObjs = false;
	      } else {
	        allBufs = false;
	      }
	      return buf
	    });
	    if (allBufs) {
	      return Buffer$8.concat(bufs, length)
	    }
	    if (allObjs) {
	      return [].concat(...bufs).slice(0, length)
	    }
	    // TODO: maybe coalesce buffers, counting bytes, and flatten in arrays
	    // counting objects?  I can't imagine why that would be useful.
	    throw new Error('Concatenating mixed object and byte streams not supported')
	  }

	  /**
	   * @private
	   */
	  _transform(chunk, encoding, callback) {
	    if (!this._readableState.objectMode && !Buffer$8.isBuffer(chunk)) {
	      chunk = Buffer$8.from(chunk, encoding);
	    }
	    this.push(chunk);
	    callback();
	  }

	  /**
	   * @private
	   */
	  _bufArray() {
	    let bufs = this._readableState.buffer;
	    // HACK: replace with something else one day.  This is what I get for
	    // relying on internals.
	    if (!Array.isArray(bufs)) {
	      let b = bufs.head;
	      bufs = [];
	      while (b != null) {
	        bufs.push(b.data);
	        b = b.next;
	      }
	    }
	    return bufs
	  }

	  /**
	   * Pulls some data out of the internal buffer and returns it.
	   * If there is no data available, then it will return null.
	   *
	   * If you pass in a size argument, then it will return that many bytes. If
	   * size bytes are not available, then it will return null, unless we've
	   * ended, in which case it will return the data remaining in the buffer.
	   *
	   * If you do not specify a size argument, then it will return all the data in
	   * the internal buffer.
	   *
	   * @param {number} [size=null] - Number of bytes to read.
	   * @returns {string|Buffer|null} If no data or not enough data, null.  If
	   *   decoding output a string, otherwise a Buffer
	   * @throws Error - if readError is true and there was underflow
	   * @fires NoFilter#read
	   */
	  read(size) {
	    const buf = super.read(size);
	    if (buf != null) {
	      /*
	       * Read event. Fired whenever anything is read from the stream.
	       *
	       * @event NoFilter#read
	       * @type {Buffer|string|Object}
	       *
	       */
	      this.emit('read', buf);
	      if (this.readError && (buf.length < size)) {
	        throw new Error(`Read ${buf.length}, wanted ${size}`)
	      }
	    } else if (this.readError) {
	      throw new Error(`No data available, wanted ${size}`)
	    }
	    return buf
	  }

	  /**
	   * Return a promise fulfilled with the full contents, after the 'finish'
	   * event fires.  Errors on the stream cause the promise to be rejected.
	   *
	   * @param {function} [cb=null] - finished/error callback used in *addition*
	   *   to the promise
	   * @returns {Promise<Buffer|String>} fulfilled when complete
	   */
	  promise(cb) {
	    let done = false;
	    return new Promise((resolve, reject) => {
	      this.on('finish', () => {
	        const data = this.read();
	        if ((cb != null) && !done) {
	          done = true;
	          cb(null, data);
	        }
	        resolve(data);
	      });
	      this.on('error', er => {
	        if ((cb != null) && !done) {
	          done = true;
	          cb(er);
	        }
	        reject(er);
	      });
	    })
	  }

	  /**
	   * Returns a number indicating whether this comes before or after or is the
	   * same as the other NoFilter in sort order.
	   *
	   * @param {NoFilter} other - The other object to compare
	   * @returns {Number} -1, 0, 1 for less, equal, greater
	   */
	  compare(other) {
	    if (!(other instanceof NoFilter$5)) {
	      throw new TypeError('Arguments must be NoFilters')
	    }
	    if (this === other) {
	      return 0
	    }

	    const buf1 = this.slice();
	    const buf2 = other.slice();
	    // these will both be buffers because of the check above.
	    if (Buffer$8.isBuffer(buf1) && Buffer$8.isBuffer(buf2)) {
	      return buf1.compare(buf2)
	    }
	    throw new Error('Cannot compare streams in object mode')
	  }

	  /**
	   * Do these NoFilter's contain the same bytes?  Doesn't work if either is
	   * in object mode.
	   *
	   * @param {NoFilter} other
	   * @returns {boolean} Equal?
	   */
	  equals(other) {
	    return this.compare(other) === 0
	  }

	  /**
	   * Read bytes or objects without consuming them.  Useful for diagnostics.
	   * Note: as a side-effect, concatenates multiple writes together into what
	   * looks like a single write, so that this concat doesn't have to happen
	   * multiple times when you're futzing with the same NoFilter.
	   *
	   * @param {Number} [start=0] - beginning offset
	   * @param {Number} [end=length] - ending offset
	   * @returns {Buffer|Array} if in object mode, an array of objects.  Otherwise,
	   *   concatenated array of contents.
	   */
	  slice(start, end) {
	    if (this._readableState.objectMode) {
	      return this._bufArray().slice(start, end)
	    }
	    const bufs = this._bufArray();
	    switch (bufs.length) {
	      case 0: return Buffer$8.alloc(0)
	      case 1: return bufs[0].slice(start, end)
	      default: {
	        const b = Buffer$8.concat(bufs);
	        // TODO: store the concatented bufs back
	        // @_readableState.buffer = [b]
	        return b.slice(start, end)
	      }
	    }
	  }

	  /**
	    * Get a byte by offset.  I didn't want to get into metaprogramming
	    * to give you the `NoFilter[0]` syntax.
	    *
	    * @param {Number} index - The byte to retrieve
	    * @returns {Number} 0-255
	    */
	  get(index) {
	    return this.slice()[index]
	  }

	  /**
	   * Return an object compatible with Buffer's toJSON implementation, so
	   * that round-tripping will produce a Buffer.
	   *
	   * @returns {Object}
	   *
	   * @example output for 'foo'
	   *   { type: 'Buffer', data: [ 102, 111, 111 ] }
	   */
	  toJSON() {
	    const b = this.slice();
	    if (Buffer$8.isBuffer(b)) {
	      return b.toJSON()
	    }
	    return b
	  }

	  /**
	   * Decodes and returns a string from buffer data encoded using the specified
	   * character set encoding. If encoding is undefined or null, then encoding
	   * defaults to 'utf8'. The start and end parameters default to 0 and
	   * NoFilter.length when undefined.
	   *
	   * @param {String} [encoding='utf8'] - Which to use for decoding?
	   * @param {Number} [start=0] - Start offset
	   * @param {Number} [end=length] - End offset
	   * @returns {String}
	   */
	  toString(encoding, start, end) {
	    const buf = this.slice(start, end);
	    if (!Buffer$8.isBuffer(buf)) {
	      return JSON.stringify(buf)
	    }
	    if (!encoding || (encoding === 'utf8')) {
	      return td.decode(buf)
	    }
	    return buf.toString(encoding, start, end)
	  }

	  /**
	   * @private
	   * @deprecated
	   */
	  inspect(depth, options) {
	    return this[customInspect](depth, options)
	  }

	  /**
	   * @private
	   */
	  [customInspect](depth, options) {
	    const bufs = this._bufArray();
	    const hex = bufs.map(b => {
	      if (Buffer$8.isBuffer(b)) {
	        if ((options != null ? options.stylize : undefined)) {
	          return options.stylize(b.toString('hex'), 'string')
	        }
	        return b.toString('hex')
	      }
	      if (util$1) {
	        return util$1.inspect(b, options)
	      }
	      return b.toString()
	    }).join(', ');
	    return `${this.constructor.name} [${hex}]`
	  }

	  /**
	   * Current readable length, in bytes.
	   *
	   * @member {number}
	   * @readonly
	   */
	  get length() {
	    return this._readableState.length
	  }

	  /**
	   * Write a JavaScript BigInt to the stream.  Negative numbers will be
	   * written as their 2's complement version.
	   *
	   * @param {bigint} val - The value to write
	   * @returns {boolean} true on success
	   */
	  writeBigInt(val) {
	    let str = val.toString(16);
	    if (val < 0) {
	      // two's complement
	      // Note: str always starts with '-' here.
	      const sz = BigInt(Math.floor(str.length / 2));
	      const mask = BigInt(1) << (sz * BigInt(8));
	      val = mask + val;
	      str = val.toString(16);
	    }
	    if (str.length % 2) {
	      str = '0' + str;
	    }
	    return this.push(Buffer$8.from(str, 'hex'))
	  }

	  /**
	   * Read a variable-sized JavaScript unsigned BigInt from the stream.
	   *
	   * @param {number}  [len=null] - number of bytes to read or all remaining
	   *   if null
	   * @returns {bigint}
	   */
	  readUBigInt(len) {
	    const b = this.read(len);
	    if (!Buffer$8.isBuffer(b)) {
	      return null
	    }
	    return BigInt('0x' + b.toString('hex'))
	  }

	  /**
	   * Read a variable-sized JavaScript signed BigInt from the stream in 2's
	   * complement format.
	   *
	   * @param {number} [len=null] - number of bytes to read or all remaining
	   *   if null
	   * @returns {bigint}
	   */
	  readBigInt(len) {
	    const b = this.read(len);
	    if (!Buffer$8.isBuffer(b)) {
	      return null
	    }
	    let ret = BigInt('0x' + b.toString('hex'));
	    // negative?
	    if (b[0] & 0x80) {
	      // two's complement
	      const mask = BigInt(1) << (BigInt(b.length) * BigInt(8));
	      ret = ret - mask;
	    }
	    return ret
	  }
	}

	/**
	 * @param {string} meth - method to call
	 * @param {number} len - number of bytes to write
	 * @private
	 */
	function _read_gen(meth, len) {
	  // eslint-disable-next-line func-names
	  return function(val) {
	    // eslint-disable-next-line no-invalid-this
	    const b = this.read(len);
	    if (!Buffer$8.isBuffer(b)) {
	      return null
	    }
	    return b[meth].call(b, 0, true)
	  }
	}

	/**
	 * @param {string} meth - method to call
	 * @param {number} len - number of bytes to write
	 * @private
	 */
	function _write_gen(meth, len) {
	  // eslint-disable-next-line func-names
	  return function(val) {
	    const b = Buffer$8.alloc(len);
	    b[meth].call(b, val, 0, true);
	    // eslint-disable-next-line no-invalid-this
	    return this.push(b)
	  }
	}

	Object.assign(NoFilter$5.prototype, {
	  /**
	   * Write an 8-bit unsigned integer to the stream.  Adds 1 byte.
	   *
	   * @function writeUInt8
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value - 0-255
	   * @returns {boolean} true on success
	   */
	  writeUInt8: _write_gen('writeUInt8', 1),

	  /**
	   * Write a little-endian 16-bit unsigned integer to the stream.  Adds
	   * 2 bytes.
	   *
	   * @function writeUInt16LE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeUInt16LE: _write_gen('writeUInt16LE', 2),

	  /**
	   * Write a big-endian 16-bit unsigned integer to the stream.  Adds
	   * 2 bytes.
	   *
	   * @function writeUInt16BE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeUInt16BE: _write_gen('writeUInt16BE', 2),

	  /**
	   * Write a little-endian 32-bit unsigned integer to the stream.  Adds
	   * 4 bytes.
	   *
	   * @function writeUInt32LE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeUInt32LE: _write_gen('writeUInt32LE', 4),

	  /**
	   * Write a big-endian 32-bit unsigned integer to the stream.  Adds
	   * 4 bytes.
	   *
	   * @function writeUInt32BE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeUInt32BE: _write_gen('writeUInt32BE', 4),

	  /**
	   * Write a signed 8-bit integer to the stream.  Adds 1 byte.
	   *
	   * @function writeInt8
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeInt8: _write_gen('writeInt8', 1),

	  /**
	   * Write a signed little-endian 16-bit integer to the stream.  Adds 2 bytes.
	   *
	   * @function writeInt16LE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeInt16LE: _write_gen('writeInt16LE', 2),

	  /**
	   * Write a signed big-endian 16-bit integer to the stream.  Adds 2 bytes.
	   *
	   * @function writeInt16BE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeInt16BE: _write_gen('writeInt16BE', 2),

	  /**
	   * Write a signed little-endian 32-bit integer to the stream.  Adds 4 bytes.
	   *
	   * @function writeInt32LE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeInt32LE: _write_gen('writeInt32LE', 4),

	  /**
	   * Write a signed big-endian 32-bit integer to the stream.  Adds 4 bytes.
	   *
	   * @function writeInt32BE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeInt32BE: _write_gen('writeInt32BE', 4),

	  /**
	   * Write a little-endian 32-bit float to the stream.  Adds 4 bytes.
	   *
	   * @function writeFloatLE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeFloatLE: _write_gen('writeFloatLE', 4),

	  /**
	   * Write a big-endian 32-bit float to the stream.  Adds 4 bytes.
	   *
	   * @function writeFloatBE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeFloatBE: _write_gen('writeFloatBE', 4),

	  /**
	   * Write a little-endian 64-bit float to the stream.  Adds 8 bytes.
	   *
	   * @function writeDoubleLE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeDoubleLE: _write_gen('writeDoubleLE', 8),

	  /**
	   * Write a big-endian 64-bit float to the stream.  Adds 8 bytes.
	   *
	   * @function writeDoubleBE
	   * @memberOf NoFilter
	   * @instance
	   * @param {Number} value
	   * @returns {boolean} true on success
	   */
	  writeDoubleBE: _write_gen('writeDoubleBE', 8),

	  /**
	   * Read an unsigned 8-bit integer from the stream.  Consumes 1 byte.
	   *
	   * @function readUInt8
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readUInt8: _read_gen('readUInt8', 1),

	  /**
	   * Read a little-endian unsigned 16-bit integer from the stream.
	   * Consumes 2 bytes.
	   *
	   * @function readUInt16LE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readUInt16LE: _read_gen('readUInt16LE', 2),

	  /**
	   * Read a big-endian unsigned 16-bit integer from the stream.
	   * Consumes 2 bytes.
	   *
	   * @function readUInt16BE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readUInt16BE: _read_gen('readUInt16BE', 2),

	  /**
	   * Read a little-endian unsigned 32-bit integer from the stream.
	   * Consumes 4 bytes.
	   *
	   * @function readUInt32LE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readUInt32LE: _read_gen('readUInt32LE', 4),

	  /**
	   * Read a big-endian unsigned 16-bit integer from the stream.
	   * Consumes 4 bytes.
	   *
	   * @function readUInt32BE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readUInt32BE: _read_gen('readUInt32BE', 4),

	  /**
	   * Read a signed 8-bit integer from the stream.
	   * Consumes 1 byte.
	   *
	   * @function readInt8
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readInt8: _read_gen('readInt8', 1),

	  /**
	   * Read a signed 16-bit little-endian integer from the stream.
	   * Consumes 2 bytes.
	   *
	   * @function readInt16LE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readInt16LE: _read_gen('readInt16LE', 2),

	  /**
	   * Read a signed 16-bit big-endian integer from the stream.
	   * Consumes 2 bytes.
	   *
	   * @function readInt16BE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readInt16BE: _read_gen('readInt16BE', 2),

	  /**
	   * Read a signed 32-bit little-endian integer from the stream.
	   * Consumes 4 bytes.
	   *
	   * @function readInt32LE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readInt32LE: _read_gen('readInt32LE', 4),

	  /**
	   * Read a signed 32-bit big-endian integer from the stream.
	   * Consumes 4 bytes.
	   *
	   * @function readInt32BE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readInt32BE: _read_gen('readInt32BE', 4),

	  /**
	   * Read a 32-bit little-endian float from the stream.
	   * Consumes 4 bytes.
	   *
	   * @function readFloatLE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readFloatLE: _read_gen('readFloatLE', 4),

	  /**
	   * Read a 32-bit big-endian float from the stream.
	   * Consumes 4 bytes.
	   *
	   * @function readFloatBE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readFloatBE: _read_gen('readFloatBE', 4),

	  /**
	   * Read a 64-bit little-endian float from the stream.
	   * Consumes 8 bytes.
	   *
	   * @function readDoubleLE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readDoubleLE: _read_gen('readDoubleLE', 8),

	  /**
	   * Read a 64-bit big-endian float from the stream.
	   * Consumes 8 bytes.
	   *
	   * @function readDoubleBE
	   * @memberOf NoFilter
	   * @instance
	   * @returns {Number} value
	   */
	  readDoubleBE: _read_gen('readDoubleBE', 8)
	});

	var lib$1 = NoFilter$5;

	(function (exports) {

	const { Buffer } = require$$0__default$3['default'];
	const NoFilter = lib$1;
	const stream = require$$0__default$2['default'];
	const TextDecoder = textdecoder;
	const constants = constants$7;
	const { NUMBYTES, SHIFT32, BI, SYMS } = constants;

	const MAX_SAFE_HIGH = 0x1fffff;

	let util = null;
	try {
	  util = require$$0__default$1['default'];
	} catch (ignored) {
	  // polyfill node-inspect-extracted in, if you're on the web

	  // I don't think getting here is possible in non-webpack node.  The normal
	  // methods of causing require('util') to fail don't work with
	  // internal packages.
	  /* istanbul ignore next */
	  util = require$$6__default['default'];
	}
	exports.inspect = util.inspect;

	/**
	 * Convert a UTF8-encoded Buffer to a JS string.  If possible, throw an error
	 * on invalid UTF8.  Byte Order Marks are not looked at or stripped.
	 */
	const td = new TextDecoder('utf8', {fatal: true, ignoreBOM: true});
	exports.utf8 = buf => td.decode(buf);
	exports.utf8.checksUTF8 = true;

	function isReadable(s) {
	  // is this a readable stream?  In the webpack version, instanceof isn't
	  // working correctly.
	  if (s instanceof stream.Readable) {
	    return true
	  }
	  return ['read', 'on', 'pipe'].every(f => typeof s[f] === 'function')
	}

	exports.isBufferish = function isBufferish(b) {
	  return b &&
	    (typeof b === 'object') &&
	    ((Buffer.isBuffer(b)) ||
	      (b instanceof Uint8Array) ||
	      (b instanceof Uint8ClampedArray) ||
	      (b instanceof ArrayBuffer) ||
	      (b instanceof DataView))
	};

	exports.bufferishToBuffer = function bufferishToBuffer(b) {
	  if (Buffer.isBuffer(b)) {
	    return b
	  } else if (ArrayBuffer.isView(b)) {
	    return Buffer.from(b.buffer, b.byteOffset, b.byteLength)
	  } else if (b instanceof ArrayBuffer) {
	    return Buffer.from(b)
	  }
	  return null
	};

	exports.parseCBORint = function parseCBORint(ai, buf, bigInt = true) {
	  switch (ai) {
	    case NUMBYTES.ONE:
	      return buf.readUInt8(0)
	    case NUMBYTES.TWO:
	      return buf.readUInt16BE(0)
	    case NUMBYTES.FOUR:
	      return buf.readUInt32BE(0)
	    case NUMBYTES.EIGHT: {
	      const f = buf.readUInt32BE(0);
	      const g = buf.readUInt32BE(4);
	      if (f > MAX_SAFE_HIGH) {
	        if (bigInt) {
	          return (BigInt(f) * BI.SHIFT32) + BigInt(g)
	        }
	        if (!constants.BigNumber) {
	          throw new Error('No bigint and no bignumber.js')
	        }
	        return new constants.BigNumber(f)
	          .times(SHIFT32)
	          .plus(g)
	      }
	      return (f * SHIFT32) + g
	    }
	    default:
	      throw new Error('Invalid additional info for int: ' + ai)
	  }
	};

	exports.writeHalf = function writeHalf(buf, half) {
	  // assume 0, -0, NaN, Infinity, and -Infinity have already been caught

	  // HACK: everyone settle in.  This isn't going to be pretty.
	  // Translate cn-cbor's C code (from Carsten Borman):

	  // uint32_t be32;
	  // uint16_t be16, u16;
	  // union {
	  //   float f;
	  //   uint32_t u;
	  // } u32;
	  // u32.f = float_val;

	  const u32 = Buffer.allocUnsafe(4);
	  u32.writeFloatBE(half, 0);
	  const u = u32.readUInt32BE(0);

	  // if ((u32.u & 0x1FFF) == 0) { /* worth trying half */

	  // hildjj: If the lower 13 bits aren't 0,
	  // we will lose precision in the conversion.
	  // mant32 = 24bits, mant16 = 11bits, 24-11 = 13
	  if ((u & 0x1FFF) !== 0) {
	    return false
	  }

	  //   int s16 = (u32.u >> 16) & 0x8000;
	  //   int exp = (u32.u >> 23) & 0xff;
	  //   int mant = u32.u & 0x7fffff;

	  let s16 = (u >> 16) & 0x8000; // top bit is sign
	  const exp = (u >> 23) & 0xff; // then 5 bits of exponent
	  const mant = u & 0x7fffff;

	  //   if (exp == 0 && mant == 0)
	  //     ;              /* 0.0, -0.0 */

	  // hildjj: zeros already handled.  Assert if you don't believe me.

	  //   else if (exp >= 113 && exp <= 142) /* normalized */
	  //     s16 += ((exp - 112) << 10) + (mant >> 13);

	  if ((exp >= 113) && (exp <= 142)) {
	    s16 += ((exp - 112) << 10) + (mant >> 13);
	  } else if ((exp >= 103) && (exp < 113)) {
	    //   else if (exp >= 103 && exp < 113) { /* denorm, exp16 = 0 */
	    //     if (mant & ((1 << (126 - exp)) - 1))
	    //       goto float32;         /* loss of precision */
	    //     s16 += ((mant + 0x800000) >> (126 - exp));

	    if (mant & ((1 << (126 - exp)) - 1)) {
	      return false
	    }
	    s16 += ((mant + 0x800000) >> (126 - exp));
	  } else {
	  //   } else if (exp == 255 && mant == 0) { /* Inf */
	  //     s16 += 0x7c00;

	    // hildjj: Infinity already handled

	    //   } else
	    //     goto float32;           /* loss of range */

	    return false
	  }

	  //   ensure_writable(3);
	  //   u16 = s16;
	  //   be16 = hton16p((const uint8_t*)&u16);
	  buf.writeUInt16BE(s16);
	  return true
	};

	exports.parseHalf = function parseHalf(buf) {
	  const sign = buf[0] & 0x80 ? -1 : 1;
	  const exp = (buf[0] & 0x7C) >> 2;
	  const mant = ((buf[0] & 0x03) << 8) | buf[1];
	  if (!exp) {
	    return sign * 5.9604644775390625e-8 * mant
	  } else if (exp === 0x1f) {
	    return sign * (mant ? 0 / 0 : 2e308)
	  }
	  return sign * Math.pow(2, exp - 25) * (1024 + mant)
	};

	exports.parseCBORfloat = function parseCBORfloat(buf) {
	  switch (buf.length) {
	    case 2:
	      return exports.parseHalf(buf)
	    case 4:
	      return buf.readFloatBE(0)
	    case 8:
	      return buf.readDoubleBE(0)
	    default:
	      throw new Error('Invalid float size: ' + buf.length)
	  }
	};

	exports.hex = function hex(s) {
	  return Buffer.from(s.replace(/^0x/, ''), 'hex')
	};

	exports.bin = function bin(s) {
	  s = s.replace(/\s/g, '');
	  let start = 0;
	  let end = (s.length % 8) || 8;
	  const chunks = [];
	  while (end <= s.length) {
	    chunks.push(parseInt(s.slice(start, end), 2));
	    start = end;
	    end += 8;
	  }
	  return Buffer.from(chunks)
	};

	exports.arrayEqual = function arrayEqual(a, b) {
	  if ((a == null) && (b == null)) {
	    return true
	  }
	  if ((a == null) || (b == null)) {
	    return false
	  }
	  return (a.length === b.length) && a.every((elem, i) => elem === b[i])
	};

	exports.bufferToBignumber = function bufferToBignumber(buf) {
	  if (!constants.BigNumber) {
	    throw new Error('No bigint and no bignumber.js')
	  }
	  return new constants.BigNumber(buf.toString('hex'), 16)
	};

	exports.bufferToBigInt = function bufferToBigInt(buf) {
	  return BigInt('0x' + buf.toString('hex'))
	};

	exports.cborValueToString = function cborValueToString(val, float_bytes = -1) {
	  switch (typeof val) {
	    case 'symbol': {
	      switch (val) {
	        case SYMS.NULL:
	          return 'null'
	        case SYMS.UNDEFINED:
	          return 'undefined'
	        case SYMS.BREAK:
	          return 'BREAK'
	      }
	      // impossible in node 10
	      /* istanbul ignore if */
	      if (val.description) {
	        return val.description
	      }
	      // on node10, Symbol doesn't have description.  Parse it out of the
	      // toString value, which looks like `Symbol(foo)`.
	      const s = val.toString();
	      const m = s.match(/^Symbol\((.*)\)/);
	      /* istanbul ignore if */
	      if (m && m[1]) {
	        // impossible in node 12+
	        /* istanbul ignore next */
	        return m[1]
	      }
	      return 'Symbol'
	    }
	    case 'string':
	      return JSON.stringify(val)
	    case 'bigint':
	      return val.toString()
	    case 'number':
	      if (float_bytes > 0) {
	        return (util.inspect(val)) + '_' + float_bytes
	      }
	      return util.inspect(val)
	  }
	  const buf = exports.bufferishToBuffer(val);
	  if (buf) {
	    const hex = buf.toString('hex');
	    return (float_bytes === -Infinity) ? hex : `h'${hex}'`
	  }
	  if (constants.BigNumber && constants.BigNumber.isBigNumber(val)) {
	    return val.toString()
	  }
	  if (val && (typeof val.inspect === 'function')) {
	    return val.inspect()
	  }
	  return util.inspect(val)
	};

	exports.guessEncoding = function guessEncoding(input, encoding) {
	  if (typeof input === 'string') {
	    return new NoFilter(input, (encoding != null) ? encoding : 'hex')
	  }
	  const buf = exports.bufferishToBuffer(input);
	  if (buf) {
	    return new NoFilter(buf)
	  }
	  if (isReadable(input)) {
	    return input
	  }
	  throw new Error('Unknown input type')
	};

	const B64URL_SWAPS = {
	  '=': '',
	  '+': '-',
	  '/': '_'
	};

	/**
	 * @param {Buffer|Uint8Array|Uint8ClampedArray|ArrayBuffer|DataView} buf -
	 *   Buffer to convert
	 * @private
	 */
	exports.base64url = function base64url(buf) {
	  return exports.bufferishToBuffer(buf)
	    .toString('base64')
	    .replace(/[=+/]/g, c => B64URL_SWAPS[c])
	};

	/**
	 * @param {Buffer|Uint8Array|Uint8ClampedArray|ArrayBuffer|DataView} buf -
	 *   Buffer to convert
	 * @private
	 */
	exports.base64 = function base64(buf) {
	  return exports.bufferishToBuffer(buf).toString('base64')
	};

	exports.isBigEndian = function isBigEndian() {
	  const array = new Uint8Array(4);
	  const view = new Uint32Array(array.buffer);
	  return !((view[0] = 1) & array[0])
	};
	}(utils$v));

	const Stream = require$$0__default$2['default'];
	const NoFilter$4 = lib$1;
	const TransformStream = Stream.Transform;

	/**
	 * BinaryParseStream is a TransformStream that consumes buffers and outputs
	 * objects on the other end.  It expects your subclass to implement a `_parse`
	 * method that is a generator.  When your generator yields a number, it'll be
	 * fed a buffer of that length from the input.  When your generator returns,
	 * the return value will be pushed to the output side.
	 *
	 * @class BinaryParseStream
	 * @extends {TransformStream}
	 */
	class BinaryParseStream$1 extends TransformStream {
	  constructor(options) {
	    super(options);
	    // doesn't work to pass these in as opts, for some reason
	    this['_writableState'].objectMode = false;
	    this['_readableState'].objectMode = true;

	    this.bs = new NoFilter$4();
	    this.__restart();
	  }

	  _transform(fresh, encoding, cb) {
	    this.bs.write(fresh);

	    while (this.bs.length >= this.__needed) {
	      let ret = null;
	      const chunk = (this.__needed === null) ?
	        undefined :
	        this.bs.read(this.__needed);

	      try {
	        ret = this.__parser.next(chunk);
	      } catch (e) {
	        return cb(e)
	      }

	      if (this.__needed) {
	        this.__fresh = false;
	      }

	      if (!ret.done) {
	        this.__needed = ret.value || Infinity;
	      } else {
	        this.push(ret.value);
	        this.__restart();
	      }
	    }

	    return cb()
	  }

	  /**
	   * @abstract
	   * @protected
	   * @returns {Generator<number, undefined, Buffer>}
	   */
	  /* istanbul ignore next */
	  *_parse() { // eslint-disable-line class-methods-use-this, require-yield
	    throw new Error('Must be implemented in subclass')
	  }

	  __restart() {
	    this.__needed = null;
	    this.__parser = this._parse();
	    this.__fresh = true;
	  }

	  _flush(cb) {
	    cb(this.__fresh ? null : new Error('unexpected end of input'));
	  }
	}

	var binaryParseStream = BinaryParseStream$1;

	const constants$6 = constants$7;
	const utils$u = utils$v;

	function setBuffersToJSON(obj, fn) {
	  // The data item tagged can be a byte string or any other data item.  In the
	  // latter case, the tag applies to all of the byte string data items
	  // contained in the data item, except for those contained in a nested data
	  // item tagged with an expected conversion.
	  if (utils$u.isBufferish(obj)) {
	    obj.toJSON = fn;
	  } else if (Array.isArray(obj)) {
	    for (const v of obj) {
	      setBuffersToJSON(v, fn);
	    }
	  } else if (obj && (typeof obj === 'object')) {
	    // ffs, complexity in the protocol.
	    if (!(obj instanceof Tagged$1) || (obj.tag < 21) || (obj.tag > 23)) {
	      for (const v of Object.values(obj)) {
	        setBuffersToJSON(v, fn);
	      }
	    }
	  }
	}

	function swapEndian(ab, size, byteOffset, byteLength) {
	  const dv = new DataView(ab);
	  const [getter, setter] = {
	    2: [dv.getUint16, dv.setUint16],
	    4: [dv.getUint32, dv.setUint32],
	    8: [dv.getBigUint64, dv.setBigUint64]
	  }[size];

	  const end = byteOffset + byteLength;
	  for (let offset = byteOffset; offset < end; offset += size) {
	    setter.call(dv, offset, getter.call(dv, offset, true));
	  }
	}

	const TYPED_ARRAY_TAGS = {
	  64: Uint8Array,
	  65: Uint16Array,
	  66: Uint32Array,
	  // 67: BigUint64Array,  Safari doesn't implement
	  68: Uint8ClampedArray,
	  69: Uint16Array,
	  70: Uint32Array,
	  // 71: BigUint64Array,  Safari doesn't implement
	  72: Int8Array,
	  73: Int16Array,
	  74: Int32Array,
	  // 75: BigInt64Array,  Safari doesn't implement
	  // 76: reserved
	  77: Int16Array,
	  78: Int32Array,
	  // 79: BigInt64Array,  Safari doesn't implement
	  // 80: not implemented, float16 array
	  81: Float32Array,
	  82: Float64Array,
	  // 83: not implemented, float128 array
	  // 84: not implemented, float16 array
	  85: Float32Array,
	  86: Float64Array
	  // 87: not implemented, float128 array
	};

	// Safari
	if (typeof BigUint64Array !== 'undefined') {
	  TYPED_ARRAY_TAGS[67] = BigUint64Array;
	  TYPED_ARRAY_TAGS[71] = BigUint64Array;
	}
	if (typeof BigInt64Array !== 'undefined') {
	  TYPED_ARRAY_TAGS[75] = BigInt64Array;
	  TYPED_ARRAY_TAGS[79] = BigInt64Array;
	}

	const INTERNAL_JSON = Symbol('INTERNAL_JSON');
	/**
	 * A CBOR tagged item, where the tag does not have semantics specified at the
	 * moment, or those semantics threw an error during parsing. Typically this will
	 * be an extension point you're not yet expecting.
	 */
	class Tagged$1 {
	  /**
	   * Creates an instance of Tagged.
	   *
	   * @param {number} tag - the number of the tag
	   * @param {any} value - the value inside the tag
	   * @param {Error} [err] - the error that was thrown parsing the tag, or null
	   */
	  constructor(tag, value, err) {
	    this.tag = tag;
	    this.value = value;
	    this.err = err;
	    if (typeof this.tag !== 'number') {
	      throw new Error('Invalid tag type (' + (typeof this.tag) + ')')
	    }
	    if ((this.tag < 0) || ((this.tag | 0) !== this.tag)) {
	      throw new Error('Tag must be a positive integer: ' + this.tag)
	    }
	  }

	  toJSON() {
	    if (this[INTERNAL_JSON]) {
	      return this[INTERNAL_JSON]()
	    }
	    const ret = {
	      tag: this.tag,
	      value: this.value
	    };
	    if (this.err) {
	      ret.err = this.err;
	    }
	    return ret
	  }

	  /**
	   * Convert to a String
	   *
	   * @returns {string} string of the form '1(2)'
	   */
	  toString() {
	    return `${this.tag}(${JSON.stringify(this.value)})`
	  }

	  /**
	   * Push the simple value onto the CBOR stream
	   *
	   * @param {Object} gen The generator to push onto
	   */
	  encodeCBOR(gen) {
	    gen._pushTag(this.tag);
	    return gen.pushAny(this.value)
	  }

	  /**
	   * If we have a converter for this type, do the conversion.  Some converters
	   * are built-in.  Additional ones can be passed in.  If you want to remove
	   * a built-in converter, pass a converter in whose value is 'null' instead
	   * of a function.
	   *
	   * @param {Object} converters - keys in the object are a tag number, the value
	   *   is a function that takes the decoded CBOR and returns a JavaScript value
	   *   of the appropriate type.  Throw an exception in the function on errors.
	   * @returns {any} - the converted item
	   */
	  convert(converters) {
	    let f = converters != null ? converters[this.tag] : undefined;
	    if (typeof f !== 'function') {
	      f = Tagged$1['_tag_' + this.tag];
	      if (typeof f !== 'function') {
	        f = TYPED_ARRAY_TAGS[this.tag];
	        if (typeof f === 'function') {
	          f = this._toTypedArray;
	        } else {
	          return this
	        }
	      }
	    }
	    try {
	      return f.call(this, this.value)
	    } catch (error) {
	      if (error && error.message && (error.message.length > 0)) {
	        this.err = error.message;
	      } else {
	        this.err = error;
	      }
	      return this
	    }
	  }

	  _toTypedArray(val) {
	    const {tag} = this;
	    // see https://tools.ietf.org/html/rfc8746
	    const TypedClass = TYPED_ARRAY_TAGS[tag];
	    if (!TypedClass) {
	      throw new Error(`Invalid typed array tag: ${tag}`)
	    }
	    const little = tag & 0b00000100;
	    const float = (tag & 0b00010000) >> 4;
	    const sz = 2 ** (float + (tag & 0b00000011));

	    if ((!little !== utils$u.isBigEndian()) && (sz > 1)) {
	      swapEndian(val.buffer, sz, val.byteOffset, val.byteLength);
	    }

	    const ab = val.buffer.slice(val.byteOffset, val.byteOffset + val.byteLength);
	    return new TypedClass(ab)
	  }

	  // Standard date/time string; see Section 3.4.1
	  static _tag_0(v) {
	    return new Date(v)
	  }

	  // Epoch-based date/time; see Section 3.4.2
	  static _tag_1(v) {
	    return new Date(v * 1000)
	  }

	  // Positive bignum; see Section 3.4.3
	  static _tag_2(v) {
	    // (note: replaced by bigint version in decoder.js when bigint on)
	    return utils$u.bufferToBignumber(v) // throws if no BigNumber
	  }

	  // Negative bignum; see Section 3.4.3
	  static _tag_3(v) {
	    // (note: replaced by bigint version in decoder.js when bigint on)
	    const pos = utils$u.bufferToBignumber(v); // throws if no BigNumber
	    return constants$6.BN.MINUS_ONE.minus(pos)
	  }

	  // Decimal fraction; see Section 3.4.4
	  static _tag_4(v) {
	    if (!constants$6.BigNumber) {
	      throw new Error('No bignumber.js')
	    }
	    return new constants$6.BigNumber(v[1]).shiftedBy(v[0])
	  }

	  // Bigfloat; see Section 3.4.4
	  static _tag_5(v) {
	    if (!constants$6.BigNumber) {
	      throw new Error('No bignumber.js')
	    }
	    return constants$6.BN.TWO.pow(v[0]).times(v[1])
	  }

	  // Expected conversion to base64url encoding; see Section 3.4.5.2
	  static _tag_21(v) {
	    if (utils$u.isBufferish(v)) {
	      this[INTERNAL_JSON] = () => utils$u.base64url(v);
	    } else {
	      setBuffersToJSON(v, function b64urlThis() { // no =>, honor `this`
	        // eslint-disable-next-line no-invalid-this
	        return utils$u.base64url(this)
	      });
	    }
	    return this
	  }

	  // Expected conversion to base64 encoding; see Section 3.4.5.2
	  static _tag_22(v) {
	    if (utils$u.isBufferish(v)) {
	      this[INTERNAL_JSON] = () => utils$u.base64(v);
	    } else {
	      setBuffersToJSON(v, function b64this() { // no =>, honor `this`
	        // eslint-disable-next-line no-invalid-this
	        return utils$u.base64(this)
	      });
	    }
	    return this
	  }

	  // Expected conversion to base16 encoding; see Section Section 3.4.5.2
	  static _tag_23(v) {
	    if (utils$u.isBufferish(v)) {
	      this[INTERNAL_JSON] = () => v.toString('hex');
	    } else {
	      setBuffersToJSON(v, function hexThis() { // no =>, honor `this`
	      // eslint-disable-next-line no-invalid-this
	        return this.toString('hex')
	      });
	    }
	    return this
	  }

	  // URI; see Section 3.4.5.3
	  static _tag_32(v) {
	    return new URL(v)
	  }

	  // base64url; see Section 3.4.5.3
	  static _tag_33(v) {
	    // If any of the following apply:
	    // -  the encoded text string contains non-alphabet characters or
	    //    only 1 alphabet character in the last block of 4 (where
	    //    alphabet is defined by Section 5 of [RFC4648] for tag number 33
	    //    and Section 4 of [RFC4648] for tag number 34), or
	    if (!v.match(/^[a-zA-Z0-9_-]+$/)) {
	      throw new Error('Invalid base64url characters')
	    }
	    const last = v.length % 4;
	    if (last === 1) {
	      throw new Error('Invalid base64url length')
	    }
	    // -  the padding bits in a 2- or 3-character block are not 0, or
	    if (last === 2) {
	      // The last 4 bits of the last character need to be zero.
	      if ('AQgw'.indexOf(v[v.length - 1]) === -1) {
	        throw new Error('Invalid base64 padding')
	      }
	    } else if (last === 3) {
	      // The last 2 bits of the last character need to be zero.
	      if ('AEIMQUYcgkosw048'.indexOf(v[v.length - 1]) === -1) {
	        throw new Error('Invalid base64 padding')
	      }
	    }

	    //    or
	    // -  the base64url encoding has padding characters,
	    // (caught above)

	    // the string is invalid.
	    return this
	  }

	  // base64; see Section 3.4.5.3
	  static _tag_34(v) {
	    // If any of the following apply:
	    // -  the encoded text string contains non-alphabet characters or
	    //    only 1 alphabet character in the last block of 4 (where
	    //    alphabet is defined by Section 5 of [RFC4648] for tag number 33
	    //    and Section 4 of [RFC4648] for tag number 34), or
	    const m = v.match(/^[a-zA-Z0-9+/]+(={0,2})$/);
	    if (!m) {
	      throw new Error('Invalid base64url characters')
	    }
	    if ((v.length % 4) !== 0) {
	      throw new Error('Invalid base64url length')
	    }
	    // -  the padding bits in a 2- or 3-character block are not 0, or
	    if (m[1] === '=') {
	      // The last 4 bits of the last character need to be zero.
	      if ('AQgw'.indexOf(v[v.length - 2]) === -1) {
	        throw new Error('Invalid base64 padding')
	      }
	    } else if (m[1] === '==') {
	      // The last 2 bits of the last character need to be zero.
	      if ('AEIMQUYcgkosw048'.indexOf(v[v.length - 3]) === -1) {
	        throw new Error('Invalid base64 padding')
	      }
	    }

	    // -  the base64 encoding has the wrong number of padding characters,
	    // (caught above)
	    // the string is invalid.
	    return this
	  }

	  // Regular expression; see Section 2.4.4.3
	  static _tag_35(v) {
	    return new RegExp(v)
	  }

	  // https://github.com/input-output-hk/cbor-sets-spec/blob/master/CBOR_SETS.md
	  static _tag_258(v) {
	    return new Set(v)
	  }
	}
	Tagged$1.INTERNAL_JSON = INTERNAL_JSON;
	var tagged = Tagged$1;

	const {MT: MT$5, SIMPLE: SIMPLE$1, SYMS: SYMS$4} = constants$7;

	/**
	 * A CBOR Simple Value that does not map onto a known constant.
	 */
	class Simple$1 {
	  /**
	   * Creates an instance of Simple.
	   *
	   * @param {number} value - the simple value's integer value
	   */
	  constructor(value) {
	    if (typeof value !== 'number') {
	      throw new Error('Invalid Simple type: ' + (typeof value))
	    }
	    if ((value < 0) || (value > 255) || ((value | 0) !== value)) {
	      throw new Error('value must be a small positive integer: ' + value)
	    }
	    this.value = value;
	  }

	  /**
	   * Debug string for simple value
	   *
	   * @returns {string} simple(value)
	   */
	  toString() {
	    return 'simple(' + this.value + ')'
	  }

	  /**
	   * Debug string for simple value (backward-compatibility version)
	   *
	   * @returns {string} simple(value)
	   */
	  inspect(depth, opts) {
	    return 'simple(' + this.value + ')'
	  }

	  /**
	   * Push the simple value onto the CBOR stream
	   *
	   * @param {Object} gen The generator to push onto
	   */
	  encodeCBOR(gen) {
	    return gen._pushInt(this.value, MT$5.SIMPLE_FLOAT)
	  }

	  /**
	   * Is the given object a Simple?
	   *
	   * @param {any} obj - object to test
	   * @returns {boolean} - is it Simple?
	   */
	  static isSimple(obj) {
	    return obj instanceof Simple$1
	  }

	  /**
	   * Decode from the CBOR additional information into a JavaScript value.
	   * If the CBOR item has no parent, return a "safe" symbol instead of
	   * `null` or `undefined`, so that the value can be passed through a
	   * stream in object mode.
	   *
	   * @param {number} val - the CBOR additional info to convert
	   * @param {boolean} [has_parent=true] - Does the CBOR item have a parent?
	   * @param {boolean} [parent_indefinite=false] - Is the parent element
	   *   indefinitely encoded?
	   * @returns {(null|undefined|boolean|Symbol|Simple)} - the decoded value
	   */
	  static decode(val, has_parent = true, parent_indefinite = false) {
	    switch (val) {
	      case SIMPLE$1.FALSE:
	        return false
	      case SIMPLE$1.TRUE:
	        return true
	      case SIMPLE$1.NULL:
	        if (has_parent) {
	          return null
	        }
	        return SYMS$4.NULL
	      case SIMPLE$1.UNDEFINED:
	        if (has_parent) {
	          return undefined
	        }
	        return SYMS$4.UNDEFINED
	      case -1:
	        if (!has_parent || !parent_indefinite) {
	          throw new Error('Invalid BREAK')
	        }
	        return SYMS$4.BREAK
	      default:
	        return new Simple$1(val)
	    }
	  }
	}

	var simple = Simple$1;

	const BinaryParseStream = binaryParseStream;
	const Tagged = tagged;
	const Simple = simple;
	const utils$t = utils$v;
	const NoFilter$3 = lib$1;
	const constants$5 = constants$7;
	const { MT: MT$4, NUMBYTES: NUMBYTES$2, SYMS: SYMS$3, BI: BI$1 } = constants$5;
	const { Buffer: Buffer$7 } = require$$0__default$3['default'];

	const COUNT = Symbol('count');
	const MAJOR = Symbol('major type');
	const ERROR = Symbol('error');
	const NOT_FOUND = Symbol('not found');

	function parentArray(parent, typ, count) {
	  const a = [];

	  a[COUNT] = count;
	  a[SYMS$3.PARENT] = parent;
	  a[MAJOR] = typ;
	  return a
	}

	function parentBufferStream(parent, typ) {
	  const b = new NoFilter$3();

	  b[COUNT] = -1;
	  b[SYMS$3.PARENT] = parent;
	  b[MAJOR] = typ;
	  return b
	}

	/**
	 * @param {Buffer} v
	 * @private
	 */
	function _tag_2(v) {
	  return utils$t.bufferToBigInt(v)
	}

	/**
	 * @param {BigInt} v
	 * @private
	 */
	function _tag_3(v) {
	  // avoid syntax error on old runtimes
	  return BI$1.MINUS_ONE - utils$t.bufferToBigInt(v)
	}

	class UnexpectedDataError extends Error {
	  constructor(byte, value) {
	    super(`Unexpected data: 0x${byte.toString(16)}`);
	    this.name = 'UnexpectedDataError';
	    this.byte = byte;
	    this.value = value;
	  }
	}

	/**
	 * @typedef ExtendedResults
	 * @property {any} value - the value that was found
	 * @property {number} length - the number of bytes of the original input that
	 *   were read
	 * @property {Buffer} bytes - the bytes of the original input that were used
	 *   to produce the value
	 * @property {Buffer} [unused] - the bytes that were left over from the original
	 *   input.  This property only exists if {@linkcode Decoder.decodeFirst} or
	 *   {@linkcode Decoder.decodeFirstSync} was called.
	 */
	/**
	 * @typedef DecoderOptions
	 * @property {number} [max_depth=-1] - the maximum depth to parse.
	 *   Use -1 for "until you run out of memory".  Set this to a finite
	 *   positive number for un-trusted inputs.  Most standard inputs won't nest
	 *   more than 100 or so levels; I've tested into the millions before
	 *   running out of memory.
	 * @property {object} [tags] - mapping from tag number to function(v),
	 *   where v is the decoded value that comes after the tag, and where the
	 *   function returns the correctly-created value for that tag.
	 * @property {boolean} [bigint=true] generate JavaScript BigInt's
	 *   instead of BigNumbers, when possible.
	 * @property {boolean} [preferWeb=false] if true, prefer Uint8Arrays to
	 *   be generated instead of node Buffers.  This might turn on some more
	 *   changes in the future, so forward-compatibility is not guaranteed yet.
	 * @property {string} [encoding='hex'] - The encoding of the input.
	 *   Ignored if input is a Buffer.
	 * @property {boolean} [required=false] - Should an error be thrown when no
	 *   data is in the input?
	 * @property {boolean} [extendedResults=false] - if true, emit extended
	 *   results, which will be an object with shape {@link ExtendedResults}.
	 *   The value will already have been null-checked.
	 */
	/**
	  * @callback decodeCallback
	  * @param {Error} [error] - if one was generated
	  * @param {any} [value] - the decoded value
	  */
	/**
	  * @param {DecoderOptions|decodeCallback|string} opts options,
	  *   the callback, or input incoding
	  * @param {decodeCallback} [cb] - called on completion
	  * @returns {{options: DecoderOptions, cb: decodeCallback}}
	  * @private
	  */
	function normalizeOptions$2(opts, cb) {
	  switch (typeof opts) {
	    case 'function':
	      return { options: {}, cb: /** @type {decodeCallback} */ (opts) }
	    case 'string':
	      return { options: { encoding: opts }, cb }
	    case 'object':
	      return { options: opts || {}, cb }
	    default:
	      throw new TypeError('Unknown option type')
	  }
	}

	/**
	 * Decode a stream of CBOR bytes by transforming them into equivalent
	 * JavaScript data.  Because of the limitations of Node object streams,
	 * special symbols are emitted instead of NULL or UNDEFINED.  Fix those
	 * up by calling {@link Decoder.nullcheck}.
	 *
	 * @extends {BinaryParseStream}
	 */
	class Decoder$2 extends BinaryParseStream {
	  /**
	   * Create a parsing stream.
	   *
	   * @param {DecoderOptions} [options={}]
	   */
	  constructor(options = {}) {
	    const {
	      tags = {},
	      max_depth = -1,
	      bigint = true,
	      preferWeb = false,
	      required = false,
	      encoding = 'hex',
	      extendedResults = false,
	      ...superOpts
	    } = options;

	    super({defaultEncoding: encoding, ...superOpts});

	    this.running = true;
	    this.max_depth = max_depth;
	    this.tags = tags;
	    this.preferWeb = preferWeb;
	    this.extendedResults = extendedResults;
	    this.bigint = bigint;
	    this.required = required;

	    if (extendedResults) {
	      this.bs.on('read', this._onRead.bind(this));
	      this.valueBytes = new NoFilter$3();
	    }
	    if (bigint) {
	      if (this.tags[2] == null) {
	        this.tags[2] = _tag_2;
	      }
	      if (this.tags[3] == null) {
	        this.tags[3] = _tag_3;
	      }
	    }
	  }

	  /**
	   * Check the given value for a symbol encoding a NULL or UNDEFINED value in
	   * the CBOR stream.
	   *
	   * @static
	   * @param {any} val - the value to check
	   * @returns {any} the corrected value
	   *
	   * @example
	   * myDecoder.on('data', function(val) {
	   *   val = Decoder.nullcheck(val);
	   *   ...
	   * });
	   */
	  static nullcheck(val) {
	    switch (val) {
	      case SYMS$3.NULL:
	        return null
	      case SYMS$3.UNDEFINED:
	        return undefined
	      // Leaving this in for now as belt-and-suspenders, but I'm pretty sure
	      // it can't happen.
	      /* istanbul ignore next */
	      case NOT_FOUND:
	        /* istanbul ignore next */
	        throw new Error('Value not found')
	      default:
	        return val
	    }
	  }

	  /**
	   * Decode the first CBOR item in the input, synchronously.  This will throw
	   * an exception if the input is not valid CBOR, or if there are more bytes
	   * left over at the end (if options.extendedResults is not true).
	   *
	   * @static
	   * @param {string|Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray
	   *   |DataView|stream.Readable} input - If a Readable stream, must have
	   *   received the `readable` event already, or you will get an error
	   *   claiming "Insufficient data"
	   * @param {DecoderOptions|string} [options={}] Options or encoding for input
	   * @returns {any} - the decoded value
	   */
	  static decodeFirstSync(input, options = {}) {
	    if (input == null) {
	      throw new TypeError('input required')
	    }
	    ({options} = normalizeOptions$2(options));
	    const {encoding = 'hex', ...opts} = options;
	    const c = new Decoder$2(opts);
	    const s = utils$t.guessEncoding(input, encoding);

	    // for/of doesn't work when you need to call next() with a value
	    // generator created by parser will be "done" after each CBOR entity
	    // parser will yield numbers of bytes that it wants
	    const parser = c._parse();
	    let state = parser.next();

	    while (!state.done) {
	      const b = s.read(state.value);

	      if ((b == null) || (b.length !== state.value)) {
	        throw new Error('Insufficient data')
	      }
	      if (c.extendedResults) {
	        c.valueBytes.write(b);
	      }
	      state = parser.next(b);
	    }

	    let val = null;
	    if (!c.extendedResults) {
	      val = Decoder$2.nullcheck(state.value);
	      if (s.length > 0) {
	        const nextByte = s.read(1);

	        s.unshift(nextByte);
	        throw new UnexpectedDataError(nextByte[0], val)
	      }
	    } else {
	      val = state.value;
	      val.unused = s.read();
	    }
	    return val
	  }

	  /**
	   * Decode all of the CBOR items in the input into an array.  This will throw
	   * an exception if the input is not valid CBOR; a zero-length input will
	   * return an empty array.
	   *
	   * @static
	   * @param {string|Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray
	   *   |DataView|stream.Readable} input
	   * @param {DecoderOptions|string} [options={}] Options or encoding
	   *   for input
	   * @returns {Array} - Array of all found items
	   */
	  static decodeAllSync(input, options = {}) {
	    if (input == null) {
	      throw new TypeError('input required')
	    }
	    ({options} = normalizeOptions$2(options));
	    const {encoding = 'hex', ...opts} = options;
	    const c = new Decoder$2(opts);
	    const s = utils$t.guessEncoding(input, encoding);
	    const res = [];

	    while (s.length > 0) {
	      const parser = c._parse();
	      let state = parser.next();

	      while (!state.done) {
	        const b = s.read(state.value);

	        if ((b == null) || (b.length !== state.value)) {
	          throw new Error('Insufficient data')
	        }
	        if (c.extendedResults) {
	          c.valueBytes.write(b);
	        }
	        state = parser.next(b);
	      }
	      res.push(Decoder$2.nullcheck(state.value));
	    }
	    return res
	  }

	  /**
	   * Decode the first CBOR item in the input.  This will error if there are
	   * more bytes left over at the end (if options.extendedResults is not true),
	   * and optionally if there were no valid CBOR bytes in the input.  Emits the
	   * {Decoder.NOT_FOUND} Symbol in the callback if no data was found and the
	   * `required` option is false.
	   *
	   * @static
	   * @param {string|Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray
	   *   |DataView|stream.Readable} input
	   * @param {DecoderOptions|decodeCallback|string} [options={}] - options, the
	   *   callback, or input encoding
	   * @param {decodeCallback} [cb] callback
	   * @returns {Promise<any>} returned even if callback is specified
	   */
	  static decodeFirst(input, options = {}, cb = null) {
	    if (input == null) {
	      throw new TypeError('input required')
	    }
	    ({options, cb} = normalizeOptions$2(options, cb));
	    const {encoding = 'hex', required = false, ...opts} = options;

	    const c = new Decoder$2(opts);
	    /** @type {any} */
	    let v = NOT_FOUND;
	    const s = utils$t.guessEncoding(input, encoding);
	    const p = new Promise((resolve, reject) => {
	      c.on('data', val => {
	        v = Decoder$2.nullcheck(val);
	        c.close();
	      });
	      c.once('error', er => {
	        if (c.extendedResults && (er instanceof UnexpectedDataError)) {
	          v.unused = c.bs.slice();
	          return resolve(v)
	        }
	        if (v !== NOT_FOUND) {
	          er['value'] = v;
	        }
	        v = ERROR;
	        c.close();
	        return reject(er)
	      });
	      c.once('end', () => {
	        switch (v) {
	          case NOT_FOUND:
	            if (required) {
	              return reject(new Error('No CBOR found'))
	            }
	            return resolve(v)
	          // Pretty sure this can't happen, but not *certain*.
	          /* istanbul ignore next */
	          case ERROR:
	            /* istanbul ignore next */
	            return undefined
	          default:
	            return resolve(v)
	        }
	      });
	    });

	    if (typeof cb === 'function') {
	      p.then(val => cb(null, val), cb);
	    }
	    s.pipe(c);
	    return p
	  }

	  /**
	   * @callback decodeAllCallback
	   * @param {Error} error - if one was generated
	   * @param {Array} value - all of the decoded values, wrapped in an Array
	   */

	  /**
	   * Decode all of the CBOR items in the input.  This will error if there are
	   * more bytes left over at the end.
	   *
	   * @static
	   * @param {string|Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray
	   *   |DataView|stream.Readable} input
	   * @param {DecoderOptions|decodeAllCallback|string} [options={}] -
	   *   Decoding options, the callback, or the input encoding.
	   * @param {decodeAllCallback} [cb] callback
	   * @returns {Promise<Array>} even if callback is specified
	   */
	  static decodeAll(input, options = {}, cb = null) {
	    if (input == null) {
	      throw new TypeError('input required')
	    }
	    ({options, cb} = normalizeOptions$2(options, cb));
	    const {encoding = 'hex', ...opts} = options;

	    const c = new Decoder$2(opts);
	    const vals = [];

	    c.on('data', val => vals.push(Decoder$2.nullcheck(val)));

	    const p = new Promise((resolve, reject) => {
	      c.on('error', reject);
	      c.on('end', () => resolve(vals));
	    });

	    if (typeof cb === 'function') {
	      p.then(v => cb(undefined, v), er => cb(er, undefined));
	    }
	    utils$t.guessEncoding(input, encoding).pipe(c);
	    return p
	  }

	  /**
	   * Stop processing
	   */
	  close() {
	    this.running = false;
	    this.__fresh = true;
	  }

	  /**
	   * Only called if extendedResults is true
	   * @ignore
	   */
	  _onRead(data) {
	    this.valueBytes.write(data);
	  }

	  /**
	   * @ignore
	   * @returns {Generator<number, any, Buffer>}
	   */
	  *_parse() {
	    let parent = null;
	    let depth = 0;
	    let val = null;

	    while (true) {
	      if ((this.max_depth >= 0) && (depth > this.max_depth)) {
	        throw new Error('Maximum depth ' + this.max_depth + ' exceeded')
	      }

	      const [octet] = yield 1;
	      if (!this.running) {
	        this.bs.unshift(Buffer$7.from([octet]));
	        throw new UnexpectedDataError(octet)
	      }
	      const mt = octet >> 5;
	      const ai = octet & 0x1f;
	      const parent_major = (parent != null) ? parent[MAJOR] : undefined;
	      const parent_length = (parent != null) ? parent.length : undefined;

	      switch (ai) {
	        case NUMBYTES$2.ONE:
	          this.emit('more-bytes', mt, 1, parent_major, parent_length)
	          ;[val] = yield 1;
	          break
	        case NUMBYTES$2.TWO:
	        case NUMBYTES$2.FOUR:
	        case NUMBYTES$2.EIGHT: {
	          const numbytes = 1 << (ai - 24);

	          this.emit('more-bytes', mt, numbytes, parent_major, parent_length);
	          const buf = yield numbytes;
	          val = (mt === MT$4.SIMPLE_FLOAT) ?
	            buf :
	            utils$t.parseCBORint(ai, buf, this.bigint);
	          break
	        }
	        case 28:
	        case 29:
	        case 30:
	          this.running = false;
	          throw new Error('Additional info not implemented: ' + ai)
	        case NUMBYTES$2.INDEFINITE:
	          switch (mt) {
	            case MT$4.POS_INT:
	            case MT$4.NEG_INT:
	            case MT$4.TAG:
	              throw new Error(`Invalid indefinite encoding for MT ${mt}`)
	          }
	          val = -1;
	          break
	        default:
	          val = ai;
	      }
	      switch (mt) {
	        case MT$4.POS_INT:
	          // val already decoded
	          break
	        case MT$4.NEG_INT:
	          if (val === Number.MAX_SAFE_INTEGER) {
	            if (this.bigint) {
	              val = BI$1.NEG_MAX;
	            } else if (constants$5.BigNumber) {
	              val = constants$5.BN.NEG_MAX;
	            } else {
	              throw new Error('No bigint and no bignumber.js')
	            }
	          } else if (constants$5.BigNumber &&
	            (val instanceof constants$5.BigNumber)) {
	            val = constants$5.BN.MINUS_ONE.minus(val);
	          } else {
	            val = (typeof val === 'bigint') ? BI$1.MINUS_ONE - val : -1 - val;
	          }
	          break
	        case MT$4.BYTE_STRING:
	        case MT$4.UTF8_STRING:
	          switch (val) {
	            case 0:
	              this.emit('start-string', mt, val, parent_major, parent_length);
	              if (mt === MT$4.UTF8_STRING) {
	                val = '';
	              } else {
	                val = this.preferWeb ? new Uint8Array(0) : Buffer$7.allocUnsafe(0);
	              }
	              break
	            case -1:
	              this.emit('start', mt, SYMS$3.STREAM, parent_major, parent_length);
	              parent = parentBufferStream(parent, mt);
	              depth++;
	              continue
	            default:
	              this.emit('start-string', mt, val, parent_major, parent_length);
	              val = yield val;
	              if (mt === MT$4.UTF8_STRING) {
	                val = utils$t.utf8(val);
	              } else if (this.preferWeb) {
	                val = new Uint8Array(val.buffer, val.byteOffset, val.length);
	              }
	          }
	          break
	        case MT$4.ARRAY:
	        case MT$4.MAP:
	          switch (val) {
	            case 0:
	              val = (mt === MT$4.MAP) ? {} : [];
	              break
	            case -1:
	              this.emit('start', mt, SYMS$3.STREAM, parent_major, parent_length);
	              parent = parentArray(parent, mt, -1);
	              depth++;
	              continue
	            default:
	              this.emit('start', mt, val, parent_major, parent_length);
	              parent = parentArray(parent, mt, val * (mt - 3));
	              depth++;
	              continue
	          }
	          break
	        case MT$4.TAG:
	          this.emit('start', mt, val, parent_major, parent_length);
	          parent = parentArray(parent, mt, 1);
	          parent.push(val);
	          depth++;
	          continue
	        case MT$4.SIMPLE_FLOAT:
	          if (typeof val === 'number') {
	            if ((ai === NUMBYTES$2.ONE) && (val < 32)) {
	              throw new Error(
	                `Invalid two-byte encoding of simple value ${val}`
	              )
	            }
	            const hasParent = (parent != null);
	            val = Simple.decode(
	              val,
	              hasParent,
	              hasParent && (parent[COUNT] < 0)
	            );
	          } else {
	            val = utils$t.parseCBORfloat(val);
	          }
	      }
	      this.emit('value', val, parent_major, parent_length, ai);
	      let again = false;
	      while (parent != null) {
	        switch (false) {
	          case val !== SYMS$3.BREAK:
	            parent[COUNT] = 1;
	            break
	          case !Array.isArray(parent):
	            parent.push(val);
	            break
	          case !(parent instanceof NoFilter$3): {
	            const pm = parent[MAJOR];

	            if ((pm != null) && (pm !== mt)) {
	              this.running = false;
	              throw new Error('Invalid major type in indefinite encoding')
	            }
	            parent.write(val);
	          }
	        }
	        if ((--parent[COUNT]) !== 0) {
	          again = true;
	          break
	        }
	        --depth;
	        delete parent[COUNT];

	        if (Array.isArray(parent)) {
	          switch (parent[MAJOR]) {
	            case MT$4.ARRAY:
	              val = parent;
	              break
	            case MT$4.MAP: {
	              let allstrings = true;

	              if ((parent.length % 2) !== 0) {
	                throw new Error('Invalid map length: ' + parent.length)
	              }
	              for (let i = 0, len = parent.length; i < len; i += 2) {
	                if ((typeof parent[i] !== 'string') ||
	                    (parent[i] === '__proto__')) {
	                  allstrings = false;
	                  break
	                }
	              }
	              if (allstrings) {
	                val = {};
	                for (let i = 0, len = parent.length; i < len; i += 2) {
	                  val[parent[i]] = parent[i + 1];
	                }
	              } else {
	                val = new Map();
	                for (let i = 0, len = parent.length; i < len; i += 2) {
	                  val.set(parent[i], parent[i + 1]);
	                }
	              }
	              break
	            }
	            case MT$4.TAG: {
	              const t = new Tagged(parent[0], parent[1]);

	              val = t.convert(this.tags);
	              break
	            }
	          }
	        } else /* istanbul ignore else */ if (parent instanceof NoFilter$3) {
	          // only parent types are Array and NoFilter for (Array/Map) and
	          // (bytes/string) respectively.
	          switch (parent[MAJOR]) {
	            case MT$4.BYTE_STRING:
	              val = parent.slice();
	              if (this.preferWeb) {
	                val = new Uint8Array(val.buffer, val.byteOffset, val.length);
	              }
	              break
	            case MT$4.UTF8_STRING:
	              val = parent.toString('utf-8');
	              break
	          }
	        }
	        this.emit('stop', parent[MAJOR]);

	        const old = parent;
	        parent = parent[SYMS$3.PARENT];
	        delete old[SYMS$3.PARENT];
	        delete old[MAJOR];
	      }
	      if (!again) {
	        if (this.extendedResults) {
	          const bytes = this.valueBytes.slice();
	          const ret = {
	            value: Decoder$2.nullcheck(val),
	            bytes,
	            length: bytes.length
	          };

	          this.valueBytes = new NoFilter$3();
	          return ret
	        }
	        return val
	      }
	    }
	  }
	}

	Decoder$2.NOT_FOUND = NOT_FOUND;
	var decoder$1 = Decoder$2;

	const stream$2 = require$$0__default$2['default'];
	const utils$s = utils$v;
	const Decoder$1 = decoder$1;
	const NoFilter$2 = lib$1;
	const { MT: MT$3, NUMBYTES: NUMBYTES$1, SYMS: SYMS$2 } = constants$7;
	const { Buffer: Buffer$6 } = require$$0__default$3['default'];

	function plural(c) {
	  if (c > 1) {
	    return 's'
	  }
	  return ''
	}

	/**
	  * @typedef CommentOptions
	  * @property {number} [max_depth=10] - how many times to indent
	  *   the dashes
	  * @property {number} [depth=1] - initial indentation depth
	  * @property {boolean} [no_summary=false] - if true, omit the summary
	  *   of the full bytes read at the end
	  * @property {object} [tags] - mapping from tag number to function(v),
	  *   where v is the decoded value that comes after the tag, and where the
	  *   function returns the correctly-created value for that tag.
	  * @property {object} [tags] - mapping from tag number to function(v),
	  *   where v is the decoded value that comes after the tag, and where the
	  *   function returns the correctly-created value for that tag.
	  * @property {boolean} [bigint=true] generate JavaScript BigInt's
	  *   instead of BigNumbers, when possible.
	  * @property {boolean} [preferWeb=false] if true, prefer Uint8Arrays to
	  *   be generated instead of node Buffers.  This might turn on some more
	  *   changes in the future, so forward-compatibility is not guaranteed yet.
	  * @property {string} [encoding='hex'] - Encoding to use for input, if it
	  *   is a string
	  */
	/**
	  * @callback commentCallback
	  * @param {Error} [error] - if one was generated
	  * @param {string} [commented] - the comment string
	  */
	/**
	  * Normalize inputs to the static functions.
	  *
	  * @param {CommentOptions|commentCallback|string|number} opts encoding,
	  *   max_depth, or callback
	  * @param {commentCallback} [cb] - called on completion
	  * @returns {{options: CommentOptions, cb: commentCallback}}
	  * @private
	  */
	function normalizeOptions$1(opts, cb) {
	  switch (typeof opts) {
	    case 'function':
	      return { options: {}, cb: /** @type {commentCallback} */ (opts) }
	    case 'string':
	      return { options: {encoding: opts}, cb }
	    case 'number':
	      return { options: { max_depth: opts }, cb }
	    case 'object':
	      return { options: opts || {}, cb }
	    default:
	      throw new TypeError('Unknown option type')
	  }
	}

	/**
	 * Generate the expanded format of RFC 7049, section 2.2.1
	 *
	 * @extends {stream.Transform}
	 */
	class Commented extends stream$2.Transform {
	  /**
	   * Create a CBOR commenter.
	   *
	   * @param {CommentOptions} [options={}] - Stream options
	   */
	  constructor(options = {}) {
	    const {
	      depth = 1,
	      max_depth = 10,
	      no_summary = false,
	      // decoder options
	      tags = {},
	      bigint,
	      preferWeb,
	      encoding,
	      // stream.Transform options
	      ...superOpts
	    } = options;

	    super({
	      ...superOpts,
	      readableObjectMode: false,
	      writableObjectMode: false
	    });

	    this.depth = depth;
	    this.max_depth = max_depth;
	    this.all = new NoFilter$2();

	    if (!tags[24]) {
	      tags[24] = this._tag_24.bind(this);
	    }
	    this.parser = new Decoder$1({
	      tags,
	      max_depth,
	      bigint,
	      preferWeb,
	      encoding
	    });
	    this.parser.on('value', this._on_value.bind(this));
	    this.parser.on('start', this._on_start.bind(this));
	    this.parser.on('start-string', this._on_start_string.bind(this));
	    this.parser.on('stop', this._on_stop.bind(this));
	    this.parser.on('more-bytes', this._on_more.bind(this));
	    this.parser.on('error', this._on_error.bind(this));
	    if (!no_summary) {
	      this.parser.on('data', this._on_data.bind(this));
	    }
	    this.parser.bs.on('read', this._on_read.bind(this));
	  }

	  /**
	   * @private
	   */
	  _tag_24(v) {
	    const c = new Commented({depth: this.depth + 1, no_summary: true});

	    c.on('data', b => this.push(b));
	    c.on('error', er => this.emit('error', er));
	    c.end(v);
	  }

	  _transform(fresh, encoding, cb) {
	    this.parser.write(fresh, encoding, cb);
	  }

	  _flush(cb) {
	    // TODO: find the test that covers this, and look at the return value
	    return this.parser._flush(cb)
	  }

	  /**
	   * Comment on an input Buffer or string, creating a string passed to the
	   * callback.  If callback not specified, a promise is returned.
	   *
	   * @static
	   * @param {string|Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray
	   *   |DataView|stream.Readable} input
	   * @param {CommentOptions|commentCallback|string|number} [options={}]
	   *   encoding, max_depth, or callback
	   * @param {commentCallback} [cb] - called on completion
	   * @returns {Promise} if cb not specified
	   */
	  static comment(input, options = {}, cb = null) {
	    if (input == null) {
	      throw new Error('input required')
	    }
	    ({options, cb} = normalizeOptions$1(options, cb));
	    const bs = new NoFilter$2();
	    const {encoding = 'hex', ...opts} = options;
	    const d = new Commented(opts);
	    let p = null;

	    if (typeof cb === 'function') {
	      d.on('end', () => {
	        cb(null, bs.toString('utf8'));
	      });
	      d.on('error', cb);
	    } else {
	      p = new Promise((resolve, reject) => {
	        d.on('end', () => {
	          resolve(bs.toString('utf8'));
	        });
	        d.on('error', reject);
	      });
	    }
	    d.pipe(bs);
	    utils$s.guessEncoding(input, encoding).pipe(d);
	    return p
	  }

	  /**
	   * @private
	   */
	  _on_error(er) {
	    this.push('ERROR: ');
	    this.push(er.toString());
	    this.push('\n');
	  }

	  /**
	   * @private
	   */
	  _on_read(buf) {
	    this.all.write(buf);
	    const hex = buf.toString('hex');

	    this.push(new Array(this.depth + 1).join('  '));
	    this.push(hex);

	    let ind = ((this.max_depth - this.depth) * 2) - hex.length;
	    if (ind < 1) {
	      ind = 1;
	    }
	    this.push(new Array(ind + 1).join(' '));
	    return this.push('-- ')
	  }

	  /**
	   * @private
	   */
	  _on_more(mt, len, parent_mt, pos) {
	    let desc = '';

	    this.depth++;
	    switch (mt) {
	      case MT$3.POS_INT:
	        desc = 'Positive number,';
	        break
	      case MT$3.NEG_INT:
	        desc = 'Negative number,';
	        break
	      case MT$3.ARRAY:
	        desc = 'Array, length';
	        break
	      case MT$3.MAP:
	        desc = 'Map, count';
	        break
	      case MT$3.BYTE_STRING:
	        desc = 'Bytes, length';
	        break
	      case MT$3.UTF8_STRING:
	        desc = 'String, length';
	        break
	      case MT$3.SIMPLE_FLOAT:
	        if (len === 1) {
	          desc = 'Simple value,';
	        } else {
	          desc = 'Float,';
	        }
	        break
	    }
	    return this.push(desc + ' next ' + len + ' byte' + (plural(len)) + '\n')
	  }

	  /**
	   * @private
	   */
	  _on_start_string(mt, tag, parent_mt, pos) {
	    let desc = '';

	    this.depth++;
	    switch (mt) {
	      case MT$3.BYTE_STRING:
	        desc = 'Bytes, length: ' + tag;
	        break
	      case MT$3.UTF8_STRING:
	        desc = 'String, length: ' + (tag.toString());
	        break
	    }
	    return this.push(desc + '\n')
	  }

	  /**
	   * @private
	   */
	  _on_start(mt, tag, parent_mt, pos) {
	    this.depth++;
	    switch (parent_mt) {
	      case MT$3.ARRAY:
	        this.push(`[${pos}], `);
	        break
	      case MT$3.MAP:
	        if (pos % 2) {
	          this.push(`{Val:${Math.floor(pos / 2)}}, `);
	        } else {
	          this.push(`{Key:${Math.floor(pos / 2)}}, `);
	        }
	        break
	    }
	    switch (mt) {
	      case MT$3.TAG:
	        this.push(`Tag #${tag}`);
	        if (tag === 24) {
	          this.push(' Encoded CBOR data item');
	        }
	        break
	      case MT$3.ARRAY:
	        if (tag === SYMS$2.STREAM) {
	          this.push('Array (streaming)');
	        } else {
	          this.push(`Array, ${tag} item${plural(tag)}`);
	        }
	        break
	      case MT$3.MAP:
	        if (tag === SYMS$2.STREAM) {
	          this.push('Map (streaming)');
	        } else {
	          this.push(`Map, ${tag} pair${plural(tag)}`);
	        }
	        break
	      case MT$3.BYTE_STRING:
	        this.push('Bytes (streaming)');
	        break
	      case MT$3.UTF8_STRING:
	        this.push('String (streaming)');
	        break
	    }
	    return this.push('\n')
	  }

	  /**
	   * @private
	   */
	  _on_stop(mt) {
	    return this.depth--
	  }

	  /**
	   * @private
	   */
	  _on_value(val, parent_mt, pos, ai) {
	    if (val !== SYMS$2.BREAK) {
	      switch (parent_mt) {
	        case MT$3.ARRAY:
	          this.push(`[${pos}], `);
	          break
	        case MT$3.MAP:
	          if (pos % 2) {
	            this.push(`{Val:${Math.floor(pos / 2)}}, `);
	          } else {
	            this.push(`{Key:${Math.floor(pos / 2)}}, `);
	          }
	          break
	      }
	    }
	    const str = utils$s.cborValueToString(val, -Infinity);

	    if ((typeof val === 'string') ||
	        (Buffer$6.isBuffer(val))) {
	      if (val.length > 0) {
	        this.push(str);
	        this.push('\n');
	      }
	      this.depth--;
	    } else {
	      this.push(str);
	      this.push('\n');
	    }

	    switch (ai) {
	      case NUMBYTES$1.ONE:
	      case NUMBYTES$1.TWO:
	      case NUMBYTES$1.FOUR:
	      case NUMBYTES$1.EIGHT:
	        this.depth--;
	    }
	  }

	  /**
	   * @private
	   */
	  _on_data() {
	    this.push('0x');
	    this.push(this.all.read().toString('hex'));
	    return this.push('\n')
	  }
	}

	var commented = Commented;

	const stream$1 = require$$0__default$2['default'];
	const Decoder = decoder$1;
	const utils$r = utils$v;
	const NoFilter$1 = lib$1;
	const {MT: MT$2, SYMS: SYMS$1} = constants$7;

	/**
	  * @typedef DiagnoseOptions
	  * @property {string} [separator='\n'] - output between detected objects
	  * @property {boolean} [stream_errors=false] - put error info into the
	  *   output stream
	  * @property {number} [max_depth=-1] - the maximum depth to parse.
	  *   Use -1 for "until you run out of memory".  Set this to a finite
	  *   positive number for un-trusted inputs.  Most standard inputs won't nest
	  *   more than 100 or so levels; I've tested into the millions before
	  *   running out of memory.
	  * @property {object} [tags] - mapping from tag number to function(v),
	  *   where v is the decoded value that comes after the tag, and where the
	  *   function returns the correctly-created value for that tag.
	  * @property {object} [tags] - mapping from tag number to function(v),
	  *   where v is the decoded value that comes after the tag, and where the
	  *   function returns the correctly-created value for that tag.
	  * @property {boolean} [bigint=true] generate JavaScript BigInt's
	  *   instead of BigNumbers, when possible.
	  * @property {boolean} [preferWeb=false] - if true, prefer Uint8Arrays to
	  *   be generated instead of node Buffers.  This might turn on some more
	  *   changes in the future, so forward-compatibility is not guaranteed yet.
	  * @property {string} [encoding='hex'] - the encoding of input, ignored if
	  *   input is not string
	  */
	/**
	  * @callback diagnoseCallback
	  * @param {Error} [error] - if one was generated
	  * @param {string} [value] - the diagnostic value
	  */
	/**
	  * @param {DiagnoseOptions|diagnoseCallback|string} opts options,
	  *   the callback, or input incoding
	  * @param {diagnoseCallback} [cb] - called on completion
	  * @returns {{options: DiagnoseOptions, cb: diagnoseCallback}}
	  * @private
	  */
	function normalizeOptions(opts, cb) {
	  switch (typeof opts) {
	    case 'function':
	      return { options: {}, cb: /** @type {diagnoseCallback} */ (opts) }
	    case 'string':
	      return { options: { encoding: opts }, cb }
	    case 'object':
	      return { options: opts || {}, cb }
	    default:
	      throw new TypeError('Unknown option type')
	  }
	}

	/**
	 * Output the diagnostic format from a stream of CBOR bytes.
	 *
	 * @extends {stream.Transform}
	 */
	class Diagnose extends stream$1.Transform {
	  /**
	   * Creates an instance of Diagnose.
	   *
	   * @param {DiagnoseOptions} [options={}] - options for creation
	   */
	  constructor(options = {}) {
	    const {
	      separator = '\n',
	      stream_errors = false,
	      // decoder options
	      tags,
	      max_depth,
	      bigint,
	      preferWeb,
	      encoding,
	      // stream.Transform options
	      ...superOpts
	    } = options;
	    super({
	      ...superOpts,
	      readableObjectMode: false,
	      writableObjectMode: false
	    });

	    this.float_bytes = -1;
	    this.separator = separator;
	    this.stream_errors = stream_errors;
	    this.parser = new Decoder({
	      tags,
	      max_depth,
	      bigint,
	      preferWeb,
	      encoding
	    });
	    this.parser.on('more-bytes', this._on_more.bind(this));
	    this.parser.on('value', this._on_value.bind(this));
	    this.parser.on('start', this._on_start.bind(this));
	    this.parser.on('stop', this._on_stop.bind(this));
	    this.parser.on('data', this._on_data.bind(this));
	    this.parser.on('error', this._on_error.bind(this));
	  }

	  _transform(fresh, encoding, cb) {
	    return this.parser.write(fresh, encoding, cb)
	  }

	  _flush(cb) {
	    return this.parser._flush(er => {
	      if (this.stream_errors) {
	        if (er) {
	          this._on_error(er);
	        }
	        return cb()
	      }
	      return cb(er)
	    })
	  }

	  /**
	   * Convenience function to return a string in diagnostic format.
	   *
	   * @param {string|Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray
	   *   |DataView|stream.Readable} input - the CBOR bytes to format
	   * @param {DiagnoseOptions |diagnoseCallback|string} [options={}] -
	   *   options, the callback, or the input encoding
	   * @param {diagnoseCallback} [cb] - callback
	   * @returns {Promise} if callback not specified
	   */
	  static diagnose(input, options = {}, cb = null) {
	    if (input == null) {
	      throw new Error('input required')
	    }
	    ({options, cb} = normalizeOptions(options, cb));
	    const {encoding = 'hex', ...opts} = options;

	    const bs = new NoFilter$1();
	    const d = new Diagnose(opts);
	    let p = null;
	    if (typeof cb === 'function') {
	      d.on('end', () => cb(null, bs.toString('utf8')));
	      d.on('error', cb);
	    } else {
	      p = new Promise((resolve, reject) => {
	        d.on('end', () => resolve(bs.toString('utf8')));
	        d.on('error', reject);
	      });
	    }
	    d.pipe(bs);
	    utils$r.guessEncoding(input, encoding).pipe(d);
	    return p
	  }

	  _on_error(er) {
	    if (this.stream_errors) {
	      return this.push(er.toString())
	    }
	    return this.emit('error', er)
	  }

	  _on_more(mt, len, parent_mt, pos) {
	    if (mt === MT$2.SIMPLE_FLOAT) {
	      this.float_bytes = {
	        2: 1,
	        4: 2,
	        8: 3
	      }[len];
	    }
	  }

	  _fore(parent_mt, pos) {
	    switch (parent_mt) {
	      case MT$2.BYTE_STRING:
	      case MT$2.UTF8_STRING:
	      case MT$2.ARRAY:
	        if (pos > 0) {
	          this.push(', ');
	        }
	        break
	      case MT$2.MAP:
	        if (pos > 0) {
	          if (pos % 2) {
	            this.push(': ');
	          } else {
	            this.push(', ');
	          }
	        }
	    }
	  }

	  _on_value(val, parent_mt, pos) {
	    if (val === SYMS$1.BREAK) {
	      return
	    }
	    this._fore(parent_mt, pos);
	    const fb = this.float_bytes;
	    this.float_bytes = -1;
	    this.push(utils$r.cborValueToString(val, fb));
	  }

	  _on_start(mt, tag, parent_mt, pos) {
	    this._fore(parent_mt, pos);
	    switch (mt) {
	      case MT$2.TAG:
	        this.push(`${tag}(`);
	        break
	      case MT$2.ARRAY:
	        this.push('[');
	        break
	      case MT$2.MAP:
	        this.push('{');
	        break
	      case MT$2.BYTE_STRING:
	      case MT$2.UTF8_STRING:
	        this.push('(');
	        break
	    }
	    if (tag === SYMS$1.STREAM) {
	      this.push('_ ');
	    }
	  }

	  _on_stop(mt) {
	    switch (mt) {
	      case MT$2.TAG:
	        this.push(')');
	        break
	      case MT$2.ARRAY:
	        this.push(']');
	        break
	      case MT$2.MAP:
	        this.push('}');
	        break
	      case MT$2.BYTE_STRING:
	      case MT$2.UTF8_STRING:
	        this.push(')');
	        break
	    }
	  }

	  _on_data() {
	    this.push(this.separator);
	  }
	}

	var diagnose = Diagnose;

	const stream = require$$0__default$2['default'];
	const NoFilter = lib$1;
	const utils$q = utils$v;
	const constants$4 = constants$7;
	const {
	  MT: MT$1, NUMBYTES, SHIFT32, SIMPLE, SYMS, TAG, BI
	} = constants$4;
	const { Buffer: Buffer$5 } = require$$0__default$3['default'];

	const HALF = (MT$1.SIMPLE_FLOAT << 5) | NUMBYTES.TWO;
	const FLOAT = (MT$1.SIMPLE_FLOAT << 5) | NUMBYTES.FOUR;
	const DOUBLE = (MT$1.SIMPLE_FLOAT << 5) | NUMBYTES.EIGHT;
	const TRUE = (MT$1.SIMPLE_FLOAT << 5) | SIMPLE.TRUE;
	const FALSE = (MT$1.SIMPLE_FLOAT << 5) | SIMPLE.FALSE;
	const UNDEFINED = (MT$1.SIMPLE_FLOAT << 5) | SIMPLE.UNDEFINED;
	const NULL = (MT$1.SIMPLE_FLOAT << 5) | SIMPLE.NULL;

	const BREAK = Buffer$5.from([0xff]);
	const BUF_NAN = Buffer$5.from('f97e00', 'hex');
	const BUF_INF_NEG = Buffer$5.from('f9fc00', 'hex');
	const BUF_INF_POS = Buffer$5.from('f97c00', 'hex');
	const BUF_NEG_ZERO = Buffer$5.from('f98000', 'hex');

	/**
	 * @param {string} str
	 * @returns {"number"|"float"|"int"|"string"}
	 * @private
	 */
	function parseDateType(str) {
	  if (!str) {
	    return 'number'
	  }
	  switch (str.toLowerCase()) {
	    // yes, return str would have made more sense, but tsc is pedantic
	    case 'number':
	      return 'number'
	    case 'float':
	      return 'float'
	    case 'int':
	      return 'int'
	    case 'string':
	      return 'string'
	  }
	  throw new TypeError(`dateType invalid, got "${str}"`)
	}

	/**
	 * @typedef EncodingOptions
	 * @property {any[]|Object} [genTypes=[]] - array of pairs of
	 *   `type`, `function(Encoder)` for semantic types to be encoded.  Not
	 *   needed for Array, Date, Buffer, Map, RegExp, Set, URL, or BigNumber.
	 *   If an object, the keys are the constructor names for the types.
	 * @property {boolean} [canonical=false] - should the output be
	 *   canonicalized
	 * @property {boolean|WeakSet} [detectLoops=false] - should object loops
	 *   be detected?  This will currently add memory to track every part of the
	 *   object being encoded in a WeakSet.  Do not encode
	 *   the same object twice on the same encoder, without calling
	 *   `removeLoopDetectors` in between, which will clear the WeakSet.
	 *   You may pass in your own WeakSet to be used; this is useful in some
	 *   recursive scenarios.
	 * @property {("number"|"float"|"int"|"string")} [dateType="number"] -
	 *   how should dates be encoded?  "number" means float or int, if no
	 *   fractional seconds.
	 * @property {any} [encodeUndefined=undefined] - How should an
	 *   "undefined" in the input be encoded.  By default, just encode a CBOR
	 *   undefined.  If this is a buffer, use those bytes without re-encoding
	 *   them.  If this is a function, the function will be called (which is a
	 *   good time to throw an exception, if that's what you want), and the
	 *   return value will be used according to these rules.  Anything else will
	 *   be encoded as CBOR.
	 * @property {boolean} [disallowUndefinedKeys=false] - Should
	 *   "undefined" be disallowed as a key in a Map that is serialized?  If
	 *   this is true, encode(new Map([[undefined, 1]])) will throw an
	 *   exception.  Note that it is impossible to get a key of undefined in a
	 *   normal JS object.
	 * @property {boolean} [collapseBigIntegers=false] - Should integers
	 *   that come in as BigNumber integers and ECMAscript bigint's be encoded
	 *   as normal CBOR integers if they fit, discarding type information?
	 * @property {number} [chunkSize=4096] - Number of characters or bytes
	 *   for each chunk, if obj is a string or Buffer, when indefinite encoding
	 * @property {boolean} [omitUndefinedProperties=false] - When encoding
	 *   objects or Maps, do not include a key if its corresponding value is
	 *   `undefined`.
	 */

	/**
	 * Transform JavaScript values into CBOR bytes.  The `Writable` side of
	 * the stream is in object mode.
	 *
	 * @extends {stream.Transform}
	 */
	class Encoder extends stream.Transform {
	  /**
	   * Creates an instance of Encoder.
	   *
	   * @param {EncodingOptions} [options={}] - options for the encoder
	   */
	  constructor(options = {}) {
	    const {
	      canonical = false,
	      encodeUndefined,
	      disallowUndefinedKeys = false,
	      dateType = 'number',
	      collapseBigIntegers = false,
	      detectLoops = false,
	      omitUndefinedProperties = false,
	      genTypes = [],
	      ...superOpts
	    } = options;

	    super({
	      ...superOpts,
	      readableObjectMode: false,
	      writableObjectMode: true
	    });

	    this.canonical = canonical;
	    this.encodeUndefined = encodeUndefined;
	    this.disallowUndefinedKeys = disallowUndefinedKeys;
	    this.dateType = parseDateType(dateType);
	    this.collapseBigIntegers = this.canonical ? true : collapseBigIntegers;
	    this.detectLoops = detectLoops;
	    if (typeof detectLoops === 'boolean') {
	      if (detectLoops) {
	        this.detectLoops = new WeakSet();
	      }
	    } else if (!(detectLoops instanceof WeakSet)) {
	      throw new TypeError('detectLoops must be boolean or WeakSet')
	    }
	    this.omitUndefinedProperties = omitUndefinedProperties;

	    this.semanticTypes = {
	      Array: this._pushArray,
	      Date: this._pushDate,
	      Buffer: this._pushBuffer,
	      [Buffer$5.name]: this._pushBuffer, // might be mangled
	      Map: this._pushMap,
	      NoFilter: this._pushNoFilter,
	      [NoFilter.name]: this._pushNoFilter, // might be mangled
	      RegExp: this._pushRegexp,
	      Set: this._pushSet,
	      ArrayBuffer: this._pushArrayBuffer,
	      Uint8ClampedArray: this._pushTypedArray,
	      Uint8Array: this._pushTypedArray,
	      Uint16Array: this._pushTypedArray,
	      Uint32Array: this._pushTypedArray,
	      Int8Array: this._pushTypedArray,
	      Int16Array: this._pushTypedArray,
	      Int32Array: this._pushTypedArray,
	      Float32Array: this._pushTypedArray,
	      Float64Array: this._pushTypedArray,
	      URL: this._pushURL,
	      Boolean: this._pushBoxed,
	      Number: this._pushBoxed,
	      String: this._pushBoxed
	    };
	    if (constants$4.BigNumber) {
	      this.semanticTypes[constants$4.BigNumber.name] = this._pushBigNumber;
	    }
	    // Safari needs to get better.
	    if (typeof BigUint64Array !== 'undefined') {
	      this.semanticTypes[BigUint64Array.name] = this._pushTypedArray;
	    }
	    if (typeof BigInt64Array !== 'undefined') {
	      this.semanticTypes[BigInt64Array.name] = this._pushTypedArray;
	    }

	    if (Array.isArray(genTypes)) {
	      for (let i = 0, len = genTypes.length; i < len; i += 2) {
	        this.addSemanticType(genTypes[i], genTypes[i + 1]);
	      }
	    } else {
	      for (const [k, v] of Object.entries(genTypes)) {
	        this.addSemanticType(k, v);
	      }
	    }
	  }

	  _transform(fresh, encoding, cb) {
	    const ret = this.pushAny(fresh);
	    // Old transformers might not return bool.  undefined !== false
	    return cb((ret === false) ? new Error('Push Error') : undefined)
	  }

	  // TODO: make static?
	  // eslint-disable-next-line class-methods-use-this
	  _flush(cb) {
	    return cb()
	  }

	  /**
	   * @callback encodeFunction
	   * @param {Encoder} encoder - the encoder to serialize into.  Call "write"
	   *   on the encoder as needed.
	   * @return {bool} - true on success, else false
	   */

	  /**
	   * Add an encoding function to the list of supported semantic types.  This is
	   * useful for objects for which you can't add an encodeCBOR method
	   *
	   * @param {any} type
	   * @param {any} fun
	   * @returns {encodeFunction}
	   */
	  addSemanticType(type, fun) {
	    const typeName = (typeof type === 'string') ? type : type.name;
	    const old = this.semanticTypes[typeName];

	    if (fun) {
	      if (typeof fun !== 'function') {
	        throw new TypeError('fun must be of type function')
	      }
	      this.semanticTypes[typeName] = fun;
	    } else if (old) {
	      delete this.semanticTypes[typeName];
	    }
	    return old
	  }

	  _pushUInt8(val) {
	    const b = Buffer$5.allocUnsafe(1);
	    b.writeUInt8(val, 0);
	    return this.push(b)
	  }

	  _pushUInt16BE(val) {
	    const b = Buffer$5.allocUnsafe(2);
	    b.writeUInt16BE(val, 0);
	    return this.push(b)
	  }

	  _pushUInt32BE(val) {
	    const b = Buffer$5.allocUnsafe(4);
	    b.writeUInt32BE(val, 0);
	    return this.push(b)
	  }

	  _pushFloatBE(val) {
	    const b = Buffer$5.allocUnsafe(4);
	    b.writeFloatBE(val, 0);
	    return this.push(b)
	  }

	  _pushDoubleBE(val) {
	    const b = Buffer$5.allocUnsafe(8);
	    b.writeDoubleBE(val, 0);
	    return this.push(b)
	  }

	  _pushNaN() {
	    return this.push(BUF_NAN)
	  }

	  _pushInfinity(obj) {
	    const half = (obj < 0) ? BUF_INF_NEG : BUF_INF_POS;
	    return this.push(half)
	  }

	  _pushFloat(obj) {
	    if (this.canonical) {
	      // TODO: is this enough slower to hide behind canonical?
	      // It's certainly enough of a hack (see utils.parseHalf)

	      // From section 3.9:
	      // If a protocol allows for IEEE floats, then additional canonicalization
	      // rules might need to be added.  One example rule might be to have all
	      // floats start as a 64-bit float, then do a test conversion to a 32-bit
	      // float; if the result is the same numeric value, use the shorter value
	      // and repeat the process with a test conversion to a 16-bit float.  (This
	      // rule selects 16-bit float for positive and negative Infinity as well.)

	      // which seems pretty much backwards to me.
	      const b2 = Buffer$5.allocUnsafe(2);
	      if (utils$q.writeHalf(b2, obj)) {
	        // I have convinced myself that there are no cases where writeHalf
	        // will return true but `utils.parseHalf(b2) !== obj)`
	        return this._pushUInt8(HALF) && this.push(b2)
	      }
	    }
	    if (Math.fround(obj) === obj) {
	      return this._pushUInt8(FLOAT) && this._pushFloatBE(obj)
	    }

	    return this._pushUInt8(DOUBLE) && this._pushDoubleBE(obj)
	  }

	  _pushInt(obj, mt, orig) {
	    const m = mt << 5;
	    switch (false) {
	      case !(obj < 24):
	        return this._pushUInt8(m | obj)
	      case !(obj <= 0xff):
	        return this._pushUInt8(m | NUMBYTES.ONE) && this._pushUInt8(obj)
	      case !(obj <= 0xffff):
	        return this._pushUInt8(m | NUMBYTES.TWO) && this._pushUInt16BE(obj)
	      case !(obj <= 0xffffffff):
	        return this._pushUInt8(m | NUMBYTES.FOUR) && this._pushUInt32BE(obj)
	      case !(obj <= Number.MAX_SAFE_INTEGER):
	        return this._pushUInt8(m | NUMBYTES.EIGHT) &&
	          this._pushUInt32BE(Math.floor(obj / SHIFT32)) &&
	          this._pushUInt32BE(obj % SHIFT32)
	      default:
	        if (mt === MT$1.NEG_INT) {
	          return this._pushFloat(orig)
	        }
	        return this._pushFloat(obj)
	    }
	  }

	  _pushIntNum(obj) {
	    if (Object.is(obj, -0)) {
	      return this.push(BUF_NEG_ZERO)
	    }

	    if (obj < 0) {
	      return this._pushInt(-obj - 1, MT$1.NEG_INT, obj)
	    }
	    return this._pushInt(obj, MT$1.POS_INT)
	  }

	  _pushNumber(obj) {
	    switch (false) {
	      case !isNaN(obj):
	        return this._pushNaN()
	      case isFinite(obj):
	        return this._pushInfinity(obj)
	      case Math.round(obj) !== obj:
	        return this._pushIntNum(obj)
	      default:
	        return this._pushFloat(obj)
	    }
	  }

	  _pushString(obj) {
	    const len = Buffer$5.byteLength(obj, 'utf8');
	    return this._pushInt(len, MT$1.UTF8_STRING) && this.push(obj, 'utf8')
	  }

	  _pushBoolean(obj) {
	    return this._pushUInt8(obj ? TRUE : FALSE)
	  }

	  _pushUndefined(obj) {
	    switch (typeof this.encodeUndefined) {
	      case 'undefined':
	        return this._pushUInt8(UNDEFINED)
	      case 'function':
	        return this.pushAny(this.encodeUndefined.call(this, obj))
	      case 'object': {
	        const buf = utils$q.bufferishToBuffer(this.encodeUndefined);
	        if (buf) {
	          return this.push(buf)
	        }
	      }
	    }
	    return this.pushAny(this.encodeUndefined)
	  }

	  _pushNull(obj) {
	    return this._pushUInt8(NULL)
	  }

	  // TODO: make this static, and not-private
	  // eslint-disable-next-line class-methods-use-this
	  _pushArray(gen, obj, opts) {
	    opts = {
	      indefinite: false,
	      ...opts
	    };
	    const len = obj.length;
	    if (opts.indefinite) {
	      if (!gen._pushUInt8((MT$1.ARRAY << 5) | NUMBYTES.INDEFINITE)) {
	        return false
	      }
	    } else if (!gen._pushInt(len, MT$1.ARRAY)) {
	      return false
	    }
	    for (let j = 0; j < len; j++) {
	      if (!gen.pushAny(obj[j])) {
	        return false
	      }
	    }
	    if (opts.indefinite) {
	      if (!gen.push(BREAK)) {
	        return false
	      }
	    }
	    return true
	  }

	  _pushTag(tag) {
	    return this._pushInt(tag, MT$1.TAG)
	  }

	  // TODO: make this static, and consider not-private
	  // eslint-disable-next-line class-methods-use-this
	  _pushDate(gen, obj) {
	    switch (gen.dateType) {
	      case 'string':
	        return gen._pushTag(TAG.DATE_STRING) &&
	          gen._pushString(obj.toISOString())
	      case 'int':
	      case 'integer':
	        return gen._pushTag(TAG.DATE_EPOCH) &&
	          gen._pushIntNum(Math.round(obj / 1000))
	      case 'float':
	        // force float
	        return gen._pushTag(TAG.DATE_EPOCH) &&
	          gen._pushFloat(obj / 1000)
	      case 'number':
	      default:
	        // if we happen to have an integral number of seconds,
	        // use integer.  Otherwise, use float.
	        return gen._pushTag(TAG.DATE_EPOCH) &&
	          gen.pushAny(obj / 1000)
	    }
	  }

	  // TODO: make static?
	  // eslint-disable-next-line class-methods-use-this
	  _pushBuffer(gen, obj) {
	    return gen._pushInt(obj.length, MT$1.BYTE_STRING) && gen.push(obj)
	  }

	  // TODO: make static?
	  // eslint-disable-next-line class-methods-use-this
	  _pushNoFilter(gen, obj) {
	    return gen._pushBuffer(gen, obj.slice())
	  }

	  // TODO: make static?
	  // eslint-disable-next-line class-methods-use-this
	  _pushRegexp(gen, obj) {
	    return gen._pushTag(TAG.REGEXP) && gen.pushAny(obj.source)
	  }

	  // TODO: make static?
	  // eslint-disable-next-line class-methods-use-this
	  _pushSet(gen, obj) {
	    if (!gen._pushTag(TAG.SET)) {
	      return false
	    }
	    if (!gen._pushInt(obj.size, MT$1.ARRAY)) {
	      return false
	    }
	    for (const x of obj) {
	      if (!gen.pushAny(x)) {
	        return false
	      }
	    }
	    return true
	  }

	  // TODO: make static?
	  // eslint-disable-next-line class-methods-use-this
	  _pushURL(gen, obj) {
	    return gen._pushTag(TAG.URI) && gen.pushAny(obj.toString())
	  }

	  // TODO: make static?
	  // eslint-disable-next-line class-methods-use-this
	  _pushBoxed(gen, obj) {
	    return gen._pushAny(obj.valueOf())
	  }

	  /**
	   * @param {constants.BigNumber} obj
	   * @private
	   */
	  _pushBigint(obj) {
	    let m = MT$1.POS_INT;
	    let tag = TAG.POS_BIGINT;

	    if (obj.isNegative()) {
	      obj = obj.negated().minus(1);
	      m = MT$1.NEG_INT;
	      tag = TAG.NEG_BIGINT;
	    }

	    if (this.collapseBigIntegers &&
	        obj.lte(constants$4.BN.MAXINT64)) {
	      //  special handiling for 64bits
	      if (obj.lte(constants$4.BN.MAXINT32)) {
	        return this._pushInt(obj.toNumber(), m)
	      }
	      return this._pushUInt8((m << 5) | NUMBYTES.EIGHT) &&
	        this._pushUInt32BE(
	          obj.dividedToIntegerBy(constants$4.BN.SHIFT32).toNumber()
	        ) &&
	        this._pushUInt32BE(
	          obj.mod(constants$4.BN.SHIFT32).toNumber()
	        )
	    }
	    let str = obj.toString(16);
	    if (str.length % 2) {
	      str = '0' + str;
	    }
	    const buf = Buffer$5.from(str, 'hex');
	    return this._pushTag(tag) && this._pushBuffer(this, buf)
	  }

	  /**
	   * @param {bigint} obj
	   * @private
	   */
	  _pushJSBigint(obj) {
	    let m = MT$1.POS_INT;
	    let tag = TAG.POS_BIGINT;
	    // BigInt doesn't have -0
	    if (obj < 0) {
	      obj = -obj + BI.MINUS_ONE;
	      m = MT$1.NEG_INT;
	      tag = TAG.NEG_BIGINT;
	    }

	    if (this.collapseBigIntegers &&
	        (obj <= BI.MAXINT64)) {
	      //  special handiling for 64bits
	      if (obj <= 0xffffffff) {
	        return this._pushInt(Number(obj), m)
	      }
	      return this._pushUInt8((m << 5) | NUMBYTES.EIGHT) &&
	        this._pushUInt32BE(Number(obj / BI.SHIFT32)) &&
	        this._pushUInt32BE(Number(obj % BI.SHIFT32))
	    }

	    let str = obj.toString(16);
	    if (str.length % 2) {
	      str = '0' + str;
	    }
	    const buf = Buffer$5.from(str, 'hex');
	    return this._pushTag(tag) && this._pushBuffer(this, buf)
	  }

	  // TODO: make static
	  // eslint-disable-next-line class-methods-use-this
	  _pushBigNumber(gen, obj) {
	    if (obj.isNaN()) {
	      return gen._pushNaN()
	    }
	    if (!obj.isFinite()) {
	      return gen._pushInfinity(obj.isNegative() ? -Infinity : Infinity)
	    }
	    if (obj.isInteger()) {
	      return gen._pushBigint(obj)
	    }
	    if (!(gen._pushTag(TAG.DECIMAL_FRAC) &&
	      gen._pushInt(2, MT$1.ARRAY))) {
	      return false
	    }

	    const dec = obj.decimalPlaces();
	    const slide = obj.shiftedBy(dec);
	    if (!gen._pushIntNum(-dec)) {
	      return false
	    }
	    if (slide.abs().isLessThan(constants$4.BN.MAXINT)) {
	      return gen._pushIntNum(slide.toNumber())
	    }
	    return gen._pushBigint(slide)
	  }

	  // TODO: make static
	  // eslint-disable-next-line class-methods-use-this
	  _pushMap(gen, obj, opts) {
	    opts = {
	      indefinite: false,
	      ...opts
	    };
	    let entries = [...obj.entries()];
	    if (gen.omitUndefinedProperties) {
	      entries = entries.filter(([k, v]) => v !== undefined);
	    }
	    if (opts.indefinite) {
	      if (!gen._pushUInt8((MT$1.MAP << 5) | NUMBYTES.INDEFINITE)) {
	        return false
	      }
	    } else if (!gen._pushInt(entries.length, MT$1.MAP)) {
	      return false
	    }
	    // memoizing the cbor only helps in certain cases, and hurts in most
	    // others.  Just avoid it.
	    if (gen.canonical) {
	      // keep the key/value pairs together, so we don't have to do odd
	      // gets with object keys later
	      const enc = new Encoder({
	        genTypes: gen.semanticTypes,
	        canonical: gen.canonical,
	        detectLoops: !!gen.detectLoops, // give enc its own loop detector
	        dateType: gen.dateType,
	        disallowUndefinedKeys: gen.disallowUndefinedKeys,
	        collapseBigIntegers: gen.collapseBigIntegers
	      });
	      const bs = new NoFilter({highWaterMark: gen.readableHighWaterMark});
	      enc.pipe(bs);
	      entries.sort(([a], [b]) => {
	        // a, b are the keys
	        enc.pushAny(a);
	        const a_cbor = bs.read();
	        enc.pushAny(b);
	        const b_cbor = bs.read();
	        return a_cbor.compare(b_cbor)
	      });
	      for (const [k, v] of entries) {
	        if (gen.disallowUndefinedKeys && (typeof k === 'undefined')) {
	          throw new Error('Invalid Map key: undefined')
	        }
	        if (!(gen.pushAny(k) && gen.pushAny(v))) {
	          return false
	        }
	      }
	    } else {
	      for (const [k, v] of entries) {
	        if (gen.disallowUndefinedKeys && (typeof k === 'undefined')) {
	          throw new Error('Invalid Map key: undefined')
	        }
	        if (!(gen.pushAny(k) && gen.pushAny(v))) {
	          return false
	        }
	      }
	    }
	    if (opts.indefinite) {
	      if (!gen.push(BREAK)) {
	        return false
	      }
	    }
	    return true
	  }

	  // TODO: make static
	  // eslint-disable-next-line class-methods-use-this
	  _pushTypedArray(gen, obj) {
	    // see https://tools.ietf.org/html/rfc8746

	    let typ = 0b01000000;
	    let sz = obj.BYTES_PER_ELEMENT;
	    const {name} = obj.constructor;

	    if (name.startsWith('Float')) {
	      typ |= 0b00010000;
	      sz /= 2;
	    } else if (!name.includes('U')) {
	      typ |= 0b00001000;
	    }
	    if (name.includes('Clamped') || ((sz !== 1) && !utils$q.isBigEndian())) {
	      typ |= 0b00000100;
	    }
	    typ |= {
	      1: 0b00,
	      2: 0b01,
	      4: 0b10,
	      8: 0b11
	    }[sz];
	    if (!gen._pushTag(typ)) {
	      return false
	    }
	    return gen._pushBuffer(
	      gen,
	      Buffer$5.from(obj.buffer, obj.byteOffset, obj.byteLength)
	    )
	  }

	  // TODO: make static
	  // eslint-disable-next-line class-methods-use-this
	  _pushArrayBuffer(gen, obj) {
	    return gen._pushBuffer(gen, Buffer$5.from(obj))
	  }

	  /**
	   * Remove the loop detector WeakSet for this Encoder.
	   *
	   * @returns {boolean} - true when the Encoder was reset, else false
	   */
	  removeLoopDetectors() {
	    if (!this.detectLoops) {
	      return false
	    }
	    this.detectLoops = new WeakSet();
	    return true
	  }

	  _pushObject(obj, opts) {
	    if (!obj) {
	      return this._pushNull(obj)
	    }
	    opts = {
	      indefinite: false,
	      skipTypes: false,
	      ...opts
	    };
	    if (!opts.indefinite) {
	      // this will only happen the first time through for indefinite encoding
	      if (this.detectLoops) {
	        if (this.detectLoops.has(obj)) {
	          throw new Error(`\
Loop detected while CBOR encoding.
Call removeLoopDetectors before resuming.`)
	        } else {
	          this.detectLoops.add(obj);
	        }
	      }
	    }
	    if (!opts.skipTypes) {
	      const f = obj.encodeCBOR;
	      if (typeof f === 'function') {
	        return f.call(obj, this)
	      }
	      const converter = this.semanticTypes[obj.constructor.name];
	      if (converter) {
	        return converter.call(obj, this, obj)
	      }
	    }
	    const keys = Object.keys(obj).filter(k => {
	      const tv = typeof obj[k];
	      return (tv !== 'function') &&
	        (!this.omitUndefinedProperties || (tv !== 'undefined'))
	    });
	    const cbor_keys = {};
	    if (this.canonical) {
	      // note: this can't be a normal sort, because 'b' needs to sort before
	      // 'aa'
	      keys.sort((a, b) => {
	        // Always strings, so don't bother to pass options.
	        // hold on to the cbor versions, since there's no need
	        // to encode more than once
	        const a_cbor = cbor_keys[a] || (cbor_keys[a] = Encoder.encode(a));
	        const b_cbor = cbor_keys[b] || (cbor_keys[b] = Encoder.encode(b));

	        return a_cbor.compare(b_cbor)
	      });
	    }
	    if (opts.indefinite) {
	      if (!this._pushUInt8((MT$1.MAP << 5) | NUMBYTES.INDEFINITE)) {
	        return false
	      }
	    } else if (!this._pushInt(keys.length, MT$1.MAP)) {
	      return false
	    }
	    let ck = null;
	    for (let j = 0, len2 = keys.length; j < len2; j++) {
	      const k = keys[j];
	      if (this.canonical && ((ck = cbor_keys[k]))) {
	        if (!this.push(ck)) { // already a Buffer
	          return false
	        }
	      } else if (!this._pushString(k)) {
	        return false
	      }
	      if (!this.pushAny(obj[k])) {
	        return false
	      }
	    }
	    if (opts.indefinite) {
	      if (!this.push(BREAK)) {
	        return false
	      }
	    } else if (this.detectLoops) {
	      this.detectLoops.delete(obj);
	    }
	    return true
	  }

	  /**
	   * Push any supported type onto the encoded stream
	   *
	   * @param {any} obj
	   * @returns {boolean} true on success
	   */
	  pushAny(obj) {
	    switch (typeof obj) {
	      case 'number':
	        return this._pushNumber(obj)
	      case 'bigint':
	        return this._pushJSBigint(obj)
	      case 'string':
	        return this._pushString(obj)
	      case 'boolean':
	        return this._pushBoolean(obj)
	      case 'undefined':
	        return this._pushUndefined(obj)
	      case 'object':
	        return this._pushObject(obj)
	      case 'symbol':
	        switch (obj) {
	          case SYMS.NULL:
	            return this._pushNull(null)
	          case SYMS.UNDEFINED:
	            return this._pushUndefined(undefined)
	          // TODO: Add pluggable support for other symbols
	          default:
	            throw new Error('Unknown symbol: ' + obj.toString())
	        }
	      default:
	        throw new Error(
	          'Unknown type: ' + typeof obj + ', ' +
	          (!!obj.toString ? obj.toString() : '')
	        )
	    }
	  }

	  /* backwards-compat wrapper */
	  _pushAny(obj) {
	    // TODO: write deprecation warning
	    return this.pushAny(obj)
	  }

	  _encodeAll(objs) {
	    const bs = new NoFilter({ highWaterMark: this.readableHighWaterMark });
	    this.pipe(bs);
	    for (const o of objs) {
	      this.pushAny(o);
	    }
	    this.end();
	    return bs.read()
	  }

	  /**
	   * Encode the given object with indefinite length.  There are apparently
	   * some (IMO) broken implementations of poorly-specified protocols that
	   * REQUIRE indefinite-encoding.  Add this to an object or class as the
	   * `encodeCBOR` function to get indefinite encoding:
	   * @example
	   * const o = {
	   *   a: true,
	   *   encodeCBOR: cbor.Encoder.encodeIndefinite
	   * }
	   * const m = []
	   * m.encodeCBOR = cbor.Encoder.encodeIndefinite
	   * cbor.encodeOne([o, m])
	   *
	   * @param {Encoder} gen - the encoder to use
	   * @param {String|Buffer|Array|Map|Object} [obj] - the object to encode.  If
	   *   null, use "this" instead.
	   * @param {EncodingOptions} [options={}] - Options for encoding
	   * @returns {boolean} - true on success
	   */
	  static encodeIndefinite(gen, obj, options = {}) {
	    if (obj == null) {
	      if (this == null) {
	        throw new Error('No object to encode')
	      }
	      obj = this;
	    }

	    // TODO: consider other options
	    const { chunkSize = 4096 } = options;

	    let ret = true;
	    const objType = typeof obj;
	    let buf = null;
	    if (objType === 'string') {
	      // TODO: make sure not to split surrogate pairs at the edges of chunks,
	      // since such half-surrogates cannot be legally encoded as UTF-8.
	      ret = ret && gen._pushUInt8((MT$1.UTF8_STRING << 5) | NUMBYTES.INDEFINITE);
	      let offset = 0;
	      while (offset < obj.length) {
	        const endIndex = offset + chunkSize;
	        ret = ret && gen._pushString(obj.slice(offset, endIndex));
	        offset = endIndex;
	      }
	      ret = ret && gen.push(BREAK);
	    } else if (buf = utils$q.bufferishToBuffer(obj)) {
	      ret = ret && gen._pushUInt8((MT$1.BYTE_STRING << 5) | NUMBYTES.INDEFINITE);
	      let offset = 0;
	      while (offset < buf.length) {
	        const endIndex = offset + chunkSize;
	        ret = ret && gen._pushBuffer(gen, buf.slice(offset, endIndex));
	        offset = endIndex;
	      }
	      ret = ret && gen.push(BREAK);
	    } else if (Array.isArray(obj)) {
	      ret = ret && gen._pushArray(gen, obj, {
	        indefinite: true
	      });
	    } else if (obj instanceof Map) {
	      ret = ret && gen._pushMap(gen, obj, {
	        indefinite: true
	      });
	    } else {
	      if (objType !== 'object') {
	        throw new Error('Invalid indefinite encoding')
	      }
	      ret = ret && gen._pushObject(obj, {
	        indefinite: true,
	        skipTypes: true
	      });
	    }
	    return ret
	  }

	  /**
	   * Encode one or more JavaScript objects, and return a Buffer containing the
	   * CBOR bytes.
	   *
	   * @param {...any} objs - the objects to encode
	   * @returns {Buffer} - the encoded objects
	   */
	  static encode(...objs) {
	    return new Encoder()._encodeAll(objs)
	  }

	  /**
	   * Encode one or more JavaScript objects canonically (slower!), and return
	   * a Buffer containing the CBOR bytes.
	   *
	   * @param {...any} objs - the objects to encode
	   * @returns {Buffer} - the encoded objects
	   */
	  static encodeCanonical(...objs) {
	    return new Encoder({
	      canonical: true
	    })._encodeAll(objs)
	  }

	  /**
	   * Encode one JavaScript object using the given options.
	   *
	   * @static
	   * @param {any} obj - the object to encode
	   * @param {EncodingOptions} [options={}] - passed to the Encoder constructor
	   * @returns {Buffer} - the encoded objects
	   */
	  static encodeOne(obj, options) {
	    return new Encoder(options)._encodeAll([obj])
	  }

	  /**
	   * Encode one JavaScript object using the given options in a way that
	   * is more resilient to objects being larger than the highWaterMark
	   * number of bytes.  As with the other static encode functions, this
	   * will still use a large amount of memory.  Use a stream-based approach
	   * directly if you need to process large and complicated inputs.
	   *
	   * @param {any} obj - the object to encode
	   * @param {EncodingOptions} [options={}] - passed to the Encoder constructor
	   */
	  static encodeAsync(obj, options) {
	    return new Promise((resolve, reject) => {
	      const bufs = [];
	      const enc = new Encoder(options);
	      enc.on('data', buf => bufs.push(buf));
	      enc.on('error', reject);
	      enc.on('finish', () => resolve(Buffer$5.concat(bufs)));
	      enc.pushAny(obj);
	      enc.end();
	    })
	  }
	}

	var encoder$1 = Encoder;

	const { Buffer: Buffer$4 } = require$$0__default$3['default'];
	const encoder = encoder$1;
	const decoder = decoder$1;
	const { MT } = constants$7;

	/**
	 * Wrapper around a JavaScript Map object that allows the keys to be
	 * any complex type.  The base Map object allows this, but will only
	 * compare the keys by identity, not by value.  CborMap translates keys
	 * to CBOR first (and base64's them to ensure by-value comparison).
	 *
	 * This is not a subclass of Object, because it would be tough to get
	 * the semantics to be an exact match.
	 *
	 * @class CborMap
	 * @extends {Map}
	 */
	class CborMap extends Map {
	  /**
	   * Creates an instance of CborMap.
	   * @param {Iterable<any>} [iterable] An Array or other iterable
	   *   object whose elements are key-value pairs (arrays with two elements, e.g.
	   *   <code>[[ 1, 'one' ],[ 2, 'two' ]]</code>). Each key-value pair is added
	   *   to the new CborMap; null values are treated as undefined.
	   */
	  constructor(iterable) {
	    super(iterable);
	  }

	  /**
	   * @private
	   */
	  static _encode(key) {
	    return encoder.encodeCanonical(key).toString('base64')
	  }

	  /**
	   * @private
	   */
	  static _decode(key) {
	    return decoder.decodeFirstSync(key, 'base64')
	  }

	  /**
	   * Retrieve a specified element.
	   *
	   * @param {any} key The key identifying the element to retrieve.
	   *   Can be any type, which will be serialized into CBOR and compared by
	   *   value.
	   * @returns {any} The element if it exists, or <code>undefined</code>.
	   */
	  get(key) {
	    return super.get(CborMap._encode(key))
	  }

	  /**
	   * Adds or updates an element with a specified key and value.
	   *
	   * @param {any} key The key identifying the element to store.
	   *   Can be any type, which will be serialized into CBOR and compared by
	   *   value.
	   * @param {any} val The element to store
	   */
	  set(key, val) {
	    return super.set(CborMap._encode(key), val)
	  }

	  /**
	   * Removes the specified element.
	   *
	   * @param {any} key The key identifying the element to delete.
	   *   Can be any type, which will be serialized into CBOR and compared by
	   *   value.
	   * @returns {boolean}
	   */
	  delete(key) {
	    return super.delete(CborMap._encode(key))
	  }

	  /**
	   * Does an element with the specified key exist?
	   *
	   * @param {any} key The key identifying the element to check.
	   *   Can be any type, which will be serialized into CBOR and compared by
	   *   value.
	   * @returns {boolean}
	   */
	  has(key) {
	    return super.has(CborMap._encode(key))
	  }

	  /**
	   * Returns a new Iterator object that contains the keys for each element
	   * in the Map object in insertion order.  The keys are decoded into their
	   * original format.
	   *
	   * @returns {IterableIterator<any>}
	   */
	  *keys() {
	    for (const k of super.keys()) {
	      yield CborMap._decode(k);
	    }
	  }

	  /**
	   * Returns a new Iterator object that contains the [key, value] pairs for
	   * each element in the Map object in insertion order.
	   *
	   * @returns {IterableIterator}
	   */
	  *entries() {
	    for (const kv of super.entries()) {
	      yield [CborMap._decode(kv[0]), kv[1]];
	    }
	  }

	  /**
	   * Returns a new Iterator object that contains the [key, value] pairs for
	   * each element in the Map object in insertion order.
	   *
	   * @returns {IterableIterator}
	   */
	  [Symbol.iterator]() {
	    return this.entries()
	  }

	  /**
	   * Executes a provided function once per each key/value pair in the Map
	   * object, in insertion order.
	   *
	   * @param {function(any, any, Map): undefined} fun Function to execute for
	   *  each element, which takes a value, a key, and the Map being traversed.
	   * @param {any} thisArg Value to use as this when executing callback
	   */
	  forEach(fun, thisArg) {
	    if (typeof(fun) !== 'function') {
	      throw new TypeError('Must be function')
	    }
	    for (const kv of super.entries()) {
	      fun.call(this, kv[1], CborMap._decode(kv[0]), this);
	    }
	  }

	  /**
	   * Push the simple value onto the CBOR stream
	   *
	   * @param {Object} gen The generator to push onto
	   * @returns {boolean} true on success
	   */
	  encodeCBOR(gen) {
	    if (!gen._pushInt(this.size, MT.MAP)) {
	      return false
	    }
	    if (gen.canonical) {
	      const entries = Array.from(super.entries())
	        .map(kv => [Buffer$4.from(kv[0], 'base64'), kv[1]]);
	      entries.sort((a, b) => a[0].compare(b[0]));
	      for (const kv of entries) {
	        if (!(gen.push(kv[0]) && gen.pushAny(kv[1]))) {
	          return false
	        }
	      }
	    } else {
	      for (const kv of super.entries()) {
	        if (!(gen.push(Buffer$4.from(kv[0], 'base64')) && gen.pushAny(kv[1]))) {
	          return false
	        }
	      }
	    }
	    return true
	  }
	}

	var map = CborMap;

	(function (exports) {

	exports.BigNumber = constants$7.BigNumber;
	exports.Commented = commented;
	exports.Diagnose = diagnose;
	exports.Decoder = decoder$1;
	exports.Encoder = encoder$1;
	exports.Simple = simple;
	exports.Tagged = tagged;
	exports.Map = map;

	/**
	  * Convenience name for {@linkcode Commented.comment}
	  */
	exports.comment = exports.Commented.comment;
	/**
	  * Convenience name for {@linkcode Decoder.decodeAll}
	  */
	exports.decodeAll = exports.Decoder.decodeAll;
	/**
	  * Convenience name for {@linkcode Decoder.decodeFirst}
	  */
	exports.decodeFirst = exports.Decoder.decodeFirst;
	/**
	  * Convenience name for {@linkcode Decoder.decodeAllSync}
	  */
	exports.decodeAllSync = exports.Decoder.decodeAllSync;
	/**
	  * Convenience name for {@linkcode Decoder.decodeFirstSync}
	  */
	exports.decodeFirstSync = exports.Decoder.decodeFirstSync;
	/**
	  * Convenience name for {@linkcode Diagnose.diagnose}
	  */
	exports.diagnose = exports.Diagnose.diagnose;
	/**
	  * Convenience name for {@linkcode Encoder.encode}
	  */
	exports.encode = exports.Encoder.encode;
	/**
	  * Convenience name for {@linkcode Encoder.encodeCanonical}
	  */
	exports.encodeCanonical = exports.Encoder.encodeCanonical;
	/**
	  * Convenience name for {@linkcode Encoder.encodeOne}
	  */
	exports.encodeOne = exports.Encoder.encodeOne;
	/**
	  * Convenience name for {@linkcode Encoder.encodeAsync}
	  */
	exports.encodeAsync = exports.Encoder.encodeAsync;
	/**
	  * Convenience name for {@linkcode Decoder.decodeFirstSync}
	  */
	exports.decode = exports.Decoder.decodeFirstSync;

	/**
	 * The codec information for
	 * {@link https://github.com/Level/encoding-down encoding-down}, which is a
	 * codec framework for leveldb.  CBOR is a particularly convenient format for
	 * both keys and values, as it can deal with a lot of types that JSON can't
	 * handle without losing type information.
	 *
	 * @example
	 * const level = require('level')
	 * const cbor = require('cbor')
	 *
	 * const db = level('./db', {
	 *   keyEncoding: cbor.leveldb,
	 *   valueEncoding: cbor.leveldb
	 * })
	 *
	 * await db.put({a:1}, 9857298342094820394820394820398234092834n)
	 * const val = await db.get({a:1})) // 9857298342094820394820394820398234092834n
	 */
	exports.leveldb = {
	  decode: exports.Decoder.decodeFirstSync,
	  encode: exports.Encoder.encode,
	  buffer: true,
	  name: 'cbor'
	};

	/**
	 * Does this library and runtime support BigInts?  Only exported for backward
	 * compatibility.
	 *
	 * @deprecated since version 6.0
	 */
	exports.hasBigInt = true;
	}(cbor$5));

	var jsrsasign$1 = {};

	var navigator = {};
	navigator.userAgent = false;

	var window$1 = {};
	/*
	 * jsrsasign(all) 10.2.0 (2021-04-14) (c) 2010-2021 Kenji Urushima | kjur.github.com/jsrsasign/license
	 */

	/*!
	Copyright (c) 2011, Yahoo! Inc. All rights reserved.
	Code licensed under the BSD License:
	http://developer.yahoo.com/yui/license.html
	version: 2.9.0
	*/
	if(YAHOO===undefined){var YAHOO={};}YAHOO.lang={extend:function(g,h,f){if(!h||!g){throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.")}var d=function(){};d.prototype=h.prototype;g.prototype=new d();g.prototype.constructor=g;g.superclass=h.prototype;if(h.prototype.constructor==Object.prototype.constructor){h.prototype.constructor=h;}if(f){var b;for(b in f){g.prototype[b]=f[b];}var e=function(){},c=["toString","valueOf"];try{if(/MSIE/.test(navigator.userAgent)){e=function(j,i){for(b=0;b<c.length;b=b+1){var l=c[b],k=i[l];if(typeof k==="function"&&k!=Object.prototype[l]){j[l]=k;}}};}}catch(a){}e(g.prototype,f);}}};

	/*! CryptoJS v3.1.2 core-fix.js
	 * code.google.com/p/crypto-js
	 * (c) 2009-2013 by Jeff Mott. All rights reserved.
	 * code.google.com/p/crypto-js/wiki/License
	 * THIS IS FIX of 'core.js' to fix Hmac issue.
	 * https://code.google.com/p/crypto-js/issues/detail?id=84
	 * https://crypto-js.googlecode.com/svn-history/r667/branches/3.x/src/core.js
	 */
	var CryptoJS=CryptoJS||(function(e,g){var a={};var b=a.lib={};var j=b.Base=(function(){function n(){}return {extend:function(p){n.prototype=this;var o=new n();if(p){o.mixIn(p);}if(!o.hasOwnProperty("init")){o.init=function(){o.$super.init.apply(this,arguments);};}o.init.prototype=o;o.$super=this;return o},create:function(){var o=this.extend();o.init.apply(o,arguments);return o},init:function(){},mixIn:function(p){for(var o in p){if(p.hasOwnProperty(o)){this[o]=p[o];}}if(p.hasOwnProperty("toString")){this.toString=p.toString;}},clone:function(){return this.init.prototype.extend(this)}}}());var l=b.WordArray=j.extend({init:function(o,n){o=this.words=o||[];if(n!=g){this.sigBytes=n;}else {this.sigBytes=o.length*4;}},toString:function(n){return (n||h).stringify(this)},concat:function(t){var q=this.words;var p=t.words;var n=this.sigBytes;var s=t.sigBytes;this.clamp();if(n%4){for(var r=0;r<s;r++){var o=(p[r>>>2]>>>(24-(r%4)*8))&255;q[(n+r)>>>2]|=o<<(24-((n+r)%4)*8);}}else {for(var r=0;r<s;r+=4){q[(n+r)>>>2]=p[r>>>2];}}this.sigBytes+=s;return this},clamp:function(){var o=this.words;var n=this.sigBytes;o[n>>>2]&=4294967295<<(32-(n%4)*8);o.length=e.ceil(n/4);},clone:function(){var n=j.clone.call(this);n.words=this.words.slice(0);return n},random:function(p){var o=[];for(var n=0;n<p;n+=4){o.push((e.random()*4294967296)|0);}return new l.init(o,p)}});var m=a.enc={};var h=m.Hex={stringify:function(p){var r=p.words;var o=p.sigBytes;var q=[];for(var n=0;n<o;n++){var s=(r[n>>>2]>>>(24-(n%4)*8))&255;q.push((s>>>4).toString(16));q.push((s&15).toString(16));}return q.join("")},parse:function(p){var n=p.length;var q=[];for(var o=0;o<n;o+=2){q[o>>>3]|=parseInt(p.substr(o,2),16)<<(24-(o%8)*4);}return new l.init(q,n/2)}};var d=m.Latin1={stringify:function(q){var r=q.words;var p=q.sigBytes;var n=[];for(var o=0;o<p;o++){var s=(r[o>>>2]>>>(24-(o%4)*8))&255;n.push(String.fromCharCode(s));}return n.join("")},parse:function(p){var n=p.length;var q=[];for(var o=0;o<n;o++){q[o>>>2]|=(p.charCodeAt(o)&255)<<(24-(o%4)*8);}return new l.init(q,n)}};var c=m.Utf8={stringify:function(n){try{return decodeURIComponent(escape(d.stringify(n)))}catch(o){throw new Error("Malformed UTF-8 data")}},parse:function(n){return d.parse(unescape(encodeURIComponent(n)))}};var i=b.BufferedBlockAlgorithm=j.extend({reset:function(){this._data=new l.init();this._nDataBytes=0;},_append:function(n){if(typeof n=="string"){n=c.parse(n);}this._data.concat(n);this._nDataBytes+=n.sigBytes;},_process:function(w){var q=this._data;var x=q.words;var n=q.sigBytes;var t=this.blockSize;var v=t*4;var u=n/v;if(w){u=e.ceil(u);}else {u=e.max((u|0)-this._minBufferSize,0);}var s=u*t;var r=e.min(s*4,n);if(s){for(var p=0;p<s;p+=t){this._doProcessBlock(x,p);}var o=x.splice(0,s);q.sigBytes-=r;}return new l.init(o,r)},clone:function(){var n=j.clone.call(this);n._data=this._data.clone();return n},_minBufferSize:0});b.Hasher=i.extend({cfg:j.extend(),init:function(n){this.cfg=this.cfg.extend(n);this.reset();},reset:function(){i.reset.call(this);this._doReset();},update:function(n){this._append(n);this._process();return this},finalize:function(n){if(n){this._append(n);}var o=this._doFinalize();return o},blockSize:512/32,_createHelper:function(n){return function(p,o){return new n.init(o).finalize(p)}},_createHmacHelper:function(n){return function(p,o){return new k.HMAC.init(n,o).finalize(p)}}});var k=a.algo={};return a}(Math));
	/*
	CryptoJS v3.1.2 x64-core-min.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(g){var a=CryptoJS,f=a.lib,e=f.Base,h=f.WordArray,a=a.x64={};a.Word=e.extend({init:function(b,c){this.high=b;this.low=c;}});a.WordArray=e.extend({init:function(b,c){b=this.words=b||[];this.sigBytes=c!=g?c:8*b.length;},toX32:function(){for(var b=this.words,c=b.length,a=[],d=0;d<c;d++){var e=b[d];a.push(e.high);a.push(e.low);}return h.create(a,this.sigBytes)},clone:function(){for(var b=e.clone.call(this),c=b.words=this.words.slice(0),a=c.length,d=0;d<a;d++)c[d]=c[d].clone();return b}});})();

	/*
	CryptoJS v3.1.2 cipher-core.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	CryptoJS.lib.Cipher||function(u){var g=CryptoJS,f=g.lib,k=f.Base,l=f.WordArray,q=f.BufferedBlockAlgorithm,r=g.enc.Base64,v=g.algo.EvpKDF,n=f.Cipher=q.extend({cfg:k.extend(),createEncryptor:function(a,b){return this.create(this._ENC_XFORM_MODE,a,b)},createDecryptor:function(a,b){return this.create(this._DEC_XFORM_MODE,a,b)},init:function(a,b,c){this.cfg=this.cfg.extend(c);this._xformMode=a;this._key=b;this.reset();},reset:function(){q.reset.call(this);this._doReset();},process:function(a){this._append(a);
	return this._process()},finalize:function(a){a&&this._append(a);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(a){return {encrypt:function(b,c,d){return ("string"==typeof c?s:j).encrypt(a,b,c,d)},decrypt:function(b,c,d){return ("string"==typeof c?s:j).decrypt(a,b,c,d)}}}});f.StreamCipher=n.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var m=g.mode={},t=function(a,b,c){var d=this._iv;d?this._iv=u:d=this._prevBlock;for(var e=
	0;e<c;e++)a[b+e]^=d[e];},h=(f.BlockCipherMode=k.extend({createEncryptor:function(a,b){return this.Encryptor.create(a,b)},createDecryptor:function(a,b){return this.Decryptor.create(a,b)},init:function(a,b){this._cipher=a;this._iv=b;}})).extend();h.Encryptor=h.extend({processBlock:function(a,b){var c=this._cipher,d=c.blockSize;t.call(this,a,b,d);c.encryptBlock(a,b);this._prevBlock=a.slice(b,b+d);}});h.Decryptor=h.extend({processBlock:function(a,b){var c=this._cipher,d=c.blockSize,e=a.slice(b,b+d);c.decryptBlock(a,
	b);t.call(this,a,b,d);this._prevBlock=e;}});m=m.CBC=h;h=(g.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,e=[],f=0;f<c;f+=4)e.push(d);c=l.create(e,c);a.concat(c);},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255;}};f.BlockCipher=n.extend({cfg:n.cfg.extend({mode:m,padding:h}),reset:function(){n.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;
	this._mode=c.call(a,this,b&&b.words);},_doProcessBlock:function(a,b){this._mode.processBlock(a,b);},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0);}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var p=f.CipherParams=k.extend({init:function(a){this.mixIn(a);},toString:function(a){return (a||this.formatter).stringify(this)}}),m=(g.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;
	return (a?l.create([1398893684,1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=l.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16;}return p.create({ciphertext:a,salt:c})}},j=f.SerializableCipher=k.extend({cfg:k.extend({format:m}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var e=a.createEncryptor(c,d);b=e.finalize(b);e=e.cfg;return p.create({ciphertext:b,key:c,iv:e.iv,algorithm:a,mode:e.mode,padding:e.padding,
	blockSize:a.blockSize,formatter:d.format})},decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return "string"==typeof a?b.parse(a,this):a}}),g=(g.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=l.random(8));a=v.create({keySize:b+c}).compute(a,d);c=l.create(a.words.slice(b),4*c);a.sigBytes=4*b;return p.create({key:a,iv:c,salt:d})}},s=f.PasswordBasedCipher=j.extend({cfg:j.cfg.extend({kdf:g}),encrypt:function(a,
	b,c,d){d=this.cfg.extend(d);c=d.kdf.execute(c,a.keySize,a.ivSize);d.iv=c.iv;a=j.encrypt.call(this,a,b,c.key,d);a.mixIn(c);return a},decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);c=d.kdf.execute(c,a.keySize,a.ivSize,b.salt);d.iv=c.iv;return j.decrypt.call(this,a,b,c.key,d)}});}();

	/*
	CryptoJS v3.1.2 aes.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(){for(var q=CryptoJS,x=q.lib.BlockCipher,r=q.algo,j=[],y=[],z=[],A=[],B=[],C=[],s=[],u=[],v=[],w=[],g=[],k=0;256>k;k++)g[k]=128>k?k<<1:k<<1^283;for(var n=0,l=0,k=0;256>k;k++){var f=l^l<<1^l<<2^l<<3^l<<4,f=f>>>8^f&255^99;j[n]=f;y[f]=n;var t=g[n],D=g[t],E=g[D],b=257*g[f]^16843008*f;z[n]=b<<24|b>>>8;A[n]=b<<16|b>>>16;B[n]=b<<8|b>>>24;C[n]=b;b=16843009*E^65537*D^257*t^16843008*n;s[f]=b<<24|b>>>8;u[f]=b<<16|b>>>16;v[f]=b<<8|b>>>24;w[f]=b;n?(n=t^g[g[g[E^t]]],l^=g[g[l]]):n=l=1;}var F=[0,1,2,4,8,
	16,32,64,128,27,54],r=r.AES=x.extend({_doReset:function(){for(var c=this._key,e=c.words,a=c.sigBytes/4,c=4*((this._nRounds=a+6)+1),b=this._keySchedule=[],h=0;h<c;h++)if(h<a)b[h]=e[h];else {var d=b[h-1];h%a?6<a&&4==h%a&&(d=j[d>>>24]<<24|j[d>>>16&255]<<16|j[d>>>8&255]<<8|j[d&255]):(d=d<<8|d>>>24,d=j[d>>>24]<<24|j[d>>>16&255]<<16|j[d>>>8&255]<<8|j[d&255],d^=F[h/a|0]<<24);b[h]=b[h-a]^d;}e=this._invKeySchedule=[];for(a=0;a<c;a++)h=c-a,d=a%4?b[h]:b[h-4],e[a]=4>a||4>=h?d:s[j[d>>>24]]^u[j[d>>>16&255]]^v[j[d>>>
	8&255]]^w[j[d&255]];},encryptBlock:function(c,e){this._doCryptBlock(c,e,this._keySchedule,z,A,B,C,j);},decryptBlock:function(c,e){var a=c[e+1];c[e+1]=c[e+3];c[e+3]=a;this._doCryptBlock(c,e,this._invKeySchedule,s,u,v,w,y);a=c[e+1];c[e+1]=c[e+3];c[e+3]=a;},_doCryptBlock:function(c,e,a,b,h,d,j,m){for(var n=this._nRounds,f=c[e]^a[0],g=c[e+1]^a[1],k=c[e+2]^a[2],p=c[e+3]^a[3],l=4,t=1;t<n;t++)var q=b[f>>>24]^h[g>>>16&255]^d[k>>>8&255]^j[p&255]^a[l++],r=b[g>>>24]^h[k>>>16&255]^d[p>>>8&255]^j[f&255]^a[l++],s=
	b[k>>>24]^h[p>>>16&255]^d[f>>>8&255]^j[g&255]^a[l++],p=b[p>>>24]^h[f>>>16&255]^d[g>>>8&255]^j[k&255]^a[l++],f=q,g=r,k=s;q=(m[f>>>24]<<24|m[g>>>16&255]<<16|m[k>>>8&255]<<8|m[p&255])^a[l++];r=(m[g>>>24]<<24|m[k>>>16&255]<<16|m[p>>>8&255]<<8|m[f&255])^a[l++];s=(m[k>>>24]<<24|m[p>>>16&255]<<16|m[f>>>8&255]<<8|m[g&255])^a[l++];p=(m[p>>>24]<<24|m[f>>>16&255]<<16|m[g>>>8&255]<<8|m[k&255])^a[l++];c[e]=q;c[e+1]=r;c[e+2]=s;c[e+3]=p;},keySize:8});q.AES=x._createHelper(r);})();

	/*
	CryptoJS v3.1.2 tripledes-min.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(){function j(b,c){var a=(this._lBlock>>>b^this._rBlock)&c;this._rBlock^=a;this._lBlock^=a<<b;}function l(b,c){var a=(this._rBlock>>>b^this._lBlock)&c;this._lBlock^=a;this._rBlock^=a<<b;}var h=CryptoJS,e=h.lib,n=e.WordArray,e=e.BlockCipher,g=h.algo,q=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],p=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,
	55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],r=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],s=[{"0":8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,
	2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,
	1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{"0":1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,
	75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,
	276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{"0":260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,
	14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,
	17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{"0":2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,
	98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,
	1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{"0":128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,
	10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,
	83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{"0":268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,
	2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{"0":1048576,
	16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,
	496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{"0":134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,
	2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,
	2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],t=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],m=g.DES=e.extend({_doReset:function(){for(var b=this._key.words,c=[],a=0;56>a;a++){var f=q[a]-1;c[a]=b[f>>>5]>>>31-f%32&1;}b=this._subKeys=[];for(f=0;16>f;f++){for(var d=b[f]=[],e=r[f],a=0;24>a;a++)d[a/6|0]|=c[(p[a]-1+e)%28]<<31-a%6,d[4+(a/6|0)]|=c[28+(p[a+24]-1+e)%28]<<31-a%6;d[0]=d[0]<<1|d[0]>>>31;for(a=1;7>a;a++)d[a]>>>=
	4*(a-1)+3;d[7]=d[7]<<5|d[7]>>>27;}c=this._invSubKeys=[];for(a=0;16>a;a++)c[a]=b[15-a];},encryptBlock:function(b,c){this._doCryptBlock(b,c,this._subKeys);},decryptBlock:function(b,c){this._doCryptBlock(b,c,this._invSubKeys);},_doCryptBlock:function(b,c,a){this._lBlock=b[c];this._rBlock=b[c+1];j.call(this,4,252645135);j.call(this,16,65535);l.call(this,2,858993459);l.call(this,8,16711935);j.call(this,1,1431655765);for(var f=0;16>f;f++){for(var d=a[f],e=this._lBlock,h=this._rBlock,g=0,k=0;8>k;k++)g|=s[k][((h^
	d[k])&t[k])>>>0];this._lBlock=h;this._rBlock=e^g;}a=this._lBlock;this._lBlock=this._rBlock;this._rBlock=a;j.call(this,1,1431655765);l.call(this,8,16711935);l.call(this,2,858993459);j.call(this,16,65535);j.call(this,4,252645135);b[c]=this._lBlock;b[c+1]=this._rBlock;},keySize:2,ivSize:2,blockSize:2});h.DES=e._createHelper(m);g=g.TripleDES=e.extend({_doReset:function(){var b=this._key.words;this._des1=m.createEncryptor(n.create(b.slice(0,2)));this._des2=m.createEncryptor(n.create(b.slice(2,4)));this._des3=
	m.createEncryptor(n.create(b.slice(4,6)));},encryptBlock:function(b,c){this._des1.encryptBlock(b,c);this._des2.decryptBlock(b,c);this._des3.encryptBlock(b,c);},decryptBlock:function(b,c){this._des3.decryptBlock(b,c);this._des2.encryptBlock(b,c);this._des1.decryptBlock(b,c);},keySize:6,ivSize:2,blockSize:2});h.TripleDES=e._createHelper(g);})();

	/*
	CryptoJS v3.1.2 enc-base64.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(){var h=CryptoJS,j=h.lib.WordArray;h.enc.Base64={stringify:function(b){var e=b.words,f=b.sigBytes,c=this._map;b.clamp();b=[];for(var a=0;a<f;a+=3)for(var d=(e[a>>>2]>>>24-8*(a%4)&255)<<16|(e[a+1>>>2]>>>24-8*((a+1)%4)&255)<<8|e[a+2>>>2]>>>24-8*((a+2)%4)&255,g=0;4>g&&a+0.75*g<f;g++)b.push(c.charAt(d>>>6*(3-g)&63));if(e=c.charAt(64))for(;b.length%4;)b.push(e);return b.join("")},parse:function(b){var e=b.length,f=this._map,c=f.charAt(64);c&&(c=b.indexOf(c),-1!=c&&(e=c));for(var c=[],a=0,d=0;d<
	e;d++)if(d%4){var g=f.indexOf(b.charAt(d-1))<<2*(d%4),h=f.indexOf(b.charAt(d))>>>6-2*(d%4);c[a>>>2]|=(g|h)<<24-8*(a%4);a++;}return j.create(c,a)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};})();

	/*
	CryptoJS v3.1.2 md5.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(E){function h(a,f,g,j,p,h,k){a=a+(f&g|~f&j)+p+k;return (a<<h|a>>>32-h)+f}function k(a,f,g,j,p,h,k){a=a+(f&j|g&~j)+p+k;return (a<<h|a>>>32-h)+f}function l(a,f,g,j,h,k,l){a=a+(f^g^j)+h+l;return (a<<k|a>>>32-k)+f}function n(a,f,g,j,h,k,l){a=a+(g^(f|~j))+h+l;return (a<<k|a>>>32-k)+f}for(var r=CryptoJS,q=r.lib,F=q.WordArray,s=q.Hasher,q=r.algo,a=[],t=0;64>t;t++)a[t]=4294967296*E.abs(E.sin(t+1))|0;q=q.MD5=s.extend({_doReset:function(){this._hash=new F.init([1732584193,4023233417,2562383102,271733878]);},
	_doProcessBlock:function(m,f){for(var g=0;16>g;g++){var j=f+g,p=m[j];m[j]=(p<<8|p>>>24)&16711935|(p<<24|p>>>8)&4278255360;}var g=this._hash.words,j=m[f+0],p=m[f+1],q=m[f+2],r=m[f+3],s=m[f+4],t=m[f+5],u=m[f+6],v=m[f+7],w=m[f+8],x=m[f+9],y=m[f+10],z=m[f+11],A=m[f+12],B=m[f+13],C=m[f+14],D=m[f+15],b=g[0],c=g[1],d=g[2],e=g[3],b=h(b,c,d,e,j,7,a[0]),e=h(e,b,c,d,p,12,a[1]),d=h(d,e,b,c,q,17,a[2]),c=h(c,d,e,b,r,22,a[3]),b=h(b,c,d,e,s,7,a[4]),e=h(e,b,c,d,t,12,a[5]),d=h(d,e,b,c,u,17,a[6]),c=h(c,d,e,b,v,22,a[7]),
	b=h(b,c,d,e,w,7,a[8]),e=h(e,b,c,d,x,12,a[9]),d=h(d,e,b,c,y,17,a[10]),c=h(c,d,e,b,z,22,a[11]),b=h(b,c,d,e,A,7,a[12]),e=h(e,b,c,d,B,12,a[13]),d=h(d,e,b,c,C,17,a[14]),c=h(c,d,e,b,D,22,a[15]),b=k(b,c,d,e,p,5,a[16]),e=k(e,b,c,d,u,9,a[17]),d=k(d,e,b,c,z,14,a[18]),c=k(c,d,e,b,j,20,a[19]),b=k(b,c,d,e,t,5,a[20]),e=k(e,b,c,d,y,9,a[21]),d=k(d,e,b,c,D,14,a[22]),c=k(c,d,e,b,s,20,a[23]),b=k(b,c,d,e,x,5,a[24]),e=k(e,b,c,d,C,9,a[25]),d=k(d,e,b,c,r,14,a[26]),c=k(c,d,e,b,w,20,a[27]),b=k(b,c,d,e,B,5,a[28]),e=k(e,b,
	c,d,q,9,a[29]),d=k(d,e,b,c,v,14,a[30]),c=k(c,d,e,b,A,20,a[31]),b=l(b,c,d,e,t,4,a[32]),e=l(e,b,c,d,w,11,a[33]),d=l(d,e,b,c,z,16,a[34]),c=l(c,d,e,b,C,23,a[35]),b=l(b,c,d,e,p,4,a[36]),e=l(e,b,c,d,s,11,a[37]),d=l(d,e,b,c,v,16,a[38]),c=l(c,d,e,b,y,23,a[39]),b=l(b,c,d,e,B,4,a[40]),e=l(e,b,c,d,j,11,a[41]),d=l(d,e,b,c,r,16,a[42]),c=l(c,d,e,b,u,23,a[43]),b=l(b,c,d,e,x,4,a[44]),e=l(e,b,c,d,A,11,a[45]),d=l(d,e,b,c,D,16,a[46]),c=l(c,d,e,b,q,23,a[47]),b=n(b,c,d,e,j,6,a[48]),e=n(e,b,c,d,v,10,a[49]),d=n(d,e,b,c,
	C,15,a[50]),c=n(c,d,e,b,t,21,a[51]),b=n(b,c,d,e,A,6,a[52]),e=n(e,b,c,d,r,10,a[53]),d=n(d,e,b,c,y,15,a[54]),c=n(c,d,e,b,p,21,a[55]),b=n(b,c,d,e,w,6,a[56]),e=n(e,b,c,d,D,10,a[57]),d=n(d,e,b,c,u,15,a[58]),c=n(c,d,e,b,B,21,a[59]),b=n(b,c,d,e,s,6,a[60]),e=n(e,b,c,d,z,10,a[61]),d=n(d,e,b,c,q,15,a[62]),c=n(c,d,e,b,x,21,a[63]);g[0]=g[0]+b|0;g[1]=g[1]+c|0;g[2]=g[2]+d|0;g[3]=g[3]+e|0;},_doFinalize:function(){var a=this._data,f=a.words,g=8*this._nDataBytes,j=8*a.sigBytes;f[j>>>5]|=128<<24-j%32;var h=E.floor(g/
	4294967296);f[(j+64>>>9<<4)+15]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;f[(j+64>>>9<<4)+14]=(g<<8|g>>>24)&16711935|(g<<24|g>>>8)&4278255360;a.sigBytes=4*(f.length+1);this._process();a=this._hash;f=a.words;for(g=0;4>g;g++)j=f[g],f[g]=(j<<8|j>>>24)&16711935|(j<<24|j>>>8)&4278255360;return a},clone:function(){var a=s.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=s._createHelper(q);r.HmacMD5=s._createHmacHelper(q);})(Math);

	/*
	CryptoJS v3.1.2 sha1-min.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(){var k=CryptoJS,b=k.lib,m=b.WordArray,l=b.Hasher,d=[],b=k.algo.SHA1=l.extend({_doReset:function(){this._hash=new m.init([1732584193,4023233417,2562383102,271733878,3285377520]);},_doProcessBlock:function(n,p){for(var a=this._hash.words,e=a[0],f=a[1],h=a[2],j=a[3],b=a[4],c=0;80>c;c++){if(16>c)d[c]=n[p+c]|0;else {var g=d[c-3]^d[c-8]^d[c-14]^d[c-16];d[c]=g<<1|g>>>31;}g=(e<<5|e>>>27)+b+d[c];g=20>c?g+((f&h|~f&j)+1518500249):40>c?g+((f^h^j)+1859775393):60>c?g+((f&h|f&j|h&j)-1894007588):g+((f^h^
	j)-899497514);b=j;j=h;h=f<<30|f>>>2;f=e;e=g;}a[0]=a[0]+e|0;a[1]=a[1]+f|0;a[2]=a[2]+h|0;a[3]=a[3]+j|0;a[4]=a[4]+b|0;},_doFinalize:function(){var b=this._data,d=b.words,a=8*this._nDataBytes,e=8*b.sigBytes;d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=Math.floor(a/4294967296);d[(e+64>>>9<<4)+15]=a;b.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var b=l.clone.call(this);b._hash=this._hash.clone();return b}});k.SHA1=l._createHelper(b);k.HmacSHA1=l._createHmacHelper(b);})();

	/*
	CryptoJS v3.1.2 sha256-min.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(k){for(var g=CryptoJS,h=g.lib,v=h.WordArray,j=h.Hasher,h=g.algo,s=[],t=[],u=function(q){return 4294967296*(q-(q|0))|0},l=2,b=0;64>b;){var d;a:{d=l;for(var w=k.sqrt(d),r=2;r<=w;r++)if(!(d%r)){d=!1;break a}d=!0;}d&&(8>b&&(s[b]=u(k.pow(l,0.5))),t[b]=u(k.pow(l,1/3)),b++);l++;}var n=[],h=h.SHA256=j.extend({_doReset:function(){this._hash=new v.init(s.slice(0));},_doProcessBlock:function(q,h){for(var a=this._hash.words,c=a[0],d=a[1],b=a[2],k=a[3],f=a[4],g=a[5],j=a[6],l=a[7],e=0;64>e;e++){if(16>e)n[e]=
	q[h+e]|0;else {var m=n[e-15],p=n[e-2];n[e]=((m<<25|m>>>7)^(m<<14|m>>>18)^m>>>3)+n[e-7]+((p<<15|p>>>17)^(p<<13|p>>>19)^p>>>10)+n[e-16];}m=l+((f<<26|f>>>6)^(f<<21|f>>>11)^(f<<7|f>>>25))+(f&g^~f&j)+t[e]+n[e];p=((c<<30|c>>>2)^(c<<19|c>>>13)^(c<<10|c>>>22))+(c&d^c&b^d&b);l=j;j=g;g=f;f=k+m|0;k=b;b=d;d=c;c=m+p|0;}a[0]=a[0]+c|0;a[1]=a[1]+d|0;a[2]=a[2]+b|0;a[3]=a[3]+k|0;a[4]=a[4]+f|0;a[5]=a[5]+g|0;a[6]=a[6]+j|0;a[7]=a[7]+l|0;},_doFinalize:function(){var d=this._data,b=d.words,a=8*this._nDataBytes,c=8*d.sigBytes;
	b[c>>>5]|=128<<24-c%32;b[(c+64>>>9<<4)+14]=k.floor(a/4294967296);b[(c+64>>>9<<4)+15]=a;d.sigBytes=4*b.length;this._process();return this._hash},clone:function(){var b=j.clone.call(this);b._hash=this._hash.clone();return b}});g.SHA256=j._createHelper(h);g.HmacSHA256=j._createHmacHelper(h);})(Math);

	/*
	CryptoJS v3.1.2 sha224-min.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(){var b=CryptoJS,d=b.lib.WordArray,a=b.algo,c=a.SHA256,a=a.SHA224=c.extend({_doReset:function(){this._hash=new d.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]);},_doFinalize:function(){var a=c._doFinalize.call(this);a.sigBytes-=4;return a}});b.SHA224=c._createHelper(a);b.HmacSHA224=c._createHmacHelper(a);})();

	/*
	CryptoJS v3.1.2 sha512-min.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(){function a(){return d.create.apply(d,arguments)}for(var n=CryptoJS,r=n.lib.Hasher,e=n.x64,d=e.Word,T=e.WordArray,e=n.algo,ea=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),
	a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,
	2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),
	a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,
	3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],v=[],w=0;80>w;w++)v[w]=a();e=e.SHA512=r.extend({_doReset:function(){this._hash=new T.init([new d.init(1779033703,4089235720),new d.init(3144134277,2227873595),new d.init(1013904242,4271175723),new d.init(2773480762,1595750129),new d.init(1359893119,2917565137),new d.init(2600822924,725511199),new d.init(528734635,4215389547),new d.init(1541459225,327033209)]);},_doProcessBlock:function(a,d){for(var f=this._hash.words,
	F=f[0],e=f[1],n=f[2],r=f[3],G=f[4],H=f[5],I=f[6],f=f[7],w=F.high,J=F.low,X=e.high,K=e.low,Y=n.high,L=n.low,Z=r.high,M=r.low,$=G.high,N=G.low,aa=H.high,O=H.low,ba=I.high,P=I.low,ca=f.high,Q=f.low,k=w,g=J,z=X,x=K,A=Y,y=L,U=Z,B=M,l=$,h=N,R=aa,C=O,S=ba,D=P,V=ca,E=Q,m=0;80>m;m++){var s=v[m];if(16>m)var j=s.high=a[d+2*m]|0,b=s.low=a[d+2*m+1]|0;else {var j=v[m-15],b=j.high,p=j.low,j=(b>>>1|p<<31)^(b>>>8|p<<24)^b>>>7,p=(p>>>1|b<<31)^(p>>>8|b<<24)^(p>>>7|b<<25),u=v[m-2],b=u.high,c=u.low,u=(b>>>19|c<<13)^(b<<
	3|c>>>29)^b>>>6,c=(c>>>19|b<<13)^(c<<3|b>>>29)^(c>>>6|b<<26),b=v[m-7],W=b.high,t=v[m-16],q=t.high,t=t.low,b=p+b.low,j=j+W+(b>>>0<p>>>0?1:0),b=b+c,j=j+u+(b>>>0<c>>>0?1:0),b=b+t,j=j+q+(b>>>0<t>>>0?1:0);s.high=j;s.low=b;}var W=l&R^~l&S,t=h&C^~h&D,s=k&z^k&A^z&A,T=g&x^g&y^x&y,p=(k>>>28|g<<4)^(k<<30|g>>>2)^(k<<25|g>>>7),u=(g>>>28|k<<4)^(g<<30|k>>>2)^(g<<25|k>>>7),c=ea[m],fa=c.high,da=c.low,c=E+((h>>>14|l<<18)^(h>>>18|l<<14)^(h<<23|l>>>9)),q=V+((l>>>14|h<<18)^(l>>>18|h<<14)^(l<<23|h>>>9))+(c>>>0<E>>>0?1:
	0),c=c+t,q=q+W+(c>>>0<t>>>0?1:0),c=c+da,q=q+fa+(c>>>0<da>>>0?1:0),c=c+b,q=q+j+(c>>>0<b>>>0?1:0),b=u+T,s=p+s+(b>>>0<u>>>0?1:0),V=S,E=D,S=R,D=C,R=l,C=h,h=B+c|0,l=U+q+(h>>>0<B>>>0?1:0)|0,U=A,B=y,A=z,y=x,z=k,x=g,g=c+b|0,k=q+s+(g>>>0<c>>>0?1:0)|0;}J=F.low=J+g;F.high=w+k+(J>>>0<g>>>0?1:0);K=e.low=K+x;e.high=X+z+(K>>>0<x>>>0?1:0);L=n.low=L+y;n.high=Y+A+(L>>>0<y>>>0?1:0);M=r.low=M+B;r.high=Z+U+(M>>>0<B>>>0?1:0);N=G.low=N+h;G.high=$+l+(N>>>0<h>>>0?1:0);O=H.low=O+C;H.high=aa+R+(O>>>0<C>>>0?1:0);P=I.low=P+D;
	I.high=ba+S+(P>>>0<D>>>0?1:0);Q=f.low=Q+E;f.high=ca+V+(Q>>>0<E>>>0?1:0);},_doFinalize:function(){var a=this._data,d=a.words,f=8*this._nDataBytes,e=8*a.sigBytes;d[e>>>5]|=128<<24-e%32;d[(e+128>>>10<<5)+30]=Math.floor(f/4294967296);d[(e+128>>>10<<5)+31]=f;a.sigBytes=4*d.length;this._process();return this._hash.toX32()},clone:function(){var a=r.clone.call(this);a._hash=this._hash.clone();return a},blockSize:32});n.SHA512=r._createHelper(e);n.HmacSHA512=r._createHmacHelper(e);})();

	/*
	CryptoJS v3.1.2 sha384-min.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(){var c=CryptoJS,a=c.x64,b=a.Word,e=a.WordArray,a=c.algo,d=a.SHA512,a=a.SHA384=d.extend({_doReset:function(){this._hash=new e.init([new b.init(3418070365,3238371032),new b.init(1654270250,914150663),new b.init(2438529370,812702999),new b.init(355462360,4144912697),new b.init(1731405415,4290775857),new b.init(2394180231,1750603025),new b.init(3675008525,1694076839),new b.init(1203062813,3204075428)]);},_doFinalize:function(){var a=d._doFinalize.call(this);a.sigBytes-=16;return a}});c.SHA384=
	d._createHelper(a);c.HmacSHA384=d._createHmacHelper(a);})();

	/*
	CryptoJS v3.1.2 ripemd160-min.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/*

	(c) 2012 by Cedric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	(function(){var q=CryptoJS,d=q.lib,n=d.WordArray,p=d.Hasher,d=q.algo,x=n.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),y=n.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),z=n.create([11,14,15,12,
	5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),A=n.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),B=n.create([0,1518500249,1859775393,2400959708,2840853838]),C=n.create([1352829926,1548603684,1836072691,
	2053994217,0]),d=d.RIPEMD160=p.extend({_doReset:function(){this._hash=n.create([1732584193,4023233417,2562383102,271733878,3285377520]);},_doProcessBlock:function(e,v){for(var b=0;16>b;b++){var c=v+b,f=e[c];e[c]=(f<<8|f>>>24)&16711935|(f<<24|f>>>8)&4278255360;}var c=this._hash.words,f=B.words,d=C.words,n=x.words,q=y.words,p=z.words,w=A.words,t,g,h,j,r,u,k,l,m,s;u=t=c[0];k=g=c[1];l=h=c[2];m=j=c[3];s=r=c[4];for(var a,b=0;80>b;b+=1)a=t+e[v+n[b]]|0,a=16>b?a+((g^h^j)+f[0]):32>b?a+((g&h|~g&j)+f[1]):48>b?
	a+(((g|~h)^j)+f[2]):64>b?a+((g&j|h&~j)+f[3]):a+((g^(h|~j))+f[4]),a|=0,a=a<<p[b]|a>>>32-p[b],a=a+r|0,t=r,r=j,j=h<<10|h>>>22,h=g,g=a,a=u+e[v+q[b]]|0,a=16>b?a+((k^(l|~m))+d[0]):32>b?a+((k&m|l&~m)+d[1]):48>b?a+(((k|~l)^m)+d[2]):64>b?a+((k&l|~k&m)+d[3]):a+((k^l^m)+d[4]),a|=0,a=a<<w[b]|a>>>32-w[b],a=a+s|0,u=s,s=m,m=l<<10|l>>>22,l=k,k=a;a=c[1]+h+m|0;c[1]=c[2]+j+s|0;c[2]=c[3]+r+u|0;c[3]=c[4]+t+k|0;c[4]=c[0]+g+l|0;c[0]=a;},_doFinalize:function(){var e=this._data,d=e.words,b=8*this._nDataBytes,c=8*e.sigBytes;
	d[c>>>5]|=128<<24-c%32;d[(c+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;e.sigBytes=4*(d.length+1);this._process();e=this._hash;d=e.words;for(b=0;5>b;b++)c=d[b],d[b]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return e},clone:function(){var d=p.clone.call(this);d._hash=this._hash.clone();return d}});q.RIPEMD160=p._createHelper(d);q.HmacRIPEMD160=p._createHmacHelper(d);})();

	/*
	CryptoJS v3.1.2 hmac.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(){var c=CryptoJS,k=c.enc.Utf8;c.algo.HMAC=c.lib.Base.extend({init:function(a,b){a=this._hasher=new a.init;"string"==typeof b&&(b=k.parse(b));var c=a.blockSize,e=4*c;b.sigBytes>e&&(b=a.finalize(b));b.clamp();for(var f=this._oKey=b.clone(),g=this._iKey=b.clone(),h=f.words,j=g.words,d=0;d<c;d++)h[d]^=1549556828,j[d]^=909522486;f.sigBytes=g.sigBytes=e;this.reset();},reset:function(){var a=this._hasher;a.reset();a.update(this._iKey);},update:function(a){this._hasher.update(a);return this},finalize:function(a){var b=
	this._hasher;a=b.finalize(a);b.reset();return b.finalize(this._oKey.clone().concat(a))}});})();

	/*
	CryptoJS v3.1.2 pbkdf2-min.js
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	(function(){var b=CryptoJS,a=b.lib,d=a.Base,m=a.WordArray,a=b.algo,q=a.HMAC,l=a.PBKDF2=d.extend({cfg:d.extend({keySize:4,hasher:a.SHA1,iterations:1}),init:function(a){this.cfg=this.cfg.extend(a);},compute:function(a,b){for(var c=this.cfg,f=q.create(c.hasher,a),g=m.create(),d=m.create([1]),l=g.words,r=d.words,n=c.keySize,c=c.iterations;l.length<n;){var h=f.update(b).finalize(d);f.reset();for(var j=h.words,s=j.length,k=h,p=1;p<c;p++){k=f.finalize(k);f.reset();for(var t=k.words,e=0;e<s;e++)j[e]^=t[e];}g.concat(h);
	r[0]++;}g.sigBytes=4*n;return g}});b.PBKDF2=function(a,b,c){return l.create(c).compute(a,b)};})();

	/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
	 */
	var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64pad="=";function hex2b64(d){var b;var e;var a="";for(b=0;b+3<=d.length;b+=3){e=parseInt(d.substring(b,b+3),16);a+=b64map.charAt(e>>6)+b64map.charAt(e&63);}if(b+1==d.length){e=parseInt(d.substring(b,b+1),16);a+=b64map.charAt(e<<2);}else {if(b+2==d.length){e=parseInt(d.substring(b,b+2),16);a+=b64map.charAt(e>>2)+b64map.charAt((e&3)<<4);}}{while((a.length&3)>0){a+=b64pad;}}return a}function b64tohex(f){var d="";var e;var b=0;var c;var a;for(e=0;e<f.length;++e){if(f.charAt(e)==b64pad){break}a=b64map.indexOf(f.charAt(e));if(a<0){continue}if(b==0){d+=int2char$1(a>>2);c=a&3;b=1;}else {if(b==1){d+=int2char$1((c<<2)|(a>>4));c=a&15;b=2;}else {if(b==2){d+=int2char$1(c);d+=int2char$1(a>>2);c=a&3;b=3;}else {d+=int2char$1((c<<2)|(a>>4));d+=int2char$1(a&15);b=0;}}}}if(b==1){d+=int2char$1(c<<2);}return d}function b64toBA(e){var d=b64tohex(e);var c;var b=new Array();for(c=0;2*c<d.length;++c){b[c]=parseInt(d.substring(2*c,2*c+2),16);}return b}/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
	 */
	var dbits$1;function BigInteger$5(e,d,f){if(e!=null){if("number"==typeof e){this.fromNumber(e,d,f);}else {if(d==null&&"string"!=typeof e){this.fromString(e,256);}else {this.fromString(e,d);}}}}function nbi$1(){return new BigInteger$5(null)}function am1(f,a,b,e,h,g){while(--g>=0){var d=a*this[f++]+b[e]+h;h=Math.floor(d/67108864);b[e++]=d&67108863;}return h}{{BigInteger$5.prototype.am=am1;dbits$1=26;}}BigInteger$5.prototype.DB=dbits$1;BigInteger$5.prototype.DM=((1<<dbits$1)-1);BigInteger$5.prototype.DV=(1<<dbits$1);var BI_FP$1=52;BigInteger$5.prototype.FV=Math.pow(2,BI_FP$1);BigInteger$5.prototype.F1=BI_FP$1-dbits$1;BigInteger$5.prototype.F2=2*dbits$1-BI_FP$1;var BI_RM$1="0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC$1=new Array();var rr$1,vv$1;rr$1="0".charCodeAt(0);for(vv$1=0;vv$1<=9;++vv$1){BI_RC$1[rr$1++]=vv$1;}rr$1="a".charCodeAt(0);for(vv$1=10;vv$1<36;++vv$1){BI_RC$1[rr$1++]=vv$1;}rr$1="A".charCodeAt(0);for(vv$1=10;vv$1<36;++vv$1){BI_RC$1[rr$1++]=vv$1;}function int2char$1(a){return BI_RM$1.charAt(a)}function intAt$1(b,a){var d=BI_RC$1[b.charCodeAt(a)];return (d==null)?-1:d}function bnpCopyTo$1(b){for(var a=this.t-1;a>=0;--a){b[a]=this[a];}b.t=this.t;b.s=this.s;}function bnpFromInt$1(a){this.t=1;this.s=(a<0)?-1:0;if(a>0){this[0]=a;}else {if(a<-1){this[0]=a+this.DV;}else {this.t=0;}}}function nbv$1(a){var b=nbi$1();b.fromInt(a);return b}function bnpFromString$1(h,c){var e;if(c==16){e=4;}else {if(c==8){e=3;}else {if(c==256){e=8;}else {if(c==2){e=1;}else {if(c==32){e=5;}else {if(c==4){e=2;}else {this.fromRadix(h,c);return}}}}}}this.t=0;this.s=0;var g=h.length,d=false,f=0;while(--g>=0){var a=(e==8)?h[g]&255:intAt$1(h,g);if(a<0){if(h.charAt(g)=="-"){d=true;}continue}d=false;if(f==0){this[this.t++]=a;}else {if(f+e>this.DB){this[this.t-1]|=(a&((1<<(this.DB-f))-1))<<f;this[this.t++]=(a>>(this.DB-f));}else {this[this.t-1]|=a<<f;}}f+=e;if(f>=this.DB){f-=this.DB;}}if(e==8&&(h[0]&128)!=0){this.s=-1;if(f>0){this[this.t-1]|=((1<<(this.DB-f))-1)<<f;}}this.clamp();if(d){BigInteger$5.ZERO.subTo(this,this);}}function bnpClamp$1(){var a=this.s&this.DM;while(this.t>0&&this[this.t-1]==a){--this.t;}}function bnToString$1(c){if(this.s<0){return "-"+this.negate().toString(c)}var e;if(c==16){e=4;}else {if(c==8){e=3;}else {if(c==2){e=1;}else {if(c==32){e=5;}else {if(c==4){e=2;}else {return this.toRadix(c)}}}}}var g=(1<<e)-1,l,a=false,h="",f=this.t;var j=this.DB-(f*this.DB)%e;if(f-->0){if(j<this.DB&&(l=this[f]>>j)>0){a=true;h=int2char$1(l);}while(f>=0){if(j<e){l=(this[f]&((1<<j)-1))<<(e-j);l|=this[--f]>>(j+=this.DB-e);}else {l=(this[f]>>(j-=e))&g;if(j<=0){j+=this.DB;--f;}}if(l>0){a=true;}if(a){h+=int2char$1(l);}}}return a?h:"0"}function bnNegate$1(){var a=nbi$1();BigInteger$5.ZERO.subTo(this,a);return a}function bnAbs$1(){return (this.s<0)?this.negate():this}function bnCompareTo$1(b){var d=this.s-b.s;if(d!=0){return d}var c=this.t;d=c-b.t;if(d!=0){return (this.s<0)?-d:d}while(--c>=0){if((d=this[c]-b[c])!=0){return d}}return 0}function nbits$1(a){var c=1,b;if((b=a>>>16)!=0){a=b;c+=16;}if((b=a>>8)!=0){a=b;c+=8;}if((b=a>>4)!=0){a=b;c+=4;}if((b=a>>2)!=0){a=b;c+=2;}if((b=a>>1)!=0){a=b;c+=1;}return c}function bnBitLength$1(){if(this.t<=0){return 0}return this.DB*(this.t-1)+nbits$1(this[this.t-1]^(this.s&this.DM))}function bnpDLShiftTo$1(c,b){var a;for(a=this.t-1;a>=0;--a){b[a+c]=this[a];}for(a=c-1;a>=0;--a){b[a]=0;}b.t=this.t+c;b.s=this.s;}function bnpDRShiftTo$1(c,b){for(var a=c;a<this.t;++a){b[a-c]=this[a];}b.t=Math.max(this.t-c,0);b.s=this.s;}function bnpLShiftTo$1(j,e){var b=j%this.DB;var a=this.DB-b;var g=(1<<a)-1;var f=Math.floor(j/this.DB),h=(this.s<<b)&this.DM,d;for(d=this.t-1;d>=0;--d){e[d+f+1]=(this[d]>>a)|h;h=(this[d]&g)<<b;}for(d=f-1;d>=0;--d){e[d]=0;}e[f]=h;e.t=this.t+f+1;e.s=this.s;e.clamp();}function bnpRShiftTo$1(g,d){d.s=this.s;var e=Math.floor(g/this.DB);if(e>=this.t){d.t=0;return}var b=g%this.DB;var a=this.DB-b;var f=(1<<b)-1;d[0]=this[e]>>b;for(var c=e+1;c<this.t;++c){d[c-e-1]|=(this[c]&f)<<a;d[c-e]=this[c]>>b;}if(b>0){d[this.t-e-1]|=(this.s&f)<<a;}d.t=this.t-e;d.clamp();}function bnpSubTo$1(d,f){var e=0,g=0,b=Math.min(d.t,this.t);while(e<b){g+=this[e]-d[e];f[e++]=g&this.DM;g>>=this.DB;}if(d.t<this.t){g-=d.s;while(e<this.t){g+=this[e];f[e++]=g&this.DM;g>>=this.DB;}g+=this.s;}else {g+=this.s;while(e<d.t){g-=d[e];f[e++]=g&this.DM;g>>=this.DB;}g-=d.s;}f.s=(g<0)?-1:0;if(g<-1){f[e++]=this.DV+g;}else {if(g>0){f[e++]=g;}}f.t=e;f.clamp();}function bnpMultiplyTo$1(c,e){var b=this.abs(),f=c.abs();var d=b.t;e.t=d+f.t;while(--d>=0){e[d]=0;}for(d=0;d<f.t;++d){e[d+b.t]=b.am(0,f[d],e,d,0,b.t);}e.s=0;e.clamp();if(this.s!=c.s){BigInteger$5.ZERO.subTo(e,e);}}function bnpSquareTo$1(d){var a=this.abs();var b=d.t=2*a.t;while(--b>=0){d[b]=0;}for(b=0;b<a.t-1;++b){var e=a.am(b,a[b],d,2*b,0,1);if((d[b+a.t]+=a.am(b+1,2*a[b],d,2*b+1,e,a.t-b-1))>=a.DV){d[b+a.t]-=a.DV;d[b+a.t+1]=1;}}if(d.t>0){d[d.t-1]+=a.am(b,a[b],d,2*b,0,1);}d.s=0;d.clamp();}function bnpDivRemTo$1(n,h,g){var w=n.abs();if(w.t<=0){return}var k=this.abs();if(k.t<w.t){if(h!=null){h.fromInt(0);}if(g!=null){this.copyTo(g);}return}if(g==null){g=nbi$1();}var d=nbi$1(),a=this.s,l=n.s;var v=this.DB-nbits$1(w[w.t-1]);if(v>0){w.lShiftTo(v,d);k.lShiftTo(v,g);}else {w.copyTo(d);k.copyTo(g);}var p=d.t;var b=d[p-1];if(b==0){return}var o=b*(1<<this.F1)+((p>1)?d[p-2]>>this.F2:0);var A=this.FV/o,z=(1<<this.F1)/o,x=1<<this.F2;var u=g.t,s=u-p,f=(h==null)?nbi$1():h;d.dlShiftTo(s,f);if(g.compareTo(f)>=0){g[g.t++]=1;g.subTo(f,g);}BigInteger$5.ONE.dlShiftTo(p,f);f.subTo(d,d);while(d.t<p){d[d.t++]=0;}while(--s>=0){var c=(g[--u]==b)?this.DM:Math.floor(g[u]*A+(g[u-1]+x)*z);if((g[u]+=d.am(0,c,g,s,0,p))<c){d.dlShiftTo(s,f);g.subTo(f,g);while(g[u]<--c){g.subTo(f,g);}}}if(h!=null){g.drShiftTo(p,h);if(a!=l){BigInteger$5.ZERO.subTo(h,h);}}g.t=p;g.clamp();if(v>0){g.rShiftTo(v,g);}if(a<0){BigInteger$5.ZERO.subTo(g,g);}}function bnMod$1(b){var c=nbi$1();this.abs().divRemTo(b,null,c);if(this.s<0&&c.compareTo(BigInteger$5.ZERO)>0){b.subTo(c,c);}return c}function Classic$1(a){this.m=a;}function cConvert$1(a){if(a.s<0||a.compareTo(this.m)>=0){return a.mod(this.m)}else {return a}}function cRevert$1(a){return a}function cReduce$1(a){a.divRemTo(this.m,null,a);}function cMulTo$1(a,c,b){a.multiplyTo(c,b);this.reduce(b);}function cSqrTo$1(a,b){a.squareTo(b);this.reduce(b);}Classic$1.prototype.convert=cConvert$1;Classic$1.prototype.revert=cRevert$1;Classic$1.prototype.reduce=cReduce$1;Classic$1.prototype.mulTo=cMulTo$1;Classic$1.prototype.sqrTo=cSqrTo$1;function bnpInvDigit$1(){if(this.t<1){return 0}var a=this[0];if((a&1)==0){return 0}var b=a&3;b=(b*(2-(a&15)*b))&15;b=(b*(2-(a&255)*b))&255;b=(b*(2-(((a&65535)*b)&65535)))&65535;b=(b*(2-a*b%this.DV))%this.DV;return (b>0)?this.DV-b:-b}function Montgomery$1(a){this.m=a;this.mp=a.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<(a.DB-15))-1;this.mt2=2*a.t;}function montConvert$1(a){var b=nbi$1();a.abs().dlShiftTo(this.m.t,b);b.divRemTo(this.m,null,b);if(a.s<0&&b.compareTo(BigInteger$5.ZERO)>0){this.m.subTo(b,b);}return b}function montRevert$1(a){var b=nbi$1();a.copyTo(b);this.reduce(b);return b}function montReduce$1(a){while(a.t<=this.mt2){a[a.t++]=0;}for(var c=0;c<this.m.t;++c){var b=a[c]&32767;var d=(b*this.mpl+(((b*this.mph+(a[c]>>15)*this.mpl)&this.um)<<15))&a.DM;b=c+this.m.t;a[b]+=this.m.am(0,d,a,c,0,this.m.t);while(a[b]>=a.DV){a[b]-=a.DV;a[++b]++;}}a.clamp();a.drShiftTo(this.m.t,a);if(a.compareTo(this.m)>=0){a.subTo(this.m,a);}}function montSqrTo$1(a,b){a.squareTo(b);this.reduce(b);}function montMulTo$1(a,c,b){a.multiplyTo(c,b);this.reduce(b);}Montgomery$1.prototype.convert=montConvert$1;Montgomery$1.prototype.revert=montRevert$1;Montgomery$1.prototype.reduce=montReduce$1;Montgomery$1.prototype.mulTo=montMulTo$1;Montgomery$1.prototype.sqrTo=montSqrTo$1;function bnpIsEven$1(){return ((this.t>0)?(this[0]&1):this.s)==0}function bnpExp$1(h,j){if(h>4294967295||h<1){return BigInteger$5.ONE}var f=nbi$1(),a=nbi$1(),d=j.convert(this),c=nbits$1(h)-1;d.copyTo(f);while(--c>=0){j.sqrTo(f,a);if((h&(1<<c))>0){j.mulTo(a,d,f);}else {var b=f;f=a;a=b;}}return j.revert(f)}function bnModPowInt$1(b,a){var c;if(b<256||a.isEven()){c=new Classic$1(a);}else {c=new Montgomery$1(a);}return this.exp(b,c)}BigInteger$5.prototype.copyTo=bnpCopyTo$1;BigInteger$5.prototype.fromInt=bnpFromInt$1;BigInteger$5.prototype.fromString=bnpFromString$1;BigInteger$5.prototype.clamp=bnpClamp$1;BigInteger$5.prototype.dlShiftTo=bnpDLShiftTo$1;BigInteger$5.prototype.drShiftTo=bnpDRShiftTo$1;BigInteger$5.prototype.lShiftTo=bnpLShiftTo$1;BigInteger$5.prototype.rShiftTo=bnpRShiftTo$1;BigInteger$5.prototype.subTo=bnpSubTo$1;BigInteger$5.prototype.multiplyTo=bnpMultiplyTo$1;BigInteger$5.prototype.squareTo=bnpSquareTo$1;BigInteger$5.prototype.divRemTo=bnpDivRemTo$1;BigInteger$5.prototype.invDigit=bnpInvDigit$1;BigInteger$5.prototype.isEven=bnpIsEven$1;BigInteger$5.prototype.exp=bnpExp$1;BigInteger$5.prototype.toString=bnToString$1;BigInteger$5.prototype.negate=bnNegate$1;BigInteger$5.prototype.abs=bnAbs$1;BigInteger$5.prototype.compareTo=bnCompareTo$1;BigInteger$5.prototype.bitLength=bnBitLength$1;BigInteger$5.prototype.mod=bnMod$1;BigInteger$5.prototype.modPowInt=bnModPowInt$1;BigInteger$5.ZERO=nbv$1(0);BigInteger$5.ONE=nbv$1(1);
	/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
	 */
	function bnClone$1(){var a=nbi$1();this.copyTo(a);return a}function bnIntValue$1(){if(this.s<0){if(this.t==1){return this[0]-this.DV}else {if(this.t==0){return -1}}}else {if(this.t==1){return this[0]}else {if(this.t==0){return 0}}}return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0]}function bnByteValue$1(){return (this.t==0)?this.s:(this[0]<<24)>>24}function bnShortValue$1(){return (this.t==0)?this.s:(this[0]<<16)>>16}function bnpChunkSize$1(a){return Math.floor(Math.LN2*this.DB/Math.log(a))}function bnSigNum$1(){if(this.s<0){return -1}else {if(this.t<=0||(this.t==1&&this[0]<=0)){return 0}else {return 1}}}function bnpToRadix$1(c){if(c==null){c=10;}if(this.signum()==0||c<2||c>36){return "0"}var f=this.chunkSize(c);var e=Math.pow(c,f);var i=nbv$1(e),j=nbi$1(),h=nbi$1(),g="";this.divRemTo(i,j,h);while(j.signum()>0){g=(e+h.intValue()).toString(c).substr(1)+g;j.divRemTo(i,j,h);}return h.intValue().toString(c)+g}function bnpFromRadix$1(m,h){this.fromInt(0);if(h==null){h=10;}var f=this.chunkSize(h);var g=Math.pow(h,f),e=false,a=0,l=0;for(var c=0;c<m.length;++c){var k=intAt$1(m,c);if(k<0){if(m.charAt(c)=="-"&&this.signum()==0){e=true;}continue}l=h*l+k;if(++a>=f){this.dMultiply(g);this.dAddOffset(l,0);a=0;l=0;}}if(a>0){this.dMultiply(Math.pow(h,a));this.dAddOffset(l,0);}if(e){BigInteger$5.ZERO.subTo(this,this);}}function bnpFromNumber$1(f,e,h){if("number"==typeof e){if(f<2){this.fromInt(1);}else {this.fromNumber(f,h);if(!this.testBit(f-1)){this.bitwiseTo(BigInteger$5.ONE.shiftLeft(f-1),op_or$1,this);}if(this.isEven()){this.dAddOffset(1,0);}while(!this.isProbablePrime(e)){this.dAddOffset(2,0);if(this.bitLength()>f){this.subTo(BigInteger$5.ONE.shiftLeft(f-1),this);}}}}else {var d=new Array(),g=f&7;d.length=(f>>3)+1;e.nextBytes(d);if(g>0){d[0]&=((1<<g)-1);}else {d[0]=0;}this.fromString(d,256);}}function bnToByteArray$1(){var b=this.t,c=new Array();c[0]=this.s;var e=this.DB-(b*this.DB)%8,f,a=0;if(b-->0){if(e<this.DB&&(f=this[b]>>e)!=(this.s&this.DM)>>e){c[a++]=f|(this.s<<(this.DB-e));}while(b>=0){if(e<8){f=(this[b]&((1<<e)-1))<<(8-e);f|=this[--b]>>(e+=this.DB-8);}else {f=(this[b]>>(e-=8))&255;if(e<=0){e+=this.DB;--b;}}if((f&128)!=0){f|=-256;}if(a==0&&(this.s&128)!=(f&128)){++a;}if(a>0||f!=this.s){c[a++]=f;}}}return c}function bnEquals$1(b){return(this.compareTo(b)==0)}function bnMin$1(b){return (this.compareTo(b)<0)?this:b}function bnMax$1(b){return (this.compareTo(b)>0)?this:b}function bnpBitwiseTo$1(c,h,e){var d,g,b=Math.min(c.t,this.t);for(d=0;d<b;++d){e[d]=h(this[d],c[d]);}if(c.t<this.t){g=c.s&this.DM;for(d=b;d<this.t;++d){e[d]=h(this[d],g);}e.t=this.t;}else {g=this.s&this.DM;for(d=b;d<c.t;++d){e[d]=h(g,c[d]);}e.t=c.t;}e.s=h(this.s,c.s);e.clamp();}function op_and$1(a,b){return a&b}function bnAnd$1(b){var c=nbi$1();this.bitwiseTo(b,op_and$1,c);return c}function op_or$1(a,b){return a|b}function bnOr$1(b){var c=nbi$1();this.bitwiseTo(b,op_or$1,c);return c}function op_xor$1(a,b){return a^b}function bnXor$1(b){var c=nbi$1();this.bitwiseTo(b,op_xor$1,c);return c}function op_andnot$1(a,b){return a&~b}function bnAndNot$1(b){var c=nbi$1();this.bitwiseTo(b,op_andnot$1,c);return c}function bnNot$1(){var b=nbi$1();for(var a=0;a<this.t;++a){b[a]=this.DM&~this[a];}b.t=this.t;b.s=~this.s;return b}function bnShiftLeft$1(b){var a=nbi$1();if(b<0){this.rShiftTo(-b,a);}else {this.lShiftTo(b,a);}return a}function bnShiftRight$1(b){var a=nbi$1();if(b<0){this.lShiftTo(-b,a);}else {this.rShiftTo(b,a);}return a}function lbit$1(a){if(a==0){return -1}var b=0;if((a&65535)==0){a>>=16;b+=16;}if((a&255)==0){a>>=8;b+=8;}if((a&15)==0){a>>=4;b+=4;}if((a&3)==0){a>>=2;b+=2;}if((a&1)==0){++b;}return b}function bnGetLowestSetBit$1(){for(var a=0;a<this.t;++a){if(this[a]!=0){return a*this.DB+lbit$1(this[a])}}if(this.s<0){return this.t*this.DB}return -1}function cbit$1(a){var b=0;while(a!=0){a&=a-1;++b;}return b}function bnBitCount$1(){var c=0,a=this.s&this.DM;for(var b=0;b<this.t;++b){c+=cbit$1(this[b]^a);}return c}function bnTestBit$1(b){var a=Math.floor(b/this.DB);if(a>=this.t){return(this.s!=0)}return((this[a]&(1<<(b%this.DB)))!=0)}function bnpChangeBit$1(c,b){var a=BigInteger$5.ONE.shiftLeft(c);this.bitwiseTo(a,b,a);return a}function bnSetBit$1(a){return this.changeBit(a,op_or$1)}function bnClearBit$1(a){return this.changeBit(a,op_andnot$1)}function bnFlipBit$1(a){return this.changeBit(a,op_xor$1)}function bnpAddTo$1(d,f){var e=0,g=0,b=Math.min(d.t,this.t);while(e<b){g+=this[e]+d[e];f[e++]=g&this.DM;g>>=this.DB;}if(d.t<this.t){g+=d.s;while(e<this.t){g+=this[e];f[e++]=g&this.DM;g>>=this.DB;}g+=this.s;}else {g+=this.s;while(e<d.t){g+=d[e];f[e++]=g&this.DM;g>>=this.DB;}g+=d.s;}f.s=(g<0)?-1:0;if(g>0){f[e++]=g;}else {if(g<-1){f[e++]=this.DV+g;}}f.t=e;f.clamp();}function bnAdd$1(b){var c=nbi$1();this.addTo(b,c);return c}function bnSubtract$1(b){var c=nbi$1();this.subTo(b,c);return c}function bnMultiply$1(b){var c=nbi$1();this.multiplyTo(b,c);return c}function bnSquare$1(){var a=nbi$1();this.squareTo(a);return a}function bnDivide$1(b){var c=nbi$1();this.divRemTo(b,c,null);return c}function bnRemainder$1(b){var c=nbi$1();this.divRemTo(b,null,c);return c}function bnDivideAndRemainder$1(b){var d=nbi$1(),c=nbi$1();this.divRemTo(b,d,c);return new Array(d,c)}function bnpDMultiply$1(a){this[this.t]=this.am(0,a-1,this,0,0,this.t);++this.t;this.clamp();}function bnpDAddOffset$1(b,a){if(b==0){return}while(this.t<=a){this[this.t++]=0;}this[a]+=b;while(this[a]>=this.DV){this[a]-=this.DV;if(++a>=this.t){this[this.t++]=0;}++this[a];}}function NullExp$1(){}function nNop$1(a){return a}function nMulTo$1(a,c,b){a.multiplyTo(c,b);}function nSqrTo$1(a,b){a.squareTo(b);}NullExp$1.prototype.convert=nNop$1;NullExp$1.prototype.revert=nNop$1;NullExp$1.prototype.mulTo=nMulTo$1;NullExp$1.prototype.sqrTo=nSqrTo$1;function bnPow$1(a){return this.exp(a,new NullExp$1())}function bnpMultiplyLowerTo$1(b,f,e){var d=Math.min(this.t+b.t,f);e.s=0;e.t=d;while(d>0){e[--d]=0;}var c;for(c=e.t-this.t;d<c;++d){e[d+this.t]=this.am(0,b[d],e,d,0,this.t);}for(c=Math.min(b.t,f);d<c;++d){this.am(0,b[d],e,d,0,f-d);}e.clamp();}function bnpMultiplyUpperTo$1(b,e,d){--e;var c=d.t=this.t+b.t-e;d.s=0;while(--c>=0){d[c]=0;}for(c=Math.max(e-this.t,0);c<b.t;++c){d[this.t+c-e]=this.am(e-c,b[c],d,0,0,this.t+c-e);}d.clamp();d.drShiftTo(1,d);}function Barrett$1(a){this.r2=nbi$1();this.q3=nbi$1();BigInteger$5.ONE.dlShiftTo(2*a.t,this.r2);this.mu=this.r2.divide(a);this.m=a;}function barrettConvert$1(a){if(a.s<0||a.t>2*this.m.t){return a.mod(this.m)}else {if(a.compareTo(this.m)<0){return a}else {var b=nbi$1();a.copyTo(b);this.reduce(b);return b}}}function barrettRevert$1(a){return a}function barrettReduce$1(a){a.drShiftTo(this.m.t-1,this.r2);if(a.t>this.m.t+1){a.t=this.m.t+1;a.clamp();}this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);while(a.compareTo(this.r2)<0){a.dAddOffset(1,this.m.t+1);}a.subTo(this.r2,a);while(a.compareTo(this.m)>=0){a.subTo(this.m,a);}}function barrettSqrTo$1(a,b){a.squareTo(b);this.reduce(b);}function barrettMulTo$1(a,c,b){a.multiplyTo(c,b);this.reduce(b);}Barrett$1.prototype.convert=barrettConvert$1;Barrett$1.prototype.revert=barrettRevert$1;Barrett$1.prototype.reduce=barrettReduce$1;Barrett$1.prototype.mulTo=barrettMulTo$1;Barrett$1.prototype.sqrTo=barrettSqrTo$1;function bnModPow$1(q,f){var o=q.bitLength(),h,b=nbv$1(1),v;if(o<=0){return b}else {if(o<18){h=1;}else {if(o<48){h=3;}else {if(o<144){h=4;}else {if(o<768){h=5;}else {h=6;}}}}}if(o<8){v=new Classic$1(f);}else {if(f.isEven()){v=new Barrett$1(f);}else {v=new Montgomery$1(f);}}var p=new Array(),d=3,s=h-1,a=(1<<h)-1;p[1]=v.convert(this);if(h>1){var A=nbi$1();v.sqrTo(p[1],A);while(d<=a){p[d]=nbi$1();v.mulTo(A,p[d-2],p[d]);d+=2;}}var l=q.t-1,x,u=true,c=nbi$1(),y;o=nbits$1(q[l])-1;while(l>=0){if(o>=s){x=(q[l]>>(o-s))&a;}else {x=(q[l]&((1<<(o+1))-1))<<(s-o);if(l>0){x|=q[l-1]>>(this.DB+o-s);}}d=h;while((x&1)==0){x>>=1;--d;}if((o-=d)<0){o+=this.DB;--l;}if(u){p[x].copyTo(b);u=false;}else {while(d>1){v.sqrTo(b,c);v.sqrTo(c,b);d-=2;}if(d>0){v.sqrTo(b,c);}else {y=b;b=c;c=y;}v.mulTo(c,p[x],b);}while(l>=0&&(q[l]&(1<<o))==0){v.sqrTo(b,c);y=b;b=c;c=y;if(--o<0){o=this.DB-1;--l;}}}return v.revert(b)}function bnGCD$1(c){var b=(this.s<0)?this.negate():this.clone();var h=(c.s<0)?c.negate():c.clone();if(b.compareTo(h)<0){var e=b;b=h;h=e;}var d=b.getLowestSetBit(),f=h.getLowestSetBit();if(f<0){return b}if(d<f){f=d;}if(f>0){b.rShiftTo(f,b);h.rShiftTo(f,h);}while(b.signum()>0){if((d=b.getLowestSetBit())>0){b.rShiftTo(d,b);}if((d=h.getLowestSetBit())>0){h.rShiftTo(d,h);}if(b.compareTo(h)>=0){b.subTo(h,b);b.rShiftTo(1,b);}else {h.subTo(b,h);h.rShiftTo(1,h);}}if(f>0){h.lShiftTo(f,h);}return h}function bnpModInt$1(e){if(e<=0){return 0}var c=this.DV%e,b=(this.s<0)?e-1:0;if(this.t>0){if(c==0){b=this[0]%e;}else {for(var a=this.t-1;a>=0;--a){b=(c*b+this[a])%e;}}}return b}function bnModInverse$1(f){var j=f.isEven();if((this.isEven()&&j)||f.signum()==0){return BigInteger$5.ZERO}var i=f.clone(),h=this.clone();var g=nbv$1(1),e=nbv$1(0),l=nbv$1(0),k=nbv$1(1);while(i.signum()!=0){while(i.isEven()){i.rShiftTo(1,i);if(j){if(!g.isEven()||!e.isEven()){g.addTo(this,g);e.subTo(f,e);}g.rShiftTo(1,g);}else {if(!e.isEven()){e.subTo(f,e);}}e.rShiftTo(1,e);}while(h.isEven()){h.rShiftTo(1,h);if(j){if(!l.isEven()||!k.isEven()){l.addTo(this,l);k.subTo(f,k);}l.rShiftTo(1,l);}else {if(!k.isEven()){k.subTo(f,k);}}k.rShiftTo(1,k);}if(i.compareTo(h)>=0){i.subTo(h,i);if(j){g.subTo(l,g);}e.subTo(k,e);}else {h.subTo(i,h);if(j){l.subTo(g,l);}k.subTo(e,k);}}if(h.compareTo(BigInteger$5.ONE)!=0){return BigInteger$5.ZERO}if(k.compareTo(f)>=0){return k.subtract(f)}if(k.signum()<0){k.addTo(f,k);}else {return k}if(k.signum()<0){return k.add(f)}else {return k}}var lowprimes$1=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];var lplim$1=(1<<26)/lowprimes$1[lowprimes$1.length-1];function bnIsProbablePrime$1(e){var d,b=this.abs();if(b.t==1&&b[0]<=lowprimes$1[lowprimes$1.length-1]){for(d=0;d<lowprimes$1.length;++d){if(b[0]==lowprimes$1[d]){return true}}return false}if(b.isEven()){return false}d=1;while(d<lowprimes$1.length){var a=lowprimes$1[d],c=d+1;while(c<lowprimes$1.length&&a<lplim$1){a*=lowprimes$1[c++];}a=b.modInt(a);while(d<c){if(a%lowprimes$1[d++]==0){return false}}}return b.millerRabin(e)}function bnpMillerRabin$1(f){var g=this.subtract(BigInteger$5.ONE);var c=g.getLowestSetBit();if(c<=0){return false}var h=g.shiftRight(c);f=(f+1)>>1;if(f>lowprimes$1.length){f=lowprimes$1.length;}var b=nbi$1();for(var e=0;e<f;++e){b.fromInt(lowprimes$1[Math.floor(Math.random()*lowprimes$1.length)]);var l=b.modPow(h,this);if(l.compareTo(BigInteger$5.ONE)!=0&&l.compareTo(g)!=0){var d=1;while(d++<c&&l.compareTo(g)!=0){l=l.modPowInt(2,this);if(l.compareTo(BigInteger$5.ONE)==0){return false}}if(l.compareTo(g)!=0){return false}}}return true}BigInteger$5.prototype.chunkSize=bnpChunkSize$1;BigInteger$5.prototype.toRadix=bnpToRadix$1;BigInteger$5.prototype.fromRadix=bnpFromRadix$1;BigInteger$5.prototype.fromNumber=bnpFromNumber$1;BigInteger$5.prototype.bitwiseTo=bnpBitwiseTo$1;BigInteger$5.prototype.changeBit=bnpChangeBit$1;BigInteger$5.prototype.addTo=bnpAddTo$1;BigInteger$5.prototype.dMultiply=bnpDMultiply$1;BigInteger$5.prototype.dAddOffset=bnpDAddOffset$1;BigInteger$5.prototype.multiplyLowerTo=bnpMultiplyLowerTo$1;BigInteger$5.prototype.multiplyUpperTo=bnpMultiplyUpperTo$1;BigInteger$5.prototype.modInt=bnpModInt$1;BigInteger$5.prototype.millerRabin=bnpMillerRabin$1;BigInteger$5.prototype.clone=bnClone$1;BigInteger$5.prototype.intValue=bnIntValue$1;BigInteger$5.prototype.byteValue=bnByteValue$1;BigInteger$5.prototype.shortValue=bnShortValue$1;BigInteger$5.prototype.signum=bnSigNum$1;BigInteger$5.prototype.toByteArray=bnToByteArray$1;BigInteger$5.prototype.equals=bnEquals$1;BigInteger$5.prototype.min=bnMin$1;BigInteger$5.prototype.max=bnMax$1;BigInteger$5.prototype.and=bnAnd$1;BigInteger$5.prototype.or=bnOr$1;BigInteger$5.prototype.xor=bnXor$1;BigInteger$5.prototype.andNot=bnAndNot$1;BigInteger$5.prototype.not=bnNot$1;BigInteger$5.prototype.shiftLeft=bnShiftLeft$1;BigInteger$5.prototype.shiftRight=bnShiftRight$1;BigInteger$5.prototype.getLowestSetBit=bnGetLowestSetBit$1;BigInteger$5.prototype.bitCount=bnBitCount$1;BigInteger$5.prototype.testBit=bnTestBit$1;BigInteger$5.prototype.setBit=bnSetBit$1;BigInteger$5.prototype.clearBit=bnClearBit$1;BigInteger$5.prototype.flipBit=bnFlipBit$1;BigInteger$5.prototype.add=bnAdd$1;BigInteger$5.prototype.subtract=bnSubtract$1;BigInteger$5.prototype.multiply=bnMultiply$1;BigInteger$5.prototype.divide=bnDivide$1;BigInteger$5.prototype.remainder=bnRemainder$1;BigInteger$5.prototype.divideAndRemainder=bnDivideAndRemainder$1;BigInteger$5.prototype.modPow=bnModPow$1;BigInteger$5.prototype.modInverse=bnModInverse$1;BigInteger$5.prototype.pow=bnPow$1;BigInteger$5.prototype.gcd=bnGCD$1;BigInteger$5.prototype.isProbablePrime=bnIsProbablePrime$1;BigInteger$5.prototype.square=bnSquare$1;
	/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
	 */
	function Arcfour(){this.i=0;this.j=0;this.S=new Array();}function ARC4init(d){var c,a,b;for(c=0;c<256;++c){this.S[c]=c;}a=0;for(c=0;c<256;++c){a=(a+this.S[c]+d[c%d.length])&255;b=this.S[c];this.S[c]=this.S[a];this.S[a]=b;}this.i=0;this.j=0;}function ARC4next(){var a;this.i=(this.i+1)&255;this.j=(this.j+this.S[this.i])&255;a=this.S[this.i];this.S[this.i]=this.S[this.j];this.S[this.j]=a;return this.S[(a+this.S[this.i])&255]}Arcfour.prototype.init=ARC4init;Arcfour.prototype.next=ARC4next;function prng_newstate(){return new Arcfour()}var rng_psize=256;
	/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
	 */
	var rng_state;var rng_pool;var rng_pptr;function rng_seed_int(a){rng_pool[rng_pptr++]^=a&255;rng_pool[rng_pptr++]^=(a>>8)&255;rng_pool[rng_pptr++]^=(a>>16)&255;rng_pool[rng_pptr++]^=(a>>24)&255;if(rng_pptr>=rng_psize){rng_pptr-=rng_psize;}}function rng_seed_time(){rng_seed_int(new Date().getTime());}if(rng_pool==null){rng_pool=new Array();rng_pptr=0;var t;if(window$1!==undefined&&(window$1.msCrypto!==undefined)){var crypto$5=window$1.msCrypto;if(crypto$5.getRandomValues){var ua=new Uint8Array(32);crypto$5.getRandomValues(ua);for(t=0;t<32;++t){rng_pool[rng_pptr++]=ua[t];}}}while(rng_pptr<rng_psize){t=Math.floor(65536*Math.random());rng_pool[rng_pptr++]=t>>>8;rng_pool[rng_pptr++]=t&255;}rng_pptr=0;rng_seed_time();}function rng_get_byte(){if(rng_state==null){rng_seed_time();rng_state=prng_newstate();rng_state.init(rng_pool);for(rng_pptr=0;rng_pptr<rng_pool.length;++rng_pptr){rng_pool[rng_pptr]=0;}rng_pptr=0;}return rng_state.next()}function rng_get_bytes(b){var a;for(a=0;a<b.length;++a){b[a]=rng_get_byte();}}function SecureRandom(){}SecureRandom.prototype.nextBytes=rng_get_bytes;
	/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
	 */
	function parseBigInt(b,a){return new BigInteger$5(b,a)}function pkcs1pad2(e,h){if(h<e.length+11){throw "Message too long for RSA";}var g=new Array();var d=e.length-1;while(d>=0&&h>0){var f=e.charCodeAt(d--);if(f<128){g[--h]=f;}else {if((f>127)&&(f<2048)){g[--h]=(f&63)|128;g[--h]=(f>>6)|192;}else {g[--h]=(f&63)|128;g[--h]=((f>>6)&63)|128;g[--h]=(f>>12)|224;}}}g[--h]=0;var b=new SecureRandom();var a=new Array();while(h>2){a[0]=0;while(a[0]==0){b.nextBytes(a);}g[--h]=a[0];}g[--h]=2;g[--h]=0;return new BigInteger$5(g)}function oaep_mgf1_arr(c,a,e){var b="",d=0;while(b.length<a){b+=e(String.fromCharCode.apply(String,c.concat([(d&4278190080)>>24,(d&16711680)>>16,(d&65280)>>8,d&255])));d+=1;}return b}function oaep_pad(q,a,f,l){var c=KJUR.crypto.MessageDigest;var o=KJUR.crypto.Util;var b=null;if(!f){f="sha1";}if(typeof f==="string"){b=c.getCanonicalAlgName(f);l=c.getHashLength(b);f=function(i){return hextorstr(o.hashHex(rstrtohex(i),b))};}if(q.length+2*l+2>a){throw "Message too long for RSA"}var k="",e;for(e=0;e<a-q.length-2*l-2;e+=1){k+="\x00";}var h=f("")+k+"\x01"+q;var g=new Array(l);new SecureRandom().nextBytes(g);var j=oaep_mgf1_arr(g,h.length,f);var p=[];for(e=0;e<h.length;e+=1){p[e]=h.charCodeAt(e)^j.charCodeAt(e);}var m=oaep_mgf1_arr(p,g.length,f);var d=[0];for(e=0;e<g.length;e+=1){d[e+1]=g[e]^m.charCodeAt(e);}return new BigInteger$5(d.concat(p))}function RSAKey(){this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null;}function RSASetPublic(b,a){this.isPublic=true;this.isPrivate=false;if(typeof b!=="string"){this.n=b;this.e=a;}else {if(b!=null&&a!=null&&b.length>0&&a.length>0){this.n=parseBigInt(b,16);this.e=parseInt(a,16);}else {throw "Invalid RSA public key"}}}function RSADoPublic(a){return a.modPowInt(this.e,this.n)}function RSAEncrypt(d){var a=pkcs1pad2(d,(this.n.bitLength()+7)>>3);if(a==null){return null}var e=this.doPublic(a);if(e==null){return null}var b=e.toString(16);if((b.length&1)==0){return b}else {return "0"+b}}function RSAEncryptOAEP(f,e,b){var a=oaep_pad(f,(this.n.bitLength()+7)>>3,e,b);if(a==null){return null}var g=this.doPublic(a);if(g==null){return null}var d=g.toString(16);if((d.length&1)==0){return d}else {return "0"+d}}RSAKey.prototype.doPublic=RSADoPublic;RSAKey.prototype.setPublic=RSASetPublic;RSAKey.prototype.encrypt=RSAEncrypt;RSAKey.prototype.encryptOAEP=RSAEncryptOAEP;RSAKey.prototype.type="RSA";
	/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
	 */
	function pkcs1unpad2(g,j){var a=g.toByteArray();var f=0;while(f<a.length&&a[f]==0){++f;}if(a.length-f!=j-1||a[f]!=2){return null}++f;while(a[f]!=0){if(++f>=a.length){return null}}var e="";while(++f<a.length){var h=a[f]&255;if(h<128){e+=String.fromCharCode(h);}else {if((h>191)&&(h<224)){e+=String.fromCharCode(((h&31)<<6)|(a[f+1]&63));++f;}else {e+=String.fromCharCode(((h&15)<<12)|((a[f+1]&63)<<6)|(a[f+2]&63));f+=2;}}}return e}function oaep_mgf1_str(c,a,e){var b="",d=0;while(b.length<a){b+=e(c+String.fromCharCode.apply(String,[(d&4278190080)>>24,(d&16711680)>>16,(d&65280)>>8,d&255]));d+=1;}return b}function oaep_unpad(o,b,g,p){var e=KJUR.crypto.MessageDigest;var r=KJUR.crypto.Util;var c=null;if(!g){g="sha1";}if(typeof g==="string"){c=e.getCanonicalAlgName(g);p=e.getHashLength(c);g=function(d){return hextorstr(r.hashHex(rstrtohex(d),c))};}o=o.toByteArray();var h;for(h=0;h<o.length;h+=1){o[h]&=255;}while(o.length<b){o.unshift(0);}o=String.fromCharCode.apply(String,o);if(o.length<2*p+2){throw "Cipher too short"}var f=o.substr(1,p);var s=o.substr(p+1);var q=oaep_mgf1_str(s,p,g);var k=[],h;for(h=0;h<f.length;h+=1){k[h]=f.charCodeAt(h)^q.charCodeAt(h);}var l=oaep_mgf1_str(String.fromCharCode.apply(String,k),o.length-p,g);var j=[];for(h=0;h<s.length;h+=1){j[h]=s.charCodeAt(h)^l.charCodeAt(h);}j=String.fromCharCode.apply(String,j);if(j.substr(0,p)!==g("")){throw "Hash mismatch"}j=j.substr(p);var a=j.indexOf("\x01");var m=(a!=-1)?j.substr(0,a).lastIndexOf("\x00"):-1;if(m+1!=a){throw "Malformed data"}return j.substr(a+1)}function RSASetPrivate(c,a,b){this.isPrivate=true;if(typeof c!=="string"){this.n=c;this.e=a;this.d=b;}else {if(c!=null&&a!=null&&c.length>0&&a.length>0){this.n=parseBigInt(c,16);this.e=parseInt(a,16);this.d=parseBigInt(b,16);}else {throw "Invalid RSA private key"}}}function RSASetPrivateEx(g,d,e,c,b,a,h,f){this.isPrivate=true;this.isPublic=false;if(g==null){throw "RSASetPrivateEx N == null"}if(d==null){throw "RSASetPrivateEx E == null"}if(g.length==0){throw "RSASetPrivateEx N.length == 0"}if(d.length==0){throw "RSASetPrivateEx E.length == 0"}if(g!=null&&d!=null&&g.length>0&&d.length>0){this.n=parseBigInt(g,16);this.e=parseInt(d,16);this.d=parseBigInt(e,16);this.p=parseBigInt(c,16);this.q=parseBigInt(b,16);this.dmp1=parseBigInt(a,16);this.dmq1=parseBigInt(h,16);this.coeff=parseBigInt(f,16);}else {throw "Invalid RSA private key in RSASetPrivateEx"}}function RSAGenerate(b,i){var a=new SecureRandom();var f=b>>1;this.e=parseInt(i,16);var c=new BigInteger$5(i,16);for(;;){for(;;){this.p=new BigInteger$5(b-f,1,a);if(this.p.subtract(BigInteger$5.ONE).gcd(c).compareTo(BigInteger$5.ONE)==0&&this.p.isProbablePrime(10)){break}}for(;;){this.q=new BigInteger$5(f,1,a);if(this.q.subtract(BigInteger$5.ONE).gcd(c).compareTo(BigInteger$5.ONE)==0&&this.q.isProbablePrime(10)){break}}if(this.p.compareTo(this.q)<=0){var h=this.p;this.p=this.q;this.q=h;}var g=this.p.subtract(BigInteger$5.ONE);var d=this.q.subtract(BigInteger$5.ONE);var e=g.multiply(d);if(e.gcd(c).compareTo(BigInteger$5.ONE)==0){this.n=this.p.multiply(this.q);if(this.n.bitLength()==b){this.d=c.modInverse(e);this.dmp1=this.d.mod(g);this.dmq1=this.d.mod(d);this.coeff=this.q.modInverse(this.p);break}}}this.isPrivate=true;}function RSADoPrivate(a){if(this.p==null||this.q==null){return a.modPow(this.d,this.n)}var c=a.mod(this.p).modPow(this.dmp1,this.p);var b=a.mod(this.q).modPow(this.dmq1,this.q);while(c.compareTo(b)<0){c=c.add(this.p);}return c.subtract(b).multiply(this.coeff).mod(this.p).multiply(this.q).add(b)}function RSADecrypt(b){if(b.length!=Math.ceil(this.n.bitLength()/4)){throw new Error("wrong ctext length")}var d=parseBigInt(b,16);var a=this.doPrivate(d);if(a==null){return null}return pkcs1unpad2(a,(this.n.bitLength()+7)>>3)}function RSADecryptOAEP(e,d,b){if(e.length!=Math.ceil(this.n.bitLength()/4)){throw new Error("wrong ctext length")}var f=parseBigInt(e,16);var a=this.doPrivate(f);if(a==null){return null}return oaep_unpad(a,(this.n.bitLength()+7)>>3,d,b)}RSAKey.prototype.doPrivate=RSADoPrivate;RSAKey.prototype.setPrivate=RSASetPrivate;RSAKey.prototype.setPrivateEx=RSASetPrivateEx;RSAKey.prototype.generate=RSAGenerate;RSAKey.prototype.decrypt=RSADecrypt;RSAKey.prototype.decryptOAEP=RSADecryptOAEP;
	/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
	 */
	function ECFieldElementFp(b,a){this.x=a;this.q=b;}function feFpEquals(a){if(a==this){return true}return(this.q.equals(a.q)&&this.x.equals(a.x))}function feFpToBigInteger(){return this.x}function feFpNegate(){return new ECFieldElementFp(this.q,this.x.negate().mod(this.q))}function feFpAdd(a){return new ECFieldElementFp(this.q,this.x.add(a.toBigInteger()).mod(this.q))}function feFpSubtract(a){return new ECFieldElementFp(this.q,this.x.subtract(a.toBigInteger()).mod(this.q))}function feFpMultiply(a){return new ECFieldElementFp(this.q,this.x.multiply(a.toBigInteger()).mod(this.q))}function feFpSquare(){return new ECFieldElementFp(this.q,this.x.square().mod(this.q))}function feFpDivide(a){return new ECFieldElementFp(this.q,this.x.multiply(a.toBigInteger().modInverse(this.q)).mod(this.q))}ECFieldElementFp.prototype.equals=feFpEquals;ECFieldElementFp.prototype.toBigInteger=feFpToBigInteger;ECFieldElementFp.prototype.negate=feFpNegate;ECFieldElementFp.prototype.add=feFpAdd;ECFieldElementFp.prototype.subtract=feFpSubtract;ECFieldElementFp.prototype.multiply=feFpMultiply;ECFieldElementFp.prototype.square=feFpSquare;ECFieldElementFp.prototype.divide=feFpDivide;function ECPointFp(c,a,d,b){this.curve=c;this.x=a;this.y=d;if(b==null){this.z=BigInteger$5.ONE;}else {this.z=b;}this.zinv=null;}function pointFpGetX(){if(this.zinv==null){this.zinv=this.z.modInverse(this.curve.q);}return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))}function pointFpGetY(){if(this.zinv==null){this.zinv=this.z.modInverse(this.curve.q);}return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))}function pointFpEquals(a){if(a==this){return true}if(this.isInfinity()){return a.isInfinity()}if(a.isInfinity()){return this.isInfinity()}var c,b;c=a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q);if(!c.equals(BigInteger$5.ZERO)){return false}b=a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);return b.equals(BigInteger$5.ZERO)}function pointFpIsInfinity(){if((this.x==null)&&(this.y==null)){return true}return this.z.equals(BigInteger$5.ZERO)&&!this.y.toBigInteger().equals(BigInteger$5.ZERO)}function pointFpNegate(){return new ECPointFp(this.curve,this.x,this.y.negate(),this.z)}function pointFpAdd(l){if(this.isInfinity()){return l}if(l.isInfinity()){return this}var p=l.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(l.z)).mod(this.curve.q);var o=l.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(l.z)).mod(this.curve.q);if(BigInteger$5.ZERO.equals(o)){if(BigInteger$5.ZERO.equals(p)){return this.twice()}return this.curve.getInfinity()}var j=new BigInteger$5("3");var e=this.x.toBigInteger();var n=this.y.toBigInteger();l.x.toBigInteger();l.y.toBigInteger();var m=o.square();var i=m.multiply(o);var d=e.multiply(m);var g=p.square().multiply(this.z);var a=g.subtract(d.shiftLeft(1)).multiply(l.z).subtract(i).multiply(o).mod(this.curve.q);var h=d.multiply(j).multiply(p).subtract(n.multiply(i)).subtract(g.multiply(p)).multiply(l.z).add(p.multiply(i)).mod(this.curve.q);var f=i.multiply(this.z).multiply(l.z).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(a),this.curve.fromBigInteger(h),f)}function pointFpTwice(){if(this.isInfinity()){return this}if(this.y.toBigInteger().signum()==0){return this.curve.getInfinity()}var g=new BigInteger$5("3");var c=this.x.toBigInteger();var h=this.y.toBigInteger();var e=h.multiply(this.z);var j=e.multiply(h).mod(this.curve.q);var i=this.curve.a.toBigInteger();var k=c.square().multiply(g);if(!BigInteger$5.ZERO.equals(i)){k=k.add(this.z.square().multiply(i));}k=k.mod(this.curve.q);var b=k.square().subtract(c.shiftLeft(3).multiply(j)).shiftLeft(1).multiply(e).mod(this.curve.q);var f=k.multiply(g).multiply(c).subtract(j.shiftLeft(1)).shiftLeft(2).multiply(j).subtract(k.square().multiply(k)).mod(this.curve.q);var d=e.square().multiply(e).shiftLeft(3).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(b),this.curve.fromBigInteger(f),d)}function pointFpMultiply(d){if(this.isInfinity()){return this}if(d.signum()==0){return this.curve.getInfinity()}var m=d;var l=m.multiply(new BigInteger$5("3"));var b=this.negate();var j=this;var q=this.curve.q.subtract(d);var o=q.multiply(new BigInteger$5("3"));var c=new ECPointFp(this.curve,this.x,this.y);var a=c.negate();var g;for(g=l.bitLength()-2;g>0;--g){j=j.twice();var n=l.testBit(g);var f=m.testBit(g);if(n!=f){j=j.add(n?this:b);}}for(g=o.bitLength()-2;g>0;--g){c=c.twice();var p=o.testBit(g);var r=q.testBit(g);if(p!=r){c=c.add(p?c:a);}}return j}function pointFpMultiplyTwo(c,a,b){var d;if(c.bitLength()>b.bitLength()){d=c.bitLength()-1;}else {d=b.bitLength()-1;}var f=this.curve.getInfinity();var e=this.add(a);while(d>=0){f=f.twice();if(c.testBit(d)){if(b.testBit(d)){f=f.add(e);}else {f=f.add(this);}}else {if(b.testBit(d)){f=f.add(a);}}--d;}return f}ECPointFp.prototype.getX=pointFpGetX;ECPointFp.prototype.getY=pointFpGetY;ECPointFp.prototype.equals=pointFpEquals;ECPointFp.prototype.isInfinity=pointFpIsInfinity;ECPointFp.prototype.negate=pointFpNegate;ECPointFp.prototype.add=pointFpAdd;ECPointFp.prototype.twice=pointFpTwice;ECPointFp.prototype.multiply=pointFpMultiply;ECPointFp.prototype.multiplyTwo=pointFpMultiplyTwo;function ECCurveFp(e,d,c){this.q=e;this.a=this.fromBigInteger(d);this.b=this.fromBigInteger(c);this.infinity=new ECPointFp(this,null,null);}function curveFpGetQ(){return this.q}function curveFpGetA(){return this.a}function curveFpGetB(){return this.b}function curveFpEquals(a){if(a==this){return true}return(this.q.equals(a.q)&&this.a.equals(a.a)&&this.b.equals(a.b))}function curveFpGetInfinity(){return this.infinity}function curveFpFromBigInteger(a){return new ECFieldElementFp(this.q,a)}function curveFpDecodePointHex(d){switch(parseInt(d.substr(0,2),16)){case 0:return this.infinity;case 2:case 3:return null;case 4:case 6:case 7:var a=(d.length-2)/2;var c=d.substr(2,a);var b=d.substr(a+2,a);return new ECPointFp(this,this.fromBigInteger(new BigInteger$5(c,16)),this.fromBigInteger(new BigInteger$5(b,16)));default:return null}}ECCurveFp.prototype.getQ=curveFpGetQ;ECCurveFp.prototype.getA=curveFpGetA;ECCurveFp.prototype.getB=curveFpGetB;ECCurveFp.prototype.equals=curveFpEquals;ECCurveFp.prototype.getInfinity=curveFpGetInfinity;ECCurveFp.prototype.fromBigInteger=curveFpFromBigInteger;ECCurveFp.prototype.decodePointHex=curveFpDecodePointHex;
	/*! (c) Stefan Thomas | https://github.com/bitcoinjs/bitcoinjs-lib
	 */
	ECFieldElementFp.prototype.getByteLength=function(){return Math.floor((this.toBigInteger().bitLength()+7)/8)};ECPointFp.prototype.getEncoded=function(c){var d=function(h,f){var g=h.toByteArrayUnsigned();if(f<g.length){g=g.slice(g.length-f);}else {while(f>g.length){g.unshift(0);}}return g};var a=this.getX().toBigInteger();var e=this.getY().toBigInteger();var b=d(a,32);if(c){if(e.isEven()){b.unshift(2);}else {b.unshift(3);}}else {b.unshift(4);b=b.concat(d(e,32));}return b};ECPointFp.decodeFrom=function(g,c){c[0];var e=c.length-1;var d=c.slice(1,1+e/2);var b=c.slice(1+e/2,1+e);d.unshift(0);b.unshift(0);var a=new BigInteger$5(d);var h=new BigInteger$5(b);return new ECPointFp(g,g.fromBigInteger(a),g.fromBigInteger(h))};ECPointFp.decodeFromHex=function(g,c){c.substr(0,2);var e=c.length-2;var d=c.substr(2,e/2);var b=c.substr(2+e/2,e/2);var a=new BigInteger$5(d,16);var h=new BigInteger$5(b,16);return new ECPointFp(g,g.fromBigInteger(a),g.fromBigInteger(h))};ECPointFp.prototype.add2D=function(c){if(this.isInfinity()){return c}if(c.isInfinity()){return this}if(this.x.equals(c.x)){if(this.y.equals(c.y)){return this.twice()}return this.curve.getInfinity()}var g=c.x.subtract(this.x);var e=c.y.subtract(this.y);var a=e.divide(g);var d=a.square().subtract(this.x).subtract(c.x);var f=a.multiply(this.x.subtract(d)).subtract(this.y);return new ECPointFp(this.curve,d,f)};ECPointFp.prototype.twice2D=function(){if(this.isInfinity()){return this}if(this.y.toBigInteger().signum()==0){return this.curve.getInfinity()}var b=this.curve.fromBigInteger(BigInteger$5.valueOf(2));var e=this.curve.fromBigInteger(BigInteger$5.valueOf(3));var a=this.x.square().multiply(e).add(this.curve.a).divide(this.y.multiply(b));var c=a.square().subtract(this.x.multiply(b));var d=a.multiply(this.x.subtract(c)).subtract(this.y);return new ECPointFp(this.curve,c,d)};ECPointFp.prototype.multiply2D=function(b){if(this.isInfinity()){return this}if(b.signum()==0){return this.curve.getInfinity()}var g=b;var f=g.multiply(new BigInteger$5("3"));var l=this.negate();var d=this;var c;for(c=f.bitLength()-2;c>0;--c){d=d.twice();var a=f.testBit(c);var j=g.testBit(c);if(a!=j){d=d.add2D(a?this:l);}}return d};ECPointFp.prototype.isOnCurve=function(){var d=this.getX().toBigInteger();var i=this.getY().toBigInteger();var f=this.curve.getA().toBigInteger();var c=this.curve.getB().toBigInteger();var h=this.curve.getQ();var e=i.multiply(i).mod(h);var g=d.multiply(d).multiply(d).add(f.multiply(d)).add(c).mod(h);return e.equals(g)};ECPointFp.prototype.toString=function(){return "("+this.getX().toBigInteger().toString()+","+this.getY().toBigInteger().toString()+")"};ECPointFp.prototype.validate=function(){var c=this.curve.getQ();if(this.isInfinity()){throw new Error("Point is at infinity.")}var a=this.getX().toBigInteger();var b=this.getY().toBigInteger();if(a.compareTo(BigInteger$5.ONE)<0||a.compareTo(c.subtract(BigInteger$5.ONE))>0){throw new Error("x coordinate out of bounds")}if(b.compareTo(BigInteger$5.ONE)<0||b.compareTo(c.subtract(BigInteger$5.ONE))>0){throw new Error("y coordinate out of bounds")}if(!this.isOnCurve()){throw new Error("Point is not on the curve.")}if(this.multiply(c).isInfinity()){throw new Error("Point is not a scalar multiple of G.")}return true};
	/*! Mike Samuel (c) 2009 | code.google.com/p/json-sans-eval
	 */
	var jsonParse=(function(){var e="(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";var j='(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';var i='(?:"'+j+'*")';var d=new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|"+e+"|"+i+")","g");var k=new RegExp("\\\\(?:([^u])|u(.{4}))","g");var g={'"':'"',"/":"/","\\":"\\",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"};function h(l,m,n){return m?g[m]:String.fromCharCode(parseInt(n,16))}var c=new String("");var a="\\";var b=Object.hasOwnProperty;return function(u,q){var p=u.match(d);var x;var v=p[0];var l=false;if("{"===v){x={};}else {if("["===v){x=[];}else {x=[];l=true;}}var t;var r=[x];for(var o=1-l,m=p.length;o<m;++o){v=p[o];var w;switch(v.charCodeAt(0)){default:w=r[0];w[t||w.length]=+(v);t=void 0;break;case 34:v=v.substring(1,v.length-1);if(v.indexOf(a)!==-1){v=v.replace(k,h);}w=r[0];if(!t){if(w instanceof Array){t=w.length;}else {t=v||c;break}}w[t]=v;t=void 0;break;case 91:w=r[0];r.unshift(w[t||w.length]=[]);t=void 0;break;case 93:r.shift();break;case 102:w=r[0];w[t||w.length]=false;t=void 0;break;case 110:w=r[0];w[t||w.length]=null;t=void 0;break;case 116:w=r[0];w[t||w.length]=true;t=void 0;break;case 123:w=r[0];r.unshift(w[t||w.length]={});t=void 0;break;case 125:r.shift();break}}if(l){if(r.length!==1){throw new Error()}x=x[0];}else {if(r.length){throw new Error()}}if(q){var s=function(C,B){var D=C[B];if(D&&typeof D==="object"){var n=null;for(var z in D){if(b.call(D,z)&&D!==C){var y=s(D,z);if(y!==void 0){D[z]=y;}else {if(!n){n=[];}n.push(z);}}}if(n){for(var A=n.length;--A>=0;){delete D[n[A]];}}}return q.call(C,B,D)};x=s({"":x},"");}return x}})();
	if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}KJUR.asn1.ASN1Util=new function(){this.integerToByteHex=function(a){var b=a.toString(16);if((b.length%2)==1){b="0"+b;}return b};this.bigIntToMinTwosComplementsHex=function(j){var f=j.toString(16);if(f.substr(0,1)!="-"){if(f.length%2==1){f="0"+f;}else {if(!f.match(/^[0-7]/)){f="00"+f;}}}else {var a=f.substr(1);var e=a.length;if(e%2==1){e+=1;}else {if(!f.match(/^[0-7]/)){e+=2;}}var g="";for(var d=0;d<e;d++){g+="f";}var c=new BigInteger$5(g,16);var b=c.xor(j).add(BigInteger$5.ONE);f=b.toString(16).replace(/^-/,"");}return f};this.getPEMStringFromHex=function(a,b){return hextopem(a,b)};this.newObject=function(k){var F=KJUR,o=F.asn1,v=o.ASN1Object,B=o.DERBoolean,e=o.DERInteger,t=o.DERBitString,h=o.DEROctetString,x=o.DERNull,y=o.DERObjectIdentifier,m=o.DEREnumerated,g=o.DERUTF8String,f=o.DERNumericString,A=o.DERPrintableString,w=o.DERTeletexString,q=o.DERIA5String,E=o.DERUTCTime,j=o.DERGeneralizedTime,b=o.DERVisibleString,l=o.DERBMPString,n=o.DERSequence,c=o.DERSet,s=o.DERTaggedObject,p=o.ASN1Util.newObject;if(k instanceof o.ASN1Object){return k}var u=Object.keys(k);if(u.length!=1){throw new Error("key of param shall be only one.")}var H=u[0];if(":asn1:bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:visstr:bmpstr:seq:set:tag:".indexOf(":"+H+":")==-1){throw new Error("undefined key: "+H)}if(H=="bool"){return new B(k[H])}if(H=="int"){return new e(k[H])}if(H=="bitstr"){return new t(k[H])}if(H=="octstr"){return new h(k[H])}if(H=="null"){return new x(k[H])}if(H=="oid"){return new y(k[H])}if(H=="enum"){return new m(k[H])}if(H=="utf8str"){return new g(k[H])}if(H=="numstr"){return new f(k[H])}if(H=="prnstr"){return new A(k[H])}if(H=="telstr"){return new w(k[H])}if(H=="ia5str"){return new q(k[H])}if(H=="utctime"){return new E(k[H])}if(H=="gentime"){return new j(k[H])}if(H=="visstr"){return new b(k[H])}if(H=="bmpstr"){return new l(k[H])}if(H=="asn1"){return new v(k[H])}if(H=="seq"){var d=k[H];var G=[];for(var z=0;z<d.length;z++){var D=p(d[z]);G.push(D);}return new n({array:G})}if(H=="set"){var d=k[H];var G=[];for(var z=0;z<d.length;z++){var D=p(d[z]);G.push(D);}return new c({array:G})}if(H=="tag"){var C=k[H];if(Object.prototype.toString.call(C)==="[object Array]"&&C.length==3){var r=p(C[2]);return new s({tag:C[0],explicit:C[1],obj:r})}else {return new s(C)}}};this.jsonToASN1HEX=function(b){var a=this.newObject(b);return a.getEncodedHex()};};KJUR.asn1.ASN1Util.oidHexToInt=function(a){var j="";var k=parseInt(a.substr(0,2),16);var d=Math.floor(k/40);var c=k%40;var j=d+"."+c;var e="";for(var f=2;f<a.length;f+=2){var g=parseInt(a.substr(f,2),16);var h=("00000000"+g.toString(2)).slice(-8);e=e+h.substr(1,7);if(h.substr(0,1)=="0"){var b=new BigInteger$5(e,2);j=j+"."+b.toString(10);e="";}}return j};KJUR.asn1.ASN1Util.oidIntToHex=function(f){var e=function(a){var k=a.toString(16);if(k.length==1){k="0"+k;}return k};var d=function(o){var n="";var k=new BigInteger$5(o,10);var a=k.toString(2);var l=7-a.length%7;if(l==7){l=0;}var q="";for(var m=0;m<l;m++){q+="0";}a=q+a;for(var m=0;m<a.length-1;m+=7){var p=a.substr(m,7);if(m!=a.length-7){p="1"+p;}n+=e(parseInt(p,2));}return n};if(!f.match(/^[0-9.]+$/)){throw "malformed oid string: "+f}var g="";var b=f.split(".");var j=parseInt(b[0])*40+parseInt(b[1]);g+=e(j);b.splice(0,2);for(var c=0;c<b.length;c++){g+=d(b[c]);}return g};KJUR.asn1.ASN1Object=function(e){var a="";this.params=null;this.getLengthHexFromValue=function(){if(typeof this.hV=="undefined"||this.hV==null){throw new Error("this.hV is null or undefined")}if(this.hV.length%2==1){throw new Error("value hex must be even length: n="+a.length+",v="+this.hV)}var j=this.hV.length/2;var i=j.toString(16);if(i.length%2==1){i="0"+i;}if(j<128){return i}else {var h=i.length/2;if(h>15){throw "ASN.1 length too long to represent by 8x: n = "+j.toString(16)}var g=128+h;return g.toString(16)+i}};this.getEncodedHex=function(){if(this.hTLV==null||this.isModified){this.hV=this.getFreshValueHex();this.hL=this.getLengthHexFromValue();this.hTLV=this.hT+this.hL+this.hV;this.isModified=false;}return this.hTLV};this.getValueHex=function(){this.getEncodedHex();return this.hV};this.getFreshValueHex=function(){return ""};this.setByParam=function(g){this.params=g;};if(e!=undefined){if(e.tlv!=undefined){this.hTLV=e.tlv;this.isModified=false;}}};KJUR.asn1.DERAbstractString=function(c){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);this.getString=function(){return this.s};this.setString=function(d){this.hTLV=null;this.isModified=true;this.s=d;this.hV=utf8tohex(this.s).toLowerCase();};this.setStringHex=function(d){this.hTLV=null;this.isModified=true;this.s=null;this.hV=d;};this.getFreshValueHex=function(){return this.hV};if(typeof c!="undefined"){if(typeof c=="string"){this.setString(c);}else {if(typeof c.str!="undefined"){this.setString(c.str);}else {if(typeof c.hex!="undefined"){this.setStringHex(c.hex);}}}}};YAHOO.lang.extend(KJUR.asn1.DERAbstractString,KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractTime=function(c){KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);this.localDateToUTC=function(g){var e=g.getTime()+(g.getTimezoneOffset()*60000);var f=new Date(e);return f};this.formatDate=function(m,o,e){var g=this.zeroPadding;var n=this.localDateToUTC(m);var p=String(n.getFullYear());if(o=="utc"){p=p.substr(2,2);}var l=g(String(n.getMonth()+1),2);var q=g(String(n.getDate()),2);var h=g(String(n.getHours()),2);var i=g(String(n.getMinutes()),2);var j=g(String(n.getSeconds()),2);var r=p+l+q+h+i+j;if(e===true){var f=n.getMilliseconds();if(f!=0){var k=g(String(f),3);k=k.replace(/[0]+$/,"");r=r+"."+k;}}return r+"Z"};this.zeroPadding=function(e,d){if(e.length>=d){return e}return new Array(d-e.length+1).join("0")+e};this.getString=function(){return this.s};this.setString=function(d){this.hTLV=null;this.isModified=true;this.s=d;this.hV=stohex(d);};this.setByDateValue=function(h,j,e,d,f,g){var i=new Date(Date.UTC(h,j-1,e,d,f,g,0));this.setByDate(i);};this.getFreshValueHex=function(){return this.hV};};YAHOO.lang.extend(KJUR.asn1.DERAbstractTime,KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractStructured=function(b){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);this.setByASN1ObjectArray=function(c){this.hTLV=null;this.isModified=true;this.asn1Array=c;};this.appendASN1Object=function(c){this.hTLV=null;this.isModified=true;this.asn1Array.push(c);};this.asn1Array=new Array();if(typeof b!="undefined"){if(typeof b.array!="undefined"){this.asn1Array=b.array;}}};YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured,KJUR.asn1.ASN1Object);KJUR.asn1.DERBoolean=function(a){KJUR.asn1.DERBoolean.superclass.constructor.call(this);this.hT="01";if(a==false){this.hTLV="010100";}else {this.hTLV="0101ff";}};YAHOO.lang.extend(KJUR.asn1.DERBoolean,KJUR.asn1.ASN1Object);KJUR.asn1.DERInteger=function(a){KJUR.asn1.DERInteger.superclass.constructor.call(this);this.hT="02";this.setByBigInteger=function(b){this.hTLV=null;this.isModified=true;this.hV=KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b);};this.setByInteger=function(c){var b=new BigInteger$5(String(c),10);this.setByBigInteger(b);};this.setValueHex=function(b){this.hV=b;};this.getFreshValueHex=function(){return this.hV};if(typeof a!="undefined"){if(typeof a.bigint!="undefined"){this.setByBigInteger(a.bigint);}else {if(typeof a["int"]!="undefined"){this.setByInteger(a["int"]);}else {if(typeof a=="number"){this.setByInteger(a);}else {if(typeof a.hex!="undefined"){this.setValueHex(a.hex);}}}}}};YAHOO.lang.extend(KJUR.asn1.DERInteger,KJUR.asn1.ASN1Object);KJUR.asn1.DERBitString=function(b){if(b!==undefined&&typeof b.obj!=="undefined"){var a=KJUR.asn1.ASN1Util.newObject(b.obj);b.hex="00"+a.getEncodedHex();}KJUR.asn1.DERBitString.superclass.constructor.call(this);this.hT="03";this.setHexValueIncludingUnusedBits=function(c){this.hTLV=null;this.isModified=true;this.hV=c;};this.setUnusedBitsAndHexValue=function(c,e){if(c<0||7<c){throw "unused bits shall be from 0 to 7: u = "+c}var d="0"+c;this.hTLV=null;this.isModified=true;this.hV=d+e;};this.setByBinaryString=function(e){e=e.replace(/0+$/,"");var f=8-e.length%8;if(f==8){f=0;}for(var g=0;g<=f;g++){e+="0";}var j="";for(var g=0;g<e.length-1;g+=8){var d=e.substr(g,8);var c=parseInt(d,2).toString(16);if(c.length==1){c="0"+c;}j+=c;}this.hTLV=null;this.isModified=true;this.hV="0"+f+j;};this.setByBooleanArray=function(e){var d="";for(var c=0;c<e.length;c++){if(e[c]==true){d+="1";}else {d+="0";}}this.setByBinaryString(d);};this.newFalseArray=function(e){var c=new Array(e);for(var d=0;d<e;d++){c[d]=false;}return c};this.getFreshValueHex=function(){return this.hV};if(typeof b!="undefined"){if(typeof b=="string"&&b.toLowerCase().match(/^[0-9a-f]+$/)){this.setHexValueIncludingUnusedBits(b);}else {if(typeof b.hex!="undefined"){this.setHexValueIncludingUnusedBits(b.hex);}else {if(typeof b.bin!="undefined"){this.setByBinaryString(b.bin);}else {if(typeof b.array!="undefined"){this.setByBooleanArray(b.array);}}}}}};YAHOO.lang.extend(KJUR.asn1.DERBitString,KJUR.asn1.ASN1Object);KJUR.asn1.DEROctetString=function(b){if(b!==undefined&&typeof b.obj!=="undefined"){var a=KJUR.asn1.ASN1Util.newObject(b.obj);b.hex=a.getEncodedHex();}KJUR.asn1.DEROctetString.superclass.constructor.call(this,b);this.hT="04";};YAHOO.lang.extend(KJUR.asn1.DEROctetString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERNull=function(){KJUR.asn1.DERNull.superclass.constructor.call(this);this.hT="05";this.hTLV="0500";};YAHOO.lang.extend(KJUR.asn1.DERNull,KJUR.asn1.ASN1Object);KJUR.asn1.DERObjectIdentifier=function(a){KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);this.hT="06";this.setValueHex=function(b){this.hTLV=null;this.isModified=true;this.s=null;this.hV=b;};this.setValueOidString=function(b){var c=oidtohex(b);if(c==null){throw new Error("malformed oid string: "+b)}this.hTLV=null;this.isModified=true;this.s=null;this.hV=c;};this.setValueName=function(c){var b=KJUR.asn1.x509.OID.name2oid(c);if(b!==""){this.setValueOidString(b);}else {throw new Error("DERObjectIdentifier oidName undefined: "+c)}};this.setValueNameOrOid=function(b){if(b.match(/^[0-2].[0-9.]+$/)){this.setValueOidString(b);}else {this.setValueName(b);}};this.getFreshValueHex=function(){return this.hV};this.setByParam=function(b){if(typeof b==="string"){this.setValueNameOrOid(b);}else {if(b.oid!==undefined){this.setValueNameOrOid(b.oid);}else {if(b.name!==undefined){this.setValueNameOrOid(b.name);}else {if(b.hex!==undefined){this.setValueHex(b.hex);}}}}};if(a!==undefined){this.setByParam(a);}};YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier,KJUR.asn1.ASN1Object);KJUR.asn1.DEREnumerated=function(a){KJUR.asn1.DEREnumerated.superclass.constructor.call(this);this.hT="0a";this.setByBigInteger=function(b){this.hTLV=null;this.isModified=true;this.hV=KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b);};this.setByInteger=function(c){var b=new BigInteger$5(String(c),10);this.setByBigInteger(b);};this.setValueHex=function(b){this.hV=b;};this.getFreshValueHex=function(){return this.hV};if(typeof a!="undefined"){if(typeof a["int"]!="undefined"){this.setByInteger(a["int"]);}else {if(typeof a=="number"){this.setByInteger(a);}else {if(typeof a.hex!="undefined"){this.setValueHex(a.hex);}}}}};YAHOO.lang.extend(KJUR.asn1.DEREnumerated,KJUR.asn1.ASN1Object);KJUR.asn1.DERUTF8String=function(a){KJUR.asn1.DERUTF8String.superclass.constructor.call(this,a);this.hT="0c";};YAHOO.lang.extend(KJUR.asn1.DERUTF8String,KJUR.asn1.DERAbstractString);KJUR.asn1.DERNumericString=function(a){KJUR.asn1.DERNumericString.superclass.constructor.call(this,a);this.hT="12";};YAHOO.lang.extend(KJUR.asn1.DERNumericString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERPrintableString=function(a){KJUR.asn1.DERPrintableString.superclass.constructor.call(this,a);this.hT="13";};YAHOO.lang.extend(KJUR.asn1.DERPrintableString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERTeletexString=function(a){KJUR.asn1.DERTeletexString.superclass.constructor.call(this,a);this.hT="14";};YAHOO.lang.extend(KJUR.asn1.DERTeletexString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERIA5String=function(a){KJUR.asn1.DERIA5String.superclass.constructor.call(this,a);this.hT="16";};YAHOO.lang.extend(KJUR.asn1.DERIA5String,KJUR.asn1.DERAbstractString);KJUR.asn1.DERVisibleString=function(a){KJUR.asn1.DERIA5String.superclass.constructor.call(this,a);this.hT="1a";};YAHOO.lang.extend(KJUR.asn1.DERVisibleString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERBMPString=function(a){KJUR.asn1.DERBMPString.superclass.constructor.call(this,a);this.hT="1e";};YAHOO.lang.extend(KJUR.asn1.DERBMPString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERUTCTime=function(a){KJUR.asn1.DERUTCTime.superclass.constructor.call(this,a);this.hT="17";this.setByDate=function(b){this.hTLV=null;this.isModified=true;this.date=b;this.s=this.formatDate(this.date,"utc");this.hV=stohex(this.s);};this.getFreshValueHex=function(){if(typeof this.date=="undefined"&&typeof this.s=="undefined"){this.date=new Date();this.s=this.formatDate(this.date,"utc");this.hV=stohex(this.s);}return this.hV};if(a!==undefined){if(a.str!==undefined){this.setString(a.str);}else {if(typeof a=="string"&&a.match(/^[0-9]{12}Z$/)){this.setString(a);}else {if(a.hex!==undefined){this.setStringHex(a.hex);}else {if(a.date!==undefined){this.setByDate(a.date);}}}}}};YAHOO.lang.extend(KJUR.asn1.DERUTCTime,KJUR.asn1.DERAbstractTime);KJUR.asn1.DERGeneralizedTime=function(a){KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this,a);this.hT="18";this.withMillis=false;this.setByDate=function(b){this.hTLV=null;this.isModified=true;this.date=b;this.s=this.formatDate(this.date,"gen",this.withMillis);this.hV=stohex(this.s);};this.getFreshValueHex=function(){if(this.date===undefined&&this.s===undefined){this.date=new Date();this.s=this.formatDate(this.date,"gen",this.withMillis);this.hV=stohex(this.s);}return this.hV};if(a!==undefined){if(a.str!==undefined){this.setString(a.str);}else {if(typeof a=="string"&&a.match(/^[0-9]{14}Z$/)){this.setString(a);}else {if(a.hex!==undefined){this.setStringHex(a.hex);}else {if(a.date!==undefined){this.setByDate(a.date);}}}}if(a.millis===true){this.withMillis=true;}}};YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime,KJUR.asn1.DERAbstractTime);KJUR.asn1.DERSequence=function(a){KJUR.asn1.DERSequence.superclass.constructor.call(this,a);this.hT="30";this.getFreshValueHex=function(){var c="";for(var b=0;b<this.asn1Array.length;b++){var d=this.asn1Array[b];c+=d.getEncodedHex();}this.hV=c;return this.hV};};YAHOO.lang.extend(KJUR.asn1.DERSequence,KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERSet=function(a){KJUR.asn1.DERSet.superclass.constructor.call(this,a);this.hT="31";this.sortFlag=true;this.getFreshValueHex=function(){var b=new Array();for(var c=0;c<this.asn1Array.length;c++){var d=this.asn1Array[c];b.push(d.getEncodedHex());}if(this.sortFlag==true){b.sort();}this.hV=b.join("");return this.hV};if(typeof a!="undefined"){if(typeof a.sortflag!="undefined"&&a.sortflag==false){this.sortFlag=false;}}};YAHOO.lang.extend(KJUR.asn1.DERSet,KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERTaggedObject=function(b){KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);var a=KJUR.asn1;this.hT="a0";this.hV="";this.isExplicit=true;this.asn1Object=null;this.setASN1Object=function(c,d,e){this.hT=d;this.isExplicit=c;this.asn1Object=e;if(this.isExplicit){this.hV=this.asn1Object.getEncodedHex();this.hTLV=null;this.isModified=true;}else {this.hV=null;this.hTLV=e.getEncodedHex();this.hTLV=this.hTLV.replace(/^../,d);this.isModified=false;}};this.getFreshValueHex=function(){return this.hV};this.setByParam=function(c){if(c.tag!=undefined){this.hT=c.tag;}if(c.explicit!=undefined){this.isExplicit=c.explicit;}if(c.tage!=undefined){this.hT=c.tage;this.isExplicit=true;}if(c.tagi!=undefined){this.hT=c.tagi;this.isExplicit=false;}if(c.obj!=undefined){if(c.obj instanceof a.ASN1Object){this.asn1Object=c.obj;this.setASN1Object(this.isExplicit,this.hT,this.asn1Object);}else {if(typeof c.obj=="object"){this.asn1Object=a.ASN1Util.newObject(c.obj);this.setASN1Object(this.isExplicit,this.hT,this.asn1Object);}}}};if(b!=undefined){this.setByParam(b);}};YAHOO.lang.extend(KJUR.asn1.DERTaggedObject,KJUR.asn1.ASN1Object);
	var ASN1HEX=new function(){};ASN1HEX.getLblen=function(c,a){if(c.substr(a+2,1)!="8"){return 1}var b=parseInt(c.substr(a+3,1));if(b==0){return -1}if(0<b&&b<10){return b+1}return -2};ASN1HEX.getL=function(c,b){var a=ASN1HEX.getLblen(c,b);if(a<1){return ""}return c.substr(b+2,a*2)};ASN1HEX.getVblen=function(d,a){var c,b;c=ASN1HEX.getL(d,a);if(c==""){return -1}if(c.substr(0,1)==="8"){b=new BigInteger$5(c.substr(2),16);}else {b=new BigInteger$5(c,16);}return b.intValue()};ASN1HEX.getVidx=function(c,b){var a=ASN1HEX.getLblen(c,b);if(a<0){return a}return b+(a+1)*2};ASN1HEX.getV=function(d,a){var c=ASN1HEX.getVidx(d,a);var b=ASN1HEX.getVblen(d,a);return d.substr(c,b*2)};ASN1HEX.getTLV=function(b,a){return b.substr(a,2)+ASN1HEX.getL(b,a)+ASN1HEX.getV(b,a)};ASN1HEX.getTLVblen=function(b,a){return 2+ASN1HEX.getLblen(b,a)*2+ASN1HEX.getVblen(b,a)*2};ASN1HEX.getNextSiblingIdx=function(d,a){var c=ASN1HEX.getVidx(d,a);var b=ASN1HEX.getVblen(d,a);return c+b*2};ASN1HEX.getChildIdx=function(e,k){var l=ASN1HEX;var j=[];var c,f,g;c=l.getVidx(e,k);f=l.getVblen(e,k)*2;if(e.substr(k,2)=="03"){c+=2;f-=2;}g=0;var d=c;while(g<=f){var b=l.getTLVblen(e,d);g+=b;if(g<=f){j.push(d);}d+=b;if(g>=f){break}}return j};ASN1HEX.getNthChildIdx=function(d,b,e){var c=ASN1HEX.getChildIdx(d,b);return c[e]};ASN1HEX.getIdxbyList=function(e,d,c,i){var g=ASN1HEX;var f,b;if(c.length==0){if(i!==undefined){if(e.substr(d,2)!==i){return -1}}return d}f=c.shift();b=g.getChildIdx(e,d);if(f>=b.length){return -1}return g.getIdxbyList(e,b[f],c,i)};ASN1HEX.getIdxbyListEx=function(f,k,b,g){var m=ASN1HEX;var d,l;if(b.length==0){if(g!==undefined){if(f.substr(k,2)!==g){return -1}}return k}d=b.shift();l=m.getChildIdx(f,k);var j=0;for(var e=0;e<l.length;e++){var c=f.substr(l[e],2);if((typeof d=="number"&&(!m.isContextTag(c))&&j==d)||(typeof d=="string"&&m.isContextTag(c,d))){return m.getIdxbyListEx(f,l[e],b,g)}if(!m.isContextTag(c)){j++;}}return -1};ASN1HEX.getTLVbyList=function(d,c,b,f){var e=ASN1HEX;var a=e.getIdxbyList(d,c,b,f);if(a==-1){return null}if(a>=d.length){return null}return e.getTLV(d,a)};ASN1HEX.getTLVbyListEx=function(d,c,b,f){var e=ASN1HEX;var a=e.getIdxbyListEx(d,c,b,f);if(a==-1){return null}return e.getTLV(d,a)};ASN1HEX.getVbyList=function(e,c,b,g,i){var f=ASN1HEX;var a,d;a=f.getIdxbyList(e,c,b,g);if(a==-1){return null}if(a>=e.length){return null}d=f.getV(e,a);if(i===true){d=d.substr(2);}return d};ASN1HEX.getVbyListEx=function(b,e,a,d,f){var j=ASN1HEX;var g,i;g=j.getIdxbyListEx(b,e,a,d);if(g==-1){return null}i=j.getV(b,g);if(b.substr(g,2)=="03"&&f!==false){i=i.substr(2);}return i};ASN1HEX.getInt=function(e,b,f){if(f==undefined){f=-1;}try{var c=e.substr(b,2);if(c!="02"&&c!="03"){return f}var a=ASN1HEX.getV(e,b);if(c=="02"){return parseInt(a,16)}else {return bitstrtoint(a)}}catch(d){return f}};ASN1HEX.getOID=function(c,a,d){if(d==undefined){d=null;}try{if(c.substr(a,2)!="06"){return d}var e=ASN1HEX.getV(c,a);return hextooid(e)}catch(b){return d}};ASN1HEX.getOIDName=function(d,a,f){if(f==undefined){f=null;}try{var e=ASN1HEX.getOID(d,a,f);if(e==f){return f}var b=KJUR.asn1.x509.OID.oid2name(e);if(b==""){return e}return b}catch(c){return f}};ASN1HEX.getString=function(d,b,e){if(e==undefined){e=null;}try{var a=ASN1HEX.getV(d,b);return hextorstr(a)}catch(c){return e}};ASN1HEX.hextooidstr=function(e){var h=function(b,a){if(b.length>=a){return b}return new Array(a-b.length+1).join("0")+b};var l=[];var o=e.substr(0,2);var f=parseInt(o,16);l[0]=new String(Math.floor(f/40));l[1]=new String(f%40);var m=e.substr(2);var k=[];for(var g=0;g<m.length/2;g++){k.push(parseInt(m.substr(g*2,2),16));}var j=[];var d="";for(var g=0;g<k.length;g++){if(k[g]&128){d=d+h((k[g]&127).toString(2),7);}else {d=d+h((k[g]&127).toString(2),7);j.push(new String(parseInt(d,2)));d="";}}var n=l.join(".");if(j.length>0){n=n+"."+j.join(".");}return n};ASN1HEX.dump=function(t,c,l,g){var p=ASN1HEX;var j=p.getV;var y=p.dump;var w=p.getChildIdx;var e=t;if(t instanceof KJUR.asn1.ASN1Object){e=t.getEncodedHex();}var q=function(A,i){if(A.length<=i*2){return A}else {var v=A.substr(0,i)+"..(total "+A.length/2+"bytes).."+A.substr(A.length-i,i);return v}};if(c===undefined){c={ommit_long_octet:32};}if(l===undefined){l=0;}if(g===undefined){g="";}var x=c.ommit_long_octet;var z=e.substr(l,2);if(z=="01"){var h=j(e,l);if(h=="00"){return g+"BOOLEAN FALSE\n"}else {return g+"BOOLEAN TRUE\n"}}if(z=="02"){var h=j(e,l);return g+"INTEGER "+q(h,x)+"\n"}if(z=="03"){var h=j(e,l);if(p.isASN1HEX(h.substr(2))){var k=g+"BITSTRING, encapsulates\n";k=k+y(h.substr(2),c,0,g+"  ");return k}else {return g+"BITSTRING "+q(h,x)+"\n"}}if(z=="04"){var h=j(e,l);if(p.isASN1HEX(h)){var k=g+"OCTETSTRING, encapsulates\n";k=k+y(h,c,0,g+"  ");return k}else {return g+"OCTETSTRING "+q(h,x)+"\n"}}if(z=="05"){return g+"NULL\n"}if(z=="06"){var m=j(e,l);var b=KJUR.asn1.ASN1Util.oidHexToInt(m);var o=KJUR.asn1.x509.OID.oid2name(b);var a=b.replace(/\./g," ");if(o!=""){return g+"ObjectIdentifier "+o+" ("+a+")\n"}else {return g+"ObjectIdentifier ("+a+")\n"}}if(z=="0a"){return g+"ENUMERATED "+parseInt(j(e,l))+"\n"}if(z=="0c"){return g+"UTF8String '"+hextoutf8(j(e,l))+"'\n"}if(z=="13"){return g+"PrintableString '"+hextoutf8(j(e,l))+"'\n"}if(z=="14"){return g+"TeletexString '"+hextoutf8(j(e,l))+"'\n"}if(z=="16"){return g+"IA5String '"+hextoutf8(j(e,l))+"'\n"}if(z=="17"){return g+"UTCTime "+hextoutf8(j(e,l))+"\n"}if(z=="18"){return g+"GeneralizedTime "+hextoutf8(j(e,l))+"\n"}if(z=="1a"){return g+"VisualString '"+hextoutf8(j(e,l))+"'\n"}if(z=="1e"){return g+"BMPString '"+ucs2hextoutf8(j(e,l))+"'\n"}if(z=="30"){if(e.substr(l,4)=="3000"){return g+"SEQUENCE {}\n"}var k=g+"SEQUENCE\n";var d=w(e,l);var f=c;if((d.length==2||d.length==3)&&e.substr(d[0],2)=="06"&&e.substr(d[d.length-1],2)=="04"){var o=p.oidname(j(e,d[0]));var r=JSON.parse(JSON.stringify(c));r.x509ExtName=o;f=r;}for(var u=0;u<d.length;u++){k=k+y(e,f,d[u],g+"  ");}return k}if(z=="31"){var k=g+"SET\n";var d=w(e,l);for(var u=0;u<d.length;u++){k=k+y(e,c,d[u],g+"  ");}return k}var z=parseInt(z,16);if((z&128)!=0){var n=z&31;if((z&32)!=0){var k=g+"["+n+"]\n";var d=w(e,l);for(var u=0;u<d.length;u++){k=k+y(e,c,d[u],g+"  ");}return k}else {var h=j(e,l);if(ASN1HEX.isASN1HEX(h)){var k=g+"["+n+"]\n";k=k+y(h,c,0,g+"  ");return k}else {if(h.substr(0,8)=="68747470"){h=hextoutf8(h);}else {if(c.x509ExtName==="subjectAltName"&&n==2){h=hextoutf8(h);}}}var k=g+"["+n+"] "+h+"\n";return k}}return g+"UNKNOWN("+z+") "+j(e,l)+"\n"};ASN1HEX.isContextTag=function(c,b){c=c.toLowerCase();var f,e;try{f=parseInt(c,16);}catch(d){return -1}if(b===undefined){if((f&192)==128){return true}else {return false}}try{var a=b.match(/^\[[0-9]+\]$/);if(a==null){return false}e=parseInt(b.substr(1,b.length-1),10);if(e>31){return false}if(((f&192)==128)&&((f&31)==e)){return true}return false}catch(d){return false}};ASN1HEX.isASN1HEX=function(e){var d=ASN1HEX;if(e.length%2==1){return false}var c=d.getVblen(e,0);var b=e.substr(0,2);var f=d.getL(e,0);var a=e.length-b.length-f.length;if(a==c*2){return true}return false};ASN1HEX.checkStrictDER=function(g,o,d,c,r){var s=ASN1HEX;if(d===undefined){if(typeof g!="string"){throw new Error("not hex string")}g=g.toLowerCase();if(!KJUR.lang.String.isHex(g)){throw new Error("not hex string")}d=g.length;c=g.length/2;if(c<128){r=1;}else {r=Math.ceil(c.toString(16))+1;}}var k=s.getL(g,o);if(k.length>r*2){throw new Error("L of TLV too long: idx="+o)}var n=s.getVblen(g,o);if(n>c){throw new Error("value of L too long than hex: idx="+o)}var q=s.getTLV(g,o);var f=q.length-2-s.getL(g,o).length;if(f!==(n*2)){throw new Error("V string length and L's value not the same:"+f+"/"+(n*2))}if(o===0){if(g.length!=q.length){throw new Error("total length and TLV length unmatch:"+g.length+"!="+q.length)}}var b=g.substr(o,2);if(b==="02"){var a=s.getVidx(g,o);if(g.substr(a,2)=="00"&&g.charCodeAt(a+2)<56){throw new Error("not least zeros for DER INTEGER")}}if(parseInt(b,16)&32){var p=s.getVblen(g,o);var m=0;var l=s.getChildIdx(g,o);for(var e=0;e<l.length;e++){var j=s.getTLV(g,l[e]);m+=j.length;s.checkStrictDER(g,l[e],d,c,r);}if((p*2)!=m){throw new Error("sum of children's TLV length and L unmatch: "+(p*2)+"!="+m)}}};ASN1HEX.oidname=function(a){var c=KJUR.asn1;if(KJUR.lang.String.isHex(a)){a=c.ASN1Util.oidHexToInt(a);}var b=c.x509.OID.oid2name(a);if(b===""){b=a;}return b};
	if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}if(typeof KJUR.asn1.x509=="undefined"||!KJUR.asn1.x509){KJUR.asn1.x509={};}KJUR.asn1.x509.Certificate=function(h){KJUR.asn1.x509.Certificate.superclass.constructor.call(this);var d=KJUR,c=d.asn1,f=c.DERBitString,b=c.DERSequence,g=c.x509,a=g.TBSCertificate,e=g.AlgorithmIdentifier;this.params=undefined;this.setByParam=function(i){this.params=i;};this.sign=function(){var l=this.params;var k=l.sigalg;if(l.sigalg.name!=undefined){k=l.sigalg.name;}var i=l.tbsobj.getEncodedHex();var j=new KJUR.crypto.Signature({alg:k});j.init(l.cakey);j.updateHex(i);l.sighex=j.sign();};this.getPEM=function(){return hextopem(this.getEncodedHex(),"CERTIFICATE")};this.getEncodedHex=function(){var k=this.params;if(k.tbsobj==undefined||k.tbsobj==null){k.tbsobj=new a(k);}if(k.sighex==undefined&&k.cakey!=undefined){this.sign();}if(k.sighex==undefined){throw new Error("sighex or cakey parameter not defined")}var i=[];i.push(k.tbsobj);i.push(new e({name:k.sigalg}));i.push(new f({hex:"00"+k.sighex}));var j=new b({array:i});return j.getEncodedHex()};if(h!=undefined){this.params=h;}};YAHOO.lang.extend(KJUR.asn1.x509.Certificate,KJUR.asn1.ASN1Object);KJUR.asn1.x509.TBSCertificate=function(f){KJUR.asn1.x509.TBSCertificate.superclass.constructor.call(this);var b=KJUR,i=b.asn1,d=i.x509,c=i.DERTaggedObject,h=i.DERInteger,g=i.DERSequence,l=d.AlgorithmIdentifier,e=d.Time,a=d.X500Name,j=d.Extensions,k=d.SubjectPublicKeyInfo;this.params=null;this.setByParam=function(m){this.params=m;};this.getEncodedHex=function(){var n=[];var q=this.params;if(q.version!=undefined||q.version!=1){var m=2;if(q.version!=undefined){m=q.version-1;}var p=new c({obj:new h({"int":m})});n.push(p);}n.push(new h(q.serial));n.push(new l({name:q.sigalg}));n.push(new a(q.issuer));n.push(new g({array:[new e(q.notbefore),new e(q.notafter)]}));n.push(new a(q.subject));n.push(new k(KEYUTIL.getKey(q.sbjpubkey)));if(q.ext!==undefined&&q.ext.length>0){n.push(new c({tag:"a3",obj:new j(q.ext)}));}var o=new KJUR.asn1.DERSequence({array:n});return o.getEncodedHex()};if(f!==undefined){this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.x509.TBSCertificate,KJUR.asn1.ASN1Object);KJUR.asn1.x509.Extensions=function(d){KJUR.asn1.x509.Extensions.superclass.constructor.call(this);var c=KJUR,b=c.asn1,a=b.DERSequence,e=b.x509;this.aParam=[];this.setByParam=function(f){this.aParam=f;};this.getEncodedHex=function(){var f=[];for(var h=0;h<this.aParam.length;h++){var l=this.aParam[h];var k=l.extname;var j=null;if(l.extn!=undefined){j=new e.PrivateExtension(l);}else {if(k=="subjectKeyIdentifier"){j=new e.SubjectKeyIdentifier(l);}else {if(k=="keyUsage"){j=new e.KeyUsage(l);}else {if(k=="subjectAltName"){j=new e.SubjectAltName(l);}else {if(k=="issuerAltName"){j=new e.IssuerAltName(l);}else {if(k=="basicConstraints"){j=new e.BasicConstraints(l);}else {if(k=="cRLDistributionPoints"){j=new e.CRLDistributionPoints(l);}else {if(k=="certificatePolicies"){j=new e.CertificatePolicies(l);}else {if(k=="authorityKeyIdentifier"){j=new e.AuthorityKeyIdentifier(l);}else {if(k=="extKeyUsage"){j=new e.ExtKeyUsage(l);}else {if(k=="authorityInfoAccess"){j=new e.AuthorityInfoAccess(l);}else {if(k=="cRLNumber"){j=new e.CRLNumber(l);}else {if(k=="cRLReason"){j=new e.CRLReason(l);}else {if(k=="ocspNonce"){j=new e.OCSPNonce(l);}else {if(k=="ocspNoCheck"){j=new e.OCSPNoCheck(l);}else {if(k=="adobeTimeStamp"){j=new e.AdobeTimeStamp(l);}else {if(k=="subjectDirectoryAttributes"){j=new e.SubjectDirectoryAttributes(l);}else {throw new Error("extension not supported:"+JSON.stringify(l))}}}}}}}}}}}}}}}}}if(j!=null){f.push(j);}}var g=new a({array:f});return g.getEncodedHex()};if(d!=undefined){this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.x509.Extensions,KJUR.asn1.ASN1Object);KJUR.asn1.x509.Extension=function(d){KJUR.asn1.x509.Extension.superclass.constructor.call(this);var a=KJUR,e=a.asn1,h=e.DERObjectIdentifier,i=e.DEROctetString;e.DERBitString;var g=e.DERBoolean,c=e.DERSequence;this.getEncodedHex=function(){var m=new h({oid:this.oid});var l=new i({hex:this.getExtnValueHex()});var k=new Array();k.push(m);if(this.critical){k.push(new g());}k.push(l);var j=new c({array:k});return j.getEncodedHex()};this.critical=false;if(d!==undefined){if(d.critical!==undefined){this.critical=d.critical;}}};YAHOO.lang.extend(KJUR.asn1.x509.Extension,KJUR.asn1.ASN1Object);KJUR.asn1.x509.KeyUsage=function(f){KJUR.asn1.x509.KeyUsage.superclass.constructor.call(this,f);var a=X509.KEYUSAGE_NAME;this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.15";if(f!==undefined){if(f.bin!==undefined){this.asn1ExtnValue=new KJUR.asn1.DERBitString(f);}if(f.names!==undefined&&f.names.length!==undefined){var e=f.names;var d="000000000";for(var c=0;c<e.length;c++){for(var b=0;b<a.length;b++){if(e[c]===a[b]){d=d.substring(0,b)+"1"+d.substring(b+1,d.length);}}}this.asn1ExtnValue=new KJUR.asn1.DERBitString({bin:d});}}};YAHOO.lang.extend(KJUR.asn1.x509.KeyUsage,KJUR.asn1.x509.Extension);KJUR.asn1.x509.BasicConstraints=function(g){KJUR.asn1.x509.BasicConstraints.superclass.constructor.call(this,g);var c=KJUR.asn1,e=c.DERBoolean,f=c.DERInteger,b=c.DERSequence;this.getExtnValueHex=function(){var i=new Array();if(this.cA){i.push(new e());}if(this.pathLen>-1){i.push(new f({"int":this.pathLen}));}var h=new b({array:i});this.asn1ExtnValue=h;return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.19";this.cA=false;this.pathLen=-1;if(g!==undefined){if(g.cA!==undefined){this.cA=g.cA;}if(g.pathLen!==undefined){this.pathLen=g.pathLen;}}};YAHOO.lang.extend(KJUR.asn1.x509.BasicConstraints,KJUR.asn1.x509.Extension);KJUR.asn1.x509.CRLDistributionPoints=function(d){KJUR.asn1.x509.CRLDistributionPoints.superclass.constructor.call(this,d);var b=KJUR,a=b.asn1,c=a.x509;this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.setByDPArray=function(e){var f=[];for(var g=0;g<e.length;g++){if(e[g] instanceof KJUR.asn1.ASN1Object){f.push(e[g]);}else {var h=new c.DistributionPoint(e[g]);f.push(h);}}this.asn1ExtnValue=new a.DERSequence({array:f});};this.setByOneURI=function(f){var e=new c.DistributionPoint({fulluri:f});this.setByDPArray([e]);};this.oid="2.5.29.31";if(d!==undefined){if(d.array!==undefined){this.setByDPArray(d.array);}else {if(d.uri!==undefined){this.setByOneURI(d.uri);}}}};YAHOO.lang.extend(KJUR.asn1.x509.CRLDistributionPoints,KJUR.asn1.x509.Extension);KJUR.asn1.x509.DistributionPoint=function(e){KJUR.asn1.x509.DistributionPoint.superclass.constructor.call(this);var c=KJUR,b=c.asn1,d=b.x509.DistributionPointName;this.getEncodedHex=function(){var f=new b.DERSequence();if(this.asn1DP!=null){var g=new b.DERTaggedObject({explicit:true,tag:"a0",obj:this.asn1DP});f.appendASN1Object(g);}this.hTLV=f.getEncodedHex();return this.hTLV};if(e!==undefined){if(e.dpobj!==undefined){this.asn1DP=e.dpobj;}else {if(e.dpname!==undefined){this.asn1DP=new d(e.dpname);}else {if(e.fulluri!==undefined){this.asn1DP=new d({full:[{uri:e.fulluri}]});}}}}};YAHOO.lang.extend(KJUR.asn1.x509.DistributionPoint,KJUR.asn1.ASN1Object);KJUR.asn1.x509.DistributionPointName=function(h){KJUR.asn1.x509.DistributionPointName.superclass.constructor.call(this);var c=KJUR,b=c.asn1,e=b.DERTaggedObject;this.getEncodedHex=function(){if(this.type!="full"){throw new Error("currently type shall be 'full': "+this.type)}this.asn1Obj=new e({explicit:false,tag:this.tag,obj:this.asn1V});this.hTLV=this.asn1Obj.getEncodedHex();return this.hTLV};if(h!==undefined){if(b.x509.GeneralNames.prototype.isPrototypeOf(h)){this.type="full";this.tag="a0";this.asn1V=h;}else {if(h.full!==undefined){this.type="full";this.tag="a0";this.asn1V=new b.x509.GeneralNames(h.full);}else {throw new Error("This class supports GeneralNames only as argument")}}}};YAHOO.lang.extend(KJUR.asn1.x509.DistributionPointName,KJUR.asn1.ASN1Object);KJUR.asn1.x509.CertificatePolicies=function(f){KJUR.asn1.x509.CertificatePolicies.superclass.constructor.call(this,f);var c=KJUR,b=c.asn1,e=b.x509,a=b.DERSequence,d=e.PolicyInformation;this.params=null;this.getExtnValueHex=function(){var j=[];for(var h=0;h<this.params.array.length;h++){j.push(new d(this.params.array[h]));}var g=new a({array:j});this.asn1ExtnValue=g;return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.32";if(f!==undefined){this.params=f;}};YAHOO.lang.extend(KJUR.asn1.x509.CertificatePolicies,KJUR.asn1.x509.Extension);KJUR.asn1.x509.PolicyInformation=function(d){KJUR.asn1.x509.PolicyInformation.superclass.constructor.call(this,d);var c=KJUR.asn1,b=c.DERSequence,e=c.DERObjectIdentifier,a=c.x509.PolicyQualifierInfo;this.params=null;this.getEncodedHex=function(){if(this.params.policyoid===undefined&&this.params.array===undefined){throw new Error("parameter oid and array missing")}var f=[new e(this.params.policyoid)];if(this.params.array!==undefined){var j=[];for(var h=0;h<this.params.array.length;h++){j.push(new a(this.params.array[h]));}if(j.length>0){f.push(new b({array:j}));}}var g=new b({array:f});return g.getEncodedHex()};if(d!==undefined){this.params=d;}};YAHOO.lang.extend(KJUR.asn1.x509.PolicyInformation,KJUR.asn1.ASN1Object);KJUR.asn1.x509.PolicyQualifierInfo=function(e){KJUR.asn1.x509.PolicyQualifierInfo.superclass.constructor.call(this,e);var c=KJUR.asn1,b=c.DERSequence,d=c.DERIA5String,f=c.DERObjectIdentifier,a=c.x509.UserNotice;this.params=null;this.getEncodedHex=function(){if(this.params.cps!==undefined){var g=new b({array:[new f({oid:"1.3.6.1.5.5.7.2.1"}),new d({str:this.params.cps})]});return g.getEncodedHex()}if(this.params.unotice!=undefined){var g=new b({array:[new f({oid:"1.3.6.1.5.5.7.2.2"}),new a(this.params.unotice)]});return g.getEncodedHex()}};if(e!==undefined){this.params=e;}};YAHOO.lang.extend(KJUR.asn1.x509.PolicyQualifierInfo,KJUR.asn1.ASN1Object);KJUR.asn1.x509.UserNotice=function(e){KJUR.asn1.x509.UserNotice.superclass.constructor.call(this,e);var a=KJUR.asn1.DERSequence;KJUR.asn1.DERInteger;var c=KJUR.asn1.x509.DisplayText,b=KJUR.asn1.x509.NoticeReference;this.params=null;this.getEncodedHex=function(){var f=[];if(this.params.noticeref!==undefined){f.push(new b(this.params.noticeref));}if(this.params.exptext!==undefined){f.push(new c(this.params.exptext));}var g=new a({array:f});return g.getEncodedHex()};if(e!==undefined){this.params=e;}};YAHOO.lang.extend(KJUR.asn1.x509.UserNotice,KJUR.asn1.ASN1Object);KJUR.asn1.x509.NoticeReference=function(d){KJUR.asn1.x509.NoticeReference.superclass.constructor.call(this,d);var a=KJUR.asn1.DERSequence,c=KJUR.asn1.DERInteger,b=KJUR.asn1.x509.DisplayText;this.params=null;this.getEncodedHex=function(){var f=[];if(this.params.org!==undefined){f.push(new b(this.params.org));}if(this.params.noticenum!==undefined){var h=[];var e=this.params.noticenum;for(var j=0;j<e.length;j++){h.push(new c(e[j]));}f.push(new a({array:h}));}if(f.length==0){throw new Error("parameter is empty")}var g=new a({array:f});return g.getEncodedHex()};if(d!==undefined){this.params=d;}};YAHOO.lang.extend(KJUR.asn1.x509.NoticeReference,KJUR.asn1.ASN1Object);KJUR.asn1.x509.DisplayText=function(a){KJUR.asn1.x509.DisplayText.superclass.constructor.call(this,a);this.hT="0c";if(a!==undefined){if(a.type==="ia5"){this.hT="16";}else {if(a.type==="vis"){this.hT="1a";}else {if(a.type==="bmp"){this.hT="1e";}}}}};YAHOO.lang.extend(KJUR.asn1.x509.DisplayText,KJUR.asn1.DERAbstractString);KJUR.asn1.x509.ExtKeyUsage=function(c){KJUR.asn1.x509.ExtKeyUsage.superclass.constructor.call(this,c);var b=KJUR,a=b.asn1;this.setPurposeArray=function(d){this.asn1ExtnValue=new a.DERSequence();for(var e=0;e<d.length;e++){var f=new a.DERObjectIdentifier(d[e]);this.asn1ExtnValue.appendASN1Object(f);}};this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.37";if(c!==undefined){if(c.array!==undefined){this.setPurposeArray(c.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.ExtKeyUsage,KJUR.asn1.x509.Extension);KJUR.asn1.x509.AuthorityKeyIdentifier=function(f){KJUR.asn1.x509.AuthorityKeyIdentifier.superclass.constructor.call(this,f);var b=KJUR,a=b.asn1,d=a.DERTaggedObject,e=a.x509.GeneralNames;b.crypto.Util.isKey;this.asn1KID=null;this.asn1CertIssuer=null;this.asn1CertSN=null;this.getExtnValueHex=function(){var h=new Array();if(this.asn1KID){h.push(new d({explicit:false,tag:"80",obj:this.asn1KID}));}if(this.asn1CertIssuer){h.push(new d({explicit:false,tag:"a1",obj:new e([{dn:this.asn1CertIssuer}])}));}if(this.asn1CertSN){h.push(new d({explicit:false,tag:"82",obj:this.asn1CertSN}));}var g=new a.DERSequence({array:h});this.asn1ExtnValue=g;return this.asn1ExtnValue.getEncodedHex()};this.setKIDByParam=function(i){if(i.str!==undefined||i.hex!==undefined){this.asn1KID=new KJUR.asn1.DEROctetString(i);}else {if((typeof i==="object"&&KJUR.crypto.Util.isKey(i))||(typeof i==="string"&&i.indexOf("BEGIN ")!=-1)){var h=i;if(typeof i==="string"){h=KEYUTIL.getKey(i);}var g=KEYUTIL.getKeyID(h);this.asn1KID=new KJUR.asn1.DEROctetString({hex:g});}}};this.setCertIssuerByParam=function(g){if(g.str!==undefined||g.ldapstr!==undefined||g.hex!==undefined||g.certsubject!==undefined||g.certissuer!==undefined){this.asn1CertIssuer=new KJUR.asn1.x509.X500Name(g);}else {if(typeof g==="string"&&g.indexOf("BEGIN ")!=-1&&g.indexOf("CERTIFICATE")!=-1){this.asn1CertIssuer=new KJUR.asn1.x509.X500Name({certissuer:g});}}};this.setCertSNByParam=function(i){if(i.str!==undefined||i.bigint!==undefined||i.hex!==undefined){this.asn1CertSN=new KJUR.asn1.DERInteger(i);}else {if(typeof i==="string"&&i.indexOf("BEGIN ")!=-1&&i.indexOf("CERTIFICATE")){var g=new X509();g.readCertPEM(i);var h=g.getSerialNumberHex();this.asn1CertSN=new KJUR.asn1.DERInteger({hex:h});}}};this.oid="2.5.29.35";if(f!==undefined){if(f.kid!==undefined){this.setKIDByParam(f.kid);}if(f.issuer!==undefined){this.setCertIssuerByParam(f.issuer);}if(f.sn!==undefined){this.setCertSNByParam(f.sn);}if(f.issuersn!==undefined&&typeof f.issuersn==="string"&&f.issuersn.indexOf("BEGIN ")!=-1&&f.issuersn.indexOf("CERTIFICATE")){this.setCertSNByParam(f.issuersn);this.setCertIssuerByParam(f.issuersn);}}};YAHOO.lang.extend(KJUR.asn1.x509.AuthorityKeyIdentifier,KJUR.asn1.x509.Extension);KJUR.asn1.x509.SubjectKeyIdentifier=function(d){KJUR.asn1.x509.SubjectKeyIdentifier.superclass.constructor.call(this,d);var b=KJUR,a=b.asn1,c=a.DEROctetString;this.asn1KID=null;this.getExtnValueHex=function(){this.asn1ExtnValue=this.asn1KID;return this.asn1ExtnValue.getEncodedHex()};this.setKIDByParam=function(g){if(g.str!==undefined||g.hex!==undefined){this.asn1KID=new c(g);}else {if((typeof g==="object"&&KJUR.crypto.Util.isKey(g))||(typeof g==="string"&&g.indexOf("BEGIN")!=-1)){var f=g;if(typeof g==="string"){f=KEYUTIL.getKey(g);}var e=KEYUTIL.getKeyID(f);this.asn1KID=new KJUR.asn1.DEROctetString({hex:e});}}};this.oid="2.5.29.14";if(d!==undefined){if(d.kid!==undefined){this.setKIDByParam(d.kid);}}};YAHOO.lang.extend(KJUR.asn1.x509.SubjectKeyIdentifier,KJUR.asn1.x509.Extension);KJUR.asn1.x509.AuthorityInfoAccess=function(a){KJUR.asn1.x509.AuthorityInfoAccess.superclass.constructor.call(this,a);this.setAccessDescriptionArray=function(k){var d=new Array(),b=KJUR,g=b.asn1,c=g.DERSequence,j=g.DERObjectIdentifier,l=g.x509.GeneralName;for(var f=0;f<k.length;f++){var e;var h=k[f];if(h.ocsp!==undefined){e=new c({array:[new j({oid:"1.3.6.1.5.5.7.48.1"}),new l({uri:h.ocsp})]});}else {if(h.caissuer!==undefined){e=new c({array:[new j({oid:"1.3.6.1.5.5.7.48.2"}),new l({uri:h.caissuer})]});}else {throw new Error("unknown AccessMethod parameter: "+JSON.stringify(h))}}d.push(e);}this.asn1ExtnValue=new c({array:d});};this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.oid="1.3.6.1.5.5.7.1.1";if(a!==undefined){if(a.array!==undefined){this.setAccessDescriptionArray(a.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.AuthorityInfoAccess,KJUR.asn1.x509.Extension);KJUR.asn1.x509.SubjectAltName=function(a){KJUR.asn1.x509.SubjectAltName.superclass.constructor.call(this,a);this.setNameArray=function(b){this.asn1ExtnValue=new KJUR.asn1.x509.GeneralNames(b);};this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.17";if(a!==undefined){if(a.array!==undefined){this.setNameArray(a.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.SubjectAltName,KJUR.asn1.x509.Extension);KJUR.asn1.x509.IssuerAltName=function(a){KJUR.asn1.x509.IssuerAltName.superclass.constructor.call(this,a);this.setNameArray=function(b){this.asn1ExtnValue=new KJUR.asn1.x509.GeneralNames(b);};this.getExtnValueHex=function(){return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.18";if(a!==undefined){if(a.array!==undefined){this.setNameArray(a.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.IssuerAltName,KJUR.asn1.x509.Extension);KJUR.asn1.x509.SubjectDirectoryAttributes=function(e){KJUR.asn1.x509.SubjectDirectoryAttributes.superclass.constructor.call(this,e);var c=KJUR.asn1,a=c.DERSequence,b=c.ASN1Util.newObject,d=c.x509.OID.name2oid;this.params=null;this.getExtnValueHex=function(){var f=[];for(var j=0;j<this.params.array.length;j++){var k=this.params.array[j];var h={seq:[{oid:"1.2.3.4"},{set:[{utf8str:"DE"}]}]};if(k.attr=="dateOfBirth"){h.seq[0].oid=d(k.attr);h.seq[1].set[0]={gentime:k.str};}else {if(k.attr=="placeOfBirth"){h.seq[0].oid=d(k.attr);h.seq[1].set[0]={utf8str:k.str};}else {if(k.attr=="gender"){h.seq[0].oid=d(k.attr);h.seq[1].set[0]={prnstr:k.str};}else {if(k.attr=="countryOfCitizenship"){h.seq[0].oid=d(k.attr);h.seq[1].set[0]={prnstr:k.str};}else {if(k.attr=="countryOfResidence"){h.seq[0].oid=d(k.attr);h.seq[1].set[0]={prnstr:k.str};}else {throw new Error("unsupported attribute: "+k.attr)}}}}}f.push(new b(h));}var g=new a({array:f});this.asn1ExtnValue=g;return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.9";if(e!==undefined){this.params=e;}};YAHOO.lang.extend(KJUR.asn1.x509.SubjectDirectoryAttributes,KJUR.asn1.x509.Extension);KJUR.asn1.x509.PrivateExtension=function(f){KJUR.asn1.x509.PrivateExtension.superclass.constructor.call(this,f);var c=KJUR,e=c.lang.String.isHex,b=c.asn1,d=b.x509.OID.name2oid,a=b.ASN1Util.newObject;this.params=null;this.setByParam=function(g){this.oid=d(g.extname);this.params=g;};this.getExtnValueHex=function(){if(this.params.extname==undefined||this.params.extn==undefined){throw new Error("extname or extnhex not specified")}var h=this.params.extn;if(typeof h=="string"&&e(h)){return h}else {if(typeof h=="object"){try{return a(h).getEncodedHex()}catch(g){}}}throw new Error("unsupported extn value")};if(f!=undefined){this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.x509.PrivateExtension,KJUR.asn1.x509.Extension);KJUR.asn1.x509.CRL=function(g){KJUR.asn1.x509.CRL.superclass.constructor.call(this);var c=KJUR,b=c.asn1,a=b.DERSequence,e=b.DERBitString,f=b.x509,d=f.AlgorithmIdentifier,h=f.TBSCertList;this.params=undefined;this.setByParam=function(i){this.params=i;};this.sign=function(){var j=(new h(this.params)).getEncodedHex();var k=new KJUR.crypto.Signature({alg:this.params.sigalg});k.init(this.params.cakey);k.updateHex(j);var i=k.sign();this.params.sighex=i;};this.getPEM=function(){return hextopem(this.getEncodedHex(),"X509 CRL")};this.getEncodedHex=function(){var k=this.params;if(k.tbsobj==undefined){k.tbsobj=new h(k);}if(k.sighex==undefined&&k.cakey!=undefined){this.sign();}if(k.sighex==undefined){throw new Error("sighex or cakey parameter not defined")}var i=[];i.push(k.tbsobj);i.push(new d({name:k.sigalg}));i.push(new e({hex:"00"+k.sighex}));var j=new a({array:i});return j.getEncodedHex()};if(g!=undefined){this.params=g;}};YAHOO.lang.extend(KJUR.asn1.x509.CRL,KJUR.asn1.ASN1Object);KJUR.asn1.x509.TBSCertList=function(f){KJUR.asn1.x509.TBSCertList.superclass.constructor.call(this);var b=KJUR,i=b.asn1,h=i.DERInteger,g=i.DERSequence,c=i.DERTaggedObject;i.DERObjectIdentifier;var d=i.x509,l=d.AlgorithmIdentifier,e=d.Time,j=d.Extensions,a=d.X500Name;this.params=null;this.setByParam=function(m){this.params=m;};this.getRevCertSequence=function(){var m=[];var n=this.params.revcert;for(var o=0;o<n.length;o++){var p=[new h(n[o].sn),new e(n[o].date)];if(n[o].ext!=undefined){p.push(new j(n[o].ext));}m.push(new g({array:p}));}return new g({array:m})};this.getEncodedHex=function(){var n=[];var r=this.params;if(r.version!=undefined){var m=r.version-1;var p=new h({"int":m});n.push(p);}n.push(new l({name:r.sigalg}));n.push(new a(r.issuer));n.push(new e(r.thisupdate));if(r.nextupdate!=undefined){n.push(new e(r.nextupdate));}if(r.revcert!=undefined){n.push(this.getRevCertSequence());}if(r.ext!=undefined){var q=new j(r.ext);n.push(new c({tag:"a0",explicit:true,obj:q}));}var o=new g({array:n});return o.getEncodedHex()};if(f!==undefined){this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.x509.TBSCertList,KJUR.asn1.ASN1Object);KJUR.asn1.x509.CRLEntry=function(e){KJUR.asn1.x509.CRLEntry.superclass.constructor.call(this);var b=KJUR,a=b.asn1;this.setCertSerial=function(f){this.sn=new a.DERInteger(f);};this.setRevocationDate=function(f){this.time=new a.x509.Time(f);};this.getEncodedHex=function(){var f=new a.DERSequence({array:[this.sn,this.time]});this.TLV=f.getEncodedHex();return this.TLV};if(e!==undefined){if(e.time!==undefined){this.setRevocationDate(e.time);}if(e.sn!==undefined){this.setCertSerial(e.sn);}}};YAHOO.lang.extend(KJUR.asn1.x509.CRLEntry,KJUR.asn1.ASN1Object);KJUR.asn1.x509.CRLNumber=function(a){KJUR.asn1.x509.CRLNumber.superclass.constructor.call(this,a);this.params=undefined;this.getExtnValueHex=function(){this.asn1ExtnValue=new KJUR.asn1.DERInteger(this.params.num);return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.20";if(a!=undefined){this.params=a;}};YAHOO.lang.extend(KJUR.asn1.x509.CRLNumber,KJUR.asn1.x509.Extension);KJUR.asn1.x509.CRLReason=function(a){KJUR.asn1.x509.CRLReason.superclass.constructor.call(this,a);this.params=undefined;this.getExtnValueHex=function(){this.asn1ExtnValue=new KJUR.asn1.DEREnumerated(this.params.code);return this.asn1ExtnValue.getEncodedHex()};this.oid="2.5.29.21";if(a!=undefined){this.params=a;}};YAHOO.lang.extend(KJUR.asn1.x509.CRLReason,KJUR.asn1.x509.Extension);KJUR.asn1.x509.OCSPNonce=function(a){KJUR.asn1.x509.OCSPNonce.superclass.constructor.call(this,a);this.params=undefined;this.getExtnValueHex=function(){this.asn1ExtnValue=new KJUR.asn1.DEROctetString(this.params);return this.asn1ExtnValue.getEncodedHex()};this.oid="1.3.6.1.5.5.7.48.1.2";if(a!=undefined){this.params=a;}};YAHOO.lang.extend(KJUR.asn1.x509.OCSPNonce,KJUR.asn1.x509.Extension);KJUR.asn1.x509.OCSPNoCheck=function(a){KJUR.asn1.x509.OCSPNoCheck.superclass.constructor.call(this,a);this.params=undefined;this.getExtnValueHex=function(){this.asn1ExtnValue=new KJUR.asn1.DERNull();return this.asn1ExtnValue.getEncodedHex()};this.oid="1.3.6.1.5.5.7.48.1.5";if(a!=undefined){this.params=a;}};YAHOO.lang.extend(KJUR.asn1.x509.OCSPNoCheck,KJUR.asn1.x509.Extension);KJUR.asn1.x509.AdobeTimeStamp=function(g){KJUR.asn1.x509.AdobeTimeStamp.superclass.constructor.call(this,g);var c=KJUR,b=c.asn1,f=b.DERInteger,d=b.DERBoolean,a=b.DERSequence,e=b.x509.GeneralName;this.params=null;this.getExtnValueHex=function(){var i=this.params;var h=[new f(1)];h.push(new e({uri:i.uri}));if(i.reqauth!=undefined){h.push(new d(i.reqauth));}this.asn1ExtnValue=new a({array:h});return this.asn1ExtnValue.getEncodedHex()};this.oid="1.2.840.113583.1.1.9.1";if(g!==undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.x509.AdobeTimeStamp,KJUR.asn1.x509.Extension);KJUR.asn1.x509.X500Name=function(f){KJUR.asn1.x509.X500Name.superclass.constructor.call(this);this.asn1Array=[];this.paramArray=[];this.sRule="utf8";var c=KJUR,b=c.asn1,e=b.x509,d=e.RDN;this.setByString=function(g,l){if(l!==undefined){this.sRule=l;}var k=g.split("/");k.shift();var j=[];for(var m=0;m<k.length;m++){if(k[m].match(/^[^=]+=.+$/)){j.push(k[m]);}else {var h=j.length-1;j[h]=j[h]+"/"+k[m];}}for(var m=0;m<j.length;m++){this.asn1Array.push(new d({str:j[m],rule:this.sRule}));}};this.setByLdapString=function(g,h){if(h!==undefined){this.sRule=h;}var i=e.X500Name.ldapToCompat(g);this.setByString(i,h);};this.setByObject=function(j,i){if(i!==undefined){this.sRule=i;}for(var g in j){if(j.hasOwnProperty(g)){var h=new d({str:g+"="+j[g],rule:this.sRule});this.asn1Array?this.asn1Array.push(h):this.asn1Array=[h];}}};this.setByParam=function(h){if(h.rule!==undefined){this.sRule=h.rule;}if(h.array!==undefined){this.paramArray=h.array;}else {if(h.str!==undefined){this.setByString(h.str);}else {if(h.ldapstr!==undefined){this.setByLdapString(h.ldapstr);}else {if(h.hex!==undefined){this.hTLV=h.hex;}else {if(h.certissuer!==undefined){var g=new X509();g.readCertPEM(h.certissuer);this.hTLV=g.getIssuerHex();}else {if(h.certsubject!==undefined){var g=new X509();g.readCertPEM(h.certsubject);this.hTLV=g.getSubjectHex();}else {if(typeof h==="object"&&h.certsubject===undefined&&h.certissuer===undefined){this.setByObject(h);}}}}}}}};this.getEncodedHex=function(){if(typeof this.hTLV=="string"){return this.hTLV}if(this.asn1Array.length==0&&this.paramArray.length>0){for(var g=0;g<this.paramArray.length;g++){var k={array:this.paramArray[g]};if(this.sRule!="utf8"){k.rule=this.sRule;}var h=new d(k);this.asn1Array.push(h);}}var j=new b.DERSequence({array:this.asn1Array});this.hTLV=j.getEncodedHex();return this.hTLV};if(f!==undefined){this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.x509.X500Name,KJUR.asn1.ASN1Object);KJUR.asn1.x509.X500Name.compatToLDAP=function(d){if(d.substr(0,1)!=="/"){throw "malformed input"}d=d.substr(1);var c=d.split("/");c.reverse();c=c.map(function(a){return a.replace(/,/,"\\,")});return c.join(",")};KJUR.asn1.x509.X500Name.onelineToLDAP=function(a){return KJUR.asn1.x509.X500Name.compatToLDAP(a)};KJUR.asn1.x509.X500Name.ldapToCompat=function(g){var c=g.split(",");var e=false;var b=[];for(var f=0;c.length>0;f++){var h=c.shift();if(e===true){var d=b.pop();var j=(d+","+h).replace(/\\,/g,",");b.push(j);e=false;}else {b.push(h);}if(h.substr(-1,1)==="\\"){e=true;}}b=b.map(function(a){return a.replace("/","\\/")});b.reverse();return "/"+b.join("/")};KJUR.asn1.x509.X500Name.ldapToOneline=function(a){return KJUR.asn1.x509.X500Name.ldapToCompat(a)};KJUR.asn1.x509.RDN=function(b){KJUR.asn1.x509.RDN.superclass.constructor.call(this);this.asn1Array=[];this.paramArray=[];this.sRule="utf8";var a=KJUR.asn1.x509.AttributeTypeAndValue;this.setByParam=function(c){if(c.rule!==undefined){this.sRule=c.rule;}if(c.str!==undefined){this.addByMultiValuedString(c.str);}if(c.array!==undefined){this.paramArray=c.array;}};this.addByString=function(c){this.asn1Array.push(new KJUR.asn1.x509.AttributeTypeAndValue({str:c,rule:this.sRule}));};this.addByMultiValuedString=function(e){var c=KJUR.asn1.x509.RDN.parseString(e);for(var d=0;d<c.length;d++){this.addByString(c[d]);}};this.getEncodedHex=function(){if(this.asn1Array.length==0&&this.paramArray.length>0){for(var d=0;d<this.paramArray.length;d++){var f=this.paramArray[d];if(f.rule!==undefined&&this.sRule!="utf8"){f.rule=this.sRule;}var c=new a(f);this.asn1Array.push(c);}}var e=new KJUR.asn1.DERSet({array:this.asn1Array});this.TLV=e.getEncodedHex();return this.TLV};if(b!==undefined){this.setByParam(b);}};YAHOO.lang.extend(KJUR.asn1.x509.RDN,KJUR.asn1.ASN1Object);KJUR.asn1.x509.RDN.parseString=function(m){var j=m.split(/\+/);var h=false;var c=[];for(var g=0;j.length>0;g++){var k=j.shift();if(h===true){var f=c.pop();var d=(f+"+"+k).replace(/\\\+/g,"+");c.push(d);h=false;}else {c.push(k);}if(k.substr(-1,1)==="\\"){h=true;}}var l=false;var b=[];for(var g=0;c.length>0;g++){var k=c.shift();if(l===true){var e=b.pop();if(k.match(/"$/)){var d=(e+"+"+k).replace(/^([^=]+)="(.*)"$/,"$1=$2");b.push(d);l=false;}else {b.push(e+"+"+k);}}else {b.push(k);}if(k.match(/^[^=]+="/)){l=true;}}return b};KJUR.asn1.x509.AttributeTypeAndValue=function(c){KJUR.asn1.x509.AttributeTypeAndValue.superclass.constructor.call(this);this.sRule="utf8";this.sType=null;this.sValue=null;this.dsType=null;var a=KJUR,g=a.asn1,d=g.DERSequence,l=g.DERUTF8String,i=g.DERPrintableString,h=g.DERTeletexString,b=g.DERIA5String,e=g.DERVisibleString,k=g.DERBMPString,f=a.lang.String.isMail,j=a.lang.String.isPrintable;this.setByParam=function(o){if(o.rule!==undefined){this.sRule=o.rule;}if(o.ds!==undefined){this.dsType=o.ds;}if(o.value===undefined&&o.str!==undefined){var n=o.str;var m=n.match(/^([^=]+)=(.+)$/);if(m){this.sType=m[1];this.sValue=m[2];}else {throw new Error("malformed attrTypeAndValueStr: "+attrTypeAndValueStr)}}else {this.sType=o.type;this.sValue=o.value;}};this.setByString=function(n,o){if(o!==undefined){this.sRule=o;}var m=n.match(/^([^=]+)=(.+)$/);if(m){this.setByAttrTypeAndValueStr(m[1],m[2]);}else {throw new Error("malformed attrTypeAndValueStr: "+attrTypeAndValueStr)}};this._getDsType=function(){var o=this.sType;var n=this.sValue;var m=this.sRule;if(m==="prn"){if(o=="CN"&&f(n)){return "ia5"}if(j(n)){return "prn"}return "utf8"}else {if(m==="utf8"){if(o=="CN"&&f(n)){return "ia5"}if(o=="C"){return "prn"}return "utf8"}}return "utf8"};this.setByAttrTypeAndValueStr=function(o,n,m){if(m!==undefined){this.sRule=m;}this.sType=o;this.sValue=n;};this.getValueObj=function(n,m){if(n=="utf8"){return new l({str:m})}if(n=="prn"){return new i({str:m})}if(n=="tel"){return new h({str:m})}if(n=="ia5"){return new b({str:m})}if(n=="vis"){return new e({str:m})}if(n=="bmp"){return new k({str:m})}throw new Error("unsupported directory string type: type="+n+" value="+m)};this.getEncodedHex=function(){if(this.dsType==null){this.dsType=this._getDsType();}var n=KJUR.asn1.x509.OID.atype2obj(this.sType);var m=this.getValueObj(this.dsType,this.sValue);var p=new d({array:[n,m]});this.TLV=p.getEncodedHex();return this.TLV};if(c!==undefined){this.setByParam(c);}};YAHOO.lang.extend(KJUR.asn1.x509.AttributeTypeAndValue,KJUR.asn1.ASN1Object);KJUR.asn1.x509.SubjectPublicKeyInfo=function(f){KJUR.asn1.x509.SubjectPublicKeyInfo.superclass.constructor.call(this);var a=KJUR,j=a.asn1,i=j.DERInteger,b=j.DERBitString,m=j.DERObjectIdentifier,e=j.DERSequence,h=j.ASN1Util.newObject,d=j.x509,o=d.AlgorithmIdentifier,g=a.crypto;g.ECDSA;g.DSA;this.getASN1Object=function(){if(this.asn1AlgId==null||this.asn1SubjPKey==null){throw "algId and/or subjPubKey not set"}var p=new e({array:[this.asn1AlgId,this.asn1SubjPKey]});return p};this.getEncodedHex=function(){var p=this.getASN1Object();this.hTLV=p.getEncodedHex();return this.hTLV};this.setPubKey=function(q){try{if(q instanceof RSAKey){var u=h({seq:[{"int":{bigint:q.n}},{"int":{"int":q.e}}]});var s=u.getEncodedHex();this.asn1AlgId=new o({name:"rsaEncryption"});this.asn1SubjPKey=new b({hex:"00"+s});}}catch(p){}try{if(q instanceof KJUR.crypto.ECDSA){var r=new m({name:q.curveName});this.asn1AlgId=new o({name:"ecPublicKey",asn1params:r});this.asn1SubjPKey=new b({hex:"00"+q.pubKeyHex});}}catch(p){}try{if(q instanceof KJUR.crypto.DSA){var r=new h({seq:[{"int":{bigint:q.p}},{"int":{bigint:q.q}},{"int":{bigint:q.g}}]});this.asn1AlgId=new o({name:"dsa",asn1params:r});var t=new i({bigint:q.y});this.asn1SubjPKey=new b({hex:"00"+t.getEncodedHex()});}}catch(p){}};if(f!==undefined){this.setPubKey(f);}};YAHOO.lang.extend(KJUR.asn1.x509.SubjectPublicKeyInfo,KJUR.asn1.ASN1Object);KJUR.asn1.x509.Time=function(f){KJUR.asn1.x509.Time.superclass.constructor.call(this);var d=KJUR,c=d.asn1,b=c.DERUTCTime,g=c.DERGeneralizedTime;this.setTimeParams=function(h){this.timeParams=h;};this.getEncodedHex=function(){var h=null;if(this.timeParams!=null){if(this.type=="utc"){h=new b(this.timeParams);}else {h=new g(this.timeParams);}}else {if(this.type=="utc"){h=new b();}else {h=new g();}}this.TLV=h.getEncodedHex();return this.TLV};this.type="utc";if(f!==undefined){if(f.type!==undefined){this.type=f.type;}else {if(f.str!==undefined){if(f.str.match(/^[0-9]{12}Z$/)){this.type="utc";}if(f.str.match(/^[0-9]{14}Z$/)){this.type="gen";}}}this.timeParams=f;}};YAHOO.lang.extend(KJUR.asn1.x509.Time,KJUR.asn1.ASN1Object);KJUR.asn1.x509.AlgorithmIdentifier=function(e){KJUR.asn1.x509.AlgorithmIdentifier.superclass.constructor.call(this);this.nameAlg=null;this.asn1Alg=null;this.asn1Params=null;this.paramEmpty=false;var b=KJUR,a=b.asn1,c=a.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV;this.getEncodedHex=function(){if(this.nameAlg===null&&this.asn1Alg===null){throw new Error("algorithm not specified")}if(this.nameAlg!==null){var f=null;for(var h in c){if(h===this.nameAlg){f=c[h];}}if(f!==null){this.hTLV=f;return this.hTLV}}if(this.nameAlg!==null&&this.asn1Alg===null){this.asn1Alg=a.x509.OID.name2obj(this.nameAlg);}var g=[this.asn1Alg];if(this.asn1Params!==null){g.push(this.asn1Params);}var i=new a.DERSequence({array:g});this.hTLV=i.getEncodedHex();return this.hTLV};if(e!==undefined){if(e.name!==undefined){this.nameAlg=e.name;}if(e.asn1params!==undefined){this.asn1Params=e.asn1params;}if(e.paramempty!==undefined){this.paramEmpty=e.paramempty;}}if(this.asn1Params===null&&this.paramEmpty===false&&this.nameAlg!==null){if(this.nameAlg.name!==undefined){this.nameAlg=this.nameAlg.name;}var d=this.nameAlg.toLowerCase();if(d.substr(-7,7)!=="withdsa"&&d.substr(-9,9)!=="withecdsa"){this.asn1Params=new a.DERNull();}}};YAHOO.lang.extend(KJUR.asn1.x509.AlgorithmIdentifier,KJUR.asn1.ASN1Object);KJUR.asn1.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV={SHAwithRSAandMGF1:"300d06092a864886f70d01010a3000",SHA256withRSAandMGF1:"303d06092a864886f70d01010a3030a00d300b0609608648016503040201a11a301806092a864886f70d010108300b0609608648016503040201a203020120",SHA384withRSAandMGF1:"303d06092a864886f70d01010a3030a00d300b0609608648016503040202a11a301806092a864886f70d010108300b0609608648016503040202a203020130",SHA512withRSAandMGF1:"303d06092a864886f70d01010a3030a00d300b0609608648016503040203a11a301806092a864886f70d010108300b0609608648016503040203a203020140"};KJUR.asn1.x509.GeneralName=function(e){KJUR.asn1.x509.GeneralName.superclass.constructor.call(this);var k={rfc822:"81",dns:"82",dn:"a4",uri:"86",ip:"87"},b=KJUR,g=b.asn1;g.DERSequence;var j=g.DEROctetString,d=g.DERIA5String,c=g.DERTaggedObject,l=g.ASN1Object,a=g.x509.X500Name,h=pemtohex;this.explicit=false;this.setByParam=function(p){var u=null;if(p===undefined){return}if(p.rfc822!==undefined){this.type="rfc822";u=new d({str:p[this.type]});}if(p.dns!==undefined){this.type="dns";u=new d({str:p[this.type]});}if(p.uri!==undefined){this.type="uri";u=new d({str:p[this.type]});}if(p.dn!==undefined){this.type="dn";this.explicit=true;if(typeof p.dn==="string"){u=new a({str:p.dn});}else {if(p.dn instanceof KJUR.asn1.x509.X500Name){u=p.dn;}else {u=new a(p.dn);}}}if(p.ldapdn!==undefined){this.type="dn";this.explicit=true;u=new a({ldapstr:p.ldapdn});}if(p.certissuer!==undefined){this.type="dn";this.explicit=true;var o=p.certissuer;var w=null;if(o.match(/^[0-9A-Fa-f]+$/));if(o.indexOf("-----BEGIN ")!=-1){w=h(o);}if(w==null){throw "certissuer param not cert"}var t=new X509();t.hex=w;var y=t.getIssuerHex();u=new l();u.hTLV=y;}if(p.certsubj!==undefined){this.type="dn";this.explicit=true;var o=p.certsubj;var w=null;if(o.match(/^[0-9A-Fa-f]+$/));if(o.indexOf("-----BEGIN ")!=-1){w=h(o);}if(w==null){throw "certsubj param not cert"}var t=new X509();t.hex=w;var y=t.getSubjectHex();u=new l();u.hTLV=y;}if(p.ip!==undefined){this.type="ip";this.explicit=false;var q=p.ip;var s;var n="malformed IP address";if(q.match(/^[0-9.]+[.][0-9.]+$/)){s=intarystrtohex("["+q.split(".").join(",")+"]");if(s.length!==8){throw n}}else {if(q.match(/^[0-9A-Fa-f:]+:[0-9A-Fa-f:]+$/)){s=ipv6tohex(q);}else {if(q.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)){s=q;}else {throw n}}}u=new j({hex:s});}if(this.type==null){throw "unsupported type in params="+p}this.asn1Obj=new c({explicit:this.explicit,tag:k[this.type],obj:u});};this.getEncodedHex=function(){return this.asn1Obj.getEncodedHex()};if(e!==undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.x509.GeneralName,KJUR.asn1.ASN1Object);KJUR.asn1.x509.GeneralNames=function(d){KJUR.asn1.x509.GeneralNames.superclass.constructor.call(this);var c=KJUR,b=c.asn1;this.setByParamArray=function(g){for(var e=0;e<g.length;e++){var f=new b.x509.GeneralName(g[e]);this.asn1Array.push(f);}};this.getEncodedHex=function(){var e=new b.DERSequence({array:this.asn1Array});return e.getEncodedHex()};this.asn1Array=new Array();if(typeof d!="undefined"){this.setByParamArray(d);}};YAHOO.lang.extend(KJUR.asn1.x509.GeneralNames,KJUR.asn1.ASN1Object);KJUR.asn1.x509.OID=new function(a){this.atype2oidList={CN:"2.5.4.3",L:"2.5.4.7",ST:"2.5.4.8",O:"2.5.4.10",OU:"2.5.4.11",C:"2.5.4.6",STREET:"2.5.4.9",DC:"0.9.2342.19200300.100.1.25",UID:"0.9.2342.19200300.100.1.1",SN:"2.5.4.4",T:"2.5.4.12",DN:"2.5.4.49",E:"1.2.840.113549.1.9.1",description:"2.5.4.13",businessCategory:"2.5.4.15",postalCode:"2.5.4.17",serialNumber:"2.5.4.5",uniqueIdentifier:"2.5.4.45",organizationIdentifier:"2.5.4.97",jurisdictionOfIncorporationL:"1.3.6.1.4.1.311.60.2.1.1",jurisdictionOfIncorporationSP:"1.3.6.1.4.1.311.60.2.1.2",jurisdictionOfIncorporationC:"1.3.6.1.4.1.311.60.2.1.3"};this.name2oidList={sha1:"1.3.14.3.2.26",sha256:"2.16.840.1.101.3.4.2.1",sha384:"2.16.840.1.101.3.4.2.2",sha512:"2.16.840.1.101.3.4.2.3",sha224:"2.16.840.1.101.3.4.2.4",md5:"1.2.840.113549.2.5",md2:"1.3.14.7.2.2.1",ripemd160:"1.3.36.3.2.1",MD2withRSA:"1.2.840.113549.1.1.2",MD4withRSA:"1.2.840.113549.1.1.3",MD5withRSA:"1.2.840.113549.1.1.4",SHA1withRSA:"1.2.840.113549.1.1.5","pkcs1-MGF":"1.2.840.113549.1.1.8",rsaPSS:"1.2.840.113549.1.1.10",SHA224withRSA:"1.2.840.113549.1.1.14",SHA256withRSA:"1.2.840.113549.1.1.11",SHA384withRSA:"1.2.840.113549.1.1.12",SHA512withRSA:"1.2.840.113549.1.1.13",SHA1withECDSA:"1.2.840.10045.4.1",SHA224withECDSA:"1.2.840.10045.4.3.1",SHA256withECDSA:"1.2.840.10045.4.3.2",SHA384withECDSA:"1.2.840.10045.4.3.3",SHA512withECDSA:"1.2.840.10045.4.3.4",dsa:"1.2.840.10040.4.1",SHA1withDSA:"1.2.840.10040.4.3",SHA224withDSA:"2.16.840.1.101.3.4.3.1",SHA256withDSA:"2.16.840.1.101.3.4.3.2",rsaEncryption:"1.2.840.113549.1.1.1",commonName:"2.5.4.3",countryName:"2.5.4.6",localityName:"2.5.4.7",stateOrProvinceName:"2.5.4.8",streetAddress:"2.5.4.9",organizationName:"2.5.4.10",organizationalUnitName:"2.5.4.11",domainComponent:"0.9.2342.19200300.100.1.25",userId:"0.9.2342.19200300.100.1.1",surname:"2.5.4.4",givenName:"2.5.4.42",title:"2.5.4.12",distinguishedName:"2.5.4.49",emailAddress:"1.2.840.113549.1.9.1",description:"2.5.4.13",businessCategory:"2.5.4.15",postalCode:"2.5.4.17",uniqueIdentifier:"2.5.4.45",organizationIdentifier:"2.5.4.97",jurisdictionOfIncorporationL:"1.3.6.1.4.1.311.60.2.1.1",jurisdictionOfIncorporationSP:"1.3.6.1.4.1.311.60.2.1.2",jurisdictionOfIncorporationC:"1.3.6.1.4.1.311.60.2.1.3",subjectDirectoryAttributes:"2.5.29.9",subjectKeyIdentifier:"2.5.29.14",keyUsage:"2.5.29.15",subjectAltName:"2.5.29.17",issuerAltName:"2.5.29.18",basicConstraints:"2.5.29.19",cRLNumber:"2.5.29.20",cRLReason:"2.5.29.21",nameConstraints:"2.5.29.30",cRLDistributionPoints:"2.5.29.31",certificatePolicies:"2.5.29.32",anyPolicy:"2.5.29.32.0",authorityKeyIdentifier:"2.5.29.35",policyConstraints:"2.5.29.36",extKeyUsage:"2.5.29.37",authorityInfoAccess:"1.3.6.1.5.5.7.1.1",ocsp:"1.3.6.1.5.5.7.48.1",ocspBasic:"1.3.6.1.5.5.7.48.1.1",ocspNonce:"1.3.6.1.5.5.7.48.1.2",ocspNoCheck:"1.3.6.1.5.5.7.48.1.5",caIssuers:"1.3.6.1.5.5.7.48.2",anyExtendedKeyUsage:"2.5.29.37.0",serverAuth:"1.3.6.1.5.5.7.3.1",clientAuth:"1.3.6.1.5.5.7.3.2",codeSigning:"1.3.6.1.5.5.7.3.3",emailProtection:"1.3.6.1.5.5.7.3.4",timeStamping:"1.3.6.1.5.5.7.3.8",ocspSigning:"1.3.6.1.5.5.7.3.9",dateOfBirth:"1.3.6.1.5.5.7.9.1",placeOfBirth:"1.3.6.1.5.5.7.9.2",gender:"1.3.6.1.5.5.7.9.3",countryOfCitizenship:"1.3.6.1.5.5.7.9.4",countryOfResidence:"1.3.6.1.5.5.7.9.5",ecPublicKey:"1.2.840.10045.2.1","P-256":"1.2.840.10045.3.1.7",secp256r1:"1.2.840.10045.3.1.7",secp256k1:"1.3.132.0.10",secp384r1:"1.3.132.0.34",pkcs5PBES2:"1.2.840.113549.1.5.13",pkcs5PBKDF2:"1.2.840.113549.1.5.12","des-EDE3-CBC":"1.2.840.113549.3.7",data:"1.2.840.113549.1.7.1","signed-data":"1.2.840.113549.1.7.2","enveloped-data":"1.2.840.113549.1.7.3","digested-data":"1.2.840.113549.1.7.5","encrypted-data":"1.2.840.113549.1.7.6","authenticated-data":"1.2.840.113549.1.9.16.1.2",tstinfo:"1.2.840.113549.1.9.16.1.4",signingCertificate:"1.2.840.113549.1.9.16.2.12",timeStampToken:"1.2.840.113549.1.9.16.2.14",signaturePolicyIdentifier:"1.2.840.113549.1.9.16.2.15",etsArchiveTimeStamp:"1.2.840.113549.1.9.16.2.27",signingCertificateV2:"1.2.840.113549.1.9.16.2.47",etsArchiveTimeStampV2:"1.2.840.113549.1.9.16.2.48",extensionRequest:"1.2.840.113549.1.9.14",contentType:"1.2.840.113549.1.9.3",messageDigest:"1.2.840.113549.1.9.4",signingTime:"1.2.840.113549.1.9.5",counterSignature:"1.2.840.113549.1.9.6",archiveTimeStampV3:"0.4.0.1733.2.4",pdfRevocationInfoArchival:"1.2.840.113583.1.1.8",adobeTimeStamp:"1.2.840.113583.1.1.9.1"};this.objCache={};this.name2obj=function(b){if(typeof this.objCache[b]!="undefined"){return this.objCache[b]}if(typeof this.name2oidList[b]=="undefined"){throw "Name of ObjectIdentifier not defined: "+b}var c=this.name2oidList[b];var d=new KJUR.asn1.DERObjectIdentifier({oid:c});this.objCache[b]=d;return d};this.atype2obj=function(b){if(this.objCache[b]!==undefined){return this.objCache[b]}var c;if(b.match(/^\d+\.\d+\.[0-9.]+$/)){c=b;}else {if(this.atype2oidList[b]!==undefined){c=this.atype2oidList[b];}else {if(this.name2oidList[b]!==undefined){c=this.name2oidList[b];}else {throw "AttributeType name undefined: "+b}}}var d=new KJUR.asn1.DERObjectIdentifier({oid:c});this.objCache[b]=d;return d};};KJUR.asn1.x509.OID.oid2name=function(b){var c=KJUR.asn1.x509.OID.name2oidList;for(var a in c){if(c[a]==b){return a}}return ""};KJUR.asn1.x509.OID.oid2atype=function(b){var c=KJUR.asn1.x509.OID.atype2oidList;for(var a in c){if(c[a]==b){return a}}return b};KJUR.asn1.x509.OID.name2oid=function(a){if(a.match(/^[0-9.]+$/)){return a}var b=KJUR.asn1.x509.OID.name2oidList;if(b[a]===undefined){return ""}return b[a]};KJUR.asn1.x509.X509Util={};KJUR.asn1.x509.X509Util.newCertPEM=function(e){var d=KJUR.asn1.x509;d.TBSCertificate;var a=d.Certificate;var c=new a(e);return c.getPEM()};
	if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}if(typeof KJUR.asn1.cms=="undefined"||!KJUR.asn1.cms){KJUR.asn1.cms={};}KJUR.asn1.cms.Attribute=function(f){var e=Error,d=KJUR,c=d.asn1,b=c.DERSequence,a=c.DERSet,g=c.DERObjectIdentifier;this.params=null;this.typeOid=null;this.setByParam=function(h){this.params=h;};this.getValueArray=function(){throw new e("not yet implemented abstract")};this.getEncodedHex=function(){var j=new g({oid:this.typeOid});var h=new a({array:this.getValueArray()});var i=new b({array:[j,h]});return i.getEncodedHex()};};YAHOO.lang.extend(KJUR.asn1.cms.Attribute,KJUR.asn1.ASN1Object);KJUR.asn1.cms.ContentType=function(c){var b=KJUR,a=b.asn1;a.cms.ContentType.superclass.constructor.call(this);this.typeOid="1.2.840.113549.1.9.3";this.getValueArray=function(){var d=new a.DERObjectIdentifier(this.params.type);return [d]};if(c!=undefined){this.setByParam(c);}};YAHOO.lang.extend(KJUR.asn1.cms.ContentType,KJUR.asn1.cms.Attribute);KJUR.asn1.cms.MessageDigest=function(e){var b=KJUR,a=b.asn1,c=a.DEROctetString,d=a.cms;d.MessageDigest.superclass.constructor.call(this);this.typeOid="1.2.840.113549.1.9.4";this.getValueArray=function(){var f=new c(this.params);return [f]};if(e!=undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cms.MessageDigest,KJUR.asn1.cms.Attribute);KJUR.asn1.cms.SigningTime=function(c){var b=KJUR,a=b.asn1;a.cms.SigningTime.superclass.constructor.call(this);this.typeOid="1.2.840.113549.1.9.5";this.getValueArray=function(){var d=new a.x509.Time(this.params);return [d]};if(c!=undefined){this.setByParam(c);}};YAHOO.lang.extend(KJUR.asn1.cms.SigningTime,KJUR.asn1.cms.Attribute);KJUR.asn1.cms.SigningCertificate=function(h){var e=Error,d=KJUR,c=d.asn1,b=c.DERSequence,g=c.cms,a=g.ESSCertID;d.crypto;g.SigningCertificate.superclass.constructor.call(this);this.typeOid="1.2.840.113549.1.9.16.2.12";this.getValueArray=function(){if(this.params==null||this.params==undefined||this.params.array==undefined){throw new e("parameter 'array' not specified")}var o=this.params.array;var k=[];for(var l=0;l<o.length;l++){var n=o[l];if(h.hasis==false&&(typeof n=="string"&&(n.indexOf("-----BEGIN")!=-1||ASN1HEX.isASN1HEX(n)))){n={cert:n};}if(n.hasis!=false&&h.hasis==false){n.hasis=false;}k.push(new a(n));}var j=new b({array:k});var m=new b({array:[j]});return [m]};if(h!=undefined){this.setByParam(h);}};YAHOO.lang.extend(KJUR.asn1.cms.SigningCertificate,KJUR.asn1.cms.Attribute);KJUR.asn1.cms.ESSCertID=function(g){KJUR.asn1.cms.ESSCertID.superclass.constructor.call(this);var d=Error,c=KJUR,b=c.asn1,f=b.DEROctetString,a=b.DERSequence,e=b.cms.IssuerSerial;this.params=null;this.getCertHash=function(k,h){if(k.hash!=undefined){return k.hash}if(typeof k=="string"&&k.indexOf("-----BEGIN")==-1&&!ASN1HEX.isASN1HEX(k)){return k}var i;if(typeof k=="string"){i=k;}else {if(k.cert!=undefined){i=k.cert;}else {throw new d("hash nor cert unspecified")}}var j;if(i.indexOf("-----BEGIN")!=-1){j=pemtohex(i);}else {j=i;}if(typeof k=="string"){if(k.indexOf("-----BEGIN")!=-1){j=pemtohex(k);}else {if(ASN1HEX.isASN1HEX(k)){j=k;}}}var l;if(k.alg!=undefined){l=k.alg;}else {if(h!=undefined){l=h;}else {throw new d("hash alg unspecified")}}return c.crypto.Util.hashHex(j,l)};this.getEncodedHex=function(){var k=this.params;var j=this.getCertHash(k,"sha1");var h=[];h.push(new f({hex:j}));if((typeof k=="string"&&k.indexOf("-----BEGIN")!=-1)||(k.cert!=undefined&&k.hasis!=false)||(k.issuer!=undefined&&k.serial!=undefined)){h.push(new e(k));}var i=new a({array:h});return i.getEncodedHex()};if(g!=undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cms.ESSCertID,KJUR.asn1.ASN1Object);KJUR.asn1.cms.SigningCertificateV2=function(d){var h=Error,a=KJUR,g=a.asn1,e=g.DERSequence;g.x509;var i=g.cms,c=i.ESSCertIDv2;a.crypto;i.SigningCertificateV2.superclass.constructor.call(this);this.typeOid="1.2.840.113549.1.9.16.2.47";this.getValueArray=function(){if(this.params==null||this.params==undefined||this.params.array==undefined){throw new h("parameter 'array' not specified")}var o=this.params.array;var l=[];for(var m=0;m<o.length;m++){var n=o[m];if((d.alg!=undefined||d.hasis==false)&&(typeof n=="string"&&(n.indexOf("-----BEGIN")!=-1||ASN1HEX.isASN1HEX(n)))){n={cert:n};}if(n.alg==undefined&&d.alg!=undefined){n.alg=d.alg;}if(n.hasis!=false&&d.hasis==false){n.hasis=false;}l.push(new c(n));}var k=new e({array:l});var j=new e({array:[k]});return [j]};if(d!=undefined){this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.cms.SigningCertificateV2,KJUR.asn1.cms.Attribute);KJUR.asn1.cms.ESSCertIDv2=function(h){KJUR.asn1.cms.ESSCertIDv2.superclass.constructor.call(this);var c=KJUR,b=c.asn1,f=b.DEROctetString,a=b.DERSequence,e=b.cms.IssuerSerial,g=b.x509.AlgorithmIdentifier;this.params=null;this.getEncodedHex=function(){var l=this.params;var k=this.getCertHash(l,"sha256");var i=[];if(l.alg!=undefined&&l.alg!="sha256"){i.push(new g({name:l.alg}));}i.push(new f({hex:k}));if((typeof l=="string"&&l.indexOf("-----BEGIN")!=-1)||(l.cert!=undefined&&l.hasis!=false)||(l.issuer!=undefined&&l.serial!=undefined)){i.push(new e(l));}var j=new a({array:i});return j.getEncodedHex()};if(h!=undefined){this.setByParam(h);}};YAHOO.lang.extend(KJUR.asn1.cms.ESSCertIDv2,KJUR.asn1.cms.ESSCertID);KJUR.asn1.cms.IssuerSerial=function(e){var i=Error,c=KJUR,h=c.asn1,g=h.DERInteger,f=h.DERSequence,j=h.cms,d=h.x509,a=d.GeneralNames,b=X509;j.IssuerSerial.superclass.constructor.call(this);this.setByParam=function(k){this.params=k;};this.getEncodedHex=function(){var p=this.params;var l,r;if((typeof p=="string"&&p.indexOf("-----BEGIN")!=-1)||p.cert!=undefined){var n;if(p.cert!=undefined){n=p.cert;}else {n=p;}var k=new b();k.readCertPEM(n);l=k.getIssuer();r={hex:k.getSerialNumberHex()};}else {if(p.issuer!=undefined&&p.serial){l=p.issuer;r=p.serial;}else {throw new i("cert or issuer and serial parameter not specified")}}var q=new a([{dn:l}]);var o=new g(r);var m=new f({array:[q,o]});return m.getEncodedHex()};if(e!=undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cms.IssuerSerial,KJUR.asn1.ASN1Object);KJUR.asn1.cms.SignerIdentifier=function(f){var c=KJUR,i=c.asn1;i.DERInteger;i.DERSequence;var l=i.cms,k=l.IssuerAndSerialNumber,d=l.SubjectKeyIdentifier,e=i.x509;e.X500Name;l.SignerIdentifier.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var o=this.params;if(o.type=="isssn"){var m=new k(o);return m.getEncodedHex()}else {if(o.type=="skid"){var n=new d(o);return n.getEncodedHex()}else {throw new Error("wrong property for isssn or skid")}}};if(f!=undefined){this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.cms.SignerIdentifier,KJUR.asn1.ASN1Object);KJUR.asn1.cms.IssuerAndSerialNumber=function(e){var c=KJUR,h=c.asn1,g=h.DERInteger,f=h.DERSequence,j=h.cms,d=h.x509,a=d.X500Name,b=X509,i=Error;j.IssuerAndSerialNumber.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var p=this.params;var l,r;if((typeof p=="string"&&p.indexOf("-----BEGIN")!=-1)||p.cert!=undefined){var n;if(p.cert!=undefined){n=p.cert;}else {n=p;}var k=new b();k.readCertPEM(n);l=k.getIssuer();r={hex:k.getSerialNumberHex()};}else {if(p.issuer!=undefined&&p.serial){l=p.issuer;r=p.serial;}else {throw new i("cert or issuer and serial parameter not specified")}}var q=new a(l);var o=new g(r);var m=new f({array:[q,o]});return m.getEncodedHex()};this.setByParam=function(k){this.params=k;};if(e!=undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cms.IssuerAndSerialNumber,KJUR.asn1.ASN1Object);KJUR.asn1.cms.SubjectKeyIdentifier=function(g){var d=KJUR,k=d.asn1;k.DERInteger;k.DERSequence;var j=k.ASN1Util.newObject,m=k.cms;m.IssuerAndSerialName;m.SubjectKeyIdentifier;var e=k.x509;e.X500Name;var b=X509,l=Error;m.SubjectKeyIdentifier.superclass.constructor.call(this);this.getEncodedHex=function(){var r=this.params;if(r.cert==undefined&&r.skid==undefined){throw new l("property cert nor skid undefined")}var q;if(r.cert!=undefined){var n=new b(r.cert);var o=n.getExtSubjectKeyIdentifier();q=o.kid.hex;}else {if(r.skid!=undefined){q=r.skid;}}var p=j({tag:{tage:"a0",obj:{octstr:{hex:q}}}});return p.getEncodedHex()};if(g!=undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cms.SubjectKeyIdentifier,KJUR.asn1.ASN1Object);KJUR.asn1.cms.AttributeList=function(f){var d=Error,c=KJUR,b=c.asn1,a=b.DERSet,e=b.cms;e.AttributeList.superclass.constructor.call(this);this.params=null;this.hTLV=null;this.setByParam=function(g){this.params=g;};this.getEncodedHex=function(){var o=this.params;if(this.hTLV!=null){return this.hTLV}var m=true;if(o.sortflag!=undefined){m=o.sortflag;}var j=o.array;var g=[];for(var l=0;l<j.length;l++){var n=j[l];var k=n.attr;if(k=="contentType"){g.push(new e.ContentType(n));}else {if(k=="messageDigest"){g.push(new e.MessageDigest(n));}else {if(k=="signingTime"){g.push(new e.SigningTime(n));}else {if(k=="signingCertificate"){g.push(new e.SigningCertificate(n));}else {if(k=="signingCertificateV2"){g.push(new e.SigningCertificateV2(n));}else {if(k=="signaturePolicyIdentifier"){g.push(new KJUR.asn1.cades.SignaturePolicyIdentifier(n));}else {if(k=="signatureTimeStamp"||k=="timeStampToken"){g.push(new KJUR.asn1.cades.SignatureTimeStamp(n));}else {throw new d("unknown attr: "+k)}}}}}}}}var h=new a({array:g,sortflag:m});this.hTLV=h.getEncodedHex();return this.hTLV};if(f!=undefined){this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.cms.AttributeList,KJUR.asn1.ASN1Object);KJUR.asn1.cms.SignerInfo=function(q){var n=Error,r=KJUR,i=r.asn1,c=i.DERInteger,f=i.DEROctetString,h=i.DERSequence,m=i.DERTaggedObject,k=i.cms,p=k.SignerIdentifier,l=k.AttributeList;k.ContentType;k.EncapsulatedContentInfo;k.MessageDigest;k.SignedData;var a=i.x509,s=a.AlgorithmIdentifier,b=r.crypto,o=KEYUTIL;k.SignerInfo.superclass.constructor.call(this);this.params=null;this.sign=function(){var y=this.params;var x=y.sigalg;var u=(new l(y.sattrs)).getEncodedHex();var v=o.getKey(y.signkey);var w=new b.Signature({alg:x});w.init(v);w.updateHex(u);var t=w.sign();y.sighex=t;};this.getEncodedHex=function(){var w=this.params;var t=[];t.push(new c({"int":w.version}));t.push(new p(w.id));t.push(new s({name:w.hashalg}));if(w.sattrs!=undefined){var x=new l(w.sattrs);try{t.push(new m({tag:"a0",explicit:false,obj:x}));}catch(v){throw new n("si sattr error: "+v)}}if(w.sigalgfield!=undefined){t.push(new s({name:w.sigalgfield}));}else {t.push(new s({name:w.sigalg}));}if(w.sighex==undefined&&w.signkey!=undefined){this.sign();}t.push(new f({hex:w.sighex}));if(w.uattrs!=undefined){var x=new l(w.uattrs);try{t.push(new m({tag:"a1",explicit:false,obj:x}));}catch(v){throw new n("si uattr error: "+v)}}var u=new h({array:t});return u.getEncodedHex()};if(q!=undefined){this.setByParam(q);}};YAHOO.lang.extend(KJUR.asn1.cms.SignerInfo,KJUR.asn1.ASN1Object);KJUR.asn1.cms.EncapsulatedContentInfo=function(g){var c=KJUR,b=c.asn1,e=b.DERTaggedObject,a=b.DERSequence,h=b.DERObjectIdentifier,d=b.DEROctetString,f=b.cms;f.EncapsulatedContentInfo.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var m=this.params;var i=[];i.push(new h(m.type));if(m.content!=undefined&&(m.content.hex!=undefined||m.content.str!=undefined)&&m.isDetached!=true){var k=new d(m.content);var l=new e({tag:"a0",explicit:true,obj:k});i.push(l);}var j=new a({array:i});return j.getEncodedHex()};this.setByParam=function(i){this.params=i;};if(g!=undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cms.EncapsulatedContentInfo,KJUR.asn1.ASN1Object);KJUR.asn1.cms.ContentInfo=function(g){var c=KJUR,b=c.asn1,d=b.DERTaggedObject,a=b.DERSequence,h=b.DERObjectIdentifier,f=b.x509;f.OID.name2obj;KJUR.asn1.cms.ContentInfo.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var l=this.params;var i=[];i.push(new h(l.type));var k=new d({tag:"a0",explicit:true,obj:l.obj});i.push(k);var j=new a({array:i});return j.getEncodedHex()};this.setByParam=function(i){this.params=i;};if(g!=undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cms.ContentInfo,KJUR.asn1.ASN1Object);KJUR.asn1.cms.SignedData=function(e){var a=KJUR,h=a.asn1;h.ASN1Object;var g=h.DERInteger,p=h.DERSet,f=h.DERSequence;h.DERTaggedObject;var o=h.cms,l=o.EncapsulatedContentInfo,d=o.SignerInfo,q=o.ContentInfo,k=o.CertificateSet,i=o.RevocationInfoChoices,c=h.x509,n=c.AlgorithmIdentifier;KJUR.asn1.cms.SignedData.superclass.constructor.call(this);this.params=null;this.checkAndFixParam=function(){var r=this.params;this._setDigestAlgs(r);this._setContentTypeByEContent(r);this._setMessageDigestByEContent(r);this._setSignerInfoVersion(r);this._setSignedDataVersion(r);};this._setDigestAlgs=function(v){var u={};var t=v.sinfos;for(var r=0;r<t.length;r++){var s=t[r];u[s.hashalg]=1;}v.hashalgs=Object.keys(u).sort();};this._setContentTypeByEContent=function(w){var u=w.econtent.type;var v=w.sinfos;for(var r=0;r<v.length;r++){var t=v[r];var s=this._getAttrParamByName(t,"contentType");s.type=u;}};this._setMessageDigestByEContent=function(r){var v=r.econtent;r.econtent.type;var x=v.content.hex;if(x==undefined&&v.type=="data"&&v.content.str!=undefined){x=rstrtohex(v.content.str);}var A=r.sinfos;for(var u=0;u<A.length;u++){var t=A[u];var s=t.hashalg;var z=this._getAttrParamByName(t,"messageDigest");var w=KJUR.crypto.Util.hashHex(x,s);z.hex=w;}};this._getAttrParamByName=function(t,s){var u=t.sattrs.array;for(var r=0;r<u.length;r++){if(u[r].attr==s){return u[r]}}};this._setSignerInfoVersion=function(v){var t=v.sinfos;for(var r=0;r<t.length;r++){var s=t[r];var u=1;if(s.id.type=="skid"){u=3;}s.version=u;}};this._setSignedDataVersion=function(s){var r=this._getSignedDataVersion(s);s.version=r;};this._getSignedDataVersion=function(w){if(w.revinfos!=undefined){var r=w.revinfos;for(var t=0;t<r.length;t++){var s=r[t];if(s.ocsp!=undefined){return 5}}}var v=w.sinfos;for(var t=0;t<v.length;t++){var u=w.sinfos[t];if(u.version==3){return 3}}if(w.econtent.type!="data"){return 3}return 1};this.getEncodedHex=function(){var y=this.params;if(this.getEncodedHexPrepare!=undefined){this.getEncodedHexPrepare();}if(y.fixed!=true){this.checkAndFixParam();}var r=[];r.push(new g({"int":y.version}));var w=[];for(var v=0;v<y.hashalgs.length;v++){var t=y.hashalgs[v];w.push(new n({name:t}));}r.push(new p({array:w}));r.push(new l(y.econtent));if(y.certs!=undefined){r.push(new k(y.certs));}if(y.revinfos!=undefined){r.push(new i(y.revinfos));}var u=[];for(var v=0;v<y.sinfos.length;v++){var x=y.sinfos[v];u.push(new d(x));}r.push(new p({array:u}));var s=new f({array:r});return s.getEncodedHex()};this.getContentInfo=function(){var r=new q({type:"signed-data",obj:this});return r};this.getContentInfoEncodedHex=function(){return this.getContentInfo().getEncodedHex()};if(e!=undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cms.SignedData,KJUR.asn1.ASN1Object);KJUR.asn1.cms.CertificateSet=function(f){KJUR.asn1.cms.CertificateSet.superclass.constructor.call(this);var c=Error,b=KJUR.asn1,e=b.DERTaggedObject,a=b.DERSet,d=b.ASN1Object;this.params=null;this.getEncodedHex=function(){var j=this.params;var p=[];var q;if(j instanceof Array){q=j;}else {if(j.array!=undefined){q=j.array;}else {throw new c("cert array not specified")}}for(var k=0;k<q.length;k++){var l=q[k];var n=pemtohex(l);var g=new d();g.hTLV=n;p.push(g);}var m={array:p};if(j.sortflag==false){m.sortflag=false;}var o=new a(m);var h=new e({tag:"a0",explicit:false,obj:o});return h.getEncodedHex()};if(f!=undefined){this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.cms.CertificateSet,KJUR.asn1.ASN1Object);KJUR.asn1.cms.RevocationInfoChoices=function(a){KJUR.asn1.cms.RevocationInfoChoices.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var e=this.params;if(!e instanceof Array){throw new Error("params is not array")}var b=[];for(var c=0;c<e.length;c++){b.push(new KJUR.asn1.cms.RevocationInfoChoice(e[c]));}var d=KJUR.asn1.ASN1Util.newObject({tag:{tagi:"a1",obj:{set:b}}});return d.getEncodedHex()};if(a!=undefined){this.setByParam(a);}};YAHOO.lang.extend(KJUR.asn1.cms.RevocationInfoChoices,KJUR.asn1.ASN1Object);KJUR.asn1.cms.RevocationInfoChoice=function(a){KJUR.asn1.cms.RevocationInfoChoice.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var d=this.params;if(d.crl!=undefined&&typeof d.crl=="string"){var b=d.crl;if(d.crl.indexOf("-----BEGIN")!=-1){b=pemtohex(d.crl);}return b}else {if(d.ocsp!=undefined){var c=KJUR.asn1.ASN1Util.newObject({tag:{tagi:"a1",obj:new KJUR.asn1.cms.OtherRevocationFormat(d)}});return c.getEncodedHex()}else {throw new Error("property crl or ocsp undefined")}}};if(a!=undefined){this.setByParam(a);}};YAHOO.lang.extend(KJUR.asn1.cms.RevocationInfoChoice,KJUR.asn1.ASN1Object);KJUR.asn1.cms.OtherRevocationFormat=function(f){KJUR.asn1.cms.OtherRevocationFormat.superclass.constructor.call(this);var d=Error,c=KJUR,b=c.asn1,a=b.ASN1Util.newObject,e=c.lang.String.isHex;this.params=null;this.getEncodedHex=function(){var h=this.params;if(h.ocsp==undefined){throw new d("property ocsp not specified")}if(!e(h.ocsp)||!ASN1HEX.isASN1HEX(h.ocsp)){throw new d("ocsp value not ASN.1 hex string")}var g=a({seq:[{oid:"1.3.6.1.5.5.7.16.2"},{asn1:{tlv:h.ocsp}}]});return g.getEncodedHex()};if(f!=undefined){this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.cms.OtherRevocationFormat,KJUR.asn1.ASN1Object);KJUR.asn1.cms.CMSUtil=new function(){};KJUR.asn1.cms.CMSUtil.newSignedData=function(a){return new KJUR.asn1.cms.SignedData(a)};KJUR.asn1.cms.CMSUtil.verifySignedData=function(n){var C=KJUR,p=C.asn1,s=p.cms;s.SignerInfo;s.SignedData;s.SigningTime;s.SigningCertificate;s.SigningCertificateV2;var A=p.cades;A.SignaturePolicyIdentifier;var i=C.lang.String.isHex,v=ASN1HEX,h=v.getVbyList,a=v.getTLVbyList,t=v.getIdxbyList,z=v.getChildIdx,c=v.getTLV,B=v.oidname,j=C.crypto.Util.hashHex;if(n.cms===undefined&&!i(n.cms));var E=n.cms;var g=function(J,H){var G;for(var I=3;I<6;I++){G=t(J,0,[1,0,I]);if(G!==undefined){var F=J.substr(G,2);if(F==="a0"){H.certsIdx=G;}if(F==="a1"){H.revinfosIdx=G;}if(F==="31"){H.signerinfosIdx=G;}}}};var l=function(I,F){var H=F.signerinfosIdx;if(H===undefined){return}var L=z(I,H);F.signerInfoIdxList=L;for(var G=0;G<L.length;G++){var K=L[G];var J={idx:K};k(I,J);F.signerInfos.push(J);}};var k=function(I,J){var F=J.idx;J.signerid_issuer1=a(I,F,[1,0],"30");J.signerid_serial1=h(I,F,[1,1],"02");J.hashalg=B(h(I,F,[2,0],"06"));var H=t(I,F,[3],"a0");J.idxSignedAttrs=H;f(I,J,H);var G=z(I,F);var K=G.length;if(K<6){throw "malformed SignerInfo"}J.sigalg=B(h(I,F,[K-2,0],"06"));J.sigval=h(I,F,[K-1],"04");};var f=function(L,M,F){var J=z(L,F);M.signedAttrIdxList=J;for(var K=0;K<J.length;K++){var I=J[K];var G=h(L,I,[0],"06");var H;if(G==="2a864886f70d010905"){H=hextoutf8(h(L,I,[1,0]));M.saSigningTime=H;}else {if(G==="2a864886f70d010904"){H=h(L,I,[1,0],"04");M.saMessageDigest=H;}}}};var w=function(G,F){if(h(G,0,[0],"06")!=="2a864886f70d010702"){return F}F.cmsType="signedData";F.econtent=h(G,0,[1,0,2,1,0]);g(G,F);F.signerInfos=[];l(G,F);};var o=function(J,F){var G=F.parse.signerInfos;var L=G.length;var K=true;for(var I=0;I<L;I++){var H=G[I];e(J,F,H);if(!H.isValid){K=false;}}F.isValid=K;};var x=function(F,Q,J,P){var N=Q.parse.certsIdx;var H;if(Q.certs===undefined){H=[];Q.certkeys=[];var K=z(F,N);for(var I=0;I<K.length;I++){var M=c(F,K[I]);var O=new X509();O.readCertHex(M);H[I]=O;Q.certkeys[I]=O.getPublicKey();}Q.certs=H;}else {H=Q.certs;}Q.cccc=H.length;Q.cccci=K.length;for(var I=0;I<H.length;I++){var L=O.getIssuerHex();var G=O.getSerialNumberHex();if(J.signerid_issuer1===L&&J.signerid_serial1===G){J.certkey_idx=I;}}};var e=function(F,R,I,N){I.verifyDetail={};var Q=I.verifyDetail;var K=R.parse.econtent;var G=I.hashalg;var L=I.saMessageDigest;Q.validMessageDigest=false;if(j(K,G)===L){Q.validMessageDigest=true;}x(F,R,I);Q.validSignatureValue=false;var H=I.sigalg;var M="31"+c(F,I.idxSignedAttrs).substr(2);I.signedattrshex=M;var J=R.certs[I.certkey_idx].getPublicKey();var P=new KJUR.crypto.Signature({alg:H});P.init(J);P.updateHex(M);var O=P.verify(I.sigval);Q.validSignatureValue_isValid=O;if(O===true){Q.validSignatureValue=true;}I.isValid=false;if(Q.validMessageDigest&&Q.validSignatureValue){I.isValid=true;}};var r={isValid:false,parse:{}};w(E,r.parse);o(E,r);return r};KJUR.asn1.cms.CMSParser=function(){var g=Error,a=X509,h=new a(),l=ASN1HEX,i=l.getV,b=l.getTLV,c=l.getTLVbyList,d=l.getTLVbyListEx,e=l.getVbyList,k=l.getVbyListEx,j=l.getChildIdx;this.getCMSSignedData=function(m){var o=c(m,0,[1,0]);var n=this.getSignedData(o);return n};this.getSignedData=function(o){var q=j(o,0);var v={};var p=i(o,q[0]);var n=parseInt(p,16);v.version=n;var r=b(o,q[1]);v.hashalgs=this.getHashAlgArray(r);var t=b(o,q[2]);v.econtent=this.getEContent(t);var m=d(o,0,["[0]"]);if(m!=null){v.certs=this.getCertificateSet(m);}d(o,0,["[1]"]);var s=d(o,0,[3]);v.sinfos=this.getSignerInfos(s);return v};this.getHashAlgArray=function(s){var q=j(s,0);var m=new a();var n=[];for(var r=0;r<q.length;r++){var p=b(s,q[r]);var o=m.getAlgorithmIdentifierName(p);n.push(o);}return n};this.getEContent=function(m){var n={};var p=e(m,0,[0]);var o=e(m,0,[1,0]);n.type=KJUR.asn1.x509.OID.oid2name(ASN1HEX.hextooidstr(p));n.content={hex:o};return n};this.getSignerInfos=function(p){var r=[];var m=j(p,0);for(var n=0;n<m.length;n++){var o=b(p,m[n]);var q=this.getSignerInfo(o);r.push(q);}return r};this.getSignerInfo=function(s){var y={};var u=j(s,0);var q=l.getInt(s,u[0],-1);if(q!=-1){y.version=q;}var t=b(s,u[1]);var p=this.getIssuerAndSerialNumber(t);y.id=p;var z=b(s,u[2]);var n=h.getAlgorithmIdentifierName(z);y.hashalg=n;var w=d(s,0,["[0]"]);if(w!=null){var A=this.getAttributeList(w);y.sattrs=A;}var m=d(s,0,[3]);var x=h.getAlgorithmIdentifierName(m);y.sigalg=x;var o=k(s,0,[4]);y.sighex=o;var r=d(s,0,["[1]"]);if(r!=null){var v=this.getAttributeList(r);y.uattrs=v;}return y};this.getSignerIdentifier=function(m){if(m.substr(0,2)=="30"){return this.getIssuerAndSerialNumber(m)}else {throw new Error("SKID of signerIdentifier not supported")}};this.getIssuerAndSerialNumber=function(n){var o={type:"isssn"};var m=j(n,0);var p=b(n,m[0]);o.issuer=h.getX500Name(p);var q=i(n,m[1]);o.serial={hex:q};return o};this.getAttributeList=function(q){var m=[];var n=j(q,0);for(var o=0;o<n.length;o++){var p=b(q,n[o]);var r=this.getAttribute(p);m.push(r);}return {array:m}};this.getAttribute=function(p){var t={};var q=j(p,0);var o=l.getOID(p,q[0]);var m=KJUR.asn1.x509.OID.oid2name(o);t.attr=m;var r=b(p,q[1]);var u=j(r,0);if(u.length==1){t.valhex=b(r,u[0]);}else {var s=[];for(var n=0;n<u.length;n++){s.push(b(r,u[n]));}t.valhex=s;}if(m=="contentType"){this.setContentType(t);}else {if(m=="messageDigest"){this.setMessageDigest(t);}else {if(m=="signingTime"){this.setSigningTime(t);}else {if(m=="signingCertificate"){this.setSigningCertificate(t);}else {if(m=="signingCertificateV2"){this.setSigningCertificateV2(t);}else {if(m=="signaturePolicyIdentifier"){this.setSignaturePolicyIdentifier(t);}}}}}}return t};this.setContentType=function(m){var n=l.getOIDName(m.valhex,0,null);if(n!=null){m.type=n;delete m.valhex;}};this.setSigningTime=function(o){var n=i(o.valhex,0);var m=hextoutf8(n);o.str=m;delete o.valhex;};this.setMessageDigest=function(m){var n=i(m.valhex,0);m.hex=n;delete m.valhex;};this.setSigningCertificate=function(n){var q=j(n.valhex,0);if(q.length>0){var m=b(n.valhex,q[0]);var p=j(m,0);var t=[];for(var o=0;o<p.length;o++){var s=b(m,p[o]);var u=this.getESSCertID(s);t.push(u);}n.array=t;}if(q.length>1){var r=b(n.valhex,q[1]);n.polhex=r;}delete n.valhex;};this.setSignaturePolicyIdentifier=function(s){var q=j(s.valhex,0);if(q.length>0){var r=l.getOID(s.valhex,q[0]);s.oid=r;}if(q.length>1){var m=new a();var t=j(s.valhex,q[1]);var p=b(s.valhex,t[0]);var o=m.getAlgorithmIdentifierName(p);s.alg=o;var n=i(s.valhex,t[1]);s.hash=n;}delete s.valhex;};this.setSigningCertificateV2=function(o){var s=j(o.valhex,0);if(s.length>0){var n=b(o.valhex,s[0]);var r=j(n,0);var u=[];for(var q=0;q<r.length;q++){var m=b(n,r[q]);var p=this.getESSCertIDv2(m);u.push(p);}o.array=u;}if(s.length>1){var t=b(o.valhex,s[1]);o.polhex=t;}delete o.valhex;};this.getESSCertID=function(o){var p={};var n=j(o,0);if(n.length>0){var q=i(o,n[0]);p.hash=q;}if(n.length>1){var m=b(o,n[1]);var r=this.getIssuerSerial(m);if(r.serial!=undefined){p.serial=r.serial;}if(r.issuer!=undefined){p.issuer=r.issuer;}}return p};this.getESSCertIDv2=function(q){var s={};var p=j(q,0);if(p.length<1||3<p.length){throw new g("wrong number of elements")}var r=0;if(q.substr(p[0],2)=="30"){var o=b(q,p[0]);s.alg=h.getAlgorithmIdentifierName(o);r++;}else {s.alg="sha256";}var n=i(q,p[r]);s.hash=n;if(p.length>r+1){var m=b(q,p[r+1]);var t=this.getIssuerSerial(m);s.issuer=t.issuer;s.serial=t.serial;}return s};this.getIssuerSerial=function(q){var r={};var n=j(q,0);var m=b(q,n[0]);var p=h.getGeneralNames(m);var o=p[0].dn;r.issuer=o;var s=i(q,n[1]);r.serial={hex:s};return r};this.getCertificateSet=function(p){var n=j(p,0);var m=[];for(var o=0;o<n.length;o++){var r=b(p,n[o]);if(r.substr(0,2)=="30"){var q=hextopem(r,"CERTIFICATE");m.push(q);}}return {array:m,sortflag:false}};};
	if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}if(typeof KJUR.asn1.tsp=="undefined"||!KJUR.asn1.tsp){KJUR.asn1.tsp={};}KJUR.asn1.tsp.TimeStampToken=function(d){var c=KJUR,b=c.asn1,a=b.tsp;a.TimeStampToken.superclass.constructor.call(this);this.params=null;this.getEncodedHexPrepare=function(){var e=new a.TSTInfo(this.params.econtent.content);this.params.econtent.content.hex=e.getEncodedHex();};if(d!=undefined){this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampToken,KJUR.asn1.cms.SignedData);KJUR.asn1.tsp.TSTInfo=function(f){var c=KJUR,j=c.asn1,g=j.DERSequence,i=j.DERInteger,l=j.DERBoolean,h=j.DERGeneralizedTime,n=j.DERObjectIdentifier,e=j.DERTaggedObject,k=j.tsp,d=k.MessageImprint,b=k.Accuracy;j.x509.X500Name;var o=j.x509.GeneralName;k.TSTInfo.superclass.constructor.call(this);this.dVersion=new i({"int":1});this.dPolicy=null;this.dMessageImprint=null;this.dSerial=null;this.dGenTime=null;this.dAccuracy=null;this.dOrdering=null;this.dNonce=null;this.dTsa=null;this.getEncodedHex=function(){var p=[this.dVersion];if(this.dPolicy==null){throw new Error("policy shall be specified.")}p.push(this.dPolicy);if(this.dMessageImprint==null){throw new Error("messageImprint shall be specified.")}p.push(this.dMessageImprint);if(this.dSerial==null){throw new Error("serialNumber shall be specified.")}p.push(this.dSerial);if(this.dGenTime==null){throw new Error("genTime shall be specified.")}p.push(this.dGenTime);if(this.dAccuracy!=null){p.push(this.dAccuracy);}if(this.dOrdering!=null){p.push(this.dOrdering);}if(this.dNonce!=null){p.push(this.dNonce);}if(this.dTsa!=null){p.push(this.dTsa);}var q=new g({array:p});this.hTLV=q.getEncodedHex();return this.hTLV};if(f!==undefined){if(typeof f.policy=="string"){if(!f.policy.match(/^[0-9.]+$/)){throw "policy shall be oid like 0.1.4.134"}this.dPolicy=new n({oid:f.policy});}if(f.messageImprint!==undefined){this.dMessageImprint=new d(f.messageImprint);}if(f.serial!==undefined){this.dSerial=new i(f.serial);}if(f.genTime!==undefined){this.dGenTime=new h(f.genTime);}if(f.accuracy!==undefined){this.dAccuracy=new b(f.accuracy);}if(f.ordering!==undefined&&f.ordering==true){this.dOrdering=new l();}if(f.nonce!==undefined){this.dNonce=new i(f.nonce);}if(f.tsa!==undefined){this.dTsa=new e({tag:"a0",explicit:true,obj:new o({dn:f.tsa})});}}};YAHOO.lang.extend(KJUR.asn1.tsp.TSTInfo,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.Accuracy=function(d){var c=KJUR,b=c.asn1,a=b.ASN1Util.newObject;b.tsp.Accuracy.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var f=this.params;var e=[];if(f.seconds!=undefined&&typeof f.seconds=="number"){e.push({"int":f.seconds});}if(f.millis!=undefined&&typeof f.millis=="number"){e.push({tag:{tagi:"80",obj:{"int":f.millis}}});}if(f.micros!=undefined&&typeof f.micros=="number"){e.push({tag:{tagi:"81",obj:{"int":f.micros}}});}return a({seq:e}).getEncodedHex()};if(d!=undefined){this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.tsp.Accuracy,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.MessageImprint=function(g){var c=KJUR,b=c.asn1,a=b.DERSequence,d=b.DEROctetString,f=b.x509,e=f.AlgorithmIdentifier;b.tsp.MessageImprint.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var k=this.params;var j=new e({name:k.alg});var h=new d({hex:k.hash});var i=new a({array:[j,h]});return i.getEncodedHex()};if(g!==undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.tsp.MessageImprint,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.TimeStampReq=function(c){var a=KJUR,f=a.asn1,d=f.DERSequence,e=f.DERInteger,h=f.DERBoolean;f.ASN1Object;var i=f.DERObjectIdentifier,g=f.tsp,b=g.MessageImprint;g.TimeStampReq.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var m=this.params;var k=[];k.push(new e({"int":1}));if(m.messageImprint instanceof KJUR.asn1.ASN1Object){k.push(m.messageImprint);}else {k.push(new b(m.messageImprint));}if(m.policy!=undefined){k.push(new i(m.policy));}if(m.nonce!=undefined){k.push(new e(m.nonce));}if(m.certreq==true){k.push(new h());}var l=new d({array:k});return l.getEncodedHex()};if(c!=undefined){this.setByParam(c);}};YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampReq,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.TimeStampResp=function(g){var e=KJUR,d=e.asn1,c=d.DERSequence;d.ASN1Object;var a=d.tsp,b=a.PKIStatusInfo;a.TimeStampResp.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var j=this.params;var h=[new b(j.statusinfo)];if(j.econtent!=undefined){h.push((new a.TimeStampToken(j)).getContentInfo());}if(j.tst!=undefined&&j.tst instanceof d.ASN1Object){h.push(j.tst);}var i=new c({array:h});return i.getEncodedHex()};if(g!=undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampResp,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIStatusInfo=function(d){var h=Error,a=KJUR,g=a.asn1,e=g.DERSequence,i=g.tsp,f=i.PKIStatus,c=i.PKIFreeText,b=i.PKIFailureInfo;i.PKIStatusInfo.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var l=this.params;var j=[];if(typeof l=="string"){j.push(new f(l));}else {if(l.status==undefined){throw new h("property 'status' unspecified")}j.push(new f(l.status));if(l.statusstr!=undefined){j.push(new c(l.statusstr));}if(l.failinfo!=undefined){j.push(new b(l.failinfo));}}var k=new e({array:j});return k.getEncodedHex()};if(d!=undefined){this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIStatusInfo,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIStatus=function(g){var e=Error,d=KJUR,c=d.asn1,f=c.DERInteger,b=c.tsp;b.PKIStatus.superclass.constructor.call(this);var a={granted:0,grantedWithMods:1,rejection:2,waiting:3,revocationWarning:4,revocationNotification:5};this.params=null;this.getEncodedHex=function(){var k=this.params;var j;if(typeof k=="string"){try{j=a[k];}catch(i){throw new e("undefined name: "+k)}}else {if(typeof k=="number"){j=k;}else {throw new e("unsupported params")}}return (new f({"int":j})).getEncodedHex()};if(g!=undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIStatus,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIFreeText=function(g){var f=Error,e=KJUR,d=e.asn1,b=d.DERSequence,c=d.DERUTF8String,a=d.tsp;a.PKIFreeText.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var l=this.params;if(!l instanceof Array){throw new f("wrong params: not array")}var h=[];for(var k=0;k<l.length;k++){h.push(new c({str:l[k]}));}var j=new b({array:h});return j.getEncodedHex()};if(g!=undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIFreeText,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIFailureInfo=function(h){var f=Error,e=KJUR,d=e.asn1,g=d.DERBitString,b=d.tsp,c=b.PKIFailureInfo;var a={badAlg:0,badRequest:2,badDataFormat:5,timeNotAvailable:14,unacceptedPolicy:15,unacceptedExtension:16,addInfoNotAvailable:17,systemFailure:25};c.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var k=this.params;var j;if(typeof k=="string"){try{j=a[k];}catch(i){throw new f("undefined name: "+k)}}else {if(typeof k=="number"){j=k;}else {throw new f("wrong params")}}return (new g({bin:j.toString(2)})).getEncodedHex()};if(h!=undefined){this.setByParam(h);}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIFailureInfo,KJUR.asn1.ASN1Object);KJUR.asn1.tsp.AbstractTSAAdapter=function(a){this.getTSTHex=function(c,b){throw "not implemented yet"};};KJUR.asn1.tsp.SimpleTSAAdapter=function(e){var d=KJUR,c=d.asn1,a=c.tsp,b=d.crypto.Util.hashHex;a.SimpleTSAAdapter.superclass.constructor.call(this);this.params=null;this.serial=0;this.getTSTHex=function(g,f){var i=b(g,f);this.params.econtent.content.messageImprint={alg:f,hash:i};this.params.econtent.content.serial={"int":this.serial++};var h=Math.floor(Math.random()*1000000000);this.params.econtent.content.nonce={"int":h};var j=new a.TimeStampToken(this.params);return j.getContentInfoEncodedHex()};if(e!==undefined){this.params=e;}};YAHOO.lang.extend(KJUR.asn1.tsp.SimpleTSAAdapter,KJUR.asn1.tsp.AbstractTSAAdapter);KJUR.asn1.tsp.FixedTSAAdapter=function(e){var d=KJUR,c=d.asn1,a=c.tsp,b=d.crypto.Util.hashHex;a.FixedTSAAdapter.superclass.constructor.call(this);this.params=null;this.getTSTHex=function(g,f){var h=b(g,f);this.params.econtent.content.messageImprint={alg:f,hash:h};var i=new a.TimeStampToken(this.params);return i.getContentInfoEncodedHex()};if(e!==undefined){this.params=e;}};YAHOO.lang.extend(KJUR.asn1.tsp.FixedTSAAdapter,KJUR.asn1.tsp.AbstractTSAAdapter);KJUR.asn1.tsp.TSPUtil=new function(){};KJUR.asn1.tsp.TSPUtil.newTimeStampToken=function(a){return new KJUR.asn1.tsp.TimeStampToken(a)};KJUR.asn1.tsp.TSPUtil.parseTimeStampReq=function(m){var l=ASN1HEX;var h=l.getChildIdx;var f=l.getV;var b=l.getTLV;var j={};j.certreq=false;var a=h(m,0);if(a.length<2){throw "TimeStampReq must have at least 2 items"}var e=b(m,a[1]);j.messageImprint=KJUR.asn1.tsp.TSPUtil.parseMessageImprint(e);for(var d=2;d<a.length;d++){var g=a[d];var k=m.substr(g,2);if(k=="06"){var c=f(m,g);j.policy=l.hextooidstr(c);}if(k=="02"){j.nonce=f(m,g);}if(k=="01"){j.certreq=true;}}return j};KJUR.asn1.tsp.TSPUtil.parseMessageImprint=function(c){var m=ASN1HEX;var j=m.getChildIdx;var i=m.getV;var g=m.getIdxbyList;var k={};if(c.substr(0,2)!="30"){throw "head of messageImprint hex shall be '30'"}j(c,0);var l=g(c,0,[0,0]);var e=i(c,l);var d=m.hextooidstr(e);var h=KJUR.asn1.x509.OID.oid2name(d);if(h==""){throw "hashAlg name undefined: "+d}var b=h;var f=g(c,0,[1]);k.alg=b;k.hash=i(c,f);return k};KJUR.asn1.tsp.TSPParser=function(){var a=X509,f=new a(),k=ASN1HEX,g=k.getV,b=k.getTLV,d=k.getIdxbyList,i=k.getChildIdx;var j=["granted","grantedWithMods","rejection","waiting","revocationWarning","revocationNotification"];var h={0:"badAlg",2:"badRequest",5:"badDataFormat",14:"timeNotAvailable",15:"unacceptedPolicy",16:"unacceptedExtension",17:"addInfoNotAvailable",25:"systemFailure"};this.getResponse=function(n){var l=i(n,0);if(l.length==1){return this.getPKIStatusInfo(b(n,l[0]))}else {if(l.length>1){var o=this.getPKIStatusInfo(b(n,l[0]));var m=b(n,l[1]);var p=this.getToken(m);p.statusinfo=o;return p}}};this.getToken=function(m){var l=new KJUR.asn1.cms.CMSParser;var n=l.getCMSSignedData(m);this.setTSTInfo(n);return n};this.setTSTInfo=function(l){var o=l.econtent;if(o.type=="tstinfo"){var n=o.content.hex;var m=this.getTSTInfo(n);o.content=m;}};this.getTSTInfo=function(r){var x={};var s=i(r,0);var p=g(r,s[1]);x.policy=hextooid(p);var o=b(r,s[2]);x.messageImprint=this.getMessageImprint(o);var u=g(r,s[3]);x.serial={hex:u};var y=g(r,s[4]);x.genTime={str:hextoutf8(y)};var q=0;if(s.length>5&&r.substr(s[5],2)=="30"){var v=b(r,s[5]);x.accuracy=this.getAccuracy(v);q++;}if(s.length>5+q&&r.substr(s[5+q],2)=="01"){var z=g(r,s[5+q]);if(z=="ff"){x.ordering=true;}q++;}if(s.length>5+q&&r.substr(s[5+q],2)=="02"){var n=g(r,s[5+q]);x.nonce={hex:n};q++;}if(s.length>5+q&&r.substr(s[5+q],2)=="a0"){var m=b(r,s[5+q]);m="30"+m.substr(2);pGeneralNames=f.getGeneralNames(m);var t=pGeneralNames[0].dn;x.tsa=t;q++;}if(s.length>5+q&&r.substr(s[5+q],2)=="a1"){var l=b(r,s[5+q]);l="30"+l.substr(2);var w=f.getExtParamArray(l);x.ext=w;q++;}return x};this.getAccuracy=function(q){var r={};var o=i(q,0);for(var p=0;p<o.length;p++){var m=q.substr(o[p],2);var l=g(q,o[p]);var n=parseInt(l,16);if(m=="02"){r.seconds=n;}else {if(m=="80"){r.millis=n;}else {if(m=="81"){r.micros=n;}}}}return r};this.getMessageImprint=function(n){if(n.substr(0,2)!="30"){throw new Error("head of messageImprint hex shall be x30")}var s={};i(n,0);var t=d(n,0,[0,0]);var o=g(n,t);var p=k.hextooidstr(o);var r=KJUR.asn1.x509.OID.oid2name(p);if(r==""){throw new Error("hashAlg name undefined: "+p)}var m=r;var q=d(n,0,[1]);s.alg=m;s.hash=g(n,q);return s};this.getPKIStatusInfo=function(o){var t={};var r=i(o,0);var n=0;try{var l=g(o,r[0]);var p=parseInt(l,16);t.status=j[p];}catch(s){}if(r.length>1&&o.substr(r[1],2)=="30"){var m=b(o,r[1]);t.statusstr=this.getPKIFreeText(m);n++;}if(r.length>n&&o.substr(r[1+n],2)=="03"){var q=b(o,r[1+n]);t.failinfo=this.getPKIFailureInfo(q);}return t};this.getPKIFreeText=function(n){var o=[];var l=i(n,0);for(var m=0;m<l.length;m++){o.push(k.getString(n,l[m]));}return o};this.getPKIFailureInfo=function(l){var m=k.getInt(l,0);if(h[m]!=undefined){return h[m]}else {return m}};};
	if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}if(typeof KJUR.asn1.cades=="undefined"||!KJUR.asn1.cades){KJUR.asn1.cades={};}KJUR.asn1.cades.SignaturePolicyIdentifier=function(e){var c=KJUR,b=c.asn1,a=b.cades,d=a.SignaturePolicyId;a.SignaturePolicyIdentifier.superclass.constructor.call(this);this.typeOid="1.2.840.113549.1.9.16.2.15";this.params=null;this.getValueArray=function(){return [new d(this.params)]};this.setByParam=function(f){this.params=f;};if(e!=undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cades.SignaturePolicyIdentifier,KJUR.asn1.cms.Attribute);KJUR.asn1.cades.SignaturePolicyId=function(e){var a=KJUR,g=a.asn1,f=g.DERSequence,i=g.DERObjectIdentifier,d=g.x509;d.AlgorithmIdentifier;var c=g.cades,h=c.SignaturePolicyId,b=c.OtherHashAlgAndValue;h.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var m=this.params;var k=[];k.push(new i(m.oid));k.push(new b(m));var l=new f({array:k});return l.getEncodedHex()};this.setByParam=function(k){this.params=k;};if(e!=undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cades.SignaturePolicyId,KJUR.asn1.ASN1Object);KJUR.asn1.cades.OtherHashAlgAndValue=function(e){var h=Error,a=KJUR,g=a.asn1,f=g.DERSequence,i=g.DEROctetString,d=g.x509,j=d.AlgorithmIdentifier,c=g.cades,b=c.OtherHashAlgAndValue;b.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var o=this.params;if(o.alg==undefined){throw new h("property 'alg' not specified")}if(o.hash==undefined&&o.cert==undefined){throw new h("property 'hash' nor 'cert' not specified")}var m=null;if(o.hash!=undefined){m=o.hash;}else {if(o.cert!=undefined){if(typeof o.cert!="string"){throw new h("cert not string")}var n=o.cert;if(o.cert.indexOf("-----BEGIN")!=-1){n=pemtohex(o.cert);}m=KJUR.crypto.Util.hashHex(n,o.alg);}}var k=[];k.push(new j({name:o.alg}));k.push(new i({hex:m}));var l=new f({array:k});return l.getEncodedHex()};if(e!=undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cades.OtherHashAlgAndValue,KJUR.asn1.ASN1Object);KJUR.asn1.cades.OtherHashValue=function(g){KJUR.asn1.cades.OtherHashValue.superclass.constructor.call(this);var d=Error,c=KJUR;c.lang.String.isHex;var b=c.asn1,e=b.DEROctetString;c.crypto.Util.hashHex;this.params=null;this.getEncodedHex=function(){var j=this.params;if(j.hash==undefined&&j.cert==undefined){throw new d("hash or cert not specified")}var h=null;if(j.hash!=undefined){h=j.hash;}else {if(j.cert!=undefined){if(typeof j.cert!="string"){throw new d("cert not string")}var i=j.cert;if(j.cert.indexOf("-----BEGIN")!=-1){i=pemtohex(j.cert);}h=KJUR.crypto.Util.hashHex(i,"sha1");}}return (new e({hex:h})).getEncodedHex()};if(g!=undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cades.OtherHashValue,KJUR.asn1.ASN1Object);KJUR.asn1.cades.SignatureTimeStamp=function(h){var d=Error,c=KJUR,f=c.lang.String.isHex,b=c.asn1,e=b.ASN1Object;b.x509;var a=b.cades;a.SignatureTimeStamp.superclass.constructor.call(this);this.typeOid="1.2.840.113549.1.9.16.2.14";this.params=null;this.getValueArray=function(){var l=this.params;if(l.tst!=undefined){if(f(l.tst)){var j=new e();j.hTLV=l.tst;return [j]}else {if(l.tst instanceof e){return [l.tst]}else {throw new d("params.tst has wrong value")}}}else {if(l.res!=undefined){var k=l.res;if(k instanceof e){k=k.getEncodedHex();}if(typeof k!="string"||(!f(k))){throw new d("params.res has wrong value")}ASN1HEX.getTLVbyList(k,0,[1]);var j=new e();j.hTLV=l.tst;return [j]}}};if(h!=null){this.setByParam(h);}};YAHOO.lang.extend(KJUR.asn1.cades.SignatureTimeStamp,KJUR.asn1.cms.Attribute);KJUR.asn1.cades.CompleteCertificateRefs=function(h){var f=Error,e=KJUR,d=e.asn1,b=d.DERSequence,c=d.cades,a=c.OtherCertID,g=e.lang.String.isHex;c.CompleteCertificateRefs.superclass.constructor.call(this);this.typeOid="1.2.840.113549.1.9.16.2.21";this.params=null;this.getValueArray=function(){var o=this.params;var k=[];for(var m=0;m<o.array.length;m++){var n=o.array[m];if(typeof n=="string"){if(n.indexOf("-----BEGIN")!=-1){n={cert:n};}else {if(g(n)){n={hash:n};}else {throw new f("unsupported value: "+n)}}}if(o.alg!=undefined&&n.alg==undefined){n.alg=o.alg;}if(o.hasis!=undefined&&n.hasis==undefined){n.hasis=o.hasis;}var j=new a(n);k.push(j);}var l=new b({array:k});return [l]};if(h!=undefined){this.setByParam(h);}};YAHOO.lang.extend(KJUR.asn1.cades.CompleteCertificateRefs,KJUR.asn1.cms.Attribute);KJUR.asn1.cades.OtherCertID=function(e){var a=KJUR,h=a.asn1,f=h.DERSequence,i=h.cms,g=i.IssuerSerial,c=h.cades,d=c.OtherHashValue,b=c.OtherHashAlgAndValue;c.OtherCertID.superclass.constructor.call(this);this.params=e;this.getEncodedHex=function(){var n=this.params;if(typeof n=="string"){if(n.indexOf("-----BEGIN")!=-1){n={cert:n};}else {if(_isHex(n)){n={hash:n};}}}var j=[];var m=null;if(n.alg!=undefined){m=new b(n);}else {m=new d(n);}j.push(m);if((n.cert!=undefined&&n.hasis==true)||(n.issuer!=undefined&&n.serial!=undefined)){var l=new g(n);j.push(l);}var k=new f({array:j});return k.getEncodedHex()};if(e!=undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cades.OtherCertID,KJUR.asn1.ASN1Object);KJUR.asn1.cades.OtherHash=function(g){var a=KJUR,h=a.asn1;h.cms;var c=h.cades,b=c.OtherHashAlgAndValue,e=c.OtherHashValue;a.crypto.Util.hashHex;var f=a.lang.String.isHex;c.OtherHash.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var l=this.params;if(typeof l=="string"){if(l.indexOf("-----BEGIN")!=-1){l={cert:l};}else {if(f(l)){l={hash:l};}}}var k=null;if(l.alg!=undefined){k=new b(l);}else {k=new e(l);}return k.getEncodedHex()};if(g!=undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cades.OtherHash,KJUR.asn1.ASN1Object);KJUR.asn1.cades.CAdESUtil=new function(){};KJUR.asn1.cades.CAdESUtil.parseSignedDataForAddingUnsigned=function(a){var c=new KJUR.asn1.cms.CMSParser();var b=c.getCMSSignedData(a);return b};KJUR.asn1.cades.CAdESUtil.parseSignerInfoForAddingUnsigned=function(g,q,c){var p=ASN1HEX,s=p.getChildIdx,a=p.getTLV,l=p.getV,v=KJUR,h=v.asn1,n=h.ASN1Object,j=h.cms,k=j.AttributeList,w=j.SignerInfo;var o={};var t=s(g,q);if(t.length!=6){throw "not supported items for SignerInfo (!=6)"}var d=t.shift();o.version=a(g,d);var e=t.shift();o.si=a(g,e);var m=t.shift();o.digalg=a(g,m);var f=t.shift();o.sattrs=a(g,f);var i=t.shift();o.sigalg=a(g,i);var b=t.shift();o.sig=a(g,b);o.sigval=l(g,b);var u=null;o.obj=new w();u=new n();u.hTLV=o.version;o.obj.dCMSVersion=u;u=new n();u.hTLV=o.si;o.obj.dSignerIdentifier=u;u=new n();u.hTLV=o.digalg;o.obj.dDigestAlgorithm=u;u=new n();u.hTLV=o.sattrs;o.obj.dSignedAttrs=u;u=new n();u.hTLV=o.sigalg;o.obj.dSigAlg=u;u=new n();u.hTLV=o.sig;o.obj.dSig=u;o.obj.dUnsignedAttrs=new k();return o};
	if(typeof KJUR.asn1.csr=="undefined"||!KJUR.asn1.csr){KJUR.asn1.csr={};}KJUR.asn1.csr.CertificationRequest=function(g){var d=KJUR,c=d.asn1,e=c.DERBitString,b=c.DERSequence,a=c.csr;c.x509;var h=a.CertificationRequestInfo;a.CertificationRequest.superclass.constructor.call(this);this.setByParam=function(i){this.params=i;};this.sign=function(){var j=(new h(this.params)).getEncodedHex();var k=new KJUR.crypto.Signature({alg:this.params.sigalg});k.init(this.params.sbjprvkey);k.updateHex(j);var i=k.sign();this.params.sighex=i;};this.getPEM=function(){return hextopem(this.getEncodedHex(),"CERTIFICATE REQUEST")};this.getEncodedHex=function(){var l=this.params;var j=new KJUR.asn1.csr.CertificationRequestInfo(this.params);var m=new KJUR.asn1.x509.AlgorithmIdentifier({name:l.sigalg});if(l.sighex==undefined&&l.sbjprvkey!=undefined){this.sign();}if(l.sighex==undefined){throw new Error("sighex or sbjprvkey parameter not defined")}var k=new e({hex:"00"+l.sighex});var i=new b({array:[j,m,k]});return i.getEncodedHex()};if(g!==undefined){this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.csr.CertificationRequest,KJUR.asn1.ASN1Object);KJUR.asn1.csr.CertificationRequestInfo=function(f){var b=KJUR,j=b.asn1;j.DERBitString;var g=j.DERSequence,i=j.DERInteger,n=j.DERUTF8String,d=j.DERTaggedObject,h=j.ASN1Util.newObject,l=j.csr,e=j.x509,a=e.X500Name,k=e.Extensions,m=e.SubjectPublicKeyInfo;l.CertificationRequestInfo.superclass.constructor.call(this);this.params=null;this.setByParam=function(o){if(o!=undefined){this.params=o;}};this.getEncodedHex=function(){var s=this.params;var p=[];p.push(new i({"int":0}));p.push(new a(s.subject));p.push(new m(KEYUTIL.getKey(s.sbjpubkey)));if(s.extreq!=undefined){var o=new k(s.extreq);var r=h({tag:{tag:"a0",explict:true,obj:{seq:[{oid:"1.2.840.113549.1.9.14"},{set:[o]}]}}});p.push(r);}else {p.push(new d({tag:"a0",explicit:false,obj:new n({str:""})}));}var q=new g({array:p});return q.getEncodedHex()};if(f!=undefined){this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.csr.CertificationRequestInfo,KJUR.asn1.ASN1Object);KJUR.asn1.csr.CSRUtil=new function(){};KJUR.asn1.csr.CSRUtil.newCSRPEM=function(e){var a=KJUR.asn1.csr;var c=new a.CertificationRequest(e);var d=c.getPEM();return d};KJUR.asn1.csr.CSRUtil.getParam=function(c){var m=ASN1HEX,j=m.getV;_getIdxbyList=m.getIdxbyList;_getTLVbyList=m.getTLVbyList,_getTLVbyListEx=m.getTLVbyListEx,_getVbyListEx=m.getVbyListEx;var b=function(p){var o=_getIdxbyList(p,0,[0,3,0,0],"06");if(j(p,o)!="2a864886f70d01090e"){return null}return _getTLVbyList(p,0,[0,3,0,1,0],"30")};var n={};if(c.indexOf("-----BEGIN CERTIFICATE REQUEST")==-1){throw new Error("argument is not PEM file")}var e=pemtohex(c,"CERTIFICATE REQUEST");try{var g=_getTLVbyListEx(e,0,[0,1]);if(g=="3000"){n.subject={};}else {var k=new X509();n.subject=k.getX500Name(g);}}catch(h){}var d=_getTLVbyListEx(e,0,[0,2]);var f=KEYUTIL.getKey(d,null,"pkcs8pub");n.sbjpubkey=KEYUTIL.getPEM(f,"PKCS8PUB");var i=b(e);var k=new X509();if(i!=null){n.extreq=k.getExtParamArray(i);}try{var a=_getTLVbyListEx(e,0,[1],"30");var k=new X509();n.sigalg=k.getAlgorithmIdentifierName(a);}catch(h){}try{var l=_getVbyListEx(e,0,[2]);n.sighex=l;}catch(h){}return n};
	if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={};}if(typeof KJUR.asn1.ocsp=="undefined"||!KJUR.asn1.ocsp){KJUR.asn1.ocsp={};}KJUR.asn1.ocsp.DEFAULT_HASH="sha1";KJUR.asn1.ocsp.OCSPResponse=function(e){KJUR.asn1.ocsp.OCSPResponse.superclass.constructor.call(this);KJUR.asn1.DEREnumerated;var b=KJUR.asn1.ASN1Util.newObject,c=KJUR.asn1.ocsp.ResponseBytes;var d=["successful","malformedRequest","internalError","tryLater","_not_used_","sigRequired","unauthorized"];this.params=null;this._getStatusCode=function(){var f=this.params.resstatus;if(typeof f=="number"){return f}if(typeof f!="string"){return -1}return d.indexOf(f)};this.setByParam=function(f){this.params=f;};this.getEncodedHex=function(){var h=this.params;var g=this._getStatusCode();if(g==-1){throw new Error("responseStatus not supported: "+h.resstatus)}if(g!=0){return b({seq:[{"enum":{"int":g}}]}).getEncodedHex()}var f=new c(h);return b({seq:[{"enum":{"int":0}},{tag:{tag:"a0",explicit:true,obj:f}}]}).getEncodedHex()};if(e!==undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.ocsp.OCSPResponse,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.ResponseBytes=function(e){KJUR.asn1.ocsp.ResponseBytes.superclass.constructor.call(this);var b=KJUR.asn1,a=b.DERSequence,f=b.DERObjectIdentifier,c=b.DEROctetString,d=b.ocsp.BasicOCSPResponse;this.params=null;this.setByParam=function(g){this.params=g;};this.getEncodedHex=function(){var j=this.params;if(j.restype!="ocspBasic"){throw new Error("not supported responseType: "+j.restype)}var i=new d(j);var g=[];g.push(new f({name:"ocspBasic"}));g.push(new c({hex:i.getEncodedHex()}));var h=new a({array:g});return h.getEncodedHex()};if(e!==undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.ocsp.ResponseBytes,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.BasicOCSPResponse=function(d){KJUR.asn1.ocsp.BasicOCSPResponse.superclass.constructor.call(this);var i=Error,g=KJUR.asn1,j=g.ASN1Object,e=g.DERSequence;g.DERGeneralizedTime;var c=g.DERTaggedObject,b=g.DERBitString;g.x509.Extensions;var k=g.x509.AlgorithmIdentifier,l=g.ocsp;l.ResponderID;_SingleResponseList=l.SingleResponseList,_ResponseData=l.ResponseData;this.params=null;this.setByParam=function(m){this.params=m;};this.sign=function(){var o=this.params;var m=o.tbsresp.getEncodedHex();var n=new KJUR.crypto.Signature({alg:o.sigalg});n.init(o.reskey);n.updateHex(m);o.sighex=n.sign();};this.getEncodedHex=function(){var t=this.params;if(t.tbsresp==undefined){t.tbsresp=new _ResponseData(t);}if(t.sighex==undefined&&t.reskey!=undefined){this.sign();}var n=[];n.push(t.tbsresp);n.push(new k({name:t.sigalg}));n.push(new b({hex:"00"+t.sighex}));if(t.certs!=undefined&&t.certs.length!=undefined){var m=[];for(var q=0;q<t.certs.length;q++){var s=t.certs[q];var r=null;if(ASN1HEX.isASN1HEX(s)){r=s;}else {if(s.match(/-----BEGIN/)){r=pemtohex(s);}else {throw new i("certs["+q+"] not hex or PEM")}}m.push(new j({tlv:r}));}var p=new e({array:m});n.push(new c({tag:"a0",explicit:true,obj:p}));}var o=new e({array:n});return o.getEncodedHex()};if(d!==undefined){this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.ocsp.BasicOCSPResponse,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.ResponseData=function(c){KJUR.asn1.ocsp.ResponseData.superclass.constructor.call(this);var f=KJUR.asn1,d=f.DERSequence,e=f.DERGeneralizedTime,b=f.DERTaggedObject,g=f.x509.Extensions,i=f.ocsp,a=i.ResponderID;_SingleResponseList=i.SingleResponseList;this.params=null;this.getEncodedHex=function(){var m=this.params;if(m.respid!=undefined);if(m.prodat!=undefined);if(m.array!=undefined);var j=[];j.push(new a(m.respid));j.push(new e(m.prodat));j.push(new _SingleResponseList(m.array));if(m.ext!=undefined){var l=new g(m.ext);j.push(new b({tag:"a1",explicit:true,obj:l}));}var k=new d({array:j});return k.getEncodedHex()};this.setByParam=function(j){this.params=j;};if(c!==undefined){this.setByParam(c);}};YAHOO.lang.extend(KJUR.asn1.ocsp.ResponseData,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.ResponderID=function(d){KJUR.asn1.ocsp.ResponderID.superclass.constructor.call(this);var b=KJUR.asn1,a=b.ASN1Util.newObject,c=b.x509.X500Name;this.params=null;this.getEncodedHex=function(){var f=this.params;if(f.key!=undefined){var e=a({tag:{tag:"a2",explicit:true,obj:{octstr:{hex:f.key}}}});return e.getEncodedHex()}else {if(f.name!=undefined){var e=a({tag:{tag:"a1",explicit:true,obj:new c(f.name)}});return e.getEncodedHex()}}throw new Error("key or name not specified")};this.setByParam=function(e){this.params=e;};if(d!==undefined){this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.ocsp.ResponderID,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.SingleResponseList=function(d){KJUR.asn1.ocsp.SingleResponseList.superclass.constructor.call(this);var c=KJUR.asn1,b=c.DERSequence,a=c.ocsp.SingleResponse;this.params=null;this.getEncodedHex=function(){var h=this.params;if(typeof h!="object"||h.length==undefined){throw new Error("params not specified properly")}var e=[];for(var g=0;g<h.length;g++){e.push(new a(h[g]));}var f=new b({array:e});return f.getEncodedHex()};this.setByParam=function(e){this.params=e;};if(d!==undefined){this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.ocsp.SingleResponseList,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.SingleResponse=function(e){var k=Error,a=KJUR,i=a.asn1,f=i.DERSequence,g=i.DERGeneralizedTime,b=i.DERTaggedObject,l=i.ocsp,h=l.CertID,c=l.CertStatus,d=i.x509,j=d.Extensions;l.SingleResponse.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var q=this.params;var n=[];if(q.certid==undefined){throw new k("certid unspecified")}if(q.status==undefined){throw new k("status unspecified")}if(q.thisupdate==undefined){throw new k("thisupdate unspecified")}n.push(new h(q.certid));n.push(new c(q.status));n.push(new g(q.thisupdate));if(q.nextupdate!=undefined){var m=new g(q.nextupdate);n.push(new b({tag:"a0",explicit:true,obj:m}));}if(q.ext!=undefined){var p=new j(q.ext);n.push(new b({tag:"a1",explicit:true,obj:p}));}var o=new f({array:n});return o.getEncodedHex()};this.setByParam=function(m){this.params=m;};if(e!==undefined){this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.ocsp.SingleResponse,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.CertID=function(g){var d=KJUR,k=d.asn1,m=k.DEROctetString,j=k.DERInteger,h=k.DERSequence,f=k.x509,n=f.AlgorithmIdentifier,o=k.ocsp,l=o.DEFAULT_HASH,i=d.crypto,e=i.Util.hashHex,c=X509,q=ASN1HEX;o.CertID.superclass.constructor.call(this);this.dHashAlg=null;this.dIssuerNameHash=null;this.dIssuerKeyHash=null;this.dSerialNumber=null;this.setByValue=function(t,s,p,r){if(r===undefined){r=l;}this.dHashAlg=new n({name:r});this.dIssuerNameHash=new m({hex:t});this.dIssuerKeyHash=new m({hex:s});this.dSerialNumber=new j({hex:p});};this.setByCert=function(x,t,v){if(v===undefined){v=l;}var p=new c();p.readCertPEM(t);var y=new c();y.readCertPEM(x);var z=y.getPublicKeyHex();var w=q.getTLVbyList(z,0,[1,0],"30");var r=p.getSerialNumberHex();var s=e(y.getSubjectHex(),v);var u=e(w,v);this.setByValue(s,u,r,v);this.hoge=p.getSerialNumberHex();};this.getEncodedHex=function(){if(this.dHashAlg===null&&this.dIssuerNameHash===null&&this.dIssuerKeyHash===null&&this.dSerialNumber===null){throw "not yet set values"}var p=[this.dHashAlg,this.dIssuerNameHash,this.dIssuerKeyHash,this.dSerialNumber];var r=new h({array:p});this.hTLV=r.getEncodedHex();return this.hTLV};if(g!==undefined){var b=g;if(b.issuerCert!==undefined&&b.subjectCert!==undefined){var a=l;if(b.alg===undefined){a=undefined;}this.setByCert(b.issuerCert,b.subjectCert,a);}else {if(b.issname!==undefined&&b.isskey!==undefined&&b.sbjsn!==undefined){var a=l;if(b.alg===undefined){a=undefined;}this.setByValue(b.issname,b.isskey,b.sbjsn,a);}else {throw new Error("invalid constructor arguments")}}}};YAHOO.lang.extend(KJUR.asn1.ocsp.CertID,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.CertStatus=function(a){KJUR.asn1.ocsp.CertStatus.superclass.constructor.call(this);this.params=null;this.getEncodedHex=function(){var d=this.params;if(d.status=="good"){return "8000"}if(d.status=="unknown"){return "8200"}if(d.status=="revoked"){var c=[{gentime:{str:d.time}}];if(d.reason!=undefined){c.push({tag:{tag:"a0",explicit:true,obj:{"enum":{"int":d.reason}}}});}var b={tag:"a1",explicit:false,obj:{seq:c}};return KJUR.asn1.ASN1Util.newObject({tag:b}).getEncodedHex()}throw new Error("bad status")};this.setByParam=function(b){this.params=b;};if(a!==undefined){this.setByParam(a);}};YAHOO.lang.extend(KJUR.asn1.ocsp.CertStatus,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.Request=function(f){var c=KJUR,b=c.asn1,a=b.DERSequence,d=b.ocsp;d.Request.superclass.constructor.call(this);this.dReqCert=null;this.dExt=null;this.getEncodedHex=function(){var g=[];if(this.dReqCert===null){throw "reqCert not set"}g.push(this.dReqCert);var h=new a({array:g});this.hTLV=h.getEncodedHex();return this.hTLV};if(typeof f!=="undefined"){var e=new d.CertID(f);this.dReqCert=e;}};YAHOO.lang.extend(KJUR.asn1.ocsp.Request,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.TBSRequest=function(e){var c=KJUR,b=c.asn1,a=b.DERSequence,d=b.ocsp;d.TBSRequest.superclass.constructor.call(this);this.version=0;this.dRequestorName=null;this.dRequestList=[];this.dRequestExt=null;this.setRequestListByParam=function(h){var f=[];for(var g=0;g<h.length;g++){var j=new d.Request(h[0]);f.push(j);}this.dRequestList=f;};this.getEncodedHex=function(){var f=[];if(this.version!==0){throw "not supported version: "+this.version}if(this.dRequestorName!==null){throw "requestorName not supported"}var h=new a({array:this.dRequestList});f.push(h);if(this.dRequestExt!==null){throw "requestExtensions not supported"}var g=new a({array:f});this.hTLV=g.getEncodedHex();return this.hTLV};if(e!==undefined){if(e.reqList!==undefined){this.setRequestListByParam(e.reqList);}}};YAHOO.lang.extend(KJUR.asn1.ocsp.TBSRequest,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.OCSPRequest=function(f){var c=KJUR,b=c.asn1,a=b.DERSequence,d=b.ocsp;d.OCSPRequest.superclass.constructor.call(this);this.dTbsRequest=null;this.dOptionalSignature=null;this.getEncodedHex=function(){var g=[];if(this.dTbsRequest!==null){g.push(this.dTbsRequest);}else {throw "tbsRequest not set"}if(this.dOptionalSignature!==null){throw "optionalSignature not supported"}var h=new a({array:g});this.hTLV=h.getEncodedHex();return this.hTLV};if(f!==undefined){if(f.reqList!==undefined){var e=new d.TBSRequest(f);this.dTbsRequest=e;}}};YAHOO.lang.extend(KJUR.asn1.ocsp.OCSPRequest,KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.OCSPUtil={};KJUR.asn1.ocsp.OCSPUtil.getRequestHex=function(a,b,h){var d=KJUR,c=d.asn1,e=c.ocsp;if(h===undefined){h=e.DEFAULT_HASH;}var g={alg:h,issuerCert:a,subjectCert:b};var f=new e.OCSPRequest({reqList:[g]});return f.getEncodedHex()};KJUR.asn1.ocsp.OCSPUtil.getOCSPResponseInfo=function(b){var m=ASN1HEX,c=m.getVbyList,k=m.getVbyListEx,e=m.getIdxbyList,g=m.getV;var n={};try{var j=k(b,0,[0],"0a");n.responseStatus=parseInt(j,16);}catch(f){}if(n.responseStatus!==0){return n}try{var i=e(b,0,[1,0,1,0,0,2,0,1]);if(b.substr(i,2)==="80"){n.certStatus="good";}else {if(b.substr(i,2)==="a1"){n.certStatus="revoked";n.revocationTime=hextoutf8(c(b,i,[0]));}else {if(b.substr(i,2)==="82"){n.certStatus="unknown";}}}}catch(f){}try{var a=e(b,0,[1,0,1,0,0,2,0,2]);n.thisUpdate=hextoutf8(g(b,a));}catch(f){}try{var l=e(b,0,[1,0,1,0,0,2,0,3]);if(b.substr(l,2)==="a0"){n.nextUpdate=hextoutf8(c(b,l,[0]));}}catch(f){}return n};KJUR.asn1.ocsp.OCSPParser=function(){var e=Error,a=X509,f=new a(),i=ASN1HEX,g=i.getV,b=i.getTLV,d=i.getIdxbyList,c=i.getTLVbyListEx,h=i.getChildIdx;this.getOCSPRequest=function(l){var k=h(l,0);if(k.length!=1&&k.length!=2){throw new e("wrong number elements: "+k.length)}var j=this.getTBSRequest(b(l,k[0]));return j};this.getTBSRequest=function(l){var j={};var k=c(l,0,[0],"30");j.array=this.getRequestList(k);var m=c(l,0,["[2]",0],"30");if(m!=null){j.ext=f.getExtParamArray(m);}return j};this.getRequestList=function(m){var j=[];var k=h(m,0);for(var l=0;l<k.length;l++){var m=b(m,k[l]);j.push(this.getRequest(m));}return j};this.getRequest=function(k){var j=h(k,0);if(j.length!=1&&j.length!=2){throw new e("wrong number elements: "+j.length)}var m=this.getCertID(b(k,j[0]));if(j.length==2){var l=d(k,0,[1,0]);m.ext=f.getExtParamArray(b(k,l));}return m};this.getCertID=function(m){var l=h(m,0);if(l.length!=4){throw new e("wrong number elements: "+l.length)}var k=new a();var j={};j.alg=k.getAlgorithmIdentifierName(b(m,l[0]));j.issname=g(m,l[1]);j.isskey=g(m,l[2]);j.sbjsn=g(m,l[3]);return j};};
	var KJUR;if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.lang=="undefined"||!KJUR.lang){KJUR.lang={};}KJUR.lang.String=function(){};function stoBA(d){var b=new Array();for(var c=0;c<d.length;c++){b[c]=d.charCodeAt(c);}return b}function BAtos(b){var d="";for(var c=0;c<b.length;c++){d=d+String.fromCharCode(b[c]);}return d}function BAtohex(b){var e="";for(var d=0;d<b.length;d++){var c=b[d].toString(16);if(c.length==1){c="0"+c;}e=e+c;}return e}function stohex(a){return BAtohex(stoBA(a))}function stob64(a){return hex2b64(stohex(a))}function stob64u(a){return b64tob64u(hex2b64(stohex(a)))}function b64utos(a){return BAtos(b64toBA(b64utob64(a)))}function b64tob64u(a){a=a.replace(/\=/g,"");a=a.replace(/\+/g,"-");a=a.replace(/\//g,"_");return a}function b64utob64(a){if(a.length%4==2){a=a+"==";}else {if(a.length%4==3){a=a+"=";}}a=a.replace(/-/g,"+");a=a.replace(/_/g,"/");return a}function hextob64u(a){if(a.length%2==1){a="0"+a;}return b64tob64u(hex2b64(a))}function b64utohex(a){return b64tohex(b64utob64(a))}var utf8tob64u,b64utoutf8;if(typeof Buffer==="function"){utf8tob64u=function(a){return b64tob64u(Buffer.from(a,"utf8").toString("base64"))};b64utoutf8=function(a){return Buffer.from(b64utob64(a),"base64").toString("utf8")};}else {utf8tob64u=function(a){return hextob64u(uricmptohex(encodeURIComponentAll(a)))};b64utoutf8=function(a){return decodeURIComponent(hextouricmp(b64utohex(a)))};}function utf8tob64(a){return hex2b64(uricmptohex(encodeURIComponentAll(a)))}function b64toutf8(a){return decodeURIComponent(hextouricmp(b64tohex(a)))}function utf8tohex(a){return uricmptohex(encodeURIComponentAll(a))}function hextoutf8(a){return decodeURIComponent(hextouricmp(a))}function hextorstr(c){var b="";for(var a=0;a<c.length-1;a+=2){b+=String.fromCharCode(parseInt(c.substr(a,2),16));}return b}function rstrtohex(c){var a="";for(var b=0;b<c.length;b++){a+=("0"+c.charCodeAt(b).toString(16)).slice(-2);}return a}function hextob64(a){return hex2b64(a)}function hextob64nl(b){var a=hextob64(b);var c=a.replace(/(.{64})/g,"$1\r\n");c=c.replace(/\r\n$/,"");return c}function b64nltohex(b){var a=b.replace(/[^0-9A-Za-z\/+=]*/g,"");var c=b64tohex(a);return c}function hextopem(a,b){var c=hextob64nl(a);return "-----BEGIN "+b+"-----\r\n"+c+"\r\n-----END "+b+"-----\r\n"}function pemtohex(a,b){if(a.indexOf("-----BEGIN ")==-1){throw "can't find PEM header: "+b}if(b!==undefined){a=a.replace(new RegExp("^[^]*-----BEGIN "+b+"-----"),"");a=a.replace(new RegExp("-----END "+b+"-----[^]*$"),"");}else {a=a.replace(/^[^]*-----BEGIN [^-]+-----/,"");a=a.replace(/-----END [^-]+-----[^]*$/,"");}return b64nltohex(a)}function hextoArrayBuffer(d){if(d.length%2!=0){throw "input is not even length"}if(d.match(/^[0-9A-Fa-f]+$/)==null){throw "input is not hexadecimal"}var b=new ArrayBuffer(d.length/2);var a=new DataView(b);for(var c=0;c<d.length/2;c++){a.setUint8(c,parseInt(d.substr(c*2,2),16));}return b}function ArrayBuffertohex(b){var d="";var a=new DataView(b);for(var c=0;c<b.byteLength;c++){d+=("00"+a.getUint8(c).toString(16)).slice(-2);}return d}function zulutomsec(n){var l,j,m,e,f,i,b;var a,h,g,c;c=n.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/);if(c){a=c[1];l=parseInt(a);if(a.length===2){if(50<=l&&l<100){l=1900+l;}else {if(0<=l&&l<50){l=2000+l;}}}j=parseInt(c[2])-1;m=parseInt(c[3]);e=parseInt(c[4]);f=parseInt(c[5]);i=parseInt(c[6]);b=0;h=c[7];if(h!==""){g=(h.substr(1)+"00").substr(0,3);b=parseInt(g);}return Date.UTC(l,j,m,e,f,i,b)}throw "unsupported zulu format: "+n}function zulutosec(a){var b=zulutomsec(a);return ~~(b/1000)}function zulutodate(a){return new Date(zulutomsec(a))}function datetozulu(g,e,f){var b;var a=g.getUTCFullYear();if(e){if(a<1950||2049<a){throw "not proper year for UTCTime: "+a}b=(""+a).slice(-2);}else {b=("000"+a).slice(-4);}b+=("0"+(g.getUTCMonth()+1)).slice(-2);b+=("0"+g.getUTCDate()).slice(-2);b+=("0"+g.getUTCHours()).slice(-2);b+=("0"+g.getUTCMinutes()).slice(-2);b+=("0"+g.getUTCSeconds()).slice(-2);if(f){var c=g.getUTCMilliseconds();if(c!==0){c=("00"+c).slice(-3);c=c.replace(/0+$/g,"");b+="."+c;}}b+="Z";return b}function uricmptohex(a){return a.replace(/%/g,"")}function hextouricmp(a){return a.replace(/(..)/g,"%$1")}function ipv6tohex(g){var b="malformed IPv6 address";if(!g.match(/^[0-9A-Fa-f:]+$/)){throw b}g=g.toLowerCase();var d=g.split(":").length-1;if(d<2){throw b}var e=":".repeat(7-d+2);g=g.replace("::",e);var c=g.split(":");if(c.length!=8){throw b}for(var f=0;f<8;f++){c[f]=("0000"+c[f]).slice(-4);}return c.join("")}function hextoipv6(e){if(!e.match(/^[0-9A-Fa-f]{32}$/)){throw "malformed IPv6 address octet"}e=e.toLowerCase();var b=e.match(/.{1,4}/g);for(var d=0;d<8;d++){b[d]=b[d].replace(/^0+/,"");if(b[d]==""){b[d]="0";}}e=":"+b.join(":")+":";var c=e.match(/:(0:){2,}/g);if(c===null){return e.slice(1,-1)}var f="";for(var d=0;d<c.length;d++){if(c[d].length>f.length){f=c[d];}}e=e.replace(f,"::");return e.slice(1,-1)}function hextoip(b){var d="malformed hex value";if(!b.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)){throw d}if(b.length==8){var c;try{c=parseInt(b.substr(0,2),16)+"."+parseInt(b.substr(2,2),16)+"."+parseInt(b.substr(4,2),16)+"."+parseInt(b.substr(6,2),16);return c}catch(a){throw d}}else {if(b.length==32){return hextoipv6(b)}else {return b}}}function iptohex(f){var j="malformed IP address";f=f.toLowerCase(f);if(f.match(/^[0-9.]+$/)){var b=f.split(".");if(b.length!==4){throw j}var g="";try{for(var e=0;e<4;e++){var h=parseInt(b[e]);g+=("0"+h.toString(16)).slice(-2);}return g}catch(c){throw j}}else {if(f.match(/^[0-9a-f:]+$/)&&f.indexOf(":")!==-1){return ipv6tohex(f)}else {throw j}}}function ucs2hextoutf8(d){function e(f){var h=parseInt(f.substr(0,2),16);var a=parseInt(f.substr(2),16);if(h==0&a<128){return String.fromCharCode(a)}if(h<8){var j=192|((h&7)<<3)|((a&192)>>6);var i=128|(a&63);return hextoutf8(j.toString(16)+i.toString(16))}var j=224|((h&240)>>4);var i=128|((h&15)<<2)|((a&192)>>6);var g=128|(a&63);return hextoutf8(j.toString(16)+i.toString(16)+g.toString(16))}var c=d.match(/.{4}/g);var b=c.map(e);return b.join("")}function encodeURIComponentAll(a){var d=encodeURIComponent(a);var b="";for(var c=0;c<d.length;c++){if(d[c]=="%"){b=b+d.substr(c,3);c=c+2;}else {b=b+"%"+stohex(d[c]);}}return b}function newline_toUnix(a){a=a.replace(/\r\n/mg,"\n");return a}function newline_toDos(a){a=a.replace(/\r\n/mg,"\n");a=a.replace(/\n/mg,"\r\n");return a}KJUR.lang.String.isInteger=function(a){if(a.match(/^[0-9]+$/)){return true}else {if(a.match(/^-[0-9]+$/)){return true}else {return false}}};KJUR.lang.String.isHex=function(a){return ishex(a)};function ishex(a){if(a.length%2==0&&(a.match(/^[0-9a-f]+$/)||a.match(/^[0-9A-F]+$/))){return true}else {return false}}KJUR.lang.String.isBase64=function(a){a=a.replace(/\s+/g,"");if(a.match(/^[0-9A-Za-z+\/]+={0,3}$/)&&a.length%4==0){return true}else {return false}};KJUR.lang.String.isBase64URL=function(a){if(a.match(/[+/=]/)){return false}a=b64utob64(a);return KJUR.lang.String.isBase64(a)};KJUR.lang.String.isIntegerArray=function(a){a=a.replace(/\s+/g,"");if(a.match(/^\[[0-9,]+\]$/)){return true}else {return false}};KJUR.lang.String.isPrintable=function(a){if(a.match(/^[0-9A-Za-z '()+,-./:=?]*$/)!==null){return true}return false};KJUR.lang.String.isIA5=function(a){if(a.match(/^[\x20-\x21\x23-\x7f]*$/)!==null){return true}return false};KJUR.lang.String.isMail=function(a){if(a.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)!==null){return true}return false};function hextoposhex(a){if(a.length%2==1){return "0"+a}if(a.substr(0,1)>"7"){return "00"+a}return a}function intarystrtohex(b){b=b.replace(/^\s*\[\s*/,"");b=b.replace(/\s*\]\s*$/,"");b=b.replace(/\s*/g,"");try{var c=b.split(/,/).map(function(g,e,h){var f=parseInt(g);if(f<0||255<f){throw "integer not in range 0-255"}var d=("00"+f.toString(16)).slice(-2);return d}).join("");return c}catch(a){throw "malformed integer array string: "+a}}var strdiffidx=function(c,a){var d=c.length;if(c.length>a.length){d=a.length;}for(var b=0;b<d;b++){if(c.charCodeAt(b)!=a.charCodeAt(b)){return b}}if(c.length!=a.length){return d}return -1};function oidtohex(g){var f=function(a){var l=a.toString(16);if(l.length==1){l="0"+l;}return l};var e=function(p){var o="";var l=parseInt(p,10);var a=l.toString(2);var m=7-a.length%7;if(m==7){m=0;}var r="";for(var n=0;n<m;n++){r+="0";}a=r+a;for(var n=0;n<a.length-1;n+=7){var q=a.substr(n,7);if(n!=a.length-7){q="1"+q;}o+=f(parseInt(q,2));}return o};try{if(!g.match(/^[0-9.]+$/)){return null}var j="";var b=g.split(".");var k=parseInt(b[0],10)*40+parseInt(b[1],10);j+=f(k);b.splice(0,2);for(var d=0;d<b.length;d++){j+=e(b[d]);}return j}catch(c){return null}}function hextooid(g){if(!ishex(g)){return null}try{var m=[];var p=g.substr(0,2);var e=parseInt(p,16);m[0]=new String(Math.floor(e/40));m[1]=new String(e%40);var n=g.substr(2);var l=[];for(var f=0;f<n.length/2;f++){l.push(parseInt(n.substr(f*2,2),16));}var k=[];var d="";for(var f=0;f<l.length;f++){if(l[f]&128){d=d+strpad((l[f]&127).toString(2),7);}else {d=d+strpad((l[f]&127).toString(2),7);k.push(new String(parseInt(d,2)));d="";}}var o=m.join(".");if(k.length>0){o=o+"."+k.join(".");}return o}catch(j){return null}}var strpad=function(c,b,a){if(a==undefined){a="0";}if(c.length>=b){return c}return new Array(b-c.length+1).join(a)+c};function bitstrtoint(e){try{var a=e.substr(0,2);if(a=="00"){return parseInt(e.substr(2),16)}var b=parseInt(a,16);var f=e.substr(2);var d=parseInt(f,16).toString(2);if(d=="0"){d="00000000";}d=d.slice(0,0-b);return parseInt(d,2)}catch(c){return -1}}function inttobitstr(e){var c=Number(e).toString(2);var b=8-c.length%8;if(b==8){b=0;}c=c+strpad("",b,"0");var d=parseInt(c,2).toString(16);if(d.length%2==1){d="0"+d;}var a="0"+b;return a+d}if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.crypto=="undefined"||!KJUR.crypto){KJUR.crypto={};}KJUR.crypto.Util=new function(){this.DIGESTINFOHEAD={sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",ripemd160:"3021300906052b2403020105000414",};this.DEFAULTPROVIDER={md5:"cryptojs",sha1:"cryptojs",sha224:"cryptojs",sha256:"cryptojs",sha384:"cryptojs",sha512:"cryptojs",ripemd160:"cryptojs",hmacmd5:"cryptojs",hmacsha1:"cryptojs",hmacsha224:"cryptojs",hmacsha256:"cryptojs",hmacsha384:"cryptojs",hmacsha512:"cryptojs",hmacripemd160:"cryptojs",MD5withRSA:"cryptojs/jsrsa",SHA1withRSA:"cryptojs/jsrsa",SHA224withRSA:"cryptojs/jsrsa",SHA256withRSA:"cryptojs/jsrsa",SHA384withRSA:"cryptojs/jsrsa",SHA512withRSA:"cryptojs/jsrsa",RIPEMD160withRSA:"cryptojs/jsrsa",MD5withECDSA:"cryptojs/jsrsa",SHA1withECDSA:"cryptojs/jsrsa",SHA224withECDSA:"cryptojs/jsrsa",SHA256withECDSA:"cryptojs/jsrsa",SHA384withECDSA:"cryptojs/jsrsa",SHA512withECDSA:"cryptojs/jsrsa",RIPEMD160withECDSA:"cryptojs/jsrsa",SHA1withDSA:"cryptojs/jsrsa",SHA224withDSA:"cryptojs/jsrsa",SHA256withDSA:"cryptojs/jsrsa",MD5withRSAandMGF1:"cryptojs/jsrsa",SHAwithRSAandMGF1:"cryptojs/jsrsa",SHA1withRSAandMGF1:"cryptojs/jsrsa",SHA224withRSAandMGF1:"cryptojs/jsrsa",SHA256withRSAandMGF1:"cryptojs/jsrsa",SHA384withRSAandMGF1:"cryptojs/jsrsa",SHA512withRSAandMGF1:"cryptojs/jsrsa",RIPEMD160withRSAandMGF1:"cryptojs/jsrsa",};this.CRYPTOJSMESSAGEDIGESTNAME={md5:CryptoJS.algo.MD5,sha1:CryptoJS.algo.SHA1,sha224:CryptoJS.algo.SHA224,sha256:CryptoJS.algo.SHA256,sha384:CryptoJS.algo.SHA384,sha512:CryptoJS.algo.SHA512,ripemd160:CryptoJS.algo.RIPEMD160};this.getDigestInfoHex=function(a,b){if(typeof this.DIGESTINFOHEAD[b]=="undefined"){throw "alg not supported in Util.DIGESTINFOHEAD: "+b}return this.DIGESTINFOHEAD[b]+a};this.getPaddedDigestInfoHex=function(h,a,j){var c=this.getDigestInfoHex(h,a);var d=j/4;if(c.length+22>d){throw "key is too short for SigAlg: keylen="+j+","+a}var b="0001";var k="00"+c;var g="";var l=d-b.length-k.length;for(var f=0;f<l;f+=2){g+="ff";}var e=b+g+k;return e};this.hashString=function(a,c){var b=new KJUR.crypto.MessageDigest({alg:c});return b.digestString(a)};this.hashHex=function(b,c){var a=new KJUR.crypto.MessageDigest({alg:c});return a.digestHex(b)};this.sha1=function(a){return this.hashString(a,"sha1")};this.sha256=function(a){return this.hashString(a,"sha256")};this.sha256Hex=function(a){return this.hashHex(a,"sha256")};this.sha512=function(a){return this.hashString(a,"sha512")};this.sha512Hex=function(a){return this.hashHex(a,"sha512")};this.isKey=function(a){if(a instanceof RSAKey||a instanceof KJUR.crypto.DSA||a instanceof KJUR.crypto.ECDSA){return true}else {return false}};};KJUR.crypto.Util.md5=function(a){var b=new KJUR.crypto.MessageDigest({alg:"md5",prov:"cryptojs"});return b.digestString(a)};KJUR.crypto.Util.ripemd160=function(a){var b=new KJUR.crypto.MessageDigest({alg:"ripemd160",prov:"cryptojs"});return b.digestString(a)};KJUR.crypto.Util.SECURERANDOMGEN=new SecureRandom();KJUR.crypto.Util.getRandomHexOfNbytes=function(b){var a=new Array(b);KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(a);return BAtohex(a)};KJUR.crypto.Util.getRandomBigIntegerOfNbytes=function(a){return new BigInteger$5(KJUR.crypto.Util.getRandomHexOfNbytes(a),16)};KJUR.crypto.Util.getRandomHexOfNbits=function(d){var c=d%8;var a=(d-c)/8;var b=new Array(a+1);KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(b);b[0]=(((255<<c)&255)^255)&b[0];return BAtohex(b)};KJUR.crypto.Util.getRandomBigIntegerOfNbits=function(a){return new BigInteger$5(KJUR.crypto.Util.getRandomHexOfNbits(a),16)};KJUR.crypto.Util.getRandomBigIntegerZeroToMax=function(b){var a=b.bitLength();while(1){var c=KJUR.crypto.Util.getRandomBigIntegerOfNbits(a);if(b.compareTo(c)!=-1){return c}}};KJUR.crypto.Util.getRandomBigIntegerMinToMax=function(e,b){var c=e.compareTo(b);if(c==1){throw "biMin is greater than biMax"}if(c==0){return e}var a=b.subtract(e);var d=KJUR.crypto.Util.getRandomBigIntegerZeroToMax(a);return d.add(e)};KJUR.crypto.MessageDigest=function(c){this.setAlgAndProvider=function(g,f){g=KJUR.crypto.MessageDigest.getCanonicalAlgName(g);if(g!==null&&f===undefined){f=KJUR.crypto.Util.DEFAULTPROVIDER[g];}if(":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g)!=-1&&f=="cryptojs"){try{this.md=KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g].create();}catch(e){throw "setAlgAndProvider hash alg set fail alg="+g+"/"+e}this.updateString=function(h){this.md.update(h);};this.updateHex=function(h){var i=CryptoJS.enc.Hex.parse(h);this.md.update(i);};this.digest=function(){var h=this.md.finalize();return h.toString(CryptoJS.enc.Hex)};this.digestString=function(h){this.updateString(h);return this.digest()};this.digestHex=function(h){this.updateHex(h);return this.digest()};}if(":sha256:".indexOf(g)!=-1&&f=="sjcl"){try{this.md=new sjcl.hash.sha256();}catch(e){throw "setAlgAndProvider hash alg set fail alg="+g+"/"+e}this.updateString=function(h){this.md.update(h);};this.updateHex=function(i){var h=sjcl.codec.hex.toBits(i);this.md.update(h);};this.digest=function(){var h=this.md.finalize();return sjcl.codec.hex.fromBits(h)};this.digestString=function(h){this.updateString(h);return this.digest()};this.digestHex=function(h){this.updateHex(h);return this.digest()};}};this.updateString=function(e){throw "updateString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName};this.updateHex=function(e){throw "updateHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName};this.digest=function(){throw "digest() not supported for this alg/prov: "+this.algName+"/"+this.provName};this.digestString=function(e){throw "digestString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName};this.digestHex=function(e){throw "digestHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName};if(c!==undefined){if(c.alg!==undefined){this.algName=c.alg;if(c.prov===undefined){this.provName=KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];}this.setAlgAndProvider(this.algName,this.provName);}}};KJUR.crypto.MessageDigest.getCanonicalAlgName=function(a){if(typeof a==="string"){a=a.toLowerCase();a=a.replace(/-/,"");}return a};KJUR.crypto.MessageDigest.getHashLength=function(c){var b=KJUR.crypto.MessageDigest;var a=b.getCanonicalAlgName(c);if(b.HASHLENGTH[a]===undefined){throw "not supported algorithm: "+c}return b.HASHLENGTH[a]};KJUR.crypto.MessageDigest.HASHLENGTH={md5:16,sha1:20,sha224:28,sha256:32,sha384:48,sha512:64,ripemd160:20};KJUR.crypto.Mac=function(d){this.setAlgAndProvider=function(k,i){k=k.toLowerCase();if(k==null){k="hmacsha1";}k=k.toLowerCase();if(k.substr(0,4)!="hmac"){throw "setAlgAndProvider unsupported HMAC alg: "+k}if(i===undefined){i=KJUR.crypto.Util.DEFAULTPROVIDER[k];}this.algProv=k+"/"+i;var g=k.substr(4);if(":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g)!=-1&&i=="cryptojs"){try{var j=KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g];this.mac=CryptoJS.algo.HMAC.create(j,this.pass);}catch(h){throw "setAlgAndProvider hash alg set fail hashAlg="+g+"/"+h}this.updateString=function(l){this.mac.update(l);};this.updateHex=function(l){var m=CryptoJS.enc.Hex.parse(l);this.mac.update(m);};this.doFinal=function(){var l=this.mac.finalize();return l.toString(CryptoJS.enc.Hex)};this.doFinalString=function(l){this.updateString(l);return this.doFinal()};this.doFinalHex=function(l){this.updateHex(l);return this.doFinal()};}};this.updateString=function(g){throw "updateString(str) not supported for this alg/prov: "+this.algProv};this.updateHex=function(g){throw "updateHex(hex) not supported for this alg/prov: "+this.algProv};this.doFinal=function(){throw "digest() not supported for this alg/prov: "+this.algProv};this.doFinalString=function(g){throw "digestString(str) not supported for this alg/prov: "+this.algProv};this.doFinalHex=function(g){throw "digestHex(hex) not supported for this alg/prov: "+this.algProv};this.setPassword=function(h){if(typeof h=="string"){var g=h;if(h.length%2==1||!h.match(/^[0-9A-Fa-f]+$/)){g=rstrtohex(h);}this.pass=CryptoJS.enc.Hex.parse(g);return}if(typeof h!="object"){throw "KJUR.crypto.Mac unsupported password type: "+h}var g=null;if(h.hex!==undefined){if(h.hex.length%2!=0||!h.hex.match(/^[0-9A-Fa-f]+$/)){throw "Mac: wrong hex password: "+h.hex}g=h.hex;}if(h.utf8!==undefined){g=utf8tohex(h.utf8);}if(h.rstr!==undefined){g=rstrtohex(h.rstr);}if(h.b64!==undefined){g=b64tohex(h.b64);}if(h.b64u!==undefined){g=b64utohex(h.b64u);}if(g==null){throw "KJUR.crypto.Mac unsupported password type: "+h}this.pass=CryptoJS.enc.Hex.parse(g);};if(d!==undefined){if(d.pass!==undefined){this.setPassword(d.pass);}if(d.alg!==undefined){this.algName=d.alg;if(d.prov===undefined){this.provName=KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];}this.setAlgAndProvider(this.algName,this.provName);}}};KJUR.crypto.Signature=function(o){var q=null;this._setAlgNames=function(){var s=this.algName.match(/^(.+)with(.+)$/);if(s){this.mdAlgName=s[1].toLowerCase();this.pubkeyAlgName=s[2].toLowerCase();if(this.pubkeyAlgName=="rsaandmgf1"&&this.mdAlgName=="sha"){this.mdAlgName="sha1";}}};this._zeroPaddingOfSignature=function(x,w){var v="";var t=w/4-x.length;for(var u=0;u<t;u++){v=v+"0";}return v+x};this.setAlgAndProvider=function(u,t){this._setAlgNames();if(t!="cryptojs/jsrsa"){throw new Error("provider not supported: "+t)}if(":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName)!=-1){try{this.md=new KJUR.crypto.MessageDigest({alg:this.mdAlgName});}catch(s){throw new Error("setAlgAndProvider hash alg set fail alg="+this.mdAlgName+"/"+s)}this.init=function(w,x){var y=null;try{if(x===undefined){y=KEYUTIL.getKey(w);}else {y=KEYUTIL.getKey(w,x);}}catch(v){throw "init failed:"+v}if(y.isPrivate===true){this.prvKey=y;this.state="SIGN";}else {if(y.isPublic===true){this.pubKey=y;this.state="VERIFY";}else {throw "init failed.:"+y}}};this.updateString=function(v){this.md.updateString(v);};this.updateHex=function(v){this.md.updateHex(v);};this.sign=function(){this.sHashHex=this.md.digest();if(this.prvKey===undefined&&this.ecprvhex!==undefined&&this.eccurvename!==undefined&&KJUR.crypto.ECDSA!==undefined){this.prvKey=new KJUR.crypto.ECDSA({curve:this.eccurvename,prv:this.ecprvhex});}if(this.prvKey instanceof RSAKey&&this.pubkeyAlgName==="rsaandmgf1"){this.hSign=this.prvKey.signWithMessageHashPSS(this.sHashHex,this.mdAlgName,this.pssSaltLen);}else {if(this.prvKey instanceof RSAKey&&this.pubkeyAlgName==="rsa"){this.hSign=this.prvKey.signWithMessageHash(this.sHashHex,this.mdAlgName);}else {if(this.prvKey instanceof KJUR.crypto.ECDSA){this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);}else {if(this.prvKey instanceof KJUR.crypto.DSA){this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);}else {throw "Signature: unsupported private key alg: "+this.pubkeyAlgName}}}}return this.hSign};this.signString=function(v){this.updateString(v);return this.sign()};this.signHex=function(v){this.updateHex(v);return this.sign()};this.verify=function(v){this.sHashHex=this.md.digest();if(this.pubKey===undefined&&this.ecpubhex!==undefined&&this.eccurvename!==undefined&&KJUR.crypto.ECDSA!==undefined){this.pubKey=new KJUR.crypto.ECDSA({curve:this.eccurvename,pub:this.ecpubhex});}if(this.pubKey instanceof RSAKey&&this.pubkeyAlgName==="rsaandmgf1"){return this.pubKey.verifyWithMessageHashPSS(this.sHashHex,v,this.mdAlgName,this.pssSaltLen)}else {if(this.pubKey instanceof RSAKey&&this.pubkeyAlgName==="rsa"){return this.pubKey.verifyWithMessageHash(this.sHashHex,v)}else {if(KJUR.crypto.ECDSA!==undefined&&this.pubKey instanceof KJUR.crypto.ECDSA){return this.pubKey.verifyWithMessageHash(this.sHashHex,v)}else {if(KJUR.crypto.DSA!==undefined&&this.pubKey instanceof KJUR.crypto.DSA){return this.pubKey.verifyWithMessageHash(this.sHashHex,v)}else {throw "Signature: unsupported public key alg: "+this.pubkeyAlgName}}}}};}};this.init=function(s,t){throw "init(key, pass) not supported for this alg:prov="+this.algProvName};this.updateString=function(s){throw "updateString(str) not supported for this alg:prov="+this.algProvName};this.updateHex=function(s){throw "updateHex(hex) not supported for this alg:prov="+this.algProvName};this.sign=function(){throw "sign() not supported for this alg:prov="+this.algProvName};this.signString=function(s){throw "digestString(str) not supported for this alg:prov="+this.algProvName};this.signHex=function(s){throw "digestHex(hex) not supported for this alg:prov="+this.algProvName};this.verify=function(s){throw "verify(hSigVal) not supported for this alg:prov="+this.algProvName};this.initParams=o;if(o!==undefined){if(o.alg!==undefined){this.algName=o.alg;if(o.prov===undefined){this.provName=KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];}else {this.provName=o.prov;}this.algProvName=this.algName+":"+this.provName;this.setAlgAndProvider(this.algName,this.provName);this._setAlgNames();}if(o.psssaltlen!==undefined){this.pssSaltLen=o.psssaltlen;}if(o.prvkeypem!==undefined){if(o.prvkeypas!==undefined){throw "both prvkeypem and prvkeypas parameters not supported"}else {try{var q=KEYUTIL.getKey(o.prvkeypem);this.init(q);}catch(m){throw "fatal error to load pem private key: "+m}}}}};KJUR.crypto.Cipher=function(a){};KJUR.crypto.Cipher.encrypt=function(e,f,d){if(f instanceof RSAKey&&f.isPublic){var c=KJUR.crypto.Cipher.getAlgByKeyAndName(f,d);if(c==="RSA"){return f.encrypt(e)}if(c==="RSAOAEP"){return f.encryptOAEP(e,"sha1")}var b=c.match(/^RSAOAEP(\d+)$/);if(b!==null){return f.encryptOAEP(e,"sha"+b[1])}throw "Cipher.encrypt: unsupported algorithm for RSAKey: "+d}else {throw "Cipher.encrypt: unsupported key or algorithm"}};KJUR.crypto.Cipher.decrypt=function(e,f,d){if(f instanceof RSAKey&&f.isPrivate){var c=KJUR.crypto.Cipher.getAlgByKeyAndName(f,d);if(c==="RSA"){return f.decrypt(e)}if(c==="RSAOAEP"){return f.decryptOAEP(e,"sha1")}var b=c.match(/^RSAOAEP(\d+)$/);if(b!==null){return f.decryptOAEP(e,"sha"+b[1])}throw "Cipher.decrypt: unsupported algorithm for RSAKey: "+d}else {throw "Cipher.decrypt: unsupported key or algorithm"}};KJUR.crypto.Cipher.getAlgByKeyAndName=function(b,a){if(b instanceof RSAKey){if(":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(a)!=-1){return a}if(a===null||a===undefined){return "RSA"}throw "getAlgByKeyAndName: not supported algorithm name for RSAKey: "+a}throw "getAlgByKeyAndName: not supported algorithm name: "+a};KJUR.crypto.OID=new function(){this.oidhex2name={"2a864886f70d010101":"rsaEncryption","2a8648ce3d0201":"ecPublicKey","2a8648ce380401":"dsa","2a8648ce3d030107":"secp256r1","2b8104001f":"secp192k1","2b81040021":"secp224r1","2b8104000a":"secp256k1","2b81040023":"secp521r1","2b81040022":"secp384r1","2a8648ce380403":"SHA1withDSA","608648016503040301":"SHA224withDSA","608648016503040302":"SHA256withDSA",};};
	if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.crypto=="undefined"||!KJUR.crypto){KJUR.crypto={};}KJUR.crypto.ECDSA=function(e){var g="secp256r1";var j=Error,f=BigInteger$5,h=ECPointFp,m=KJUR.crypto.ECDSA,c=KJUR.crypto.ECParameterDB,d=m.getName,q=ASN1HEX,n=q.getVbyListEx,k=q.isASN1HEX;var a=new SecureRandom();this.type="EC";this.isPrivate=false;this.isPublic=false;this.getBigRandom=function(r){return new f(r.bitLength(),a).mod(r.subtract(f.ONE)).add(f.ONE)};this.setNamedCurve=function(r){this.ecparams=c.getByName(r);this.prvKeyHex=null;this.pubKeyHex=null;this.curveName=r;};this.setPrivateKeyHex=function(r){this.isPrivate=true;this.prvKeyHex=r;};this.setPublicKeyHex=function(r){this.isPublic=true;this.pubKeyHex=r;};this.getPublicKeyXYHex=function(){var t=this.pubKeyHex;if(t.substr(0,2)!=="04"){throw "this method supports uncompressed format(04) only"}var s=this.ecparams.keylen/4;if(t.length!==2+s*2){throw "malformed public key hex length"}var r={};r.x=t.substr(2,s);r.y=t.substr(2+s);return r};this.getShortNISTPCurveName=function(){var r=this.curveName;if(r==="secp256r1"||r==="NIST P-256"||r==="P-256"||r==="prime256v1"){return "P-256"}if(r==="secp384r1"||r==="NIST P-384"||r==="P-384"){return "P-384"}return null};this.generateKeyPairHex=function(){var t=this.ecparams.n;var w=this.getBigRandom(t);var u=this.ecparams.G.multiply(w);var z=u.getX().toBigInteger();var x=u.getY().toBigInteger();var r=this.ecparams.keylen/4;var v=("0000000000"+w.toString(16)).slice(-r);var A=("0000000000"+z.toString(16)).slice(-r);var y=("0000000000"+x.toString(16)).slice(-r);var s="04"+A+y;this.setPrivateKeyHex(v);this.setPublicKeyHex(s);return {ecprvhex:v,ecpubhex:s}};this.signWithMessageHash=function(r){return this.signHex(r,this.prvKeyHex)};this.signHex=function(x,u){var A=new f(u,16);var v=this.ecparams.n;var z=new f(x.substring(0,this.ecparams.keylen/4),16);do{var w=this.getBigRandom(v);var B=this.ecparams.G;var y=B.multiply(w);var t=y.getX().toBigInteger().mod(v);}while(t.compareTo(f.ZERO)<=0);var C=w.modInverse(v).multiply(z.add(A.multiply(t))).mod(v);return m.biRSSigToASN1Sig(t,C)};this.sign=function(w,B){var z=B;var u=this.ecparams.n;var y=f.fromByteArrayUnsigned(w);do{var v=this.getBigRandom(u);var A=this.ecparams.G;var x=A.multiply(v);var t=x.getX().toBigInteger().mod(u);}while(t.compareTo(BigInteger$5.ZERO)<=0);var C=v.modInverse(u).multiply(y.add(z.multiply(t))).mod(u);return this.serializeSig(t,C)};this.verifyWithMessageHash=function(s,r){return this.verifyHex(s,r,this.pubKeyHex)};this.verifyHex=function(v,y,u){try{var t,B;var w=m.parseSigHex(y);t=w.r;B=w.s;var x=h.decodeFromHex(this.ecparams.curve,u);var z=new f(v.substring(0,this.ecparams.keylen/4),16);return this.verifyRaw(z,t,B,x)}catch(A){return false}};this.verify=function(z,A,u){var w,t;if(Bitcoin.Util.isArray(A)){var y=this.parseSig(A);w=y.r;t=y.s;}else {if("object"===typeof A&&A.r&&A.s){w=A.r;t=A.s;}else {throw "Invalid value for signature"}}var v;if(u instanceof ECPointFp){v=u;}else {if(Bitcoin.Util.isArray(u)){v=h.decodeFrom(this.ecparams.curve,u);}else {throw "Invalid format for pubkey value, must be byte array or ECPointFp"}}var x=f.fromByteArrayUnsigned(z);return this.verifyRaw(x,w,t,v)};this.verifyRaw=function(z,t,E,y){var x=this.ecparams.n;var D=this.ecparams.G;if(t.compareTo(f.ONE)<0||t.compareTo(x)>=0){return false}if(E.compareTo(f.ONE)<0||E.compareTo(x)>=0){return false}var A=E.modInverse(x);var w=z.multiply(A).mod(x);var u=t.multiply(A).mod(x);var B=D.multiply(w).add(y.multiply(u));var C=B.getX().toBigInteger().mod(x);return C.equals(t)};this.serializeSig=function(v,u){var w=v.toByteArraySigned();var t=u.toByteArraySigned();var x=[];x.push(2);x.push(w.length);x=x.concat(w);x.push(2);x.push(t.length);x=x.concat(t);x.unshift(x.length);x.unshift(48);return x};this.parseSig=function(y){var x;if(y[0]!=48){throw new Error("Signature not a valid DERSequence")}x=2;if(y[x]!=2){throw new Error("First element in signature must be a DERInteger")}var w=y.slice(x+2,x+2+y[x+1]);x+=2+y[x+1];if(y[x]!=2){throw new Error("Second element in signature must be a DERInteger")}var t=y.slice(x+2,x+2+y[x+1]);x+=2+y[x+1];var v=f.fromByteArrayUnsigned(w);var u=f.fromByteArrayUnsigned(t);return {r:v,s:u}};this.parseSigCompact=function(w){if(w.length!==65){throw "Signature has the wrong length"}var t=w[0]-27;if(t<0||t>7){throw "Invalid signature type"}var x=this.ecparams.n;var v=f.fromByteArrayUnsigned(w.slice(1,33)).mod(x);var u=f.fromByteArrayUnsigned(w.slice(33,65)).mod(x);return {r:v,s:u,i:t}};this.readPKCS5PrvKeyHex=function(u){if(k(u)===false){throw new Error("not ASN.1 hex string")}var r,t,v;try{r=n(u,0,["[0]",0],"06");t=n(u,0,[1],"04");try{v=n(u,0,["[1]",0],"03");}catch(s){}}catch(s){throw new Error("malformed PKCS#1/5 plain ECC private key")}this.curveName=d(r);if(this.curveName===undefined){throw "unsupported curve name"}this.setNamedCurve(this.curveName);this.setPublicKeyHex(v);this.setPrivateKeyHex(t);this.isPublic=false;};this.readPKCS8PrvKeyHex=function(v){if(k(v)===false){throw new j("not ASN.1 hex string")}var t,r,u,w;try{t=n(v,0,[1,0],"06");r=n(v,0,[1,1],"06");u=n(v,0,[2,0,1],"04");try{w=n(v,0,[2,0,"[1]",0],"03");}catch(s){}}catch(s){throw new j("malformed PKCS#8 plain ECC private key")}this.curveName=d(r);if(this.curveName===undefined){throw new j("unsupported curve name")}this.setNamedCurve(this.curveName);this.setPublicKeyHex(w);this.setPrivateKeyHex(u);this.isPublic=false;};this.readPKCS8PubKeyHex=function(u){if(k(u)===false){throw new j("not ASN.1 hex string")}var t,r,v;try{t=n(u,0,[0,0],"06");r=n(u,0,[0,1],"06");v=n(u,0,[1],"03");}catch(s){throw new j("malformed PKCS#8 ECC public key")}this.curveName=d(r);if(this.curveName===null){throw new j("unsupported curve name")}this.setNamedCurve(this.curveName);this.setPublicKeyHex(v);};this.readCertPubKeyHex=function(t,v){if(k(t)===false){throw new j("not ASN.1 hex string")}var r,u;try{r=n(t,0,[0,5,0,1],"06");u=n(t,0,[0,5,1],"03");}catch(s){throw new j("malformed X.509 certificate ECC public key")}this.curveName=d(r);if(this.curveName===null){throw new j("unsupported curve name")}this.setNamedCurve(this.curveName);this.setPublicKeyHex(u);};if(e!==undefined){if(e.curve!==undefined){this.curveName=e.curve;}}if(this.curveName===undefined){this.curveName=g;}this.setNamedCurve(this.curveName);if(e!==undefined){if(e.prv!==undefined){this.setPrivateKeyHex(e.prv);}if(e.pub!==undefined){this.setPublicKeyHex(e.pub);}}};KJUR.crypto.ECDSA.parseSigHex=function(a){var b=KJUR.crypto.ECDSA.parseSigHexInHexRS(a);var d=new BigInteger$5(b.r,16);var c=new BigInteger$5(b.s,16);return {r:d,s:c}};KJUR.crypto.ECDSA.parseSigHexInHexRS=function(f){var j=ASN1HEX,i=j.getChildIdx,g=j.getV;j.checkStrictDER(f,0);if(f.substr(0,2)!="30"){throw new Error("signature is not a ASN.1 sequence")}var h=i(f,0);if(h.length!=2){throw new Error("signature shall have two elements")}var e=h[0];var d=h[1];if(f.substr(e,2)!="02"){throw new Error("1st item not ASN.1 integer")}if(f.substr(d,2)!="02"){throw new Error("2nd item not ASN.1 integer")}var c=g(f,e);var b=g(f,d);return {r:c,s:b}};KJUR.crypto.ECDSA.asn1SigToConcatSig=function(c){var d=KJUR.crypto.ECDSA.parseSigHexInHexRS(c);var b=d.r;var a=d.s;if(b.substr(0,2)=="00"&&(b.length%32)==2){b=b.substr(2);}if(a.substr(0,2)=="00"&&(a.length%32)==2){a=a.substr(2);}if((b.length%32)==30){b="00"+b;}if((a.length%32)==30){a="00"+a;}if(b.length%32!=0){throw "unknown ECDSA sig r length error"}if(a.length%32!=0){throw "unknown ECDSA sig s length error"}return b+a};KJUR.crypto.ECDSA.concatSigToASN1Sig=function(a){if((((a.length/2)*8)%(16*8))!=0){throw "unknown ECDSA concatinated r-s sig  length error"}var c=a.substr(0,a.length/2);var b=a.substr(a.length/2);return KJUR.crypto.ECDSA.hexRSSigToASN1Sig(c,b)};KJUR.crypto.ECDSA.hexRSSigToASN1Sig=function(b,a){var d=new BigInteger$5(b,16);var c=new BigInteger$5(a,16);return KJUR.crypto.ECDSA.biRSSigToASN1Sig(d,c)};KJUR.crypto.ECDSA.biRSSigToASN1Sig=function(f,d){var c=KJUR.asn1;var b=new c.DERInteger({bigint:f});var a=new c.DERInteger({bigint:d});var e=new c.DERSequence({array:[b,a]});return e.getEncodedHex()};KJUR.crypto.ECDSA.getName=function(a){if(a==="2b8104001f"){return "secp192k1"}if(a==="2a8648ce3d030107"){return "secp256r1"}if(a==="2b8104000a"){return "secp256k1"}if(a==="2b81040021"){return "secp224r1"}if(a==="2b81040022"){return "secp384r1"}if("|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(a)!==-1){return "secp256r1"}if("|secp256k1|".indexOf(a)!==-1){return "secp256k1"}if("|secp224r1|NIST P-224|P-224|".indexOf(a)!==-1){return "secp224r1"}if("|secp384r1|NIST P-384|P-384|".indexOf(a)!==-1){return "secp384r1"}return null};
	if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.crypto=="undefined"||!KJUR.crypto){KJUR.crypto={};}KJUR.crypto.ECParameterDB=new function(){var b={};var c={};function a(d){return new BigInteger$5(d,16)}this.getByName=function(e){var d=e;if(typeof c[d]!="undefined"){d=c[e];}if(typeof b[d]!="undefined"){return b[d]}throw "unregistered EC curve name: "+d};this.regist=function(A,l,o,g,m,e,j,f,k,u,d,x){b[A]={};var s=a(o);var z=a(g);var y=a(m);var t=a(e);var w=a(j);var r=new ECCurveFp(s,z,y);var q=r.decodePointHex("04"+f+k);b[A]["name"]=A;b[A]["keylen"]=l;b[A]["curve"]=r;b[A]["G"]=q;b[A]["n"]=t;b[A]["h"]=w;b[A]["oid"]=d;b[A]["info"]=x;for(var v=0;v<u.length;v++){c[u[v]]=A;}};};KJUR.crypto.ECParameterDB.regist("secp128r1",128,"FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC","E87579C11079F43DD824993C2CEE5ED3","FFFFFFFE0000000075A30D1B9038A115","1","161FF7528B899B2D0C28607CA52C5B86","CF5AC8395BAFEB13C02DA292DDED7A83",[],"","secp128r1 : SECG curve over a 128 bit prime field");KJUR.crypto.ECParameterDB.regist("secp160k1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73","0","7","0100000000000000000001B8FA16DFAB9ACA16B6B3","1","3B4C382CE37AA192A4019E763036F4F5DD4D7EBB","938CF935318FDCED6BC28286531733C3F03C4FEE",[],"","secp160k1 : SECG curve over a 160 bit prime field");KJUR.crypto.ECParameterDB.regist("secp160r1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC","1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45","0100000000000000000001F4C8F927AED3CA752257","1","4A96B5688EF573284664698968C38BB913CBFC82","23A628553168947D59DCC912042351377AC5FB32",[],"","secp160r1 : SECG curve over a 160 bit prime field");KJUR.crypto.ECParameterDB.regist("secp192k1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37","0","3","FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D","1","DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D","9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D",[]);KJUR.crypto.ECParameterDB.regist("secp192r1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC","64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1","FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831","1","188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012","07192B95FFC8DA78631011ED6B24CDD573F977A11E794811",[]);KJUR.crypto.ECParameterDB.regist("secp224r1",224,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE","B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4","FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D","1","B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21","BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34",[]);KJUR.crypto.ECParameterDB.regist("secp256k1",256,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F","0","7","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141","1","79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798","483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8",[]);KJUR.crypto.ECParameterDB.regist("secp256r1",256,"FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC","5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B","FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551","1","6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296","4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5",["NIST P-256","P-256","prime256v1"]);KJUR.crypto.ECParameterDB.regist("secp384r1",384,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC","B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973","1","AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7","3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f",["NIST P-384","P-384"]);KJUR.crypto.ECParameterDB.regist("secp521r1",521,"1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC","051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409","1","C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66","011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650",["NIST P-521","P-521"]);
	if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.crypto=="undefined"||!KJUR.crypto){KJUR.crypto={};}KJUR.crypto.DSA=function(){var b=ASN1HEX,d=b.getVbyListEx,a=b.isASN1HEX,c=BigInteger$5;this.p=null;this.q=null;this.g=null;this.y=null;this.x=null;this.type="DSA";this.isPrivate=false;this.isPublic=false;this.setPrivate=function(j,i,h,k,f){this.isPrivate=true;this.p=j;this.q=i;this.g=h;this.y=k;this.x=f;};this.setPrivateHex=function(i,g,k,n,o){var h,f,j,l,m;h=new BigInteger$5(i,16);f=new BigInteger$5(g,16);j=new BigInteger$5(k,16);if(typeof n==="string"&&n.length>1){l=new BigInteger$5(n,16);}else {l=null;}m=new BigInteger$5(o,16);this.setPrivate(h,f,j,l,m);};this.setPublic=function(i,h,f,j){this.isPublic=true;this.p=i;this.q=h;this.g=f;this.y=j;this.x=null;};this.setPublicHex=function(k,j,i,l){var g,f,m,h;g=new BigInteger$5(k,16);f=new BigInteger$5(j,16);m=new BigInteger$5(i,16);h=new BigInteger$5(l,16);this.setPublic(g,f,m,h);};this.signWithMessageHash=function(j){var i=this.p;var h=this.q;var m=this.g;this.y;var t=this.x;var l=KJUR.crypto.Util.getRandomBigIntegerMinToMax(BigInteger$5.ONE.add(BigInteger$5.ONE),h.subtract(BigInteger$5.ONE));var u=j.substr(0,h.bitLength()/4);var n=new BigInteger$5(u,16);var f=(m.modPow(l,i)).mod(h);var w=(l.modInverse(h).multiply(n.add(t.multiply(f)))).mod(h);var v=KJUR.asn1.ASN1Util.jsonToASN1HEX({seq:[{"int":{bigint:f}},{"int":{bigint:w}}]});return v};this.verifyWithMessageHash=function(m,l){var j=this.p;var h=this.q;var o=this.g;var u=this.y;var n=this.parseASN1Signature(l);var f=n[0];var C=n[1];var B=m.substr(0,h.bitLength()/4);var t=new BigInteger$5(B,16);if(BigInteger$5.ZERO.compareTo(f)>0||f.compareTo(h)>0){throw "invalid DSA signature"}if(BigInteger$5.ZERO.compareTo(C)>=0||C.compareTo(h)>0){throw "invalid DSA signature"}var x=C.modInverse(h);var k=t.multiply(x).mod(h);var i=f.multiply(x).mod(h);var A=o.modPow(k,j).multiply(u.modPow(i,j)).mod(j).mod(h);return A.compareTo(f)==0};this.parseASN1Signature=function(f){try{var i=new c(d(f,0,[0],"02"),16);var h=new c(d(f,0,[1],"02"),16);return [i,h]}catch(g){throw new Error("malformed ASN.1 DSA signature")}};this.readPKCS5PrvKeyHex=function(j){var k,i,g,l,m;if(a(j)===false){throw new Error("not ASN.1 hex string")}try{k=d(j,0,[1],"02");i=d(j,0,[2],"02");g=d(j,0,[3],"02");l=d(j,0,[4],"02");m=d(j,0,[5],"02");}catch(f){throw new Error("malformed PKCS#1/5 plain DSA private key")}this.setPrivateHex(k,i,g,l,m);};this.readPKCS8PrvKeyHex=function(j){var k,i,g,l;if(a(j)===false){throw new Error("not ASN.1 hex string")}try{k=d(j,0,[1,1,0],"02");i=d(j,0,[1,1,1],"02");g=d(j,0,[1,1,2],"02");l=d(j,0,[2,0],"02");}catch(f){throw new Error("malformed PKCS#8 plain DSA private key")}this.setPrivateHex(k,i,g,null,l);};this.readPKCS8PubKeyHex=function(j){var k,i,g,l;if(a(j)===false){throw new Error("not ASN.1 hex string")}try{k=d(j,0,[0,1,0],"02");i=d(j,0,[0,1,1],"02");g=d(j,0,[0,1,2],"02");l=d(j,0,[1,0],"02");}catch(f){throw new Error("malformed PKCS#8 DSA public key")}this.setPublicHex(k,i,g,l);};this.readCertPubKeyHex=function(j,m){var k,i,g,l;if(a(j)===false){throw new Error("not ASN.1 hex string")}try{k=d(j,0,[0,5,0,1,0],"02");i=d(j,0,[0,5,0,1,1],"02");g=d(j,0,[0,5,0,1,2],"02");l=d(j,0,[0,5,1,0],"02");}catch(f){throw new Error("malformed X.509 certificate DSA public key")}this.setPublicHex(k,i,g,l);};};
	var KEYUTIL=function(){var d=function(p,r,q){return k(CryptoJS.AES,p,r,q)};var e=function(p,r,q){return k(CryptoJS.TripleDES,p,r,q)};var a=function(p,r,q){return k(CryptoJS.DES,p,r,q)};var k=function(s,x,u,q){var r=CryptoJS.enc.Hex.parse(x);var w=CryptoJS.enc.Hex.parse(u);var p=CryptoJS.enc.Hex.parse(q);var t={};t.key=w;t.iv=p;t.ciphertext=r;var v=s.decrypt(t,w,{iv:p});return CryptoJS.enc.Hex.stringify(v)};var l=function(p,r,q){return g(CryptoJS.AES,p,r,q)};var o=function(p,r,q){return g(CryptoJS.TripleDES,p,r,q)};var f=function(p,r,q){return g(CryptoJS.DES,p,r,q)};var g=function(t,y,v,q){var s=CryptoJS.enc.Hex.parse(y);var x=CryptoJS.enc.Hex.parse(v);var p=CryptoJS.enc.Hex.parse(q);var w=t.encrypt(s,x,{iv:p});var r=CryptoJS.enc.Hex.parse(w.toString());var u=CryptoJS.enc.Base64.stringify(r);return u};var i={"AES-256-CBC":{proc:d,eproc:l,keylen:32,ivlen:16},"AES-192-CBC":{proc:d,eproc:l,keylen:24,ivlen:16},"AES-128-CBC":{proc:d,eproc:l,keylen:16,ivlen:16},"DES-EDE3-CBC":{proc:e,eproc:o,keylen:24,ivlen:8},"DES-CBC":{proc:a,eproc:f,keylen:8,ivlen:8}};var m=function(p){var r=CryptoJS.lib.WordArray.random(p);var q=CryptoJS.enc.Hex.stringify(r);return q};var n=function(v){var w={};var q=v.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)","m"));if(q){w.cipher=q[1];w.ivsalt=q[2];}var p=v.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));if(p){w.type=p[1];}var u=-1;var x=0;if(v.indexOf("\r\n\r\n")!=-1){u=v.indexOf("\r\n\r\n");x=2;}if(v.indexOf("\n\n")!=-1){u=v.indexOf("\n\n");x=1;}var t=v.indexOf("-----END");if(u!=-1&&t!=-1){var r=v.substring(u+x*2,t-x);r=r.replace(/\s+/g,"");w.data=r;}return w};var j=function(q,y,p){var v=p.substring(0,16);var t=CryptoJS.enc.Hex.parse(v);var r=CryptoJS.enc.Utf8.parse(y);var u=i[q]["keylen"]+i[q]["ivlen"];var x="";var w=null;for(;;){var s=CryptoJS.algo.MD5.create();if(w!=null){s.update(w);}s.update(r);s.update(t);w=s.finalize();x=x+CryptoJS.enc.Hex.stringify(w);if(x.length>=u*2){break}}var z={};z.keyhex=x.substr(0,i[q]["keylen"]*2);z.ivhex=x.substr(i[q]["keylen"]*2,i[q]["ivlen"]*2);return z};var b=function(p,v,r,w){var s=CryptoJS.enc.Base64.parse(p);var q=CryptoJS.enc.Hex.stringify(s);var u=i[v]["proc"];var t=u(q,r,w);return t};var h=function(p,s,q,u){var r=i[s]["eproc"];var t=r(p,q,u);return t};return {version:"1.0.0",parsePKCS5PEM:function(p){return n(p)},getKeyAndUnusedIvByPasscodeAndIvsalt:function(q,p,r){return j(q,p,r)},decryptKeyB64:function(p,r,q,s){return b(p,r,q,s)},getDecryptedKeyHex:function(y,x){var q=n(y);var r=q.cipher;var p=q.ivsalt;var s=q.data;var w=j(r,x,p);var v=w.keyhex;var u=b(s,r,v,p);return u},getEncryptedPKCS5PEMFromPrvKeyHex:function(x,s,A,t,r){var p="";if(typeof t=="undefined"||t==null){t="AES-256-CBC";}if(typeof i[t]=="undefined"){throw "KEYUTIL unsupported algorithm: "+t}if(typeof r=="undefined"||r==null){var v=i[t]["ivlen"];var u=m(v);r=u.toUpperCase();}var z=j(t,A,r);var y=z.keyhex;var w=h(s,t,y,r);var q=w.replace(/(.{64})/g,"$1\r\n");var p="-----BEGIN "+x+" PRIVATE KEY-----\r\n";p+="Proc-Type: 4,ENCRYPTED\r\n";p+="DEK-Info: "+t+","+r+"\r\n";p+="\r\n";p+=q;p+="\r\n-----END "+x+" PRIVATE KEY-----\r\n";return p},parseHexOfEncryptedPKCS8:function(y){var B=ASN1HEX;var z=B.getChildIdx;var w=B.getV;var t={};var r=z(y,0);if(r.length!=2){throw "malformed format: SEQUENCE(0).items != 2: "+r.length}t.ciphertext=w(y,r[1]);var A=z(y,r[0]);if(A.length!=2){throw "malformed format: SEQUENCE(0.0).items != 2: "+A.length}if(w(y,A[0])!="2a864886f70d01050d"){throw "this only supports pkcs5PBES2"}var p=z(y,A[1]);if(A.length!=2){throw "malformed format: SEQUENCE(0.0.1).items != 2: "+p.length}var q=z(y,p[1]);if(q.length!=2){throw "malformed format: SEQUENCE(0.0.1.1).items != 2: "+q.length}if(w(y,q[0])!="2a864886f70d0307"){throw "this only supports TripleDES"}t.encryptionSchemeAlg="TripleDES";t.encryptionSchemeIV=w(y,q[1]);var s=z(y,p[0]);if(s.length!=2){throw "malformed format: SEQUENCE(0.0.1.0).items != 2: "+s.length}if(w(y,s[0])!="2a864886f70d01050c"){throw "this only supports pkcs5PBKDF2"}var x=z(y,s[1]);if(x.length<2){throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: "+x.length}t.pbkdf2Salt=w(y,x[0]);var u=w(y,x[1]);try{t.pbkdf2Iter=parseInt(u,16);}catch(v){throw "malformed format pbkdf2Iter: "+u}return t},getPBKDF2KeyHexFromParam:function(u,p){var t=CryptoJS.enc.Hex.parse(u.pbkdf2Salt);var q=u.pbkdf2Iter;var s=CryptoJS.PBKDF2(p,t,{keySize:192/32,iterations:q});var r=CryptoJS.enc.Hex.stringify(s);return r},_getPlainPKCS8HexFromEncryptedPKCS8PEM:function(x,y){var r=pemtohex(x,"ENCRYPTED PRIVATE KEY");var p=this.parseHexOfEncryptedPKCS8(r);var u=KEYUTIL.getPBKDF2KeyHexFromParam(p,y);var v={};v.ciphertext=CryptoJS.enc.Hex.parse(p.ciphertext);var t=CryptoJS.enc.Hex.parse(u);var s=CryptoJS.enc.Hex.parse(p.encryptionSchemeIV);var w=CryptoJS.TripleDES.decrypt(v,t,{iv:s});var q=CryptoJS.enc.Hex.stringify(w);return q},getKeyFromEncryptedPKCS8PEM:function(s,q){var p=this._getPlainPKCS8HexFromEncryptedPKCS8PEM(s,q);var r=this.getKeyFromPlainPrivatePKCS8Hex(p);return r},parsePlainPrivatePKCS8Hex:function(s){var v=ASN1HEX;var u=v.getChildIdx;var t=v.getV;var q={};q.algparam=null;if(s.substr(0,2)!="30"){throw new Error("malformed plain PKCS8 private key(code:001)")}var r=u(s,0);if(r.length<3){throw new Error("malformed plain PKCS8 private key(code:002)")}if(s.substr(r[1],2)!="30"){throw new Error("malformed PKCS8 private key(code:003)")}var p=u(s,r[1]);if(p.length!=2){throw new Error("malformed PKCS8 private key(code:004)")}if(s.substr(p[0],2)!="06"){throw new Error("malformed PKCS8 private key(code:005)")}q.algoid=t(s,p[0]);if(s.substr(p[1],2)=="06"){q.algparam=t(s,p[1]);}if(s.substr(r[2],2)!="04"){throw new Error("malformed PKCS8 private key(code:006)")}q.keyidx=v.getVidx(s,r[2]);return q},getKeyFromPlainPrivatePKCS8PEM:function(q){var p=pemtohex(q,"PRIVATE KEY");var r=this.getKeyFromPlainPrivatePKCS8Hex(p);return r},getKeyFromPlainPrivatePKCS8Hex:function(p){var q=this.parsePlainPrivatePKCS8Hex(p);var r;if(q.algoid=="2a864886f70d010101"){r=new RSAKey();}else {if(q.algoid=="2a8648ce380401"){r=new KJUR.crypto.DSA();}else {if(q.algoid=="2a8648ce3d0201"){r=new KJUR.crypto.ECDSA();}else {throw "unsupported private key algorithm"}}}r.readPKCS8PrvKeyHex(p);return r},_getKeyFromPublicPKCS8Hex:function(q){var p;var r=ASN1HEX.getVbyList(q,0,[0,0],"06");if(r==="2a864886f70d010101"){p=new RSAKey();}else {if(r==="2a8648ce380401"){p=new KJUR.crypto.DSA();}else {if(r==="2a8648ce3d0201"){p=new KJUR.crypto.ECDSA();}else {throw "unsupported PKCS#8 public key hex"}}}p.readPKCS8PubKeyHex(q);return p},parsePublicRawRSAKeyHex:function(r){var u=ASN1HEX;var t=u.getChildIdx;var s=u.getV;var p={};if(r.substr(0,2)!="30"){throw "malformed RSA key(code:001)"}var q=t(r,0);if(q.length!=2){throw "malformed RSA key(code:002)"}if(r.substr(q[0],2)!="02"){throw "malformed RSA key(code:003)"}p.n=s(r,q[0]);if(r.substr(q[1],2)!="02"){throw "malformed RSA key(code:004)"}p.e=s(r,q[1]);return p},parsePublicPKCS8Hex:function(t){var v=ASN1HEX;var u=v.getChildIdx;var s=v.getV;var q={};q.algparam=null;var r=u(t,0);if(r.length!=2){throw "outer DERSequence shall have 2 elements: "+r.length}var w=r[0];if(t.substr(w,2)!="30"){throw "malformed PKCS8 public key(code:001)"}var p=u(t,w);if(p.length!=2){throw "malformed PKCS8 public key(code:002)"}if(t.substr(p[0],2)!="06"){throw "malformed PKCS8 public key(code:003)"}q.algoid=s(t,p[0]);if(t.substr(p[1],2)=="06"){q.algparam=s(t,p[1]);}else {if(t.substr(p[1],2)=="30"){q.algparam={};q.algparam.p=v.getVbyList(t,p[1],[0],"02");q.algparam.q=v.getVbyList(t,p[1],[1],"02");q.algparam.g=v.getVbyList(t,p[1],[2],"02");}}if(t.substr(r[1],2)!="03"){throw "malformed PKCS8 public key(code:004)"}q.key=s(t,r[1]).substr(2);return q},}}();KEYUTIL.getKey=function(l,k,n){var G=ASN1HEX,L=G.getChildIdx;G.getV;var d=G.getVbyList,c=KJUR.crypto,i=c.ECDSA,C=c.DSA,w=RSAKey,M=pemtohex,F=KEYUTIL;if(typeof w!="undefined"&&l instanceof w){return l}if(typeof i!="undefined"&&l instanceof i){return l}if(typeof C!="undefined"&&l instanceof C){return l}if(l.curve!==undefined&&l.xy!==undefined&&l.d===undefined){return new i({pub:l.xy,curve:l.curve})}if(l.curve!==undefined&&l.d!==undefined){return new i({prv:l.d,curve:l.curve})}if(l.kty===undefined&&l.n!==undefined&&l.e!==undefined&&l.d===undefined){var P=new w();P.setPublic(l.n,l.e);return P}if(l.kty===undefined&&l.n!==undefined&&l.e!==undefined&&l.d!==undefined&&l.p!==undefined&&l.q!==undefined&&l.dp!==undefined&&l.dq!==undefined&&l.co!==undefined&&l.qi===undefined){var P=new w();P.setPrivateEx(l.n,l.e,l.d,l.p,l.q,l.dp,l.dq,l.co);return P}if(l.kty===undefined&&l.n!==undefined&&l.e!==undefined&&l.d!==undefined&&l.p===undefined){var P=new w();P.setPrivate(l.n,l.e,l.d);return P}if(l.p!==undefined&&l.q!==undefined&&l.g!==undefined&&l.y!==undefined&&l.x===undefined){var P=new C();P.setPublic(l.p,l.q,l.g,l.y);return P}if(l.p!==undefined&&l.q!==undefined&&l.g!==undefined&&l.y!==undefined&&l.x!==undefined){var P=new C();P.setPrivate(l.p,l.q,l.g,l.y,l.x);return P}if(l.kty==="RSA"&&l.n!==undefined&&l.e!==undefined&&l.d===undefined){var P=new w();P.setPublic(b64utohex(l.n),b64utohex(l.e));return P}if(l.kty==="RSA"&&l.n!==undefined&&l.e!==undefined&&l.d!==undefined&&l.p!==undefined&&l.q!==undefined&&l.dp!==undefined&&l.dq!==undefined&&l.qi!==undefined){var P=new w();P.setPrivateEx(b64utohex(l.n),b64utohex(l.e),b64utohex(l.d),b64utohex(l.p),b64utohex(l.q),b64utohex(l.dp),b64utohex(l.dq),b64utohex(l.qi));return P}if(l.kty==="RSA"&&l.n!==undefined&&l.e!==undefined&&l.d!==undefined){var P=new w();P.setPrivate(b64utohex(l.n),b64utohex(l.e),b64utohex(l.d));return P}if(l.kty==="EC"&&l.crv!==undefined&&l.x!==undefined&&l.y!==undefined&&l.d===undefined){var j=new i({curve:l.crv});var t=j.ecparams.keylen/4;var B=("0000000000"+b64utohex(l.x)).slice(-t);var z=("0000000000"+b64utohex(l.y)).slice(-t);var u="04"+B+z;j.setPublicKeyHex(u);return j}if(l.kty==="EC"&&l.crv!==undefined&&l.x!==undefined&&l.y!==undefined&&l.d!==undefined){var j=new i({curve:l.crv});var t=j.ecparams.keylen/4;var B=("0000000000"+b64utohex(l.x)).slice(-t);var z=("0000000000"+b64utohex(l.y)).slice(-t);var u="04"+B+z;var b=("0000000000"+b64utohex(l.d)).slice(-t);j.setPublicKeyHex(u);j.setPrivateKeyHex(b);return j}if(n==="pkcs5prv"){var J=l,G=ASN1HEX,N,P;N=L(J,0);if(N.length===9){P=new w();P.readPKCS5PrvKeyHex(J);}else {if(N.length===6){P=new C();P.readPKCS5PrvKeyHex(J);}else {if(N.length>2&&J.substr(N[1],2)==="04"){P=new i();P.readPKCS5PrvKeyHex(J);}else {throw "unsupported PKCS#1/5 hexadecimal key"}}}return P}if(n==="pkcs8prv"){var P=F.getKeyFromPlainPrivatePKCS8Hex(l);return P}if(n==="pkcs8pub"){return F._getKeyFromPublicPKCS8Hex(l)}if(n==="x509pub"){return X509.getPublicKeyFromCertHex(l)}if(l.indexOf("-END CERTIFICATE-",0)!=-1||l.indexOf("-END X509 CERTIFICATE-",0)!=-1||l.indexOf("-END TRUSTED CERTIFICATE-",0)!=-1){return X509.getPublicKeyFromCertPEM(l)}if(l.indexOf("-END PUBLIC KEY-")!=-1){var O=pemtohex(l,"PUBLIC KEY");return F._getKeyFromPublicPKCS8Hex(O)}if(l.indexOf("-END RSA PRIVATE KEY-")!=-1&&l.indexOf("4,ENCRYPTED")==-1){var m=M(l,"RSA PRIVATE KEY");return F.getKey(m,null,"pkcs5prv")}if(l.indexOf("-END DSA PRIVATE KEY-")!=-1&&l.indexOf("4,ENCRYPTED")==-1){var I=M(l,"DSA PRIVATE KEY");var E=d(I,0,[1],"02");var D=d(I,0,[2],"02");var K=d(I,0,[3],"02");var r=d(I,0,[4],"02");var s=d(I,0,[5],"02");var P=new C();P.setPrivate(new BigInteger$5(E,16),new BigInteger$5(D,16),new BigInteger$5(K,16),new BigInteger$5(r,16),new BigInteger$5(s,16));return P}if(l.indexOf("-END EC PRIVATE KEY-")!=-1&&l.indexOf("4,ENCRYPTED")==-1){var m=M(l,"EC PRIVATE KEY");return F.getKey(m,null,"pkcs5prv")}if(l.indexOf("-END PRIVATE KEY-")!=-1){return F.getKeyFromPlainPrivatePKCS8PEM(l)}if(l.indexOf("-END RSA PRIVATE KEY-")!=-1&&l.indexOf("4,ENCRYPTED")!=-1){var o=F.getDecryptedKeyHex(l,k);var H=new RSAKey();H.readPKCS5PrvKeyHex(o);return H}if(l.indexOf("-END EC PRIVATE KEY-")!=-1&&l.indexOf("4,ENCRYPTED")!=-1){var I=F.getDecryptedKeyHex(l,k);var P=d(I,0,[1],"04");var f=d(I,0,[2,0],"06");var A=d(I,0,[3,0],"03").substr(2);var e="";if(KJUR.crypto.OID.oidhex2name[f]!==undefined){e=KJUR.crypto.OID.oidhex2name[f];}else {throw "undefined OID(hex) in KJUR.crypto.OID: "+f}var j=new i({curve:e});j.setPublicKeyHex(A);j.setPrivateKeyHex(P);j.isPublic=false;return j}if(l.indexOf("-END DSA PRIVATE KEY-")!=-1&&l.indexOf("4,ENCRYPTED")!=-1){var I=F.getDecryptedKeyHex(l,k);var E=d(I,0,[1],"02");var D=d(I,0,[2],"02");var K=d(I,0,[3],"02");var r=d(I,0,[4],"02");var s=d(I,0,[5],"02");var P=new C();P.setPrivate(new BigInteger$5(E,16),new BigInteger$5(D,16),new BigInteger$5(K,16),new BigInteger$5(r,16),new BigInteger$5(s,16));return P}if(l.indexOf("-END ENCRYPTED PRIVATE KEY-")!=-1){return F.getKeyFromEncryptedPKCS8PEM(l,k)}throw new Error("not supported argument")};KEYUTIL.generateKeypair=function(a,c){if(a=="RSA"){var b=c;var h=new RSAKey();h.generate(b,"10001");h.isPrivate=true;h.isPublic=true;var f=new RSAKey();var e=h.n.toString(16);var i=h.e.toString(16);f.setPublic(e,i);f.isPrivate=false;f.isPublic=true;var k={};k.prvKeyObj=h;k.pubKeyObj=f;return k}else {if(a=="EC"){var d=c;var g=new KJUR.crypto.ECDSA({curve:d});var j=g.generateKeyPairHex();var h=new KJUR.crypto.ECDSA({curve:d});h.setPublicKeyHex(j.ecpubhex);h.setPrivateKeyHex(j.ecprvhex);h.isPrivate=true;h.isPublic=false;var f=new KJUR.crypto.ECDSA({curve:d});f.setPublicKeyHex(j.ecpubhex);f.isPrivate=false;f.isPublic=true;var k={};k.prvKeyObj=h;k.pubKeyObj=f;return k}else {throw "unknown algorithm: "+a}}};KEYUTIL.getPEM=function(b,D,y,m,q,j){var F=KJUR,k=F.asn1,z=k.DERObjectIdentifier,f=k.DERInteger,l=k.ASN1Util.newObject,a=k.x509,C=a.SubjectPublicKeyInfo,e=F.crypto,u=e.DSA,r=e.ECDSA,n=RSAKey;function A(s){var G=l({seq:[{"int":0},{"int":{bigint:s.n}},{"int":s.e},{"int":{bigint:s.d}},{"int":{bigint:s.p}},{"int":{bigint:s.q}},{"int":{bigint:s.dmp1}},{"int":{bigint:s.dmq1}},{"int":{bigint:s.coeff}}]});return G}function B(G){var s=l({seq:[{"int":1},{octstr:{hex:G.prvKeyHex}},{tag:["a0",true,{oid:{name:G.curveName}}]},{tag:["a1",true,{bitstr:{hex:"00"+G.pubKeyHex}}]}]});return s}function x(s){var G=l({seq:[{"int":0},{"int":{bigint:s.p}},{"int":{bigint:s.q}},{"int":{bigint:s.g}},{"int":{bigint:s.y}},{"int":{bigint:s.x}}]});return G}if(((n!==undefined&&b instanceof n)||(u!==undefined&&b instanceof u)||(r!==undefined&&b instanceof r))&&b.isPublic==true&&(D===undefined||D=="PKCS8PUB")){var E=new C(b);var w=E.getEncodedHex();return hextopem(w,"PUBLIC KEY")}if(D=="PKCS1PRV"&&n!==undefined&&b instanceof n&&(y===undefined||y==null)&&b.isPrivate==true){var E=A(b);var w=E.getEncodedHex();return hextopem(w,"RSA PRIVATE KEY")}if(D=="PKCS1PRV"&&r!==undefined&&b instanceof r&&(y===undefined||y==null)&&b.isPrivate==true){var i=new z({name:b.curveName});var v=i.getEncodedHex();var h=B(b);var t=h.getEncodedHex();var p="";p+=hextopem(v,"EC PARAMETERS");p+=hextopem(t,"EC PRIVATE KEY");return p}if(D=="PKCS1PRV"&&u!==undefined&&b instanceof u&&(y===undefined||y==null)&&b.isPrivate==true){var E=x(b);var w=E.getEncodedHex();return hextopem(w,"DSA PRIVATE KEY")}if(D=="PKCS5PRV"&&n!==undefined&&b instanceof n&&(y!==undefined&&y!=null)&&b.isPrivate==true){var E=A(b);var w=E.getEncodedHex();if(m===undefined){m="DES-EDE3-CBC";}return this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA",w,y,m,j)}if(D=="PKCS5PRV"&&r!==undefined&&b instanceof r&&(y!==undefined&&y!=null)&&b.isPrivate==true){var E=B(b);var w=E.getEncodedHex();if(m===undefined){m="DES-EDE3-CBC";}return this.getEncryptedPKCS5PEMFromPrvKeyHex("EC",w,y,m,j)}if(D=="PKCS5PRV"&&u!==undefined&&b instanceof u&&(y!==undefined&&y!=null)&&b.isPrivate==true){var E=x(b);var w=E.getEncodedHex();if(m===undefined){m="DES-EDE3-CBC";}return this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA",w,y,m,j)}var o=function(G,s){var I=c(G,s);var H=new l({seq:[{seq:[{oid:{name:"pkcs5PBES2"}},{seq:[{seq:[{oid:{name:"pkcs5PBKDF2"}},{seq:[{octstr:{hex:I.pbkdf2Salt}},{"int":I.pbkdf2Iter}]}]},{seq:[{oid:{name:"des-EDE3-CBC"}},{octstr:{hex:I.encryptionSchemeIV}}]}]}]},{octstr:{hex:I.ciphertext}}]});return H.getEncodedHex()};var c=function(N,O){var H=100;var M=CryptoJS.lib.WordArray.random(8);var L="DES-EDE3-CBC";var s=CryptoJS.lib.WordArray.random(8);var I=CryptoJS.PBKDF2(O,M,{keySize:192/32,iterations:H});var J=CryptoJS.enc.Hex.parse(N);var K=CryptoJS.TripleDES.encrypt(J,I,{iv:s})+"";var G={};G.ciphertext=K;G.pbkdf2Salt=CryptoJS.enc.Hex.stringify(M);G.pbkdf2Iter=H;G.encryptionSchemeAlg=L;G.encryptionSchemeIV=CryptoJS.enc.Hex.stringify(s);return G};if(D=="PKCS8PRV"&&n!=undefined&&b instanceof n&&b.isPrivate==true){var g=A(b);var d=g.getEncodedHex();var E=l({seq:[{"int":0},{seq:[{oid:{name:"rsaEncryption"}},{"null":true}]},{octstr:{hex:d}}]});var w=E.getEncodedHex();if(y===undefined||y==null){return hextopem(w,"PRIVATE KEY")}else {var t=o(w,y);return hextopem(t,"ENCRYPTED PRIVATE KEY")}}if(D=="PKCS8PRV"&&r!==undefined&&b instanceof r&&b.isPrivate==true){var g=new l({seq:[{"int":1},{octstr:{hex:b.prvKeyHex}},{tag:["a1",true,{bitstr:{hex:"00"+b.pubKeyHex}}]}]});var d=g.getEncodedHex();var E=l({seq:[{"int":0},{seq:[{oid:{name:"ecPublicKey"}},{oid:{name:b.curveName}}]},{octstr:{hex:d}}]});var w=E.getEncodedHex();if(y===undefined||y==null){return hextopem(w,"PRIVATE KEY")}else {var t=o(w,y);return hextopem(t,"ENCRYPTED PRIVATE KEY")}}if(D=="PKCS8PRV"&&u!==undefined&&b instanceof u&&b.isPrivate==true){var g=new f({bigint:b.x});var d=g.getEncodedHex();var E=l({seq:[{"int":0},{seq:[{oid:{name:"dsa"}},{seq:[{"int":{bigint:b.p}},{"int":{bigint:b.q}},{"int":{bigint:b.g}}]}]},{octstr:{hex:d}}]});var w=E.getEncodedHex();if(y===undefined||y==null){return hextopem(w,"PRIVATE KEY")}else {var t=o(w,y);return hextopem(t,"ENCRYPTED PRIVATE KEY")}}throw new Error("unsupported object nor format")};KEYUTIL.getKeyFromCSRPEM=function(b){var a=pemtohex(b,"CERTIFICATE REQUEST");var c=KEYUTIL.getKeyFromCSRHex(a);return c};KEYUTIL.getKeyFromCSRHex=function(a){var c=KEYUTIL.parseCSRHex(a);var b=KEYUTIL.getKey(c.p8pubkeyhex,null,"pkcs8pub");return b};KEYUTIL.parseCSRHex=function(d){var i=ASN1HEX;var f=i.getChildIdx;var c=i.getTLV;var b={};var g=d;if(g.substr(0,2)!="30"){throw "malformed CSR(code:001)"}var e=f(g,0);if(e.length<1){throw "malformed CSR(code:002)"}if(g.substr(e[0],2)!="30"){throw "malformed CSR(code:003)"}var a=f(g,e[0]);if(a.length<3){throw "malformed CSR(code:004)"}b.p8pubkeyhex=c(g,a[2]);return b};KEYUTIL.getKeyID=function(f){var c=KEYUTIL;var e=ASN1HEX;if(typeof f==="string"&&f.indexOf("BEGIN ")!=-1){f=c.getKey(f);}var d=pemtohex(c.getPEM(f));var b=e.getIdxbyList(d,0,[1]);var a=e.getV(d,b).substring(2);return KJUR.crypto.Util.hashHex(a,"sha1")};KEYUTIL.getJWKFromKey=function(d){var b={};if(d instanceof RSAKey&&d.isPrivate){b.kty="RSA";b.n=hextob64u(d.n.toString(16));b.e=hextob64u(d.e.toString(16));b.d=hextob64u(d.d.toString(16));b.p=hextob64u(d.p.toString(16));b.q=hextob64u(d.q.toString(16));b.dp=hextob64u(d.dmp1.toString(16));b.dq=hextob64u(d.dmq1.toString(16));b.qi=hextob64u(d.coeff.toString(16));return b}else {if(d instanceof RSAKey&&d.isPublic){b.kty="RSA";b.n=hextob64u(d.n.toString(16));b.e=hextob64u(d.e.toString(16));return b}else {if(d instanceof KJUR.crypto.ECDSA&&d.isPrivate){var a=d.getShortNISTPCurveName();if(a!=="P-256"&&a!=="P-384"){throw "unsupported curve name for JWT: "+a}var c=d.getPublicKeyXYHex();b.kty="EC";b.crv=a;b.x=hextob64u(c.x);b.y=hextob64u(c.y);b.d=hextob64u(d.prvKeyHex);return b}else {if(d instanceof KJUR.crypto.ECDSA&&d.isPublic){var a=d.getShortNISTPCurveName();if(a!=="P-256"&&a!=="P-384"){throw "unsupported curve name for JWT: "+a}var c=d.getPublicKeyXYHex();b.kty="EC";b.crv=a;b.x=hextob64u(c.x);b.y=hextob64u(c.y);return b}}}}throw "not supported key object"};
	RSAKey.getPosArrayOfChildrenFromHex=function(a){return ASN1HEX.getChildIdx(a,0)};RSAKey.getHexValueArrayOfChildrenFromHex=function(f){var n=ASN1HEX;var i=n.getV;var k=RSAKey.getPosArrayOfChildrenFromHex(f);var e=i(f,k[0]);var j=i(f,k[1]);var b=i(f,k[2]);var c=i(f,k[3]);var h=i(f,k[4]);var g=i(f,k[5]);var m=i(f,k[6]);var l=i(f,k[7]);var d=i(f,k[8]);var k=new Array();k.push(e,j,b,c,h,g,m,l,d);return k};RSAKey.prototype.readPrivateKeyFromPEMString=function(d){var c=pemtohex(d);var b=RSAKey.getHexValueArrayOfChildrenFromHex(c);this.setPrivateEx(b[1],b[2],b[3],b[4],b[5],b[6],b[7],b[8]);};RSAKey.prototype.readPKCS5PrvKeyHex=function(c){var b=RSAKey.getHexValueArrayOfChildrenFromHex(c);this.setPrivateEx(b[1],b[2],b[3],b[4],b[5],b[6],b[7],b[8]);};RSAKey.prototype.readPKCS8PrvKeyHex=function(e){var c,i,k,b,a,f,d,j;var m=ASN1HEX;var l=m.getVbyListEx;if(m.isASN1HEX(e)===false){throw new Error("not ASN.1 hex string")}try{c=l(e,0,[2,0,1],"02");i=l(e,0,[2,0,2],"02");k=l(e,0,[2,0,3],"02");b=l(e,0,[2,0,4],"02");a=l(e,0,[2,0,5],"02");f=l(e,0,[2,0,6],"02");d=l(e,0,[2,0,7],"02");j=l(e,0,[2,0,8],"02");}catch(g){throw new Error("malformed PKCS#8 plain RSA private key")}this.setPrivateEx(c,i,k,b,a,f,d,j);};RSAKey.prototype.readPKCS5PubKeyHex=function(c){var e=ASN1HEX;var b=e.getV;if(e.isASN1HEX(c)===false){throw new Error("keyHex is not ASN.1 hex string")}var a=e.getChildIdx(c,0);if(a.length!==2||c.substr(a[0],2)!=="02"||c.substr(a[1],2)!=="02"){throw new Error("wrong hex for PKCS#5 public key")}var f=b(c,a[0]);var d=b(c,a[1]);this.setPublic(f,d);};RSAKey.prototype.readPKCS8PubKeyHex=function(b){var c=ASN1HEX;if(c.isASN1HEX(b)===false){throw new Error("not ASN.1 hex string")}if(c.getTLVbyListEx(b,0,[0,0])!=="06092a864886f70d010101"){throw new Error("not PKCS8 RSA public key")}var a=c.getTLVbyListEx(b,0,[1,0]);this.readPKCS5PubKeyHex(a);};RSAKey.prototype.readCertPubKeyHex=function(b,d){var a,c;a=new X509();a.readCertHex(b);c=a.getPublicKeyHex();this.readPKCS8PubKeyHex(c);};
	function _zeroPaddingOfSignature(e,d){var c="";var a=d/4-e.length;for(var b=0;b<a;b++){c=c+"0";}return c+e}RSAKey.prototype.sign=function(d,a){var b=function(e){return KJUR.crypto.Util.hashString(e,a)};var c=b(d);return this.signWithMessageHash(c,a)};RSAKey.prototype.signWithMessageHash=function(e,c){var f=KJUR.crypto.Util.getPaddedDigestInfoHex(e,c,this.n.bitLength());var b=parseBigInt(f,16);var d=this.doPrivate(b);var a=d.toString(16);return _zeroPaddingOfSignature(a,this.n.bitLength())};function pss_mgf1_str(c,a,e){var b="",d=0;while(b.length<a){b+=hextorstr(e(rstrtohex(c+String.fromCharCode.apply(String,[(d&4278190080)>>24,(d&16711680)>>16,(d&65280)>>8,d&255]))));d+=1;}return b}RSAKey.prototype.signPSS=function(e,a,d){var c=function(f){return KJUR.crypto.Util.hashHex(f,a)};var b=c(rstrtohex(e));if(d===undefined){d=-1;}return this.signWithMessageHashPSS(b,a,d)};RSAKey.prototype.signWithMessageHashPSS=function(l,a,k){var b=hextorstr(l);var g=b.length;var m=this.n.bitLength()-1;var c=Math.ceil(m/8);var d;var o=function(i){return KJUR.crypto.Util.hashHex(i,a)};if(k===-1||k===undefined){k=g;}else {if(k===-2){k=c-g-2;}else {if(k<-2){throw new Error("invalid salt length")}}}if(c<(g+k+2)){throw new Error("data too long")}var f="";if(k>0){f=new Array(k);new SecureRandom().nextBytes(f);f=String.fromCharCode.apply(String,f);}var n=hextorstr(o(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00"+b+f)));var j=[];for(d=0;d<c-k-g-2;d+=1){j[d]=0;}var e=String.fromCharCode.apply(String,j)+"\x01"+f;var h=pss_mgf1_str(n,e.length,o);var q=[];for(d=0;d<e.length;d+=1){q[d]=e.charCodeAt(d)^h.charCodeAt(d);}var p=(65280>>(8*c-m))&255;q[0]&=~p;for(d=0;d<g;d++){q.push(n.charCodeAt(d));}q.push(188);return _zeroPaddingOfSignature(this.doPrivate(new BigInteger$5(q)).toString(16),this.n.bitLength())};function _rsasign_getAlgNameAndHashFromHexDisgestInfo(f){for(var e in KJUR.crypto.Util.DIGESTINFOHEAD){var d=KJUR.crypto.Util.DIGESTINFOHEAD[e];var b=d.length;if(f.substring(0,b)==d){var c=[e,f.substring(b)];return c}}return []}RSAKey.prototype.verify=function(f,l){l=l.toLowerCase();if(l.match(/^[0-9a-f]+$/)==null){return false}var b=parseBigInt(l,16);var k=this.n.bitLength();if(b.bitLength()>k){return false}var j=this.doPublic(b);var i=j.toString(16);if(i.length+3!=k/4){return false}var e=i.replace(/^1f+00/,"");var g=_rsasign_getAlgNameAndHashFromHexDisgestInfo(e);if(g.length==0){return false}var d=g[0];var h=g[1];var a=function(m){return KJUR.crypto.Util.hashString(m,d)};var c=a(f);return(h==c)};RSAKey.prototype.verifyWithMessageHash=function(e,a){if(a.length!=Math.ceil(this.n.bitLength()/4)){return false}var b=parseBigInt(a,16);if(b.bitLength()>this.n.bitLength()){return 0}var h=this.doPublic(b);var g=h.toString(16).replace(/^1f+00/,"");var c=_rsasign_getAlgNameAndHashFromHexDisgestInfo(g);if(c.length==0){return false}c[0];var f=c[1];return(f==e)};RSAKey.prototype.verifyPSS=function(c,b,a,f){var e=function(g){return KJUR.crypto.Util.hashHex(g,a)};var d=e(rstrtohex(c));if(f===undefined){f=-1;}return this.verifyWithMessageHashPSS(d,b,a,f)};RSAKey.prototype.verifyWithMessageHashPSS=function(f,s,l,c){if(s.length!=Math.ceil(this.n.bitLength()/4)){return false}var k=new BigInteger$5(s,16);var r=function(i){return KJUR.crypto.Util.hashHex(i,l)};var j=hextorstr(f);var h=j.length;var g=this.n.bitLength()-1;var m=Math.ceil(g/8);var q;if(c===-1||c===undefined){c=h;}else {if(c===-2){c=m-h-2;}else {if(c<-2){throw new Error("invalid salt length")}}}if(m<(h+c+2)){throw new Error("data too long")}var a=this.doPublic(k).toByteArray();for(q=0;q<a.length;q+=1){a[q]&=255;}while(a.length<m){a.unshift(0);}if(a[m-1]!==188){throw new Error("encoded message does not end in 0xbc")}a=String.fromCharCode.apply(String,a);var d=a.substr(0,m-h-1);var e=a.substr(d.length,h);var p=(65280>>(8*m-g))&255;if((d.charCodeAt(0)&p)!==0){throw new Error("bits beyond keysize not zero")}var n=pss_mgf1_str(e,d.length,r);var o=[];for(q=0;q<d.length;q+=1){o[q]=d.charCodeAt(q)^n.charCodeAt(q);}o[0]&=~p;var b=m-h-c-2;for(q=0;q<b;q+=1){if(o[q]!==0){throw new Error("leftmost octets not zero")}}if(o[b]!==1){throw new Error("0x01 marker not found")}return e===hextorstr(r(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00"+j+String.fromCharCode.apply(String,o.slice(-c)))))};RSAKey.SALT_LEN_HLEN=-1;RSAKey.SALT_LEN_MAX=-2;RSAKey.SALT_LEN_RECOVER=-2;
	function X509(q){var j=ASN1HEX,n=j.getChildIdx,g=j.getV,b=j.getTLV,c=j.getVbyList,k=j.getVbyListEx,a=j.getTLVbyList,l=j.getTLVbyListEx,h=j.getIdxbyList,e=j.getIdxbyListEx,i=j.getVidx,s=j.getInt,p=j.oidname,m=j.hextooidstr,r=pemtohex,f;try{f=KJUR.asn1.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV;}catch(o){}this.HEX2STAG={"0c":"utf8","13":"prn","16":"ia5","1a":"vis","1e":"bmp"};this.hex=null;this.version=0;this.foffset=0;this.aExtInfo=null;this.getVersion=function(){if(this.hex===null||this.version!==0){return this.version}var u=a(this.hex,0,[0,0]);if(u.substr(0,2)=="a0"){var v=a(u,0,[0]);var t=s(v,0);if(t<0||2<t){throw new Error("malformed version field")}this.version=t+1;return this.version}else {this.version=1;this.foffset=-1;return 1}};this.getSerialNumberHex=function(){return k(this.hex,0,[0,0],"02")};this.getSignatureAlgorithmField=function(){var t=l(this.hex,0,[0,1]);return this.getAlgorithmIdentifierName(t)};this.getAlgorithmIdentifierName=function(t){for(var u in f){if(t===f[u]){return u}}return p(k(t,0,[0],"06"))};this.getIssuer=function(){return this.getX500Name(this.getIssuerHex())};this.getIssuerHex=function(){return a(this.hex,0,[0,3+this.foffset],"30")};this.getIssuerString=function(){var t=this.getIssuer();return t.str};this.getSubject=function(){return this.getX500Name(this.getSubjectHex())};this.getSubjectHex=function(){return a(this.hex,0,[0,5+this.foffset],"30")};this.getSubjectString=function(){var t=this.getSubject();return t.str};this.getNotBefore=function(){var t=c(this.hex,0,[0,4+this.foffset,0]);t=t.replace(/(..)/g,"%$1");t=decodeURIComponent(t);return t};this.getNotAfter=function(){var t=c(this.hex,0,[0,4+this.foffset,1]);t=t.replace(/(..)/g,"%$1");t=decodeURIComponent(t);return t};this.getPublicKeyHex=function(){return j.getTLVbyList(this.hex,0,[0,6+this.foffset],"30")};this.getPublicKeyIdx=function(){return h(this.hex,0,[0,6+this.foffset],"30")};this.getPublicKeyContentIdx=function(){var t=this.getPublicKeyIdx();return h(this.hex,t,[1,0],"30")};this.getPublicKey=function(){return KEYUTIL.getKey(this.getPublicKeyHex(),null,"pkcs8pub")};this.getSignatureAlgorithmName=function(){var t=a(this.hex,0,[1],"30");return this.getAlgorithmIdentifierName(t)};this.getSignatureValueHex=function(){return c(this.hex,0,[2],"03",true)};this.verifySignature=function(v){var w=this.getSignatureAlgorithmField();var t=this.getSignatureValueHex();var u=a(this.hex,0,[0],"30");var x=new KJUR.crypto.Signature({alg:w});x.init(v);x.updateHex(u);return x.verify(t)};this.parseExt=function(C){var v,t,x;if(C===undefined){x=this.hex;if(this.version!==3){return -1}v=h(x,0,[0,7,0],"30");t=n(x,v);}else {x=pemtohex(C);var y=h(x,0,[0,3,0,0],"06");if(g(x,y)!="2a864886f70d01090e"){this.aExtInfo=new Array();return}v=h(x,0,[0,3,0,1,0],"30");t=n(x,v);this.hex=x;}this.aExtInfo=new Array();for(var w=0;w<t.length;w++){var A={};A.critical=false;var z=n(x,t[w]);var u=0;if(z.length===3){A.critical=true;u=1;}A.oid=j.hextooidstr(c(x,t[w],[0],"06"));var B=h(x,t[w],[1+u]);A.vidx=i(x,B);this.aExtInfo.push(A);}};this.getExtInfo=function(v){var t=this.aExtInfo;var w=v;if(!v.match(/^[0-9.]+$/)){w=KJUR.asn1.x509.OID.name2oid(v);}if(w===""){return undefined}for(var u=0;u<t.length;u++){if(t[u].oid===w){return t[u]}}return undefined};this.getExtBasicConstraints=function(u,y){if(u===undefined&&y===undefined){var w=this.getExtInfo("basicConstraints");if(w===undefined){return undefined}u=b(this.hex,w.vidx);y=w.critical;}var t={extname:"basicConstraints"};if(y){t.critical=true;}if(u==="3000"){return t}if(u==="30030101ff"){t.cA=true;return t}if(u.substr(0,12)==="30060101ff02"){var x=g(u,10);var v=parseInt(x,16);t.cA=true;t.pathLen=v;return t}throw new Error("hExtV parse error: "+u)};this.getExtKeyUsage=function(u,w){if(u===undefined&&w===undefined){var v=this.getExtInfo("keyUsage");if(v===undefined){return undefined}u=b(this.hex,v.vidx);w=v.critical;}var t={extname:"keyUsage"};if(w){t.critical=true;}t.names=this.getExtKeyUsageString(u).split(",");return t};this.getExtKeyUsageBin=function(u){if(u===undefined){var v=this.getExtInfo("keyUsage");if(v===undefined){return ""}u=b(this.hex,v.vidx);}if(u.length!=8&&u.length!=10){throw new Error("malformed key usage value: "+u)}var t="000000000000000"+parseInt(u.substr(6),16).toString(2);if(u.length==8){t=t.slice(-8);}if(u.length==10){t=t.slice(-16);}t=t.replace(/0+$/,"");if(t==""){t="0";}return t};this.getExtKeyUsageString=function(v){var w=this.getExtKeyUsageBin(v);var t=new Array();for(var u=0;u<w.length;u++){if(w.substr(u,1)=="1"){t.push(X509.KEYUSAGE_NAME[u]);}}return t.join(",")};this.getExtSubjectKeyIdentifier=function(v,x){if(v===undefined&&x===undefined){var w=this.getExtInfo("subjectKeyIdentifier");if(w===undefined){return undefined}v=b(this.hex,w.vidx);x=w.critical;}var t={extname:"subjectKeyIdentifier"};if(x){t.critical=true;}var u=g(v,0);t.kid={hex:u};return t};this.getExtAuthorityKeyIdentifier=function(z,x){if(z===undefined&&x===undefined){var t=this.getExtInfo("authorityKeyIdentifier");if(t===undefined){return undefined}z=b(this.hex,t.vidx);x=t.critical;}var A={extname:"authorityKeyIdentifier"};if(x){A.critical=true;}var y=n(z,0);for(var u=0;u<y.length;u++){var B=z.substr(y[u],2);if(B==="80"){A.kid={hex:g(z,y[u])};}if(B==="a1"){var w=b(z,y[u]);var v=this.getGeneralNames(w);A.issuer=v[0]["dn"];}if(B==="82"){A.sn={hex:g(z,y[u])};}}return A};this.getExtExtKeyUsage=function(w,y){if(w===undefined&&y===undefined){var x=this.getExtInfo("extKeyUsage");if(x===undefined){return undefined}w=b(this.hex,x.vidx);y=x.critical;}var t={extname:"extKeyUsage",array:[]};if(y){t.critical=true;}var u=n(w,0);for(var v=0;v<u.length;v++){t.array.push(p(g(w,u[v])));}return t};this.getExtExtKeyUsageName=function(){var x=this.getExtInfo("extKeyUsage");if(x===undefined){return x}var t=new Array();var w=b(this.hex,x.vidx);if(w===""){return t}var u=n(w,0);for(var v=0;v<u.length;v++){t.push(p(g(w,u[v])));}return t};this.getExtSubjectAltName=function(u,w){if(u===undefined&&w===undefined){var v=this.getExtInfo("subjectAltName");if(v===undefined){return undefined}u=b(this.hex,v.vidx);w=v.critical;}var t={extname:"subjectAltName",array:[]};if(w){t.critical=true;}t.array=this.getGeneralNames(u);return t};this.getExtIssuerAltName=function(u,w){if(u===undefined&&w===undefined){var v=this.getExtInfo("issuerAltName");if(v===undefined){return undefined}u=b(this.hex,v.vidx);w=v.critical;}var t={extname:"issuerAltName",array:[]};if(w){t.critical=true;}t.array=this.getGeneralNames(u);return t};this.getGeneralNames=function(x){var v=n(x,0);var t=[];for(var w=0;w<v.length;w++){var u=this.getGeneralName(b(x,v[w]));if(u!==undefined){t.push(u);}}return t};this.getGeneralName=function(u){var t=u.substr(0,2);var w=g(u,0);var v=hextorstr(w);if(t=="81"){return {rfc822:v}}if(t=="82"){return {dns:v}}if(t=="86"){return {uri:v}}if(t=="87"){return {ip:hextoip(w)}}if(t=="a4"){return {dn:this.getX500Name(w)}}return undefined};this.getExtSubjectAltName2=function(){var x,A,z;var y=this.getExtInfo("subjectAltName");if(y===undefined){return y}var t=new Array();var w=b(this.hex,y.vidx);var u=n(w,0);for(var v=0;v<u.length;v++){z=w.substr(u[v],2);x=g(w,u[v]);if(z==="81"){A=hextoutf8(x);t.push(["MAIL",A]);}if(z==="82"){A=hextoutf8(x);t.push(["DNS",A]);}if(z==="84"){A=X509.hex2dn(x,0);t.push(["DN",A]);}if(z==="86"){A=hextoutf8(x);t.push(["URI",A]);}if(z==="87"){A=hextoip(x);t.push(["IP",A]);}}return t};this.getExtCRLDistributionPoints=function(x,z){if(x===undefined&&z===undefined){var y=this.getExtInfo("cRLDistributionPoints");if(y===undefined){return undefined}x=b(this.hex,y.vidx);z=y.critical;}var u={extname:"cRLDistributionPoints",array:[]};if(z){u.critical=true;}var v=n(x,0);for(var w=0;w<v.length;w++){var t=b(x,v[w]);u.array.push(this.getDistributionPoint(t));}return u};this.getDistributionPoint=function(y){var v={};var w=n(y,0);for(var x=0;x<w.length;x++){var u=y.substr(w[x],2);var t=b(y,w[x]);if(u=="a0"){v.dpname=this.getDistributionPointName(t);}}return v};this.getDistributionPointName=function(y){var v={};var w=n(y,0);for(var x=0;x<w.length;x++){var u=y.substr(w[x],2);var t=b(y,w[x]);if(u=="a0"){v.full=this.getGeneralNames(t);}}return v};this.getExtCRLDistributionPointsURI=function(){var y=this.getExtInfo("cRLDistributionPoints");if(y===undefined){return y}var t=new Array();var u=n(this.hex,y.vidx);for(var w=0;w<u.length;w++){try{var z=c(this.hex,u[w],[0,0,0],"86");var x=hextoutf8(z);t.push(x);}catch(v){}}return t};this.getExtAIAInfo=function(){var x=this.getExtInfo("authorityInfoAccess");if(x===undefined){return x}var t={ocsp:[],caissuer:[]};var u=n(this.hex,x.vidx);for(var v=0;v<u.length;v++){var y=c(this.hex,u[v],[0],"06");var w=c(this.hex,u[v],[1],"86");if(y==="2b06010505073001"){t.ocsp.push(hextoutf8(w));}if(y==="2b06010505073002"){t.caissuer.push(hextoutf8(w));}}return t};this.getExtAuthorityInfoAccess=function(A,y){if(A===undefined&&y===undefined){var t=this.getExtInfo("authorityInfoAccess");if(t===undefined){return undefined}A=b(this.hex,t.vidx);y=t.critical;}var B={extname:"authorityInfoAccess",array:[]};if(y){B.critical=true;}var z=n(A,0);for(var u=0;u<z.length;u++){var x=k(A,z[u],[0],"06");var v=c(A,z[u],[1],"86");var w=hextoutf8(v);if(x=="2b06010505073001"){B.array.push({ocsp:w});}else {if(x=="2b06010505073002"){B.array.push({caissuer:w});}else {throw new Error("unknown method: "+x)}}}return B};this.getExtCertificatePolicies=function(x,A){if(x===undefined&&A===undefined){var z=this.getExtInfo("certificatePolicies");if(z===undefined){return undefined}x=b(this.hex,z.vidx);A=z.critical;}var t={extname:"certificatePolicies",array:[]};if(A){t.critical=true;}var u=n(x,0);for(var v=0;v<u.length;v++){var y=b(x,u[v]);var w=this.getPolicyInformation(y);t.array.push(w);}return t};this.getPolicyInformation=function(x){var t={};var z=c(x,0,[0],"06");t.policyoid=p(z);var A=e(x,0,[1],"30");if(A!=-1){t.array=[];var u=n(x,A);for(var v=0;v<u.length;v++){var y=b(x,u[v]);var w=this.getPolicyQualifierInfo(y);t.array.push(w);}}return t};this.getPolicyQualifierInfo=function(u){var t={};var v=c(u,0,[0],"06");if(v==="2b06010505070201"){var x=k(u,0,[1],"16");t.cps=hextorstr(x);}else {if(v==="2b06010505070202"){var w=a(u,0,[1],"30");t.unotice=this.getUserNotice(w);}}return t};this.getUserNotice=function(x){var u={};var v=n(x,0);for(var w=0;w<v.length;w++){var t=b(x,v[w]);if(t.substr(0,2)!="30"){u.exptext=this.getDisplayText(t);}}return u};this.getDisplayText=function(u){var v={"0c":"utf8","16":"ia5","1a":"vis","1e":"bmp"};var t={};t.type=v[u.substr(0,2)];t.str=hextorstr(g(u,0));return t};this.getExtCRLNumber=function(u,v){var t={extname:"cRLNumber"};if(v){t.critical=true;}if(u.substr(0,2)=="02"){t.num={hex:g(u,0)};return t}throw new Error("hExtV parse error: "+u)};this.getExtCRLReason=function(u,v){var t={extname:"cRLReason"};if(v){t.critical=true;}if(u.substr(0,2)=="0a"){t.code=parseInt(g(u,0),16);return t}throw new Error("hExtV parse error: "+u)};this.getExtOcspNonce=function(u,w){var t={extname:"ocspNonce"};if(w){t.critical=true;}var v=g(u,0);t.hex=v;return t};this.getExtOcspNoCheck=function(u,v){var t={extname:"ocspNoCheck"};if(v){t.critical=true;}return t};this.getExtAdobeTimeStamp=function(w,z){if(w===undefined&&z===undefined){var y=this.getExtInfo("adobeTimeStamp");if(y===undefined){return undefined}w=b(this.hex,y.vidx);z=y.critical;}var t={extname:"adobeTimeStamp"};if(z){t.critical=true;}var v=n(w,0);if(v.length>1){var A=b(w,v[1]);var u=this.getGeneralName(A);if(u.uri!=undefined){t.uri=u.uri;}}if(v.length>2){var x=b(w,v[2]);if(x=="0101ff"){t.reqauth=true;}if(x=="010100"){t.reqauth=false;}}return t};this.getX500NameRule=function(t){var G=null;var B=[];for(var w=0;w<t.length;w++){var y=t[w];for(var v=0;v<y.length;v++){B.push(y[v]);}}for(var w=0;w<B.length;w++){var F=B[w];var H=F.ds;var C=F.value;var z=F.type;if(H!="prn"&&H!="utf8"&&H!="ia5"){return "mixed"}if(H=="ia5"){if(z!="CN"){return "mixed"}else {if(!KJUR.lang.String.isMail(C)){return "mixed"}else {continue}}}if(z=="C"){if(H=="prn"){continue}else {return "mixed"}}if(G==null){G=H;}else {if(G!==H){return "mixed"}}}if(G==null){return "prn"}else {return G}};this.getX500Name=function(v){var t=this.getX500NameArray(v);var u=this.dnarraytostr(t);return {array:t,str:u}};this.getX500NameArray=function(w){var t=[];var u=n(w,0);for(var v=0;v<u.length;v++){t.push(this.getRDN(b(w,u[v])));}return t};this.getRDN=function(w){var t=[];var u=n(w,0);for(var v=0;v<u.length;v++){t.push(this.getAttrTypeAndValue(b(w,u[v])));}return t};this.getAttrTypeAndValue=function(v){var t={type:null,value:null,ds:null};var u=n(v,0);var y=c(v,u[0],[],"06");var x=c(v,u[1],[]);var w=KJUR.asn1.ASN1Util.oidHexToInt(y);t.type=KJUR.asn1.x509.OID.oid2atype(w);t.ds=this.HEX2STAG[v.substr(u[1],2)];if(t.ds!="bmp"){t.value=hextoutf8(x);}else {t.value=ucs2hextoutf8(x);}return t};this.readCertPEM=function(t){this.readCertHex(r(t));};this.readCertHex=function(t){this.hex=t;this.getVersion();try{h(this.hex,0,[0,7],"a3");this.parseExt();}catch(u){}};this.getParam=function(){var t={};t.version=this.getVersion();t.serial={hex:this.getSerialNumberHex()};t.sigalg=this.getSignatureAlgorithmField();t.issuer=this.getIssuer();t.notbefore=this.getNotBefore();t.notafter=this.getNotAfter();t.subject=this.getSubject();t.sbjpubkey=hextopem(this.getPublicKeyHex(),"PUBLIC KEY");if(this.aExtInfo.length>0){t.ext=this.getExtParamArray();}t.sighex=this.getSignatureValueHex();return t};this.getExtParamArray=function(u){if(u==undefined){var w=e(this.hex,0,[0,"[3]"]);if(w!=-1){u=l(this.hex,0,[0,"[3]",0],"30");}}var t=[];var v=n(u,0);for(var x=0;x<v.length;x++){var z=b(u,v[x]);var y=this.getExtParam(z);if(y!=null){t.push(y);}}return t};this.getExtParam=function(u){var w=n(u,0);var x=w.length;if(x!=2&&x!=3){throw new Error("wrong number elements in Extension: "+x+" "+u)}var v=m(c(u,0,[0],"06"));var z=false;if(x==3&&a(u,0,[1])=="0101ff"){z=true;}var A=a(u,0,[x-1,0]);var y=undefined;if(v=="2.5.29.14"){y=this.getExtSubjectKeyIdentifier(A,z);}else {if(v=="2.5.29.15"){y=this.getExtKeyUsage(A,z);}else {if(v=="2.5.29.17"){y=this.getExtSubjectAltName(A,z);}else {if(v=="2.5.29.18"){y=this.getExtIssuerAltName(A,z);}else {if(v=="2.5.29.19"){y=this.getExtBasicConstraints(A,z);}else {if(v=="2.5.29.31"){y=this.getExtCRLDistributionPoints(A,z);}else {if(v=="2.5.29.32"){y=this.getExtCertificatePolicies(A,z);}else {if(v=="2.5.29.35"){y=this.getExtAuthorityKeyIdentifier(A,z);}else {if(v=="2.5.29.37"){y=this.getExtExtKeyUsage(A,z);}else {if(v=="1.3.6.1.5.5.7.1.1"){y=this.getExtAuthorityInfoAccess(A,z);}else {if(v=="2.5.29.20"){y=this.getExtCRLNumber(A,z);}else {if(v=="2.5.29.21"){y=this.getExtCRLReason(A,z);}else {if(v=="1.3.6.1.5.5.7.48.1.2"){y=this.getExtOcspNonce(A,z);}else {if(v=="1.3.6.1.5.5.7.48.1.5"){y=this.getExtOcspNoCheck(A,z);}else {if(v=="1.2.840.113583.1.1.9.1"){y=this.getExtAdobeTimeStamp(A,z);}}}}}}}}}}}}}}}if(y!=undefined){return y}var t={extname:v,extn:A};if(z){t.critical=true;}return t};this.findExt=function(u,v){for(var t=0;t<u.length;t++){if(u[t].extname==v){return u[t]}}return null};this.updateExtCDPFullURI=function(x,t){var w=this.findExt(x,"cRLDistributionPoints");if(w==null){return}if(w.array==undefined){return}var z=w.array;for(var v=0;v<z.length;v++){if(z[v].dpname==undefined){continue}if(z[v].dpname.full==undefined){continue}var A=z[v].dpname.full;for(var u=0;u<A.length;u++){var y=A[v];if(y.uri==undefined){continue}y.uri=t;}}};this.updateExtAIAOCSP=function(x,u){var w=this.findExt(x,"authorityInfoAccess");if(w==null){return}if(w.array==undefined){return}var t=w.array;for(var v=0;v<t.length;v++){if(t[v].ocsp!=undefined){t[v].ocsp=u;}}};this.updateExtAIACAIssuer=function(x,u){var w=this.findExt(x,"authorityInfoAccess");if(w==null){return}if(w.array==undefined){return}var t=w.array;for(var v=0;v<t.length;v++){if(t[v].caissuer!=undefined){t[v].caissuer=u;}}};this.dnarraytostr=function(v){function t(w){return w.map(function(y){return u(y).replace(/\+/,"\\+")}).join("+")}function u(w){return w.type+"="+w.value}return "/"+v.map(function(w){return t(w).replace(/\//,"\\/")}).join("/")};this.getInfo=function(){var u=function(M){var L=JSON.stringify(M.array).replace(/[\[\]\{\}\"]/g,"");return L};var A=function(R){var P="";var L=R.array;for(var O=0;O<L.length;O++){var Q=L[O];P+="    policy oid: "+Q.policyoid+"\n";if(Q.array===undefined){continue}for(var N=0;N<Q.array.length;N++){var M=Q.array[N];if(M.cps!==undefined){P+="    cps: "+M.cps+"\n";}}}return P};var D=function(P){var O="";var L=P.array;for(var N=0;N<L.length;N++){var Q=L[N];try{if(Q.dpname.full[0].uri!==undefined){O+="    "+Q.dpname.full[0].uri+"\n";}}catch(M){}try{if(Q.dname.full[0].dn.hex!==undefined){O+="    "+X509.hex2dn(Q.dpname.full[0].dn.hex)+"\n";}}catch(M){}}return O};var B=function(P){var O="";var L=P.array;for(var M=0;M<L.length;M++){var N=L[M];if(N.caissuer!==undefined){O+="    caissuer: "+N.caissuer+"\n";}if(N.ocsp!==undefined){O+="    ocsp: "+N.ocsp+"\n";}}return O};var F,E,K;F="Basic Fields\n";F+="  serial number: "+this.getSerialNumberHex()+"\n";F+="  signature algorithm: "+this.getSignatureAlgorithmField()+"\n";F+="  issuer: "+this.getIssuerString()+"\n";F+="  notBefore: "+this.getNotBefore()+"\n";F+="  notAfter: "+this.getNotAfter()+"\n";F+="  subject: "+this.getSubjectString()+"\n";F+="  subject public key info: \n";E=this.getPublicKey();F+="    key algorithm: "+E.type+"\n";if(E.type==="RSA"){F+="    n="+hextoposhex(E.n.toString(16)).substr(0,16)+"...\n";F+="    e="+hextoposhex(E.e.toString(16))+"\n";}K=this.aExtInfo;if(K!==undefined&&K!==null){F+="X509v3 Extensions:\n";for(var H=0;H<K.length;H++){var J=K[H];var t=KJUR.asn1.x509.OID.oid2name(J.oid);if(t===""){t=J.oid;}var G="";if(J.critical===true){G="CRITICAL";}F+="  "+t+" "+G+":\n";if(t==="basicConstraints"){var w=this.getExtBasicConstraints();if(w.cA===undefined){F+="    {}\n";}else {F+="    cA=true";if(w.pathLen!==undefined){F+=", pathLen="+w.pathLen;}F+="\n";}}else {if(t==="keyUsage"){F+="    "+this.getExtKeyUsageString()+"\n";}else {if(t==="subjectKeyIdentifier"){F+="    "+this.getExtSubjectKeyIdentifier().kid.hex+"\n";}else {if(t==="authorityKeyIdentifier"){var x=this.getExtAuthorityKeyIdentifier();if(x.kid!==undefined){F+="    kid="+x.kid.hex+"\n";}}else {if(t==="extKeyUsage"){var I=this.getExtExtKeyUsage().array;F+="    "+I.join(", ")+"\n";}else {if(t==="subjectAltName"){var y=u(this.getExtSubjectAltName());F+="    "+y+"\n";}else {if(t==="cRLDistributionPoints"){var C=this.getExtCRLDistributionPoints();F+=D(C);}else {if(t==="authorityInfoAccess"){var z=this.getExtAuthorityInfoAccess();F+=B(z);}else {if(t==="certificatePolicies"){F+=A(this.getExtCertificatePolicies());}}}}}}}}}}}F+="signature algorithm: "+this.getSignatureAlgorithmName()+"\n";F+="signature: "+this.getSignatureValueHex().substr(0,16)+"...\n";return F};if(typeof q=="string"){if(q.indexOf("-----BEGIN")!=-1){this.readCertPEM(q);}else {if(KJUR.lang.String.isHex(q)){this.readCertHex(q);}}}}X509.hex2dn=function(e,b){if(b===undefined){b=0;}var a=new X509();ASN1HEX.getTLV(e,b);var d=a.getX500Name(e);return d.str};X509.hex2rdn=function(f,b){if(b===undefined){b=0;}if(f.substr(b,2)!=="31"){throw new Error("malformed RDN")}var c=new Array();var d=ASN1HEX.getChildIdx(f,b);for(var e=0;e<d.length;e++){c.push(X509.hex2attrTypeValue(f,d[e]));}c=c.map(function(a){return a.replace("+","\\+")});return c.join("+")};X509.hex2attrTypeValue=function(d,i){var j=ASN1HEX;var h=j.getV;if(i===undefined){i=0;}if(d.substr(i,2)!=="30"){throw new Error("malformed attribute type and value")}var g=j.getChildIdx(d,i);if(g.length!==2||d.substr(g[0],2)!=="06");var b=h(d,g[0]);var f=KJUR.asn1.ASN1Util.oidHexToInt(b);var e=KJUR.asn1.x509.OID.oid2atype(f);var a=h(d,g[1]);var c=hextorstr(a);return e+"="+c};X509.getPublicKeyFromCertHex=function(b){var a=new X509();a.readCertHex(b);return a.getPublicKey()};X509.getPublicKeyFromCertPEM=function(b){var a=new X509();a.readCertPEM(b);return a.getPublicKey()};X509.getPublicKeyInfoPropOfCertPEM=function(c){var e=ASN1HEX;var g=e.getVbyList;var b={};var a,f;b.algparam=null;a=new X509();a.readCertPEM(c);f=a.getPublicKeyHex();b.keyhex=g(f,0,[1],"03").substr(2);b.algoid=g(f,0,[0,0],"06");if(b.algoid==="2a8648ce3d0201"){b.algparam=g(f,0,[0,1],"06");}return b};X509.KEYUSAGE_NAME=["digitalSignature","nonRepudiation","keyEncipherment","dataEncipherment","keyAgreement","keyCertSign","cRLSign","encipherOnly","decipherOnly"];
	var X509CRL=function(e){var a=KJUR,f=a.lang.String.isHex,m=ASN1HEX,k=m.getV,b=m.getTLV,h=m.getVbyList,c=m.getTLVbyList,d=m.getTLVbyListEx,i=m.getIdxbyList,g=m.getIdxbyListEx,l=m.getChildIdx,j=new X509();this.hex=null;this.posSigAlg=null;this.posRevCert=null;this._setPos=function(){var o=i(this.hex,0,[0,0]);var n=this.hex.substr(o,2);if(n=="02"){this.posSigAlg=1;}else {if(n=="30"){this.posSigAlg=0;}else {throw new Error("malformed 1st item of TBSCertList: "+n)}}var s=i(this.hex,0,[0,this.posSigAlg+3]);var r=this.hex.substr(s,2);if(r=="17"||r=="18"){var q,p;q=i(this.hex,0,[0,this.posSigAlg+4]);this.posRevCert=null;if(q!=-1){p=this.hex.substr(q,2);if(p=="30"){this.posRevCert=this.posSigAlg+4;}}}else {if(r=="30"){this.posRevCert=this.posSigAlg+3;}else {if(r=="a0"){this.posRevCert=null;}else {throw new Error("malformed nextUpdate or revCert tag: "+r)}}}};this.getVersion=function(){if(this.posSigAlg==0){return null}return parseInt(h(this.hex,0,[0,0],"02"),16)+1};this.getSignatureAlgorithmField=function(){var n=c(this.hex,0,[0,this.posSigAlg],"30");return j.getAlgorithmIdentifierName(n)};this.getIssuer=function(){var n=c(this.hex,0,[0,this.posSigAlg+1],"30");return j.getX500Name(n)};this.getThisUpdate=function(){var n=h(this.hex,0,[0,this.posSigAlg+2]);return result=hextorstr(n)};this.getNextUpdate=function(){var o=i(this.hex,0,[0,this.posSigAlg+3]);var n=this.hex.substr(o,2);if(n!="17"&&n!="18"){return null}return hextorstr(k(this.hex,o))};this.getRevCertArray=function(){if(this.posRevCert==null){return null}var o=[];var n=i(this.hex,0,[0,this.posRevCert]);var p=l(this.hex,n);for(var q=0;q<p.length;q++){var r=b(this.hex,p[q]);o.push(this.getRevCert(r));}return o};this.getRevCert=function(p){var o={};var n=l(p,0);o.sn={hex:h(p,0,[0],"02")};o.date=hextorstr(h(p,0,[1]));if(n.length==3){o.ext=j.getExtParamArray(c(p,0,[2]));}return o};this.getSignatureValueHex=function(){return h(this.hex,0,[2],"03",true)};this.verifySignature=function(o){var p=this.getSignatureAlgorithmField();var n=this.getSignatureValueHex();var q=c(this.hex,0,[0],"30");var r=new KJUR.crypto.Signature({alg:p});r.init(o);r.updateHex(q);return r.verify(n)};this.getParam=function(){var n={};var p=this.getVersion();if(p!=null){n.version=p;}n.sigalg=this.getSignatureAlgorithmField();n.issuer=this.getIssuer();n.thisupdate=this.getThisUpdate();var q=this.getNextUpdate();if(q!=null){n.nextupdate=q;}var s=this.getRevCertArray();if(s!=null){n.revcert=s;}var r=g(this.hex,0,[0,"[0]"]);if(r!=-1){var o=d(this.hex,0,[0,"[0]",0]);n.ext=j.getExtParamArray(o);}n.sighex=this.getSignatureValueHex();return n};if(typeof e=="string"){if(f(e)){this.hex=e;}else {if(e.match(/-----BEGIN X509 CRL/)){this.hex=pemtohex(e);}}this._setPos();}};
	if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.jws=="undefined"||!KJUR.jws){KJUR.jws={};}KJUR.jws.JWS=function(){var b=KJUR,a=b.jws.JWS,c=a.isSafeJSONString;this.parseJWS=function(g,j){if((this.parsedJWS!==undefined)&&(j||(this.parsedJWS.sigvalH!==undefined))){return}var i=g.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);if(i==null){throw "JWS signature is not a form of 'Head.Payload.SigValue'."}var k=i[1];var e=i[2];var l=i[3];var n=k+"."+e;this.parsedJWS={};this.parsedJWS.headB64U=k;this.parsedJWS.payloadB64U=e;this.parsedJWS.sigvalB64U=l;this.parsedJWS.si=n;if(!j){var h=b64utohex(l);var f=parseBigInt(h,16);this.parsedJWS.sigvalH=h;this.parsedJWS.sigvalBI=f;}var d=b64utoutf8(k);var m=b64utoutf8(e);this.parsedJWS.headS=d;this.parsedJWS.payloadS=m;if(!c(d,this.parsedJWS,"headP")){throw "malformed JSON string for JWS Head: "+d}};};KJUR.jws.JWS.sign=function(j,w,z,A,a){var x=KJUR,n=x.jws,r=n.JWS,h=r.readSafeJSONString,q=r.isSafeJSONString,d=x.crypto;d.ECDSA;var p=d.Mac,c=d.Signature,u=JSON;var t,k,o;if(typeof w!="string"&&typeof w!="object"){throw "spHeader must be JSON string or object: "+w}if(typeof w=="object"){k=w;t=u.stringify(k);}if(typeof w=="string"){t=w;if(!q(t)){throw "JWS Head is not safe JSON string: "+t}k=h(t);}o=z;if(typeof z=="object"){o=u.stringify(z);}if((j==""||j==null)&&k.alg!==undefined){j=k.alg;}if((j!=""&&j!=null)&&k.alg===undefined){k.alg=j;t=u.stringify(k);}if(j!==k.alg){throw "alg and sHeader.alg doesn't match: "+j+"!="+k.alg}var s=null;if(r.jwsalg2sigalg[j]===undefined){throw "unsupported alg name: "+j}else {s=r.jwsalg2sigalg[j];}var e=utf8tob64u(t);var m=utf8tob64u(o);var b=e+"."+m;var y="";if(s.substr(0,4)=="Hmac"){if(A===undefined){throw "mac key shall be specified for HS* alg"}var i=new p({alg:s,prov:"cryptojs",pass:A});i.updateString(b);y=i.doFinal();}else {if(s.indexOf("withECDSA")!=-1){var f=new c({alg:s});f.init(A,a);f.updateString(b);var g=f.sign();y=KJUR.crypto.ECDSA.asn1SigToConcatSig(g);}else {if(s!="none"){var f=new c({alg:s});f.init(A,a);f.updateString(b);y=f.sign();}}}var v=hextob64u(y);return b+"."+v};KJUR.jws.JWS.verify=function(w,B,n){var x=KJUR,q=x.jws,t=q.JWS,i=t.readSafeJSONString,e=x.crypto,p=e.ECDSA,s=e.Mac,d=e.Signature,m;if(typeof RSAKey!==undefined){m=RSAKey;}var y=w.split(".");if(y.length!==3){return false}var f=y[0];var r=y[1];var c=f+"."+r;var A=b64utohex(y[2]);var l=i(b64utoutf8(y[0]));var k=null;var z=null;if(l.alg===undefined){throw "algorithm not specified in header"}else {k=l.alg;z=k.substr(0,2);}if(n!=null&&Object.prototype.toString.call(n)==="[object Array]"&&n.length>0){var b=":"+n.join(":")+":";if(b.indexOf(":"+k+":")==-1){throw "algorithm '"+k+"' not accepted in the list"}}if(k!="none"&&B===null){throw "key shall be specified to verify."}if(typeof B=="string"&&B.indexOf("-----BEGIN ")!=-1){B=KEYUTIL.getKey(B);}if(z=="RS"||z=="PS"){if(!(B instanceof m)){throw "key shall be a RSAKey obj for RS* and PS* algs"}}if(z=="ES"){if(!(B instanceof p)){throw "key shall be a ECDSA obj for ES* algs"}}var u=null;if(t.jwsalg2sigalg[l.alg]===undefined){throw "unsupported alg name: "+k}else {u=t.jwsalg2sigalg[k];}if(u=="none"){throw "not supported"}else {if(u.substr(0,4)=="Hmac"){var o=null;if(B===undefined){throw "hexadecimal key shall be specified for HMAC"}var j=new s({alg:u,pass:B});j.updateString(c);o=j.doFinal();return A==o}else {if(u.indexOf("withECDSA")!=-1){var h=null;try{h=p.concatSigToASN1Sig(A);}catch(v){return false}var g=new d({alg:u});g.init(B);g.updateString(c);return g.verify(h)}else {var g=new d({alg:u});g.init(B);g.updateString(c);return g.verify(A)}}}};KJUR.jws.JWS.parse=function(g){var c=g.split(".");var b={};var f,e,d;if(c.length!=2&&c.length!=3){throw "malformed sJWS: wrong number of '.' splitted elements"}f=c[0];e=c[1];if(c.length==3){d=c[2];}b.headerObj=KJUR.jws.JWS.readSafeJSONString(b64utoutf8(f));b.payloadObj=KJUR.jws.JWS.readSafeJSONString(b64utoutf8(e));b.headerPP=JSON.stringify(b.headerObj,null,"  ");if(b.payloadObj==null){b.payloadPP=b64utoutf8(e);}else {b.payloadPP=JSON.stringify(b.payloadObj,null,"  ");}if(d!==undefined){b.sigHex=b64utohex(d);}return b};KJUR.jws.JWS.verifyJWT=function(e,l,r){var d=KJUR,j=d.jws,o=j.JWS,n=o.readSafeJSONString,p=o.inArray,f=o.includedArray;var k=e.split(".");var c=k[0];var i=k[1];b64utohex(k[2]);var h=n(b64utoutf8(c));var g=n(b64utoutf8(i));if(h.alg===undefined){return false}if(r.alg===undefined){throw "acceptField.alg shall be specified"}if(!p(h.alg,r.alg)){return false}if(g.iss!==undefined&&typeof r.iss==="object"){if(!p(g.iss,r.iss)){return false}}if(g.sub!==undefined&&typeof r.sub==="object"){if(!p(g.sub,r.sub)){return false}}if(g.aud!==undefined&&typeof r.aud==="object"){if(typeof g.aud=="string"){if(!p(g.aud,r.aud)){return false}}else {if(typeof g.aud=="object"){if(!f(g.aud,r.aud)){return false}}}}var b=j.IntDate.getNow();if(r.verifyAt!==undefined&&typeof r.verifyAt==="number"){b=r.verifyAt;}if(r.gracePeriod===undefined||typeof r.gracePeriod!=="number"){r.gracePeriod=0;}if(g.exp!==undefined&&typeof g.exp=="number"){if(g.exp+r.gracePeriod<b){return false}}if(g.nbf!==undefined&&typeof g.nbf=="number"){if(b<g.nbf-r.gracePeriod){return false}}if(g.iat!==undefined&&typeof g.iat=="number"){if(b<g.iat-r.gracePeriod){return false}}if(g.jti!==undefined&&r.jti!==undefined){if(g.jti!==r.jti){return false}}if(!o.verify(e,l,r.alg)){return false}return true};KJUR.jws.JWS.includedArray=function(b,a){var c=KJUR.jws.JWS.inArray;if(b===null){return false}if(typeof b!=="object"){return false}if(typeof b.length!=="number"){return false}for(var d=0;d<b.length;d++){if(!c(b[d],a)){return false}}return true};KJUR.jws.JWS.inArray=function(d,b){if(b===null){return false}if(typeof b!=="object"){return false}if(typeof b.length!=="number"){return false}for(var c=0;c<b.length;c++){if(b[c]==d){return true}}return false};KJUR.jws.JWS.jwsalg2sigalg={HS256:"HmacSHA256",HS384:"HmacSHA384",HS512:"HmacSHA512",RS256:"SHA256withRSA",RS384:"SHA384withRSA",RS512:"SHA512withRSA",ES256:"SHA256withECDSA",ES384:"SHA384withECDSA",PS256:"SHA256withRSAandMGF1",PS384:"SHA384withRSAandMGF1",PS512:"SHA512withRSAandMGF1",none:"none",};KJUR.jws.JWS.isSafeJSONString=function(c,b,d){var e=null;try{e=jsonParse(c);if(typeof e!="object"){return 0}if(e.constructor===Array){return 0}if(b){b[d]=e;}return 1}catch(a){return 0}};KJUR.jws.JWS.readSafeJSONString=function(b){var c=null;try{c=jsonParse(b);if(typeof c!="object"){return null}if(c.constructor===Array){return null}return c}catch(a){return null}};KJUR.jws.JWS.getEncodedSignatureValueFromJWS=function(b){var a=b.match(/^[^.]+\.[^.]+\.([^.]+)$/);if(a==null){throw "JWS signature is not a form of 'Head.Payload.SigValue'."}return a[1]};KJUR.jws.JWS.getJWKthumbprint=function(d){if(d.kty!=="RSA"&&d.kty!=="EC"&&d.kty!=="oct"){throw "unsupported algorithm for JWK Thumprint"}var a="{";if(d.kty==="RSA"){if(typeof d.n!="string"||typeof d.e!="string"){throw "wrong n and e value for RSA key"}a+='"e":"'+d.e+'",';a+='"kty":"'+d.kty+'",';a+='"n":"'+d.n+'"}';}else {if(d.kty==="EC"){if(typeof d.crv!="string"||typeof d.x!="string"||typeof d.y!="string"){throw "wrong crv, x and y value for EC key"}a+='"crv":"'+d.crv+'",';a+='"kty":"'+d.kty+'",';a+='"x":"'+d.x+'",';a+='"y":"'+d.y+'"}';}else {if(d.kty==="oct"){if(typeof d.k!="string"){throw "wrong k value for oct(symmetric) key"}a+='"kty":"'+d.kty+'",';a+='"k":"'+d.k+'"}';}}}var b=rstrtohex(a);var c=KJUR.crypto.Util.hashHex(b,"sha256");var e=hextob64u(c);return e};KJUR.jws.IntDate={};KJUR.jws.IntDate.get=function(c){var b=KJUR.jws.IntDate,d=b.getNow,a=b.getZulu;if(c=="now"){return d()}else {if(c=="now + 1hour"){return d()+60*60}else {if(c=="now + 1day"){return d()+60*60*24}else {if(c=="now + 1month"){return d()+60*60*24*30}else {if(c=="now + 1year"){return d()+60*60*24*365}else {if(c.match(/Z$/)){return a(c)}else {if(c.match(/^[0-9]+$/)){return parseInt(c)}}}}}}}throw "unsupported format: "+c};KJUR.jws.IntDate.getZulu=function(a){return zulutosec(a)};KJUR.jws.IntDate.getNow=function(){var a=~~(new Date()/1000);return a};KJUR.jws.IntDate.intDate2UTCString=function(a){var b=new Date(a*1000);return b.toUTCString()};KJUR.jws.IntDate.intDate2Zulu=function(e){var i=new Date(e*1000),h=("0000"+i.getUTCFullYear()).slice(-4),g=("00"+(i.getUTCMonth()+1)).slice(-2),b=("00"+i.getUTCDate()).slice(-2),a=("00"+i.getUTCHours()).slice(-2),c=("00"+i.getUTCMinutes()).slice(-2),f=("00"+i.getUTCSeconds()).slice(-2);return h+g+b+a+c+f+"Z"};
	if(typeof KJUR=="undefined"||!KJUR){KJUR={};}if(typeof KJUR.jws=="undefined"||!KJUR.jws){KJUR.jws={};}KJUR.jws.JWSJS=function(){var c=KJUR,b=c.jws,a=b.JWS,d=a.readSafeJSONString;this.aHeader=[];this.sPayload="";this.aSignature=[];this.init=function(){this.aHeader=[];this.sPayload=undefined;this.aSignature=[];};this.initWithJWS=function(f){this.init();var e=f.split(".");if(e.length!=3){throw "malformed input JWS"}this.aHeader.push(e[0]);this.sPayload=e[1];this.aSignature.push(e[2]);};this.addSignature=function(e,h,m,k){if(this.sPayload===undefined||this.sPayload===null){throw "there's no JSON-JS signature to add."}var l=this.aHeader.length;if(this.aHeader.length!=this.aSignature.length){throw "aHeader.length != aSignature.length"}try{var f=KJUR.jws.JWS.sign(e,h,this.sPayload,m,k);var j=f.split(".");var n=j[0];var g=j[2];this.aHeader.push(j[0]);this.aSignature.push(j[2]);}catch(i){if(this.aHeader.length>l){this.aHeader.pop();}if(this.aSignature.length>l){this.aSignature.pop();}throw "addSignature failed: "+i}};this.verifyAll=function(h){if(this.aHeader.length!==h.length||this.aSignature.length!==h.length){return false}for(var g=0;g<h.length;g++){var f=h[g];if(f.length!==2){return false}var e=this.verifyNth(g,f[0],f[1]);if(e===false){return false}}return true};this.verifyNth=function(f,j,g){if(this.aHeader.length<=f||this.aSignature.length<=f){return false}var h=this.aHeader[f];var k=this.aSignature[f];var l=h+"."+this.sPayload+"."+k;var e=false;try{e=a.verify(l,j,g);}catch(i){return false}return e};this.readJWSJS=function(g){if(typeof g==="string"){var f=d(g);if(f==null){throw "argument is not safe JSON object string"}this.aHeader=f.headers;this.sPayload=f.payload;this.aSignature=f.signatures;}else {try{if(g.headers.length>0){this.aHeader=g.headers;}else {throw "malformed header"}if(typeof g.payload==="string"){this.sPayload=g.payload;}else {throw "malformed signatures"}if(g.signatures.length>0){this.aSignature=g.signatures;}else {throw "malformed signatures"}}catch(e){throw "malformed JWS-JS JSON object: "+e}}};this.getJSON=function(){return {headers:this.aHeader,payload:this.sPayload,signatures:this.aSignature}};this.isEmpty=function(){if(this.aHeader.length==0){return 1}return 0};};
	jsrsasign$1.SecureRandom = SecureRandom;
	jsrsasign$1.rng_seed_time = rng_seed_time;

	jsrsasign$1.BigInteger = BigInteger$5;
	jsrsasign$1.RSAKey = RSAKey;
	jsrsasign$1.ECDSA = KJUR.crypto.ECDSA;
	jsrsasign$1.DSA = KJUR.crypto.DSA;
	jsrsasign$1.Signature = KJUR.crypto.Signature;
	jsrsasign$1.MessageDigest = KJUR.crypto.MessageDigest;
	jsrsasign$1.Mac = KJUR.crypto.Mac;
	jsrsasign$1.Cipher = KJUR.crypto.Cipher;
	jsrsasign$1.KEYUTIL = KEYUTIL;
	jsrsasign$1.ASN1HEX = ASN1HEX;
	jsrsasign$1.X509 = X509;
	jsrsasign$1.X509CRL = X509CRL;
	jsrsasign$1.CryptoJS = CryptoJS;

	// ext/base64.js
	jsrsasign$1.b64tohex = b64tohex;
	jsrsasign$1.b64toBA = b64toBA;

	// ext/ec*.js
	jsrsasign$1.ECFieldElementFp = ECFieldElementFp;
	jsrsasign$1.ECPointFp = ECPointFp;
	jsrsasign$1.ECCurveFp = ECCurveFp;

	// base64x.js
	jsrsasign$1.stoBA = stoBA;
	jsrsasign$1.BAtos = BAtos;
	jsrsasign$1.BAtohex = BAtohex;
	jsrsasign$1.stohex = stohex;
	jsrsasign$1.stob64 = stob64;
	jsrsasign$1.stob64u = stob64u;
	jsrsasign$1.b64utos = b64utos;
	jsrsasign$1.b64tob64u = b64tob64u;
	jsrsasign$1.b64utob64 = b64utob64;
	jsrsasign$1.hex2b64 = hex2b64;
	jsrsasign$1.hextob64u = hextob64u;
	jsrsasign$1.b64utohex = b64utohex;
	jsrsasign$1.utf8tob64u = utf8tob64u;
	jsrsasign$1.b64utoutf8 = b64utoutf8;
	jsrsasign$1.utf8tob64 = utf8tob64;
	jsrsasign$1.b64toutf8 = b64toutf8;
	jsrsasign$1.utf8tohex = utf8tohex;
	jsrsasign$1.hextoutf8 = hextoutf8;
	jsrsasign$1.hextorstr = hextorstr;
	jsrsasign$1.rstrtohex = rstrtohex;
	jsrsasign$1.hextob64 = hextob64;
	jsrsasign$1.hextob64nl = hextob64nl;
	jsrsasign$1.b64nltohex = b64nltohex;
	jsrsasign$1.hextopem = hextopem;
	jsrsasign$1.pemtohex = pemtohex;
	jsrsasign$1.hextoArrayBuffer = hextoArrayBuffer;
	jsrsasign$1.ArrayBuffertohex = ArrayBuffertohex;
	jsrsasign$1.zulutomsec = zulutomsec;
	jsrsasign$1.zulutosec = zulutosec;
	jsrsasign$1.zulutodate = zulutodate;
	jsrsasign$1.datetozulu = datetozulu;
	jsrsasign$1.uricmptohex = uricmptohex;
	jsrsasign$1.hextouricmp = hextouricmp;
	jsrsasign$1.ipv6tohex = ipv6tohex;
	jsrsasign$1.hextoipv6 = hextoipv6;
	jsrsasign$1.hextoip = hextoip;
	jsrsasign$1.iptohex = iptohex;
	jsrsasign$1.ucs2hextoutf8 = ucs2hextoutf8;
	jsrsasign$1.encodeURIComponentAll = encodeURIComponentAll;
	jsrsasign$1.newline_toUnix = newline_toUnix;
	jsrsasign$1.newline_toDos = newline_toDos;
	jsrsasign$1.hextoposhex = hextoposhex;
	jsrsasign$1.intarystrtohex = intarystrtohex;
	jsrsasign$1.strdiffidx = strdiffidx;
	jsrsasign$1.oidtohex = oidtohex;
	jsrsasign$1.hextooid = hextooid;
	jsrsasign$1.strpad = strpad;
	jsrsasign$1.bitstrtoint = bitstrtoint;
	jsrsasign$1.inttobitstr = inttobitstr;

	// name spaces
	jsrsasign$1.KJUR = KJUR;
	jsrsasign$1.crypto = KJUR.crypto;
	jsrsasign$1.asn1 = KJUR.asn1;
	jsrsasign$1.jws = KJUR.jws;
	jsrsasign$1.lang = KJUR.lang;

	const crypto$4 = require$$0__default$4['default'];
	const cbor$4 = cbor$5;
	const jsrsasign = jsrsasign$1;

	function hash$8(alg, data) {
	  return crypto$4.createHash(alg).update(data).digest();
	}

	function parseAuthData$5(buf) {
	  let buffer = buf;
	  const rpIdHash = buffer.slice(0, 32);
	  buffer = buffer.slice(32);

	  const flagsBuf = buffer.slice(0, 1);
	  buffer = buffer.slice(1);

	  const flagsInt = flagsBuf[0];
	  const flags = {
	    up: !!(flagsInt & 0x01),
	    uv: !!(flagsInt & 0x04),
	    at: !!(flagsInt & 0x40),
	    ed: !!(flagsInt & 0x80),
	    flagsInt,
	  };

	  const counterBuf = buffer.slice(0, 4);
	  buffer = buffer.slice(4);

	  const counter = counterBuf.readUInt32BE(0);
	  const aaguid = buffer.slice(0, 16);
	  buffer = buffer.slice(16);

	  const credIDLenBuf = buffer.slice(0, 2);
	  buffer = buffer.slice(2);

	  const credIDLen = credIDLenBuf.readUInt16BE(0);
	  const credID = buffer.slice(0, credIDLen);
	  buffer = buffer.slice(credIDLen);

	  const COSEPublicKey = buffer;

	  return {
	    rpIdHash,
	    flagsBuf,
	    flags,
	    counter,
	    counterBuf,
	    aaguid,
	    credID,
	    COSEPublicKey,
	  };
	}
	async function verifySignature$5(signature, data, publicKey) {
	  return crypto$4.createVerify('SHA256').update(data).verify(publicKey, signature);
	}

	function COSEECDHAtoPKCS$5(COSEPublicKey) {
	  const coseStruct = cbor$4.decodeAllSync(COSEPublicKey)[0];
	  const tag = Buffer.from([0x04]);
	  const x = coseStruct.get(-2);
	  const y = coseStruct.get(-3);

	  return Buffer.concat([tag, x, y]);
	}

	function base64ToPem$2(base64cert) {
	  let pemcert = '';
	  for (let i = 0; i < base64cert.length; i += 64) { pemcert += `${base64cert.slice(i, i + 64)}\n`; }

	  return `-----BEGIN CERTIFICATE-----\n${pemcert}-----END CERTIFICATE-----`;
	}

	function validateCertificationPath$2(certificates) {
	  if (new Set(certificates).size !== certificates.length) { throw new Error('Failed to validate certificates path! Dublicate certificates detected!'); }

	  for (let i = 0; i < certificates.length; i++) {
	    const subjectPem = certificates[i];
	    const subjectCert = new jsrsasign.X509();
	    subjectCert.readCertPEM(subjectPem);

	    let issuerPem = '';
	    if (i + 1 >= certificates.length) issuerPem = subjectPem;
	    else issuerPem = certificates[i + 1];

	    const issuerCert = new jsrsasign.X509();
	    issuerCert.readCertPEM(issuerPem);

	    if (subjectCert.getIssuerString() !== issuerCert.getSubjectString()) { throw new Error('Failed to validate certificate path! Issuers dont match!'); }

	    const subjectCertStruct = jsrsasign.ASN1HEX.getTLVbyList(subjectCert.hex, 0, [0]);
	    const algorithm = subjectCert.getSignatureAlgorithmField();
	    const signatureHex = subjectCert.getSignatureValueHex();

	    const Signature = new jsrsasign.crypto.Signature({ alg: algorithm });
	    Signature.init(issuerPem);
	    Signature.updateHex(subjectCertStruct);

	    if (!Signature.verify(signatureHex)) throw new Error('Failed to validate certificate path!');
	  }
	}

	function getCertificationInfo$2(certificate) {
	  const subjectCert = new jsrsasign.X509();
	  subjectCert.readCertPEM(certificate);

	  const subjectString = subjectCert.getSubjectString();
	  const subjectParts = subjectString.slice(1).split('/');

	  const subject = {};

	  subjectParts.forEach((field) => {
	    const [key, value] = field.split('=');
	    subject[key] = value;
	  });

	  const { version } = subjectCert;
	  const basicConstraintsCA = !!subjectCert.getExtBasicConstraints().cA;

	  return {
	    subject,
	    version,
	    basicConstraintsCA,
	  };
	}

	const gsr2$1 = 'MIIDujCCAqKgAwIBAgILBAAAAAABD4Ym5g0wDQYJKoZIhvcNAQEFBQAwTDEgMB4GA1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjIxEzARBgNVBAoTCkdsb2JhbFNpZ24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDYxMjE1MDgwMDAwWhcNMjExMjE1MDgwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMjETMBEGA1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKbPJA6+Lm8omUVCxKs+IVSbC9N/hHD6ErPLv4dfxn+G07IwXNb9rfF73OX4YJYJkhD10FPe+3t+c4isUoh7SqbKSaZeqKeMWhG8eoLrvozps6yWJQeXSpkqBy+0Hne/ig+1AnwblrjFuTosvNYSuetZfeLQBoZfXklqtTleiDTsvHgMCJiEbKjNS7SgfQx5TfC4LcshytVsW33hoCmEofnTlEnLJGKRILzdC9XZzPnqJworc5HGnRusyMvo4KD0L5CLTfuwNhv2GXqF4G3yYROIXJ/gkwpRl4pazq+r1feqCapgvdzZX99yqWATXgAByUr6P6TqBwMhAo6CygPCm48CAwEAAaOBnDCBmTAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUm+IHV2ccHsBqBt5ZtJot39wZhi4wNgYDVR0fBC8wLTAroCmgJ4YlaHR0cDovL2NybC5nbG9iYWxzaWduLm5ldC9yb290LXIyLmNybDAfBgNVHSMEGDAWgBSb4gdXZxwewGoG3lm0mi3f3BmGLjANBgkqhkiG9w0BAQUFAAOCAQEAmYFThxxol4aR7OBKuEQLq4GsJ0/WwbgcQ3izDJr86iw8bmEbTUsp9Z8FHSbBuOmDAGJFtqkIk7mpM0sYmsL4h4hO291xNBrBVNpGP+DTKqttVCL1OmLNIG+6KYnX3ZHu01yiPqFbQfXf5WRDLenVOavSot+3i9DAgBkcRcAtjOj4LaR0VknFBbVPFd5uRHg5h6h+u/N5GJG79G+dwfCMNYxdAfvDbbnvRG15RjF+Cv6pgsH/76tuIMRQyV+dTZsXjAzlAcmgQWpzU/qlULRuJQ/7TBj0/VLZjmmx6BEP3ojY+x1J96relc8geMJgEtslQIxq/H5COEBkEveegeGTLg==';

	var common$6 = {
	  hash: hash$8,
	  parseAuthData: parseAuthData$5,
	  verifySignature: verifySignature$5,
	  COSEECDHAtoPKCS: COSEECDHAtoPKCS$5,
	  base64ToPem: base64ToPem$2,
	  validateCertificationPath: validateCertificationPath$2,
	  getCertificationInfo: getCertificationInfo$2,
	  gsr2: gsr2$1,
	};

	const base64url$5 = base64url$9.exports;
	const {
	  hash: hash$7, parseAuthData: parseAuthData$4, verifySignature: verifySignature$4, COSEECDHAtoPKCS: COSEECDHAtoPKCS$4,
	} = common$6;

	function ASN1toPEM$1(pkBuf) {
	  let pkBuffer = pkBuf;
	  if (!Buffer.isBuffer(pkBuffer)) throw new Error('ASN1toPEM: input must be a Buffer');
	  let type;
	  if (pkBuffer.length === 65 && pkBuffer[0] === 0x04) {
	    pkBuffer = Buffer.concat([Buffer.from('3059301306072a8648ce3d020106082a8648ce3d030107034200', 'hex'), pkBuffer]);
	    type = 'PUBLIC KEY';
	  } else type = 'CERTIFICATE';
	  const base64Certificate = pkBuffer.toString('base64');
	  let PEMKey = '';

	  for (let i = 0; i < Math.ceil(base64Certificate.length / 64); i++) {
	    const start = 64 * i;
	    PEMKey += `${base64Certificate.substr(start, 64)}\n`;
	  }

	  PEMKey = `-----BEGIN ${type}-----\n${PEMKey}-----END ${type}-----\n`;

	  return PEMKey;
	}

	async function verifyU2FAttestation$1(ctapCredentialResponse, clientDataJSON) {
	  const authenticatorDataStruct = parseAuthData$4(ctapCredentialResponse.authData);
	  if (!(authenticatorDataStruct.flags.up)) { throw new Error('User was NOT presented durring authentication!'); }

	  const clientDataHash = hash$7('SHA256', base64url$5.decode(clientDataJSON));
	  const reservedByte = Buffer.from([0x00]);
	  const publicKey = COSEECDHAtoPKCS$4(authenticatorDataStruct.COSEPublicKey);
	  const signatureBase = Buffer.concat([
	    reservedByte,
	    authenticatorDataStruct.rpIdHash,
	    clientDataHash,
	    authenticatorDataStruct.credID,
	    publicKey,
	  ]);

	  const PEMCertificate = ASN1toPEM$1(ctapCredentialResponse.attStmt.x5c[0]);
	  const signature = ctapCredentialResponse.attStmt.sig;
	  const verified = await verifySignature$4(signature, signatureBase, PEMCertificate);
	  return {
	    verified,
	    authrInfo: {
	      fmt: 'fido-u2f',
	      publicKey: base64url$5(publicKey),
	      counter: authenticatorDataStruct.counter,
	      credID: base64url$5(authenticatorDataStruct.credID),
	    },
	  };
	}

	var u2fAttestation = verifyU2FAttestation$1;

	var elliptic$2 = {};

	var _from = "elliptic";
	var _id = "elliptic@6.5.4";
	var _inBundle = false;
	var _integrity = "sha512-iLhC6ULemrljPZb+QutR5TQGB+pdW6KGD5RSegS+8sorOZT+rdQFbsQFJgvN3eRqNALqJer4oQ16YvJHlU8hzQ==";
	var _location = "/elliptic";
	var _phantomChildren = {
	};
	var _requested = {
		type: "tag",
		registry: true,
		raw: "elliptic",
		name: "elliptic",
		escapedName: "elliptic",
		rawSpec: "",
		saveSpec: null,
		fetchSpec: "latest"
	};
	var _requiredBy = [
		"#USER",
		"/"
	];
	var _resolved = "https://registry.npmjs.org/elliptic/-/elliptic-6.5.4.tgz";
	var _shasum = "da37cebd31e79a1367e941b592ed1fbebd58abbb";
	var _spec = "elliptic";
	var _where = "/home/noob/webauthn-server";
	var author = {
		name: "Fedor Indutny",
		email: "fedor@indutny.com"
	};
	var bugs = {
		url: "https://github.com/indutny/elliptic/issues"
	};
	var bundleDependencies = false;
	var dependencies = {
		"bn.js": "^4.11.9",
		brorand: "^1.1.0",
		"hash.js": "^1.0.0",
		"hmac-drbg": "^1.0.1",
		inherits: "^2.0.4",
		"minimalistic-assert": "^1.0.1",
		"minimalistic-crypto-utils": "^1.0.1"
	};
	var deprecated = false;
	var description = "EC cryptography";
	var devDependencies = {
		brfs: "^2.0.2",
		coveralls: "^3.1.0",
		eslint: "^7.6.0",
		grunt: "^1.2.1",
		"grunt-browserify": "^5.3.0",
		"grunt-cli": "^1.3.2",
		"grunt-contrib-connect": "^3.0.0",
		"grunt-contrib-copy": "^1.0.0",
		"grunt-contrib-uglify": "^5.0.0",
		"grunt-mocha-istanbul": "^5.0.2",
		"grunt-saucelabs": "^9.0.1",
		istanbul: "^0.4.5",
		mocha: "^8.0.1"
	};
	var files = [
		"lib"
	];
	var homepage = "https://github.com/indutny/elliptic";
	var keywords = [
		"EC",
		"Elliptic",
		"curve",
		"Cryptography"
	];
	var license = "MIT";
	var main = "lib/elliptic.js";
	var name = "elliptic";
	var repository = {
		type: "git",
		url: "git+ssh://git@github.com/indutny/elliptic.git"
	};
	var scripts = {
		lint: "eslint lib test",
		"lint:fix": "npm run lint -- --fix",
		test: "npm run lint && npm run unit",
		unit: "istanbul test _mocha --reporter=spec test/index.js",
		version: "grunt dist && git add dist/"
	};
	var version = "6.5.4";
	var require$$0 = {
		_from: _from,
		_id: _id,
		_inBundle: _inBundle,
		_integrity: _integrity,
		_location: _location,
		_phantomChildren: _phantomChildren,
		_requested: _requested,
		_requiredBy: _requiredBy,
		_resolved: _resolved,
		_shasum: _shasum,
		_spec: _spec,
		_where: _where,
		author: author,
		bugs: bugs,
		bundleDependencies: bundleDependencies,
		dependencies: dependencies,
		deprecated: deprecated,
		description: description,
		devDependencies: devDependencies,
		files: files,
		homepage: homepage,
		keywords: keywords,
		license: license,
		main: main,
		name: name,
		repository: repository,
		scripts: scripts,
		version: version
	};

	var utils$p = {};

	var bn = {exports: {}};

	(function (module) {
	(function (module, exports) {

	  // Utils
	  function assert (val, msg) {
	    if (!val) throw new Error(msg || 'Assertion failed');
	  }

	  // Could use `inherits` module, but don't want to move from single file
	  // architecture yet.
	  function inherits (ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  }

	  // BN

	  function BN (number, base, endian) {
	    if (BN.isBN(number)) {
	      return number;
	    }

	    this.negative = 0;
	    this.words = null;
	    this.length = 0;

	    // Reduction context
	    this.red = null;

	    if (number !== null) {
	      if (base === 'le' || base === 'be') {
	        endian = base;
	        base = 10;
	      }

	      this._init(number || 0, base || 10, endian || 'be');
	    }
	  }
	  if (typeof module === 'object') {
	    module.exports = BN;
	  } else {
	    exports.BN = BN;
	  }

	  BN.BN = BN;
	  BN.wordSize = 26;

	  var Buffer;
	  try {
	    if (typeof window !== 'undefined' && typeof window.Buffer !== 'undefined') {
	      Buffer = window.Buffer;
	    } else {
	      Buffer = require$$0__default$3['default'].Buffer;
	    }
	  } catch (e) {
	  }

	  BN.isBN = function isBN (num) {
	    if (num instanceof BN) {
	      return true;
	    }

	    return num !== null && typeof num === 'object' &&
	      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
	  };

	  BN.max = function max (left, right) {
	    if (left.cmp(right) > 0) return left;
	    return right;
	  };

	  BN.min = function min (left, right) {
	    if (left.cmp(right) < 0) return left;
	    return right;
	  };

	  BN.prototype._init = function init (number, base, endian) {
	    if (typeof number === 'number') {
	      return this._initNumber(number, base, endian);
	    }

	    if (typeof number === 'object') {
	      return this._initArray(number, base, endian);
	    }

	    if (base === 'hex') {
	      base = 16;
	    }
	    assert(base === (base | 0) && base >= 2 && base <= 36);

	    number = number.toString().replace(/\s+/g, '');
	    var start = 0;
	    if (number[0] === '-') {
	      start++;
	      this.negative = 1;
	    }

	    if (start < number.length) {
	      if (base === 16) {
	        this._parseHex(number, start, endian);
	      } else {
	        this._parseBase(number, base, start);
	        if (endian === 'le') {
	          this._initArray(this.toArray(), base, endian);
	        }
	      }
	    }
	  };

	  BN.prototype._initNumber = function _initNumber (number, base, endian) {
	    if (number < 0) {
	      this.negative = 1;
	      number = -number;
	    }
	    if (number < 0x4000000) {
	      this.words = [ number & 0x3ffffff ];
	      this.length = 1;
	    } else if (number < 0x10000000000000) {
	      this.words = [
	        number & 0x3ffffff,
	        (number / 0x4000000) & 0x3ffffff
	      ];
	      this.length = 2;
	    } else {
	      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
	      this.words = [
	        number & 0x3ffffff,
	        (number / 0x4000000) & 0x3ffffff,
	        1
	      ];
	      this.length = 3;
	    }

	    if (endian !== 'le') return;

	    // Reverse the bytes
	    this._initArray(this.toArray(), base, endian);
	  };

	  BN.prototype._initArray = function _initArray (number, base, endian) {
	    // Perhaps a Uint8Array
	    assert(typeof number.length === 'number');
	    if (number.length <= 0) {
	      this.words = [ 0 ];
	      this.length = 1;
	      return this;
	    }

	    this.length = Math.ceil(number.length / 3);
	    this.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      this.words[i] = 0;
	    }

	    var j, w;
	    var off = 0;
	    if (endian === 'be') {
	      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
	        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
	        this.words[j] |= (w << off) & 0x3ffffff;
	        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
	        off += 24;
	        if (off >= 26) {
	          off -= 26;
	          j++;
	        }
	      }
	    } else if (endian === 'le') {
	      for (i = 0, j = 0; i < number.length; i += 3) {
	        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
	        this.words[j] |= (w << off) & 0x3ffffff;
	        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
	        off += 24;
	        if (off >= 26) {
	          off -= 26;
	          j++;
	        }
	      }
	    }
	    return this.strip();
	  };

	  function parseHex4Bits (string, index) {
	    var c = string.charCodeAt(index);
	    // 'A' - 'F'
	    if (c >= 65 && c <= 70) {
	      return c - 55;
	    // 'a' - 'f'
	    } else if (c >= 97 && c <= 102) {
	      return c - 87;
	    // '0' - '9'
	    } else {
	      return (c - 48) & 0xf;
	    }
	  }

	  function parseHexByte (string, lowerBound, index) {
	    var r = parseHex4Bits(string, index);
	    if (index - 1 >= lowerBound) {
	      r |= parseHex4Bits(string, index - 1) << 4;
	    }
	    return r;
	  }

	  BN.prototype._parseHex = function _parseHex (number, start, endian) {
	    // Create possibly bigger array to ensure that it fits the number
	    this.length = Math.ceil((number.length - start) / 6);
	    this.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      this.words[i] = 0;
	    }

	    // 24-bits chunks
	    var off = 0;
	    var j = 0;

	    var w;
	    if (endian === 'be') {
	      for (i = number.length - 1; i >= start; i -= 2) {
	        w = parseHexByte(number, start, i) << off;
	        this.words[j] |= w & 0x3ffffff;
	        if (off >= 18) {
	          off -= 18;
	          j += 1;
	          this.words[j] |= w >>> 26;
	        } else {
	          off += 8;
	        }
	      }
	    } else {
	      var parseLength = number.length - start;
	      for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
	        w = parseHexByte(number, start, i) << off;
	        this.words[j] |= w & 0x3ffffff;
	        if (off >= 18) {
	          off -= 18;
	          j += 1;
	          this.words[j] |= w >>> 26;
	        } else {
	          off += 8;
	        }
	      }
	    }

	    this.strip();
	  };

	  function parseBase (str, start, end, mul) {
	    var r = 0;
	    var len = Math.min(str.length, end);
	    for (var i = start; i < len; i++) {
	      var c = str.charCodeAt(i) - 48;

	      r *= mul;

	      // 'a'
	      if (c >= 49) {
	        r += c - 49 + 0xa;

	      // 'A'
	      } else if (c >= 17) {
	        r += c - 17 + 0xa;

	      // '0' - '9'
	      } else {
	        r += c;
	      }
	    }
	    return r;
	  }

	  BN.prototype._parseBase = function _parseBase (number, base, start) {
	    // Initialize as zero
	    this.words = [ 0 ];
	    this.length = 1;

	    // Find length of limb in base
	    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
	      limbLen++;
	    }
	    limbLen--;
	    limbPow = (limbPow / base) | 0;

	    var total = number.length - start;
	    var mod = total % limbLen;
	    var end = Math.min(total, total - mod) + start;

	    var word = 0;
	    for (var i = start; i < end; i += limbLen) {
	      word = parseBase(number, i, i + limbLen, base);

	      this.imuln(limbPow);
	      if (this.words[0] + word < 0x4000000) {
	        this.words[0] += word;
	      } else {
	        this._iaddn(word);
	      }
	    }

	    if (mod !== 0) {
	      var pow = 1;
	      word = parseBase(number, i, number.length, base);

	      for (i = 0; i < mod; i++) {
	        pow *= base;
	      }

	      this.imuln(pow);
	      if (this.words[0] + word < 0x4000000) {
	        this.words[0] += word;
	      } else {
	        this._iaddn(word);
	      }
	    }

	    this.strip();
	  };

	  BN.prototype.copy = function copy (dest) {
	    dest.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      dest.words[i] = this.words[i];
	    }
	    dest.length = this.length;
	    dest.negative = this.negative;
	    dest.red = this.red;
	  };

	  BN.prototype.clone = function clone () {
	    var r = new BN(null);
	    this.copy(r);
	    return r;
	  };

	  BN.prototype._expand = function _expand (size) {
	    while (this.length < size) {
	      this.words[this.length++] = 0;
	    }
	    return this;
	  };

	  // Remove leading `0` from `this`
	  BN.prototype.strip = function strip () {
	    while (this.length > 1 && this.words[this.length - 1] === 0) {
	      this.length--;
	    }
	    return this._normSign();
	  };

	  BN.prototype._normSign = function _normSign () {
	    // -0 = 0
	    if (this.length === 1 && this.words[0] === 0) {
	      this.negative = 0;
	    }
	    return this;
	  };

	  BN.prototype.inspect = function inspect () {
	    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
	  };

	  /*

	  var zeros = [];
	  var groupSizes = [];
	  var groupBases = [];

	  var s = '';
	  var i = -1;
	  while (++i < BN.wordSize) {
	    zeros[i] = s;
	    s += '0';
	  }
	  groupSizes[0] = 0;
	  groupSizes[1] = 0;
	  groupBases[0] = 0;
	  groupBases[1] = 0;
	  var base = 2 - 1;
	  while (++base < 36 + 1) {
	    var groupSize = 0;
	    var groupBase = 1;
	    while (groupBase < (1 << BN.wordSize) / base) {
	      groupBase *= base;
	      groupSize += 1;
	    }
	    groupSizes[base] = groupSize;
	    groupBases[base] = groupBase;
	  }

	  */

	  var zeros = [
	    '',
	    '0',
	    '00',
	    '000',
	    '0000',
	    '00000',
	    '000000',
	    '0000000',
	    '00000000',
	    '000000000',
	    '0000000000',
	    '00000000000',
	    '000000000000',
	    '0000000000000',
	    '00000000000000',
	    '000000000000000',
	    '0000000000000000',
	    '00000000000000000',
	    '000000000000000000',
	    '0000000000000000000',
	    '00000000000000000000',
	    '000000000000000000000',
	    '0000000000000000000000',
	    '00000000000000000000000',
	    '000000000000000000000000',
	    '0000000000000000000000000'
	  ];

	  var groupSizes = [
	    0, 0,
	    25, 16, 12, 11, 10, 9, 8,
	    8, 7, 7, 7, 7, 6, 6,
	    6, 6, 6, 6, 6, 5, 5,
	    5, 5, 5, 5, 5, 5, 5,
	    5, 5, 5, 5, 5, 5, 5
	  ];

	  var groupBases = [
	    0, 0,
	    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
	    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
	    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
	    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
	    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
	  ];

	  BN.prototype.toString = function toString (base, padding) {
	    base = base || 10;
	    padding = padding | 0 || 1;

	    var out;
	    if (base === 16 || base === 'hex') {
	      out = '';
	      var off = 0;
	      var carry = 0;
	      for (var i = 0; i < this.length; i++) {
	        var w = this.words[i];
	        var word = (((w << off) | carry) & 0xffffff).toString(16);
	        carry = (w >>> (24 - off)) & 0xffffff;
	        if (carry !== 0 || i !== this.length - 1) {
	          out = zeros[6 - word.length] + word + out;
	        } else {
	          out = word + out;
	        }
	        off += 2;
	        if (off >= 26) {
	          off -= 26;
	          i--;
	        }
	      }
	      if (carry !== 0) {
	        out = carry.toString(16) + out;
	      }
	      while (out.length % padding !== 0) {
	        out = '0' + out;
	      }
	      if (this.negative !== 0) {
	        out = '-' + out;
	      }
	      return out;
	    }

	    if (base === (base | 0) && base >= 2 && base <= 36) {
	      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
	      var groupSize = groupSizes[base];
	      // var groupBase = Math.pow(base, groupSize);
	      var groupBase = groupBases[base];
	      out = '';
	      var c = this.clone();
	      c.negative = 0;
	      while (!c.isZero()) {
	        var r = c.modn(groupBase).toString(base);
	        c = c.idivn(groupBase);

	        if (!c.isZero()) {
	          out = zeros[groupSize - r.length] + r + out;
	        } else {
	          out = r + out;
	        }
	      }
	      if (this.isZero()) {
	        out = '0' + out;
	      }
	      while (out.length % padding !== 0) {
	        out = '0' + out;
	      }
	      if (this.negative !== 0) {
	        out = '-' + out;
	      }
	      return out;
	    }

	    assert(false, 'Base should be between 2 and 36');
	  };

	  BN.prototype.toNumber = function toNumber () {
	    var ret = this.words[0];
	    if (this.length === 2) {
	      ret += this.words[1] * 0x4000000;
	    } else if (this.length === 3 && this.words[2] === 0x01) {
	      // NOTE: at this stage it is known that the top bit is set
	      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
	    } else if (this.length > 2) {
	      assert(false, 'Number can only safely store up to 53 bits');
	    }
	    return (this.negative !== 0) ? -ret : ret;
	  };

	  BN.prototype.toJSON = function toJSON () {
	    return this.toString(16);
	  };

	  BN.prototype.toBuffer = function toBuffer (endian, length) {
	    assert(typeof Buffer !== 'undefined');
	    return this.toArrayLike(Buffer, endian, length);
	  };

	  BN.prototype.toArray = function toArray (endian, length) {
	    return this.toArrayLike(Array, endian, length);
	  };

	  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
	    var byteLength = this.byteLength();
	    var reqLength = length || Math.max(1, byteLength);
	    assert(byteLength <= reqLength, 'byte array longer than desired length');
	    assert(reqLength > 0, 'Requested array length <= 0');

	    this.strip();
	    var littleEndian = endian === 'le';
	    var res = new ArrayType(reqLength);

	    var b, i;
	    var q = this.clone();
	    if (!littleEndian) {
	      // Assume big-endian
	      for (i = 0; i < reqLength - byteLength; i++) {
	        res[i] = 0;
	      }

	      for (i = 0; !q.isZero(); i++) {
	        b = q.andln(0xff);
	        q.iushrn(8);

	        res[reqLength - i - 1] = b;
	      }
	    } else {
	      for (i = 0; !q.isZero(); i++) {
	        b = q.andln(0xff);
	        q.iushrn(8);

	        res[i] = b;
	      }

	      for (; i < reqLength; i++) {
	        res[i] = 0;
	      }
	    }

	    return res;
	  };

	  if (Math.clz32) {
	    BN.prototype._countBits = function _countBits (w) {
	      return 32 - Math.clz32(w);
	    };
	  } else {
	    BN.prototype._countBits = function _countBits (w) {
	      var t = w;
	      var r = 0;
	      if (t >= 0x1000) {
	        r += 13;
	        t >>>= 13;
	      }
	      if (t >= 0x40) {
	        r += 7;
	        t >>>= 7;
	      }
	      if (t >= 0x8) {
	        r += 4;
	        t >>>= 4;
	      }
	      if (t >= 0x02) {
	        r += 2;
	        t >>>= 2;
	      }
	      return r + t;
	    };
	  }

	  BN.prototype._zeroBits = function _zeroBits (w) {
	    // Short-cut
	    if (w === 0) return 26;

	    var t = w;
	    var r = 0;
	    if ((t & 0x1fff) === 0) {
	      r += 13;
	      t >>>= 13;
	    }
	    if ((t & 0x7f) === 0) {
	      r += 7;
	      t >>>= 7;
	    }
	    if ((t & 0xf) === 0) {
	      r += 4;
	      t >>>= 4;
	    }
	    if ((t & 0x3) === 0) {
	      r += 2;
	      t >>>= 2;
	    }
	    if ((t & 0x1) === 0) {
	      r++;
	    }
	    return r;
	  };

	  // Return number of used bits in a BN
	  BN.prototype.bitLength = function bitLength () {
	    var w = this.words[this.length - 1];
	    var hi = this._countBits(w);
	    return (this.length - 1) * 26 + hi;
	  };

	  function toBitArray (num) {
	    var w = new Array(num.bitLength());

	    for (var bit = 0; bit < w.length; bit++) {
	      var off = (bit / 26) | 0;
	      var wbit = bit % 26;

	      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
	    }

	    return w;
	  }

	  // Number of trailing zero bits
	  BN.prototype.zeroBits = function zeroBits () {
	    if (this.isZero()) return 0;

	    var r = 0;
	    for (var i = 0; i < this.length; i++) {
	      var b = this._zeroBits(this.words[i]);
	      r += b;
	      if (b !== 26) break;
	    }
	    return r;
	  };

	  BN.prototype.byteLength = function byteLength () {
	    return Math.ceil(this.bitLength() / 8);
	  };

	  BN.prototype.toTwos = function toTwos (width) {
	    if (this.negative !== 0) {
	      return this.abs().inotn(width).iaddn(1);
	    }
	    return this.clone();
	  };

	  BN.prototype.fromTwos = function fromTwos (width) {
	    if (this.testn(width - 1)) {
	      return this.notn(width).iaddn(1).ineg();
	    }
	    return this.clone();
	  };

	  BN.prototype.isNeg = function isNeg () {
	    return this.negative !== 0;
	  };

	  // Return negative clone of `this`
	  BN.prototype.neg = function neg () {
	    return this.clone().ineg();
	  };

	  BN.prototype.ineg = function ineg () {
	    if (!this.isZero()) {
	      this.negative ^= 1;
	    }

	    return this;
	  };

	  // Or `num` with `this` in-place
	  BN.prototype.iuor = function iuor (num) {
	    while (this.length < num.length) {
	      this.words[this.length++] = 0;
	    }

	    for (var i = 0; i < num.length; i++) {
	      this.words[i] = this.words[i] | num.words[i];
	    }

	    return this.strip();
	  };

	  BN.prototype.ior = function ior (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuor(num);
	  };

	  // Or `num` with `this`
	  BN.prototype.or = function or (num) {
	    if (this.length > num.length) return this.clone().ior(num);
	    return num.clone().ior(this);
	  };

	  BN.prototype.uor = function uor (num) {
	    if (this.length > num.length) return this.clone().iuor(num);
	    return num.clone().iuor(this);
	  };

	  // And `num` with `this` in-place
	  BN.prototype.iuand = function iuand (num) {
	    // b = min-length(num, this)
	    var b;
	    if (this.length > num.length) {
	      b = num;
	    } else {
	      b = this;
	    }

	    for (var i = 0; i < b.length; i++) {
	      this.words[i] = this.words[i] & num.words[i];
	    }

	    this.length = b.length;

	    return this.strip();
	  };

	  BN.prototype.iand = function iand (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuand(num);
	  };

	  // And `num` with `this`
	  BN.prototype.and = function and (num) {
	    if (this.length > num.length) return this.clone().iand(num);
	    return num.clone().iand(this);
	  };

	  BN.prototype.uand = function uand (num) {
	    if (this.length > num.length) return this.clone().iuand(num);
	    return num.clone().iuand(this);
	  };

	  // Xor `num` with `this` in-place
	  BN.prototype.iuxor = function iuxor (num) {
	    // a.length > b.length
	    var a;
	    var b;
	    if (this.length > num.length) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    for (var i = 0; i < b.length; i++) {
	      this.words[i] = a.words[i] ^ b.words[i];
	    }

	    if (this !== a) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    this.length = a.length;

	    return this.strip();
	  };

	  BN.prototype.ixor = function ixor (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuxor(num);
	  };

	  // Xor `num` with `this`
	  BN.prototype.xor = function xor (num) {
	    if (this.length > num.length) return this.clone().ixor(num);
	    return num.clone().ixor(this);
	  };

	  BN.prototype.uxor = function uxor (num) {
	    if (this.length > num.length) return this.clone().iuxor(num);
	    return num.clone().iuxor(this);
	  };

	  // Not ``this`` with ``width`` bitwidth
	  BN.prototype.inotn = function inotn (width) {
	    assert(typeof width === 'number' && width >= 0);

	    var bytesNeeded = Math.ceil(width / 26) | 0;
	    var bitsLeft = width % 26;

	    // Extend the buffer with leading zeroes
	    this._expand(bytesNeeded);

	    if (bitsLeft > 0) {
	      bytesNeeded--;
	    }

	    // Handle complete words
	    for (var i = 0; i < bytesNeeded; i++) {
	      this.words[i] = ~this.words[i] & 0x3ffffff;
	    }

	    // Handle the residue
	    if (bitsLeft > 0) {
	      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
	    }

	    // And remove leading zeroes
	    return this.strip();
	  };

	  BN.prototype.notn = function notn (width) {
	    return this.clone().inotn(width);
	  };

	  // Set `bit` of `this`
	  BN.prototype.setn = function setn (bit, val) {
	    assert(typeof bit === 'number' && bit >= 0);

	    var off = (bit / 26) | 0;
	    var wbit = bit % 26;

	    this._expand(off + 1);

	    if (val) {
	      this.words[off] = this.words[off] | (1 << wbit);
	    } else {
	      this.words[off] = this.words[off] & ~(1 << wbit);
	    }

	    return this.strip();
	  };

	  // Add `num` to `this` in-place
	  BN.prototype.iadd = function iadd (num) {
	    var r;

	    // negative + positive
	    if (this.negative !== 0 && num.negative === 0) {
	      this.negative = 0;
	      r = this.isub(num);
	      this.negative ^= 1;
	      return this._normSign();

	    // positive + negative
	    } else if (this.negative === 0 && num.negative !== 0) {
	      num.negative = 0;
	      r = this.isub(num);
	      num.negative = 1;
	      return r._normSign();
	    }

	    // a.length > b.length
	    var a, b;
	    if (this.length > num.length) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    var carry = 0;
	    for (var i = 0; i < b.length; i++) {
	      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
	      this.words[i] = r & 0x3ffffff;
	      carry = r >>> 26;
	    }
	    for (; carry !== 0 && i < a.length; i++) {
	      r = (a.words[i] | 0) + carry;
	      this.words[i] = r & 0x3ffffff;
	      carry = r >>> 26;
	    }

	    this.length = a.length;
	    if (carry !== 0) {
	      this.words[this.length] = carry;
	      this.length++;
	    // Copy the rest of the words
	    } else if (a !== this) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    return this;
	  };

	  // Add `num` to `this`
	  BN.prototype.add = function add (num) {
	    var res;
	    if (num.negative !== 0 && this.negative === 0) {
	      num.negative = 0;
	      res = this.sub(num);
	      num.negative ^= 1;
	      return res;
	    } else if (num.negative === 0 && this.negative !== 0) {
	      this.negative = 0;
	      res = num.sub(this);
	      this.negative = 1;
	      return res;
	    }

	    if (this.length > num.length) return this.clone().iadd(num);

	    return num.clone().iadd(this);
	  };

	  // Subtract `num` from `this` in-place
	  BN.prototype.isub = function isub (num) {
	    // this - (-num) = this + num
	    if (num.negative !== 0) {
	      num.negative = 0;
	      var r = this.iadd(num);
	      num.negative = 1;
	      return r._normSign();

	    // -this - num = -(this + num)
	    } else if (this.negative !== 0) {
	      this.negative = 0;
	      this.iadd(num);
	      this.negative = 1;
	      return this._normSign();
	    }

	    // At this point both numbers are positive
	    var cmp = this.cmp(num);

	    // Optimization - zeroify
	    if (cmp === 0) {
	      this.negative = 0;
	      this.length = 1;
	      this.words[0] = 0;
	      return this;
	    }

	    // a > b
	    var a, b;
	    if (cmp > 0) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    var carry = 0;
	    for (var i = 0; i < b.length; i++) {
	      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
	      carry = r >> 26;
	      this.words[i] = r & 0x3ffffff;
	    }
	    for (; carry !== 0 && i < a.length; i++) {
	      r = (a.words[i] | 0) + carry;
	      carry = r >> 26;
	      this.words[i] = r & 0x3ffffff;
	    }

	    // Copy rest of the words
	    if (carry === 0 && i < a.length && a !== this) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    this.length = Math.max(this.length, i);

	    if (a !== this) {
	      this.negative = 1;
	    }

	    return this.strip();
	  };

	  // Subtract `num` from `this`
	  BN.prototype.sub = function sub (num) {
	    return this.clone().isub(num);
	  };

	  function smallMulTo (self, num, out) {
	    out.negative = num.negative ^ self.negative;
	    var len = (self.length + num.length) | 0;
	    out.length = len;
	    len = (len - 1) | 0;

	    // Peel one iteration (compiler can't do it, because of code complexity)
	    var a = self.words[0] | 0;
	    var b = num.words[0] | 0;
	    var r = a * b;

	    var lo = r & 0x3ffffff;
	    var carry = (r / 0x4000000) | 0;
	    out.words[0] = lo;

	    for (var k = 1; k < len; k++) {
	      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
	      // note that ncarry could be >= 0x3ffffff
	      var ncarry = carry >>> 26;
	      var rword = carry & 0x3ffffff;
	      var maxJ = Math.min(k, num.length - 1);
	      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
	        var i = (k - j) | 0;
	        a = self.words[i] | 0;
	        b = num.words[j] | 0;
	        r = a * b + rword;
	        ncarry += (r / 0x4000000) | 0;
	        rword = r & 0x3ffffff;
	      }
	      out.words[k] = rword | 0;
	      carry = ncarry | 0;
	    }
	    if (carry !== 0) {
	      out.words[k] = carry | 0;
	    } else {
	      out.length--;
	    }

	    return out.strip();
	  }

	  // TODO(indutny): it may be reasonable to omit it for users who don't need
	  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
	  // multiplication (like elliptic secp256k1).
	  var comb10MulTo = function comb10MulTo (self, num, out) {
	    var a = self.words;
	    var b = num.words;
	    var o = out.words;
	    var c = 0;
	    var lo;
	    var mid;
	    var hi;
	    var a0 = a[0] | 0;
	    var al0 = a0 & 0x1fff;
	    var ah0 = a0 >>> 13;
	    var a1 = a[1] | 0;
	    var al1 = a1 & 0x1fff;
	    var ah1 = a1 >>> 13;
	    var a2 = a[2] | 0;
	    var al2 = a2 & 0x1fff;
	    var ah2 = a2 >>> 13;
	    var a3 = a[3] | 0;
	    var al3 = a3 & 0x1fff;
	    var ah3 = a3 >>> 13;
	    var a4 = a[4] | 0;
	    var al4 = a4 & 0x1fff;
	    var ah4 = a4 >>> 13;
	    var a5 = a[5] | 0;
	    var al5 = a5 & 0x1fff;
	    var ah5 = a5 >>> 13;
	    var a6 = a[6] | 0;
	    var al6 = a6 & 0x1fff;
	    var ah6 = a6 >>> 13;
	    var a7 = a[7] | 0;
	    var al7 = a7 & 0x1fff;
	    var ah7 = a7 >>> 13;
	    var a8 = a[8] | 0;
	    var al8 = a8 & 0x1fff;
	    var ah8 = a8 >>> 13;
	    var a9 = a[9] | 0;
	    var al9 = a9 & 0x1fff;
	    var ah9 = a9 >>> 13;
	    var b0 = b[0] | 0;
	    var bl0 = b0 & 0x1fff;
	    var bh0 = b0 >>> 13;
	    var b1 = b[1] | 0;
	    var bl1 = b1 & 0x1fff;
	    var bh1 = b1 >>> 13;
	    var b2 = b[2] | 0;
	    var bl2 = b2 & 0x1fff;
	    var bh2 = b2 >>> 13;
	    var b3 = b[3] | 0;
	    var bl3 = b3 & 0x1fff;
	    var bh3 = b3 >>> 13;
	    var b4 = b[4] | 0;
	    var bl4 = b4 & 0x1fff;
	    var bh4 = b4 >>> 13;
	    var b5 = b[5] | 0;
	    var bl5 = b5 & 0x1fff;
	    var bh5 = b5 >>> 13;
	    var b6 = b[6] | 0;
	    var bl6 = b6 & 0x1fff;
	    var bh6 = b6 >>> 13;
	    var b7 = b[7] | 0;
	    var bl7 = b7 & 0x1fff;
	    var bh7 = b7 >>> 13;
	    var b8 = b[8] | 0;
	    var bl8 = b8 & 0x1fff;
	    var bh8 = b8 >>> 13;
	    var b9 = b[9] | 0;
	    var bl9 = b9 & 0x1fff;
	    var bh9 = b9 >>> 13;

	    out.negative = self.negative ^ num.negative;
	    out.length = 19;
	    /* k = 0 */
	    lo = Math.imul(al0, bl0);
	    mid = Math.imul(al0, bh0);
	    mid = (mid + Math.imul(ah0, bl0)) | 0;
	    hi = Math.imul(ah0, bh0);
	    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
	    w0 &= 0x3ffffff;
	    /* k = 1 */
	    lo = Math.imul(al1, bl0);
	    mid = Math.imul(al1, bh0);
	    mid = (mid + Math.imul(ah1, bl0)) | 0;
	    hi = Math.imul(ah1, bh0);
	    lo = (lo + Math.imul(al0, bl1)) | 0;
	    mid = (mid + Math.imul(al0, bh1)) | 0;
	    mid = (mid + Math.imul(ah0, bl1)) | 0;
	    hi = (hi + Math.imul(ah0, bh1)) | 0;
	    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
	    w1 &= 0x3ffffff;
	    /* k = 2 */
	    lo = Math.imul(al2, bl0);
	    mid = Math.imul(al2, bh0);
	    mid = (mid + Math.imul(ah2, bl0)) | 0;
	    hi = Math.imul(ah2, bh0);
	    lo = (lo + Math.imul(al1, bl1)) | 0;
	    mid = (mid + Math.imul(al1, bh1)) | 0;
	    mid = (mid + Math.imul(ah1, bl1)) | 0;
	    hi = (hi + Math.imul(ah1, bh1)) | 0;
	    lo = (lo + Math.imul(al0, bl2)) | 0;
	    mid = (mid + Math.imul(al0, bh2)) | 0;
	    mid = (mid + Math.imul(ah0, bl2)) | 0;
	    hi = (hi + Math.imul(ah0, bh2)) | 0;
	    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
	    w2 &= 0x3ffffff;
	    /* k = 3 */
	    lo = Math.imul(al3, bl0);
	    mid = Math.imul(al3, bh0);
	    mid = (mid + Math.imul(ah3, bl0)) | 0;
	    hi = Math.imul(ah3, bh0);
	    lo = (lo + Math.imul(al2, bl1)) | 0;
	    mid = (mid + Math.imul(al2, bh1)) | 0;
	    mid = (mid + Math.imul(ah2, bl1)) | 0;
	    hi = (hi + Math.imul(ah2, bh1)) | 0;
	    lo = (lo + Math.imul(al1, bl2)) | 0;
	    mid = (mid + Math.imul(al1, bh2)) | 0;
	    mid = (mid + Math.imul(ah1, bl2)) | 0;
	    hi = (hi + Math.imul(ah1, bh2)) | 0;
	    lo = (lo + Math.imul(al0, bl3)) | 0;
	    mid = (mid + Math.imul(al0, bh3)) | 0;
	    mid = (mid + Math.imul(ah0, bl3)) | 0;
	    hi = (hi + Math.imul(ah0, bh3)) | 0;
	    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
	    w3 &= 0x3ffffff;
	    /* k = 4 */
	    lo = Math.imul(al4, bl0);
	    mid = Math.imul(al4, bh0);
	    mid = (mid + Math.imul(ah4, bl0)) | 0;
	    hi = Math.imul(ah4, bh0);
	    lo = (lo + Math.imul(al3, bl1)) | 0;
	    mid = (mid + Math.imul(al3, bh1)) | 0;
	    mid = (mid + Math.imul(ah3, bl1)) | 0;
	    hi = (hi + Math.imul(ah3, bh1)) | 0;
	    lo = (lo + Math.imul(al2, bl2)) | 0;
	    mid = (mid + Math.imul(al2, bh2)) | 0;
	    mid = (mid + Math.imul(ah2, bl2)) | 0;
	    hi = (hi + Math.imul(ah2, bh2)) | 0;
	    lo = (lo + Math.imul(al1, bl3)) | 0;
	    mid = (mid + Math.imul(al1, bh3)) | 0;
	    mid = (mid + Math.imul(ah1, bl3)) | 0;
	    hi = (hi + Math.imul(ah1, bh3)) | 0;
	    lo = (lo + Math.imul(al0, bl4)) | 0;
	    mid = (mid + Math.imul(al0, bh4)) | 0;
	    mid = (mid + Math.imul(ah0, bl4)) | 0;
	    hi = (hi + Math.imul(ah0, bh4)) | 0;
	    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
	    w4 &= 0x3ffffff;
	    /* k = 5 */
	    lo = Math.imul(al5, bl0);
	    mid = Math.imul(al5, bh0);
	    mid = (mid + Math.imul(ah5, bl0)) | 0;
	    hi = Math.imul(ah5, bh0);
	    lo = (lo + Math.imul(al4, bl1)) | 0;
	    mid = (mid + Math.imul(al4, bh1)) | 0;
	    mid = (mid + Math.imul(ah4, bl1)) | 0;
	    hi = (hi + Math.imul(ah4, bh1)) | 0;
	    lo = (lo + Math.imul(al3, bl2)) | 0;
	    mid = (mid + Math.imul(al3, bh2)) | 0;
	    mid = (mid + Math.imul(ah3, bl2)) | 0;
	    hi = (hi + Math.imul(ah3, bh2)) | 0;
	    lo = (lo + Math.imul(al2, bl3)) | 0;
	    mid = (mid + Math.imul(al2, bh3)) | 0;
	    mid = (mid + Math.imul(ah2, bl3)) | 0;
	    hi = (hi + Math.imul(ah2, bh3)) | 0;
	    lo = (lo + Math.imul(al1, bl4)) | 0;
	    mid = (mid + Math.imul(al1, bh4)) | 0;
	    mid = (mid + Math.imul(ah1, bl4)) | 0;
	    hi = (hi + Math.imul(ah1, bh4)) | 0;
	    lo = (lo + Math.imul(al0, bl5)) | 0;
	    mid = (mid + Math.imul(al0, bh5)) | 0;
	    mid = (mid + Math.imul(ah0, bl5)) | 0;
	    hi = (hi + Math.imul(ah0, bh5)) | 0;
	    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
	    w5 &= 0x3ffffff;
	    /* k = 6 */
	    lo = Math.imul(al6, bl0);
	    mid = Math.imul(al6, bh0);
	    mid = (mid + Math.imul(ah6, bl0)) | 0;
	    hi = Math.imul(ah6, bh0);
	    lo = (lo + Math.imul(al5, bl1)) | 0;
	    mid = (mid + Math.imul(al5, bh1)) | 0;
	    mid = (mid + Math.imul(ah5, bl1)) | 0;
	    hi = (hi + Math.imul(ah5, bh1)) | 0;
	    lo = (lo + Math.imul(al4, bl2)) | 0;
	    mid = (mid + Math.imul(al4, bh2)) | 0;
	    mid = (mid + Math.imul(ah4, bl2)) | 0;
	    hi = (hi + Math.imul(ah4, bh2)) | 0;
	    lo = (lo + Math.imul(al3, bl3)) | 0;
	    mid = (mid + Math.imul(al3, bh3)) | 0;
	    mid = (mid + Math.imul(ah3, bl3)) | 0;
	    hi = (hi + Math.imul(ah3, bh3)) | 0;
	    lo = (lo + Math.imul(al2, bl4)) | 0;
	    mid = (mid + Math.imul(al2, bh4)) | 0;
	    mid = (mid + Math.imul(ah2, bl4)) | 0;
	    hi = (hi + Math.imul(ah2, bh4)) | 0;
	    lo = (lo + Math.imul(al1, bl5)) | 0;
	    mid = (mid + Math.imul(al1, bh5)) | 0;
	    mid = (mid + Math.imul(ah1, bl5)) | 0;
	    hi = (hi + Math.imul(ah1, bh5)) | 0;
	    lo = (lo + Math.imul(al0, bl6)) | 0;
	    mid = (mid + Math.imul(al0, bh6)) | 0;
	    mid = (mid + Math.imul(ah0, bl6)) | 0;
	    hi = (hi + Math.imul(ah0, bh6)) | 0;
	    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
	    w6 &= 0x3ffffff;
	    /* k = 7 */
	    lo = Math.imul(al7, bl0);
	    mid = Math.imul(al7, bh0);
	    mid = (mid + Math.imul(ah7, bl0)) | 0;
	    hi = Math.imul(ah7, bh0);
	    lo = (lo + Math.imul(al6, bl1)) | 0;
	    mid = (mid + Math.imul(al6, bh1)) | 0;
	    mid = (mid + Math.imul(ah6, bl1)) | 0;
	    hi = (hi + Math.imul(ah6, bh1)) | 0;
	    lo = (lo + Math.imul(al5, bl2)) | 0;
	    mid = (mid + Math.imul(al5, bh2)) | 0;
	    mid = (mid + Math.imul(ah5, bl2)) | 0;
	    hi = (hi + Math.imul(ah5, bh2)) | 0;
	    lo = (lo + Math.imul(al4, bl3)) | 0;
	    mid = (mid + Math.imul(al4, bh3)) | 0;
	    mid = (mid + Math.imul(ah4, bl3)) | 0;
	    hi = (hi + Math.imul(ah4, bh3)) | 0;
	    lo = (lo + Math.imul(al3, bl4)) | 0;
	    mid = (mid + Math.imul(al3, bh4)) | 0;
	    mid = (mid + Math.imul(ah3, bl4)) | 0;
	    hi = (hi + Math.imul(ah3, bh4)) | 0;
	    lo = (lo + Math.imul(al2, bl5)) | 0;
	    mid = (mid + Math.imul(al2, bh5)) | 0;
	    mid = (mid + Math.imul(ah2, bl5)) | 0;
	    hi = (hi + Math.imul(ah2, bh5)) | 0;
	    lo = (lo + Math.imul(al1, bl6)) | 0;
	    mid = (mid + Math.imul(al1, bh6)) | 0;
	    mid = (mid + Math.imul(ah1, bl6)) | 0;
	    hi = (hi + Math.imul(ah1, bh6)) | 0;
	    lo = (lo + Math.imul(al0, bl7)) | 0;
	    mid = (mid + Math.imul(al0, bh7)) | 0;
	    mid = (mid + Math.imul(ah0, bl7)) | 0;
	    hi = (hi + Math.imul(ah0, bh7)) | 0;
	    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
	    w7 &= 0x3ffffff;
	    /* k = 8 */
	    lo = Math.imul(al8, bl0);
	    mid = Math.imul(al8, bh0);
	    mid = (mid + Math.imul(ah8, bl0)) | 0;
	    hi = Math.imul(ah8, bh0);
	    lo = (lo + Math.imul(al7, bl1)) | 0;
	    mid = (mid + Math.imul(al7, bh1)) | 0;
	    mid = (mid + Math.imul(ah7, bl1)) | 0;
	    hi = (hi + Math.imul(ah7, bh1)) | 0;
	    lo = (lo + Math.imul(al6, bl2)) | 0;
	    mid = (mid + Math.imul(al6, bh2)) | 0;
	    mid = (mid + Math.imul(ah6, bl2)) | 0;
	    hi = (hi + Math.imul(ah6, bh2)) | 0;
	    lo = (lo + Math.imul(al5, bl3)) | 0;
	    mid = (mid + Math.imul(al5, bh3)) | 0;
	    mid = (mid + Math.imul(ah5, bl3)) | 0;
	    hi = (hi + Math.imul(ah5, bh3)) | 0;
	    lo = (lo + Math.imul(al4, bl4)) | 0;
	    mid = (mid + Math.imul(al4, bh4)) | 0;
	    mid = (mid + Math.imul(ah4, bl4)) | 0;
	    hi = (hi + Math.imul(ah4, bh4)) | 0;
	    lo = (lo + Math.imul(al3, bl5)) | 0;
	    mid = (mid + Math.imul(al3, bh5)) | 0;
	    mid = (mid + Math.imul(ah3, bl5)) | 0;
	    hi = (hi + Math.imul(ah3, bh5)) | 0;
	    lo = (lo + Math.imul(al2, bl6)) | 0;
	    mid = (mid + Math.imul(al2, bh6)) | 0;
	    mid = (mid + Math.imul(ah2, bl6)) | 0;
	    hi = (hi + Math.imul(ah2, bh6)) | 0;
	    lo = (lo + Math.imul(al1, bl7)) | 0;
	    mid = (mid + Math.imul(al1, bh7)) | 0;
	    mid = (mid + Math.imul(ah1, bl7)) | 0;
	    hi = (hi + Math.imul(ah1, bh7)) | 0;
	    lo = (lo + Math.imul(al0, bl8)) | 0;
	    mid = (mid + Math.imul(al0, bh8)) | 0;
	    mid = (mid + Math.imul(ah0, bl8)) | 0;
	    hi = (hi + Math.imul(ah0, bh8)) | 0;
	    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
	    w8 &= 0x3ffffff;
	    /* k = 9 */
	    lo = Math.imul(al9, bl0);
	    mid = Math.imul(al9, bh0);
	    mid = (mid + Math.imul(ah9, bl0)) | 0;
	    hi = Math.imul(ah9, bh0);
	    lo = (lo + Math.imul(al8, bl1)) | 0;
	    mid = (mid + Math.imul(al8, bh1)) | 0;
	    mid = (mid + Math.imul(ah8, bl1)) | 0;
	    hi = (hi + Math.imul(ah8, bh1)) | 0;
	    lo = (lo + Math.imul(al7, bl2)) | 0;
	    mid = (mid + Math.imul(al7, bh2)) | 0;
	    mid = (mid + Math.imul(ah7, bl2)) | 0;
	    hi = (hi + Math.imul(ah7, bh2)) | 0;
	    lo = (lo + Math.imul(al6, bl3)) | 0;
	    mid = (mid + Math.imul(al6, bh3)) | 0;
	    mid = (mid + Math.imul(ah6, bl3)) | 0;
	    hi = (hi + Math.imul(ah6, bh3)) | 0;
	    lo = (lo + Math.imul(al5, bl4)) | 0;
	    mid = (mid + Math.imul(al5, bh4)) | 0;
	    mid = (mid + Math.imul(ah5, bl4)) | 0;
	    hi = (hi + Math.imul(ah5, bh4)) | 0;
	    lo = (lo + Math.imul(al4, bl5)) | 0;
	    mid = (mid + Math.imul(al4, bh5)) | 0;
	    mid = (mid + Math.imul(ah4, bl5)) | 0;
	    hi = (hi + Math.imul(ah4, bh5)) | 0;
	    lo = (lo + Math.imul(al3, bl6)) | 0;
	    mid = (mid + Math.imul(al3, bh6)) | 0;
	    mid = (mid + Math.imul(ah3, bl6)) | 0;
	    hi = (hi + Math.imul(ah3, bh6)) | 0;
	    lo = (lo + Math.imul(al2, bl7)) | 0;
	    mid = (mid + Math.imul(al2, bh7)) | 0;
	    mid = (mid + Math.imul(ah2, bl7)) | 0;
	    hi = (hi + Math.imul(ah2, bh7)) | 0;
	    lo = (lo + Math.imul(al1, bl8)) | 0;
	    mid = (mid + Math.imul(al1, bh8)) | 0;
	    mid = (mid + Math.imul(ah1, bl8)) | 0;
	    hi = (hi + Math.imul(ah1, bh8)) | 0;
	    lo = (lo + Math.imul(al0, bl9)) | 0;
	    mid = (mid + Math.imul(al0, bh9)) | 0;
	    mid = (mid + Math.imul(ah0, bl9)) | 0;
	    hi = (hi + Math.imul(ah0, bh9)) | 0;
	    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
	    w9 &= 0x3ffffff;
	    /* k = 10 */
	    lo = Math.imul(al9, bl1);
	    mid = Math.imul(al9, bh1);
	    mid = (mid + Math.imul(ah9, bl1)) | 0;
	    hi = Math.imul(ah9, bh1);
	    lo = (lo + Math.imul(al8, bl2)) | 0;
	    mid = (mid + Math.imul(al8, bh2)) | 0;
	    mid = (mid + Math.imul(ah8, bl2)) | 0;
	    hi = (hi + Math.imul(ah8, bh2)) | 0;
	    lo = (lo + Math.imul(al7, bl3)) | 0;
	    mid = (mid + Math.imul(al7, bh3)) | 0;
	    mid = (mid + Math.imul(ah7, bl3)) | 0;
	    hi = (hi + Math.imul(ah7, bh3)) | 0;
	    lo = (lo + Math.imul(al6, bl4)) | 0;
	    mid = (mid + Math.imul(al6, bh4)) | 0;
	    mid = (mid + Math.imul(ah6, bl4)) | 0;
	    hi = (hi + Math.imul(ah6, bh4)) | 0;
	    lo = (lo + Math.imul(al5, bl5)) | 0;
	    mid = (mid + Math.imul(al5, bh5)) | 0;
	    mid = (mid + Math.imul(ah5, bl5)) | 0;
	    hi = (hi + Math.imul(ah5, bh5)) | 0;
	    lo = (lo + Math.imul(al4, bl6)) | 0;
	    mid = (mid + Math.imul(al4, bh6)) | 0;
	    mid = (mid + Math.imul(ah4, bl6)) | 0;
	    hi = (hi + Math.imul(ah4, bh6)) | 0;
	    lo = (lo + Math.imul(al3, bl7)) | 0;
	    mid = (mid + Math.imul(al3, bh7)) | 0;
	    mid = (mid + Math.imul(ah3, bl7)) | 0;
	    hi = (hi + Math.imul(ah3, bh7)) | 0;
	    lo = (lo + Math.imul(al2, bl8)) | 0;
	    mid = (mid + Math.imul(al2, bh8)) | 0;
	    mid = (mid + Math.imul(ah2, bl8)) | 0;
	    hi = (hi + Math.imul(ah2, bh8)) | 0;
	    lo = (lo + Math.imul(al1, bl9)) | 0;
	    mid = (mid + Math.imul(al1, bh9)) | 0;
	    mid = (mid + Math.imul(ah1, bl9)) | 0;
	    hi = (hi + Math.imul(ah1, bh9)) | 0;
	    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
	    w10 &= 0x3ffffff;
	    /* k = 11 */
	    lo = Math.imul(al9, bl2);
	    mid = Math.imul(al9, bh2);
	    mid = (mid + Math.imul(ah9, bl2)) | 0;
	    hi = Math.imul(ah9, bh2);
	    lo = (lo + Math.imul(al8, bl3)) | 0;
	    mid = (mid + Math.imul(al8, bh3)) | 0;
	    mid = (mid + Math.imul(ah8, bl3)) | 0;
	    hi = (hi + Math.imul(ah8, bh3)) | 0;
	    lo = (lo + Math.imul(al7, bl4)) | 0;
	    mid = (mid + Math.imul(al7, bh4)) | 0;
	    mid = (mid + Math.imul(ah7, bl4)) | 0;
	    hi = (hi + Math.imul(ah7, bh4)) | 0;
	    lo = (lo + Math.imul(al6, bl5)) | 0;
	    mid = (mid + Math.imul(al6, bh5)) | 0;
	    mid = (mid + Math.imul(ah6, bl5)) | 0;
	    hi = (hi + Math.imul(ah6, bh5)) | 0;
	    lo = (lo + Math.imul(al5, bl6)) | 0;
	    mid = (mid + Math.imul(al5, bh6)) | 0;
	    mid = (mid + Math.imul(ah5, bl6)) | 0;
	    hi = (hi + Math.imul(ah5, bh6)) | 0;
	    lo = (lo + Math.imul(al4, bl7)) | 0;
	    mid = (mid + Math.imul(al4, bh7)) | 0;
	    mid = (mid + Math.imul(ah4, bl7)) | 0;
	    hi = (hi + Math.imul(ah4, bh7)) | 0;
	    lo = (lo + Math.imul(al3, bl8)) | 0;
	    mid = (mid + Math.imul(al3, bh8)) | 0;
	    mid = (mid + Math.imul(ah3, bl8)) | 0;
	    hi = (hi + Math.imul(ah3, bh8)) | 0;
	    lo = (lo + Math.imul(al2, bl9)) | 0;
	    mid = (mid + Math.imul(al2, bh9)) | 0;
	    mid = (mid + Math.imul(ah2, bl9)) | 0;
	    hi = (hi + Math.imul(ah2, bh9)) | 0;
	    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
	    w11 &= 0x3ffffff;
	    /* k = 12 */
	    lo = Math.imul(al9, bl3);
	    mid = Math.imul(al9, bh3);
	    mid = (mid + Math.imul(ah9, bl3)) | 0;
	    hi = Math.imul(ah9, bh3);
	    lo = (lo + Math.imul(al8, bl4)) | 0;
	    mid = (mid + Math.imul(al8, bh4)) | 0;
	    mid = (mid + Math.imul(ah8, bl4)) | 0;
	    hi = (hi + Math.imul(ah8, bh4)) | 0;
	    lo = (lo + Math.imul(al7, bl5)) | 0;
	    mid = (mid + Math.imul(al7, bh5)) | 0;
	    mid = (mid + Math.imul(ah7, bl5)) | 0;
	    hi = (hi + Math.imul(ah7, bh5)) | 0;
	    lo = (lo + Math.imul(al6, bl6)) | 0;
	    mid = (mid + Math.imul(al6, bh6)) | 0;
	    mid = (mid + Math.imul(ah6, bl6)) | 0;
	    hi = (hi + Math.imul(ah6, bh6)) | 0;
	    lo = (lo + Math.imul(al5, bl7)) | 0;
	    mid = (mid + Math.imul(al5, bh7)) | 0;
	    mid = (mid + Math.imul(ah5, bl7)) | 0;
	    hi = (hi + Math.imul(ah5, bh7)) | 0;
	    lo = (lo + Math.imul(al4, bl8)) | 0;
	    mid = (mid + Math.imul(al4, bh8)) | 0;
	    mid = (mid + Math.imul(ah4, bl8)) | 0;
	    hi = (hi + Math.imul(ah4, bh8)) | 0;
	    lo = (lo + Math.imul(al3, bl9)) | 0;
	    mid = (mid + Math.imul(al3, bh9)) | 0;
	    mid = (mid + Math.imul(ah3, bl9)) | 0;
	    hi = (hi + Math.imul(ah3, bh9)) | 0;
	    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
	    w12 &= 0x3ffffff;
	    /* k = 13 */
	    lo = Math.imul(al9, bl4);
	    mid = Math.imul(al9, bh4);
	    mid = (mid + Math.imul(ah9, bl4)) | 0;
	    hi = Math.imul(ah9, bh4);
	    lo = (lo + Math.imul(al8, bl5)) | 0;
	    mid = (mid + Math.imul(al8, bh5)) | 0;
	    mid = (mid + Math.imul(ah8, bl5)) | 0;
	    hi = (hi + Math.imul(ah8, bh5)) | 0;
	    lo = (lo + Math.imul(al7, bl6)) | 0;
	    mid = (mid + Math.imul(al7, bh6)) | 0;
	    mid = (mid + Math.imul(ah7, bl6)) | 0;
	    hi = (hi + Math.imul(ah7, bh6)) | 0;
	    lo = (lo + Math.imul(al6, bl7)) | 0;
	    mid = (mid + Math.imul(al6, bh7)) | 0;
	    mid = (mid + Math.imul(ah6, bl7)) | 0;
	    hi = (hi + Math.imul(ah6, bh7)) | 0;
	    lo = (lo + Math.imul(al5, bl8)) | 0;
	    mid = (mid + Math.imul(al5, bh8)) | 0;
	    mid = (mid + Math.imul(ah5, bl8)) | 0;
	    hi = (hi + Math.imul(ah5, bh8)) | 0;
	    lo = (lo + Math.imul(al4, bl9)) | 0;
	    mid = (mid + Math.imul(al4, bh9)) | 0;
	    mid = (mid + Math.imul(ah4, bl9)) | 0;
	    hi = (hi + Math.imul(ah4, bh9)) | 0;
	    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
	    w13 &= 0x3ffffff;
	    /* k = 14 */
	    lo = Math.imul(al9, bl5);
	    mid = Math.imul(al9, bh5);
	    mid = (mid + Math.imul(ah9, bl5)) | 0;
	    hi = Math.imul(ah9, bh5);
	    lo = (lo + Math.imul(al8, bl6)) | 0;
	    mid = (mid + Math.imul(al8, bh6)) | 0;
	    mid = (mid + Math.imul(ah8, bl6)) | 0;
	    hi = (hi + Math.imul(ah8, bh6)) | 0;
	    lo = (lo + Math.imul(al7, bl7)) | 0;
	    mid = (mid + Math.imul(al7, bh7)) | 0;
	    mid = (mid + Math.imul(ah7, bl7)) | 0;
	    hi = (hi + Math.imul(ah7, bh7)) | 0;
	    lo = (lo + Math.imul(al6, bl8)) | 0;
	    mid = (mid + Math.imul(al6, bh8)) | 0;
	    mid = (mid + Math.imul(ah6, bl8)) | 0;
	    hi = (hi + Math.imul(ah6, bh8)) | 0;
	    lo = (lo + Math.imul(al5, bl9)) | 0;
	    mid = (mid + Math.imul(al5, bh9)) | 0;
	    mid = (mid + Math.imul(ah5, bl9)) | 0;
	    hi = (hi + Math.imul(ah5, bh9)) | 0;
	    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
	    w14 &= 0x3ffffff;
	    /* k = 15 */
	    lo = Math.imul(al9, bl6);
	    mid = Math.imul(al9, bh6);
	    mid = (mid + Math.imul(ah9, bl6)) | 0;
	    hi = Math.imul(ah9, bh6);
	    lo = (lo + Math.imul(al8, bl7)) | 0;
	    mid = (mid + Math.imul(al8, bh7)) | 0;
	    mid = (mid + Math.imul(ah8, bl7)) | 0;
	    hi = (hi + Math.imul(ah8, bh7)) | 0;
	    lo = (lo + Math.imul(al7, bl8)) | 0;
	    mid = (mid + Math.imul(al7, bh8)) | 0;
	    mid = (mid + Math.imul(ah7, bl8)) | 0;
	    hi = (hi + Math.imul(ah7, bh8)) | 0;
	    lo = (lo + Math.imul(al6, bl9)) | 0;
	    mid = (mid + Math.imul(al6, bh9)) | 0;
	    mid = (mid + Math.imul(ah6, bl9)) | 0;
	    hi = (hi + Math.imul(ah6, bh9)) | 0;
	    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
	    w15 &= 0x3ffffff;
	    /* k = 16 */
	    lo = Math.imul(al9, bl7);
	    mid = Math.imul(al9, bh7);
	    mid = (mid + Math.imul(ah9, bl7)) | 0;
	    hi = Math.imul(ah9, bh7);
	    lo = (lo + Math.imul(al8, bl8)) | 0;
	    mid = (mid + Math.imul(al8, bh8)) | 0;
	    mid = (mid + Math.imul(ah8, bl8)) | 0;
	    hi = (hi + Math.imul(ah8, bh8)) | 0;
	    lo = (lo + Math.imul(al7, bl9)) | 0;
	    mid = (mid + Math.imul(al7, bh9)) | 0;
	    mid = (mid + Math.imul(ah7, bl9)) | 0;
	    hi = (hi + Math.imul(ah7, bh9)) | 0;
	    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
	    w16 &= 0x3ffffff;
	    /* k = 17 */
	    lo = Math.imul(al9, bl8);
	    mid = Math.imul(al9, bh8);
	    mid = (mid + Math.imul(ah9, bl8)) | 0;
	    hi = Math.imul(ah9, bh8);
	    lo = (lo + Math.imul(al8, bl9)) | 0;
	    mid = (mid + Math.imul(al8, bh9)) | 0;
	    mid = (mid + Math.imul(ah8, bl9)) | 0;
	    hi = (hi + Math.imul(ah8, bh9)) | 0;
	    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
	    w17 &= 0x3ffffff;
	    /* k = 18 */
	    lo = Math.imul(al9, bl9);
	    mid = Math.imul(al9, bh9);
	    mid = (mid + Math.imul(ah9, bl9)) | 0;
	    hi = Math.imul(ah9, bh9);
	    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
	    w18 &= 0x3ffffff;
	    o[0] = w0;
	    o[1] = w1;
	    o[2] = w2;
	    o[3] = w3;
	    o[4] = w4;
	    o[5] = w5;
	    o[6] = w6;
	    o[7] = w7;
	    o[8] = w8;
	    o[9] = w9;
	    o[10] = w10;
	    o[11] = w11;
	    o[12] = w12;
	    o[13] = w13;
	    o[14] = w14;
	    o[15] = w15;
	    o[16] = w16;
	    o[17] = w17;
	    o[18] = w18;
	    if (c !== 0) {
	      o[19] = c;
	      out.length++;
	    }
	    return out;
	  };

	  // Polyfill comb
	  if (!Math.imul) {
	    comb10MulTo = smallMulTo;
	  }

	  function bigMulTo (self, num, out) {
	    out.negative = num.negative ^ self.negative;
	    out.length = self.length + num.length;

	    var carry = 0;
	    var hncarry = 0;
	    for (var k = 0; k < out.length - 1; k++) {
	      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
	      // note that ncarry could be >= 0x3ffffff
	      var ncarry = hncarry;
	      hncarry = 0;
	      var rword = carry & 0x3ffffff;
	      var maxJ = Math.min(k, num.length - 1);
	      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
	        var i = k - j;
	        var a = self.words[i] | 0;
	        var b = num.words[j] | 0;
	        var r = a * b;

	        var lo = r & 0x3ffffff;
	        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
	        lo = (lo + rword) | 0;
	        rword = lo & 0x3ffffff;
	        ncarry = (ncarry + (lo >>> 26)) | 0;

	        hncarry += ncarry >>> 26;
	        ncarry &= 0x3ffffff;
	      }
	      out.words[k] = rword;
	      carry = ncarry;
	      ncarry = hncarry;
	    }
	    if (carry !== 0) {
	      out.words[k] = carry;
	    } else {
	      out.length--;
	    }

	    return out.strip();
	  }

	  function jumboMulTo (self, num, out) {
	    var fftm = new FFTM();
	    return fftm.mulp(self, num, out);
	  }

	  BN.prototype.mulTo = function mulTo (num, out) {
	    var res;
	    var len = this.length + num.length;
	    if (this.length === 10 && num.length === 10) {
	      res = comb10MulTo(this, num, out);
	    } else if (len < 63) {
	      res = smallMulTo(this, num, out);
	    } else if (len < 1024) {
	      res = bigMulTo(this, num, out);
	    } else {
	      res = jumboMulTo(this, num, out);
	    }

	    return res;
	  };

	  // Cooley-Tukey algorithm for FFT
	  // slightly revisited to rely on looping instead of recursion

	  function FFTM (x, y) {
	    this.x = x;
	    this.y = y;
	  }

	  FFTM.prototype.makeRBT = function makeRBT (N) {
	    var t = new Array(N);
	    var l = BN.prototype._countBits(N) - 1;
	    for (var i = 0; i < N; i++) {
	      t[i] = this.revBin(i, l, N);
	    }

	    return t;
	  };

	  // Returns binary-reversed representation of `x`
	  FFTM.prototype.revBin = function revBin (x, l, N) {
	    if (x === 0 || x === N - 1) return x;

	    var rb = 0;
	    for (var i = 0; i < l; i++) {
	      rb |= (x & 1) << (l - i - 1);
	      x >>= 1;
	    }

	    return rb;
	  };

	  // Performs "tweedling" phase, therefore 'emulating'
	  // behaviour of the recursive algorithm
	  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
	    for (var i = 0; i < N; i++) {
	      rtws[i] = rws[rbt[i]];
	      itws[i] = iws[rbt[i]];
	    }
	  };

	  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
	    this.permute(rbt, rws, iws, rtws, itws, N);

	    for (var s = 1; s < N; s <<= 1) {
	      var l = s << 1;

	      var rtwdf = Math.cos(2 * Math.PI / l);
	      var itwdf = Math.sin(2 * Math.PI / l);

	      for (var p = 0; p < N; p += l) {
	        var rtwdf_ = rtwdf;
	        var itwdf_ = itwdf;

	        for (var j = 0; j < s; j++) {
	          var re = rtws[p + j];
	          var ie = itws[p + j];

	          var ro = rtws[p + j + s];
	          var io = itws[p + j + s];

	          var rx = rtwdf_ * ro - itwdf_ * io;

	          io = rtwdf_ * io + itwdf_ * ro;
	          ro = rx;

	          rtws[p + j] = re + ro;
	          itws[p + j] = ie + io;

	          rtws[p + j + s] = re - ro;
	          itws[p + j + s] = ie - io;

	          /* jshint maxdepth : false */
	          if (j !== l) {
	            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

	            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
	            rtwdf_ = rx;
	          }
	        }
	      }
	    }
	  };

	  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
	    var N = Math.max(m, n) | 1;
	    var odd = N & 1;
	    var i = 0;
	    for (N = N / 2 | 0; N; N = N >>> 1) {
	      i++;
	    }

	    return 1 << i + 1 + odd;
	  };

	  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
	    if (N <= 1) return;

	    for (var i = 0; i < N / 2; i++) {
	      var t = rws[i];

	      rws[i] = rws[N - i - 1];
	      rws[N - i - 1] = t;

	      t = iws[i];

	      iws[i] = -iws[N - i - 1];
	      iws[N - i - 1] = -t;
	    }
	  };

	  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
	    var carry = 0;
	    for (var i = 0; i < N / 2; i++) {
	      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
	        Math.round(ws[2 * i] / N) +
	        carry;

	      ws[i] = w & 0x3ffffff;

	      if (w < 0x4000000) {
	        carry = 0;
	      } else {
	        carry = w / 0x4000000 | 0;
	      }
	    }

	    return ws;
	  };

	  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
	    var carry = 0;
	    for (var i = 0; i < len; i++) {
	      carry = carry + (ws[i] | 0);

	      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
	      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
	    }

	    // Pad with zeroes
	    for (i = 2 * len; i < N; ++i) {
	      rws[i] = 0;
	    }

	    assert(carry === 0);
	    assert((carry & ~0x1fff) === 0);
	  };

	  FFTM.prototype.stub = function stub (N) {
	    var ph = new Array(N);
	    for (var i = 0; i < N; i++) {
	      ph[i] = 0;
	    }

	    return ph;
	  };

	  FFTM.prototype.mulp = function mulp (x, y, out) {
	    var N = 2 * this.guessLen13b(x.length, y.length);

	    var rbt = this.makeRBT(N);

	    var _ = this.stub(N);

	    var rws = new Array(N);
	    var rwst = new Array(N);
	    var iwst = new Array(N);

	    var nrws = new Array(N);
	    var nrwst = new Array(N);
	    var niwst = new Array(N);

	    var rmws = out.words;
	    rmws.length = N;

	    this.convert13b(x.words, x.length, rws, N);
	    this.convert13b(y.words, y.length, nrws, N);

	    this.transform(rws, _, rwst, iwst, N, rbt);
	    this.transform(nrws, _, nrwst, niwst, N, rbt);

	    for (var i = 0; i < N; i++) {
	      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
	      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
	      rwst[i] = rx;
	    }

	    this.conjugate(rwst, iwst, N);
	    this.transform(rwst, iwst, rmws, _, N, rbt);
	    this.conjugate(rmws, _, N);
	    this.normalize13b(rmws, N);

	    out.negative = x.negative ^ y.negative;
	    out.length = x.length + y.length;
	    return out.strip();
	  };

	  // Multiply `this` by `num`
	  BN.prototype.mul = function mul (num) {
	    var out = new BN(null);
	    out.words = new Array(this.length + num.length);
	    return this.mulTo(num, out);
	  };

	  // Multiply employing FFT
	  BN.prototype.mulf = function mulf (num) {
	    var out = new BN(null);
	    out.words = new Array(this.length + num.length);
	    return jumboMulTo(this, num, out);
	  };

	  // In-place Multiplication
	  BN.prototype.imul = function imul (num) {
	    return this.clone().mulTo(num, this);
	  };

	  BN.prototype.imuln = function imuln (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);

	    // Carry
	    var carry = 0;
	    for (var i = 0; i < this.length; i++) {
	      var w = (this.words[i] | 0) * num;
	      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
	      carry >>= 26;
	      carry += (w / 0x4000000) | 0;
	      // NOTE: lo is 27bit maximum
	      carry += lo >>> 26;
	      this.words[i] = lo & 0x3ffffff;
	    }

	    if (carry !== 0) {
	      this.words[i] = carry;
	      this.length++;
	    }

	    return this;
	  };

	  BN.prototype.muln = function muln (num) {
	    return this.clone().imuln(num);
	  };

	  // `this` * `this`
	  BN.prototype.sqr = function sqr () {
	    return this.mul(this);
	  };

	  // `this` * `this` in-place
	  BN.prototype.isqr = function isqr () {
	    return this.imul(this.clone());
	  };

	  // Math.pow(`this`, `num`)
	  BN.prototype.pow = function pow (num) {
	    var w = toBitArray(num);
	    if (w.length === 0) return new BN(1);

	    // Skip leading zeroes
	    var res = this;
	    for (var i = 0; i < w.length; i++, res = res.sqr()) {
	      if (w[i] !== 0) break;
	    }

	    if (++i < w.length) {
	      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
	        if (w[i] === 0) continue;

	        res = res.mul(q);
	      }
	    }

	    return res;
	  };

	  // Shift-left in-place
	  BN.prototype.iushln = function iushln (bits) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var r = bits % 26;
	    var s = (bits - r) / 26;
	    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
	    var i;

	    if (r !== 0) {
	      var carry = 0;

	      for (i = 0; i < this.length; i++) {
	        var newCarry = this.words[i] & carryMask;
	        var c = ((this.words[i] | 0) - newCarry) << r;
	        this.words[i] = c | carry;
	        carry = newCarry >>> (26 - r);
	      }

	      if (carry) {
	        this.words[i] = carry;
	        this.length++;
	      }
	    }

	    if (s !== 0) {
	      for (i = this.length - 1; i >= 0; i--) {
	        this.words[i + s] = this.words[i];
	      }

	      for (i = 0; i < s; i++) {
	        this.words[i] = 0;
	      }

	      this.length += s;
	    }

	    return this.strip();
	  };

	  BN.prototype.ishln = function ishln (bits) {
	    // TODO(indutny): implement me
	    assert(this.negative === 0);
	    return this.iushln(bits);
	  };

	  // Shift-right in-place
	  // NOTE: `hint` is a lowest bit before trailing zeroes
	  // NOTE: if `extended` is present - it will be filled with destroyed bits
	  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var h;
	    if (hint) {
	      h = (hint - (hint % 26)) / 26;
	    } else {
	      h = 0;
	    }

	    var r = bits % 26;
	    var s = Math.min((bits - r) / 26, this.length);
	    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
	    var maskedWords = extended;

	    h -= s;
	    h = Math.max(0, h);

	    // Extended mode, copy masked part
	    if (maskedWords) {
	      for (var i = 0; i < s; i++) {
	        maskedWords.words[i] = this.words[i];
	      }
	      maskedWords.length = s;
	    }

	    if (s === 0) ; else if (this.length > s) {
	      this.length -= s;
	      for (i = 0; i < this.length; i++) {
	        this.words[i] = this.words[i + s];
	      }
	    } else {
	      this.words[0] = 0;
	      this.length = 1;
	    }

	    var carry = 0;
	    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
	      var word = this.words[i] | 0;
	      this.words[i] = (carry << (26 - r)) | (word >>> r);
	      carry = word & mask;
	    }

	    // Push carried bits as a mask
	    if (maskedWords && carry !== 0) {
	      maskedWords.words[maskedWords.length++] = carry;
	    }

	    if (this.length === 0) {
	      this.words[0] = 0;
	      this.length = 1;
	    }

	    return this.strip();
	  };

	  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
	    // TODO(indutny): implement me
	    assert(this.negative === 0);
	    return this.iushrn(bits, hint, extended);
	  };

	  // Shift-left
	  BN.prototype.shln = function shln (bits) {
	    return this.clone().ishln(bits);
	  };

	  BN.prototype.ushln = function ushln (bits) {
	    return this.clone().iushln(bits);
	  };

	  // Shift-right
	  BN.prototype.shrn = function shrn (bits) {
	    return this.clone().ishrn(bits);
	  };

	  BN.prototype.ushrn = function ushrn (bits) {
	    return this.clone().iushrn(bits);
	  };

	  // Test if n bit is set
	  BN.prototype.testn = function testn (bit) {
	    assert(typeof bit === 'number' && bit >= 0);
	    var r = bit % 26;
	    var s = (bit - r) / 26;
	    var q = 1 << r;

	    // Fast case: bit is much higher than all existing words
	    if (this.length <= s) return false;

	    // Check bit and return
	    var w = this.words[s];

	    return !!(w & q);
	  };

	  // Return only lowers bits of number (in-place)
	  BN.prototype.imaskn = function imaskn (bits) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var r = bits % 26;
	    var s = (bits - r) / 26;

	    assert(this.negative === 0, 'imaskn works only with positive numbers');

	    if (this.length <= s) {
	      return this;
	    }

	    if (r !== 0) {
	      s++;
	    }
	    this.length = Math.min(s, this.length);

	    if (r !== 0) {
	      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
	      this.words[this.length - 1] &= mask;
	    }

	    return this.strip();
	  };

	  // Return only lowers bits of number
	  BN.prototype.maskn = function maskn (bits) {
	    return this.clone().imaskn(bits);
	  };

	  // Add plain number `num` to `this`
	  BN.prototype.iaddn = function iaddn (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);
	    if (num < 0) return this.isubn(-num);

	    // Possible sign change
	    if (this.negative !== 0) {
	      if (this.length === 1 && (this.words[0] | 0) < num) {
	        this.words[0] = num - (this.words[0] | 0);
	        this.negative = 0;
	        return this;
	      }

	      this.negative = 0;
	      this.isubn(num);
	      this.negative = 1;
	      return this;
	    }

	    // Add without checks
	    return this._iaddn(num);
	  };

	  BN.prototype._iaddn = function _iaddn (num) {
	    this.words[0] += num;

	    // Carry
	    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
	      this.words[i] -= 0x4000000;
	      if (i === this.length - 1) {
	        this.words[i + 1] = 1;
	      } else {
	        this.words[i + 1]++;
	      }
	    }
	    this.length = Math.max(this.length, i + 1);

	    return this;
	  };

	  // Subtract plain number `num` from `this`
	  BN.prototype.isubn = function isubn (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);
	    if (num < 0) return this.iaddn(-num);

	    if (this.negative !== 0) {
	      this.negative = 0;
	      this.iaddn(num);
	      this.negative = 1;
	      return this;
	    }

	    this.words[0] -= num;

	    if (this.length === 1 && this.words[0] < 0) {
	      this.words[0] = -this.words[0];
	      this.negative = 1;
	    } else {
	      // Carry
	      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
	        this.words[i] += 0x4000000;
	        this.words[i + 1] -= 1;
	      }
	    }

	    return this.strip();
	  };

	  BN.prototype.addn = function addn (num) {
	    return this.clone().iaddn(num);
	  };

	  BN.prototype.subn = function subn (num) {
	    return this.clone().isubn(num);
	  };

	  BN.prototype.iabs = function iabs () {
	    this.negative = 0;

	    return this;
	  };

	  BN.prototype.abs = function abs () {
	    return this.clone().iabs();
	  };

	  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
	    var len = num.length + shift;
	    var i;

	    this._expand(len);

	    var w;
	    var carry = 0;
	    for (i = 0; i < num.length; i++) {
	      w = (this.words[i + shift] | 0) + carry;
	      var right = (num.words[i] | 0) * mul;
	      w -= right & 0x3ffffff;
	      carry = (w >> 26) - ((right / 0x4000000) | 0);
	      this.words[i + shift] = w & 0x3ffffff;
	    }
	    for (; i < this.length - shift; i++) {
	      w = (this.words[i + shift] | 0) + carry;
	      carry = w >> 26;
	      this.words[i + shift] = w & 0x3ffffff;
	    }

	    if (carry === 0) return this.strip();

	    // Subtraction overflow
	    assert(carry === -1);
	    carry = 0;
	    for (i = 0; i < this.length; i++) {
	      w = -(this.words[i] | 0) + carry;
	      carry = w >> 26;
	      this.words[i] = w & 0x3ffffff;
	    }
	    this.negative = 1;

	    return this.strip();
	  };

	  BN.prototype._wordDiv = function _wordDiv (num, mode) {
	    var shift = this.length - num.length;

	    var a = this.clone();
	    var b = num;

	    // Normalize
	    var bhi = b.words[b.length - 1] | 0;
	    var bhiBits = this._countBits(bhi);
	    shift = 26 - bhiBits;
	    if (shift !== 0) {
	      b = b.ushln(shift);
	      a.iushln(shift);
	      bhi = b.words[b.length - 1] | 0;
	    }

	    // Initialize quotient
	    var m = a.length - b.length;
	    var q;

	    if (mode !== 'mod') {
	      q = new BN(null);
	      q.length = m + 1;
	      q.words = new Array(q.length);
	      for (var i = 0; i < q.length; i++) {
	        q.words[i] = 0;
	      }
	    }

	    var diff = a.clone()._ishlnsubmul(b, 1, m);
	    if (diff.negative === 0) {
	      a = diff;
	      if (q) {
	        q.words[m] = 1;
	      }
	    }

	    for (var j = m - 1; j >= 0; j--) {
	      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
	        (a.words[b.length + j - 1] | 0);

	      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
	      // (0x7ffffff)
	      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

	      a._ishlnsubmul(b, qj, j);
	      while (a.negative !== 0) {
	        qj--;
	        a.negative = 0;
	        a._ishlnsubmul(b, 1, j);
	        if (!a.isZero()) {
	          a.negative ^= 1;
	        }
	      }
	      if (q) {
	        q.words[j] = qj;
	      }
	    }
	    if (q) {
	      q.strip();
	    }
	    a.strip();

	    // Denormalize
	    if (mode !== 'div' && shift !== 0) {
	      a.iushrn(shift);
	    }

	    return {
	      div: q || null,
	      mod: a
	    };
	  };

	  // NOTE: 1) `mode` can be set to `mod` to request mod only,
	  //       to `div` to request div only, or be absent to
	  //       request both div & mod
	  //       2) `positive` is true if unsigned mod is requested
	  BN.prototype.divmod = function divmod (num, mode, positive) {
	    assert(!num.isZero());

	    if (this.isZero()) {
	      return {
	        div: new BN(0),
	        mod: new BN(0)
	      };
	    }

	    var div, mod, res;
	    if (this.negative !== 0 && num.negative === 0) {
	      res = this.neg().divmod(num, mode);

	      if (mode !== 'mod') {
	        div = res.div.neg();
	      }

	      if (mode !== 'div') {
	        mod = res.mod.neg();
	        if (positive && mod.negative !== 0) {
	          mod.iadd(num);
	        }
	      }

	      return {
	        div: div,
	        mod: mod
	      };
	    }

	    if (this.negative === 0 && num.negative !== 0) {
	      res = this.divmod(num.neg(), mode);

	      if (mode !== 'mod') {
	        div = res.div.neg();
	      }

	      return {
	        div: div,
	        mod: res.mod
	      };
	    }

	    if ((this.negative & num.negative) !== 0) {
	      res = this.neg().divmod(num.neg(), mode);

	      if (mode !== 'div') {
	        mod = res.mod.neg();
	        if (positive && mod.negative !== 0) {
	          mod.isub(num);
	        }
	      }

	      return {
	        div: res.div,
	        mod: mod
	      };
	    }

	    // Both numbers are positive at this point

	    // Strip both numbers to approximate shift value
	    if (num.length > this.length || this.cmp(num) < 0) {
	      return {
	        div: new BN(0),
	        mod: this
	      };
	    }

	    // Very short reduction
	    if (num.length === 1) {
	      if (mode === 'div') {
	        return {
	          div: this.divn(num.words[0]),
	          mod: null
	        };
	      }

	      if (mode === 'mod') {
	        return {
	          div: null,
	          mod: new BN(this.modn(num.words[0]))
	        };
	      }

	      return {
	        div: this.divn(num.words[0]),
	        mod: new BN(this.modn(num.words[0]))
	      };
	    }

	    return this._wordDiv(num, mode);
	  };

	  // Find `this` / `num`
	  BN.prototype.div = function div (num) {
	    return this.divmod(num, 'div', false).div;
	  };

	  // Find `this` % `num`
	  BN.prototype.mod = function mod (num) {
	    return this.divmod(num, 'mod', false).mod;
	  };

	  BN.prototype.umod = function umod (num) {
	    return this.divmod(num, 'mod', true).mod;
	  };

	  // Find Round(`this` / `num`)
	  BN.prototype.divRound = function divRound (num) {
	    var dm = this.divmod(num);

	    // Fast case - exact division
	    if (dm.mod.isZero()) return dm.div;

	    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

	    var half = num.ushrn(1);
	    var r2 = num.andln(1);
	    var cmp = mod.cmp(half);

	    // Round down
	    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

	    // Round up
	    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
	  };

	  BN.prototype.modn = function modn (num) {
	    assert(num <= 0x3ffffff);
	    var p = (1 << 26) % num;

	    var acc = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      acc = (p * acc + (this.words[i] | 0)) % num;
	    }

	    return acc;
	  };

	  // In-place division by number
	  BN.prototype.idivn = function idivn (num) {
	    assert(num <= 0x3ffffff);

	    var carry = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      var w = (this.words[i] | 0) + carry * 0x4000000;
	      this.words[i] = (w / num) | 0;
	      carry = w % num;
	    }

	    return this.strip();
	  };

	  BN.prototype.divn = function divn (num) {
	    return this.clone().idivn(num);
	  };

	  BN.prototype.egcd = function egcd (p) {
	    assert(p.negative === 0);
	    assert(!p.isZero());

	    var x = this;
	    var y = p.clone();

	    if (x.negative !== 0) {
	      x = x.umod(p);
	    } else {
	      x = x.clone();
	    }

	    // A * x + B * y = x
	    var A = new BN(1);
	    var B = new BN(0);

	    // C * x + D * y = y
	    var C = new BN(0);
	    var D = new BN(1);

	    var g = 0;

	    while (x.isEven() && y.isEven()) {
	      x.iushrn(1);
	      y.iushrn(1);
	      ++g;
	    }

	    var yp = y.clone();
	    var xp = x.clone();

	    while (!x.isZero()) {
	      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
	      if (i > 0) {
	        x.iushrn(i);
	        while (i-- > 0) {
	          if (A.isOdd() || B.isOdd()) {
	            A.iadd(yp);
	            B.isub(xp);
	          }

	          A.iushrn(1);
	          B.iushrn(1);
	        }
	      }

	      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
	      if (j > 0) {
	        y.iushrn(j);
	        while (j-- > 0) {
	          if (C.isOdd() || D.isOdd()) {
	            C.iadd(yp);
	            D.isub(xp);
	          }

	          C.iushrn(1);
	          D.iushrn(1);
	        }
	      }

	      if (x.cmp(y) >= 0) {
	        x.isub(y);
	        A.isub(C);
	        B.isub(D);
	      } else {
	        y.isub(x);
	        C.isub(A);
	        D.isub(B);
	      }
	    }

	    return {
	      a: C,
	      b: D,
	      gcd: y.iushln(g)
	    };
	  };

	  // This is reduced incarnation of the binary EEA
	  // above, designated to invert members of the
	  // _prime_ fields F(p) at a maximal speed
	  BN.prototype._invmp = function _invmp (p) {
	    assert(p.negative === 0);
	    assert(!p.isZero());

	    var a = this;
	    var b = p.clone();

	    if (a.negative !== 0) {
	      a = a.umod(p);
	    } else {
	      a = a.clone();
	    }

	    var x1 = new BN(1);
	    var x2 = new BN(0);

	    var delta = b.clone();

	    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
	      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
	      if (i > 0) {
	        a.iushrn(i);
	        while (i-- > 0) {
	          if (x1.isOdd()) {
	            x1.iadd(delta);
	          }

	          x1.iushrn(1);
	        }
	      }

	      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
	      if (j > 0) {
	        b.iushrn(j);
	        while (j-- > 0) {
	          if (x2.isOdd()) {
	            x2.iadd(delta);
	          }

	          x2.iushrn(1);
	        }
	      }

	      if (a.cmp(b) >= 0) {
	        a.isub(b);
	        x1.isub(x2);
	      } else {
	        b.isub(a);
	        x2.isub(x1);
	      }
	    }

	    var res;
	    if (a.cmpn(1) === 0) {
	      res = x1;
	    } else {
	      res = x2;
	    }

	    if (res.cmpn(0) < 0) {
	      res.iadd(p);
	    }

	    return res;
	  };

	  BN.prototype.gcd = function gcd (num) {
	    if (this.isZero()) return num.abs();
	    if (num.isZero()) return this.abs();

	    var a = this.clone();
	    var b = num.clone();
	    a.negative = 0;
	    b.negative = 0;

	    // Remove common factor of two
	    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
	      a.iushrn(1);
	      b.iushrn(1);
	    }

	    do {
	      while (a.isEven()) {
	        a.iushrn(1);
	      }
	      while (b.isEven()) {
	        b.iushrn(1);
	      }

	      var r = a.cmp(b);
	      if (r < 0) {
	        // Swap `a` and `b` to make `a` always bigger than `b`
	        var t = a;
	        a = b;
	        b = t;
	      } else if (r === 0 || b.cmpn(1) === 0) {
	        break;
	      }

	      a.isub(b);
	    } while (true);

	    return b.iushln(shift);
	  };

	  // Invert number in the field F(num)
	  BN.prototype.invm = function invm (num) {
	    return this.egcd(num).a.umod(num);
	  };

	  BN.prototype.isEven = function isEven () {
	    return (this.words[0] & 1) === 0;
	  };

	  BN.prototype.isOdd = function isOdd () {
	    return (this.words[0] & 1) === 1;
	  };

	  // And first word and num
	  BN.prototype.andln = function andln (num) {
	    return this.words[0] & num;
	  };

	  // Increment at the bit position in-line
	  BN.prototype.bincn = function bincn (bit) {
	    assert(typeof bit === 'number');
	    var r = bit % 26;
	    var s = (bit - r) / 26;
	    var q = 1 << r;

	    // Fast case: bit is much higher than all existing words
	    if (this.length <= s) {
	      this._expand(s + 1);
	      this.words[s] |= q;
	      return this;
	    }

	    // Add bit and propagate, if needed
	    var carry = q;
	    for (var i = s; carry !== 0 && i < this.length; i++) {
	      var w = this.words[i] | 0;
	      w += carry;
	      carry = w >>> 26;
	      w &= 0x3ffffff;
	      this.words[i] = w;
	    }
	    if (carry !== 0) {
	      this.words[i] = carry;
	      this.length++;
	    }
	    return this;
	  };

	  BN.prototype.isZero = function isZero () {
	    return this.length === 1 && this.words[0] === 0;
	  };

	  BN.prototype.cmpn = function cmpn (num) {
	    var negative = num < 0;

	    if (this.negative !== 0 && !negative) return -1;
	    if (this.negative === 0 && negative) return 1;

	    this.strip();

	    var res;
	    if (this.length > 1) {
	      res = 1;
	    } else {
	      if (negative) {
	        num = -num;
	      }

	      assert(num <= 0x3ffffff, 'Number is too big');

	      var w = this.words[0] | 0;
	      res = w === num ? 0 : w < num ? -1 : 1;
	    }
	    if (this.negative !== 0) return -res | 0;
	    return res;
	  };

	  // Compare two numbers and return:
	  // 1 - if `this` > `num`
	  // 0 - if `this` == `num`
	  // -1 - if `this` < `num`
	  BN.prototype.cmp = function cmp (num) {
	    if (this.negative !== 0 && num.negative === 0) return -1;
	    if (this.negative === 0 && num.negative !== 0) return 1;

	    var res = this.ucmp(num);
	    if (this.negative !== 0) return -res | 0;
	    return res;
	  };

	  // Unsigned comparison
	  BN.prototype.ucmp = function ucmp (num) {
	    // At this point both numbers have the same sign
	    if (this.length > num.length) return 1;
	    if (this.length < num.length) return -1;

	    var res = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      var a = this.words[i] | 0;
	      var b = num.words[i] | 0;

	      if (a === b) continue;
	      if (a < b) {
	        res = -1;
	      } else if (a > b) {
	        res = 1;
	      }
	      break;
	    }
	    return res;
	  };

	  BN.prototype.gtn = function gtn (num) {
	    return this.cmpn(num) === 1;
	  };

	  BN.prototype.gt = function gt (num) {
	    return this.cmp(num) === 1;
	  };

	  BN.prototype.gten = function gten (num) {
	    return this.cmpn(num) >= 0;
	  };

	  BN.prototype.gte = function gte (num) {
	    return this.cmp(num) >= 0;
	  };

	  BN.prototype.ltn = function ltn (num) {
	    return this.cmpn(num) === -1;
	  };

	  BN.prototype.lt = function lt (num) {
	    return this.cmp(num) === -1;
	  };

	  BN.prototype.lten = function lten (num) {
	    return this.cmpn(num) <= 0;
	  };

	  BN.prototype.lte = function lte (num) {
	    return this.cmp(num) <= 0;
	  };

	  BN.prototype.eqn = function eqn (num) {
	    return this.cmpn(num) === 0;
	  };

	  BN.prototype.eq = function eq (num) {
	    return this.cmp(num) === 0;
	  };

	  //
	  // A reduce context, could be using montgomery or something better, depending
	  // on the `m` itself.
	  //
	  BN.red = function red (num) {
	    return new Red(num);
	  };

	  BN.prototype.toRed = function toRed (ctx) {
	    assert(!this.red, 'Already a number in reduction context');
	    assert(this.negative === 0, 'red works only with positives');
	    return ctx.convertTo(this)._forceRed(ctx);
	  };

	  BN.prototype.fromRed = function fromRed () {
	    assert(this.red, 'fromRed works only with numbers in reduction context');
	    return this.red.convertFrom(this);
	  };

	  BN.prototype._forceRed = function _forceRed (ctx) {
	    this.red = ctx;
	    return this;
	  };

	  BN.prototype.forceRed = function forceRed (ctx) {
	    assert(!this.red, 'Already a number in reduction context');
	    return this._forceRed(ctx);
	  };

	  BN.prototype.redAdd = function redAdd (num) {
	    assert(this.red, 'redAdd works only with red numbers');
	    return this.red.add(this, num);
	  };

	  BN.prototype.redIAdd = function redIAdd (num) {
	    assert(this.red, 'redIAdd works only with red numbers');
	    return this.red.iadd(this, num);
	  };

	  BN.prototype.redSub = function redSub (num) {
	    assert(this.red, 'redSub works only with red numbers');
	    return this.red.sub(this, num);
	  };

	  BN.prototype.redISub = function redISub (num) {
	    assert(this.red, 'redISub works only with red numbers');
	    return this.red.isub(this, num);
	  };

	  BN.prototype.redShl = function redShl (num) {
	    assert(this.red, 'redShl works only with red numbers');
	    return this.red.shl(this, num);
	  };

	  BN.prototype.redMul = function redMul (num) {
	    assert(this.red, 'redMul works only with red numbers');
	    this.red._verify2(this, num);
	    return this.red.mul(this, num);
	  };

	  BN.prototype.redIMul = function redIMul (num) {
	    assert(this.red, 'redMul works only with red numbers');
	    this.red._verify2(this, num);
	    return this.red.imul(this, num);
	  };

	  BN.prototype.redSqr = function redSqr () {
	    assert(this.red, 'redSqr works only with red numbers');
	    this.red._verify1(this);
	    return this.red.sqr(this);
	  };

	  BN.prototype.redISqr = function redISqr () {
	    assert(this.red, 'redISqr works only with red numbers');
	    this.red._verify1(this);
	    return this.red.isqr(this);
	  };

	  // Square root over p
	  BN.prototype.redSqrt = function redSqrt () {
	    assert(this.red, 'redSqrt works only with red numbers');
	    this.red._verify1(this);
	    return this.red.sqrt(this);
	  };

	  BN.prototype.redInvm = function redInvm () {
	    assert(this.red, 'redInvm works only with red numbers');
	    this.red._verify1(this);
	    return this.red.invm(this);
	  };

	  // Return negative clone of `this` % `red modulo`
	  BN.prototype.redNeg = function redNeg () {
	    assert(this.red, 'redNeg works only with red numbers');
	    this.red._verify1(this);
	    return this.red.neg(this);
	  };

	  BN.prototype.redPow = function redPow (num) {
	    assert(this.red && !num.red, 'redPow(normalNum)');
	    this.red._verify1(this);
	    return this.red.pow(this, num);
	  };

	  // Prime numbers with efficient reduction
	  var primes = {
	    k256: null,
	    p224: null,
	    p192: null,
	    p25519: null
	  };

	  // Pseudo-Mersenne prime
	  function MPrime (name, p) {
	    // P = 2 ^ N - K
	    this.name = name;
	    this.p = new BN(p, 16);
	    this.n = this.p.bitLength();
	    this.k = new BN(1).iushln(this.n).isub(this.p);

	    this.tmp = this._tmp();
	  }

	  MPrime.prototype._tmp = function _tmp () {
	    var tmp = new BN(null);
	    tmp.words = new Array(Math.ceil(this.n / 13));
	    return tmp;
	  };

	  MPrime.prototype.ireduce = function ireduce (num) {
	    // Assumes that `num` is less than `P^2`
	    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
	    var r = num;
	    var rlen;

	    do {
	      this.split(r, this.tmp);
	      r = this.imulK(r);
	      r = r.iadd(this.tmp);
	      rlen = r.bitLength();
	    } while (rlen > this.n);

	    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
	    if (cmp === 0) {
	      r.words[0] = 0;
	      r.length = 1;
	    } else if (cmp > 0) {
	      r.isub(this.p);
	    } else {
	      if (r.strip !== undefined) {
	        // r is BN v4 instance
	        r.strip();
	      } else {
	        // r is BN v5 instance
	        r._strip();
	      }
	    }

	    return r;
	  };

	  MPrime.prototype.split = function split (input, out) {
	    input.iushrn(this.n, 0, out);
	  };

	  MPrime.prototype.imulK = function imulK (num) {
	    return num.imul(this.k);
	  };

	  function K256 () {
	    MPrime.call(
	      this,
	      'k256',
	      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
	  }
	  inherits(K256, MPrime);

	  K256.prototype.split = function split (input, output) {
	    // 256 = 9 * 26 + 22
	    var mask = 0x3fffff;

	    var outLen = Math.min(input.length, 9);
	    for (var i = 0; i < outLen; i++) {
	      output.words[i] = input.words[i];
	    }
	    output.length = outLen;

	    if (input.length <= 9) {
	      input.words[0] = 0;
	      input.length = 1;
	      return;
	    }

	    // Shift by 9 limbs
	    var prev = input.words[9];
	    output.words[output.length++] = prev & mask;

	    for (i = 10; i < input.length; i++) {
	      var next = input.words[i] | 0;
	      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
	      prev = next;
	    }
	    prev >>>= 22;
	    input.words[i - 10] = prev;
	    if (prev === 0 && input.length > 10) {
	      input.length -= 10;
	    } else {
	      input.length -= 9;
	    }
	  };

	  K256.prototype.imulK = function imulK (num) {
	    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
	    num.words[num.length] = 0;
	    num.words[num.length + 1] = 0;
	    num.length += 2;

	    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
	    var lo = 0;
	    for (var i = 0; i < num.length; i++) {
	      var w = num.words[i] | 0;
	      lo += w * 0x3d1;
	      num.words[i] = lo & 0x3ffffff;
	      lo = w * 0x40 + ((lo / 0x4000000) | 0);
	    }

	    // Fast length reduction
	    if (num.words[num.length - 1] === 0) {
	      num.length--;
	      if (num.words[num.length - 1] === 0) {
	        num.length--;
	      }
	    }
	    return num;
	  };

	  function P224 () {
	    MPrime.call(
	      this,
	      'p224',
	      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
	  }
	  inherits(P224, MPrime);

	  function P192 () {
	    MPrime.call(
	      this,
	      'p192',
	      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
	  }
	  inherits(P192, MPrime);

	  function P25519 () {
	    // 2 ^ 255 - 19
	    MPrime.call(
	      this,
	      '25519',
	      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
	  }
	  inherits(P25519, MPrime);

	  P25519.prototype.imulK = function imulK (num) {
	    // K = 0x13
	    var carry = 0;
	    for (var i = 0; i < num.length; i++) {
	      var hi = (num.words[i] | 0) * 0x13 + carry;
	      var lo = hi & 0x3ffffff;
	      hi >>>= 26;

	      num.words[i] = lo;
	      carry = hi;
	    }
	    if (carry !== 0) {
	      num.words[num.length++] = carry;
	    }
	    return num;
	  };

	  // Exported mostly for testing purposes, use plain name instead
	  BN._prime = function prime (name) {
	    // Cached version of prime
	    if (primes[name]) return primes[name];

	    var prime;
	    if (name === 'k256') {
	      prime = new K256();
	    } else if (name === 'p224') {
	      prime = new P224();
	    } else if (name === 'p192') {
	      prime = new P192();
	    } else if (name === 'p25519') {
	      prime = new P25519();
	    } else {
	      throw new Error('Unknown prime ' + name);
	    }
	    primes[name] = prime;

	    return prime;
	  };

	  //
	  // Base reduction engine
	  //
	  function Red (m) {
	    if (typeof m === 'string') {
	      var prime = BN._prime(m);
	      this.m = prime.p;
	      this.prime = prime;
	    } else {
	      assert(m.gtn(1), 'modulus must be greater than 1');
	      this.m = m;
	      this.prime = null;
	    }
	  }

	  Red.prototype._verify1 = function _verify1 (a) {
	    assert(a.negative === 0, 'red works only with positives');
	    assert(a.red, 'red works only with red numbers');
	  };

	  Red.prototype._verify2 = function _verify2 (a, b) {
	    assert((a.negative | b.negative) === 0, 'red works only with positives');
	    assert(a.red && a.red === b.red,
	      'red works only with red numbers');
	  };

	  Red.prototype.imod = function imod (a) {
	    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
	    return a.umod(this.m)._forceRed(this);
	  };

	  Red.prototype.neg = function neg (a) {
	    if (a.isZero()) {
	      return a.clone();
	    }

	    return this.m.sub(a)._forceRed(this);
	  };

	  Red.prototype.add = function add (a, b) {
	    this._verify2(a, b);

	    var res = a.add(b);
	    if (res.cmp(this.m) >= 0) {
	      res.isub(this.m);
	    }
	    return res._forceRed(this);
	  };

	  Red.prototype.iadd = function iadd (a, b) {
	    this._verify2(a, b);

	    var res = a.iadd(b);
	    if (res.cmp(this.m) >= 0) {
	      res.isub(this.m);
	    }
	    return res;
	  };

	  Red.prototype.sub = function sub (a, b) {
	    this._verify2(a, b);

	    var res = a.sub(b);
	    if (res.cmpn(0) < 0) {
	      res.iadd(this.m);
	    }
	    return res._forceRed(this);
	  };

	  Red.prototype.isub = function isub (a, b) {
	    this._verify2(a, b);

	    var res = a.isub(b);
	    if (res.cmpn(0) < 0) {
	      res.iadd(this.m);
	    }
	    return res;
	  };

	  Red.prototype.shl = function shl (a, num) {
	    this._verify1(a);
	    return this.imod(a.ushln(num));
	  };

	  Red.prototype.imul = function imul (a, b) {
	    this._verify2(a, b);
	    return this.imod(a.imul(b));
	  };

	  Red.prototype.mul = function mul (a, b) {
	    this._verify2(a, b);
	    return this.imod(a.mul(b));
	  };

	  Red.prototype.isqr = function isqr (a) {
	    return this.imul(a, a.clone());
	  };

	  Red.prototype.sqr = function sqr (a) {
	    return this.mul(a, a);
	  };

	  Red.prototype.sqrt = function sqrt (a) {
	    if (a.isZero()) return a.clone();

	    var mod3 = this.m.andln(3);
	    assert(mod3 % 2 === 1);

	    // Fast case
	    if (mod3 === 3) {
	      var pow = this.m.add(new BN(1)).iushrn(2);
	      return this.pow(a, pow);
	    }

	    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
	    //
	    // Find Q and S, that Q * 2 ^ S = (P - 1)
	    var q = this.m.subn(1);
	    var s = 0;
	    while (!q.isZero() && q.andln(1) === 0) {
	      s++;
	      q.iushrn(1);
	    }
	    assert(!q.isZero());

	    var one = new BN(1).toRed(this);
	    var nOne = one.redNeg();

	    // Find quadratic non-residue
	    // NOTE: Max is such because of generalized Riemann hypothesis.
	    var lpow = this.m.subn(1).iushrn(1);
	    var z = this.m.bitLength();
	    z = new BN(2 * z * z).toRed(this);

	    while (this.pow(z, lpow).cmp(nOne) !== 0) {
	      z.redIAdd(nOne);
	    }

	    var c = this.pow(z, q);
	    var r = this.pow(a, q.addn(1).iushrn(1));
	    var t = this.pow(a, q);
	    var m = s;
	    while (t.cmp(one) !== 0) {
	      var tmp = t;
	      for (var i = 0; tmp.cmp(one) !== 0; i++) {
	        tmp = tmp.redSqr();
	      }
	      assert(i < m);
	      var b = this.pow(c, new BN(1).iushln(m - i - 1));

	      r = r.redMul(b);
	      c = b.redSqr();
	      t = t.redMul(c);
	      m = i;
	    }

	    return r;
	  };

	  Red.prototype.invm = function invm (a) {
	    var inv = a._invmp(this.m);
	    if (inv.negative !== 0) {
	      inv.negative = 0;
	      return this.imod(inv).redNeg();
	    } else {
	      return this.imod(inv);
	    }
	  };

	  Red.prototype.pow = function pow (a, num) {
	    if (num.isZero()) return new BN(1).toRed(this);
	    if (num.cmpn(1) === 0) return a.clone();

	    var windowSize = 4;
	    var wnd = new Array(1 << windowSize);
	    wnd[0] = new BN(1).toRed(this);
	    wnd[1] = a;
	    for (var i = 2; i < wnd.length; i++) {
	      wnd[i] = this.mul(wnd[i - 1], a);
	    }

	    var res = wnd[0];
	    var current = 0;
	    var currentLen = 0;
	    var start = num.bitLength() % 26;
	    if (start === 0) {
	      start = 26;
	    }

	    for (i = num.length - 1; i >= 0; i--) {
	      var word = num.words[i];
	      for (var j = start - 1; j >= 0; j--) {
	        var bit = (word >> j) & 1;
	        if (res !== wnd[0]) {
	          res = this.sqr(res);
	        }

	        if (bit === 0 && current === 0) {
	          currentLen = 0;
	          continue;
	        }

	        current <<= 1;
	        current |= bit;
	        currentLen++;
	        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

	        res = this.mul(res, wnd[current]);
	        currentLen = 0;
	        current = 0;
	      }
	      start = 26;
	    }

	    return res;
	  };

	  Red.prototype.convertTo = function convertTo (num) {
	    var r = num.umod(this.m);

	    return r === num ? r.clone() : r;
	  };

	  Red.prototype.convertFrom = function convertFrom (num) {
	    var res = num.clone();
	    res.red = null;
	    return res;
	  };

	  //
	  // Montgomery method engine
	  //

	  BN.mont = function mont (num) {
	    return new Mont(num);
	  };

	  function Mont (m) {
	    Red.call(this, m);

	    this.shift = this.m.bitLength();
	    if (this.shift % 26 !== 0) {
	      this.shift += 26 - (this.shift % 26);
	    }

	    this.r = new BN(1).iushln(this.shift);
	    this.r2 = this.imod(this.r.sqr());
	    this.rinv = this.r._invmp(this.m);

	    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
	    this.minv = this.minv.umod(this.r);
	    this.minv = this.r.sub(this.minv);
	  }
	  inherits(Mont, Red);

	  Mont.prototype.convertTo = function convertTo (num) {
	    return this.imod(num.ushln(this.shift));
	  };

	  Mont.prototype.convertFrom = function convertFrom (num) {
	    var r = this.imod(num.mul(this.rinv));
	    r.red = null;
	    return r;
	  };

	  Mont.prototype.imul = function imul (a, b) {
	    if (a.isZero() || b.isZero()) {
	      a.words[0] = 0;
	      a.length = 1;
	      return a;
	    }

	    var t = a.imul(b);
	    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
	    var u = t.isub(c).iushrn(this.shift);
	    var res = u;

	    if (u.cmp(this.m) >= 0) {
	      res = u.isub(this.m);
	    } else if (u.cmpn(0) < 0) {
	      res = u.iadd(this.m);
	    }

	    return res._forceRed(this);
	  };

	  Mont.prototype.mul = function mul (a, b) {
	    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

	    var t = a.mul(b);
	    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
	    var u = t.isub(c).iushrn(this.shift);
	    var res = u;
	    if (u.cmp(this.m) >= 0) {
	      res = u.isub(this.m);
	    } else if (u.cmpn(0) < 0) {
	      res = u.iadd(this.m);
	    }

	    return res._forceRed(this);
	  };

	  Mont.prototype.invm = function invm (a) {
	    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
	    var res = this.imod(a._invmp(this.m).mul(this.r2));
	    return res._forceRed(this);
	  };
	})(module, commonjsGlobal);
	}(bn));

	var minimalisticAssert = assert$h;

	function assert$h(val, msg) {
	  if (!val)
	    throw new Error(msg || 'Assertion failed');
	}

	assert$h.equal = function assertEqual(l, r, msg) {
	  if (l != r)
	    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
	};

	var utils$o = {};

	(function (exports) {

	var utils = exports;

	function toArray(msg, enc) {
	  if (Array.isArray(msg))
	    return msg.slice();
	  if (!msg)
	    return [];
	  var res = [];
	  if (typeof msg !== 'string') {
	    for (var i = 0; i < msg.length; i++)
	      res[i] = msg[i] | 0;
	    return res;
	  }
	  if (enc === 'hex') {
	    msg = msg.replace(/[^a-z0-9]+/ig, '');
	    if (msg.length % 2 !== 0)
	      msg = '0' + msg;
	    for (var i = 0; i < msg.length; i += 2)
	      res.push(parseInt(msg[i] + msg[i + 1], 16));
	  } else {
	    for (var i = 0; i < msg.length; i++) {
	      var c = msg.charCodeAt(i);
	      var hi = c >> 8;
	      var lo = c & 0xff;
	      if (hi)
	        res.push(hi, lo);
	      else
	        res.push(lo);
	    }
	  }
	  return res;
	}
	utils.toArray = toArray;

	function zero2(word) {
	  if (word.length === 1)
	    return '0' + word;
	  else
	    return word;
	}
	utils.zero2 = zero2;

	function toHex(msg) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++)
	    res += zero2(msg[i].toString(16));
	  return res;
	}
	utils.toHex = toHex;

	utils.encode = function encode(arr, enc) {
	  if (enc === 'hex')
	    return toHex(arr);
	  else
	    return arr;
	};
	}(utils$o));

	(function (exports) {

	var utils = exports;
	var BN = bn.exports;
	var minAssert = minimalisticAssert;
	var minUtils = utils$o;

	utils.assert = minAssert;
	utils.toArray = minUtils.toArray;
	utils.zero2 = minUtils.zero2;
	utils.toHex = minUtils.toHex;
	utils.encode = minUtils.encode;

	// Represent num in a w-NAF form
	function getNAF(num, w, bits) {
	  var naf = new Array(Math.max(num.bitLength(), bits) + 1);
	  naf.fill(0);

	  var ws = 1 << (w + 1);
	  var k = num.clone();

	  for (var i = 0; i < naf.length; i++) {
	    var z;
	    var mod = k.andln(ws - 1);
	    if (k.isOdd()) {
	      if (mod > (ws >> 1) - 1)
	        z = (ws >> 1) - mod;
	      else
	        z = mod;
	      k.isubn(z);
	    } else {
	      z = 0;
	    }

	    naf[i] = z;
	    k.iushrn(1);
	  }

	  return naf;
	}
	utils.getNAF = getNAF;

	// Represent k1, k2 in a Joint Sparse Form
	function getJSF(k1, k2) {
	  var jsf = [
	    [],
	    [],
	  ];

	  k1 = k1.clone();
	  k2 = k2.clone();
	  var d1 = 0;
	  var d2 = 0;
	  var m8;
	  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
	    // First phase
	    var m14 = (k1.andln(3) + d1) & 3;
	    var m24 = (k2.andln(3) + d2) & 3;
	    if (m14 === 3)
	      m14 = -1;
	    if (m24 === 3)
	      m24 = -1;
	    var u1;
	    if ((m14 & 1) === 0) {
	      u1 = 0;
	    } else {
	      m8 = (k1.andln(7) + d1) & 7;
	      if ((m8 === 3 || m8 === 5) && m24 === 2)
	        u1 = -m14;
	      else
	        u1 = m14;
	    }
	    jsf[0].push(u1);

	    var u2;
	    if ((m24 & 1) === 0) {
	      u2 = 0;
	    } else {
	      m8 = (k2.andln(7) + d2) & 7;
	      if ((m8 === 3 || m8 === 5) && m14 === 2)
	        u2 = -m24;
	      else
	        u2 = m24;
	    }
	    jsf[1].push(u2);

	    // Second phase
	    if (2 * d1 === u1 + 1)
	      d1 = 1 - d1;
	    if (2 * d2 === u2 + 1)
	      d2 = 1 - d2;
	    k1.iushrn(1);
	    k2.iushrn(1);
	  }

	  return jsf;
	}
	utils.getJSF = getJSF;

	function cachedProperty(obj, name, computer) {
	  var key = '_' + name;
	  obj.prototype[name] = function cachedProperty() {
	    return this[key] !== undefined ? this[key] :
	      this[key] = computer.call(this);
	  };
	}
	utils.cachedProperty = cachedProperty;

	function parseBytes(bytes) {
	  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
	    bytes;
	}
	utils.parseBytes = parseBytes;

	function intFromLE(bytes) {
	  return new BN(bytes, 'hex', 'le');
	}
	utils.intFromLE = intFromLE;
	}(utils$p));

	var brorand = {exports: {}};

	var r$1;

	brorand.exports = function rand(len) {
	  if (!r$1)
	    r$1 = new Rand(null);

	  return r$1.generate(len);
	};

	function Rand(rand) {
	  this.rand = rand;
	}
	brorand.exports.Rand = Rand;

	Rand.prototype.generate = function generate(len) {
	  return this._rand(len);
	};

	// Emulate crypto API using randy
	Rand.prototype._rand = function _rand(n) {
	  if (this.rand.getBytes)
	    return this.rand.getBytes(n);

	  var res = new Uint8Array(n);
	  for (var i = 0; i < res.length; i++)
	    res[i] = this.rand.getByte();
	  return res;
	};

	if (typeof self === 'object') {
	  if (self.crypto && self.crypto.getRandomValues) {
	    // Modern browsers
	    Rand.prototype._rand = function _rand(n) {
	      var arr = new Uint8Array(n);
	      self.crypto.getRandomValues(arr);
	      return arr;
	    };
	  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
	    // IE
	    Rand.prototype._rand = function _rand(n) {
	      var arr = new Uint8Array(n);
	      self.msCrypto.getRandomValues(arr);
	      return arr;
	    };

	  // Safari's WebWorkers do not have `crypto`
	  } else if (typeof window === 'object') {
	    // Old junk
	    Rand.prototype._rand = function() {
	      throw new Error('Not implemented yet');
	    };
	  }
	} else {
	  // Node.js or Web worker with no crypto support
	  try {
	    var crypto$3 = require$$0__default$4['default'];
	    if (typeof crypto$3.randomBytes !== 'function')
	      throw new Error('Not supported');

	    Rand.prototype._rand = function _rand(n) {
	      return crypto$3.randomBytes(n);
	    };
	  } catch (e) {
	  }
	}

	var curve = {};

	var BN$7 = bn.exports;
	var utils$n = utils$p;
	var getNAF = utils$n.getNAF;
	var getJSF = utils$n.getJSF;
	var assert$g = utils$n.assert;

	function BaseCurve(type, conf) {
	  this.type = type;
	  this.p = new BN$7(conf.p, 16);

	  // Use Montgomery, when there is no fast reduction for the prime
	  this.red = conf.prime ? BN$7.red(conf.prime) : BN$7.mont(this.p);

	  // Useful for many curves
	  this.zero = new BN$7(0).toRed(this.red);
	  this.one = new BN$7(1).toRed(this.red);
	  this.two = new BN$7(2).toRed(this.red);

	  // Curve configuration, optional
	  this.n = conf.n && new BN$7(conf.n, 16);
	  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

	  // Temporary arrays
	  this._wnafT1 = new Array(4);
	  this._wnafT2 = new Array(4);
	  this._wnafT3 = new Array(4);
	  this._wnafT4 = new Array(4);

	  this._bitLength = this.n ? this.n.bitLength() : 0;

	  // Generalized Greg Maxwell's trick
	  var adjustCount = this.n && this.p.div(this.n);
	  if (!adjustCount || adjustCount.cmpn(100) > 0) {
	    this.redN = null;
	  } else {
	    this._maxwellTrick = true;
	    this.redN = this.n.toRed(this.red);
	  }
	}
	var base = BaseCurve;

	BaseCurve.prototype.point = function point() {
	  throw new Error('Not implemented');
	};

	BaseCurve.prototype.validate = function validate() {
	  throw new Error('Not implemented');
	};

	BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
	  assert$g(p.precomputed);
	  var doubles = p._getDoubles();

	  var naf = getNAF(k, 1, this._bitLength);
	  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
	  I /= 3;

	  // Translate into more windowed form
	  var repr = [];
	  var j;
	  var nafW;
	  for (j = 0; j < naf.length; j += doubles.step) {
	    nafW = 0;
	    for (var l = j + doubles.step - 1; l >= j; l--)
	      nafW = (nafW << 1) + naf[l];
	    repr.push(nafW);
	  }

	  var a = this.jpoint(null, null, null);
	  var b = this.jpoint(null, null, null);
	  for (var i = I; i > 0; i--) {
	    for (j = 0; j < repr.length; j++) {
	      nafW = repr[j];
	      if (nafW === i)
	        b = b.mixedAdd(doubles.points[j]);
	      else if (nafW === -i)
	        b = b.mixedAdd(doubles.points[j].neg());
	    }
	    a = a.add(b);
	  }
	  return a.toP();
	};

	BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
	  var w = 4;

	  // Precompute window
	  var nafPoints = p._getNAFPoints(w);
	  w = nafPoints.wnd;
	  var wnd = nafPoints.points;

	  // Get NAF form
	  var naf = getNAF(k, w, this._bitLength);

	  // Add `this`*(N+1) for every w-NAF index
	  var acc = this.jpoint(null, null, null);
	  for (var i = naf.length - 1; i >= 0; i--) {
	    // Count zeroes
	    for (var l = 0; i >= 0 && naf[i] === 0; i--)
	      l++;
	    if (i >= 0)
	      l++;
	    acc = acc.dblp(l);

	    if (i < 0)
	      break;
	    var z = naf[i];
	    assert$g(z !== 0);
	    if (p.type === 'affine') {
	      // J +- P
	      if (z > 0)
	        acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
	      else
	        acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
	    } else {
	      // J +- J
	      if (z > 0)
	        acc = acc.add(wnd[(z - 1) >> 1]);
	      else
	        acc = acc.add(wnd[(-z - 1) >> 1].neg());
	    }
	  }
	  return p.type === 'affine' ? acc.toP() : acc;
	};

	BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
	  points,
	  coeffs,
	  len,
	  jacobianResult) {
	  var wndWidth = this._wnafT1;
	  var wnd = this._wnafT2;
	  var naf = this._wnafT3;

	  // Fill all arrays
	  var max = 0;
	  var i;
	  var j;
	  var p;
	  for (i = 0; i < len; i++) {
	    p = points[i];
	    var nafPoints = p._getNAFPoints(defW);
	    wndWidth[i] = nafPoints.wnd;
	    wnd[i] = nafPoints.points;
	  }

	  // Comb small window NAFs
	  for (i = len - 1; i >= 1; i -= 2) {
	    var a = i - 1;
	    var b = i;
	    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
	      naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
	      naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
	      max = Math.max(naf[a].length, max);
	      max = Math.max(naf[b].length, max);
	      continue;
	    }

	    var comb = [
	      points[a], /* 1 */
	      null, /* 3 */
	      null, /* 5 */
	      points[b], /* 7 */
	    ];

	    // Try to avoid Projective points, if possible
	    if (points[a].y.cmp(points[b].y) === 0) {
	      comb[1] = points[a].add(points[b]);
	      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
	    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
	      comb[1] = points[a].toJ().mixedAdd(points[b]);
	      comb[2] = points[a].add(points[b].neg());
	    } else {
	      comb[1] = points[a].toJ().mixedAdd(points[b]);
	      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
	    }

	    var index = [
	      -3, /* -1 -1 */
	      -1, /* -1 0 */
	      -5, /* -1 1 */
	      -7, /* 0 -1 */
	      0, /* 0 0 */
	      7, /* 0 1 */
	      5, /* 1 -1 */
	      1, /* 1 0 */
	      3,  /* 1 1 */
	    ];

	    var jsf = getJSF(coeffs[a], coeffs[b]);
	    max = Math.max(jsf[0].length, max);
	    naf[a] = new Array(max);
	    naf[b] = new Array(max);
	    for (j = 0; j < max; j++) {
	      var ja = jsf[0][j] | 0;
	      var jb = jsf[1][j] | 0;

	      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
	      naf[b][j] = 0;
	      wnd[a] = comb;
	    }
	  }

	  var acc = this.jpoint(null, null, null);
	  var tmp = this._wnafT4;
	  for (i = max; i >= 0; i--) {
	    var k = 0;

	    while (i >= 0) {
	      var zero = true;
	      for (j = 0; j < len; j++) {
	        tmp[j] = naf[j][i] | 0;
	        if (tmp[j] !== 0)
	          zero = false;
	      }
	      if (!zero)
	        break;
	      k++;
	      i--;
	    }
	    if (i >= 0)
	      k++;
	    acc = acc.dblp(k);
	    if (i < 0)
	      break;

	    for (j = 0; j < len; j++) {
	      var z = tmp[j];
	      if (z === 0)
	        continue;
	      else if (z > 0)
	        p = wnd[j][(z - 1) >> 1];
	      else if (z < 0)
	        p = wnd[j][(-z - 1) >> 1].neg();

	      if (p.type === 'affine')
	        acc = acc.mixedAdd(p);
	      else
	        acc = acc.add(p);
	    }
	  }
	  // Zeroify references
	  for (i = 0; i < len; i++)
	    wnd[i] = null;

	  if (jacobianResult)
	    return acc;
	  else
	    return acc.toP();
	};

	function BasePoint(curve, type) {
	  this.curve = curve;
	  this.type = type;
	  this.precomputed = null;
	}
	BaseCurve.BasePoint = BasePoint;

	BasePoint.prototype.eq = function eq(/*other*/) {
	  throw new Error('Not implemented');
	};

	BasePoint.prototype.validate = function validate() {
	  return this.curve.validate(this);
	};

	BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
	  bytes = utils$n.toArray(bytes, enc);

	  var len = this.p.byteLength();

	  // uncompressed, hybrid-odd, hybrid-even
	  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
	      bytes.length - 1 === 2 * len) {
	    if (bytes[0] === 0x06)
	      assert$g(bytes[bytes.length - 1] % 2 === 0);
	    else if (bytes[0] === 0x07)
	      assert$g(bytes[bytes.length - 1] % 2 === 1);

	    var res =  this.point(bytes.slice(1, 1 + len),
	      bytes.slice(1 + len, 1 + 2 * len));

	    return res;
	  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
	              bytes.length - 1 === len) {
	    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
	  }
	  throw new Error('Unknown point format');
	};

	BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
	  return this.encode(enc, true);
	};

	BasePoint.prototype._encode = function _encode(compact) {
	  var len = this.curve.p.byteLength();
	  var x = this.getX().toArray('be', len);

	  if (compact)
	    return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

	  return [ 0x04 ].concat(x, this.getY().toArray('be', len));
	};

	BasePoint.prototype.encode = function encode(enc, compact) {
	  return utils$n.encode(this._encode(compact), enc);
	};

	BasePoint.prototype.precompute = function precompute(power) {
	  if (this.precomputed)
	    return this;

	  var precomputed = {
	    doubles: null,
	    naf: null,
	    beta: null,
	  };
	  precomputed.naf = this._getNAFPoints(8);
	  precomputed.doubles = this._getDoubles(4, power);
	  precomputed.beta = this._getBeta();
	  this.precomputed = precomputed;

	  return this;
	};

	BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
	  if (!this.precomputed)
	    return false;

	  var doubles = this.precomputed.doubles;
	  if (!doubles)
	    return false;

	  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
	};

	BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
	  if (this.precomputed && this.precomputed.doubles)
	    return this.precomputed.doubles;

	  var doubles = [ this ];
	  var acc = this;
	  for (var i = 0; i < power; i += step) {
	    for (var j = 0; j < step; j++)
	      acc = acc.dbl();
	    doubles.push(acc);
	  }
	  return {
	    step: step,
	    points: doubles,
	  };
	};

	BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
	  if (this.precomputed && this.precomputed.naf)
	    return this.precomputed.naf;

	  var res = [ this ];
	  var max = (1 << wnd) - 1;
	  var dbl = max === 1 ? null : this.dbl();
	  for (var i = 1; i < max; i++)
	    res[i] = res[i - 1].add(dbl);
	  return {
	    wnd: wnd,
	    points: res,
	  };
	};

	BasePoint.prototype._getBeta = function _getBeta() {
	  return null;
	};

	BasePoint.prototype.dblp = function dblp(k) {
	  var r = this;
	  for (var i = 0; i < k; i++)
	    r = r.dbl();
	  return r;
	};

	var inherits$4 = {exports: {}};

	var inherits_browser = {exports: {}};

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	          value: ctor,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        }
	      });
	    }
	  };
	} else {
	  // old school shim for old browsers
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      var TempCtor = function () {};
	      TempCtor.prototype = superCtor.prototype;
	      ctor.prototype = new TempCtor();
	      ctor.prototype.constructor = ctor;
	    }
	  };
	}

	try {
	  var util = require$$0__default$1['default'];
	  /* istanbul ignore next */
	  if (typeof util.inherits !== 'function') throw '';
	  inherits$4.exports = util.inherits;
	} catch (e) {
	  /* istanbul ignore next */
	  inherits$4.exports = inherits_browser.exports;
	}

	var utils$m = utils$p;
	var BN$6 = bn.exports;
	var inherits$3 = inherits$4.exports;
	var Base$2 = base;

	var assert$f = utils$m.assert;

	function ShortCurve(conf) {
	  Base$2.call(this, 'short', conf);

	  this.a = new BN$6(conf.a, 16).toRed(this.red);
	  this.b = new BN$6(conf.b, 16).toRed(this.red);
	  this.tinv = this.two.redInvm();

	  this.zeroA = this.a.fromRed().cmpn(0) === 0;
	  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

	  // If the curve is endomorphic, precalculate beta and lambda
	  this.endo = this._getEndomorphism(conf);
	  this._endoWnafT1 = new Array(4);
	  this._endoWnafT2 = new Array(4);
	}
	inherits$3(ShortCurve, Base$2);
	var short = ShortCurve;

	ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
	  // No efficient endomorphism
	  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
	    return;

	  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
	  var beta;
	  var lambda;
	  if (conf.beta) {
	    beta = new BN$6(conf.beta, 16).toRed(this.red);
	  } else {
	    var betas = this._getEndoRoots(this.p);
	    // Choose the smallest beta
	    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
	    beta = beta.toRed(this.red);
	  }
	  if (conf.lambda) {
	    lambda = new BN$6(conf.lambda, 16);
	  } else {
	    // Choose the lambda that is matching selected beta
	    var lambdas = this._getEndoRoots(this.n);
	    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
	      lambda = lambdas[0];
	    } else {
	      lambda = lambdas[1];
	      assert$f(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
	    }
	  }

	  // Get basis vectors, used for balanced length-two representation
	  var basis;
	  if (conf.basis) {
	    basis = conf.basis.map(function(vec) {
	      return {
	        a: new BN$6(vec.a, 16),
	        b: new BN$6(vec.b, 16),
	      };
	    });
	  } else {
	    basis = this._getEndoBasis(lambda);
	  }

	  return {
	    beta: beta,
	    lambda: lambda,
	    basis: basis,
	  };
	};

	ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
	  // Find roots of for x^2 + x + 1 in F
	  // Root = (-1 +- Sqrt(-3)) / 2
	  //
	  var red = num === this.p ? this.red : BN$6.mont(num);
	  var tinv = new BN$6(2).toRed(red).redInvm();
	  var ntinv = tinv.redNeg();

	  var s = new BN$6(3).toRed(red).redNeg().redSqrt().redMul(tinv);

	  var l1 = ntinv.redAdd(s).fromRed();
	  var l2 = ntinv.redSub(s).fromRed();
	  return [ l1, l2 ];
	};

	ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
	  // aprxSqrt >= sqrt(this.n)
	  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

	  // 3.74
	  // Run EGCD, until r(L + 1) < aprxSqrt
	  var u = lambda;
	  var v = this.n.clone();
	  var x1 = new BN$6(1);
	  var y1 = new BN$6(0);
	  var x2 = new BN$6(0);
	  var y2 = new BN$6(1);

	  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
	  var a0;
	  var b0;
	  // First vector
	  var a1;
	  var b1;
	  // Second vector
	  var a2;
	  var b2;

	  var prevR;
	  var i = 0;
	  var r;
	  var x;
	  while (u.cmpn(0) !== 0) {
	    var q = v.div(u);
	    r = v.sub(q.mul(u));
	    x = x2.sub(q.mul(x1));
	    var y = y2.sub(q.mul(y1));

	    if (!a1 && r.cmp(aprxSqrt) < 0) {
	      a0 = prevR.neg();
	      b0 = x1;
	      a1 = r.neg();
	      b1 = x;
	    } else if (a1 && ++i === 2) {
	      break;
	    }
	    prevR = r;

	    v = u;
	    u = r;
	    x2 = x1;
	    x1 = x;
	    y2 = y1;
	    y1 = y;
	  }
	  a2 = r.neg();
	  b2 = x;

	  var len1 = a1.sqr().add(b1.sqr());
	  var len2 = a2.sqr().add(b2.sqr());
	  if (len2.cmp(len1) >= 0) {
	    a2 = a0;
	    b2 = b0;
	  }

	  // Normalize signs
	  if (a1.negative) {
	    a1 = a1.neg();
	    b1 = b1.neg();
	  }
	  if (a2.negative) {
	    a2 = a2.neg();
	    b2 = b2.neg();
	  }

	  return [
	    { a: a1, b: b1 },
	    { a: a2, b: b2 },
	  ];
	};

	ShortCurve.prototype._endoSplit = function _endoSplit(k) {
	  var basis = this.endo.basis;
	  var v1 = basis[0];
	  var v2 = basis[1];

	  var c1 = v2.b.mul(k).divRound(this.n);
	  var c2 = v1.b.neg().mul(k).divRound(this.n);

	  var p1 = c1.mul(v1.a);
	  var p2 = c2.mul(v2.a);
	  var q1 = c1.mul(v1.b);
	  var q2 = c2.mul(v2.b);

	  // Calculate answer
	  var k1 = k.sub(p1).sub(p2);
	  var k2 = q1.add(q2).neg();
	  return { k1: k1, k2: k2 };
	};

	ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
	  x = new BN$6(x, 16);
	  if (!x.red)
	    x = x.toRed(this.red);

	  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
	  var y = y2.redSqrt();
	  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
	    throw new Error('invalid point');

	  // XXX Is there any way to tell if the number is odd without converting it
	  // to non-red form?
	  var isOdd = y.fromRed().isOdd();
	  if (odd && !isOdd || !odd && isOdd)
	    y = y.redNeg();

	  return this.point(x, y);
	};

	ShortCurve.prototype.validate = function validate(point) {
	  if (point.inf)
	    return true;

	  var x = point.x;
	  var y = point.y;

	  var ax = this.a.redMul(x);
	  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
	  return y.redSqr().redISub(rhs).cmpn(0) === 0;
	};

	ShortCurve.prototype._endoWnafMulAdd =
	    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
	      var npoints = this._endoWnafT1;
	      var ncoeffs = this._endoWnafT2;
	      for (var i = 0; i < points.length; i++) {
	        var split = this._endoSplit(coeffs[i]);
	        var p = points[i];
	        var beta = p._getBeta();

	        if (split.k1.negative) {
	          split.k1.ineg();
	          p = p.neg(true);
	        }
	        if (split.k2.negative) {
	          split.k2.ineg();
	          beta = beta.neg(true);
	        }

	        npoints[i * 2] = p;
	        npoints[i * 2 + 1] = beta;
	        ncoeffs[i * 2] = split.k1;
	        ncoeffs[i * 2 + 1] = split.k2;
	      }
	      var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

	      // Clean-up references to points and coefficients
	      for (var j = 0; j < i * 2; j++) {
	        npoints[j] = null;
	        ncoeffs[j] = null;
	      }
	      return res;
	    };

	function Point$2(curve, x, y, isRed) {
	  Base$2.BasePoint.call(this, curve, 'affine');
	  if (x === null && y === null) {
	    this.x = null;
	    this.y = null;
	    this.inf = true;
	  } else {
	    this.x = new BN$6(x, 16);
	    this.y = new BN$6(y, 16);
	    // Force redgomery representation when loading from JSON
	    if (isRed) {
	      this.x.forceRed(this.curve.red);
	      this.y.forceRed(this.curve.red);
	    }
	    if (!this.x.red)
	      this.x = this.x.toRed(this.curve.red);
	    if (!this.y.red)
	      this.y = this.y.toRed(this.curve.red);
	    this.inf = false;
	  }
	}
	inherits$3(Point$2, Base$2.BasePoint);

	ShortCurve.prototype.point = function point(x, y, isRed) {
	  return new Point$2(this, x, y, isRed);
	};

	ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
	  return Point$2.fromJSON(this, obj, red);
	};

	Point$2.prototype._getBeta = function _getBeta() {
	  if (!this.curve.endo)
	    return;

	  var pre = this.precomputed;
	  if (pre && pre.beta)
	    return pre.beta;

	  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
	  if (pre) {
	    var curve = this.curve;
	    var endoMul = function(p) {
	      return curve.point(p.x.redMul(curve.endo.beta), p.y);
	    };
	    pre.beta = beta;
	    beta.precomputed = {
	      beta: null,
	      naf: pre.naf && {
	        wnd: pre.naf.wnd,
	        points: pre.naf.points.map(endoMul),
	      },
	      doubles: pre.doubles && {
	        step: pre.doubles.step,
	        points: pre.doubles.points.map(endoMul),
	      },
	    };
	  }
	  return beta;
	};

	Point$2.prototype.toJSON = function toJSON() {
	  if (!this.precomputed)
	    return [ this.x, this.y ];

	  return [ this.x, this.y, this.precomputed && {
	    doubles: this.precomputed.doubles && {
	      step: this.precomputed.doubles.step,
	      points: this.precomputed.doubles.points.slice(1),
	    },
	    naf: this.precomputed.naf && {
	      wnd: this.precomputed.naf.wnd,
	      points: this.precomputed.naf.points.slice(1),
	    },
	  } ];
	};

	Point$2.fromJSON = function fromJSON(curve, obj, red) {
	  if (typeof obj === 'string')
	    obj = JSON.parse(obj);
	  var res = curve.point(obj[0], obj[1], red);
	  if (!obj[2])
	    return res;

	  function obj2point(obj) {
	    return curve.point(obj[0], obj[1], red);
	  }

	  var pre = obj[2];
	  res.precomputed = {
	    beta: null,
	    doubles: pre.doubles && {
	      step: pre.doubles.step,
	      points: [ res ].concat(pre.doubles.points.map(obj2point)),
	    },
	    naf: pre.naf && {
	      wnd: pre.naf.wnd,
	      points: [ res ].concat(pre.naf.points.map(obj2point)),
	    },
	  };
	  return res;
	};

	Point$2.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC Point Infinity>';
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
	};

	Point$2.prototype.isInfinity = function isInfinity() {
	  return this.inf;
	};

	Point$2.prototype.add = function add(p) {
	  // O + P = P
	  if (this.inf)
	    return p;

	  // P + O = P
	  if (p.inf)
	    return this;

	  // P + P = 2P
	  if (this.eq(p))
	    return this.dbl();

	  // P + (-P) = O
	  if (this.neg().eq(p))
	    return this.curve.point(null, null);

	  // P + Q = O
	  if (this.x.cmp(p.x) === 0)
	    return this.curve.point(null, null);

	  var c = this.y.redSub(p.y);
	  if (c.cmpn(0) !== 0)
	    c = c.redMul(this.x.redSub(p.x).redInvm());
	  var nx = c.redSqr().redISub(this.x).redISub(p.x);
	  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
	  return this.curve.point(nx, ny);
	};

	Point$2.prototype.dbl = function dbl() {
	  if (this.inf)
	    return this;

	  // 2P = O
	  var ys1 = this.y.redAdd(this.y);
	  if (ys1.cmpn(0) === 0)
	    return this.curve.point(null, null);

	  var a = this.curve.a;

	  var x2 = this.x.redSqr();
	  var dyinv = ys1.redInvm();
	  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

	  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
	  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
	  return this.curve.point(nx, ny);
	};

	Point$2.prototype.getX = function getX() {
	  return this.x.fromRed();
	};

	Point$2.prototype.getY = function getY() {
	  return this.y.fromRed();
	};

	Point$2.prototype.mul = function mul(k) {
	  k = new BN$6(k, 16);
	  if (this.isInfinity())
	    return this;
	  else if (this._hasDoubles(k))
	    return this.curve._fixedNafMul(this, k);
	  else if (this.curve.endo)
	    return this.curve._endoWnafMulAdd([ this ], [ k ]);
	  else
	    return this.curve._wnafMul(this, k);
	};

	Point$2.prototype.mulAdd = function mulAdd(k1, p2, k2) {
	  var points = [ this, p2 ];
	  var coeffs = [ k1, k2 ];
	  if (this.curve.endo)
	    return this.curve._endoWnafMulAdd(points, coeffs);
	  else
	    return this.curve._wnafMulAdd(1, points, coeffs, 2);
	};

	Point$2.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
	  var points = [ this, p2 ];
	  var coeffs = [ k1, k2 ];
	  if (this.curve.endo)
	    return this.curve._endoWnafMulAdd(points, coeffs, true);
	  else
	    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
	};

	Point$2.prototype.eq = function eq(p) {
	  return this === p ||
	         this.inf === p.inf &&
	             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
	};

	Point$2.prototype.neg = function neg(_precompute) {
	  if (this.inf)
	    return this;

	  var res = this.curve.point(this.x, this.y.redNeg());
	  if (_precompute && this.precomputed) {
	    var pre = this.precomputed;
	    var negate = function(p) {
	      return p.neg();
	    };
	    res.precomputed = {
	      naf: pre.naf && {
	        wnd: pre.naf.wnd,
	        points: pre.naf.points.map(negate),
	      },
	      doubles: pre.doubles && {
	        step: pre.doubles.step,
	        points: pre.doubles.points.map(negate),
	      },
	    };
	  }
	  return res;
	};

	Point$2.prototype.toJ = function toJ() {
	  if (this.inf)
	    return this.curve.jpoint(null, null, null);

	  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
	  return res;
	};

	function JPoint(curve, x, y, z) {
	  Base$2.BasePoint.call(this, curve, 'jacobian');
	  if (x === null && y === null && z === null) {
	    this.x = this.curve.one;
	    this.y = this.curve.one;
	    this.z = new BN$6(0);
	  } else {
	    this.x = new BN$6(x, 16);
	    this.y = new BN$6(y, 16);
	    this.z = new BN$6(z, 16);
	  }
	  if (!this.x.red)
	    this.x = this.x.toRed(this.curve.red);
	  if (!this.y.red)
	    this.y = this.y.toRed(this.curve.red);
	  if (!this.z.red)
	    this.z = this.z.toRed(this.curve.red);

	  this.zOne = this.z === this.curve.one;
	}
	inherits$3(JPoint, Base$2.BasePoint);

	ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
	  return new JPoint(this, x, y, z);
	};

	JPoint.prototype.toP = function toP() {
	  if (this.isInfinity())
	    return this.curve.point(null, null);

	  var zinv = this.z.redInvm();
	  var zinv2 = zinv.redSqr();
	  var ax = this.x.redMul(zinv2);
	  var ay = this.y.redMul(zinv2).redMul(zinv);

	  return this.curve.point(ax, ay);
	};

	JPoint.prototype.neg = function neg() {
	  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
	};

	JPoint.prototype.add = function add(p) {
	  // O + P = P
	  if (this.isInfinity())
	    return p;

	  // P + O = P
	  if (p.isInfinity())
	    return this;

	  // 12M + 4S + 7A
	  var pz2 = p.z.redSqr();
	  var z2 = this.z.redSqr();
	  var u1 = this.x.redMul(pz2);
	  var u2 = p.x.redMul(z2);
	  var s1 = this.y.redMul(pz2.redMul(p.z));
	  var s2 = p.y.redMul(z2.redMul(this.z));

	  var h = u1.redSub(u2);
	  var r = s1.redSub(s2);
	  if (h.cmpn(0) === 0) {
	    if (r.cmpn(0) !== 0)
	      return this.curve.jpoint(null, null, null);
	    else
	      return this.dbl();
	  }

	  var h2 = h.redSqr();
	  var h3 = h2.redMul(h);
	  var v = u1.redMul(h2);

	  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
	  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
	  var nz = this.z.redMul(p.z).redMul(h);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.mixedAdd = function mixedAdd(p) {
	  // O + P = P
	  if (this.isInfinity())
	    return p.toJ();

	  // P + O = P
	  if (p.isInfinity())
	    return this;

	  // 8M + 3S + 7A
	  var z2 = this.z.redSqr();
	  var u1 = this.x;
	  var u2 = p.x.redMul(z2);
	  var s1 = this.y;
	  var s2 = p.y.redMul(z2).redMul(this.z);

	  var h = u1.redSub(u2);
	  var r = s1.redSub(s2);
	  if (h.cmpn(0) === 0) {
	    if (r.cmpn(0) !== 0)
	      return this.curve.jpoint(null, null, null);
	    else
	      return this.dbl();
	  }

	  var h2 = h.redSqr();
	  var h3 = h2.redMul(h);
	  var v = u1.redMul(h2);

	  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
	  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
	  var nz = this.z.redMul(h);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.dblp = function dblp(pow) {
	  if (pow === 0)
	    return this;
	  if (this.isInfinity())
	    return this;
	  if (!pow)
	    return this.dbl();

	  var i;
	  if (this.curve.zeroA || this.curve.threeA) {
	    var r = this;
	    for (i = 0; i < pow; i++)
	      r = r.dbl();
	    return r;
	  }

	  // 1M + 2S + 1A + N * (4S + 5M + 8A)
	  // N = 1 => 6M + 6S + 9A
	  var a = this.curve.a;
	  var tinv = this.curve.tinv;

	  var jx = this.x;
	  var jy = this.y;
	  var jz = this.z;
	  var jz4 = jz.redSqr().redSqr();

	  // Reuse results
	  var jyd = jy.redAdd(jy);
	  for (i = 0; i < pow; i++) {
	    var jx2 = jx.redSqr();
	    var jyd2 = jyd.redSqr();
	    var jyd4 = jyd2.redSqr();
	    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

	    var t1 = jx.redMul(jyd2);
	    var nx = c.redSqr().redISub(t1.redAdd(t1));
	    var t2 = t1.redISub(nx);
	    var dny = c.redMul(t2);
	    dny = dny.redIAdd(dny).redISub(jyd4);
	    var nz = jyd.redMul(jz);
	    if (i + 1 < pow)
	      jz4 = jz4.redMul(jyd4);

	    jx = nx;
	    jz = nz;
	    jyd = dny;
	  }

	  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
	};

	JPoint.prototype.dbl = function dbl() {
	  if (this.isInfinity())
	    return this;

	  if (this.curve.zeroA)
	    return this._zeroDbl();
	  else if (this.curve.threeA)
	    return this._threeDbl();
	  else
	    return this._dbl();
	};

	JPoint.prototype._zeroDbl = function _zeroDbl() {
	  var nx;
	  var ny;
	  var nz;
	  // Z = 1
	  if (this.zOne) {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
	    //     #doubling-mdbl-2007-bl
	    // 1M + 5S + 14A

	    // XX = X1^2
	    var xx = this.x.redSqr();
	    // YY = Y1^2
	    var yy = this.y.redSqr();
	    // YYYY = YY^2
	    var yyyy = yy.redSqr();
	    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
	    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	    s = s.redIAdd(s);
	    // M = 3 * XX + a; a = 0
	    var m = xx.redAdd(xx).redIAdd(xx);
	    // T = M ^ 2 - 2*S
	    var t = m.redSqr().redISub(s).redISub(s);

	    // 8 * YYYY
	    var yyyy8 = yyyy.redIAdd(yyyy);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    yyyy8 = yyyy8.redIAdd(yyyy8);

	    // X3 = T
	    nx = t;
	    // Y3 = M * (S - T) - 8 * YYYY
	    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
	    // Z3 = 2*Y1
	    nz = this.y.redAdd(this.y);
	  } else {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
	    //     #doubling-dbl-2009-l
	    // 2M + 5S + 13A

	    // A = X1^2
	    var a = this.x.redSqr();
	    // B = Y1^2
	    var b = this.y.redSqr();
	    // C = B^2
	    var c = b.redSqr();
	    // D = 2 * ((X1 + B)^2 - A - C)
	    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
	    d = d.redIAdd(d);
	    // E = 3 * A
	    var e = a.redAdd(a).redIAdd(a);
	    // F = E^2
	    var f = e.redSqr();

	    // 8 * C
	    var c8 = c.redIAdd(c);
	    c8 = c8.redIAdd(c8);
	    c8 = c8.redIAdd(c8);

	    // X3 = F - 2 * D
	    nx = f.redISub(d).redISub(d);
	    // Y3 = E * (D - X3) - 8 * C
	    ny = e.redMul(d.redISub(nx)).redISub(c8);
	    // Z3 = 2 * Y1 * Z1
	    nz = this.y.redMul(this.z);
	    nz = nz.redIAdd(nz);
	  }

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype._threeDbl = function _threeDbl() {
	  var nx;
	  var ny;
	  var nz;
	  // Z = 1
	  if (this.zOne) {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
	    //     #doubling-mdbl-2007-bl
	    // 1M + 5S + 15A

	    // XX = X1^2
	    var xx = this.x.redSqr();
	    // YY = Y1^2
	    var yy = this.y.redSqr();
	    // YYYY = YY^2
	    var yyyy = yy.redSqr();
	    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
	    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	    s = s.redIAdd(s);
	    // M = 3 * XX + a
	    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
	    // T = M^2 - 2 * S
	    var t = m.redSqr().redISub(s).redISub(s);
	    // X3 = T
	    nx = t;
	    // Y3 = M * (S - T) - 8 * YYYY
	    var yyyy8 = yyyy.redIAdd(yyyy);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
	    // Z3 = 2 * Y1
	    nz = this.y.redAdd(this.y);
	  } else {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
	    // 3M + 5S

	    // delta = Z1^2
	    var delta = this.z.redSqr();
	    // gamma = Y1^2
	    var gamma = this.y.redSqr();
	    // beta = X1 * gamma
	    var beta = this.x.redMul(gamma);
	    // alpha = 3 * (X1 - delta) * (X1 + delta)
	    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
	    alpha = alpha.redAdd(alpha).redIAdd(alpha);
	    // X3 = alpha^2 - 8 * beta
	    var beta4 = beta.redIAdd(beta);
	    beta4 = beta4.redIAdd(beta4);
	    var beta8 = beta4.redAdd(beta4);
	    nx = alpha.redSqr().redISub(beta8);
	    // Z3 = (Y1 + Z1)^2 - gamma - delta
	    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
	    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
	    var ggamma8 = gamma.redSqr();
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
	  }

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype._dbl = function _dbl() {
	  var a = this.curve.a;

	  // 4M + 6S + 10A
	  var jx = this.x;
	  var jy = this.y;
	  var jz = this.z;
	  var jz4 = jz.redSqr().redSqr();

	  var jx2 = jx.redSqr();
	  var jy2 = jy.redSqr();

	  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

	  var jxd4 = jx.redAdd(jx);
	  jxd4 = jxd4.redIAdd(jxd4);
	  var t1 = jxd4.redMul(jy2);
	  var nx = c.redSqr().redISub(t1.redAdd(t1));
	  var t2 = t1.redISub(nx);

	  var jyd8 = jy2.redSqr();
	  jyd8 = jyd8.redIAdd(jyd8);
	  jyd8 = jyd8.redIAdd(jyd8);
	  jyd8 = jyd8.redIAdd(jyd8);
	  var ny = c.redMul(t2).redISub(jyd8);
	  var nz = jy.redAdd(jy).redMul(jz);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.trpl = function trpl() {
	  if (!this.curve.zeroA)
	    return this.dbl().add(this);

	  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
	  // 5M + 10S + ...

	  // XX = X1^2
	  var xx = this.x.redSqr();
	  // YY = Y1^2
	  var yy = this.y.redSqr();
	  // ZZ = Z1^2
	  var zz = this.z.redSqr();
	  // YYYY = YY^2
	  var yyyy = yy.redSqr();
	  // M = 3 * XX + a * ZZ2; a = 0
	  var m = xx.redAdd(xx).redIAdd(xx);
	  // MM = M^2
	  var mm = m.redSqr();
	  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
	  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	  e = e.redIAdd(e);
	  e = e.redAdd(e).redIAdd(e);
	  e = e.redISub(mm);
	  // EE = E^2
	  var ee = e.redSqr();
	  // T = 16*YYYY
	  var t = yyyy.redIAdd(yyyy);
	  t = t.redIAdd(t);
	  t = t.redIAdd(t);
	  t = t.redIAdd(t);
	  // U = (M + E)^2 - MM - EE - T
	  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
	  // X3 = 4 * (X1 * EE - 4 * YY * U)
	  var yyu4 = yy.redMul(u);
	  yyu4 = yyu4.redIAdd(yyu4);
	  yyu4 = yyu4.redIAdd(yyu4);
	  var nx = this.x.redMul(ee).redISub(yyu4);
	  nx = nx.redIAdd(nx);
	  nx = nx.redIAdd(nx);
	  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
	  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
	  ny = ny.redIAdd(ny);
	  ny = ny.redIAdd(ny);
	  ny = ny.redIAdd(ny);
	  // Z3 = (Z1 + E)^2 - ZZ - EE
	  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.mul = function mul(k, kbase) {
	  k = new BN$6(k, kbase);

	  return this.curve._wnafMul(this, k);
	};

	JPoint.prototype.eq = function eq(p) {
	  if (p.type === 'affine')
	    return this.eq(p.toJ());

	  if (this === p)
	    return true;

	  // x1 * z2^2 == x2 * z1^2
	  var z2 = this.z.redSqr();
	  var pz2 = p.z.redSqr();
	  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
	    return false;

	  // y1 * z2^3 == y2 * z1^3
	  var z3 = z2.redMul(this.z);
	  var pz3 = pz2.redMul(p.z);
	  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
	};

	JPoint.prototype.eqXToP = function eqXToP(x) {
	  var zs = this.z.redSqr();
	  var rx = x.toRed(this.curve.red).redMul(zs);
	  if (this.x.cmp(rx) === 0)
	    return true;

	  var xc = x.clone();
	  var t = this.curve.redN.redMul(zs);
	  for (;;) {
	    xc.iadd(this.curve.n);
	    if (xc.cmp(this.curve.p) >= 0)
	      return false;

	    rx.redIAdd(t);
	    if (this.x.cmp(rx) === 0)
	      return true;
	  }
	};

	JPoint.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC JPoint Infinity>';
	  return '<EC JPoint x: ' + this.x.toString(16, 2) +
	      ' y: ' + this.y.toString(16, 2) +
	      ' z: ' + this.z.toString(16, 2) + '>';
	};

	JPoint.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.z.cmpn(0) === 0;
	};

	var BN$5 = bn.exports;
	var inherits$2 = inherits$4.exports;
	var Base$1 = base;

	var utils$l = utils$p;

	function MontCurve(conf) {
	  Base$1.call(this, 'mont', conf);

	  this.a = new BN$5(conf.a, 16).toRed(this.red);
	  this.b = new BN$5(conf.b, 16).toRed(this.red);
	  this.i4 = new BN$5(4).toRed(this.red).redInvm();
	  this.two = new BN$5(2).toRed(this.red);
	  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
	}
	inherits$2(MontCurve, Base$1);
	var mont = MontCurve;

	MontCurve.prototype.validate = function validate(point) {
	  var x = point.normalize().x;
	  var x2 = x.redSqr();
	  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
	  var y = rhs.redSqrt();

	  return y.redSqr().cmp(rhs) === 0;
	};

	function Point$1(curve, x, z) {
	  Base$1.BasePoint.call(this, curve, 'projective');
	  if (x === null && z === null) {
	    this.x = this.curve.one;
	    this.z = this.curve.zero;
	  } else {
	    this.x = new BN$5(x, 16);
	    this.z = new BN$5(z, 16);
	    if (!this.x.red)
	      this.x = this.x.toRed(this.curve.red);
	    if (!this.z.red)
	      this.z = this.z.toRed(this.curve.red);
	  }
	}
	inherits$2(Point$1, Base$1.BasePoint);

	MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
	  return this.point(utils$l.toArray(bytes, enc), 1);
	};

	MontCurve.prototype.point = function point(x, z) {
	  return new Point$1(this, x, z);
	};

	MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
	  return Point$1.fromJSON(this, obj);
	};

	Point$1.prototype.precompute = function precompute() {
	  // No-op
	};

	Point$1.prototype._encode = function _encode() {
	  return this.getX().toArray('be', this.curve.p.byteLength());
	};

	Point$1.fromJSON = function fromJSON(curve, obj) {
	  return new Point$1(curve, obj[0], obj[1] || curve.one);
	};

	Point$1.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC Point Infinity>';
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
	};

	Point$1.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.z.cmpn(0) === 0;
	};

	Point$1.prototype.dbl = function dbl() {
	  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
	  // 2M + 2S + 4A

	  // A = X1 + Z1
	  var a = this.x.redAdd(this.z);
	  // AA = A^2
	  var aa = a.redSqr();
	  // B = X1 - Z1
	  var b = this.x.redSub(this.z);
	  // BB = B^2
	  var bb = b.redSqr();
	  // C = AA - BB
	  var c = aa.redSub(bb);
	  // X3 = AA * BB
	  var nx = aa.redMul(bb);
	  // Z3 = C * (BB + A24 * C)
	  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
	  return this.curve.point(nx, nz);
	};

	Point$1.prototype.add = function add() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point$1.prototype.diffAdd = function diffAdd(p, diff) {
	  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
	  // 4M + 2S + 6A

	  // A = X2 + Z2
	  var a = this.x.redAdd(this.z);
	  // B = X2 - Z2
	  var b = this.x.redSub(this.z);
	  // C = X3 + Z3
	  var c = p.x.redAdd(p.z);
	  // D = X3 - Z3
	  var d = p.x.redSub(p.z);
	  // DA = D * A
	  var da = d.redMul(a);
	  // CB = C * B
	  var cb = c.redMul(b);
	  // X5 = Z1 * (DA + CB)^2
	  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
	  // Z5 = X1 * (DA - CB)^2
	  var nz = diff.x.redMul(da.redISub(cb).redSqr());
	  return this.curve.point(nx, nz);
	};

	Point$1.prototype.mul = function mul(k) {
	  var t = k.clone();
	  var a = this; // (N / 2) * Q + Q
	  var b = this.curve.point(null, null); // (N / 2) * Q
	  var c = this; // Q

	  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
	    bits.push(t.andln(1));

	  for (var i = bits.length - 1; i >= 0; i--) {
	    if (bits[i] === 0) {
	      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
	      a = a.diffAdd(b, c);
	      // N * Q = 2 * ((N / 2) * Q + Q))
	      b = b.dbl();
	    } else {
	      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
	      b = a.diffAdd(b, c);
	      // N * Q + Q = 2 * ((N / 2) * Q + Q)
	      a = a.dbl();
	    }
	  }
	  return b;
	};

	Point$1.prototype.mulAdd = function mulAdd() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point$1.prototype.jumlAdd = function jumlAdd() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point$1.prototype.eq = function eq(other) {
	  return this.getX().cmp(other.getX()) === 0;
	};

	Point$1.prototype.normalize = function normalize() {
	  this.x = this.x.redMul(this.z.redInvm());
	  this.z = this.curve.one;
	  return this;
	};

	Point$1.prototype.getX = function getX() {
	  // Normalize coordinates
	  this.normalize();

	  return this.x.fromRed();
	};

	var utils$k = utils$p;
	var BN$4 = bn.exports;
	var inherits$1 = inherits$4.exports;
	var Base = base;

	var assert$e = utils$k.assert;

	function EdwardsCurve(conf) {
	  // NOTE: Important as we are creating point in Base.call()
	  this.twisted = (conf.a | 0) !== 1;
	  this.mOneA = this.twisted && (conf.a | 0) === -1;
	  this.extended = this.mOneA;

	  Base.call(this, 'edwards', conf);

	  this.a = new BN$4(conf.a, 16).umod(this.red.m);
	  this.a = this.a.toRed(this.red);
	  this.c = new BN$4(conf.c, 16).toRed(this.red);
	  this.c2 = this.c.redSqr();
	  this.d = new BN$4(conf.d, 16).toRed(this.red);
	  this.dd = this.d.redAdd(this.d);

	  assert$e(!this.twisted || this.c.fromRed().cmpn(1) === 0);
	  this.oneC = (conf.c | 0) === 1;
	}
	inherits$1(EdwardsCurve, Base);
	var edwards = EdwardsCurve;

	EdwardsCurve.prototype._mulA = function _mulA(num) {
	  if (this.mOneA)
	    return num.redNeg();
	  else
	    return this.a.redMul(num);
	};

	EdwardsCurve.prototype._mulC = function _mulC(num) {
	  if (this.oneC)
	    return num;
	  else
	    return this.c.redMul(num);
	};

	// Just for compatibility with Short curve
	EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
	  return this.point(x, y, z, t);
	};

	EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
	  x = new BN$4(x, 16);
	  if (!x.red)
	    x = x.toRed(this.red);

	  var x2 = x.redSqr();
	  var rhs = this.c2.redSub(this.a.redMul(x2));
	  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

	  var y2 = rhs.redMul(lhs.redInvm());
	  var y = y2.redSqrt();
	  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
	    throw new Error('invalid point');

	  var isOdd = y.fromRed().isOdd();
	  if (odd && !isOdd || !odd && isOdd)
	    y = y.redNeg();

	  return this.point(x, y);
	};

	EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
	  y = new BN$4(y, 16);
	  if (!y.red)
	    y = y.toRed(this.red);

	  // x^2 = (y^2 - c^2) / (c^2 d y^2 - a)
	  var y2 = y.redSqr();
	  var lhs = y2.redSub(this.c2);
	  var rhs = y2.redMul(this.d).redMul(this.c2).redSub(this.a);
	  var x2 = lhs.redMul(rhs.redInvm());

	  if (x2.cmp(this.zero) === 0) {
	    if (odd)
	      throw new Error('invalid point');
	    else
	      return this.point(this.zero, y);
	  }

	  var x = x2.redSqrt();
	  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
	    throw new Error('invalid point');

	  if (x.fromRed().isOdd() !== odd)
	    x = x.redNeg();

	  return this.point(x, y);
	};

	EdwardsCurve.prototype.validate = function validate(point) {
	  if (point.isInfinity())
	    return true;

	  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
	  point.normalize();

	  var x2 = point.x.redSqr();
	  var y2 = point.y.redSqr();
	  var lhs = x2.redMul(this.a).redAdd(y2);
	  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

	  return lhs.cmp(rhs) === 0;
	};

	function Point(curve, x, y, z, t) {
	  Base.BasePoint.call(this, curve, 'projective');
	  if (x === null && y === null && z === null) {
	    this.x = this.curve.zero;
	    this.y = this.curve.one;
	    this.z = this.curve.one;
	    this.t = this.curve.zero;
	    this.zOne = true;
	  } else {
	    this.x = new BN$4(x, 16);
	    this.y = new BN$4(y, 16);
	    this.z = z ? new BN$4(z, 16) : this.curve.one;
	    this.t = t && new BN$4(t, 16);
	    if (!this.x.red)
	      this.x = this.x.toRed(this.curve.red);
	    if (!this.y.red)
	      this.y = this.y.toRed(this.curve.red);
	    if (!this.z.red)
	      this.z = this.z.toRed(this.curve.red);
	    if (this.t && !this.t.red)
	      this.t = this.t.toRed(this.curve.red);
	    this.zOne = this.z === this.curve.one;

	    // Use extended coordinates
	    if (this.curve.extended && !this.t) {
	      this.t = this.x.redMul(this.y);
	      if (!this.zOne)
	        this.t = this.t.redMul(this.z.redInvm());
	    }
	  }
	}
	inherits$1(Point, Base.BasePoint);

	EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
	  return Point.fromJSON(this, obj);
	};

	EdwardsCurve.prototype.point = function point(x, y, z, t) {
	  return new Point(this, x, y, z, t);
	};

	Point.fromJSON = function fromJSON(curve, obj) {
	  return new Point(curve, obj[0], obj[1], obj[2]);
	};

	Point.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC Point Infinity>';
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' y: ' + this.y.fromRed().toString(16, 2) +
	      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
	};

	Point.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.x.cmpn(0) === 0 &&
	    (this.y.cmp(this.z) === 0 ||
	    (this.zOne && this.y.cmp(this.curve.c) === 0));
	};

	Point.prototype._extDbl = function _extDbl() {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
	  //     #doubling-dbl-2008-hwcd
	  // 4M + 4S

	  // A = X1^2
	  var a = this.x.redSqr();
	  // B = Y1^2
	  var b = this.y.redSqr();
	  // C = 2 * Z1^2
	  var c = this.z.redSqr();
	  c = c.redIAdd(c);
	  // D = a * A
	  var d = this.curve._mulA(a);
	  // E = (X1 + Y1)^2 - A - B
	  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
	  // G = D + B
	  var g = d.redAdd(b);
	  // F = G - C
	  var f = g.redSub(c);
	  // H = D - B
	  var h = d.redSub(b);
	  // X3 = E * F
	  var nx = e.redMul(f);
	  // Y3 = G * H
	  var ny = g.redMul(h);
	  // T3 = E * H
	  var nt = e.redMul(h);
	  // Z3 = F * G
	  var nz = f.redMul(g);
	  return this.curve.point(nx, ny, nz, nt);
	};

	Point.prototype._projDbl = function _projDbl() {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
	  //     #doubling-dbl-2008-bbjlp
	  //     #doubling-dbl-2007-bl
	  // and others
	  // Generally 3M + 4S or 2M + 4S

	  // B = (X1 + Y1)^2
	  var b = this.x.redAdd(this.y).redSqr();
	  // C = X1^2
	  var c = this.x.redSqr();
	  // D = Y1^2
	  var d = this.y.redSqr();

	  var nx;
	  var ny;
	  var nz;
	  var e;
	  var h;
	  var j;
	  if (this.curve.twisted) {
	    // E = a * C
	    e = this.curve._mulA(c);
	    // F = E + D
	    var f = e.redAdd(d);
	    if (this.zOne) {
	      // X3 = (B - C - D) * (F - 2)
	      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
	      // Y3 = F * (E - D)
	      ny = f.redMul(e.redSub(d));
	      // Z3 = F^2 - 2 * F
	      nz = f.redSqr().redSub(f).redSub(f);
	    } else {
	      // H = Z1^2
	      h = this.z.redSqr();
	      // J = F - 2 * H
	      j = f.redSub(h).redISub(h);
	      // X3 = (B-C-D)*J
	      nx = b.redSub(c).redISub(d).redMul(j);
	      // Y3 = F * (E - D)
	      ny = f.redMul(e.redSub(d));
	      // Z3 = F * J
	      nz = f.redMul(j);
	    }
	  } else {
	    // E = C + D
	    e = c.redAdd(d);
	    // H = (c * Z1)^2
	    h = this.curve._mulC(this.z).redSqr();
	    // J = E - 2 * H
	    j = e.redSub(h).redSub(h);
	    // X3 = c * (B - E) * J
	    nx = this.curve._mulC(b.redISub(e)).redMul(j);
	    // Y3 = c * E * (C - D)
	    ny = this.curve._mulC(e).redMul(c.redISub(d));
	    // Z3 = E * J
	    nz = e.redMul(j);
	  }
	  return this.curve.point(nx, ny, nz);
	};

	Point.prototype.dbl = function dbl() {
	  if (this.isInfinity())
	    return this;

	  // Double in extended coordinates
	  if (this.curve.extended)
	    return this._extDbl();
	  else
	    return this._projDbl();
	};

	Point.prototype._extAdd = function _extAdd(p) {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
	  //     #addition-add-2008-hwcd-3
	  // 8M

	  // A = (Y1 - X1) * (Y2 - X2)
	  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
	  // B = (Y1 + X1) * (Y2 + X2)
	  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
	  // C = T1 * k * T2
	  var c = this.t.redMul(this.curve.dd).redMul(p.t);
	  // D = Z1 * 2 * Z2
	  var d = this.z.redMul(p.z.redAdd(p.z));
	  // E = B - A
	  var e = b.redSub(a);
	  // F = D - C
	  var f = d.redSub(c);
	  // G = D + C
	  var g = d.redAdd(c);
	  // H = B + A
	  var h = b.redAdd(a);
	  // X3 = E * F
	  var nx = e.redMul(f);
	  // Y3 = G * H
	  var ny = g.redMul(h);
	  // T3 = E * H
	  var nt = e.redMul(h);
	  // Z3 = F * G
	  var nz = f.redMul(g);
	  return this.curve.point(nx, ny, nz, nt);
	};

	Point.prototype._projAdd = function _projAdd(p) {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
	  //     #addition-add-2008-bbjlp
	  //     #addition-add-2007-bl
	  // 10M + 1S

	  // A = Z1 * Z2
	  var a = this.z.redMul(p.z);
	  // B = A^2
	  var b = a.redSqr();
	  // C = X1 * X2
	  var c = this.x.redMul(p.x);
	  // D = Y1 * Y2
	  var d = this.y.redMul(p.y);
	  // E = d * C * D
	  var e = this.curve.d.redMul(c).redMul(d);
	  // F = B - E
	  var f = b.redSub(e);
	  // G = B + E
	  var g = b.redAdd(e);
	  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
	  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
	  var nx = a.redMul(f).redMul(tmp);
	  var ny;
	  var nz;
	  if (this.curve.twisted) {
	    // Y3 = A * G * (D - a * C)
	    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
	    // Z3 = F * G
	    nz = f.redMul(g);
	  } else {
	    // Y3 = A * G * (D - C)
	    ny = a.redMul(g).redMul(d.redSub(c));
	    // Z3 = c * F * G
	    nz = this.curve._mulC(f).redMul(g);
	  }
	  return this.curve.point(nx, ny, nz);
	};

	Point.prototype.add = function add(p) {
	  if (this.isInfinity())
	    return p;
	  if (p.isInfinity())
	    return this;

	  if (this.curve.extended)
	    return this._extAdd(p);
	  else
	    return this._projAdd(p);
	};

	Point.prototype.mul = function mul(k) {
	  if (this._hasDoubles(k))
	    return this.curve._fixedNafMul(this, k);
	  else
	    return this.curve._wnafMul(this, k);
	};

	Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
	  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
	};

	Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
	  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
	};

	Point.prototype.normalize = function normalize() {
	  if (this.zOne)
	    return this;

	  // Normalize coordinates
	  var zi = this.z.redInvm();
	  this.x = this.x.redMul(zi);
	  this.y = this.y.redMul(zi);
	  if (this.t)
	    this.t = this.t.redMul(zi);
	  this.z = this.curve.one;
	  this.zOne = true;
	  return this;
	};

	Point.prototype.neg = function neg() {
	  return this.curve.point(this.x.redNeg(),
	    this.y,
	    this.z,
	    this.t && this.t.redNeg());
	};

	Point.prototype.getX = function getX() {
	  this.normalize();
	  return this.x.fromRed();
	};

	Point.prototype.getY = function getY() {
	  this.normalize();
	  return this.y.fromRed();
	};

	Point.prototype.eq = function eq(other) {
	  return this === other ||
	         this.getX().cmp(other.getX()) === 0 &&
	         this.getY().cmp(other.getY()) === 0;
	};

	Point.prototype.eqXToP = function eqXToP(x) {
	  var rx = x.toRed(this.curve.red).redMul(this.z);
	  if (this.x.cmp(rx) === 0)
	    return true;

	  var xc = x.clone();
	  var t = this.curve.redN.redMul(this.z);
	  for (;;) {
	    xc.iadd(this.curve.n);
	    if (xc.cmp(this.curve.p) >= 0)
	      return false;

	    rx.redIAdd(t);
	    if (this.x.cmp(rx) === 0)
	      return true;
	  }
	};

	// Compatibility with BaseCurve
	Point.prototype.toP = Point.prototype.normalize;
	Point.prototype.mixedAdd = Point.prototype.add;

	(function (exports) {

	var curve = exports;

	curve.base = base;
	curve.short = short;
	curve.mont = mont;
	curve.edwards = edwards;
	}(curve));

	var curves$2 = {};

	var hash$6 = {};

	var utils$j = {};

	var assert$d = minimalisticAssert;
	var inherits = inherits$4.exports;

	utils$j.inherits = inherits;

	function isSurrogatePair(msg, i) {
	  if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
	    return false;
	  }
	  if (i < 0 || i + 1 >= msg.length) {
	    return false;
	  }
	  return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
	}

	function toArray(msg, enc) {
	  if (Array.isArray(msg))
	    return msg.slice();
	  if (!msg)
	    return [];
	  var res = [];
	  if (typeof msg === 'string') {
	    if (!enc) {
	      // Inspired by stringToUtf8ByteArray() in closure-library by Google
	      // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
	      // Apache License 2.0
	      // https://github.com/google/closure-library/blob/master/LICENSE
	      var p = 0;
	      for (var i = 0; i < msg.length; i++) {
	        var c = msg.charCodeAt(i);
	        if (c < 128) {
	          res[p++] = c;
	        } else if (c < 2048) {
	          res[p++] = (c >> 6) | 192;
	          res[p++] = (c & 63) | 128;
	        } else if (isSurrogatePair(msg, i)) {
	          c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
	          res[p++] = (c >> 18) | 240;
	          res[p++] = ((c >> 12) & 63) | 128;
	          res[p++] = ((c >> 6) & 63) | 128;
	          res[p++] = (c & 63) | 128;
	        } else {
	          res[p++] = (c >> 12) | 224;
	          res[p++] = ((c >> 6) & 63) | 128;
	          res[p++] = (c & 63) | 128;
	        }
	      }
	    } else if (enc === 'hex') {
	      msg = msg.replace(/[^a-z0-9]+/ig, '');
	      if (msg.length % 2 !== 0)
	        msg = '0' + msg;
	      for (i = 0; i < msg.length; i += 2)
	        res.push(parseInt(msg[i] + msg[i + 1], 16));
	    }
	  } else {
	    for (i = 0; i < msg.length; i++)
	      res[i] = msg[i] | 0;
	  }
	  return res;
	}
	utils$j.toArray = toArray;

	function toHex(msg) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++)
	    res += zero2(msg[i].toString(16));
	  return res;
	}
	utils$j.toHex = toHex;

	function htonl(w) {
	  var res = (w >>> 24) |
	            ((w >>> 8) & 0xff00) |
	            ((w << 8) & 0xff0000) |
	            ((w & 0xff) << 24);
	  return res >>> 0;
	}
	utils$j.htonl = htonl;

	function toHex32(msg, endian) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++) {
	    var w = msg[i];
	    if (endian === 'little')
	      w = htonl(w);
	    res += zero8(w.toString(16));
	  }
	  return res;
	}
	utils$j.toHex32 = toHex32;

	function zero2(word) {
	  if (word.length === 1)
	    return '0' + word;
	  else
	    return word;
	}
	utils$j.zero2 = zero2;

	function zero8(word) {
	  if (word.length === 7)
	    return '0' + word;
	  else if (word.length === 6)
	    return '00' + word;
	  else if (word.length === 5)
	    return '000' + word;
	  else if (word.length === 4)
	    return '0000' + word;
	  else if (word.length === 3)
	    return '00000' + word;
	  else if (word.length === 2)
	    return '000000' + word;
	  else if (word.length === 1)
	    return '0000000' + word;
	  else
	    return word;
	}
	utils$j.zero8 = zero8;

	function join32(msg, start, end, endian) {
	  var len = end - start;
	  assert$d(len % 4 === 0);
	  var res = new Array(len / 4);
	  for (var i = 0, k = start; i < res.length; i++, k += 4) {
	    var w;
	    if (endian === 'big')
	      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
	    else
	      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
	    res[i] = w >>> 0;
	  }
	  return res;
	}
	utils$j.join32 = join32;

	function split32(msg, endian) {
	  var res = new Array(msg.length * 4);
	  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
	    var m = msg[i];
	    if (endian === 'big') {
	      res[k] = m >>> 24;
	      res[k + 1] = (m >>> 16) & 0xff;
	      res[k + 2] = (m >>> 8) & 0xff;
	      res[k + 3] = m & 0xff;
	    } else {
	      res[k + 3] = m >>> 24;
	      res[k + 2] = (m >>> 16) & 0xff;
	      res[k + 1] = (m >>> 8) & 0xff;
	      res[k] = m & 0xff;
	    }
	  }
	  return res;
	}
	utils$j.split32 = split32;

	function rotr32$1(w, b) {
	  return (w >>> b) | (w << (32 - b));
	}
	utils$j.rotr32 = rotr32$1;

	function rotl32$2(w, b) {
	  return (w << b) | (w >>> (32 - b));
	}
	utils$j.rotl32 = rotl32$2;

	function sum32$3(a, b) {
	  return (a + b) >>> 0;
	}
	utils$j.sum32 = sum32$3;

	function sum32_3$1(a, b, c) {
	  return (a + b + c) >>> 0;
	}
	utils$j.sum32_3 = sum32_3$1;

	function sum32_4$2(a, b, c, d) {
	  return (a + b + c + d) >>> 0;
	}
	utils$j.sum32_4 = sum32_4$2;

	function sum32_5$2(a, b, c, d, e) {
	  return (a + b + c + d + e) >>> 0;
	}
	utils$j.sum32_5 = sum32_5$2;

	function sum64$1(buf, pos, ah, al) {
	  var bh = buf[pos];
	  var bl = buf[pos + 1];

	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  buf[pos] = hi >>> 0;
	  buf[pos + 1] = lo;
	}
	utils$j.sum64 = sum64$1;

	function sum64_hi$1(ah, al, bh, bl) {
	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  return hi >>> 0;
	}
	utils$j.sum64_hi = sum64_hi$1;

	function sum64_lo$1(ah, al, bh, bl) {
	  var lo = al + bl;
	  return lo >>> 0;
	}
	utils$j.sum64_lo = sum64_lo$1;

	function sum64_4_hi$1(ah, al, bh, bl, ch, cl, dh, dl) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;

	  var hi = ah + bh + ch + dh + carry;
	  return hi >>> 0;
	}
	utils$j.sum64_4_hi = sum64_4_hi$1;

	function sum64_4_lo$1(ah, al, bh, bl, ch, cl, dh, dl) {
	  var lo = al + bl + cl + dl;
	  return lo >>> 0;
	}
	utils$j.sum64_4_lo = sum64_4_lo$1;

	function sum64_5_hi$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;
	  lo = (lo + el) >>> 0;
	  carry += lo < el ? 1 : 0;

	  var hi = ah + bh + ch + dh + eh + carry;
	  return hi >>> 0;
	}
	utils$j.sum64_5_hi = sum64_5_hi$1;

	function sum64_5_lo$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var lo = al + bl + cl + dl + el;

	  return lo >>> 0;
	}
	utils$j.sum64_5_lo = sum64_5_lo$1;

	function rotr64_hi$1(ah, al, num) {
	  var r = (al << (32 - num)) | (ah >>> num);
	  return r >>> 0;
	}
	utils$j.rotr64_hi = rotr64_hi$1;

	function rotr64_lo$1(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	}
	utils$j.rotr64_lo = rotr64_lo$1;

	function shr64_hi$1(ah, al, num) {
	  return ah >>> num;
	}
	utils$j.shr64_hi = shr64_hi$1;

	function shr64_lo$1(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	}
	utils$j.shr64_lo = shr64_lo$1;

	var common$5 = {};

	var utils$i = utils$j;
	var assert$c = minimalisticAssert;

	function BlockHash$4() {
	  this.pending = null;
	  this.pendingTotal = 0;
	  this.blockSize = this.constructor.blockSize;
	  this.outSize = this.constructor.outSize;
	  this.hmacStrength = this.constructor.hmacStrength;
	  this.padLength = this.constructor.padLength / 8;
	  this.endian = 'big';

	  this._delta8 = this.blockSize / 8;
	  this._delta32 = this.blockSize / 32;
	}
	common$5.BlockHash = BlockHash$4;

	BlockHash$4.prototype.update = function update(msg, enc) {
	  // Convert message to array, pad it, and join into 32bit blocks
	  msg = utils$i.toArray(msg, enc);
	  if (!this.pending)
	    this.pending = msg;
	  else
	    this.pending = this.pending.concat(msg);
	  this.pendingTotal += msg.length;

	  // Enough data, try updating
	  if (this.pending.length >= this._delta8) {
	    msg = this.pending;

	    // Process pending data in blocks
	    var r = msg.length % this._delta8;
	    this.pending = msg.slice(msg.length - r, msg.length);
	    if (this.pending.length === 0)
	      this.pending = null;

	    msg = utils$i.join32(msg, 0, msg.length - r, this.endian);
	    for (var i = 0; i < msg.length; i += this._delta32)
	      this._update(msg, i, i + this._delta32);
	  }

	  return this;
	};

	BlockHash$4.prototype.digest = function digest(enc) {
	  this.update(this._pad());
	  assert$c(this.pending === null);

	  return this._digest(enc);
	};

	BlockHash$4.prototype._pad = function pad() {
	  var len = this.pendingTotal;
	  var bytes = this._delta8;
	  var k = bytes - ((len + this.padLength) % bytes);
	  var res = new Array(k + this.padLength);
	  res[0] = 0x80;
	  for (var i = 1; i < k; i++)
	    res[i] = 0;

	  // Append length
	  len <<= 3;
	  if (this.endian === 'big') {
	    for (var t = 8; t < this.padLength; t++)
	      res[i++] = 0;

	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = len & 0xff;
	  } else {
	    res[i++] = len & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;

	    for (t = 8; t < this.padLength; t++)
	      res[i++] = 0;
	  }

	  return res;
	};

	var sha = {};

	var common$4 = {};

	var utils$h = utils$j;
	var rotr32 = utils$h.rotr32;

	function ft_1$1(s, x, y, z) {
	  if (s === 0)
	    return ch32$1(x, y, z);
	  if (s === 1 || s === 3)
	    return p32(x, y, z);
	  if (s === 2)
	    return maj32$1(x, y, z);
	}
	common$4.ft_1 = ft_1$1;

	function ch32$1(x, y, z) {
	  return (x & y) ^ ((~x) & z);
	}
	common$4.ch32 = ch32$1;

	function maj32$1(x, y, z) {
	  return (x & y) ^ (x & z) ^ (y & z);
	}
	common$4.maj32 = maj32$1;

	function p32(x, y, z) {
	  return x ^ y ^ z;
	}
	common$4.p32 = p32;

	function s0_256$1(x) {
	  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
	}
	common$4.s0_256 = s0_256$1;

	function s1_256$1(x) {
	  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
	}
	common$4.s1_256 = s1_256$1;

	function g0_256$1(x) {
	  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
	}
	common$4.g0_256 = g0_256$1;

	function g1_256$1(x) {
	  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
	}
	common$4.g1_256 = g1_256$1;

	var utils$g = utils$j;
	var common$3 = common$5;
	var shaCommon$1 = common$4;

	var rotl32$1 = utils$g.rotl32;
	var sum32$2 = utils$g.sum32;
	var sum32_5$1 = utils$g.sum32_5;
	var ft_1 = shaCommon$1.ft_1;
	var BlockHash$3 = common$3.BlockHash;

	var sha1_K = [
	  0x5A827999, 0x6ED9EBA1,
	  0x8F1BBCDC, 0xCA62C1D6
	];

	function SHA1() {
	  if (!(this instanceof SHA1))
	    return new SHA1();

	  BlockHash$3.call(this);
	  this.h = [
	    0x67452301, 0xefcdab89, 0x98badcfe,
	    0x10325476, 0xc3d2e1f0 ];
	  this.W = new Array(80);
	}

	utils$g.inherits(SHA1, BlockHash$3);
	var _1 = SHA1;

	SHA1.blockSize = 512;
	SHA1.outSize = 160;
	SHA1.hmacStrength = 80;
	SHA1.padLength = 64;

	SHA1.prototype._update = function _update(msg, start) {
	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    W[i] = msg[start + i];

	  for(; i < W.length; i++)
	    W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];

	  for (i = 0; i < W.length; i++) {
	    var s = ~~(i / 20);
	    var t = sum32_5$1(rotl32$1(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
	    e = d;
	    d = c;
	    c = rotl32$1(b, 30);
	    b = a;
	    a = t;
	  }

	  this.h[0] = sum32$2(this.h[0], a);
	  this.h[1] = sum32$2(this.h[1], b);
	  this.h[2] = sum32$2(this.h[2], c);
	  this.h[3] = sum32$2(this.h[3], d);
	  this.h[4] = sum32$2(this.h[4], e);
	};

	SHA1.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$g.toHex32(this.h, 'big');
	  else
	    return utils$g.split32(this.h, 'big');
	};

	var utils$f = utils$j;
	var common$2 = common$5;
	var shaCommon = common$4;
	var assert$b = minimalisticAssert;

	var sum32$1 = utils$f.sum32;
	var sum32_4$1 = utils$f.sum32_4;
	var sum32_5 = utils$f.sum32_5;
	var ch32 = shaCommon.ch32;
	var maj32 = shaCommon.maj32;
	var s0_256 = shaCommon.s0_256;
	var s1_256 = shaCommon.s1_256;
	var g0_256 = shaCommon.g0_256;
	var g1_256 = shaCommon.g1_256;

	var BlockHash$2 = common$2.BlockHash;

	var sha256_K = [
	  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
	];

	function SHA256$1() {
	  if (!(this instanceof SHA256$1))
	    return new SHA256$1();

	  BlockHash$2.call(this);
	  this.h = [
	    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
	    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
	  ];
	  this.k = sha256_K;
	  this.W = new Array(64);
	}
	utils$f.inherits(SHA256$1, BlockHash$2);
	var _256 = SHA256$1;

	SHA256$1.blockSize = 512;
	SHA256$1.outSize = 256;
	SHA256$1.hmacStrength = 192;
	SHA256$1.padLength = 64;

	SHA256$1.prototype._update = function _update(msg, start) {
	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    W[i] = msg[start + i];
	  for (; i < W.length; i++)
	    W[i] = sum32_4$1(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];
	  var f = this.h[5];
	  var g = this.h[6];
	  var h = this.h[7];

	  assert$b(this.k.length === W.length);
	  for (i = 0; i < W.length; i++) {
	    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
	    var T2 = sum32$1(s0_256(a), maj32(a, b, c));
	    h = g;
	    g = f;
	    f = e;
	    e = sum32$1(d, T1);
	    d = c;
	    c = b;
	    b = a;
	    a = sum32$1(T1, T2);
	  }

	  this.h[0] = sum32$1(this.h[0], a);
	  this.h[1] = sum32$1(this.h[1], b);
	  this.h[2] = sum32$1(this.h[2], c);
	  this.h[3] = sum32$1(this.h[3], d);
	  this.h[4] = sum32$1(this.h[4], e);
	  this.h[5] = sum32$1(this.h[5], f);
	  this.h[6] = sum32$1(this.h[6], g);
	  this.h[7] = sum32$1(this.h[7], h);
	};

	SHA256$1.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$f.toHex32(this.h, 'big');
	  else
	    return utils$f.split32(this.h, 'big');
	};

	var utils$e = utils$j;
	var SHA256 = _256;

	function SHA224() {
	  if (!(this instanceof SHA224))
	    return new SHA224();

	  SHA256.call(this);
	  this.h = [
	    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
	}
	utils$e.inherits(SHA224, SHA256);
	var _224 = SHA224;

	SHA224.blockSize = 512;
	SHA224.outSize = 224;
	SHA224.hmacStrength = 192;
	SHA224.padLength = 64;

	SHA224.prototype._digest = function digest(enc) {
	  // Just truncate output
	  if (enc === 'hex')
	    return utils$e.toHex32(this.h.slice(0, 7), 'big');
	  else
	    return utils$e.split32(this.h.slice(0, 7), 'big');
	};

	var utils$d = utils$j;
	var common$1 = common$5;
	var assert$a = minimalisticAssert;

	var rotr64_hi = utils$d.rotr64_hi;
	var rotr64_lo = utils$d.rotr64_lo;
	var shr64_hi = utils$d.shr64_hi;
	var shr64_lo = utils$d.shr64_lo;
	var sum64 = utils$d.sum64;
	var sum64_hi = utils$d.sum64_hi;
	var sum64_lo = utils$d.sum64_lo;
	var sum64_4_hi = utils$d.sum64_4_hi;
	var sum64_4_lo = utils$d.sum64_4_lo;
	var sum64_5_hi = utils$d.sum64_5_hi;
	var sum64_5_lo = utils$d.sum64_5_lo;

	var BlockHash$1 = common$1.BlockHash;

	var sha512_K = [
	  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	];

	function SHA512$1() {
	  if (!(this instanceof SHA512$1))
	    return new SHA512$1();

	  BlockHash$1.call(this);
	  this.h = [
	    0x6a09e667, 0xf3bcc908,
	    0xbb67ae85, 0x84caa73b,
	    0x3c6ef372, 0xfe94f82b,
	    0xa54ff53a, 0x5f1d36f1,
	    0x510e527f, 0xade682d1,
	    0x9b05688c, 0x2b3e6c1f,
	    0x1f83d9ab, 0xfb41bd6b,
	    0x5be0cd19, 0x137e2179 ];
	  this.k = sha512_K;
	  this.W = new Array(160);
	}
	utils$d.inherits(SHA512$1, BlockHash$1);
	var _512 = SHA512$1;

	SHA512$1.blockSize = 1024;
	SHA512$1.outSize = 512;
	SHA512$1.hmacStrength = 192;
	SHA512$1.padLength = 128;

	SHA512$1.prototype._prepareBlock = function _prepareBlock(msg, start) {
	  var W = this.W;

	  // 32 x 32bit words
	  for (var i = 0; i < 32; i++)
	    W[i] = msg[start + i];
	  for (; i < W.length; i += 2) {
	    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
	    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
	    var c1_hi = W[i - 14];  // i - 7
	    var c1_lo = W[i - 13];
	    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
	    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
	    var c3_hi = W[i - 32];  // i - 16
	    var c3_lo = W[i - 31];

	    W[i] = sum64_4_hi(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo);
	    W[i + 1] = sum64_4_lo(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo);
	  }
	};

	SHA512$1.prototype._update = function _update(msg, start) {
	  this._prepareBlock(msg, start);

	  var W = this.W;

	  var ah = this.h[0];
	  var al = this.h[1];
	  var bh = this.h[2];
	  var bl = this.h[3];
	  var ch = this.h[4];
	  var cl = this.h[5];
	  var dh = this.h[6];
	  var dl = this.h[7];
	  var eh = this.h[8];
	  var el = this.h[9];
	  var fh = this.h[10];
	  var fl = this.h[11];
	  var gh = this.h[12];
	  var gl = this.h[13];
	  var hh = this.h[14];
	  var hl = this.h[15];

	  assert$a(this.k.length === W.length);
	  for (var i = 0; i < W.length; i += 2) {
	    var c0_hi = hh;
	    var c0_lo = hl;
	    var c1_hi = s1_512_hi(eh, el);
	    var c1_lo = s1_512_lo(eh, el);
	    var c2_hi = ch64_hi(eh, el, fh, fl, gh);
	    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
	    var c3_hi = this.k[i];
	    var c3_lo = this.k[i + 1];
	    var c4_hi = W[i];
	    var c4_lo = W[i + 1];

	    var T1_hi = sum64_5_hi(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo,
	      c4_hi, c4_lo);
	    var T1_lo = sum64_5_lo(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo,
	      c4_hi, c4_lo);

	    c0_hi = s0_512_hi(ah, al);
	    c0_lo = s0_512_lo(ah, al);
	    c1_hi = maj64_hi(ah, al, bh, bl, ch);
	    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

	    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
	    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

	    hh = gh;
	    hl = gl;

	    gh = fh;
	    gl = fl;

	    fh = eh;
	    fl = el;

	    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
	    el = sum64_lo(dl, dl, T1_hi, T1_lo);

	    dh = ch;
	    dl = cl;

	    ch = bh;
	    cl = bl;

	    bh = ah;
	    bl = al;

	    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
	    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
	  }

	  sum64(this.h, 0, ah, al);
	  sum64(this.h, 2, bh, bl);
	  sum64(this.h, 4, ch, cl);
	  sum64(this.h, 6, dh, dl);
	  sum64(this.h, 8, eh, el);
	  sum64(this.h, 10, fh, fl);
	  sum64(this.h, 12, gh, gl);
	  sum64(this.h, 14, hh, hl);
	};

	SHA512$1.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$d.toHex32(this.h, 'big');
	  else
	    return utils$d.split32(this.h, 'big');
	};

	function ch64_hi(xh, xl, yh, yl, zh) {
	  var r = (xh & yh) ^ ((~xh) & zh);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function ch64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ ((~xl) & zl);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function maj64_hi(xh, xl, yh, yl, zh) {
	  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function maj64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 28);
	  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
	  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 28);
	  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
	  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 14);
	  var c1_hi = rotr64_hi(xh, xl, 18);
	  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 14);
	  var c1_lo = rotr64_lo(xh, xl, 18);
	  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 1);
	  var c1_hi = rotr64_hi(xh, xl, 8);
	  var c2_hi = shr64_hi(xh, xl, 7);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 1);
	  var c1_lo = rotr64_lo(xh, xl, 8);
	  var c2_lo = shr64_lo(xh, xl, 7);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 19);
	  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
	  var c2_hi = shr64_hi(xh, xl, 6);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 19);
	  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
	  var c2_lo = shr64_lo(xh, xl, 6);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	var utils$c = utils$j;

	var SHA512 = _512;

	function SHA384() {
	  if (!(this instanceof SHA384))
	    return new SHA384();

	  SHA512.call(this);
	  this.h = [
	    0xcbbb9d5d, 0xc1059ed8,
	    0x629a292a, 0x367cd507,
	    0x9159015a, 0x3070dd17,
	    0x152fecd8, 0xf70e5939,
	    0x67332667, 0xffc00b31,
	    0x8eb44a87, 0x68581511,
	    0xdb0c2e0d, 0x64f98fa7,
	    0x47b5481d, 0xbefa4fa4 ];
	}
	utils$c.inherits(SHA384, SHA512);
	var _384 = SHA384;

	SHA384.blockSize = 1024;
	SHA384.outSize = 384;
	SHA384.hmacStrength = 192;
	SHA384.padLength = 128;

	SHA384.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$c.toHex32(this.h.slice(0, 12), 'big');
	  else
	    return utils$c.split32(this.h.slice(0, 12), 'big');
	};

	sha.sha1 = _1;
	sha.sha224 = _224;
	sha.sha256 = _256;
	sha.sha384 = _384;
	sha.sha512 = _512;

	var ripemd = {};

	var utils$b = utils$j;
	var common = common$5;

	var rotl32 = utils$b.rotl32;
	var sum32 = utils$b.sum32;
	var sum32_3 = utils$b.sum32_3;
	var sum32_4 = utils$b.sum32_4;
	var BlockHash = common.BlockHash;

	function RIPEMD160() {
	  if (!(this instanceof RIPEMD160))
	    return new RIPEMD160();

	  BlockHash.call(this);

	  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
	  this.endian = 'little';
	}
	utils$b.inherits(RIPEMD160, BlockHash);
	ripemd.ripemd160 = RIPEMD160;

	RIPEMD160.blockSize = 512;
	RIPEMD160.outSize = 160;
	RIPEMD160.hmacStrength = 192;
	RIPEMD160.padLength = 64;

	RIPEMD160.prototype._update = function update(msg, start) {
	  var A = this.h[0];
	  var B = this.h[1];
	  var C = this.h[2];
	  var D = this.h[3];
	  var E = this.h[4];
	  var Ah = A;
	  var Bh = B;
	  var Ch = C;
	  var Dh = D;
	  var Eh = E;
	  for (var j = 0; j < 80; j++) {
	    var T = sum32(
	      rotl32(
	        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
	        s[j]),
	      E);
	    A = E;
	    E = D;
	    D = rotl32(C, 10);
	    C = B;
	    B = T;
	    T = sum32(
	      rotl32(
	        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
	        sh[j]),
	      Eh);
	    Ah = Eh;
	    Eh = Dh;
	    Dh = rotl32(Ch, 10);
	    Ch = Bh;
	    Bh = T;
	  }
	  T = sum32_3(this.h[1], C, Dh);
	  this.h[1] = sum32_3(this.h[2], D, Eh);
	  this.h[2] = sum32_3(this.h[3], E, Ah);
	  this.h[3] = sum32_3(this.h[4], A, Bh);
	  this.h[4] = sum32_3(this.h[0], B, Ch);
	  this.h[0] = T;
	};

	RIPEMD160.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$b.toHex32(this.h, 'little');
	  else
	    return utils$b.split32(this.h, 'little');
	};

	function f(j, x, y, z) {
	  if (j <= 15)
	    return x ^ y ^ z;
	  else if (j <= 31)
	    return (x & y) | ((~x) & z);
	  else if (j <= 47)
	    return (x | (~y)) ^ z;
	  else if (j <= 63)
	    return (x & z) | (y & (~z));
	  else
	    return x ^ (y | (~z));
	}

	function K(j) {
	  if (j <= 15)
	    return 0x00000000;
	  else if (j <= 31)
	    return 0x5a827999;
	  else if (j <= 47)
	    return 0x6ed9eba1;
	  else if (j <= 63)
	    return 0x8f1bbcdc;
	  else
	    return 0xa953fd4e;
	}

	function Kh(j) {
	  if (j <= 15)
	    return 0x50a28be6;
	  else if (j <= 31)
	    return 0x5c4dd124;
	  else if (j <= 47)
	    return 0x6d703ef3;
	  else if (j <= 63)
	    return 0x7a6d76e9;
	  else
	    return 0x00000000;
	}

	var r = [
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
	  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
	  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
	  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
	];

	var rh = [
	  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
	  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
	  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
	  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
	  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
	];

	var s = [
	  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
	  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
	  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
	  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
	  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
	];

	var sh = [
	  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
	  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
	  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
	  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
	  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
	];

	var utils$a = utils$j;
	var assert$9 = minimalisticAssert;

	function Hmac(hash, key, enc) {
	  if (!(this instanceof Hmac))
	    return new Hmac(hash, key, enc);
	  this.Hash = hash;
	  this.blockSize = hash.blockSize / 8;
	  this.outSize = hash.outSize / 8;
	  this.inner = null;
	  this.outer = null;

	  this._init(utils$a.toArray(key, enc));
	}
	var hmac = Hmac;

	Hmac.prototype._init = function init(key) {
	  // Shorten key, if needed
	  if (key.length > this.blockSize)
	    key = new this.Hash().update(key).digest();
	  assert$9(key.length <= this.blockSize);

	  // Add padding to key
	  for (var i = key.length; i < this.blockSize; i++)
	    key.push(0);

	  for (i = 0; i < key.length; i++)
	    key[i] ^= 0x36;
	  this.inner = new this.Hash().update(key);

	  // 0x36 ^ 0x5c = 0x6a
	  for (i = 0; i < key.length; i++)
	    key[i] ^= 0x6a;
	  this.outer = new this.Hash().update(key);
	};

	Hmac.prototype.update = function update(msg, enc) {
	  this.inner.update(msg, enc);
	  return this;
	};

	Hmac.prototype.digest = function digest(enc) {
	  this.outer.update(this.inner.digest());
	  return this.outer.digest(enc);
	};

	(function (exports) {
	var hash = exports;

	hash.utils = utils$j;
	hash.common = common$5;
	hash.sha = sha;
	hash.ripemd = ripemd;
	hash.hmac = hmac;

	// Proxy hash functions to the main object
	hash.sha1 = hash.sha.sha1;
	hash.sha256 = hash.sha.sha256;
	hash.sha224 = hash.sha.sha224;
	hash.sha384 = hash.sha.sha384;
	hash.sha512 = hash.sha.sha512;
	hash.ripemd160 = hash.ripemd.ripemd160;
	}(hash$6));

	var secp256k1 = {
	  doubles: {
	    step: 4,
	    points: [
	      [
	        'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
	        'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821',
	      ],
	      [
	        '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
	        '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf',
	      ],
	      [
	        '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
	        'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695',
	      ],
	      [
	        '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
	        '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9',
	      ],
	      [
	        '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
	        '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36',
	      ],
	      [
	        '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
	        '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f',
	      ],
	      [
	        'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
	        '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999',
	      ],
	      [
	        '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
	        'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09',
	      ],
	      [
	        'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
	        '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d',
	      ],
	      [
	        'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
	        'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088',
	      ],
	      [
	        'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
	        '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d',
	      ],
	      [
	        '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
	        '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8',
	      ],
	      [
	        '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
	        '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a',
	      ],
	      [
	        '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
	        '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453',
	      ],
	      [
	        '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
	        '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160',
	      ],
	      [
	        '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
	        '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0',
	      ],
	      [
	        '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
	        '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6',
	      ],
	      [
	        '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
	        '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589',
	      ],
	      [
	        '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
	        'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17',
	      ],
	      [
	        'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
	        '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda',
	      ],
	      [
	        'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
	        '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd',
	      ],
	      [
	        '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
	        '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2',
	      ],
	      [
	        '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
	        '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6',
	      ],
	      [
	        'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
	        '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f',
	      ],
	      [
	        '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
	        'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01',
	      ],
	      [
	        'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
	        '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3',
	      ],
	      [
	        'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
	        'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f',
	      ],
	      [
	        'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
	        '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7',
	      ],
	      [
	        'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
	        'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78',
	      ],
	      [
	        'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
	        '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1',
	      ],
	      [
	        '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
	        'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150',
	      ],
	      [
	        '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
	        '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82',
	      ],
	      [
	        'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
	        '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc',
	      ],
	      [
	        '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
	        'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b',
	      ],
	      [
	        'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
	        '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51',
	      ],
	      [
	        'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
	        '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45',
	      ],
	      [
	        'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
	        'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120',
	      ],
	      [
	        '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
	        '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84',
	      ],
	      [
	        '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
	        '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d',
	      ],
	      [
	        '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
	        'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d',
	      ],
	      [
	        '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
	        '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8',
	      ],
	      [
	        'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
	        '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8',
	      ],
	      [
	        '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
	        '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac',
	      ],
	      [
	        '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
	        'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f',
	      ],
	      [
	        '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
	        '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962',
	      ],
	      [
	        'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
	        '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907',
	      ],
	      [
	        '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
	        'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec',
	      ],
	      [
	        'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
	        'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d',
	      ],
	      [
	        'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
	        '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414',
	      ],
	      [
	        '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
	        'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd',
	      ],
	      [
	        '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
	        'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0',
	      ],
	      [
	        'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
	        '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811',
	      ],
	      [
	        'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
	        '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1',
	      ],
	      [
	        'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
	        '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c',
	      ],
	      [
	        '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
	        'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73',
	      ],
	      [
	        '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
	        '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd',
	      ],
	      [
	        'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
	        'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405',
	      ],
	      [
	        '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
	        'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589',
	      ],
	      [
	        '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
	        '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e',
	      ],
	      [
	        '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
	        '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27',
	      ],
	      [
	        'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
	        'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1',
	      ],
	      [
	        '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
	        '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482',
	      ],
	      [
	        '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
	        '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945',
	      ],
	      [
	        'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
	        '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573',
	      ],
	      [
	        'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
	        'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82',
	      ],
	    ],
	  },
	  naf: {
	    wnd: 7,
	    points: [
	      [
	        'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
	        '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672',
	      ],
	      [
	        '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
	        'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6',
	      ],
	      [
	        '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
	        '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da',
	      ],
	      [
	        'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
	        'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37',
	      ],
	      [
	        '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
	        'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b',
	      ],
	      [
	        'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
	        'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81',
	      ],
	      [
	        'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
	        '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58',
	      ],
	      [
	        'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
	        '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77',
	      ],
	      [
	        '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
	        '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a',
	      ],
	      [
	        '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
	        '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c',
	      ],
	      [
	        '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
	        '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67',
	      ],
	      [
	        '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
	        '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402',
	      ],
	      [
	        'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
	        'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55',
	      ],
	      [
	        'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
	        '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482',
	      ],
	      [
	        '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
	        'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82',
	      ],
	      [
	        '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
	        'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396',
	      ],
	      [
	        '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
	        '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49',
	      ],
	      [
	        '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
	        '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf',
	      ],
	      [
	        '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
	        '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a',
	      ],
	      [
	        '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
	        'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7',
	      ],
	      [
	        'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
	        'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933',
	      ],
	      [
	        '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
	        '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a',
	      ],
	      [
	        '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
	        '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6',
	      ],
	      [
	        'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
	        'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37',
	      ],
	      [
	        '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
	        '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e',
	      ],
	      [
	        'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
	        'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6',
	      ],
	      [
	        'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
	        'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476',
	      ],
	      [
	        '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
	        '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40',
	      ],
	      [
	        '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
	        '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61',
	      ],
	      [
	        '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
	        '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683',
	      ],
	      [
	        'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
	        '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5',
	      ],
	      [
	        '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
	        '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b',
	      ],
	      [
	        'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
	        '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417',
	      ],
	      [
	        '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
	        'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868',
	      ],
	      [
	        '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
	        'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a',
	      ],
	      [
	        'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
	        'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6',
	      ],
	      [
	        '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
	        '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996',
	      ],
	      [
	        '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
	        'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e',
	      ],
	      [
	        'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
	        'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d',
	      ],
	      [
	        '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
	        '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2',
	      ],
	      [
	        '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
	        'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e',
	      ],
	      [
	        '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
	        '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437',
	      ],
	      [
	        '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
	        'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311',
	      ],
	      [
	        'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
	        '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4',
	      ],
	      [
	        '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
	        '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575',
	      ],
	      [
	        '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
	        'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d',
	      ],
	      [
	        '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
	        'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d',
	      ],
	      [
	        'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
	        'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629',
	      ],
	      [
	        'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
	        'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06',
	      ],
	      [
	        '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
	        '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374',
	      ],
	      [
	        '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
	        '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee',
	      ],
	      [
	        'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
	        '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1',
	      ],
	      [
	        'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
	        'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b',
	      ],
	      [
	        '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
	        '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661',
	      ],
	      [
	        '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
	        '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6',
	      ],
	      [
	        'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
	        '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e',
	      ],
	      [
	        '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
	        '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d',
	      ],
	      [
	        'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
	        'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc',
	      ],
	      [
	        '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
	        'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4',
	      ],
	      [
	        '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
	        '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c',
	      ],
	      [
	        'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
	        '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b',
	      ],
	      [
	        'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
	        '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913',
	      ],
	      [
	        '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
	        '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154',
	      ],
	      [
	        '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
	        '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865',
	      ],
	      [
	        '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
	        'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc',
	      ],
	      [
	        '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
	        'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224',
	      ],
	      [
	        '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
	        '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e',
	      ],
	      [
	        '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
	        '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6',
	      ],
	      [
	        '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
	        '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511',
	      ],
	      [
	        '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
	        'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b',
	      ],
	      [
	        'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
	        'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2',
	      ],
	      [
	        '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
	        'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c',
	      ],
	      [
	        'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
	        '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3',
	      ],
	      [
	        'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
	        '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d',
	      ],
	      [
	        'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
	        '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700',
	      ],
	      [
	        'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
	        '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4',
	      ],
	      [
	        '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
	        'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196',
	      ],
	      [
	        '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
	        '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4',
	      ],
	      [
	        '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
	        'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257',
	      ],
	      [
	        'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
	        'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13',
	      ],
	      [
	        'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
	        '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096',
	      ],
	      [
	        'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
	        'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38',
	      ],
	      [
	        'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
	        '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f',
	      ],
	      [
	        '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
	        '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448',
	      ],
	      [
	        'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
	        '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a',
	      ],
	      [
	        'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
	        '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4',
	      ],
	      [
	        '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
	        '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437',
	      ],
	      [
	        '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
	        'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7',
	      ],
	      [
	        'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
	        '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d',
	      ],
	      [
	        'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
	        '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a',
	      ],
	      [
	        'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
	        '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54',
	      ],
	      [
	        '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
	        '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77',
	      ],
	      [
	        'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
	        'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517',
	      ],
	      [
	        '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
	        'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10',
	      ],
	      [
	        'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
	        'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125',
	      ],
	      [
	        'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
	        '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e',
	      ],
	      [
	        '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
	        'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1',
	      ],
	      [
	        'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
	        '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2',
	      ],
	      [
	        'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
	        '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423',
	      ],
	      [
	        'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
	        '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8',
	      ],
	      [
	        '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
	        'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758',
	      ],
	      [
	        '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
	        'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375',
	      ],
	      [
	        'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
	        '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d',
	      ],
	      [
	        '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
	        'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec',
	      ],
	      [
	        '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
	        '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0',
	      ],
	      [
	        '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
	        'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c',
	      ],
	      [
	        'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
	        'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4',
	      ],
	      [
	        '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
	        'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f',
	      ],
	      [
	        '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
	        '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649',
	      ],
	      [
	        '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
	        'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826',
	      ],
	      [
	        '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
	        '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5',
	      ],
	      [
	        'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
	        'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87',
	      ],
	      [
	        '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
	        '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b',
	      ],
	      [
	        'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
	        '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc',
	      ],
	      [
	        '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
	        '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c',
	      ],
	      [
	        'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
	        'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f',
	      ],
	      [
	        'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
	        '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a',
	      ],
	      [
	        'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
	        'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46',
	      ],
	      [
	        '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
	        'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f',
	      ],
	      [
	        '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
	        '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03',
	      ],
	      [
	        '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
	        'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08',
	      ],
	      [
	        '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
	        '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8',
	      ],
	      [
	        '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
	        '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373',
	      ],
	      [
	        '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
	        'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3',
	      ],
	      [
	        '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
	        '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8',
	      ],
	      [
	        '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
	        '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1',
	      ],
	      [
	        '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
	        '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9',
	      ],
	    ],
	  },
	};

	(function (exports) {

	var curves = exports;

	var hash = hash$6;
	var curve$1 = curve;
	var utils = utils$p;

	var assert = utils.assert;

	function PresetCurve(options) {
	  if (options.type === 'short')
	    this.curve = new curve$1.short(options);
	  else if (options.type === 'edwards')
	    this.curve = new curve$1.edwards(options);
	  else
	    this.curve = new curve$1.mont(options);
	  this.g = this.curve.g;
	  this.n = this.curve.n;
	  this.hash = options.hash;

	  assert(this.g.validate(), 'Invalid curve');
	  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
	}
	curves.PresetCurve = PresetCurve;

	function defineCurve(name, options) {
	  Object.defineProperty(curves, name, {
	    configurable: true,
	    enumerable: true,
	    get: function() {
	      var curve = new PresetCurve(options);
	      Object.defineProperty(curves, name, {
	        configurable: true,
	        enumerable: true,
	        value: curve,
	      });
	      return curve;
	    },
	  });
	}

	defineCurve('p192', {
	  type: 'short',
	  prime: 'p192',
	  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
	  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
	  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
	  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
	    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811',
	  ],
	});

	defineCurve('p224', {
	  type: 'short',
	  prime: 'p224',
	  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
	  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
	  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
	  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
	    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34',
	  ],
	});

	defineCurve('p256', {
	  type: 'short',
	  prime: null,
	  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
	  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
	  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
	  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
	    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5',
	  ],
	});

	defineCurve('p384', {
	  type: 'short',
	  prime: null,
	  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'fffffffe ffffffff 00000000 00000000 ffffffff',
	  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'fffffffe ffffffff 00000000 00000000 fffffffc',
	  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
	     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
	  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
	     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
	  hash: hash.sha384,
	  gRed: false,
	  g: [
	    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
	    '5502f25d bf55296c 3a545e38 72760ab7',
	    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
	    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f',
	  ],
	});

	defineCurve('p521', {
	  type: 'short',
	  prime: null,
	  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff',
	  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff fffffffc',
	  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
	     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
	     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
	  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
	     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
	  hash: hash.sha512,
	  gRed: false,
	  g: [
	    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
	    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
	    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
	    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
	    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
	    '3fad0761 353c7086 a272c240 88be9476 9fd16650',
	  ],
	});

	defineCurve('curve25519', {
	  type: 'mont',
	  prime: 'p25519',
	  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
	  a: '76d06',
	  b: '1',
	  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '9',
	  ],
	});

	defineCurve('ed25519', {
	  type: 'edwards',
	  prime: 'p25519',
	  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
	  a: '-1',
	  c: '1',
	  // -121665 * (121666^(-1)) (mod P)
	  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
	  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

	    // 4/5
	    '6666666666666666666666666666666666666666666666666666666666666658',
	  ],
	});

	var pre;
	try {
	  pre = secp256k1;
	} catch (e) {
	  pre = undefined;
	}

	defineCurve('secp256k1', {
	  type: 'short',
	  prime: 'k256',
	  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
	  a: '0',
	  b: '7',
	  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
	  h: '1',
	  hash: hash.sha256,

	  // Precomputed endomorphism
	  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
	  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
	  basis: [
	    {
	      a: '3086d221a7d46bcde86c90e49284eb15',
	      b: '-e4437ed6010e88286f547fa90abfe4c3',
	    },
	    {
	      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
	      b: '3086d221a7d46bcde86c90e49284eb15',
	    },
	  ],

	  gRed: false,
	  g: [
	    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
	    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
	    pre,
	  ],
	});
	}(curves$2));

	var hash$5 = hash$6;
	var utils$9 = utils$o;
	var assert$8 = minimalisticAssert;

	function HmacDRBG$1(options) {
	  if (!(this instanceof HmacDRBG$1))
	    return new HmacDRBG$1(options);
	  this.hash = options.hash;
	  this.predResist = !!options.predResist;

	  this.outLen = this.hash.outSize;
	  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

	  this._reseed = null;
	  this.reseedInterval = null;
	  this.K = null;
	  this.V = null;

	  var entropy = utils$9.toArray(options.entropy, options.entropyEnc || 'hex');
	  var nonce = utils$9.toArray(options.nonce, options.nonceEnc || 'hex');
	  var pers = utils$9.toArray(options.pers, options.persEnc || 'hex');
	  assert$8(entropy.length >= (this.minEntropy / 8),
	         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
	  this._init(entropy, nonce, pers);
	}
	var hmacDrbg = HmacDRBG$1;

	HmacDRBG$1.prototype._init = function init(entropy, nonce, pers) {
	  var seed = entropy.concat(nonce).concat(pers);

	  this.K = new Array(this.outLen / 8);
	  this.V = new Array(this.outLen / 8);
	  for (var i = 0; i < this.V.length; i++) {
	    this.K[i] = 0x00;
	    this.V[i] = 0x01;
	  }

	  this._update(seed);
	  this._reseed = 1;
	  this.reseedInterval = 0x1000000000000;  // 2^48
	};

	HmacDRBG$1.prototype._hmac = function hmac() {
	  return new hash$5.hmac(this.hash, this.K);
	};

	HmacDRBG$1.prototype._update = function update(seed) {
	  var kmac = this._hmac()
	                 .update(this.V)
	                 .update([ 0x00 ]);
	  if (seed)
	    kmac = kmac.update(seed);
	  this.K = kmac.digest();
	  this.V = this._hmac().update(this.V).digest();
	  if (!seed)
	    return;

	  this.K = this._hmac()
	               .update(this.V)
	               .update([ 0x01 ])
	               .update(seed)
	               .digest();
	  this.V = this._hmac().update(this.V).digest();
	};

	HmacDRBG$1.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
	  // Optional entropy enc
	  if (typeof entropyEnc !== 'string') {
	    addEnc = add;
	    add = entropyEnc;
	    entropyEnc = null;
	  }

	  entropy = utils$9.toArray(entropy, entropyEnc);
	  add = utils$9.toArray(add, addEnc);

	  assert$8(entropy.length >= (this.minEntropy / 8),
	         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

	  this._update(entropy.concat(add || []));
	  this._reseed = 1;
	};

	HmacDRBG$1.prototype.generate = function generate(len, enc, add, addEnc) {
	  if (this._reseed > this.reseedInterval)
	    throw new Error('Reseed is required');

	  // Optional encoding
	  if (typeof enc !== 'string') {
	    addEnc = add;
	    add = enc;
	    enc = null;
	  }

	  // Optional additional data
	  if (add) {
	    add = utils$9.toArray(add, addEnc || 'hex');
	    this._update(add);
	  }

	  var temp = [];
	  while (temp.length < len) {
	    this.V = this._hmac().update(this.V).digest();
	    temp = temp.concat(this.V);
	  }

	  var res = temp.slice(0, len);
	  this._update(add);
	  this._reseed++;
	  return utils$9.encode(res, enc);
	};

	var BN$3 = bn.exports;
	var utils$8 = utils$p;
	var assert$7 = utils$8.assert;

	function KeyPair$3(ec, options) {
	  this.ec = ec;
	  this.priv = null;
	  this.pub = null;

	  // KeyPair(ec, { priv: ..., pub: ... })
	  if (options.priv)
	    this._importPrivate(options.priv, options.privEnc);
	  if (options.pub)
	    this._importPublic(options.pub, options.pubEnc);
	}
	var key$2 = KeyPair$3;

	KeyPair$3.fromPublic = function fromPublic(ec, pub, enc) {
	  if (pub instanceof KeyPair$3)
	    return pub;

	  return new KeyPair$3(ec, {
	    pub: pub,
	    pubEnc: enc,
	  });
	};

	KeyPair$3.fromPrivate = function fromPrivate(ec, priv, enc) {
	  if (priv instanceof KeyPair$3)
	    return priv;

	  return new KeyPair$3(ec, {
	    priv: priv,
	    privEnc: enc,
	  });
	};

	KeyPair$3.prototype.validate = function validate() {
	  var pub = this.getPublic();

	  if (pub.isInfinity())
	    return { result: false, reason: 'Invalid public key' };
	  if (!pub.validate())
	    return { result: false, reason: 'Public key is not a point' };
	  if (!pub.mul(this.ec.curve.n).isInfinity())
	    return { result: false, reason: 'Public key * N != O' };

	  return { result: true, reason: null };
	};

	KeyPair$3.prototype.getPublic = function getPublic(compact, enc) {
	  // compact is optional argument
	  if (typeof compact === 'string') {
	    enc = compact;
	    compact = null;
	  }

	  if (!this.pub)
	    this.pub = this.ec.g.mul(this.priv);

	  if (!enc)
	    return this.pub;

	  return this.pub.encode(enc, compact);
	};

	KeyPair$3.prototype.getPrivate = function getPrivate(enc) {
	  if (enc === 'hex')
	    return this.priv.toString(16, 2);
	  else
	    return this.priv;
	};

	KeyPair$3.prototype._importPrivate = function _importPrivate(key, enc) {
	  this.priv = new BN$3(key, enc || 16);

	  // Ensure that the priv won't be bigger than n, otherwise we may fail
	  // in fixed multiplication method
	  this.priv = this.priv.umod(this.ec.curve.n);
	};

	KeyPair$3.prototype._importPublic = function _importPublic(key, enc) {
	  if (key.x || key.y) {
	    // Montgomery points only have an `x` coordinate.
	    // Weierstrass/Edwards points on the other hand have both `x` and
	    // `y` coordinates.
	    if (this.ec.curve.type === 'mont') {
	      assert$7(key.x, 'Need x coordinate');
	    } else if (this.ec.curve.type === 'short' ||
	               this.ec.curve.type === 'edwards') {
	      assert$7(key.x && key.y, 'Need both x and y coordinate');
	    }
	    this.pub = this.ec.curve.point(key.x, key.y);
	    return;
	  }
	  this.pub = this.ec.curve.decodePoint(key, enc);
	};

	// ECDH
	KeyPair$3.prototype.derive = function derive(pub) {
	  if(!pub.validate()) {
	    assert$7(pub.validate(), 'public point not validated');
	  }
	  return pub.mul(this.priv).getX();
	};

	// ECDSA
	KeyPair$3.prototype.sign = function sign(msg, enc, options) {
	  return this.ec.sign(msg, this, enc, options);
	};

	KeyPair$3.prototype.verify = function verify(msg, signature) {
	  return this.ec.verify(msg, signature, this);
	};

	KeyPair$3.prototype.inspect = function inspect() {
	  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
	         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
	};

	var BN$2 = bn.exports;

	var utils$7 = utils$p;
	var assert$6 = utils$7.assert;

	function Signature$3(options, enc) {
	  if (options instanceof Signature$3)
	    return options;

	  if (this._importDER(options, enc))
	    return;

	  assert$6(options.r && options.s, 'Signature without r or s');
	  this.r = new BN$2(options.r, 16);
	  this.s = new BN$2(options.s, 16);
	  if (options.recoveryParam === undefined)
	    this.recoveryParam = null;
	  else
	    this.recoveryParam = options.recoveryParam;
	}
	var signature$1 = Signature$3;

	function Position() {
	  this.place = 0;
	}

	function getLength(buf, p) {
	  var initial = buf[p.place++];
	  if (!(initial & 0x80)) {
	    return initial;
	  }
	  var octetLen = initial & 0xf;

	  // Indefinite length or overflow
	  if (octetLen === 0 || octetLen > 4) {
	    return false;
	  }

	  var val = 0;
	  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
	    val <<= 8;
	    val |= buf[off];
	    val >>>= 0;
	  }

	  // Leading zeroes
	  if (val <= 0x7f) {
	    return false;
	  }

	  p.place = off;
	  return val;
	}

	function rmPadding(buf) {
	  var i = 0;
	  var len = buf.length - 1;
	  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
	    i++;
	  }
	  if (i === 0) {
	    return buf;
	  }
	  return buf.slice(i);
	}

	Signature$3.prototype._importDER = function _importDER(data, enc) {
	  data = utils$7.toArray(data, enc);
	  var p = new Position();
	  if (data[p.place++] !== 0x30) {
	    return false;
	  }
	  var len = getLength(data, p);
	  if (len === false) {
	    return false;
	  }
	  if ((len + p.place) !== data.length) {
	    return false;
	  }
	  if (data[p.place++] !== 0x02) {
	    return false;
	  }
	  var rlen = getLength(data, p);
	  if (rlen === false) {
	    return false;
	  }
	  var r = data.slice(p.place, rlen + p.place);
	  p.place += rlen;
	  if (data[p.place++] !== 0x02) {
	    return false;
	  }
	  var slen = getLength(data, p);
	  if (slen === false) {
	    return false;
	  }
	  if (data.length !== slen + p.place) {
	    return false;
	  }
	  var s = data.slice(p.place, slen + p.place);
	  if (r[0] === 0) {
	    if (r[1] & 0x80) {
	      r = r.slice(1);
	    } else {
	      // Leading zeroes
	      return false;
	    }
	  }
	  if (s[0] === 0) {
	    if (s[1] & 0x80) {
	      s = s.slice(1);
	    } else {
	      // Leading zeroes
	      return false;
	    }
	  }

	  this.r = new BN$2(r);
	  this.s = new BN$2(s);
	  this.recoveryParam = null;

	  return true;
	};

	function constructLength(arr, len) {
	  if (len < 0x80) {
	    arr.push(len);
	    return;
	  }
	  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
	  arr.push(octets | 0x80);
	  while (--octets) {
	    arr.push((len >>> (octets << 3)) & 0xff);
	  }
	  arr.push(len);
	}

	Signature$3.prototype.toDER = function toDER(enc) {
	  var r = this.r.toArray();
	  var s = this.s.toArray();

	  // Pad values
	  if (r[0] & 0x80)
	    r = [ 0 ].concat(r);
	  // Pad values
	  if (s[0] & 0x80)
	    s = [ 0 ].concat(s);

	  r = rmPadding(r);
	  s = rmPadding(s);

	  while (!s[0] && !(s[1] & 0x80)) {
	    s = s.slice(1);
	  }
	  var arr = [ 0x02 ];
	  constructLength(arr, r.length);
	  arr = arr.concat(r);
	  arr.push(0x02);
	  constructLength(arr, s.length);
	  var backHalf = arr.concat(s);
	  var res = [ 0x30 ];
	  constructLength(res, backHalf.length);
	  res = res.concat(backHalf);
	  return utils$7.encode(res, enc);
	};

	var BN$1 = bn.exports;
	var HmacDRBG = hmacDrbg;
	var utils$6 = utils$p;
	var curves$1 = curves$2;
	var rand = brorand.exports;
	var assert$5 = utils$6.assert;

	var KeyPair$2 = key$2;
	var Signature$2 = signature$1;

	function EC$1(options) {
	  if (!(this instanceof EC$1))
	    return new EC$1(options);

	  // Shortcut `elliptic.ec(curve-name)`
	  if (typeof options === 'string') {
	    assert$5(Object.prototype.hasOwnProperty.call(curves$1, options),
	      'Unknown curve ' + options);

	    options = curves$1[options];
	  }

	  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
	  if (options instanceof curves$1.PresetCurve)
	    options = { curve: options };

	  this.curve = options.curve.curve;
	  this.n = this.curve.n;
	  this.nh = this.n.ushrn(1);
	  this.g = this.curve.g;

	  // Point on curve
	  this.g = options.curve.g;
	  this.g.precompute(options.curve.n.bitLength() + 1);

	  // Hash for function for DRBG
	  this.hash = options.hash || options.curve.hash;
	}
	var ec = EC$1;

	EC$1.prototype.keyPair = function keyPair(options) {
	  return new KeyPair$2(this, options);
	};

	EC$1.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
	  return KeyPair$2.fromPrivate(this, priv, enc);
	};

	EC$1.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
	  return KeyPair$2.fromPublic(this, pub, enc);
	};

	EC$1.prototype.genKeyPair = function genKeyPair(options) {
	  if (!options)
	    options = {};

	  // Instantiate Hmac_DRBG
	  var drbg = new HmacDRBG({
	    hash: this.hash,
	    pers: options.pers,
	    persEnc: options.persEnc || 'utf8',
	    entropy: options.entropy || rand(this.hash.hmacStrength),
	    entropyEnc: options.entropy && options.entropyEnc || 'utf8',
	    nonce: this.n.toArray(),
	  });

	  var bytes = this.n.byteLength();
	  var ns2 = this.n.sub(new BN$1(2));
	  for (;;) {
	    var priv = new BN$1(drbg.generate(bytes));
	    if (priv.cmp(ns2) > 0)
	      continue;

	    priv.iaddn(1);
	    return this.keyFromPrivate(priv);
	  }
	};

	EC$1.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
	  var delta = msg.byteLength() * 8 - this.n.bitLength();
	  if (delta > 0)
	    msg = msg.ushrn(delta);
	  if (!truncOnly && msg.cmp(this.n) >= 0)
	    return msg.sub(this.n);
	  else
	    return msg;
	};

	EC$1.prototype.sign = function sign(msg, key, enc, options) {
	  if (typeof enc === 'object') {
	    options = enc;
	    enc = null;
	  }
	  if (!options)
	    options = {};

	  key = this.keyFromPrivate(key, enc);
	  msg = this._truncateToN(new BN$1(msg, 16));

	  // Zero-extend key to provide enough entropy
	  var bytes = this.n.byteLength();
	  var bkey = key.getPrivate().toArray('be', bytes);

	  // Zero-extend nonce to have the same byte size as N
	  var nonce = msg.toArray('be', bytes);

	  // Instantiate Hmac_DRBG
	  var drbg = new HmacDRBG({
	    hash: this.hash,
	    entropy: bkey,
	    nonce: nonce,
	    pers: options.pers,
	    persEnc: options.persEnc || 'utf8',
	  });

	  // Number of bytes to generate
	  var ns1 = this.n.sub(new BN$1(1));

	  for (var iter = 0; ; iter++) {
	    var k = options.k ?
	      options.k(iter) :
	      new BN$1(drbg.generate(this.n.byteLength()));
	    k = this._truncateToN(k, true);
	    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
	      continue;

	    var kp = this.g.mul(k);
	    if (kp.isInfinity())
	      continue;

	    var kpX = kp.getX();
	    var r = kpX.umod(this.n);
	    if (r.cmpn(0) === 0)
	      continue;

	    var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
	    s = s.umod(this.n);
	    if (s.cmpn(0) === 0)
	      continue;

	    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
	                        (kpX.cmp(r) !== 0 ? 2 : 0);

	    // Use complement of `s`, if it is > `n / 2`
	    if (options.canonical && s.cmp(this.nh) > 0) {
	      s = this.n.sub(s);
	      recoveryParam ^= 1;
	    }

	    return new Signature$2({ r: r, s: s, recoveryParam: recoveryParam });
	  }
	};

	EC$1.prototype.verify = function verify(msg, signature, key, enc) {
	  msg = this._truncateToN(new BN$1(msg, 16));
	  key = this.keyFromPublic(key, enc);
	  signature = new Signature$2(signature, 'hex');

	  // Perform primitive values validation
	  var r = signature.r;
	  var s = signature.s;
	  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
	    return false;
	  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
	    return false;

	  // Validate signature
	  var sinv = s.invm(this.n);
	  var u1 = sinv.mul(msg).umod(this.n);
	  var u2 = sinv.mul(r).umod(this.n);
	  var p;

	  if (!this.curve._maxwellTrick) {
	    p = this.g.mulAdd(u1, key.getPublic(), u2);
	    if (p.isInfinity())
	      return false;

	    return p.getX().umod(this.n).cmp(r) === 0;
	  }

	  // NOTE: Greg Maxwell's trick, inspired by:
	  // https://git.io/vad3K

	  p = this.g.jmulAdd(u1, key.getPublic(), u2);
	  if (p.isInfinity())
	    return false;

	  // Compare `p.x` of Jacobian point with `r`,
	  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
	  // inverse of `p.z^2`
	  return p.eqXToP(r);
	};

	EC$1.prototype.recoverPubKey = function(msg, signature, j, enc) {
	  assert$5((3 & j) === j, 'The recovery param is more than two bits');
	  signature = new Signature$2(signature, enc);

	  var n = this.n;
	  var e = new BN$1(msg);
	  var r = signature.r;
	  var s = signature.s;

	  // A set LSB signifies that the y-coordinate is odd
	  var isYOdd = j & 1;
	  var isSecondKey = j >> 1;
	  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
	    throw new Error('Unable to find sencond key candinate');

	  // 1.1. Let x = r + jn.
	  if (isSecondKey)
	    r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
	  else
	    r = this.curve.pointFromX(r, isYOdd);

	  var rInv = signature.r.invm(n);
	  var s1 = n.sub(e).mul(rInv).umod(n);
	  var s2 = s.mul(rInv).umod(n);

	  // 1.6.1 Compute Q = r^-1 (sR -  eG)
	  //               Q = r^-1 (sR + -eG)
	  return this.g.mulAdd(s1, r, s2);
	};

	EC$1.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
	  signature = new Signature$2(signature, enc);
	  if (signature.recoveryParam !== null)
	    return signature.recoveryParam;

	  for (var i = 0; i < 4; i++) {
	    var Qprime;
	    try {
	      Qprime = this.recoverPubKey(e, signature, i);
	    } catch (e) {
	      continue;
	    }

	    if (Qprime.eq(Q))
	      return i;
	  }
	  throw new Error('Unable to find valid recovery factor');
	};

	var utils$5 = utils$p;
	var assert$4 = utils$5.assert;
	var parseBytes$2 = utils$5.parseBytes;
	var cachedProperty$1 = utils$5.cachedProperty;

	/**
	* @param {EDDSA} eddsa - instance
	* @param {Object} params - public/private key parameters
	*
	* @param {Array<Byte>} [params.secret] - secret seed bytes
	* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
	* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
	*
	*/
	function KeyPair$1(eddsa, params) {
	  this.eddsa = eddsa;
	  this._secret = parseBytes$2(params.secret);
	  if (eddsa.isPoint(params.pub))
	    this._pub = params.pub;
	  else
	    this._pubBytes = parseBytes$2(params.pub);
	}

	KeyPair$1.fromPublic = function fromPublic(eddsa, pub) {
	  if (pub instanceof KeyPair$1)
	    return pub;
	  return new KeyPair$1(eddsa, { pub: pub });
	};

	KeyPair$1.fromSecret = function fromSecret(eddsa, secret) {
	  if (secret instanceof KeyPair$1)
	    return secret;
	  return new KeyPair$1(eddsa, { secret: secret });
	};

	KeyPair$1.prototype.secret = function secret() {
	  return this._secret;
	};

	cachedProperty$1(KeyPair$1, 'pubBytes', function pubBytes() {
	  return this.eddsa.encodePoint(this.pub());
	});

	cachedProperty$1(KeyPair$1, 'pub', function pub() {
	  if (this._pubBytes)
	    return this.eddsa.decodePoint(this._pubBytes);
	  return this.eddsa.g.mul(this.priv());
	});

	cachedProperty$1(KeyPair$1, 'privBytes', function privBytes() {
	  var eddsa = this.eddsa;
	  var hash = this.hash();
	  var lastIx = eddsa.encodingLength - 1;

	  var a = hash.slice(0, eddsa.encodingLength);
	  a[0] &= 248;
	  a[lastIx] &= 127;
	  a[lastIx] |= 64;

	  return a;
	});

	cachedProperty$1(KeyPair$1, 'priv', function priv() {
	  return this.eddsa.decodeInt(this.privBytes());
	});

	cachedProperty$1(KeyPair$1, 'hash', function hash() {
	  return this.eddsa.hash().update(this.secret()).digest();
	});

	cachedProperty$1(KeyPair$1, 'messagePrefix', function messagePrefix() {
	  return this.hash().slice(this.eddsa.encodingLength);
	});

	KeyPair$1.prototype.sign = function sign(message) {
	  assert$4(this._secret, 'KeyPair can only verify');
	  return this.eddsa.sign(message, this);
	};

	KeyPair$1.prototype.verify = function verify(message, sig) {
	  return this.eddsa.verify(message, sig, this);
	};

	KeyPair$1.prototype.getSecret = function getSecret(enc) {
	  assert$4(this._secret, 'KeyPair is public only');
	  return utils$5.encode(this.secret(), enc);
	};

	KeyPair$1.prototype.getPublic = function getPublic(enc) {
	  return utils$5.encode(this.pubBytes(), enc);
	};

	var key$1 = KeyPair$1;

	var BN = bn.exports;
	var utils$4 = utils$p;
	var assert$3 = utils$4.assert;
	var cachedProperty = utils$4.cachedProperty;
	var parseBytes$1 = utils$4.parseBytes;

	/**
	* @param {EDDSA} eddsa - eddsa instance
	* @param {Array<Bytes>|Object} sig -
	* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
	* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
	* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
	* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
	*/
	function Signature$1(eddsa, sig) {
	  this.eddsa = eddsa;

	  if (typeof sig !== 'object')
	    sig = parseBytes$1(sig);

	  if (Array.isArray(sig)) {
	    sig = {
	      R: sig.slice(0, eddsa.encodingLength),
	      S: sig.slice(eddsa.encodingLength),
	    };
	  }

	  assert$3(sig.R && sig.S, 'Signature without R or S');

	  if (eddsa.isPoint(sig.R))
	    this._R = sig.R;
	  if (sig.S instanceof BN)
	    this._S = sig.S;

	  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
	  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
	}

	cachedProperty(Signature$1, 'S', function S() {
	  return this.eddsa.decodeInt(this.Sencoded());
	});

	cachedProperty(Signature$1, 'R', function R() {
	  return this.eddsa.decodePoint(this.Rencoded());
	});

	cachedProperty(Signature$1, 'Rencoded', function Rencoded() {
	  return this.eddsa.encodePoint(this.R());
	});

	cachedProperty(Signature$1, 'Sencoded', function Sencoded() {
	  return this.eddsa.encodeInt(this.S());
	});

	Signature$1.prototype.toBytes = function toBytes() {
	  return this.Rencoded().concat(this.Sencoded());
	};

	Signature$1.prototype.toHex = function toHex() {
	  return utils$4.encode(this.toBytes(), 'hex').toUpperCase();
	};

	var signature = Signature$1;

	var hash$4 = hash$6;
	var curves = curves$2;
	var utils$3 = utils$p;
	var assert$2 = utils$3.assert;
	var parseBytes = utils$3.parseBytes;
	var KeyPair = key$1;
	var Signature = signature;

	function EDDSA(curve) {
	  assert$2(curve === 'ed25519', 'only tested with ed25519 so far');

	  if (!(this instanceof EDDSA))
	    return new EDDSA(curve);

	  curve = curves[curve].curve;
	  this.curve = curve;
	  this.g = curve.g;
	  this.g.precompute(curve.n.bitLength() + 1);

	  this.pointClass = curve.point().constructor;
	  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
	  this.hash = hash$4.sha512;
	}

	var eddsa = EDDSA;

	/**
	* @param {Array|String} message - message bytes
	* @param {Array|String|KeyPair} secret - secret bytes or a keypair
	* @returns {Signature} - signature
	*/
	EDDSA.prototype.sign = function sign(message, secret) {
	  message = parseBytes(message);
	  var key = this.keyFromSecret(secret);
	  var r = this.hashInt(key.messagePrefix(), message);
	  var R = this.g.mul(r);
	  var Rencoded = this.encodePoint(R);
	  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
	    .mul(key.priv());
	  var S = r.add(s_).umod(this.curve.n);
	  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
	};

	/**
	* @param {Array} message - message bytes
	* @param {Array|String|Signature} sig - sig bytes
	* @param {Array|String|Point|KeyPair} pub - public key
	* @returns {Boolean} - true if public key matches sig of message
	*/
	EDDSA.prototype.verify = function verify(message, sig, pub) {
	  message = parseBytes(message);
	  sig = this.makeSignature(sig);
	  var key = this.keyFromPublic(pub);
	  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
	  var SG = this.g.mul(sig.S());
	  var RplusAh = sig.R().add(key.pub().mul(h));
	  return RplusAh.eq(SG);
	};

	EDDSA.prototype.hashInt = function hashInt() {
	  var hash = this.hash();
	  for (var i = 0; i < arguments.length; i++)
	    hash.update(arguments[i]);
	  return utils$3.intFromLE(hash.digest()).umod(this.curve.n);
	};

	EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
	  return KeyPair.fromPublic(this, pub);
	};

	EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
	  return KeyPair.fromSecret(this, secret);
	};

	EDDSA.prototype.makeSignature = function makeSignature(sig) {
	  if (sig instanceof Signature)
	    return sig;
	  return new Signature(this, sig);
	};

	/**
	* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
	*
	* EDDSA defines methods for encoding and decoding points and integers. These are
	* helper convenience methods, that pass along to utility functions implied
	* parameters.
	*
	*/
	EDDSA.prototype.encodePoint = function encodePoint(point) {
	  var enc = point.getY().toArray('le', this.encodingLength);
	  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
	  return enc;
	};

	EDDSA.prototype.decodePoint = function decodePoint(bytes) {
	  bytes = utils$3.parseBytes(bytes);

	  var lastIx = bytes.length - 1;
	  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
	  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

	  var y = utils$3.intFromLE(normed);
	  return this.curve.pointFromY(y, xIsOdd);
	};

	EDDSA.prototype.encodeInt = function encodeInt(num) {
	  return num.toArray('le', this.encodingLength);
	};

	EDDSA.prototype.decodeInt = function decodeInt(bytes) {
	  return utils$3.intFromLE(bytes);
	};

	EDDSA.prototype.isPoint = function isPoint(val) {
	  return val instanceof this.pointClass;
	};

	(function (exports) {

	var elliptic = exports;

	elliptic.version = require$$0.version;
	elliptic.utils = utils$p;
	elliptic.rand = brorand.exports;
	elliptic.curve = curve;
	elliptic.curves = curves$2;

	// Protocols
	elliptic.ec = ec;
	elliptic.eddsa = eddsa;
	}(elliptic$2));

	var rsa$1 = {};

	var utils$2 = {};

	/*
	 * Utils functions
	 *
	 */

	/**
	 * Break string str each maxLen symbols
	 * @param str
	 * @param maxLen
	 * @returns {string}
	 */
	utils$2.linebrk = function (str, maxLen) {
	    var res = '';
	    var i = 0;
	    while (i + maxLen < str.length) {
	        res += str.substring(i, i + maxLen) + "\n";
	        i += maxLen;
	    }
	    return res + str.substring(i, str.length);
	};

	utils$2.detectEnvironment = function () {
	    if (typeof(window) !== 'undefined' && window && !(process && process.title === 'node')) {
	        return 'browser';
	    }

	    return 'node';
	};

	/**
	 * Trying get a 32-bit unsigned integer from the partial buffer
	 * @param buffer
	 * @param offset
	 * @returns {Number}
	 */
	utils$2.get32IntFromBuffer = function (buffer, offset) {
	    offset = offset || 0;
	    var size = 0;
	    if ((size = buffer.length - offset) > 0) {
	        if (size >= 4) {
	            return buffer.readUIntBE(offset, size);
	        } else {
	            var res = 0;
	            for (var i = offset + size, d = 0; i > offset; i--, d += 2) {
	                res += buffer[i - 1] * Math.pow(16, d);
	            }
	            return res;
	        }
	    } else {
	        return NaN;
	    }
	};

	utils$2._ = {
	    isObject: function (value) {
	        var type = typeof value;
	        return !!value && (type == 'object' || type == 'function');
	    },

	    isString: function (value) {
	        return typeof value == 'string' || value instanceof String;
	    },

	    isNumber: function (value) {
	        return typeof value == 'number' || !isNaN(parseFloat(value)) && isFinite(value);
	    },

	    /**
	     * Returns copy of `obj` without `removeProp` field.
	     * @param obj
	     * @param removeProp
	     * @returns Object
	     */
	    omit: function (obj, removeProp) {
	        var newObj = {};
	        for (var prop in obj) {
	            if (!obj.hasOwnProperty(prop) || prop === removeProp) {
	                continue;
	            }
	            newObj[prop] = obj[prop];
	        }

	        return newObj;
	    }
	};

	/**
	 * Strips everything around the opening and closing lines, including the lines
	 * themselves.
	 */
	utils$2.trimSurroundingText = function (data, opening, closing) {
	    var trimStartIndex = 0;
	    var trimEndIndex = data.length;

	    var openingBoundaryIndex = data.indexOf(opening);
	    if (openingBoundaryIndex >= 0) {
	        trimStartIndex = openingBoundaryIndex + opening.length;
	    }

	    var closingBoundaryIndex = data.indexOf(closing, openingBoundaryIndex);
	    if (closingBoundaryIndex >= 0) {
	        trimEndIndex = closingBoundaryIndex;
	    }

	    return data.substring(trimStartIndex, trimEndIndex);
	};

	/*
	 * Basic JavaScript BN library - subset useful for RSA encryption.
	 * 
	 * Copyright (c) 2003-2005  Tom Wu
	 * All Rights Reserved.
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining
	 * a copy of this software and associated documentation files (the
	 * "Software"), to deal in the Software without restriction, including
	 * without limitation the rights to use, copy, modify, merge, publish,
	 * distribute, sublicense, and/or sell copies of the Software, and to
	 * permit persons to whom the Software is furnished to do so, subject to
	 * the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
	 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
	 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
	 *
	 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
	 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
	 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
	 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
	 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	 *
	 * In addition, the following condition applies:
	 *
	 * All redistributions must retain an intact copy of this copyright notice
	 * and disclaimer.
	 */

	/*
	 * Added Node.js Buffers support
	 * 2014 rzcoder
	 */

	var crypt$3 = require$$0__default$4['default'];
	var _$2 = utils$2._;

	// Bits per digit
	var dbits;

	// (public) Constructor
	function BigInteger$4(a, b) {
	    if (a != null) {
	        if ("number" == typeof a) {
	            this.fromNumber(a, b);
	        } else if (Buffer.isBuffer(a)) {
	            this.fromBuffer(a);
	        } else if (b == null && "string" != typeof a) {
	            this.fromByteArray(a);
	        } else {
	            this.fromString(a, b);
	        }
	    }
	}

	// return new, unset BigInteger
	function nbi() {
	    return new BigInteger$4(null);
	}
	// Alternately, set max digit bits to 28 since some
	// browsers slow down when dealing with 32-bit numbers.
	function am3(i, x, w, j, c, n) {
	    var xl = x & 0x3fff, xh = x >> 14;
	    while (--n >= 0) {
	        var l = this[i] & 0x3fff;
	        var h = this[i++] >> 14;
	        var m = xh * l + h * xl;
	        l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
	        c = (l >> 28) + (m >> 14) + xh * h;
	        w[j++] = l & 0xfffffff;
	    }
	    return c;
	}

	// We need to select the fastest one that works in this environment. 
	//if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
	//	BigInteger.prototype.am = am2;
	//	dbits = 30;
	//} else if (j_lm && (navigator.appName != "Netscape")) {
	//	BigInteger.prototype.am = am1;
	//	dbits = 26;
	//} else { // Mozilla/Netscape seems to prefer am3
	//	BigInteger.prototype.am = am3;
	//	dbits = 28;
	//}

	// For node.js, we pick am3 with max dbits to 28.
	BigInteger$4.prototype.am = am3;
	dbits = 28;

	BigInteger$4.prototype.DB = dbits;
	BigInteger$4.prototype.DM = ((1 << dbits) - 1);
	BigInteger$4.prototype.DV = (1 << dbits);

	var BI_FP = 52;
	BigInteger$4.prototype.FV = Math.pow(2, BI_FP);
	BigInteger$4.prototype.F1 = BI_FP - dbits;
	BigInteger$4.prototype.F2 = 2 * dbits - BI_FP;

	// Digit conversions
	var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
	var BI_RC = new Array();
	var rr, vv;
	rr = "0".charCodeAt(0);
	for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
	rr = "a".charCodeAt(0);
	for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
	rr = "A".charCodeAt(0);
	for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

	function int2char(n) {
	    return BI_RM.charAt(n);
	}
	function intAt(s, i) {
	    var c = BI_RC[s.charCodeAt(i)];
	    return (c == null) ? -1 : c;
	}

	// (protected) copy this to r
	function bnpCopyTo(r) {
	    for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
	    r.t = this.t;
	    r.s = this.s;
	}

	// (protected) set from integer value x, -DV <= x < DV
	function bnpFromInt(x) {
	    this.t = 1;
	    this.s = (x < 0) ? -1 : 0;
	    if (x > 0) this[0] = x;
	    else if (x < -1) this[0] = x + DV;
	    else this.t = 0;
	}

	// return bigint initialized to value
	function nbv(i) {
	    var r = nbi();
	    r.fromInt(i);
	    return r;
	}

	// (protected) set from string and radix
	function bnpFromString(data, radix, unsigned) {
	    var k;
	    switch (radix) {
	        case 2:
	            k = 1;
	            break;
	        case 4:
	            k = 2;
	            break;
	        case 8:
	            k = 3;
	            break;
	        case 16:
	            k = 4;
	            break;
	        case 32:
	            k = 5;
	            break;
	        case 256:
	            k = 8;
	            break;
	        default:
	            this.fromRadix(data, radix);
	            return;
	    }

	    this.t = 0;
	    this.s = 0;

	    var i = data.length;
	    var mi = false;
	    var sh = 0;

	    while (--i >= 0) {
	        var x = (k == 8) ? data[i] & 0xff : intAt(data, i);
	        if (x < 0) {
	            if (data.charAt(i) == "-") mi = true;
	            continue;
	        }
	        mi = false;
	        if (sh === 0)
	            this[this.t++] = x;
	        else if (sh + k > this.DB) {
	            this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
	            this[this.t++] = (x >> (this.DB - sh));
	        }
	        else
	            this[this.t - 1] |= x << sh;
	        sh += k;
	        if (sh >= this.DB) sh -= this.DB;
	    }
	    if ((!unsigned) && k == 8 && (data[0] & 0x80) != 0) {
	        this.s = -1;
	        if (sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
	    }
	    this.clamp();
	    if (mi) BigInteger$4.ZERO.subTo(this, this);
	}

	function bnpFromByteArray(a, unsigned) {
	    this.fromString(a, 256, unsigned);
	}

	function bnpFromBuffer(a) {
	    this.fromString(a, 256, true);
	}

	// (protected) clamp off excess high words
	function bnpClamp() {
	    var c = this.s & this.DM;
	    while (this.t > 0 && this[this.t - 1] == c) --this.t;
	}

	// (public) return string representation in given radix
	function bnToString(b) {
	    if (this.s < 0) return "-" + this.negate().toString(b);
	    var k;
	    if (b == 16) k = 4;
	    else if (b == 8) k = 3;
	    else if (b == 2) k = 1;
	    else if (b == 32) k = 5;
	    else if (b == 4) k = 2;
	    else return this.toRadix(b);
	    var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
	    var p = this.DB - (i * this.DB) % k;
	    if (i-- > 0) {
	        if (p < this.DB && (d = this[i] >> p) > 0) {
	            m = true;
	            r = int2char(d);
	        }
	        while (i >= 0) {
	            if (p < k) {
	                d = (this[i] & ((1 << p) - 1)) << (k - p);
	                d |= this[--i] >> (p += this.DB - k);
	            }
	            else {
	                d = (this[i] >> (p -= k)) & km;
	                if (p <= 0) {
	                    p += this.DB;
	                    --i;
	                }
	            }
	            if (d > 0) m = true;
	            if (m) r += int2char(d);
	        }
	    }
	    return m ? r : "0";
	}

	// (public) -this
	function bnNegate() {
	    var r = nbi();
	    BigInteger$4.ZERO.subTo(this, r);
	    return r;
	}

	// (public) |this|
	function bnAbs() {
	    return (this.s < 0) ? this.negate() : this;
	}

	// (public) return + if this > a, - if this < a, 0 if equal
	function bnCompareTo(a) {
	    var r = this.s - a.s;
	    if (r != 0) return r;
	    var i = this.t;
	    r = i - a.t;
	    if (r != 0) return (this.s < 0) ? -r : r;
	    while (--i >= 0) if ((r = this[i] - a[i]) != 0) return r;
	    return 0;
	}

	// returns bit length of the integer x
	function nbits(x) {
	    var r = 1, t;
	    if ((t = x >>> 16) != 0) {
	        x = t;
	        r += 16;
	    }
	    if ((t = x >> 8) != 0) {
	        x = t;
	        r += 8;
	    }
	    if ((t = x >> 4) != 0) {
	        x = t;
	        r += 4;
	    }
	    if ((t = x >> 2) != 0) {
	        x = t;
	        r += 2;
	    }
	    if ((t = x >> 1) != 0) {
	        x = t;
	        r += 1;
	    }
	    return r;
	}

	// (public) return the number of bits in "this"
	function bnBitLength() {
	    if (this.t <= 0) return 0;
	    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
	}

	// (protected) r = this << n*DB
	function bnpDLShiftTo(n, r) {
	    var i;
	    for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
	    for (i = n - 1; i >= 0; --i) r[i] = 0;
	    r.t = this.t + n;
	    r.s = this.s;
	}

	// (protected) r = this >> n*DB
	function bnpDRShiftTo(n, r) {
	    for (var i = n; i < this.t; ++i) r[i - n] = this[i];
	    r.t = Math.max(this.t - n, 0);
	    r.s = this.s;
	}

	// (protected) r = this << n
	function bnpLShiftTo(n, r) {
	    var bs = n % this.DB;
	    var cbs = this.DB - bs;
	    var bm = (1 << cbs) - 1;
	    var ds = Math.floor(n / this.DB), c = (this.s << bs) & this.DM, i;
	    for (i = this.t - 1; i >= 0; --i) {
	        r[i + ds + 1] = (this[i] >> cbs) | c;
	        c = (this[i] & bm) << bs;
	    }
	    for (i = ds - 1; i >= 0; --i) r[i] = 0;
	    r[ds] = c;
	    r.t = this.t + ds + 1;
	    r.s = this.s;
	    r.clamp();
	}

	// (protected) r = this >> n
	function bnpRShiftTo(n, r) {
	    r.s = this.s;
	    var ds = Math.floor(n / this.DB);
	    if (ds >= this.t) {
	        r.t = 0;
	        return;
	    }
	    var bs = n % this.DB;
	    var cbs = this.DB - bs;
	    var bm = (1 << bs) - 1;
	    r[0] = this[ds] >> bs;
	    for (var i = ds + 1; i < this.t; ++i) {
	        r[i - ds - 1] |= (this[i] & bm) << cbs;
	        r[i - ds] = this[i] >> bs;
	    }
	    if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
	    r.t = this.t - ds;
	    r.clamp();
	}

	// (protected) r = this - a
	function bnpSubTo(a, r) {
	    var i = 0, c = 0, m = Math.min(a.t, this.t);
	    while (i < m) {
	        c += this[i] - a[i];
	        r[i++] = c & this.DM;
	        c >>= this.DB;
	    }
	    if (a.t < this.t) {
	        c -= a.s;
	        while (i < this.t) {
	            c += this[i];
	            r[i++] = c & this.DM;
	            c >>= this.DB;
	        }
	        c += this.s;
	    }
	    else {
	        c += this.s;
	        while (i < a.t) {
	            c -= a[i];
	            r[i++] = c & this.DM;
	            c >>= this.DB;
	        }
	        c -= a.s;
	    }
	    r.s = (c < 0) ? -1 : 0;
	    if (c < -1) r[i++] = this.DV + c;
	    else if (c > 0) r[i++] = c;
	    r.t = i;
	    r.clamp();
	}

	// (protected) r = this * a, r != this,a (HAC 14.12)
	// "this" should be the larger one if appropriate.
	function bnpMultiplyTo(a, r) {
	    var x = this.abs(), y = a.abs();
	    var i = x.t;
	    r.t = i + y.t;
	    while (--i >= 0) r[i] = 0;
	    for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
	    r.s = 0;
	    r.clamp();
	    if (this.s != a.s) BigInteger$4.ZERO.subTo(r, r);
	}

	// (protected) r = this^2, r != this (HAC 14.16)
	function bnpSquareTo(r) {
	    var x = this.abs();
	    var i = r.t = 2 * x.t;
	    while (--i >= 0) r[i] = 0;
	    for (i = 0; i < x.t - 1; ++i) {
	        var c = x.am(i, x[i], r, 2 * i, 0, 1);
	        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
	            r[i + x.t] -= x.DV;
	            r[i + x.t + 1] = 1;
	        }
	    }
	    if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
	    r.s = 0;
	    r.clamp();
	}

	// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
	// r != q, this != m.  q or r may be null.
	function bnpDivRemTo(m, q, r) {
	    var pm = m.abs();
	    if (pm.t <= 0) return;
	    var pt = this.abs();
	    if (pt.t < pm.t) {
	        if (q != null) q.fromInt(0);
	        if (r != null) this.copyTo(r);
	        return;
	    }
	    if (r == null) r = nbi();
	    var y = nbi(), ts = this.s, ms = m.s;
	    var nsh = this.DB - nbits(pm[pm.t - 1]);	// normalize modulus
	    if (nsh > 0) {
	        pm.lShiftTo(nsh, y);
	        pt.lShiftTo(nsh, r);
	    }
	    else {
	        pm.copyTo(y);
	        pt.copyTo(r);
	    }
	    var ys = y.t;
	    var y0 = y[ys - 1];
	    if (y0 === 0) return;
	    var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
	    var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
	    var i = r.t, j = i - ys, t = (q == null) ? nbi() : q;
	    y.dlShiftTo(j, t);
	    if (r.compareTo(t) >= 0) {
	        r[r.t++] = 1;
	        r.subTo(t, r);
	    }
	    BigInteger$4.ONE.dlShiftTo(ys, t);
	    t.subTo(y, y);	// "negative" y so we can replace sub with am later
	    while (y.t < ys) y[y.t++] = 0;
	    while (--j >= 0) {
	        // Estimate quotient digit
	        var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
	        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {	// Try it out
	            y.dlShiftTo(j, t);
	            r.subTo(t, r);
	            while (r[i] < --qd) r.subTo(t, r);
	        }
	    }
	    if (q != null) {
	        r.drShiftTo(ys, q);
	        if (ts != ms) BigInteger$4.ZERO.subTo(q, q);
	    }
	    r.t = ys;
	    r.clamp();
	    if (nsh > 0) r.rShiftTo(nsh, r);	// Denormalize remainder
	    if (ts < 0) BigInteger$4.ZERO.subTo(r, r);
	}

	// (public) this mod a
	function bnMod(a) {
	    var r = nbi();
	    this.abs().divRemTo(a, null, r);
	    if (this.s < 0 && r.compareTo(BigInteger$4.ZERO) > 0) a.subTo(r, r);
	    return r;
	}

	// Modular reduction using "classic" algorithm
	function Classic(m) {
	    this.m = m;
	}
	function cConvert(x) {
	    if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
	    else return x;
	}
	function cRevert(x) {
	    return x;
	}
	function cReduce(x) {
	    x.divRemTo(this.m, null, x);
	}
	function cMulTo(x, y, r) {
	    x.multiplyTo(y, r);
	    this.reduce(r);
	}
	function cSqrTo(x, r) {
	    x.squareTo(r);
	    this.reduce(r);
	}

	Classic.prototype.convert = cConvert;
	Classic.prototype.revert = cRevert;
	Classic.prototype.reduce = cReduce;
	Classic.prototype.mulTo = cMulTo;
	Classic.prototype.sqrTo = cSqrTo;

	// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
	// justification:
	//         xy == 1 (mod m)
	//         xy =  1+km
	//   xy(2-xy) = (1+km)(1-km)
	// x[y(2-xy)] = 1-k^2m^2
	// x[y(2-xy)] == 1 (mod m^2)
	// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
	// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
	// JS multiply "overflows" differently from C/C++, so care is needed here.
	function bnpInvDigit() {
	    if (this.t < 1) return 0;
	    var x = this[0];
	    if ((x & 1) === 0) return 0;
	    var y = x & 3;		// y == 1/x mod 2^2
	    y = (y * (2 - (x & 0xf) * y)) & 0xf;	// y == 1/x mod 2^4
	    y = (y * (2 - (x & 0xff) * y)) & 0xff;	// y == 1/x mod 2^8
	    y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff;	// y == 1/x mod 2^16
	    // last step - calculate inverse mod DV directly;
	    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
	    y = (y * (2 - x * y % this.DV)) % this.DV;		// y == 1/x mod 2^dbits
	    // we really want the negative inverse, and -DV < y < DV
	    return (y > 0) ? this.DV - y : -y;
	}

	// Montgomery reduction
	function Montgomery(m) {
	    this.m = m;
	    this.mp = m.invDigit();
	    this.mpl = this.mp & 0x7fff;
	    this.mph = this.mp >> 15;
	    this.um = (1 << (m.DB - 15)) - 1;
	    this.mt2 = 2 * m.t;
	}

	// xR mod m
	function montConvert(x) {
	    var r = nbi();
	    x.abs().dlShiftTo(this.m.t, r);
	    r.divRemTo(this.m, null, r);
	    if (x.s < 0 && r.compareTo(BigInteger$4.ZERO) > 0) this.m.subTo(r, r);
	    return r;
	}

	// x/R mod m
	function montRevert(x) {
	    var r = nbi();
	    x.copyTo(r);
	    this.reduce(r);
	    return r;
	}

	// x = x/R mod m (HAC 14.32)
	function montReduce(x) {
	    while (x.t <= this.mt2)	// pad x so am has enough room later
	        x[x.t++] = 0;
	    for (var i = 0; i < this.m.t; ++i) {
	        // faster way of calculating u0 = x[i]*mp mod DV
	        var j = x[i] & 0x7fff;
	        var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
	        // use am to combine the multiply-shift-add into one call
	        j = i + this.m.t;
	        x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
	        // propagate carry
	        while (x[j] >= x.DV) {
	            x[j] -= x.DV;
	            x[++j]++;
	        }
	    }
	    x.clamp();
	    x.drShiftTo(this.m.t, x);
	    if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
	}

	// r = "x^2/R mod m"; x != r
	function montSqrTo(x, r) {
	    x.squareTo(r);
	    this.reduce(r);
	}

	// r = "xy/R mod m"; x,y != r
	function montMulTo(x, y, r) {
	    x.multiplyTo(y, r);
	    this.reduce(r);
	}

	Montgomery.prototype.convert = montConvert;
	Montgomery.prototype.revert = montRevert;
	Montgomery.prototype.reduce = montReduce;
	Montgomery.prototype.mulTo = montMulTo;
	Montgomery.prototype.sqrTo = montSqrTo;

	// (protected) true iff this is even
	function bnpIsEven() {
	    return ((this.t > 0) ? (this[0] & 1) : this.s) === 0;
	}

	// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
	function bnpExp(e, z) {
	    if (e > 0xffffffff || e < 1) return BigInteger$4.ONE;
	    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
	    g.copyTo(r);
	    while (--i >= 0) {
	        z.sqrTo(r, r2);
	        if ((e & (1 << i)) > 0) z.mulTo(r2, g, r);
	        else {
	            var t = r;
	            r = r2;
	            r2 = t;
	        }
	    }
	    return z.revert(r);
	}

	// (public) this^e % m, 0 <= e < 2^32
	function bnModPowInt(e, m) {
	    var z;
	    if (e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
	    return this.exp(e, z);
	}

	// Copyright (c) 2005-2009  Tom Wu
	// All Rights Reserved.
	// See "LICENSE" for details.

	// Extended JavaScript BN functions, required for RSA private ops.

	// Version 1.1: new BigInteger("0", 10) returns "proper" zero
	// Version 1.2: square() API, isProbablePrime fix

	//(public)
	function bnClone() {
	    var r = nbi();
	    this.copyTo(r);
	    return r;
	}

	//(public) return value as integer
	function bnIntValue() {
	    if (this.s < 0) {
	        if (this.t == 1) return this[0] - this.DV;
	        else if (this.t === 0) return -1;
	    }
	    else if (this.t == 1) return this[0];
	    else if (this.t === 0) return 0;
	// assumes 16 < DB < 32
	    return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
	}

	//(public) return value as byte
	function bnByteValue() {
	    return (this.t == 0) ? this.s : (this[0] << 24) >> 24;
	}

	//(public) return value as short (assumes DB>=16)
	function bnShortValue() {
	    return (this.t == 0) ? this.s : (this[0] << 16) >> 16;
	}

	//(protected) return x s.t. r^x < DV
	function bnpChunkSize(r) {
	    return Math.floor(Math.LN2 * this.DB / Math.log(r));
	}

	//(public) 0 if this === 0, 1 if this > 0
	function bnSigNum() {
	    if (this.s < 0) return -1;
	    else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
	    else return 1;
	}

	//(protected) convert to radix string
	function bnpToRadix(b) {
	    if (b == null) b = 10;
	    if (this.signum() === 0 || b < 2 || b > 36) return "0";
	    var cs = this.chunkSize(b);
	    var a = Math.pow(b, cs);
	    var d = nbv(a), y = nbi(), z = nbi(), r = "";
	    this.divRemTo(d, y, z);
	    while (y.signum() > 0) {
	        r = (a + z.intValue()).toString(b).substr(1) + r;
	        y.divRemTo(d, y, z);
	    }
	    return z.intValue().toString(b) + r;
	}

	//(protected) convert from radix string
	function bnpFromRadix(s, b) {
	    this.fromInt(0);
	    if (b == null) b = 10;
	    var cs = this.chunkSize(b);
	    var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
	    for (var i = 0; i < s.length; ++i) {
	        var x = intAt(s, i);
	        if (x < 0) {
	            if (s.charAt(i) == "-" && this.signum() === 0) mi = true;
	            continue;
	        }
	        w = b * w + x;
	        if (++j >= cs) {
	            this.dMultiply(d);
	            this.dAddOffset(w, 0);
	            j = 0;
	            w = 0;
	        }
	    }
	    if (j > 0) {
	        this.dMultiply(Math.pow(b, j));
	        this.dAddOffset(w, 0);
	    }
	    if (mi) BigInteger$4.ZERO.subTo(this, this);
	}

	//(protected) alternate constructor
	function bnpFromNumber(a, b) {
	    if ("number" == typeof b) {
	        // new BigInteger(int,int,RNG)
	        if (a < 2) this.fromInt(1);
	        else {
	            this.fromNumber(a);
	            if (!this.testBit(a - 1))	// force MSB set
	                this.bitwiseTo(BigInteger$4.ONE.shiftLeft(a - 1), op_or, this);
	            if (this.isEven()) this.dAddOffset(1, 0); // force odd
	            while (!this.isProbablePrime(b)) {
	                this.dAddOffset(2, 0);
	                if (this.bitLength() > a) this.subTo(BigInteger$4.ONE.shiftLeft(a - 1), this);
	            }
	        }
	    } else {
	        // new BigInteger(int,RNG)
	        var x = crypt$3.randomBytes((a >> 3) + 1);
	        var t = a & 7;

	        if (t > 0)
	            x[0] &= ((1 << t) - 1);
	        else
	            x[0] = 0;

	        this.fromByteArray(x);
	    }
	}

	//(public) convert to bigendian byte array
	function bnToByteArray() {
	    var i = this.t, r = new Array();
	    r[0] = this.s;
	    var p = this.DB - (i * this.DB) % 8, d, k = 0;
	    if (i-- > 0) {
	        if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
	            r[k++] = d | (this.s << (this.DB - p));
	        while (i >= 0) {
	            if (p < 8) {
	                d = (this[i] & ((1 << p) - 1)) << (8 - p);
	                d |= this[--i] >> (p += this.DB - 8);
	            }
	            else {
	                d = (this[i] >> (p -= 8)) & 0xff;
	                if (p <= 0) {
	                    p += this.DB;
	                    --i;
	                }
	            }
	            if ((d & 0x80) != 0) d |= -256;
	            if (k === 0 && (this.s & 0x80) != (d & 0x80)) ++k;
	            if (k > 0 || d != this.s) r[k++] = d;
	        }
	    }
	    return r;
	}

	/**
	 * return Buffer object
	 * @param trim {boolean} slice buffer if first element == 0
	 * @returns {Buffer}
	 */
	function bnToBuffer(trimOrSize) {
	    var res = Buffer.from(this.toByteArray());
	    if (trimOrSize === true && res[0] === 0) {
	        res = res.slice(1);
	    } else if (_$2.isNumber(trimOrSize)) {
	        if (res.length > trimOrSize) {
	            for (var i = 0; i < res.length - trimOrSize; i++) {
	                if (res[i] !== 0) {
	                    return null;
	                }
	            }
	            return res.slice(res.length - trimOrSize);
	        } else if (res.length < trimOrSize) {
	            var padded = Buffer.alloc(trimOrSize);
	            padded.fill(0, 0, trimOrSize - res.length);
	            res.copy(padded, trimOrSize - res.length);
	            return padded;
	        }
	    }
	    return res;
	}

	function bnEquals(a) {
	    return (this.compareTo(a) == 0);
	}
	function bnMin(a) {
	    return (this.compareTo(a) < 0) ? this : a;
	}
	function bnMax(a) {
	    return (this.compareTo(a) > 0) ? this : a;
	}

	//(protected) r = this op a (bitwise)
	function bnpBitwiseTo(a, op, r) {
	    var i, f, m = Math.min(a.t, this.t);
	    for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);
	    if (a.t < this.t) {
	        f = a.s & this.DM;
	        for (i = m; i < this.t; ++i) r[i] = op(this[i], f);
	        r.t = this.t;
	    }
	    else {
	        f = this.s & this.DM;
	        for (i = m; i < a.t; ++i) r[i] = op(f, a[i]);
	        r.t = a.t;
	    }
	    r.s = op(this.s, a.s);
	    r.clamp();
	}

	//(public) this & a
	function op_and(x, y) {
	    return x & y;
	}
	function bnAnd(a) {
	    var r = nbi();
	    this.bitwiseTo(a, op_and, r);
	    return r;
	}

	//(public) this | a
	function op_or(x, y) {
	    return x | y;
	}
	function bnOr(a) {
	    var r = nbi();
	    this.bitwiseTo(a, op_or, r);
	    return r;
	}

	//(public) this ^ a
	function op_xor(x, y) {
	    return x ^ y;
	}
	function bnXor(a) {
	    var r = nbi();
	    this.bitwiseTo(a, op_xor, r);
	    return r;
	}

	//(public) this & ~a
	function op_andnot(x, y) {
	    return x & ~y;
	}
	function bnAndNot(a) {
	    var r = nbi();
	    this.bitwiseTo(a, op_andnot, r);
	    return r;
	}

	//(public) ~this
	function bnNot() {
	    var r = nbi();
	    for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
	    r.t = this.t;
	    r.s = ~this.s;
	    return r;
	}

	//(public) this << n
	function bnShiftLeft(n) {
	    var r = nbi();
	    if (n < 0) this.rShiftTo(-n, r); else this.lShiftTo(n, r);
	    return r;
	}

	//(public) this >> n
	function bnShiftRight(n) {
	    var r = nbi();
	    if (n < 0) this.lShiftTo(-n, r); else this.rShiftTo(n, r);
	    return r;
	}

	//return index of lowest 1-bit in x, x < 2^31
	function lbit(x) {
	    if (x === 0) return -1;
	    var r = 0;
	    if ((x & 0xffff) === 0) {
	        x >>= 16;
	        r += 16;
	    }
	    if ((x & 0xff) === 0) {
	        x >>= 8;
	        r += 8;
	    }
	    if ((x & 0xf) === 0) {
	        x >>= 4;
	        r += 4;
	    }
	    if ((x & 3) === 0) {
	        x >>= 2;
	        r += 2;
	    }
	    if ((x & 1) === 0) ++r;
	    return r;
	}

	//(public) returns index of lowest 1-bit (or -1 if none)
	function bnGetLowestSetBit() {
	    for (var i = 0; i < this.t; ++i)
	        if (this[i] != 0) return i * this.DB + lbit(this[i]);
	    if (this.s < 0) return this.t * this.DB;
	    return -1;
	}

	//return number of 1 bits in x
	function cbit(x) {
	    var r = 0;
	    while (x != 0) {
	        x &= x - 1;
	        ++r;
	    }
	    return r;
	}

	//(public) return number of set bits
	function bnBitCount() {
	    var r = 0, x = this.s & this.DM;
	    for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
	    return r;
	}

	//(public) true iff nth bit is set
	function bnTestBit(n) {
	    var j = Math.floor(n / this.DB);
	    if (j >= this.t) return (this.s != 0);
	    return ((this[j] & (1 << (n % this.DB))) != 0);
	}

	//(protected) this op (1<<n)
	function bnpChangeBit(n, op) {
	    var r = BigInteger$4.ONE.shiftLeft(n);
	    this.bitwiseTo(r, op, r);
	    return r;
	}

	//(public) this | (1<<n)
	function bnSetBit(n) {
	    return this.changeBit(n, op_or);
	}

	//(public) this & ~(1<<n)
	function bnClearBit(n) {
	    return this.changeBit(n, op_andnot);
	}

	//(public) this ^ (1<<n)
	function bnFlipBit(n) {
	    return this.changeBit(n, op_xor);
	}

	//(protected) r = this + a
	function bnpAddTo(a, r) {
	    var i = 0, c = 0, m = Math.min(a.t, this.t);
	    while (i < m) {
	        c += this[i] + a[i];
	        r[i++] = c & this.DM;
	        c >>= this.DB;
	    }
	    if (a.t < this.t) {
	        c += a.s;
	        while (i < this.t) {
	            c += this[i];
	            r[i++] = c & this.DM;
	            c >>= this.DB;
	        }
	        c += this.s;
	    }
	    else {
	        c += this.s;
	        while (i < a.t) {
	            c += a[i];
	            r[i++] = c & this.DM;
	            c >>= this.DB;
	        }
	        c += a.s;
	    }
	    r.s = (c < 0) ? -1 : 0;
	    if (c > 0) r[i++] = c;
	    else if (c < -1) r[i++] = this.DV + c;
	    r.t = i;
	    r.clamp();
	}

	//(public) this + a
	function bnAdd(a) {
	    var r = nbi();
	    this.addTo(a, r);
	    return r;
	}

	//(public) this - a
	function bnSubtract(a) {
	    var r = nbi();
	    this.subTo(a, r);
	    return r;
	}

	//(public) this * a
	function bnMultiply(a) {
	    var r = nbi();
	    this.multiplyTo(a, r);
	    return r;
	}

	// (public) this^2
	function bnSquare() {
	    var r = nbi();
	    this.squareTo(r);
	    return r;
	}

	//(public) this / a
	function bnDivide(a) {
	    var r = nbi();
	    this.divRemTo(a, r, null);
	    return r;
	}

	//(public) this % a
	function bnRemainder(a) {
	    var r = nbi();
	    this.divRemTo(a, null, r);
	    return r;
	}

	//(public) [this/a,this%a]
	function bnDivideAndRemainder(a) {
	    var q = nbi(), r = nbi();
	    this.divRemTo(a, q, r);
	    return new Array(q, r);
	}

	//(protected) this *= n, this >= 0, 1 < n < DV
	function bnpDMultiply(n) {
	    this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
	    ++this.t;
	    this.clamp();
	}

	//(protected) this += n << w words, this >= 0
	function bnpDAddOffset(n, w) {
	    if (n === 0) return;
	    while (this.t <= w) this[this.t++] = 0;
	    this[w] += n;
	    while (this[w] >= this.DV) {
	        this[w] -= this.DV;
	        if (++w >= this.t) this[this.t++] = 0;
	        ++this[w];
	    }
	}

	//A "null" reducer
	function NullExp() {
	}
	function nNop(x) {
	    return x;
	}
	function nMulTo(x, y, r) {
	    x.multiplyTo(y, r);
	}
	function nSqrTo(x, r) {
	    x.squareTo(r);
	}

	NullExp.prototype.convert = nNop;
	NullExp.prototype.revert = nNop;
	NullExp.prototype.mulTo = nMulTo;
	NullExp.prototype.sqrTo = nSqrTo;

	//(public) this^e
	function bnPow(e) {
	    return this.exp(e, new NullExp());
	}

	//(protected) r = lower n words of "this * a", a.t <= n
	//"this" should be the larger one if appropriate.
	function bnpMultiplyLowerTo(a, n, r) {
	    var i = Math.min(this.t + a.t, n);
	    r.s = 0; // assumes a,this >= 0
	    r.t = i;
	    while (i > 0) r[--i] = 0;
	    var j;
	    for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
	    for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);
	    r.clamp();
	}

	//(protected) r = "this * a" without lower n words, n > 0
	//"this" should be the larger one if appropriate.
	function bnpMultiplyUpperTo(a, n, r) {
	    --n;
	    var i = r.t = this.t + a.t - n;
	    r.s = 0; // assumes a,this >= 0
	    while (--i >= 0) r[i] = 0;
	    for (i = Math.max(n - this.t, 0); i < a.t; ++i)
	        r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
	    r.clamp();
	    r.drShiftTo(1, r);
	}

	//Barrett modular reduction
	function Barrett(m) {
	// setup Barrett
	    this.r2 = nbi();
	    this.q3 = nbi();
	    BigInteger$4.ONE.dlShiftTo(2 * m.t, this.r2);
	    this.mu = this.r2.divide(m);
	    this.m = m;
	}

	function barrettConvert(x) {
	    if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
	    else if (x.compareTo(this.m) < 0) return x;
	    else {
	        var r = nbi();
	        x.copyTo(r);
	        this.reduce(r);
	        return r;
	    }
	}

	function barrettRevert(x) {
	    return x;
	}

	//x = x mod m (HAC 14.42)
	function barrettReduce(x) {
	    x.drShiftTo(this.m.t - 1, this.r2);
	    if (x.t > this.m.t + 1) {
	        x.t = this.m.t + 1;
	        x.clamp();
	    }
	    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
	    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
	    while (x.compareTo(this.r2) < 0) x.dAddOffset(1, this.m.t + 1);
	    x.subTo(this.r2, x);
	    while (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
	}

	//r = x^2 mod m; x != r
	function barrettSqrTo(x, r) {
	    x.squareTo(r);
	    this.reduce(r);
	}

	//r = x*y mod m; x,y != r
	function barrettMulTo(x, y, r) {
	    x.multiplyTo(y, r);
	    this.reduce(r);
	}

	Barrett.prototype.convert = barrettConvert;
	Barrett.prototype.revert = barrettRevert;
	Barrett.prototype.reduce = barrettReduce;
	Barrett.prototype.mulTo = barrettMulTo;
	Barrett.prototype.sqrTo = barrettSqrTo;

	//(public) this^e % m (HAC 14.85)
	function bnModPow(e, m) {
	    var i = e.bitLength(), k, r = nbv(1), z;
	    if (i <= 0) return r;
	    else if (i < 18) k = 1;
	    else if (i < 48) k = 3;
	    else if (i < 144) k = 4;
	    else if (i < 768) k = 5;
	    else k = 6;
	    if (i < 8)
	        z = new Classic(m);
	    else if (m.isEven())
	        z = new Barrett(m);
	    else
	        z = new Montgomery(m);

	// precomputation
	    var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
	    g[1] = z.convert(this);
	    if (k > 1) {
	        var g2 = nbi();
	        z.sqrTo(g[1], g2);
	        while (n <= km) {
	            g[n] = nbi();
	            z.mulTo(g2, g[n - 2], g[n]);
	            n += 2;
	        }
	    }

	    var j = e.t - 1, w, is1 = true, r2 = nbi(), t;
	    i = nbits(e[j]) - 1;
	    while (j >= 0) {
	        if (i >= k1) w = (e[j] >> (i - k1)) & km;
	        else {
	            w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
	            if (j > 0) w |= e[j - 1] >> (this.DB + i - k1);
	        }

	        n = k;
	        while ((w & 1) === 0) {
	            w >>= 1;
	            --n;
	        }
	        if ((i -= n) < 0) {
	            i += this.DB;
	            --j;
	        }
	        if (is1) {	// ret == 1, don't bother squaring or multiplying it
	            g[w].copyTo(r);
	            is1 = false;
	        }
	        else {
	            while (n > 1) {
	                z.sqrTo(r, r2);
	                z.sqrTo(r2, r);
	                n -= 2;
	            }
	            if (n > 0) z.sqrTo(r, r2); else {
	                t = r;
	                r = r2;
	                r2 = t;
	            }
	            z.mulTo(r2, g[w], r);
	        }

	        while (j >= 0 && (e[j] & (1 << i)) === 0) {
	            z.sqrTo(r, r2);
	            t = r;
	            r = r2;
	            r2 = t;
	            if (--i < 0) {
	                i = this.DB - 1;
	                --j;
	            }
	        }
	    }
	    return z.revert(r);
	}

	//(public) gcd(this,a) (HAC 14.54)
	function bnGCD(a) {
	    var x = (this.s < 0) ? this.negate() : this.clone();
	    var y = (a.s < 0) ? a.negate() : a.clone();
	    if (x.compareTo(y) < 0) {
	        var t = x;
	        x = y;
	        y = t;
	    }
	    var i = x.getLowestSetBit(), g = y.getLowestSetBit();
	    if (g < 0) return x;
	    if (i < g) g = i;
	    if (g > 0) {
	        x.rShiftTo(g, x);
	        y.rShiftTo(g, y);
	    }
	    while (x.signum() > 0) {
	        if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
	        if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);
	        if (x.compareTo(y) >= 0) {
	            x.subTo(y, x);
	            x.rShiftTo(1, x);
	        }
	        else {
	            y.subTo(x, y);
	            y.rShiftTo(1, y);
	        }
	    }
	    if (g > 0) y.lShiftTo(g, y);
	    return y;
	}

	//(protected) this % n, n < 2^26
	function bnpModInt(n) {
	    if (n <= 0) return 0;
	    var d = this.DV % n, r = (this.s < 0) ? n - 1 : 0;
	    if (this.t > 0)
	        if (d === 0) r = this[0] % n;
	        else for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
	    return r;
	}

	//(public) 1/this % m (HAC 14.61)
	function bnModInverse(m) {
	    var ac = m.isEven();
	    if ((this.isEven() && ac) || m.signum() === 0) return BigInteger$4.ZERO;
	    var u = m.clone(), v = this.clone();
	    var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
	    while (u.signum() != 0) {
	        while (u.isEven()) {
	            u.rShiftTo(1, u);
	            if (ac) {
	                if (!a.isEven() || !b.isEven()) {
	                    a.addTo(this, a);
	                    b.subTo(m, b);
	                }
	                a.rShiftTo(1, a);
	            }
	            else if (!b.isEven()) b.subTo(m, b);
	            b.rShiftTo(1, b);
	        }
	        while (v.isEven()) {
	            v.rShiftTo(1, v);
	            if (ac) {
	                if (!c.isEven() || !d.isEven()) {
	                    c.addTo(this, c);
	                    d.subTo(m, d);
	                }
	                c.rShiftTo(1, c);
	            }
	            else if (!d.isEven()) d.subTo(m, d);
	            d.rShiftTo(1, d);
	        }
	        if (u.compareTo(v) >= 0) {
	            u.subTo(v, u);
	            if (ac) a.subTo(c, a);
	            b.subTo(d, b);
	        }
	        else {
	            v.subTo(u, v);
	            if (ac) c.subTo(a, c);
	            d.subTo(b, d);
	        }
	    }
	    if (v.compareTo(BigInteger$4.ONE) != 0) return BigInteger$4.ZERO;
	    if (d.compareTo(m) >= 0) return d.subtract(m);
	    if (d.signum() < 0) d.addTo(m, d); else return d;
	    if (d.signum() < 0) return d.add(m); else return d;
	}

	var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
	var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];

	//(public) test primality with certainty >= 1-.5^t
	function bnIsProbablePrime(t) {
	    var i, x = this.abs();
	    if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
	        for (i = 0; i < lowprimes.length; ++i)
	            if (x[0] == lowprimes[i]) return true;
	        return false;
	    }
	    if (x.isEven()) return false;
	    i = 1;
	    while (i < lowprimes.length) {
	        var m = lowprimes[i], j = i + 1;
	        while (j < lowprimes.length && m < lplim) m *= lowprimes[j++];
	        m = x.modInt(m);
	        while (i < j) if (m % lowprimes[i++] === 0) return false;
	    }
	    return x.millerRabin(t);
	}

	//(protected) true if probably prime (HAC 4.24, Miller-Rabin)
	function bnpMillerRabin(t) {
	    var n1 = this.subtract(BigInteger$4.ONE);
	    var k = n1.getLowestSetBit();
	    if (k <= 0) return false;
	    var r = n1.shiftRight(k);
	    t = (t + 1) >> 1;
	    if (t > lowprimes.length) t = lowprimes.length;
	    var a = nbi();
	    for (var i = 0; i < t; ++i) {
	        //Pick bases at random, instead of starting at 2
	        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
	        var y = a.modPow(r, this);
	        if (y.compareTo(BigInteger$4.ONE) != 0 && y.compareTo(n1) != 0) {
	            var j = 1;
	            while (j++ < k && y.compareTo(n1) != 0) {
	                y = y.modPowInt(2, this);
	                if (y.compareTo(BigInteger$4.ONE) === 0) return false;
	            }
	            if (y.compareTo(n1) != 0) return false;
	        }
	    }
	    return true;
	}

	// protected
	BigInteger$4.prototype.copyTo = bnpCopyTo;
	BigInteger$4.prototype.fromInt = bnpFromInt;
	BigInteger$4.prototype.fromString = bnpFromString;
	BigInteger$4.prototype.fromByteArray = bnpFromByteArray;
	BigInteger$4.prototype.fromBuffer = bnpFromBuffer;
	BigInteger$4.prototype.clamp = bnpClamp;
	BigInteger$4.prototype.dlShiftTo = bnpDLShiftTo;
	BigInteger$4.prototype.drShiftTo = bnpDRShiftTo;
	BigInteger$4.prototype.lShiftTo = bnpLShiftTo;
	BigInteger$4.prototype.rShiftTo = bnpRShiftTo;
	BigInteger$4.prototype.subTo = bnpSubTo;
	BigInteger$4.prototype.multiplyTo = bnpMultiplyTo;
	BigInteger$4.prototype.squareTo = bnpSquareTo;
	BigInteger$4.prototype.divRemTo = bnpDivRemTo;
	BigInteger$4.prototype.invDigit = bnpInvDigit;
	BigInteger$4.prototype.isEven = bnpIsEven;
	BigInteger$4.prototype.exp = bnpExp;

	BigInteger$4.prototype.chunkSize = bnpChunkSize;
	BigInteger$4.prototype.toRadix = bnpToRadix;
	BigInteger$4.prototype.fromRadix = bnpFromRadix;
	BigInteger$4.prototype.fromNumber = bnpFromNumber;
	BigInteger$4.prototype.bitwiseTo = bnpBitwiseTo;
	BigInteger$4.prototype.changeBit = bnpChangeBit;
	BigInteger$4.prototype.addTo = bnpAddTo;
	BigInteger$4.prototype.dMultiply = bnpDMultiply;
	BigInteger$4.prototype.dAddOffset = bnpDAddOffset;
	BigInteger$4.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
	BigInteger$4.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
	BigInteger$4.prototype.modInt = bnpModInt;
	BigInteger$4.prototype.millerRabin = bnpMillerRabin;


	// public
	BigInteger$4.prototype.toString = bnToString;
	BigInteger$4.prototype.negate = bnNegate;
	BigInteger$4.prototype.abs = bnAbs;
	BigInteger$4.prototype.compareTo = bnCompareTo;
	BigInteger$4.prototype.bitLength = bnBitLength;
	BigInteger$4.prototype.mod = bnMod;
	BigInteger$4.prototype.modPowInt = bnModPowInt;

	BigInteger$4.prototype.clone = bnClone;
	BigInteger$4.prototype.intValue = bnIntValue;
	BigInteger$4.prototype.byteValue = bnByteValue;
	BigInteger$4.prototype.shortValue = bnShortValue;
	BigInteger$4.prototype.signum = bnSigNum;
	BigInteger$4.prototype.toByteArray = bnToByteArray;
	BigInteger$4.prototype.toBuffer = bnToBuffer;
	BigInteger$4.prototype.equals = bnEquals;
	BigInteger$4.prototype.min = bnMin;
	BigInteger$4.prototype.max = bnMax;
	BigInteger$4.prototype.and = bnAnd;
	BigInteger$4.prototype.or = bnOr;
	BigInteger$4.prototype.xor = bnXor;
	BigInteger$4.prototype.andNot = bnAndNot;
	BigInteger$4.prototype.not = bnNot;
	BigInteger$4.prototype.shiftLeft = bnShiftLeft;
	BigInteger$4.prototype.shiftRight = bnShiftRight;
	BigInteger$4.prototype.getLowestSetBit = bnGetLowestSetBit;
	BigInteger$4.prototype.bitCount = bnBitCount;
	BigInteger$4.prototype.testBit = bnTestBit;
	BigInteger$4.prototype.setBit = bnSetBit;
	BigInteger$4.prototype.clearBit = bnClearBit;
	BigInteger$4.prototype.flipBit = bnFlipBit;
	BigInteger$4.prototype.add = bnAdd;
	BigInteger$4.prototype.subtract = bnSubtract;
	BigInteger$4.prototype.multiply = bnMultiply;
	BigInteger$4.prototype.divide = bnDivide;
	BigInteger$4.prototype.remainder = bnRemainder;
	BigInteger$4.prototype.divideAndRemainder = bnDivideAndRemainder;
	BigInteger$4.prototype.modPow = bnModPow;
	BigInteger$4.prototype.modInverse = bnModInverse;
	BigInteger$4.prototype.pow = bnPow;
	BigInteger$4.prototype.gcd = bnGCD;
	BigInteger$4.prototype.isProbablePrime = bnIsProbablePrime;
	BigInteger$4.int2char = int2char;

	// "constants"
	BigInteger$4.ZERO = nbv(0);
	BigInteger$4.ONE = nbv(1);

	// JSBN-specific extension
	BigInteger$4.prototype.square = bnSquare;

	//BigInteger interfaces not implemented in jsbn:

	//BigInteger(int signum, byte[] magnitude)
	//double doubleValue()
	//float floatValue()
	//int hashCode()
	//long longValue()
	//static BigInteger valueOf(long val)

	var jsbn = BigInteger$4;

	var schemes$5 = {exports: {}};

	var pkcs1$1 = {exports: {}};

	/**
	 * PKCS1 padding and signature scheme
	 */

	var BigInteger$3 = jsbn;
	var crypt$2 = require$$0__default$4['default'];
	var constants$3 = require$$1__default['default'];
	var SIGN_INFO_HEAD = {
	    md2: Buffer.from('3020300c06082a864886f70d020205000410', 'hex'),
	    md5: Buffer.from('3020300c06082a864886f70d020505000410', 'hex'),
	    sha1: Buffer.from('3021300906052b0e03021a05000414', 'hex'),
	    sha224: Buffer.from('302d300d06096086480165030402040500041c', 'hex'),
	    sha256: Buffer.from('3031300d060960864801650304020105000420', 'hex'),
	    sha384: Buffer.from('3041300d060960864801650304020205000430', 'hex'),
	    sha512: Buffer.from('3051300d060960864801650304020305000440', 'hex'),
	    ripemd160: Buffer.from('3021300906052b2403020105000414', 'hex'),
	    rmd160: Buffer.from('3021300906052b2403020105000414', 'hex')
	};

	var SIGN_ALG_TO_HASH_ALIASES = {
	    'ripemd160': 'rmd160'
	};

	var DEFAULT_HASH_FUNCTION$1 = 'sha256';

	pkcs1$1.exports = {
	    isEncryption: true,
	    isSignature: true
	};

	pkcs1$1.exports.makeScheme = function (key, options) {
	    function Scheme(key, options) {
	        this.key = key;
	        this.options = options;
	    }

	    Scheme.prototype.maxMessageLength = function () {
	        if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants$3.RSA_NO_PADDING) {
	            return this.key.encryptedDataLength;
	        }
	        return this.key.encryptedDataLength - 11;
	    };

	    /**
	     * Pad input Buffer to encryptedDataLength bytes, and return Buffer.from
	     * alg: PKCS#1
	     * @param buffer
	     * @returns {Buffer}
	     */
	    Scheme.prototype.encPad = function (buffer, options) {
	        options = options || {};
	        var filled;
	        if (buffer.length > this.key.maxMessageLength) {
	            throw new Error("Message too long for RSA (n=" + this.key.encryptedDataLength + ", l=" + buffer.length + ")");
	        }
	        if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants$3.RSA_NO_PADDING) {
	            //RSA_NO_PADDING treated like JAVA left pad with zero character
	            filled = Buffer.alloc(this.key.maxMessageLength - buffer.length);
	            filled.fill(0);
	            return Buffer.concat([filled, buffer]);
	        }

	        /* Type 1: zeros padding for private key encrypt */
	        if (options.type === 1) {
	            filled = Buffer.alloc(this.key.encryptedDataLength - buffer.length - 1);
	            filled.fill(0xff, 0, filled.length - 1);
	            filled[0] = 1;
	            filled[filled.length - 1] = 0;

	            return Buffer.concat([filled, buffer]);
	        } else {
	            /* random padding for public key encrypt */
	            filled = Buffer.alloc(this.key.encryptedDataLength - buffer.length);
	            filled[0] = 0;
	            filled[1] = 2;
	            var rand = crypt$2.randomBytes(filled.length - 3);
	            for (var i = 0; i < rand.length; i++) {
	                var r = rand[i];
	                while (r === 0) { // non-zero only
	                    r = crypt$2.randomBytes(1)[0];
	                }
	                filled[i + 2] = r;
	            }
	            filled[filled.length - 1] = 0;
	            return Buffer.concat([filled, buffer]);
	        }
	    };

	    /**
	     * Unpad input Buffer and, if valid, return the Buffer object
	     * alg: PKCS#1 (type 2, random)
	     * @param buffer
	     * @returns {Buffer}
	     */
	    Scheme.prototype.encUnPad = function (buffer, options) {
	        options = options || {};
	        var i = 0;

	        if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants$3.RSA_NO_PADDING) {
	            //RSA_NO_PADDING treated like JAVA left pad with zero character
	            var unPad;
	            if (typeof buffer.lastIndexOf == "function") { //patch for old node version
	                unPad = buffer.slice(buffer.lastIndexOf('\0') + 1, buffer.length);
	            } else {
	                unPad = buffer.slice(String.prototype.lastIndexOf.call(buffer, '\0') + 1, buffer.length);
	            }
	            return unPad;
	        }

	        if (buffer.length < 4) {
	            return null;
	        }

	        /* Type 1: zeros padding for private key decrypt */
	        if (options.type === 1) {
	            if (buffer[0] !== 0 || buffer[1] !== 1) {
	                return null;
	            }
	            i = 3;
	            while (buffer[i] !== 0) {
	                if (buffer[i] != 0xFF || ++i >= buffer.length) {
	                    return null;
	                }
	            }
	        } else {
	            /* random padding for public key decrypt */
	            if (buffer[0] !== 0 || buffer[1] !== 2) {
	                return null;
	            }
	            i = 3;
	            while (buffer[i] !== 0) {
	                if (++i >= buffer.length) {
	                    return null;
	                }
	            }
	        }
	        return buffer.slice(i + 1, buffer.length);
	    };

	    Scheme.prototype.sign = function (buffer) {
	        var hashAlgorithm = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION$1;
	        if (this.options.environment === 'browser') {
	            hashAlgorithm = SIGN_ALG_TO_HASH_ALIASES[hashAlgorithm] || hashAlgorithm;

	            var hasher = crypt$2.createHash(hashAlgorithm);
	            hasher.update(buffer);
	            var hash = this.pkcs1pad(hasher.digest(), hashAlgorithm);
	            var res = this.key.$doPrivate(new BigInteger$3(hash)).toBuffer(this.key.encryptedDataLength);

	            return res;
	        } else {
	            var signer = crypt$2.createSign('RSA-' + hashAlgorithm.toUpperCase());
	            signer.update(buffer);
	            return signer.sign(this.options.rsaUtils.exportKey('private'));
	        }
	    };

	    Scheme.prototype.verify = function (buffer, signature, signature_encoding) {
	        if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants$3.RSA_NO_PADDING) {
	            //RSA_NO_PADDING has no verify data
	            return false;
	        }
	        var hashAlgorithm = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION$1;
	        if (this.options.environment === 'browser') {
	            hashAlgorithm = SIGN_ALG_TO_HASH_ALIASES[hashAlgorithm] || hashAlgorithm;

	            if (signature_encoding) {
	                signature = Buffer.from(signature, signature_encoding);
	            }

	            var hasher = crypt$2.createHash(hashAlgorithm);
	            hasher.update(buffer);
	            var hash = this.pkcs1pad(hasher.digest(), hashAlgorithm);
	            var m = this.key.$doPublic(new BigInteger$3(signature));

	            return m.toBuffer().toString('hex') == hash.toString('hex');
	        } else {
	            var verifier = crypt$2.createVerify('RSA-' + hashAlgorithm.toUpperCase());
	            verifier.update(buffer);
	            return verifier.verify(this.options.rsaUtils.exportKey('public'), signature, signature_encoding);
	        }
	    };

	    /**
	     * PKCS#1 zero pad input buffer to max data length
	     * @param hashBuf
	     * @param hashAlgorithm
	     * @returns {*}
	     */
	    Scheme.prototype.pkcs0pad = function (buffer) {
	        var filled = Buffer.alloc(this.key.maxMessageLength - buffer.length);
	        filled.fill(0);
	        return Buffer.concat([filled, buffer]);
	    };

	    Scheme.prototype.pkcs0unpad = function (buffer) {
	        var unPad;
	        if (typeof buffer.lastIndexOf == "function") { //patch for old node version
	            unPad = buffer.slice(buffer.lastIndexOf('\0') + 1, buffer.length);
	        } else {
	            unPad = buffer.slice(String.prototype.lastIndexOf.call(buffer, '\0') + 1, buffer.length);
	        }

	        return unPad;
	    };

	    /**
	     * PKCS#1 pad input buffer to max data length
	     * @param hashBuf
	     * @param hashAlgorithm
	     * @returns {*}
	     */
	    Scheme.prototype.pkcs1pad = function (hashBuf, hashAlgorithm) {
	        var digest = SIGN_INFO_HEAD[hashAlgorithm];
	        if (!digest) {
	            throw Error('Unsupported hash algorithm');
	        }

	        var data = Buffer.concat([digest, hashBuf]);

	        if (data.length + 10 > this.key.encryptedDataLength) {
	            throw Error('Key is too short for signing algorithm (' + hashAlgorithm + ')');
	        }

	        var filled = Buffer.alloc(this.key.encryptedDataLength - data.length - 1);
	        filled.fill(0xff, 0, filled.length - 1);
	        filled[0] = 1;
	        filled[filled.length - 1] = 0;

	        var res = Buffer.concat([filled, data]);

	        return res;
	    };

	    return new Scheme(key, options);
	};

	var oaep = {exports: {}};

	/**
	 * PKCS_OAEP signature scheme
	 */

	(function (module) {
	var crypt = require$$0__default$4['default'];

	module.exports = {
	    isEncryption: true,
	    isSignature: false
	};

	module.exports.digestLength = {
	    md4: 16,
	    md5: 16,
	    ripemd160: 20,
	    rmd160: 20,
	    sha1: 20,
	    sha224: 28,
	    sha256: 32,
	    sha384: 48,
	    sha512: 64
	};

	var DEFAULT_HASH_FUNCTION = 'sha1';

	/*
	 * OAEP Mask Generation Function 1
	 * Generates a buffer full of pseudorandom bytes given seed and maskLength.
	 * Giving the same seed, maskLength, and hashFunction will result in the same exact byte values in the buffer.
	 *
	 * https://tools.ietf.org/html/rfc3447#appendix-B.2.1
	 *
	 * Parameters:
	 * seed			[Buffer]	The pseudo random seed for this function
	 * maskLength	[int]		The length of the output
	 * hashFunction	[String]	The hashing function to use. Will accept any valid crypto hash. Default "sha1"
	 *		Supports "sha1" and "sha256".
	 *		To add another algorythm the algorythem must be accepted by crypto.createHash, and then the length of the output of the hash function (the digest) must be added to the digestLength object below.
	 *		Most RSA implementations will be expecting sha1
	 */
	module.exports.eme_oaep_mgf1 = function (seed, maskLength, hashFunction) {
	    hashFunction = hashFunction || DEFAULT_HASH_FUNCTION;
	    var hLen = module.exports.digestLength[hashFunction];
	    var count = Math.ceil(maskLength / hLen);
	    var T = Buffer.alloc(hLen * count);
	    var c = Buffer.alloc(4);
	    for (var i = 0; i < count; ++i) {
	        var hash = crypt.createHash(hashFunction);
	        hash.update(seed);
	        c.writeUInt32BE(i, 0);
	        hash.update(c);
	        hash.digest().copy(T, i * hLen);
	    }
	    return T.slice(0, maskLength);
	};

	module.exports.makeScheme = function (key, options) {
	    function Scheme(key, options) {
	        this.key = key;
	        this.options = options;
	    }

	    Scheme.prototype.maxMessageLength = function () {
	        return this.key.encryptedDataLength - 2 * module.exports.digestLength[this.options.encryptionSchemeOptions.hash || DEFAULT_HASH_FUNCTION] - 2;
	    };

	    /**
	     * Pad input
	     * alg: PKCS1_OAEP
	     *
	     * https://tools.ietf.org/html/rfc3447#section-7.1.1
	     */
	    Scheme.prototype.encPad = function (buffer) {
	        var hash = this.options.encryptionSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
	        var mgf = this.options.encryptionSchemeOptions.mgf || module.exports.eme_oaep_mgf1;
	        var label = this.options.encryptionSchemeOptions.label || Buffer.alloc(0);
	        var emLen = this.key.encryptedDataLength;

	        var hLen = module.exports.digestLength[hash];

	        // Make sure we can put message into an encoded message of emLen bytes
	        if (buffer.length > emLen - 2 * hLen - 2) {
	            throw new Error("Message is too long to encode into an encoded message with a length of " + emLen + " bytes, increase" +
	            "emLen to fix this error (minimum value for given parameters and options: " + (emLen - 2 * hLen - 2) + ")");
	        }

	        var lHash = crypt.createHash(hash);
	        lHash.update(label);
	        lHash = lHash.digest();

	        var PS = Buffer.alloc(emLen - buffer.length - 2 * hLen - 1); // Padding "String"
	        PS.fill(0); // Fill the buffer with octets of 0
	        PS[PS.length - 1] = 1;

	        var DB = Buffer.concat([lHash, PS, buffer]);
	        var seed = crypt.randomBytes(hLen);

	        // mask = dbMask
	        var mask = mgf(seed, DB.length, hash);
	        // XOR DB and dbMask together.
	        for (var i = 0; i < DB.length; i++) {
	            DB[i] ^= mask[i];
	        }
	        // DB = maskedDB

	        // mask = seedMask
	        mask = mgf(DB, hLen, hash);
	        // XOR seed and seedMask together.
	        for (i = 0; i < seed.length; i++) {
	            seed[i] ^= mask[i];
	        }
	        // seed = maskedSeed

	        var em = Buffer.alloc(1 + seed.length + DB.length);
	        em[0] = 0;
	        seed.copy(em, 1);
	        DB.copy(em, 1 + seed.length);

	        return em;
	    };

	    /**
	     * Unpad input
	     * alg: PKCS1_OAEP
	     *
	     * Note: This method works within the buffer given and modifies the values. It also returns a slice of the EM as the return Message.
	     * If the implementation requires that the EM parameter be unmodified then the implementation should pass in a clone of the EM buffer.
	     *
	     * https://tools.ietf.org/html/rfc3447#section-7.1.2
	     */
	    Scheme.prototype.encUnPad = function (buffer) {
	        var hash = this.options.encryptionSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
	        var mgf = this.options.encryptionSchemeOptions.mgf || module.exports.eme_oaep_mgf1;
	        var label = this.options.encryptionSchemeOptions.label || Buffer.alloc(0);

	        var hLen = module.exports.digestLength[hash];

	        // Check to see if buffer is a properly encoded OAEP message
	        if (buffer.length < 2 * hLen + 2) {
	            throw new Error("Error decoding message, the supplied message is not long enough to be a valid OAEP encoded message");
	        }

	        var seed = buffer.slice(1, hLen + 1);	// seed = maskedSeed
	        var DB = buffer.slice(1 + hLen);		// DB = maskedDB

	        var mask = mgf(DB, hLen, hash); // seedMask
	        // XOR maskedSeed and seedMask together to get the original seed.
	        for (var i = 0; i < seed.length; i++) {
	            seed[i] ^= mask[i];
	        }

	        mask = mgf(seed, DB.length, hash); // dbMask
	        // XOR DB and dbMask together to get the original data block.
	        for (i = 0; i < DB.length; i++) {
	            DB[i] ^= mask[i];
	        }

	        var lHash = crypt.createHash(hash);
	        lHash.update(label);
	        lHash = lHash.digest();

	        var lHashEM = DB.slice(0, hLen);
	        if (lHashEM.toString("hex") != lHash.toString("hex")) {
	            throw new Error("Error decoding message, the lHash calculated from the label provided and the lHash in the encrypted data do not match.");
	        }

	        // Filter out padding
	        i = hLen;
	        while (DB[i++] === 0 && i < DB.length);
	        if (DB[i - 1] != 1) {
	            throw new Error("Error decoding message, there is no padding message separator byte");
	        }

	        return DB.slice(i); // Message
	    };

	    return new Scheme(key, options);
	};
	}(oaep));

	var pss = {exports: {}};

	/**
	 * PSS signature scheme
	 */

	var BigInteger$2 = jsbn;
	var crypt$1 = require$$0__default$4['default'];

	pss.exports = {
	    isEncryption: false,
	    isSignature: true
	};

	var DEFAULT_HASH_FUNCTION = 'sha1';
	var DEFAULT_SALT_LENGTH = 20;

	pss.exports.makeScheme = function (key, options) {
	    var OAEP = schemes$5.exports.pkcs1_oaep;

	    /**
	     * @param key
	     * @param options
	     * options    [Object]    An object that contains the following keys that specify certain options for encoding.
	     *  └>signingSchemeOptions
	     *     ├>hash    [String]    Hash function to use when encoding and generating masks. Must be a string accepted by node's crypto.createHash function. (default = "sha1")
	     *     ├>mgf    [function]    The mask generation function to use when encoding. (default = mgf1SHA1)
	     *     └>sLen    [uint]        The length of the salt to generate. (default = 20)
	     * @constructor
	     */
	    function Scheme(key, options) {
	        this.key = key;
	        this.options = options;
	    }

	    Scheme.prototype.sign = function (buffer) {
	        var mHash = crypt$1.createHash(this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION);
	        mHash.update(buffer);

	        var encoded = this.emsa_pss_encode(mHash.digest(), this.key.keySize - 1);
	        return this.key.$doPrivate(new BigInteger$2(encoded)).toBuffer(this.key.encryptedDataLength);
	    };

	    Scheme.prototype.verify = function (buffer, signature, signature_encoding) {
	        if (signature_encoding) {
	            signature = Buffer.from(signature, signature_encoding);
	        }
	        signature = new BigInteger$2(signature);

	        var emLen = Math.ceil((this.key.keySize - 1) / 8);
	        var m = this.key.$doPublic(signature).toBuffer(emLen);

	        var mHash = crypt$1.createHash(this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION);
	        mHash.update(buffer);

	        return this.emsa_pss_verify(mHash.digest(), m, this.key.keySize - 1);
	    };

	    /*
	     * https://tools.ietf.org/html/rfc3447#section-9.1.1
	     *
	     * mHash	[Buffer]	Hashed message to encode
	     * emBits	[uint]		Maximum length of output in bits. Must be at least 8hLen + 8sLen + 9 (hLen = Hash digest length in bytes | sLen = length of salt in bytes)
	     * @returns {Buffer} The encoded message
	     */
	    Scheme.prototype.emsa_pss_encode = function (mHash, emBits) {
	        var hash = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
	        var mgf = this.options.signingSchemeOptions.mgf || OAEP.eme_oaep_mgf1;
	        var sLen = this.options.signingSchemeOptions.saltLength || DEFAULT_SALT_LENGTH;

	        var hLen = OAEP.digestLength[hash];
	        var emLen = Math.ceil(emBits / 8);

	        if (emLen < hLen + sLen + 2) {
	            throw new Error("Output length passed to emBits(" + emBits + ") is too small for the options " +
	                "specified(" + hash + ", " + sLen + "). To fix this issue increase the value of emBits. (minimum size: " +
	                (8 * hLen + 8 * sLen + 9) + ")"
	            );
	        }

	        var salt = crypt$1.randomBytes(sLen);

	        var Mapostrophe = Buffer.alloc(8 + hLen + sLen);
	        Mapostrophe.fill(0, 0, 8);
	        mHash.copy(Mapostrophe, 8);
	        salt.copy(Mapostrophe, 8 + mHash.length);

	        var H = crypt$1.createHash(hash);
	        H.update(Mapostrophe);
	        H = H.digest();

	        var PS = Buffer.alloc(emLen - salt.length - hLen - 2);
	        PS.fill(0);

	        var DB = Buffer.alloc(PS.length + 1 + salt.length);
	        PS.copy(DB);
	        DB[PS.length] = 0x01;
	        salt.copy(DB, PS.length + 1);

	        var dbMask = mgf(H, DB.length, hash);

	        // XOR DB and dbMask together
	        var maskedDB = Buffer.alloc(DB.length);
	        for (var i = 0; i < dbMask.length; i++) {
	            maskedDB[i] = DB[i] ^ dbMask[i];
	        }

	        var bits = 8 * emLen - emBits;
	        var mask = 255 ^ (255 >> 8 - bits << 8 - bits);
	        maskedDB[0] = maskedDB[0] & mask;

	        var EM = Buffer.alloc(maskedDB.length + H.length + 1);
	        maskedDB.copy(EM, 0);
	        H.copy(EM, maskedDB.length);
	        EM[EM.length - 1] = 0xbc;

	        return EM;
	    };

	    /*
	     * https://tools.ietf.org/html/rfc3447#section-9.1.2
	     *
	     * mHash	[Buffer]	Hashed message
	     * EM		[Buffer]	Signature
	     * emBits	[uint]		Length of EM in bits. Must be at least 8hLen + 8sLen + 9 to be a valid signature. (hLen = Hash digest length in bytes | sLen = length of salt in bytes)
	     * @returns {Boolean} True if signature(EM) matches message(M)
	     */
	    Scheme.prototype.emsa_pss_verify = function (mHash, EM, emBits) {
	        var hash = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
	        var mgf = this.options.signingSchemeOptions.mgf || OAEP.eme_oaep_mgf1;
	        var sLen = this.options.signingSchemeOptions.saltLength || DEFAULT_SALT_LENGTH;

	        var hLen = OAEP.digestLength[hash];
	        var emLen = Math.ceil(emBits / 8);

	        if (emLen < hLen + sLen + 2 || EM[EM.length - 1] != 0xbc) {
	            return false;
	        }

	        var DB = Buffer.alloc(emLen - hLen - 1);
	        EM.copy(DB, 0, 0, emLen - hLen - 1);

	        var mask = 0;
	        for (var i = 0, bits = 8 * emLen - emBits; i < bits; i++) {
	            mask |= 1 << (7 - i);
	        }

	        if ((DB[0] & mask) !== 0) {
	            return false;
	        }

	        var H = EM.slice(emLen - hLen - 1, emLen - 1);
	        var dbMask = mgf(H, DB.length, hash);

	        // Unmask DB
	        for (i = 0; i < DB.length; i++) {
	            DB[i] ^= dbMask[i];
	        }

	        bits = 8 * emLen - emBits;
	        mask = 255 ^ (255 >> 8 - bits << 8 - bits);
	        DB[0] = DB[0] & mask;

	        // Filter out padding
	        for (i = 0; DB[i] === 0 && i < DB.length; i++);
	        if (DB[i] != 1) {
	            return false;
	        }

	        var salt = DB.slice(DB.length - sLen);

	        var Mapostrophe = Buffer.alloc(8 + hLen + sLen);
	        Mapostrophe.fill(0, 0, 8);
	        mHash.copy(Mapostrophe, 8);
	        salt.copy(Mapostrophe, 8 + mHash.length);

	        var Hapostrophe = crypt$1.createHash(hash);
	        Hapostrophe.update(Mapostrophe);
	        Hapostrophe = Hapostrophe.digest();

	        return H.toString("hex") === Hapostrophe.toString("hex");
	    };

	    return new Scheme(key, options);
	};

	(function (module) {
	module.exports = {
	    pkcs1: pkcs1$1.exports,
	    pkcs1_oaep: oaep.exports,
	    pss: pss.exports,

	    /**
	     * Check if scheme has padding methods
	     * @param scheme {string}
	     * @returns {Boolean}
	     */
	    isEncryption: function (scheme) {
	        return module.exports[scheme] && module.exports[scheme].isEncryption;
	    },

	    /**
	     * Check if scheme has sign/verify methods
	     * @param scheme {string}
	     * @returns {Boolean}
	     */
	    isSignature: function (scheme) {
	        return module.exports[scheme] && module.exports[scheme].isSignature;
	    }
	};
	}(schemes$5));

	var BigInteger$1 = jsbn;
	var schemes$4 = schemes$5.exports;

	var js = function (keyPair, options) {
	    var pkcs1Scheme = schemes$4.pkcs1.makeScheme(keyPair, options);

	    return {
	        encrypt: function (buffer, usePrivate) {
	            var m, c;
	            if (usePrivate) {
	                /* Type 1: zeros padding for private key encrypt */
	                m = new BigInteger$1(pkcs1Scheme.encPad(buffer, {type: 1}));
	                c = keyPair.$doPrivate(m);
	            } else {
	                m = new BigInteger$1(keyPair.encryptionScheme.encPad(buffer));
	                c = keyPair.$doPublic(m);
	            }
	            return c.toBuffer(keyPair.encryptedDataLength);
	        },

	        decrypt: function (buffer, usePublic) {
	            var m, c = new BigInteger$1(buffer);

	            if (usePublic) {
	                m = keyPair.$doPublic(c);
	                /* Type 1: zeros padding for private key decrypt */
	                return pkcs1Scheme.encUnPad(m.toBuffer(keyPair.encryptedDataLength), {type: 1});
	            } else {
	                m = keyPair.$doPrivate(c);
	                return keyPair.encryptionScheme.encUnPad(m.toBuffer(keyPair.encryptedDataLength));
	            }
	        }
	    };
	};

	var crypto$2 = require$$0__default$4['default'];
	var constants$2 = require$$1__default['default'];
	var schemes$3 = schemes$5.exports;

	var io = function (keyPair, options) {
	    var pkcs1Scheme = schemes$3.pkcs1.makeScheme(keyPair, options);

	    return {
	        encrypt: function (buffer, usePrivate) {
	            var padding;
	            if (usePrivate) {
	                padding = constants$2.RSA_PKCS1_PADDING;
	                if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                    padding = options.encryptionSchemeOptions.padding;
	                }
	                return crypto$2.privateEncrypt({
	                    key: options.rsaUtils.exportKey('private'),
	                    padding: padding
	                }, buffer);
	            } else {
	                padding = constants$2.RSA_PKCS1_OAEP_PADDING;
	                if (options.encryptionScheme === 'pkcs1') {
	                    padding = constants$2.RSA_PKCS1_PADDING;
	                }
	                if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                    padding = options.encryptionSchemeOptions.padding;
	                }

	                var data = buffer;
	                if (padding === constants$2.RSA_NO_PADDING) {
	                    data = pkcs1Scheme.pkcs0pad(buffer);
	                }

	                return crypto$2.publicEncrypt({
	                    key: options.rsaUtils.exportKey('public'),
	                    padding: padding
	                }, data);
	            }
	        },

	        decrypt: function (buffer, usePublic) {
	            var padding;
	            if (usePublic) {
	                padding = constants$2.RSA_PKCS1_PADDING;
	                if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                    padding = options.encryptionSchemeOptions.padding;
	                }
	                return crypto$2.publicDecrypt({
	                    key: options.rsaUtils.exportKey('public'),
	                    padding: padding
	                }, buffer);
	            } else {
	                padding = constants$2.RSA_PKCS1_OAEP_PADDING;
	                if (options.encryptionScheme === 'pkcs1') {
	                    padding = constants$2.RSA_PKCS1_PADDING;
	                }
	                if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                    padding = options.encryptionSchemeOptions.padding;
	                }
	                var res = crypto$2.privateDecrypt({
	                    key: options.rsaUtils.exportKey('private'),
	                    padding: padding
	                }, buffer);

	                if (padding === constants$2.RSA_NO_PADDING) {
	                    return pkcs1Scheme.pkcs0unpad(res);
	                }
	                return res;
	            }
	        }
	    };
	};

	var crypto$1 = require$$0__default$4['default'];
	var constants$1 = require$$1__default['default'];
	var schemes$2 = schemes$5.exports;

	var node12 = function (keyPair, options) {
	    var jsEngine = js(keyPair, options);
	    var pkcs1Scheme = schemes$2.pkcs1.makeScheme(keyPair, options);

	    return {
	        encrypt: function (buffer, usePrivate) {
	            if (usePrivate) {
	                return jsEngine.encrypt(buffer, usePrivate);
	            }
	            var padding = constants$1.RSA_PKCS1_OAEP_PADDING;
	            if (options.encryptionScheme === 'pkcs1') {
	                padding = constants$1.RSA_PKCS1_PADDING;
	            }
	            if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                padding = options.encryptionSchemeOptions.padding;
	            }

	            var data = buffer;
	            if (padding === constants$1.RSA_NO_PADDING) {
	                data = pkcs1Scheme.pkcs0pad(buffer);
	            }

	            return crypto$1.publicEncrypt({
	                key: options.rsaUtils.exportKey('public'),
	                padding: padding
	            }, data);
	        },

	        decrypt: function (buffer, usePublic) {
	            if (usePublic) {
	                return jsEngine.decrypt(buffer, usePublic);
	            }
	            var padding = constants$1.RSA_PKCS1_OAEP_PADDING;
	            if (options.encryptionScheme === 'pkcs1') {
	                padding = constants$1.RSA_PKCS1_PADDING;
	            }
	            if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
	                padding = options.encryptionSchemeOptions.padding;
	            }

	            var res = crypto$1.privateDecrypt({
	                key: options.rsaUtils.exportKey('private'),
	                padding: padding
	            }, buffer);

	            if (padding === constants$1.RSA_NO_PADDING) {
	                return pkcs1Scheme.pkcs0unpad(res);
	            }
	            return res;
	        }
	    };
	};

	var crypt = require$$0__default$4['default'];

	var encryptEngines$1 = {
	    getEngine: function (keyPair, options) {
	        var engine = js;
	        if (options.environment === 'node') {
	            if (typeof crypt.publicEncrypt === 'function' && typeof crypt.privateDecrypt === 'function') {
	                if (typeof crypt.privateEncrypt === 'function' && typeof crypt.publicDecrypt === 'function') {
	                    engine = io;
	                } else {
	                    engine = node12;
	                }
	            }
	        }
	        return engine(keyPair, options);
	    }
	};

	/*
	 * RSA Encryption / Decryption with PKCS1 v2 Padding.
	 * 
	 * Copyright (c) 2003-2005  Tom Wu
	 * All Rights Reserved.
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining
	 * a copy of this software and associated documentation files (the
	 * "Software"), to deal in the Software without restriction, including
	 * without limitation the rights to use, copy, modify, merge, publish,
	 * distribute, sublicense, and/or sell copies of the Software, and to
	 * permit persons to whom the Software is furnished to do so, subject to
	 * the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
	 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
	 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
	 *
	 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
	 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
	 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
	 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
	 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	 *
	 * In addition, the following condition applies:
	 *
	 * All redistributions must retain an intact copy of this copyright notice
	 * and disclaimer.
	 */

	/*
	 * Node.js adaptation
	 * long message support implementation
	 * signing/verifying
	 *
	 * 2014 rzcoder
	 */

	var _$1 = utils$2._;
	var BigInteger = jsbn;
	var utils$1 = utils$2;
	var schemes$1 = schemes$5.exports;
	var encryptEngines = encryptEngines$1;

	rsa$1.BigInteger = BigInteger;
	rsa$1.Key = (function () {
	    /**
	     * RSA key constructor
	     *
	     * n - modulus
	     * e - publicExponent
	     * d - privateExponent
	     * p - prime1
	     * q - prime2
	     * dmp1 - exponent1 -- d mod (p1)
	     * dmq1 - exponent2 -- d mod (q-1)
	     * coeff - coefficient -- (inverse of q) mod p
	     */
	    function RSAKey() {
	        this.n = null;
	        this.e = 0;
	        this.d = null;
	        this.p = null;
	        this.q = null;
	        this.dmp1 = null;
	        this.dmq1 = null;
	        this.coeff = null;
	    }

	    RSAKey.prototype.setOptions = function (options) {
	        var signingSchemeProvider = schemes$1[options.signingScheme];
	        var encryptionSchemeProvider = schemes$1[options.encryptionScheme];

	        if (signingSchemeProvider === encryptionSchemeProvider) {
	            this.signingScheme = this.encryptionScheme = encryptionSchemeProvider.makeScheme(this, options);
	        } else {
	            this.encryptionScheme = encryptionSchemeProvider.makeScheme(this, options);
	            this.signingScheme = signingSchemeProvider.makeScheme(this, options);
	        }

	        this.encryptEngine = encryptEngines.getEngine(this, options);
	    };

	    /**
	     * Generate a new random private key B bits long, using public expt E
	     * @param B
	     * @param E
	     */
	    RSAKey.prototype.generate = function (B, E) {
	        var qs = B >> 1;
	        this.e = parseInt(E, 16);
	        var ee = new BigInteger(E, 16);
	        while (true) {
	            while (true) {
	                this.p = new BigInteger(B - qs, 1);
	                if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) === 0 && this.p.isProbablePrime(10))
	                    break;
	            }
	            while (true) {
	                this.q = new BigInteger(qs, 1);
	                if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) === 0 && this.q.isProbablePrime(10))
	                    break;
	            }
	            if (this.p.compareTo(this.q) <= 0) {
	                var t = this.p;
	                this.p = this.q;
	                this.q = t;
	            }
	            var p1 = this.p.subtract(BigInteger.ONE);
	            var q1 = this.q.subtract(BigInteger.ONE);
	            var phi = p1.multiply(q1);
	            if (phi.gcd(ee).compareTo(BigInteger.ONE) === 0) {
	                this.n = this.p.multiply(this.q);
	                if (this.n.bitLength() < B) {
	                    continue;
	                }
	                this.d = ee.modInverse(phi);
	                this.dmp1 = this.d.mod(p1);
	                this.dmq1 = this.d.mod(q1);
	                this.coeff = this.q.modInverse(this.p);
	                break;
	            }
	        }
	        this.$$recalculateCache();
	    };

	    /**
	     * Set the private key fields N, e, d and CRT params from buffers
	     *
	     * @param N
	     * @param E
	     * @param D
	     * @param P
	     * @param Q
	     * @param DP
	     * @param DQ
	     * @param C
	     */
	    RSAKey.prototype.setPrivate = function (N, E, D, P, Q, DP, DQ, C) {
	        if (N && E && D && N.length > 0 && (_$1.isNumber(E) || E.length > 0) && D.length > 0) {
	            this.n = new BigInteger(N);
	            this.e = _$1.isNumber(E) ? E : utils$1.get32IntFromBuffer(E, 0);
	            this.d = new BigInteger(D);

	            if (P && Q && DP && DQ && C) {
	                this.p = new BigInteger(P);
	                this.q = new BigInteger(Q);
	                this.dmp1 = new BigInteger(DP);
	                this.dmq1 = new BigInteger(DQ);
	                this.coeff = new BigInteger(C);
	            }
	            this.$$recalculateCache();
	        } else {
	            throw Error("Invalid RSA private key");
	        }
	    };

	    /**
	     * Set the public key fields N and e from hex strings
	     * @param N
	     * @param E
	     */
	    RSAKey.prototype.setPublic = function (N, E) {
	        if (N && E && N.length > 0 && (_$1.isNumber(E) || E.length > 0)) {
	            this.n = new BigInteger(N);
	            this.e = _$1.isNumber(E) ? E : utils$1.get32IntFromBuffer(E, 0);
	            this.$$recalculateCache();
	        } else {
	            throw Error("Invalid RSA public key");
	        }
	    };

	    /**
	     * private
	     * Perform raw private operation on "x": return x^d (mod n)
	     *
	     * @param x
	     * @returns {*}
	     */
	    RSAKey.prototype.$doPrivate = function (x) {
	        if (this.p || this.q) {
	            return x.modPow(this.d, this.n);
	        }

	        // TODO: re-calculate any missing CRT params
	        var xp = x.mod(this.p).modPow(this.dmp1, this.p);
	        var xq = x.mod(this.q).modPow(this.dmq1, this.q);

	        while (xp.compareTo(xq) < 0) {
	            xp = xp.add(this.p);
	        }
	        return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
	    };

	    /**
	     * private
	     * Perform raw public operation on "x": return x^e (mod n)
	     *
	     * @param x
	     * @returns {*}
	     */
	    RSAKey.prototype.$doPublic = function (x) {
	        return x.modPowInt(this.e, this.n);
	    };

	    /**
	     * Return the PKCS#1 RSA encryption of buffer
	     * @param buffer {Buffer}
	     * @returns {Buffer}
	     */
	    RSAKey.prototype.encrypt = function (buffer, usePrivate) {
	        var buffers = [];
	        var results = [];
	        var bufferSize = buffer.length;
	        var buffersCount = Math.ceil(bufferSize / this.maxMessageLength) || 1; // total buffers count for encrypt
	        var dividedSize = Math.ceil(bufferSize / buffersCount || 1); // each buffer size

	        if (buffersCount == 1) {
	            buffers.push(buffer);
	        } else {
	            for (var bufNum = 0; bufNum < buffersCount; bufNum++) {
	                buffers.push(buffer.slice(bufNum * dividedSize, (bufNum + 1) * dividedSize));
	            }
	        }

	        for (var i = 0; i < buffers.length; i++) {
	            results.push(this.encryptEngine.encrypt(buffers[i], usePrivate));
	        }

	        return Buffer.concat(results);
	    };

	    /**
	     * Return the PKCS#1 RSA decryption of buffer
	     * @param buffer {Buffer}
	     * @returns {Buffer}
	     */
	    RSAKey.prototype.decrypt = function (buffer, usePublic) {
	        if (buffer.length % this.encryptedDataLength > 0) {
	            throw Error('Incorrect data or key');
	        }

	        var result = [];
	        var offset = 0;
	        var length = 0;
	        var buffersCount = buffer.length / this.encryptedDataLength;

	        for (var i = 0; i < buffersCount; i++) {
	            offset = i * this.encryptedDataLength;
	            length = offset + this.encryptedDataLength;
	            result.push(this.encryptEngine.decrypt(buffer.slice(offset, Math.min(length, buffer.length)), usePublic));
	        }

	        return Buffer.concat(result);
	    };

	    RSAKey.prototype.sign = function (buffer) {
	        return this.signingScheme.sign.apply(this.signingScheme, arguments);
	    };

	    RSAKey.prototype.verify = function (buffer, signature, signature_encoding) {
	        return this.signingScheme.verify.apply(this.signingScheme, arguments);
	    };

	    /**
	     * Check if key pair contains private key
	     */
	    RSAKey.prototype.isPrivate = function () {
	        return this.n && this.e && this.d && true || false;
	    };

	    /**
	     * Check if key pair contains public key
	     * @param strict {boolean} - public key only, return false if have private exponent
	     */
	    RSAKey.prototype.isPublic = function (strict) {
	        return this.n && this.e && !(strict && this.d) || false;
	    };

	    Object.defineProperty(RSAKey.prototype, 'keySize', {
	        get: function () {
	            return this.cache.keyBitLength;
	        }
	    });

	    Object.defineProperty(RSAKey.prototype, 'encryptedDataLength', {
	        get: function () {
	            return this.cache.keyByteLength;
	        }
	    });

	    Object.defineProperty(RSAKey.prototype, 'maxMessageLength', {
	        get: function () {
	            return this.encryptionScheme.maxMessageLength();
	        }
	    });

	    /**
	     * Caching key data
	     */
	    RSAKey.prototype.$$recalculateCache = function () {
	        this.cache = this.cache || {};
	        // Bit & byte length
	        this.cache.keyBitLength = this.n.bitLength();
	        this.cache.keyByteLength = (this.cache.keyBitLength + 6) >> 3;
	    };

	    return RSAKey;
	})();

	var ber = {exports: {}};

	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.


	var errors$2 = {

	  newInvalidAsn1Error: function (msg) {
	    var e = new Error();
	    e.name = 'InvalidAsn1Error';
	    e.message = msg || '';
	    return e;
	  }

	};

	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.


	var types = {
	  EOC: 0,
	  Boolean: 1,
	  Integer: 2,
	  BitString: 3,
	  OctetString: 4,
	  Null: 5,
	  OID: 6,
	  ObjectDescriptor: 7,
	  External: 8,
	  Real: 9, // float
	  Enumeration: 10,
	  PDV: 11,
	  Utf8String: 12,
	  RelativeOID: 13,
	  Sequence: 16,
	  Set: 17,
	  NumericString: 18,
	  PrintableString: 19,
	  T61String: 20,
	  VideotexString: 21,
	  IA5String: 22,
	  UTCTime: 23,
	  GeneralizedTime: 24,
	  GraphicString: 25,
	  VisibleString: 26,
	  GeneralString: 28,
	  UniversalString: 29,
	  CharacterString: 30,
	  BMPString: 31,
	  Constructor: 32,
	  Context: 128
	};

	/* eslint-disable node/no-deprecated-api */

	var buffer = require$$0__default$3['default'];
	var Buffer$3 = buffer.Buffer;

	var safer = {};

	var key;

	for (key in buffer) {
	  if (!buffer.hasOwnProperty(key)) continue
	  if (key === 'SlowBuffer' || key === 'Buffer') continue
	  safer[key] = buffer[key];
	}

	var Safer = safer.Buffer = {};
	for (key in Buffer$3) {
	  if (!Buffer$3.hasOwnProperty(key)) continue
	  if (key === 'allocUnsafe' || key === 'allocUnsafeSlow') continue
	  Safer[key] = Buffer$3[key];
	}

	safer.Buffer.prototype = Buffer$3.prototype;

	if (!Safer.from || Safer.from === Uint8Array.from) {
	  Safer.from = function (value, encodingOrOffset, length) {
	    if (typeof value === 'number') {
	      throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof value)
	    }
	    if (value && typeof value.length === 'undefined') {
	      throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof value)
	    }
	    return Buffer$3(value, encodingOrOffset, length)
	  };
	}

	if (!Safer.alloc) {
	  Safer.alloc = function (size, fill, encoding) {
	    if (typeof size !== 'number') {
	      throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size)
	    }
	    if (size < 0 || size >= 2 * (1 << 30)) {
	      throw new RangeError('The value "' + size + '" is invalid for option "size"')
	    }
	    var buf = Buffer$3(size);
	    if (!fill || fill.length === 0) {
	      buf.fill(0);
	    } else if (typeof encoding === 'string') {
	      buf.fill(fill, encoding);
	    } else {
	      buf.fill(fill);
	    }
	    return buf
	  };
	}

	if (!safer.kStringMaxLength) {
	  try {
	    safer.kStringMaxLength = process.binding('buffer').kStringMaxLength;
	  } catch (e) {
	    // we can't determine kStringMaxLength in environments where process.binding
	    // is unsupported, so let's not set it
	  }
	}

	if (!safer.constants) {
	  safer.constants = {
	    MAX_LENGTH: safer.kMaxLength
	  };
	  if (safer.kStringMaxLength) {
	    safer.constants.MAX_STRING_LENGTH = safer.kStringMaxLength;
	  }
	}

	var safer_1 = safer;

	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.

	var assert$1 = require$$0__default$5['default'];
	var Buffer$2 = safer_1.Buffer;

	var ASN1$1 = types;
	var errors$1 = errors$2;


	// --- Globals

	var newInvalidAsn1Error$1 = errors$1.newInvalidAsn1Error;



	// --- API

	function Reader(data) {
	  if (!data || !Buffer$2.isBuffer(data))
	    throw new TypeError('data must be a node Buffer');

	  this._buf = data;
	  this._size = data.length;

	  // These hold the "current" state
	  this._len = 0;
	  this._offset = 0;
	}

	Object.defineProperty(Reader.prototype, 'length', {
	  enumerable: true,
	  get: function () { return (this._len); }
	});

	Object.defineProperty(Reader.prototype, 'offset', {
	  enumerable: true,
	  get: function () { return (this._offset); }
	});

	Object.defineProperty(Reader.prototype, 'remain', {
	  get: function () { return (this._size - this._offset); }
	});

	Object.defineProperty(Reader.prototype, 'buffer', {
	  get: function () { return (this._buf.slice(this._offset)); }
	});


	/**
	 * Reads a single byte and advances offset; you can pass in `true` to make this
	 * a "peek" operation (i.e., get the byte, but don't advance the offset).
	 *
	 * @param {Boolean} peek true means don't move offset.
	 * @return {Number} the next byte, null if not enough data.
	 */
	Reader.prototype.readByte = function (peek) {
	  if (this._size - this._offset < 1)
	    return null;

	  var b = this._buf[this._offset] & 0xff;

	  if (!peek)
	    this._offset += 1;

	  return b;
	};


	Reader.prototype.peek = function () {
	  return this.readByte(true);
	};


	/**
	 * Reads a (potentially) variable length off the BER buffer.  This call is
	 * not really meant to be called directly, as callers have to manipulate
	 * the internal buffer afterwards.
	 *
	 * As a result of this call, you can call `Reader.length`, until the
	 * next thing called that does a readLength.
	 *
	 * @return {Number} the amount of offset to advance the buffer.
	 * @throws {InvalidAsn1Error} on bad ASN.1
	 */
	Reader.prototype.readLength = function (offset) {
	  if (offset === undefined)
	    offset = this._offset;

	  if (offset >= this._size)
	    return null;

	  var lenB = this._buf[offset++] & 0xff;
	  if (lenB === null)
	    return null;

	  if ((lenB & 0x80) === 0x80) {
	    lenB &= 0x7f;

	    if (lenB === 0)
	      throw newInvalidAsn1Error$1('Indefinite length not supported');

	    if (lenB > 4)
	      throw newInvalidAsn1Error$1('encoding too long');

	    if (this._size - offset < lenB)
	      return null;

	    this._len = 0;
	    for (var i = 0; i < lenB; i++)
	      this._len = (this._len << 8) + (this._buf[offset++] & 0xff);

	  } else {
	    // Wasn't a variable length
	    this._len = lenB;
	  }

	  return offset;
	};


	/**
	 * Parses the next sequence in this BER buffer.
	 *
	 * To get the length of the sequence, call `Reader.length`.
	 *
	 * @return {Number} the sequence's tag.
	 */
	Reader.prototype.readSequence = function (tag) {
	  var seq = this.peek();
	  if (seq === null)
	    return null;
	  if (tag !== undefined && tag !== seq)
	    throw newInvalidAsn1Error$1('Expected 0x' + tag.toString(16) +
	                              ': got 0x' + seq.toString(16));

	  var o = this.readLength(this._offset + 1); // stored in `length`
	  if (o === null)
	    return null;

	  this._offset = o;
	  return seq;
	};


	Reader.prototype.readInt = function () {
	  return this._readTag(ASN1$1.Integer);
	};


	Reader.prototype.readBoolean = function () {
	  return (this._readTag(ASN1$1.Boolean) === 0 ? false : true);
	};


	Reader.prototype.readEnumeration = function () {
	  return this._readTag(ASN1$1.Enumeration);
	};


	Reader.prototype.readString = function (tag, retbuf) {
	  if (!tag)
	    tag = ASN1$1.OctetString;

	  var b = this.peek();
	  if (b === null)
	    return null;

	  if (b !== tag)
	    throw newInvalidAsn1Error$1('Expected 0x' + tag.toString(16) +
	                              ': got 0x' + b.toString(16));

	  var o = this.readLength(this._offset + 1); // stored in `length`

	  if (o === null)
	    return null;

	  if (this.length > this._size - o)
	    return null;

	  this._offset = o;

	  if (this.length === 0)
	    return retbuf ? Buffer$2.alloc(0) : '';

	  var str = this._buf.slice(this._offset, this._offset + this.length);
	  this._offset += this.length;

	  return retbuf ? str : str.toString('utf8');
	};

	Reader.prototype.readOID = function (tag) {
	  if (!tag)
	    tag = ASN1$1.OID;

	  var b = this.readString(tag, true);
	  if (b === null)
	    return null;

	  var values = [];
	  var value = 0;

	  for (var i = 0; i < b.length; i++) {
	    var byte = b[i] & 0xff;

	    value <<= 7;
	    value += byte & 0x7f;
	    if ((byte & 0x80) === 0) {
	      values.push(value);
	      value = 0;
	    }
	  }

	  value = values.shift();
	  values.unshift(value % 40);
	  values.unshift((value / 40) >> 0);

	  return values.join('.');
	};


	Reader.prototype._readTag = function (tag) {
	  assert$1.ok(tag !== undefined);

	  var b = this.peek();

	  if (b === null)
	    return null;

	  if (b !== tag)
	    throw newInvalidAsn1Error$1('Expected 0x' + tag.toString(16) +
	                              ': got 0x' + b.toString(16));

	  var o = this.readLength(this._offset + 1); // stored in `length`
	  if (o === null)
	    return null;

	  if (this.length > 4)
	    throw newInvalidAsn1Error$1('Integer too long: ' + this.length);

	  if (this.length > this._size - o)
	    return null;
	  this._offset = o;

	  var fb = this._buf[this._offset];
	  var value = 0;

	  for (var i = 0; i < this.length; i++) {
	    value <<= 8;
	    value |= (this._buf[this._offset++] & 0xff);
	  }

	  if ((fb & 0x80) === 0x80 && i !== 4)
	    value -= (1 << (i * 8));

	  return value >> 0;
	};



	// --- Exported API

	var reader = Reader;

	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.

	var assert = require$$0__default$5['default'];
	var Buffer$1 = safer_1.Buffer;
	var ASN1 = types;
	var errors = errors$2;


	// --- Globals

	var newInvalidAsn1Error = errors.newInvalidAsn1Error;

	var DEFAULT_OPTS = {
	  size: 1024,
	  growthFactor: 8
	};


	// --- Helpers

	function merge(from, to) {
	  assert.ok(from);
	  assert.equal(typeof (from), 'object');
	  assert.ok(to);
	  assert.equal(typeof (to), 'object');

	  var keys = Object.getOwnPropertyNames(from);
	  keys.forEach(function (key) {
	    if (to[key])
	      return;

	    var value = Object.getOwnPropertyDescriptor(from, key);
	    Object.defineProperty(to, key, value);
	  });

	  return to;
	}



	// --- API

	function Writer(options) {
	  options = merge(DEFAULT_OPTS, options || {});

	  this._buf = Buffer$1.alloc(options.size || 1024);
	  this._size = this._buf.length;
	  this._offset = 0;
	  this._options = options;

	  // A list of offsets in the buffer where we need to insert
	  // sequence tag/len pairs.
	  this._seq = [];
	}

	Object.defineProperty(Writer.prototype, 'buffer', {
	  get: function () {
	    if (this._seq.length)
	      throw newInvalidAsn1Error(this._seq.length + ' unended sequence(s)');

	    return (this._buf.slice(0, this._offset));
	  }
	});

	Writer.prototype.writeByte = function (b) {
	  if (typeof (b) !== 'number')
	    throw new TypeError('argument must be a Number');

	  this._ensure(1);
	  this._buf[this._offset++] = b;
	};


	Writer.prototype.writeInt = function (i, tag) {
	  if (typeof (i) !== 'number')
	    throw new TypeError('argument must be a Number');
	  if (typeof (tag) !== 'number')
	    tag = ASN1.Integer;

	  var sz = 4;

	  while ((((i & 0xff800000) === 0) || ((i & 0xff800000) === 0xff800000 >> 0)) &&
	        (sz > 1)) {
	    sz--;
	    i <<= 8;
	  }

	  if (sz > 4)
	    throw newInvalidAsn1Error('BER ints cannot be > 0xffffffff');

	  this._ensure(2 + sz);
	  this._buf[this._offset++] = tag;
	  this._buf[this._offset++] = sz;

	  while (sz-- > 0) {
	    this._buf[this._offset++] = ((i & 0xff000000) >>> 24);
	    i <<= 8;
	  }

	};


	Writer.prototype.writeNull = function () {
	  this.writeByte(ASN1.Null);
	  this.writeByte(0x00);
	};


	Writer.prototype.writeEnumeration = function (i, tag) {
	  if (typeof (i) !== 'number')
	    throw new TypeError('argument must be a Number');
	  if (typeof (tag) !== 'number')
	    tag = ASN1.Enumeration;

	  return this.writeInt(i, tag);
	};


	Writer.prototype.writeBoolean = function (b, tag) {
	  if (typeof (b) !== 'boolean')
	    throw new TypeError('argument must be a Boolean');
	  if (typeof (tag) !== 'number')
	    tag = ASN1.Boolean;

	  this._ensure(3);
	  this._buf[this._offset++] = tag;
	  this._buf[this._offset++] = 0x01;
	  this._buf[this._offset++] = b ? 0xff : 0x00;
	};


	Writer.prototype.writeString = function (s, tag) {
	  if (typeof (s) !== 'string')
	    throw new TypeError('argument must be a string (was: ' + typeof (s) + ')');
	  if (typeof (tag) !== 'number')
	    tag = ASN1.OctetString;

	  var len = Buffer$1.byteLength(s);
	  this.writeByte(tag);
	  this.writeLength(len);
	  if (len) {
	    this._ensure(len);
	    this._buf.write(s, this._offset);
	    this._offset += len;
	  }
	};


	Writer.prototype.writeBuffer = function (buf, tag) {
	  if (typeof (tag) !== 'number')
	    throw new TypeError('tag must be a number');
	  if (!Buffer$1.isBuffer(buf))
	    throw new TypeError('argument must be a buffer');

	  this.writeByte(tag);
	  this.writeLength(buf.length);
	  this._ensure(buf.length);
	  buf.copy(this._buf, this._offset, 0, buf.length);
	  this._offset += buf.length;
	};


	Writer.prototype.writeStringArray = function (strings) {
	  if ((!strings instanceof Array))
	    throw new TypeError('argument must be an Array[String]');

	  var self = this;
	  strings.forEach(function (s) {
	    self.writeString(s);
	  });
	};

	// This is really to solve DER cases, but whatever for now
	Writer.prototype.writeOID = function (s, tag) {
	  if (typeof (s) !== 'string')
	    throw new TypeError('argument must be a string');
	  if (typeof (tag) !== 'number')
	    tag = ASN1.OID;

	  if (!/^([0-9]+\.){3,}[0-9]+$/.test(s))
	    throw new Error('argument is not a valid OID string');

	  function encodeOctet(bytes, octet) {
	    if (octet < 128) {
	        bytes.push(octet);
	    } else if (octet < 16384) {
	        bytes.push((octet >>> 7) | 0x80);
	        bytes.push(octet & 0x7F);
	    } else if (octet < 2097152) {
	      bytes.push((octet >>> 14) | 0x80);
	      bytes.push(((octet >>> 7) | 0x80) & 0xFF);
	      bytes.push(octet & 0x7F);
	    } else if (octet < 268435456) {
	      bytes.push((octet >>> 21) | 0x80);
	      bytes.push(((octet >>> 14) | 0x80) & 0xFF);
	      bytes.push(((octet >>> 7) | 0x80) & 0xFF);
	      bytes.push(octet & 0x7F);
	    } else {
	      bytes.push(((octet >>> 28) | 0x80) & 0xFF);
	      bytes.push(((octet >>> 21) | 0x80) & 0xFF);
	      bytes.push(((octet >>> 14) | 0x80) & 0xFF);
	      bytes.push(((octet >>> 7) | 0x80) & 0xFF);
	      bytes.push(octet & 0x7F);
	    }
	  }

	  var tmp = s.split('.');
	  var bytes = [];
	  bytes.push(parseInt(tmp[0], 10) * 40 + parseInt(tmp[1], 10));
	  tmp.slice(2).forEach(function (b) {
	    encodeOctet(bytes, parseInt(b, 10));
	  });

	  var self = this;
	  this._ensure(2 + bytes.length);
	  this.writeByte(tag);
	  this.writeLength(bytes.length);
	  bytes.forEach(function (b) {
	    self.writeByte(b);
	  });
	};


	Writer.prototype.writeLength = function (len) {
	  if (typeof (len) !== 'number')
	    throw new TypeError('argument must be a Number');

	  this._ensure(4);

	  if (len <= 0x7f) {
	    this._buf[this._offset++] = len;
	  } else if (len <= 0xff) {
	    this._buf[this._offset++] = 0x81;
	    this._buf[this._offset++] = len;
	  } else if (len <= 0xffff) {
	    this._buf[this._offset++] = 0x82;
	    this._buf[this._offset++] = len >> 8;
	    this._buf[this._offset++] = len;
	  } else if (len <= 0xffffff) {
	    this._buf[this._offset++] = 0x83;
	    this._buf[this._offset++] = len >> 16;
	    this._buf[this._offset++] = len >> 8;
	    this._buf[this._offset++] = len;
	  } else {
	    throw newInvalidAsn1Error('Length too long (> 4 bytes)');
	  }
	};

	Writer.prototype.startSequence = function (tag) {
	  if (typeof (tag) !== 'number')
	    tag = ASN1.Sequence | ASN1.Constructor;

	  this.writeByte(tag);
	  this._seq.push(this._offset);
	  this._ensure(3);
	  this._offset += 3;
	};


	Writer.prototype.endSequence = function () {
	  var seq = this._seq.pop();
	  var start = seq + 3;
	  var len = this._offset - start;

	  if (len <= 0x7f) {
	    this._shift(start, len, -2);
	    this._buf[seq] = len;
	  } else if (len <= 0xff) {
	    this._shift(start, len, -1);
	    this._buf[seq] = 0x81;
	    this._buf[seq + 1] = len;
	  } else if (len <= 0xffff) {
	    this._buf[seq] = 0x82;
	    this._buf[seq + 1] = len >> 8;
	    this._buf[seq + 2] = len;
	  } else if (len <= 0xffffff) {
	    this._shift(start, len, 1);
	    this._buf[seq] = 0x83;
	    this._buf[seq + 1] = len >> 16;
	    this._buf[seq + 2] = len >> 8;
	    this._buf[seq + 3] = len;
	  } else {
	    throw newInvalidAsn1Error('Sequence too long');
	  }
	};


	Writer.prototype._shift = function (start, len, shift) {
	  assert.ok(start !== undefined);
	  assert.ok(len !== undefined);
	  assert.ok(shift);

	  this._buf.copy(this._buf, start + shift, start, start + len);
	  this._offset += shift;
	};

	Writer.prototype._ensure = function (len) {
	  assert.ok(len);

	  if (this._size - this._offset < len) {
	    var sz = this._size * this._options.growthFactor;
	    if (sz - this._offset < len)
	      sz += len;

	    var buf = Buffer$1.alloc(sz);

	    this._buf.copy(buf, 0, 0, this._offset);
	    this._buf = buf;
	    this._size = sz;
	  }
	};



	// --- Exported API

	var writer = Writer;

	(function (module) {
	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.

	var errors = errors$2;
	var types$1 = types;

	var Reader = reader;
	var Writer = writer;


	// --- Exports

	module.exports = {

	  Reader: Reader,

	  Writer: Writer

	};

	for (var t in types$1) {
	  if (types$1.hasOwnProperty(t))
	    module.exports[t] = types$1[t];
	}
	for (var e in errors) {
	  if (errors.hasOwnProperty(e))
	    module.exports[e] = errors[e];
	}
	}(ber));

	// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.

	// If you have no idea what ASN.1 or BER is, see this:
	// ftp://ftp.rsa.com/pub/pkcs/ascii/layman.asc

	var Ber = ber.exports;



	// --- Exported API

	var lib = {

	  Ber: Ber,

	  BerReader: Ber.Reader,

	  BerWriter: Ber.Writer

	};

	var formats$1 = {exports: {}};

	var pkcs1 = {exports: {}};

	(function (module) {
	var ber = lib.Ber;
	var _ = utils$2._;
	var utils = utils$2;

	const PRIVATE_OPENING_BOUNDARY = '-----BEGIN RSA PRIVATE KEY-----';
	const PRIVATE_CLOSING_BOUNDARY = '-----END RSA PRIVATE KEY-----';

	const PUBLIC_OPENING_BOUNDARY = '-----BEGIN RSA PUBLIC KEY-----';
	const PUBLIC_CLOSING_BOUNDARY = '-----END RSA PUBLIC KEY-----';

	module.exports = {
	    privateExport: function (key, options) {
	        options = options || {};

	        var n = key.n.toBuffer();
	        var d = key.d.toBuffer();
	        var p = key.p.toBuffer();
	        var q = key.q.toBuffer();
	        var dmp1 = key.dmp1.toBuffer();
	        var dmq1 = key.dmq1.toBuffer();
	        var coeff = key.coeff.toBuffer();

	        var length = n.length + d.length + p.length + q.length + dmp1.length + dmq1.length + coeff.length + 512; // magic
	        var writer = new ber.Writer({size: length});

	        writer.startSequence();
	        writer.writeInt(0);
	        writer.writeBuffer(n, 2);
	        writer.writeInt(key.e);
	        writer.writeBuffer(d, 2);
	        writer.writeBuffer(p, 2);
	        writer.writeBuffer(q, 2);
	        writer.writeBuffer(dmp1, 2);
	        writer.writeBuffer(dmq1, 2);
	        writer.writeBuffer(coeff, 2);
	        writer.endSequence();

	        if (options.type === 'der') {
	            return writer.buffer;
	        } else {
	            return PRIVATE_OPENING_BOUNDARY + '\n' + utils.linebrk(writer.buffer.toString('base64'), 64) + '\n' + PRIVATE_CLOSING_BOUNDARY;
	        }
	    },

	    privateImport: function (key, data, options) {
	        options = options || {};
	        var buffer;

	        if (options.type !== 'der') {
	            if (Buffer.isBuffer(data)) {
	                data = data.toString('utf8');
	            }

	            if (_.isString(data)) {
	                var pem = utils.trimSurroundingText(data, PRIVATE_OPENING_BOUNDARY, PRIVATE_CLOSING_BOUNDARY)
	                    .replace(/\s+|\n\r|\n|\r$/gm, '');
	                buffer = Buffer.from(pem, 'base64');
	            } else {
	                throw Error('Unsupported key format');
	            }
	        } else if (Buffer.isBuffer(data)) {
	            buffer = data;
	        } else {
	            throw Error('Unsupported key format');
	        }

	        var reader = new ber.Reader(buffer);
	        reader.readSequence();
	        reader.readString(2, true); // just zero
	        key.setPrivate(
	            reader.readString(2, true),  // modulus
	            reader.readString(2, true),  // publicExponent
	            reader.readString(2, true),  // privateExponent
	            reader.readString(2, true),  // prime1
	            reader.readString(2, true),  // prime2
	            reader.readString(2, true),  // exponent1 -- d mod (p1)
	            reader.readString(2, true),  // exponent2 -- d mod (q-1)
	            reader.readString(2, true)   // coefficient -- (inverse of q) mod p
	        );
	    },

	    publicExport: function (key, options) {
	        options = options || {};

	        var n = key.n.toBuffer();
	        var length = n.length + 512; // magic

	        var bodyWriter = new ber.Writer({size: length});
	        bodyWriter.startSequence();
	        bodyWriter.writeBuffer(n, 2);
	        bodyWriter.writeInt(key.e);
	        bodyWriter.endSequence();

	        if (options.type === 'der') {
	            return bodyWriter.buffer;
	        } else {
	            return PUBLIC_OPENING_BOUNDARY + '\n' + utils.linebrk(bodyWriter.buffer.toString('base64'), 64) + '\n' + PUBLIC_CLOSING_BOUNDARY;
	        }
	    },

	    publicImport: function (key, data, options) {
	        options = options || {};
	        var buffer;

	        if (options.type !== 'der') {
	            if (Buffer.isBuffer(data)) {
	                data = data.toString('utf8');
	            }

	            if (_.isString(data)) {
	                var pem = utils.trimSurroundingText(data, PUBLIC_OPENING_BOUNDARY, PUBLIC_CLOSING_BOUNDARY)
	                    .replace(/\s+|\n\r|\n|\r$/gm, '');
	                buffer = Buffer.from(pem, 'base64');
	            }
	        } else if (Buffer.isBuffer(data)) {
	            buffer = data;
	        } else {
	            throw Error('Unsupported key format');
	        }

	        var body = new ber.Reader(buffer);
	        body.readSequence();
	        key.setPublic(
	            body.readString(0x02, true), // modulus
	            body.readString(0x02, true)  // publicExponent
	        );
	    },

	    /**
	     * Trying autodetect and import key
	     * @param key
	     * @param data
	     */
	    autoImport: function (key, data) {
	        // [\S\s]* matches zero or more of any character
	        if (/^[\S\s]*-----BEGIN RSA PRIVATE KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END RSA PRIVATE KEY-----[\S\s]*$/g.test(data)) {
	            module.exports.privateImport(key, data);
	            return true;
	        }

	        if (/^[\S\s]*-----BEGIN RSA PUBLIC KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END RSA PUBLIC KEY-----[\S\s]*$/g.test(data)) {
	            module.exports.publicImport(key, data);
	            return true;
	        }

	        return false;
	    }
	};
	}(pkcs1));

	var pkcs8 = {exports: {}};

	(function (module) {
	var ber = lib.Ber;
	var _ = utils$2._;
	var PUBLIC_RSA_OID = '1.2.840.113549.1.1.1';
	var utils = utils$2;

	const PRIVATE_OPENING_BOUNDARY = '-----BEGIN PRIVATE KEY-----';
	const PRIVATE_CLOSING_BOUNDARY = '-----END PRIVATE KEY-----';

	const PUBLIC_OPENING_BOUNDARY = '-----BEGIN PUBLIC KEY-----';
	const PUBLIC_CLOSING_BOUNDARY = '-----END PUBLIC KEY-----';

	module.exports = {
	    privateExport: function (key, options) {
	        options = options || {};

	        var n = key.n.toBuffer();
	        var d = key.d.toBuffer();
	        var p = key.p.toBuffer();
	        var q = key.q.toBuffer();
	        var dmp1 = key.dmp1.toBuffer();
	        var dmq1 = key.dmq1.toBuffer();
	        var coeff = key.coeff.toBuffer();

	        var length = n.length + d.length + p.length + q.length + dmp1.length + dmq1.length + coeff.length + 512; // magic
	        var bodyWriter = new ber.Writer({size: length});

	        bodyWriter.startSequence();
	        bodyWriter.writeInt(0);
	        bodyWriter.writeBuffer(n, 2);
	        bodyWriter.writeInt(key.e);
	        bodyWriter.writeBuffer(d, 2);
	        bodyWriter.writeBuffer(p, 2);
	        bodyWriter.writeBuffer(q, 2);
	        bodyWriter.writeBuffer(dmp1, 2);
	        bodyWriter.writeBuffer(dmq1, 2);
	        bodyWriter.writeBuffer(coeff, 2);
	        bodyWriter.endSequence();

	        var writer = new ber.Writer({size: length});
	        writer.startSequence();
	        writer.writeInt(0);
	        writer.startSequence();
	        writer.writeOID(PUBLIC_RSA_OID);
	        writer.writeNull();
	        writer.endSequence();
	        writer.writeBuffer(bodyWriter.buffer, 4);
	        writer.endSequence();

	        if (options.type === 'der') {
	            return writer.buffer;
	        } else {
	            return PRIVATE_OPENING_BOUNDARY + '\n' + utils.linebrk(writer.buffer.toString('base64'), 64) + '\n' + PRIVATE_CLOSING_BOUNDARY;
	        }
	    },

	    privateImport: function (key, data, options) {
	        options = options || {};
	        var buffer;

	        if (options.type !== 'der') {
	            if (Buffer.isBuffer(data)) {
	                data = data.toString('utf8');
	            }

	            if (_.isString(data)) {
	                var pem = utils.trimSurroundingText(data, PRIVATE_OPENING_BOUNDARY, PRIVATE_CLOSING_BOUNDARY)
	                    .replace('-----END PRIVATE KEY-----', '')
	                    .replace(/\s+|\n\r|\n|\r$/gm, '');
	                buffer = Buffer.from(pem, 'base64');
	            } else {
	                throw Error('Unsupported key format');
	            }
	        } else if (Buffer.isBuffer(data)) {
	            buffer = data;
	        } else {
	            throw Error('Unsupported key format');
	        }

	        var reader = new ber.Reader(buffer);
	        reader.readSequence();
	        reader.readInt(0);
	        var header = new ber.Reader(reader.readString(0x30, true));

	        if (header.readOID(0x06, true) !== PUBLIC_RSA_OID) {
	            throw Error('Invalid Public key format');
	        }

	        var body = new ber.Reader(reader.readString(0x04, true));
	        body.readSequence();
	        body.readString(2, true); // just zero
	        key.setPrivate(
	            body.readString(2, true),  // modulus
	            body.readString(2, true),  // publicExponent
	            body.readString(2, true),  // privateExponent
	            body.readString(2, true),  // prime1
	            body.readString(2, true),  // prime2
	            body.readString(2, true),  // exponent1 -- d mod (p1)
	            body.readString(2, true),  // exponent2 -- d mod (q-1)
	            body.readString(2, true)   // coefficient -- (inverse of q) mod p
	        );
	    },

	    publicExport: function (key, options) {
	        options = options || {};

	        var n = key.n.toBuffer();
	        var length = n.length + 512; // magic

	        var bodyWriter = new ber.Writer({size: length});
	        bodyWriter.writeByte(0);
	        bodyWriter.startSequence();
	        bodyWriter.writeBuffer(n, 2);
	        bodyWriter.writeInt(key.e);
	        bodyWriter.endSequence();

	        var writer = new ber.Writer({size: length});
	        writer.startSequence();
	        writer.startSequence();
	        writer.writeOID(PUBLIC_RSA_OID);
	        writer.writeNull();
	        writer.endSequence();
	        writer.writeBuffer(bodyWriter.buffer, 3);
	        writer.endSequence();

	        if (options.type === 'der') {
	            return writer.buffer;
	        } else {
	            return PUBLIC_OPENING_BOUNDARY + '\n' + utils.linebrk(writer.buffer.toString('base64'), 64) + '\n' + PUBLIC_CLOSING_BOUNDARY;
	        }
	    },

	    publicImport: function (key, data, options) {
	        options = options || {};
	        var buffer;

	        if (options.type !== 'der') {
	            if (Buffer.isBuffer(data)) {
	                data = data.toString('utf8');
	            }

	            if (_.isString(data)) {
	                var pem = utils.trimSurroundingText(data, PUBLIC_OPENING_BOUNDARY, PUBLIC_CLOSING_BOUNDARY)
	                    .replace(/\s+|\n\r|\n|\r$/gm, '');
	                buffer = Buffer.from(pem, 'base64');
	            }
	        } else if (Buffer.isBuffer(data)) {
	            buffer = data;
	        } else {
	            throw Error('Unsupported key format');
	        }

	        var reader = new ber.Reader(buffer);
	        reader.readSequence();
	        var header = new ber.Reader(reader.readString(0x30, true));

	        if (header.readOID(0x06, true) !== PUBLIC_RSA_OID) {
	            throw Error('Invalid Public key format');
	        }

	        var body = new ber.Reader(reader.readString(0x03, true));
	        body.readByte();
	        body.readSequence();
	        key.setPublic(
	            body.readString(0x02, true), // modulus
	            body.readString(0x02, true)  // publicExponent
	        );
	    },

	    /**
	     * Trying autodetect and import key
	     * @param key
	     * @param data
	     */
	    autoImport: function (key, data) {
	        if (/^[\S\s]*-----BEGIN PRIVATE KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END PRIVATE KEY-----[\S\s]*$/g.test(data)) {
	            module.exports.privateImport(key, data);
	            return true;
	        }

	        if (/^[\S\s]*-----BEGIN PUBLIC KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END PUBLIC KEY-----[\S\s]*$/g.test(data)) {
	            module.exports.publicImport(key, data);
	            return true;
	        }

	        return false;
	    }
	};
	}(pkcs8));

	var components = {exports: {}};

	(function (module) {

	module.exports = {
	    privateExport: function (key, options) {
	        return {
	            n: key.n.toBuffer(),
	            e: key.e,
	            d: key.d.toBuffer(),
	            p: key.p.toBuffer(),
	            q: key.q.toBuffer(),
	            dmp1: key.dmp1.toBuffer(),
	            dmq1: key.dmq1.toBuffer(),
	            coeff: key.coeff.toBuffer()
	        };
	    },

	    privateImport: function (key, data, options) {
	        if (data.n && data.e && data.d && data.p && data.q && data.dmp1 && data.dmq1 && data.coeff) {
	            key.setPrivate(
	                data.n,
	                data.e,
	                data.d,
	                data.p,
	                data.q,
	                data.dmp1,
	                data.dmq1,
	                data.coeff
	            );
	        } else {
	            throw Error("Invalid key data");
	        }
	    },

	    publicExport: function (key, options) {
	        return {
	            n: key.n.toBuffer(),
	            e: key.e
	        };
	    },

	    publicImport: function (key, data, options) {
	        if (data.n && data.e) {
	            key.setPublic(
	                data.n,
	                data.e
	            );
	        } else {
	            throw Error("Invalid key data");
	        }
	    },

	    /**
	     * Trying autodetect and import key
	     * @param key
	     * @param data
	     */
	    autoImport: function (key, data) {
	        if (data.n && data.e) {
	            if (data.d && data.p && data.q && data.dmp1 && data.dmq1 && data.coeff) {
	                module.exports.privateImport(key, data);
	                return true;
	            } else {
	                module.exports.publicImport(key, data);
	                return true;
	            }
	        }

	        return false;
	    }
	};
	}(components));

	var openssh = {exports: {}};

	(function (module) {
	var _ = utils$2._;
	var utils = utils$2;
	var BigInteger = jsbn;

	const PRIVATE_OPENING_BOUNDARY = "-----BEGIN OPENSSH PRIVATE KEY-----";
	const PRIVATE_CLOSING_BOUNDARY = "-----END OPENSSH PRIVATE KEY-----";

	module.exports = {
	    privateExport: function (key, options) {
	        const nbuf = key.n.toBuffer();

	        let ebuf = Buffer.alloc(4);
	        ebuf.writeUInt32BE(key.e, 0);
	        //Slice leading zeroes
	        while (ebuf[0] === 0) ebuf = ebuf.slice(1);

	        const dbuf = key.d.toBuffer();
	        const coeffbuf = key.coeff.toBuffer();
	        const pbuf = key.p.toBuffer();
	        const qbuf = key.q.toBuffer();
	        let commentbuf;
	        if (typeof key.sshcomment !== "undefined") {
	            commentbuf = Buffer.from(key.sshcomment);
	        } else {
	            commentbuf = Buffer.from([]);
	        }

	        const pubkeyLength =
	            11 + // 32bit length, 'ssh-rsa'
	            4 + ebuf.byteLength +
	            4 + nbuf.byteLength;

	        const privateKeyLength =
	            8 + //64bit unused checksum
	            11 + // 32bit length, 'ssh-rsa'
	            4 + nbuf.byteLength +
	            4 + ebuf.byteLength +
	            4 + dbuf.byteLength +
	            4 + coeffbuf.byteLength +
	            4 + pbuf.byteLength +
	            4 + qbuf.byteLength +
	            4 + commentbuf.byteLength;

	        let length =
	            15 + //openssh-key-v1,0x00,
	            16 + // 2*(32bit length, 'none')
	            4 + // 32bit length, empty string
	            4 + // 32bit number of keys
	            4 + // 32bit pubkey length
	            pubkeyLength +
	            4 + //32bit private+checksum+comment+padding length
	            privateKeyLength;

	        const paddingLength = Math.ceil(privateKeyLength / 8) * 8 - privateKeyLength;
	        length += paddingLength;

	        const buf = Buffer.alloc(length);
	        const writer = {buf: buf, off: 0};
	        buf.write("openssh-key-v1", "utf8");
	        buf.writeUInt8(0, 14);
	        writer.off += 15;

	        writeOpenSSHKeyString(writer, Buffer.from("none"));
	        writeOpenSSHKeyString(writer, Buffer.from("none"));
	        writeOpenSSHKeyString(writer, Buffer.from(""));

	        writer.off = writer.buf.writeUInt32BE(1, writer.off);
	        writer.off = writer.buf.writeUInt32BE(pubkeyLength, writer.off);

	        writeOpenSSHKeyString(writer, Buffer.from("ssh-rsa"));
	        writeOpenSSHKeyString(writer, ebuf);
	        writeOpenSSHKeyString(writer, nbuf);

	        writer.off = writer.buf.writeUInt32BE(
	            length - 47 - pubkeyLength,
	            writer.off
	        );
	        writer.off += 8;

	        writeOpenSSHKeyString(writer, Buffer.from("ssh-rsa"));
	        writeOpenSSHKeyString(writer, nbuf);
	        writeOpenSSHKeyString(writer, ebuf);
	        writeOpenSSHKeyString(writer, dbuf);
	        writeOpenSSHKeyString(writer, coeffbuf);
	        writeOpenSSHKeyString(writer, pbuf);
	        writeOpenSSHKeyString(writer, qbuf);
	        writeOpenSSHKeyString(writer, commentbuf);

	        let pad = 0x01;
	        while (writer.off < length) {
	            writer.off = writer.buf.writeUInt8(pad++, writer.off);
	        }

	        if (options.type === "der") {
	            return writer.buf
	        } else {
	            return PRIVATE_OPENING_BOUNDARY + "\n" + utils.linebrk(buf.toString("base64"), 70) + "\n" + PRIVATE_CLOSING_BOUNDARY + "\n";
	        }
	    },

	    privateImport: function (key, data, options) {
	        options = options || {};
	        var buffer;

	        if (options.type !== "der") {
	            if (Buffer.isBuffer(data)) {
	                data = data.toString("utf8");
	            }

	            if (_.isString(data)) {
	                var pem = utils.trimSurroundingText(data, PRIVATE_OPENING_BOUNDARY, PRIVATE_CLOSING_BOUNDARY)
	                    .replace(/\s+|\n\r|\n|\r$/gm, "");
	                buffer = Buffer.from(pem, "base64");
	            } else {
	                throw Error("Unsupported key format");
	            }
	        } else if (Buffer.isBuffer(data)) {
	            buffer = data;
	        } else {
	            throw Error("Unsupported key format");
	        }

	        const reader = {buf: buffer, off: 0};

	        if (buffer.slice(0, 14).toString("ascii") !== "openssh-key-v1")
	            throw "Invalid file format.";

	        reader.off += 15;

	        //ciphername
	        if (readOpenSSHKeyString(reader).toString("ascii") !== "none")
	            throw Error("Unsupported key type");
	        //kdfname
	        if (readOpenSSHKeyString(reader).toString("ascii") !== "none")
	            throw Error("Unsupported key type");
	        //kdf
	        if (readOpenSSHKeyString(reader).toString("ascii") !== "")
	            throw Error("Unsupported key type");
	        //keynum
	        reader.off += 4;

	        //sshpublength
	        reader.off += 4;

	        //keytype
	        if (readOpenSSHKeyString(reader).toString("ascii") !== "ssh-rsa")
	            throw Error("Unsupported key type");
	        readOpenSSHKeyString(reader);
	        readOpenSSHKeyString(reader);

	        reader.off += 12;
	        if (readOpenSSHKeyString(reader).toString("ascii") !== "ssh-rsa")
	            throw Error("Unsupported key type");

	        const n = readOpenSSHKeyString(reader);
	        const e = readOpenSSHKeyString(reader);
	        const d = readOpenSSHKeyString(reader);
	        const coeff = readOpenSSHKeyString(reader);
	        const p = readOpenSSHKeyString(reader);
	        const q = readOpenSSHKeyString(reader);

	        //Calculate missing values
	        const dint = new BigInteger(d);
	        const qint = new BigInteger(q);
	        const pint = new BigInteger(p);
	        const dp = dint.mod(pint.subtract(BigInteger.ONE));
	        const dq = dint.mod(qint.subtract(BigInteger.ONE));

	        key.setPrivate(
	            n,  // modulus
	            e,  // publicExponent
	            d,  // privateExponent
	            p,  // prime1
	            q,  // prime2
	            dp.toBuffer(),  // exponent1 -- d mod (p1)
	            dq.toBuffer(),  // exponent2 -- d mod (q-1)
	            coeff  // coefficient -- (inverse of q) mod p
	        );

	        key.sshcomment = readOpenSSHKeyString(reader).toString("ascii");
	    },

	    publicExport: function (key, options) {
	        let ebuf = Buffer.alloc(4);
	        ebuf.writeUInt32BE(key.e, 0);
	        //Slice leading zeroes
	        while (ebuf[0] === 0) ebuf = ebuf.slice(1);
	        const nbuf = key.n.toBuffer();
	        const buf = Buffer.alloc(
	            ebuf.byteLength + 4 +
	            nbuf.byteLength + 4 +
	            "ssh-rsa".length + 4
	        );

	        const writer = {buf: buf, off: 0};
	        writeOpenSSHKeyString(writer, Buffer.from("ssh-rsa"));
	        writeOpenSSHKeyString(writer, ebuf);
	        writeOpenSSHKeyString(writer, nbuf);

	        let comment = key.sshcomment || "";

	        if (options.type === "der") {
	            return writer.buf
	        } else {
	            return "ssh-rsa " + buf.toString("base64") + " " + comment + "\n";
	        }
	    },

	    publicImport: function (key, data, options) {
	        options = options || {};
	        var buffer;

	        if (options.type !== "der") {
	            if (Buffer.isBuffer(data)) {
	                data = data.toString("utf8");
	            }

	            if (_.isString(data)) {
	                if (data.substring(0, 8) !== "ssh-rsa ")
	                    throw Error("Unsupported key format");
	                let pemEnd = data.indexOf(" ", 8);

	                //Handle keys with no comment
	                if (pemEnd === -1) {
	                    pemEnd = data.length;
	                } else {
	                    key.sshcomment = data.substring(pemEnd + 1)
	                        .replace(/\s+|\n\r|\n|\r$/gm, "");
	                }

	                const pem = data.substring(8, pemEnd)
	                    .replace(/\s+|\n\r|\n|\r$/gm, "");
	                buffer = Buffer.from(pem, "base64");
	            } else {
	                throw Error("Unsupported key format");
	            }
	        } else if (Buffer.isBuffer(data)) {
	            buffer = data;
	        } else {
	            throw Error("Unsupported key format");
	        }

	        const reader = {buf: buffer, off: 0};

	        const type = readOpenSSHKeyString(reader).toString("ascii");

	        if (type !== "ssh-rsa")
	            throw Error("Invalid key type: " + type);

	        const e = readOpenSSHKeyString(reader);
	        const n = readOpenSSHKeyString(reader);

	        key.setPublic(
	            n,
	            e
	        );
	    },

	    /**
	     * Trying autodetect and import key
	     * @param key
	     * @param data
	     */
	    autoImport: function (key, data) {
	        // [\S\s]* matches zero or more of any character
	        if (/^[\S\s]*-----BEGIN OPENSSH PRIVATE KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END OPENSSH PRIVATE KEY-----[\S\s]*$/g.test(data)) {
	            module.exports.privateImport(key, data);
	            return true;
	        }

	        if (/^[\S\s]*ssh-rsa \s*(?=(([A-Za-z0-9+/=]+\s*)+))\1[\S\s]*$/g.test(data)) {
	            module.exports.publicImport(key, data);
	            return true;
	        }

	        return false;
	    }
	};

	function readOpenSSHKeyString(reader) {
	    const len = reader.buf.readInt32BE(reader.off);
	    reader.off += 4;
	    const res = reader.buf.slice(reader.off, reader.off + len);
	    reader.off += len;
	    return res;
	}

	function writeOpenSSHKeyString(writer, data) {
	    writer.buf.writeInt32BE(data.byteLength, writer.off);
	    writer.off += 4;
	    writer.off += data.copy(writer.buf, writer.off);
	}
	}(openssh));

	(function (module) {

	function formatParse(format) {
	    format = format.split('-');
	    var keyType = 'private';
	    var keyOpt = {type: 'default'};

	    for (var i = 1; i < format.length; i++) {
	        if (format[i]) {
	            switch (format[i]) {
	                case 'public':
	                    keyType = format[i];
	                    break;
	                case 'private':
	                    keyType = format[i];
	                    break;
	                case 'pem':
	                    keyOpt.type = format[i];
	                    break;
	                case 'der':
	                    keyOpt.type = format[i];
	                    break;
	            }
	        }
	    }

	    return {scheme: format[0], keyType: keyType, keyOpt: keyOpt};
	}

	module.exports = {
	    pkcs1: pkcs1.exports,
	    pkcs8: pkcs8.exports,
	    components: components.exports,
	    openssh: openssh.exports,

	    isPrivateExport: function (format) {
	        return module.exports[format] && typeof module.exports[format].privateExport === 'function';
	    },

	    isPrivateImport: function (format) {
	        return module.exports[format] && typeof module.exports[format].privateImport === 'function';
	    },

	    isPublicExport: function (format) {
	        return module.exports[format] && typeof module.exports[format].publicExport === 'function';
	    },

	    isPublicImport: function (format) {
	        return module.exports[format] && typeof module.exports[format].publicImport === 'function';
	    },

	    detectAndImport: function (key, data, format) {
	        if (format === undefined) {
	            for (var scheme in module.exports) {
	                if (typeof module.exports[scheme].autoImport === 'function' && module.exports[scheme].autoImport(key, data)) {
	                    return true;
	                }
	            }
	        } else if (format) {
	            var fmt = formatParse(format);

	            if (module.exports[fmt.scheme]) {
	                if (fmt.keyType === 'private') {
	                    module.exports[fmt.scheme].privateImport(key, data, fmt.keyOpt);
	                } else {
	                    module.exports[fmt.scheme].publicImport(key, data, fmt.keyOpt);
	                }
	            } else {
	                throw Error('Unsupported key format');
	            }
	        }

	        return false;
	    },

	    detectAndExport: function (key, format) {
	        if (format) {
	            var fmt = formatParse(format);

	            if (module.exports[fmt.scheme]) {
	                if (fmt.keyType === 'private') {
	                    if (!key.isPrivate()) {
	                        throw Error("This is not private key");
	                    }
	                    return module.exports[fmt.scheme].privateExport(key, fmt.keyOpt);
	                } else {
	                    if (!key.isPublic()) {
	                        throw Error("This is not public key");
	                    }
	                    return module.exports[fmt.scheme].publicExport(key, fmt.keyOpt);
	                }
	            } else {
	                throw Error('Unsupported key format');
	            }
	        }
	    }
	};
	}(formats$1));

	/*!
	 * RSA library for Node.js
	 *
	 * Author: rzcoder
	 * License MIT
	 */

	var constants = require$$1__default['default'];
	var rsa = rsa$1;
	var _ = utils$2._;
	var utils = utils$2;
	var schemes = schemes$5.exports;
	var formats = formats$1.exports;

	if (typeof constants.RSA_NO_PADDING === "undefined") {
	    //patch for node v0.10.x, constants do not defined
	    constants.RSA_NO_PADDING = 3;
	}

	var NodeRSA$2 = (function () {
	    var SUPPORTED_HASH_ALGORITHMS = {
	        node10: ['md4', 'md5', 'ripemd160', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512'],
	        node: ['md4', 'md5', 'ripemd160', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512'],
	        iojs: ['md4', 'md5', 'ripemd160', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512'],
	        browser: ['md5', 'ripemd160', 'sha1', 'sha256', 'sha512']
	    };

	    var DEFAULT_ENCRYPTION_SCHEME = 'pkcs1_oaep';
	    var DEFAULT_SIGNING_SCHEME = 'pkcs1';

	    var DEFAULT_EXPORT_FORMAT = 'private';
	    var EXPORT_FORMAT_ALIASES = {
	        'private': 'pkcs1-private-pem',
	        'private-der': 'pkcs1-private-der',
	        'public': 'pkcs8-public-pem',
	        'public-der': 'pkcs8-public-der',
	    };

	    /**
	     * @param key {string|buffer|object} Key in PEM format, or data for generate key {b: bits, e: exponent}
	     * @constructor
	     */
	    function NodeRSA(key, format, options) {
	        if (!(this instanceof NodeRSA)) {
	            return new NodeRSA(key, format, options);
	        }

	        if (_.isObject(format)) {
	            options = format;
	            format = undefined;
	        }

	        this.$options = {
	            signingScheme: DEFAULT_SIGNING_SCHEME,
	            signingSchemeOptions: {
	                hash: 'sha256',
	                saltLength: null
	            },
	            encryptionScheme: DEFAULT_ENCRYPTION_SCHEME,
	            encryptionSchemeOptions: {
	                hash: 'sha1',
	                label: null
	            },
	            environment: utils.detectEnvironment(),
	            rsaUtils: this
	        };
	        this.keyPair = new rsa.Key();
	        this.$cache = {};

	        if (Buffer.isBuffer(key) || _.isString(key)) {
	            this.importKey(key, format);
	        } else if (_.isObject(key)) {
	            this.generateKeyPair(key.b, key.e);
	        }

	        this.setOptions(options);
	    }

	    /**
	     * Set and validate options for key instance
	     * @param options
	     */
	    NodeRSA.prototype.setOptions = function (options) {
	        options = options || {};
	        if (options.environment) {
	            this.$options.environment = options.environment;
	        }

	        if (options.signingScheme) {
	            if (_.isString(options.signingScheme)) {
	                var signingScheme = options.signingScheme.toLowerCase().split('-');
	                if (signingScheme.length == 1) {
	                    if (SUPPORTED_HASH_ALGORITHMS.node.indexOf(signingScheme[0]) > -1) {
	                        this.$options.signingSchemeOptions = {
	                            hash: signingScheme[0]
	                        };
	                        this.$options.signingScheme = DEFAULT_SIGNING_SCHEME;
	                    } else {
	                        this.$options.signingScheme = signingScheme[0];
	                        this.$options.signingSchemeOptions = {
	                            hash: null
	                        };
	                    }
	                } else {
	                    this.$options.signingSchemeOptions = {
	                        hash: signingScheme[1]
	                    };
	                    this.$options.signingScheme = signingScheme[0];
	                }
	            } else if (_.isObject(options.signingScheme)) {
	                this.$options.signingScheme = options.signingScheme.scheme || DEFAULT_SIGNING_SCHEME;
	                this.$options.signingSchemeOptions = _.omit(options.signingScheme, 'scheme');
	            }

	            if (!schemes.isSignature(this.$options.signingScheme)) {
	                throw Error('Unsupported signing scheme');
	            }

	            if (this.$options.signingSchemeOptions.hash &&
	                SUPPORTED_HASH_ALGORITHMS[this.$options.environment].indexOf(this.$options.signingSchemeOptions.hash) === -1) {
	                throw Error('Unsupported hashing algorithm for ' + this.$options.environment + ' environment');
	            }
	        }

	        if (options.encryptionScheme) {
	            if (_.isString(options.encryptionScheme)) {
	                this.$options.encryptionScheme = options.encryptionScheme.toLowerCase();
	                this.$options.encryptionSchemeOptions = {};
	            } else if (_.isObject(options.encryptionScheme)) {
	                this.$options.encryptionScheme = options.encryptionScheme.scheme || DEFAULT_ENCRYPTION_SCHEME;
	                this.$options.encryptionSchemeOptions = _.omit(options.encryptionScheme, 'scheme');
	            }

	            if (!schemes.isEncryption(this.$options.encryptionScheme)) {
	                throw Error('Unsupported encryption scheme');
	            }

	            if (this.$options.encryptionSchemeOptions.hash &&
	                SUPPORTED_HASH_ALGORITHMS[this.$options.environment].indexOf(this.$options.encryptionSchemeOptions.hash) === -1) {
	                throw Error('Unsupported hashing algorithm for ' + this.$options.environment + ' environment');
	            }
	        }

	        this.keyPair.setOptions(this.$options);
	    };

	    /**
	     * Generate private/public keys pair
	     *
	     * @param bits {int} length key in bits. Default 2048.
	     * @param exp {int} public exponent. Default 65537.
	     * @returns {NodeRSA}
	     */
	    NodeRSA.prototype.generateKeyPair = function (bits, exp) {
	        bits = bits || 2048;
	        exp = exp || 65537;

	        if (bits % 8 !== 0) {
	            throw Error('Key size must be a multiple of 8.');
	        }

	        this.keyPair.generate(bits, exp.toString(16));
	        this.$cache = {};
	        return this;
	    };

	    /**
	     * Importing key
	     * @param keyData {string|buffer|Object}
	     * @param format {string}
	     */
	    NodeRSA.prototype.importKey = function (keyData, format) {
	        if (!keyData) {
	            throw Error("Empty key given");
	        }

	        if (format) {
	            format = EXPORT_FORMAT_ALIASES[format] || format;
	        }

	        if (!formats.detectAndImport(this.keyPair, keyData, format) && format === undefined) {
	            throw Error("Key format must be specified");
	        }
	        
	        this.$cache = {};
	        
	        return this;
	    };

	    /**
	     * Exporting key
	     * @param [format] {string}
	     */
	    NodeRSA.prototype.exportKey = function (format) {
	        format = format || DEFAULT_EXPORT_FORMAT;
	        format = EXPORT_FORMAT_ALIASES[format] || format;

	        if (!this.$cache[format]) {
	            this.$cache[format] = formats.detectAndExport(this.keyPair, format);
	        }

	        return this.$cache[format];
	    };

	    /**
	     * Check if key pair contains private key
	     */
	    NodeRSA.prototype.isPrivate = function () {
	        return this.keyPair.isPrivate();
	    };

	    /**
	     * Check if key pair contains public key
	     * @param [strict] {boolean} - public key only, return false if have private exponent
	     */
	    NodeRSA.prototype.isPublic = function (strict) {
	        return this.keyPair.isPublic(strict);
	    };

	    /**
	     * Check if key pair doesn't contains any data
	     */
	    NodeRSA.prototype.isEmpty = function (strict) {
	        return !(this.keyPair.n || this.keyPair.e || this.keyPair.d);
	    };

	    /**
	     * Encrypting data method with public key
	     *
	     * @param buffer {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
	     * @param encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
	     * @param source_encoding {string} - optional. Encoding for given string. Default utf8.
	     * @returns {string|Buffer}
	     */
	    NodeRSA.prototype.encrypt = function (buffer, encoding, source_encoding) {
	        return this.$$encryptKey(false, buffer, encoding, source_encoding);
	    };

	    /**
	     * Decrypting data method with private key
	     *
	     * @param buffer {Buffer} - buffer for decrypting
	     * @param encoding - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type
	     * @returns {Buffer|object|string}
	     */
	    NodeRSA.prototype.decrypt = function (buffer, encoding) {
	        return this.$$decryptKey(false, buffer, encoding);
	    };

	    /**
	     * Encrypting data method with private key
	     *
	     * Parameters same as `encrypt` method
	     */
	    NodeRSA.prototype.encryptPrivate = function (buffer, encoding, source_encoding) {
	        return this.$$encryptKey(true, buffer, encoding, source_encoding);
	    };

	    /**
	     * Decrypting data method with public key
	     *
	     * Parameters same as `decrypt` method
	     */
	    NodeRSA.prototype.decryptPublic = function (buffer, encoding) {
	        return this.$$decryptKey(true, buffer, encoding);
	    };

	    /**
	     * Encrypting data method with custom key
	     */
	    NodeRSA.prototype.$$encryptKey = function (usePrivate, buffer, encoding, source_encoding) {
	        try {
	            var res = this.keyPair.encrypt(this.$getDataForEncrypt(buffer, source_encoding), usePrivate);

	            if (encoding == 'buffer' || !encoding) {
	                return res;
	            } else {
	                return res.toString(encoding);
	            }
	        } catch (e) {
	            throw Error('Error during encryption. Original error: ' + e);
	        }
	    };

	    /**
	     * Decrypting data method with custom key
	     */
	    NodeRSA.prototype.$$decryptKey = function (usePublic, buffer, encoding) {
	        try {
	            buffer = _.isString(buffer) ? Buffer.from(buffer, 'base64') : buffer;
	            var res = this.keyPair.decrypt(buffer, usePublic);

	            if (res === null) {
	                throw Error('Key decrypt method returns null.');
	            }

	            return this.$getDecryptedData(res, encoding);
	        } catch (e) {
	            throw Error('Error during decryption (probably incorrect key). Original error: ' + e);
	        }
	    };

	    /**
	     *  Signing data
	     *
	     * @param buffer {string|number|object|array|Buffer} - data for signing. Object and array will convert to JSON string.
	     * @param encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
	     * @param source_encoding {string} - optional. Encoding for given string. Default utf8.
	     * @returns {string|Buffer}
	     */
	    NodeRSA.prototype.sign = function (buffer, encoding, source_encoding) {
	        if (!this.isPrivate()) {
	            throw Error("This is not private key");
	        }

	        var res = this.keyPair.sign(this.$getDataForEncrypt(buffer, source_encoding));

	        if (encoding && encoding != 'buffer') {
	            res = res.toString(encoding);
	        }

	        return res;
	    };

	    /**
	     *  Verifying signed data
	     *
	     * @param buffer - signed data
	     * @param signature
	     * @param source_encoding {string} - optional. Encoding for given string. Default utf8.
	     * @param signature_encoding - optional. Encoding of given signature. May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
	     * @returns {*}
	     */
	    NodeRSA.prototype.verify = function (buffer, signature, source_encoding, signature_encoding) {
	        if (!this.isPublic()) {
	            throw Error("This is not public key");
	        }
	        signature_encoding = (!signature_encoding || signature_encoding == 'buffer' ? null : signature_encoding);
	        return this.keyPair.verify(this.$getDataForEncrypt(buffer, source_encoding), signature, signature_encoding);
	    };

	    /**
	     * Returns key size in bits
	     * @returns {int}
	     */
	    NodeRSA.prototype.getKeySize = function () {
	        return this.keyPair.keySize;
	    };

	    /**
	     * Returns max message length in bytes (for 1 chunk) depending on current encryption scheme
	     * @returns {int}
	     */
	    NodeRSA.prototype.getMaxMessageSize = function () {
	        return this.keyPair.maxMessageLength;
	    };

	    /**
	     * Preparing given data for encrypting/signing. Just make new/return Buffer object.
	     *
	     * @param buffer {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
	     * @param encoding {string} - optional. Encoding for given string. Default utf8.
	     * @returns {Buffer}
	     */
	    NodeRSA.prototype.$getDataForEncrypt = function (buffer, encoding) {
	        if (_.isString(buffer) || _.isNumber(buffer)) {
	            return Buffer.from('' + buffer, encoding || 'utf8');
	        } else if (Buffer.isBuffer(buffer)) {
	            return buffer;
	        } else if (_.isObject(buffer)) {
	            return Buffer.from(JSON.stringify(buffer));
	        } else {
	            throw Error("Unexpected data type");
	        }
	    };

	    /**
	     *
	     * @param buffer {Buffer} - decrypted data.
	     * @param encoding - optional. Encoding for result output. May be 'buffer', 'json' or any of Node.js Buffer supported encoding.
	     * @returns {*}
	     */
	    NodeRSA.prototype.$getDecryptedData = function (buffer, encoding) {
	        encoding = encoding || 'buffer';

	        if (encoding == 'buffer') {
	            return buffer;
	        } else if (encoding == 'json') {
	            return JSON.parse(buffer.toString());
	        } else {
	            return buffer.toString(encoding);
	        }
	    };

	    return NodeRSA;
	})();

	const COSE_KEYS$3 = {
	  kty: 1,
	  alg: 3,
	  crv: -1,
	  x: -2,
	  y: -3,
	  n: -1,
	  e: -2,
	};
	const COSE_KTY$2 = {
	  OKP: 1,
	  EC2: 2,
	  RSA: 3,
	};

	const COSE_RSA_SCHEME$2 = {
	  '-3': 'pss-sha256',
	  '-39': 'pss-sha512',
	  '-38': 'pss-sha384',
	  '-65535': 'pkcs1-sha1',
	  '-257': 'pkcs1-sha256',
	  '-258': 'pkcs1-sha384',
	  '-259': 'pkcs1-sha512',
	};

	const COSE_CRV$1 = {
	  1: 'p256',
	  2: 'p384',
	  3: 'p521',
	};

	const COSE_ALG_HASH$1 = {
	  '-257': 'sha256',
	  '-258': 'sha384',
	  '-259': 'sha512',
	  '-65535': 'sha1',
	  '-39': 'sha512',
	  '-38': 'sha384',
	  // '-37': 'sha256',
	  '-260': 'sha256',
	  '-261': 'sha512',
	  '-7': 'sha256',
	  '-36': 'sha384',
	  '-37': 'sha512',
	};

	var cose = {
	  COSE_KEYS: COSE_KEYS$3,
	  COSE_KTY: COSE_KTY$2,
	  COSE_RSA_SCHEME: COSE_RSA_SCHEME$2,
	  COSE_CRV: COSE_CRV$1,
	  COSE_ALG_HASH: COSE_ALG_HASH$1,
	};

	const base64url$4 = base64url$9.exports;
	const elliptic$1 = elliptic$2;
	const NodeRSA$1 = NodeRSA$2;
	const cbor$3 = cbor$5;
	const {
	  hash: hash$3, parseAuthData: parseAuthData$3, verifySignature: verifySignature$3, COSEECDHAtoPKCS: COSEECDHAtoPKCS$3, base64ToPem: base64ToPem$1, getCertificationInfo: getCertificationInfo$1,
	} = common$6;
	const {
	  COSE_ALG_HASH, COSE_KEYS: COSE_KEYS$2, COSE_KTY: COSE_KTY$1, COSE_CRV, COSE_RSA_SCHEME: COSE_RSA_SCHEME$1,
	} = cose;

	const EC = elliptic$1.ec;
	const EdDSA$1 = elliptic$1.eddsa;

	async function verifyPackedAttestation$1(ctapCredentialResponse, clientDataJSON) {
	  const authenticatorDataStruct = parseAuthData$3(ctapCredentialResponse.authData);
	  const clientDataHash = hash$3('SHA256', base64url$4.decode(clientDataJSON));
	  const signatureBase = Buffer.concat([
	    ctapCredentialResponse.authData,
	    clientDataHash,
	  ]);

	  const signature = ctapCredentialResponse.attStmt.sig;

	  if (ctapCredentialResponse.attStmt.x5c) {
	    const leafCert = base64ToPem$1(ctapCredentialResponse.attStmt.x5c[0].toString('base64'));
	    const certInfo = getCertificationInfo$1(leafCert);

	    if (certInfo.subject.OU !== 'Authenticator Attestation') { throw new Error('Batch certificate OU MUST be set strictly to "Authenticator Attestation"!'); }

	    if (!certInfo.subject.CN) { throw new Error('Batch certificate CN MUST no be empty!'); }

	    if (!certInfo.subject.O) { throw new Error('Batch certificate CN MUST no be empty!'); }

	    if (!certInfo.subject.C || certInfo.subject.C.length !== 2) { throw new Error('Batch certificate C MUST be set to two character ISO 3166 code!'); }

	    if (certInfo.basicConstraintsCA) { throw new Error('Batch certificate basic constraints CA MUST be false!'); }

	    if (certInfo.version !== 3) { throw new Error('Batch certificate version MUST be 3(ASN1 2)!'); }

	    const verified = await verifySignature$3(signature, signatureBase, leafCert);
	    const publicKey = COSEECDHAtoPKCS$3(authenticatorDataStruct.COSEPublicKey);

	    return {
	      verified,
	      authrInfo: {
	        fmt: 'packed',
	        publicKey: base64url$4(publicKey),
	        counter: authenticatorDataStruct.counter,
	        credID: base64url$4(authenticatorDataStruct.credID),
	      },
	    };
	  }
	  if (ctapCredentialResponse.attStmt.ecdaaKeyId) { throw new Error('ECDAA not implemented yet'); } else {
	    const publicKeyCose = cbor$3.decodeAllSync(authenticatorDataStruct.COSEPublicKey)[0];
	    const hashAlg = COSE_ALG_HASH[publicKeyCose.get(COSE_KEYS$2.alg)];
	    if (publicKeyCose.get(COSE_KEYS$2.kty) === COSE_KTY$1.EC2) {
	      const ansiKey = COSEECDHAtoPKCS$3(publicKeyCose);

	      const signatureBaseHash = hash$3(hashAlg, signatureBase);

	      const ec = new EC(COSE_CRV[publicKeyCose.get(COSE_KEYS$2.crv)]);
	      const key = ec.keyFromPublic(ansiKey);

	      const verifed = key.verify(signatureBaseHash, signature);

	      return {
	        verifed,
	        authrInfo: {
	          fmt: 'packed',
	          publicKey: ansiKey,
	          counter: authenticatorDataStruct.counter,
	          credID: base64url$4(authenticatorDataStruct.credID),
	        },
	      };
	    }
	    if (publicKeyCose.get(COSE_KEYS$2.kty) === COSE_KTY$1.RSA) {
	      const signingScheme = COSE_RSA_SCHEME$1[publicKeyCose.get(COSE_KEYS$2.alg)];
	      const key = new NodeRSA$1(undefined, { signingScheme });
	      key.importKey({
	        n: publicKeyCose.get(COSE_KEYS$2.n),
	        e: publicKeyCose.get(COSE_KEYS$2.e),
	      }, 'components-public');
	      const verified = key.verify(signatureBase, signature);
	      return {
	        verified,
	        authrInfo: {
	          fmt: 'packed',
	          publicKey: key.exportKey('pkcs1-public-pem'),
	          counter: authenticatorDataStruct.counter,
	          credID: base64url$4(authenticatorDataStruct.credID),
	        },
	      };
	    }
	    if (publicKeyCose.get(COSE_KEYS$2.kty) === COSE_KTY$1.OKP) {
	      // Probly won't work
	      const x = publicKeyCose.get(COSE_KEYS$2.x);
	      const signatureBaseHash = hash$3(hashAlg, signatureBase);

	      const key = new EdDSA$1('ed25519');
	      key.keyFromPublic(x);

	      const verifed = key.verify(signatureBaseHash, signature);
	      return {
	        verifed,
	        authrInfo: {
	          fmt: 'packed',
	          publicKey: key,
	          counter: authenticatorDataStruct.counter,
	          credID: base64url$4(authenticatorDataStruct.credID),
	        },
	      };
	    }
	  }
	  return null;
	}

	var packedAttestation = verifyPackedAttestation$1;

	var asn1$1 = {exports: {}};

	(function (module) {
	// ASN.1 JavaScript decoder
	// Copyright (c) 2008-2020 Lapo Luchini <lapo@lapo.it>

	// Permission to use, copy, modify, and/or distribute this software for any
	// purpose with or without fee is hereby granted, provided that the above
	// copyright notice and this permission notice appear in all copies.
	// 
	// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

	(function (factory) {    module.exports = factory(function (name) { return commonjsRequire(name); });
	})(function (require) {

	var Int10 = require('./int10'),
	    oids = require('./oids'),
	    ellipsis = "\u2026",
	    reTimeS =     /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
	    reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

	function stringCut(str, len) {
	    if (str.length > len)
	        str = str.substring(0, len) + ellipsis;
	    return str;
	}

	function Stream(enc, pos) {
	    if (enc instanceof Stream) {
	        this.enc = enc.enc;
	        this.pos = enc.pos;
	    } else {
	        // enc should be an array or a binary string
	        this.enc = enc;
	        this.pos = pos;
	    }
	}
	Stream.prototype.get = function (pos) {
	    if (pos === undefined)
	        pos = this.pos++;
	    if (pos >= this.enc.length)
	        throw 'Requesting byte offset ' + pos + ' on a stream of length ' + this.enc.length;
	    return (typeof this.enc == "string") ? this.enc.charCodeAt(pos) : this.enc[pos];
	};
	Stream.prototype.hexDigits = "0123456789ABCDEF";
	Stream.prototype.hexByte = function (b) {
	    return this.hexDigits.charAt((b >> 4) & 0xF) + this.hexDigits.charAt(b & 0xF);
	};
	Stream.prototype.hexDump = function (start, end, raw) {
	    var s = "";
	    for (var i = start; i < end; ++i) {
	        s += this.hexByte(this.get(i));
	        if (raw !== true)
	            switch (i & 0xF) {
	            case 0x7: s += "  "; break;
	            case 0xF: s += "\n"; break;
	            default:  s += " ";
	            }
	    }
	    return s;
	};
	var b64Safe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
	Stream.prototype.b64Dump = function (start, end) {
	    var extra = (end - start) % 3,
	        s = '',
	        i, c;
	    for (i = start; i + 2 < end; i += 3) {
	        c = this.get(i) << 16 | this.get(i + 1) << 8 | this.get(i + 2);
	        s += b64Safe.charAt(c >> 18 & 0x3F);
	        s += b64Safe.charAt(c >> 12 & 0x3F);
	        s += b64Safe.charAt(c >>  6 & 0x3F);
	        s += b64Safe.charAt(c       & 0x3F);
	    }
	    if (extra > 0) {
	        c = this.get(i) << 16;
	        if (extra > 1) c |= this.get(i + 1) << 8;
	        s += b64Safe.charAt(c >> 18 & 0x3F);
	        s += b64Safe.charAt(c >> 12 & 0x3F);
	        if (extra == 2) s += b64Safe.charAt(c >> 6 & 0x3F);
	    }
	    return s;
	};
	Stream.prototype.isASCII = function (start, end) {
	    for (var i = start; i < end; ++i) {
	        var c = this.get(i);
	        if (c < 32 || c > 176)
	            return false;
	    }
	    return true;
	};
	Stream.prototype.parseStringISO = function (start, end) {
	    var s = "";
	    for (var i = start; i < end; ++i)
	        s += String.fromCharCode(this.get(i));
	    return s;
	};
	Stream.prototype.parseStringUTF = function (start, end) {
	    function ex(c) { // must be 10xxxxxx
	        if ((c < 0x80) || (c >= 0xC0))
	            throw new Error('Invalid UTF-8 continuation byte: ' + c);
	        return (c & 0x3F);
	    }
	    function surrogate(cp) {
	        if (cp < 0x10000)
	            throw new Error('UTF-8 overlong encoding, codepoint encoded in 4 bytes: ' + cp);
	        // we could use String.fromCodePoint(cp) but let's be nice to older browsers and use surrogate pairs
	        cp -= 0x10000;
	        return String.fromCharCode((cp >> 10) + 0xD800, (cp & 0x3FF) + 0xDC00);
	    }
	    var s = "";
	    for (var i = start; i < end; ) {
	        var c = this.get(i++);
	        if (c < 0x80) // 0xxxxxxx (7 bit)
	            s += String.fromCharCode(c);
	        else if (c < 0xC0)
	            throw new Error('Invalid UTF-8 starting byte: ' + c);
	        else if (c < 0xE0) // 110xxxxx 10xxxxxx (11 bit)
	            s += String.fromCharCode(((c & 0x1F) << 6) | ex(this.get(i++)));
	        else if (c < 0xF0) // 1110xxxx 10xxxxxx 10xxxxxx (16 bit)
	            s += String.fromCharCode(((c & 0x0F) << 12) | (ex(this.get(i++)) << 6) | ex(this.get(i++)));
	        else if (c < 0xF8) // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx (21 bit)
	            s += surrogate(((c & 0x07) << 18) | (ex(this.get(i++)) << 12) | (ex(this.get(i++)) << 6) | ex(this.get(i++)));
	        else
	            throw new Error('Invalid UTF-8 starting byte (since 2003 it is restricted to 4 bytes): ' + c);
	    }
	    return s;
	};
	Stream.prototype.parseStringBMP = function (start, end) {
	    var str = "", hi, lo;
	    for (var i = start; i < end; ) {
	        hi = this.get(i++);
	        lo = this.get(i++);
	        str += String.fromCharCode((hi << 8) | lo);
	    }
	    return str;
	};
	Stream.prototype.parseTime = function (start, end, shortYear) {
	    var s = this.parseStringISO(start, end),
	        m = (shortYear ? reTimeS : reTimeL).exec(s);
	    if (!m)
	        return "Unrecognized time: " + s;
	    if (shortYear) {
	        // to avoid querying the timer, use the fixed range [1970, 2069]
	        // it will conform with ITU X.400 [-10, +40] sliding window until 2030
	        m[1] = +m[1];
	        m[1] += (m[1] < 70) ? 2000 : 1900;
	    }
	    s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
	    if (m[5]) {
	        s += ":" + m[5];
	        if (m[6]) {
	            s += ":" + m[6];
	            if (m[7])
	                s += "." + m[7];
	        }
	    }
	    if (m[8]) {
	        s += " UTC";
	        if (m[8] != 'Z') {
	            s += m[8];
	            if (m[9])
	                s += ":" + m[9];
	        }
	    }
	    return s;
	};
	Stream.prototype.parseInteger = function (start, end) {
	    var v = this.get(start),
	        neg = (v > 127),
	        pad = neg ? 255 : 0,
	        len,
	        s = '';
	    // skip unuseful bits (not allowed in DER)
	    while (v == pad && ++start < end)
	        v = this.get(start);
	    len = end - start;
	    if (len === 0)
	        return neg ? '-1' : '0';
	    // show bit length of huge integers
	    if (len > 4) {
	        s = v;
	        len <<= 3;
	        while (((s ^ pad) & 0x80) == 0) {
	            s <<= 1;
	            --len;
	        }
	        s = "(" + len + " bit)\n";
	    }
	    // decode the integer
	    if (neg) v = v - 256;
	    var n = new Int10(v);
	    for (var i = start + 1; i < end; ++i)
	        n.mulAdd(256, this.get(i));
	    return s + n.toString();
	};
	Stream.prototype.parseBitString = function (start, end, maxLength) {
	    var unusedBits = this.get(start);
	    if (unusedBits > 7)
	        throw 'Invalid BitString with unusedBits=' + unusedBits;
	    var lenBit = ((end - start - 1) << 3) - unusedBits,
	        s = "";
	    for (var i = start + 1; i < end; ++i) {
	        var b = this.get(i),
	            skip = (i == end - 1) ? unusedBits : 0;
	        for (var j = 7; j >= skip; --j)
	            s += (b >> j) & 1 ? "1" : "0";
	        if (s.length > maxLength)
	            s = stringCut(s, maxLength);
	    }
	    return { size: lenBit, str: s };
	};
	Stream.prototype.parseOctetString = function (start, end, maxLength) {
	    var len = end - start,
	        s;
	    try {
	        s = this.parseStringUTF(start, end);
	        var v;
	        for (i = 0; i < s.length; ++i) {
	            v = s.charCodeAt(i);
	            if (v < 32 && v != 9 && v != 10 && v != 13) // [\t\r\n] are (kinda) printable
	                throw new Error('Unprintable character at index ' + i + ' (code ' + s.charCodeAt(i) + ")");
	        }
	        return { size: len, str: s };
	    } catch (e) {
	        // ignore
	    }
	    maxLength /= 2; // we work in bytes
	    if (len > maxLength)
	        end = start + maxLength;
	    s = '';
	    for (var i = start; i < end; ++i)
	        s += this.hexByte(this.get(i));
	    if (len > maxLength)
	        s += ellipsis;
	    return { size: len, str: s };
	};
	Stream.prototype.parseOID = function (start, end, maxLength) {
	    var s = '',
	        n = new Int10(),
	        bits = 0;
	    for (var i = start; i < end; ++i) {
	        var v = this.get(i);
	        n.mulAdd(128, v & 0x7F);
	        bits += 7;
	        if (!(v & 0x80)) { // finished
	            if (s === '') {
	                n = n.simplify();
	                if (n instanceof Int10) {
	                    n.sub(80);
	                    s = "2." + n.toString();
	                } else {
	                    var m = n < 80 ? n < 40 ? 0 : 1 : 2;
	                    s = m + "." + (n - m * 40);
	                }
	            } else
	                s += "." + n.toString();
	            if (s.length > maxLength)
	                return stringCut(s, maxLength);
	            n = new Int10();
	            bits = 0;
	        }
	    }
	    if (bits > 0)
	        s += ".incomplete";
	    if (typeof oids === 'object') {
	        var oid = oids[s];
	        if (oid) {
	            if (oid.d) s += "\n" + oid.d;
	            if (oid.c) s += "\n" + oid.c;
	            if (oid.w) s += "\n(warning!)";
	        }
	    }
	    return s;
	};

	function ASN1(stream, header, length, tag, tagLen, sub) {
	    if (!(tag instanceof ASN1Tag)) throw 'Invalid tag value.';
	    this.stream = stream;
	    this.header = header;
	    this.length = length;
	    this.tag = tag;
	    this.tagLen = tagLen;
	    this.sub = sub;
	}
	ASN1.prototype.typeName = function () {
	    switch (this.tag.tagClass) {
	    case 0: // universal
	        switch (this.tag.tagNumber) {
	        case 0x00: return "EOC";
	        case 0x01: return "BOOLEAN";
	        case 0x02: return "INTEGER";
	        case 0x03: return "BIT_STRING";
	        case 0x04: return "OCTET_STRING";
	        case 0x05: return "NULL";
	        case 0x06: return "OBJECT_IDENTIFIER";
	        case 0x07: return "ObjectDescriptor";
	        case 0x08: return "EXTERNAL";
	        case 0x09: return "REAL";
	        case 0x0A: return "ENUMERATED";
	        case 0x0B: return "EMBEDDED_PDV";
	        case 0x0C: return "UTF8String";
	        case 0x10: return "SEQUENCE";
	        case 0x11: return "SET";
	        case 0x12: return "NumericString";
	        case 0x13: return "PrintableString"; // ASCII subset
	        case 0x14: return "TeletexString"; // aka T61String
	        case 0x15: return "VideotexString";
	        case 0x16: return "IA5String"; // ASCII
	        case 0x17: return "UTCTime";
	        case 0x18: return "GeneralizedTime";
	        case 0x19: return "GraphicString";
	        case 0x1A: return "VisibleString"; // ASCII subset
	        case 0x1B: return "GeneralString";
	        case 0x1C: return "UniversalString";
	        case 0x1E: return "BMPString";
	        }
	        return "Universal_" + this.tag.tagNumber.toString();
	    case 1: return "Application_" + this.tag.tagNumber.toString();
	    case 2: return "[" + this.tag.tagNumber.toString() + "]"; // Context
	    case 3: return "Private_" + this.tag.tagNumber.toString();
	    }
	};
	function recurse(el, parser, maxLength) {
	    var differentTags = false;
	    if (el.sub) el.sub.forEach(function (e1) {
	        if (e1.tag.tagClass != el.tag.tagClass || e1.tag.tagNumber != el.tag.tagNumber)
	            differentTags = true;
	    });
	    if (!el.sub || differentTags)
	        return el.stream[parser](el.posContent(), el.posContent() + Math.abs(el.length), maxLength);
	    var d = { size: 0, str: '' };
	    el.sub.forEach(function (el) {
	        var d1 = recurse(el, parser, maxLength - d.str.length);
	        d.size += d1.size;
	        d.str += d1.str;
	    });
	    return d;
	}
	/** A string preview of the content (intended for humans). */
	ASN1.prototype.content = function (maxLength) {
	    if (this.tag === undefined)
	        return null;
	    if (maxLength === undefined)
	        maxLength = Infinity;
	    var content = this.posContent(),
	        len = Math.abs(this.length);
	    if (!this.tag.isUniversal()) {
	        if (this.sub !== null)
	            return "(" + this.sub.length + " elem)";
	        var d1 = this.stream.parseOctetString(content, content + len, maxLength);
	        return "(" + d1.size + " byte)\n" + d1.str;
	    }
	    switch (this.tag.tagNumber) {
	    case 0x01: // BOOLEAN
	        return (this.stream.get(content) === 0) ? "false" : "true";
	    case 0x02: // INTEGER
	        return this.stream.parseInteger(content, content + len);
	    case 0x03: // BIT_STRING
	        var d = recurse(this, 'parseBitString', maxLength);
	        return "(" + d.size + " bit)\n" + d.str;
	    case 0x04: // OCTET_STRING
	        d = recurse(this, 'parseOctetString', maxLength);
	        return "(" + d.size + " byte)\n" + d.str;
	    //case 0x05: // NULL
	    case 0x06: // OBJECT_IDENTIFIER
	        return this.stream.parseOID(content, content + len, maxLength);
	    //case 0x07: // ObjectDescriptor
	    //case 0x08: // EXTERNAL
	    //case 0x09: // REAL
	    case 0x0A: // ENUMERATED
	        return this.stream.parseInteger(content, content + len);
	    //case 0x0B: // EMBEDDED_PDV
	    case 0x10: // SEQUENCE
	    case 0x11: // SET
	        if (this.sub !== null)
	            return "(" + this.sub.length + " elem)";
	        else
	            return "(no elem)";
	    case 0x0C: // UTF8String
	        return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
	    case 0x12: // NumericString
	    case 0x13: // PrintableString
	    case 0x14: // TeletexString
	    case 0x15: // VideotexString
	    case 0x16: // IA5String
	    case 0x1A: // VisibleString
	    case 0x1B: // GeneralString
	    //case 0x19: // GraphicString
	    //case 0x1C: // UniversalString
	        return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
	    case 0x1E: // BMPString
	        return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
	    case 0x17: // UTCTime
	    case 0x18: // GeneralizedTime
	        return this.stream.parseTime(content, content + len, (this.tag.tagNumber == 0x17));
	    }
	    return null;
	};
	ASN1.prototype.toString = function () {
	    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + ((this.sub === null) ? 'null' : this.sub.length) + "]";
	};
	ASN1.prototype.toPrettyString = function (indent) {
	    if (indent === undefined) indent = '';
	    var s = indent + this.typeName() + " @" + this.stream.pos;
	    if (this.length >= 0)
	        s += "+";
	    s += this.length;
	    if (this.tag.tagConstructed)
	        s += " (constructed)";
	    else if ((this.tag.isUniversal() && ((this.tag.tagNumber == 0x03) || (this.tag.tagNumber == 0x04))) && (this.sub !== null))
	        s += " (encapsulates)";
	    var content = this.content();
	    if (content)
	        s += ": " + content.replace(/\n/g, '|');
	    s += "\n";
	    if (this.sub !== null) {
	        indent += '  ';
	        for (var i = 0, max = this.sub.length; i < max; ++i)
	            s += this.sub[i].toPrettyString(indent);
	    }
	    return s;
	};
	ASN1.prototype.posStart = function () {
	    return this.stream.pos;
	};
	ASN1.prototype.posContent = function () {
	    return this.stream.pos + this.header;
	};
	ASN1.prototype.posEnd = function () {
	    return this.stream.pos + this.header + Math.abs(this.length);
	};
	/** Position of the length. */
	ASN1.prototype.posLen = function() {
	    return this.stream.pos + this.tagLen;
	};
	ASN1.prototype.toHexString = function () {
	    return this.stream.hexDump(this.posStart(), this.posEnd(), true);
	};
	ASN1.prototype.toB64String = function () {
	    return this.stream.b64Dump(this.posStart(), this.posEnd());
	};
	ASN1.decodeLength = function (stream) {
	    var buf = stream.get(),
	        len = buf & 0x7F;
	    if (len == buf) // first bit was 0, short form
	        return len;
	    if (len === 0) // long form with length 0 is a special case
	        return null; // undefined length
	    if (len > 6) // no reason to use Int10, as it would be a huge buffer anyways
	        throw "Length over 48 bits not supported at position " + (stream.pos - 1);
	    buf = 0;
	    for (var i = 0; i < len; ++i)
	        buf = (buf * 256) + stream.get();
	    return buf;
	};
	function ASN1Tag(stream) {
	    var buf = stream.get();
	    this.tagClass = buf >> 6;
	    this.tagConstructed = ((buf & 0x20) !== 0);
	    this.tagNumber = buf & 0x1F;
	    if (this.tagNumber == 0x1F) { // long tag
	        var n = new Int10();
	        do {
	            buf = stream.get();
	            n.mulAdd(128, buf & 0x7F);
	        } while (buf & 0x80);
	        this.tagNumber = n.simplify();
	    }
	}
	ASN1Tag.prototype.isUniversal = function () {
	    return this.tagClass === 0x00;
	};
	ASN1Tag.prototype.isEOC = function () {
	    return this.tagClass === 0x00 && this.tagNumber === 0x00;
	};
	ASN1.decode = function (stream, offset) {
	    if (!(stream instanceof Stream))
	        stream = new Stream(stream, offset || 0);
	    var streamStart = new Stream(stream),
	        tag = new ASN1Tag(stream),
	        tagLen = stream.pos - streamStart.pos,
	        len = ASN1.decodeLength(stream),
	        start = stream.pos,
	        header = start - streamStart.pos,
	        sub = null,
	        getSub = function () {
	            sub = [];
	            if (len !== null) {
	                // definite length
	                var end = start + len;
	                if (end > stream.enc.length)
	                    throw 'Container at offset ' + start +  ' has a length of ' + len + ', which is past the end of the stream';
	                while (stream.pos < end)
	                    sub[sub.length] = ASN1.decode(stream);
	                if (stream.pos != end)
	                    throw 'Content size is not correct for container at offset ' + start;
	            } else {
	                // undefined length
	                try {
	                    for (;;) {
	                        var s = ASN1.decode(stream);
	                        if (s.tag.isEOC())
	                            break;
	                        sub[sub.length] = s;
	                    }
	                    len = start - stream.pos; // undefined lengths are represented as negative values
	                } catch (e) {
	                    throw 'Exception while decoding undefined length content at offset ' + start + ': ' + e;
	                }
	            }
	        };
	    if (tag.tagConstructed) {
	        // must have valid content
	        getSub();
	    } else if (tag.isUniversal() && ((tag.tagNumber == 0x03) || (tag.tagNumber == 0x04))) {
	        // sometimes BitString and OctetString are used to encapsulate ASN.1
	        try {
	            if (tag.tagNumber == 0x03)
	                if (stream.get() != 0)
	                    throw "BIT STRINGs with unused bits cannot encapsulate.";
	            getSub();
	            for (var i = 0; i < sub.length; ++i)
	                if (sub[i].tag.isEOC())
	                    throw 'EOC is not supposed to be actual content.';
	        } catch (e) {
	            // but silently ignore when they don't
	            sub = null;
	            //DEBUG console.log('Could not decode structure at ' + start + ':', e);
	        }
	    }
	    if (sub === null) {
	        if (len === null)
	            throw "We can't skip over an invalid tag with undefined length at offset " + start;
	        stream.pos = start + Math.abs(len);
	    }
	    return new ASN1(streamStart, header, len, tag, tagLen, sub);
	};

	return ASN1;

	});
	}(asn1$1));

	const asn1 = asn1$1.exports;
	const base64url$3 = base64url$9.exports;
	const cbor$2 = cbor$5;
	const {
	  hash: hash$2, parseAuthData: parseAuthData$2, verifySignature: verifySignature$2, COSEECDHAtoPKCS: COSEECDHAtoPKCS$2, base64ToPem, validateCertificationPath: validateCertificationPath$1,
	} = common$6;
	const { COSE_KEYS: COSE_KEYS$1 } = cose;

	function findOID(asn1object, oid) {
	  if (!asn1object.sub) return null;

	  for (const sub of asn1object.sub) {
	    if (sub.typeName() !== 'OBJECT_IDENTIFIER' || sub.content() !== oid) {
	      const result = findOID(sub, oid);

	      if (result) return result;
	    } else return asn1object;
	  }
	  return null;
	}

	function asn1ObjectToJSON(asn1object) {
	  const JASN1 = {
	    type: asn1object.typeName(),
	  };

	  if (!asn1object.sub) {
	    if (asn1object.typeName() === 'BIT_STRING' || asn1object.typeName() === 'OCTET_STRING') { JASN1.data = asn1object.stream.enc.slice(asn1object.posContent(), asn1object.posEnd()); } else JASN1.data = asn1object.content();

	    return JASN1;
	  }

	  JASN1.data = [];
	  for (const sub of asn1object.sub) {
	    JASN1.data.push(asn1ObjectToJSON(sub));
	  }

	  return JASN1;
	}

	function containsASN1Tag(seq, tag) {
	  for (const member of seq) if (member.type === `[${tag}]`) return true;

	  return false;
	}

	async function verifyAndroidKeyAttestation$1(ctapCredResp, clientDataJSON) {
	  const authenticatorDataStruct = parseAuthData$2(ctapCredResp.authData);
	  const clientDataHash = hash$2('SHA256', clientDataJSON);

	  const signatureBase = Buffer.concat([ctapCredResp, clientDataHash]);
	  const signature = ctapCredResp.attStmt.sig;

	  const leafCert = base64ToPem(ctapCredResp.attStmt.x5c[0].toString('base64'));

	  const signatureValid = await verifySignature$2(signature, signatureBase, leafCert);
	  if (!signatureValid) throw new Error('Signature verification failed');

	  const certPath = ctapCredResp.x5c.map((cert) => base64ToPem(cert.toString('base64')));

	  validateCertificationPath$1(certPath);

	  const certASN1 = asn1.decode(ctapCredResp.attStmt.x5c[0]);
	  const certJSON = asn1ObjectToJSON(certASN1);
	  const certTSB = certJSON.data[0];
	  const certPubKey = certTSB.data[6];
	  const certPubKeyBuff = certPubKey.data[1].data;

	  const coseKey = cbor$2.decodeAllSync(authenticatorDataStruct.COSEPublicKey)[0];
	  const ansiKeyPad = Buffer.concat([
	    Buffer.from([0x00, 0x04]),
	    coseKey.get(COSE_KEYS$1.x), coseKey.get(COSE_KEYS$1.y),
	  ]);

	  if (ansiKeyPad.toString('hex') !== certPubKeyBuff.toString('hex')) { throw new Error('Certificate public key does not match public key in authData'); }

	  const attestationExtension = findOID(certASN1, '1.3.6.1.4.1.11129.2.1.17');
	  const attestationExtensionJSON = asn1ObjectToJSON(attestationExtension);

	  /*
	  const attestationChallenge = attestationExtensionJSON.data[1].data[0].data[4].data;

	  if (attestationChallenge.toString('hex') !== clientDataHashBuf.toString('hex')) {
	    throw new Error('Certificate attestation challenge is not set to the clientData hash!');
	  }
	  */

	  const softwareEnforcedAuthz = attestationExtensionJSON.data[1].data[0].data[6].data;
	  const teeEnforcedAuthz = attestationExtensionJSON.data[1].data[0].data[7].data;

	  if (containsASN1Tag(softwareEnforcedAuthz, 600) || containsASN1Tag(teeEnforcedAuthz, 600)) {
	    throw new Error(
	      'TEE or Software authorization list contains "allApplication" flag, which means that credential is not bound to the RP!',
	    );
	  }

	  const verifed = true;
	  const publicKey = COSEECDHAtoPKCS$2(authenticatorDataStruct.COSEPublicKey);

	  return {
	    verifed,
	    authrInfo: {
	      fmt: 'android-key',
	      publicKey: base64url$3(publicKey),
	      counter: authenticatorDataStruct.counter,
	      credID: base64url$3(authenticatorDataStruct.credID),
	    },
	  };
	}

	var androidKeyAttestation = verifyAndroidKeyAttestation$1;

	const base64url$2 = base64url$9.exports;
	const {
	  hash: hash$1,
	  parseAuthData: parseAuthData$1,
	  verifySignature: verifySignature$1,
	  COSEECDHAtoPKCS: COSEECDHAtoPKCS$1,
	  getCertificationInfo,
	  gsr2,
	  validateCertificationPath,
	} = common$6;

	async function verifyAndroidSafetyNeyAttestation(ctapCredResp, clientDataJSON) {
	  const authenticatorDataStruct = parseAuthData$1(ctapCredResp.authData);

	  const jwtString = ctapCredResp.attStmt.response.toString('utf8');
	  const jwtParts = jwtString.split('.');

	  const HEADER = JSON.parse(base64url$2.decode(jwtParts[0]));
	  const PAYLOAD = JSON.parse(base64url$2.decode(jwtParts[1]));
	  const SIGNTURE = jwtParts[2];

	  const clientDataHash = hash$1('SHA256', base64url$2.toBuffer(clientDataJSON));
	  const nonceBase = Buffer.concat([ctapCredResp.authData, clientDataHash]);
	  const nonceBuffer = hash$1('SHA256', nonceBase);
	  const expectedNonce = nonceBuffer.toString('base64');

	  if (PAYLOAD.nonce !== expectedNonce) { throw new Error(`PAYLOAD.nonce does not contains expected nonce! Expected ${PAYLOAD.nonce} to equal ${expectedNonce}!`); }

	  if (!PAYLOAD.ctsProfileMatch) throw new Error('PAYLOAD.ctsProfileMatch is FALSE!');

	  const certPath = HEADER.x5c.concat([gsr2]).map((cert) => {
	    let pemcert = '';
	    for (let i = 0; i < cert.length; i += 64) pemcert += `${cert.slice(i, i + 64)}\n`;
	    return `-----BEGIN CERTIFICATE-----\n${pemcert}-----END CERTIFICATE-----`;
	  });

	  const { subject } = getCertificationInfo(certPath[0]);
	  if (subject.CN !== 'attest.android.com') throw new Error('The common name is not set to "attest.android.com"!');

	  validateCertificationPath(certPath);

	  const signatureBaseBuffer = Buffer.from(`${jwtParts[0]}.${jwtParts[1]}`);
	  const certificate = certPath[0];
	  const signatureBuffer = base64url$2.toBuffer(SIGNTURE);

	  const validSignature = await verifySignature$1(signatureBuffer, signatureBaseBuffer, certificate);

	  if (!validSignature) throw new Error('Failed to verify the signature!');

	  const publicKey = COSEECDHAtoPKCS$1(authenticatorDataStruct.COSEPublicKey);

	  return {
	    verified: validSignature,
	    authrInfo: {
	      fmt: 'android-safetynet',
	      publicKey: base64url$2(publicKey),
	      counter: authenticatorDataStruct.counter,
	      credID: base64url$2(authenticatorDataStruct.credID),
	    },
	  };
	}

	var androidSafetyNetAttestation = verifyAndroidSafetyNeyAttestation;

	const base64url$1 = base64url$9.exports;
	const elliptic = elliptic$2;
	const NodeRSA = NodeRSA$2;
	const cbor$1 = cbor$5;
	const { parseAuthData, COSEECDHAtoPKCS } = common$6;
	const {
	  COSE_KEYS, COSE_KTY, COSE_RSA_SCHEME,
	} = cose;

	const EdDSA = elliptic.eddsa;

	async function noneAttestation$1(ctapCredentialResponse) {
	  const authenticatorDataStruct = parseAuthData(ctapCredentialResponse.authData);

	  const publicKeyCose = cbor$1.decodeAllSync(authenticatorDataStruct.COSEPublicKey)[0];
	  if (publicKeyCose.get(COSE_KEYS.kty) === COSE_KTY.EC2) {
	    const ansiKey = COSEECDHAtoPKCS(publicKeyCose);

	    return {
	      verified: true,
	      authrInfo: {
	        fmt: 'none',
	        publicKey: ansiKey,
	        counter: authenticatorDataStruct.counter,
	        credID: base64url$1(authenticatorDataStruct.credID),
	      },
	    };
	  }
	  if (publicKeyCose.get(COSE_KEYS.kty) === COSE_KTY.RSA) {
	    const signingScheme = COSE_RSA_SCHEME[publicKeyCose.get(COSE_KEYS.alg)];
	    const key = new NodeRSA(undefined, { signingScheme });
	    key.importKey({
	      n: publicKeyCose.get(COSE_KEYS.n),
	      e: publicKeyCose.get(COSE_KEYS.e),
	    }, 'components-public');
	    return {
	      verified: true,
	      authrInfo: {
	        fmt: 'none',
	        publicKey: key.exportKey('pkcs1-public-pem'),
	        counter: authenticatorDataStruct.counter,
	        credID: base64url$1(authenticatorDataStruct.credID),
	      },
	    };
	  }
	  if (publicKeyCose.get(COSE_KEYS.kty) === COSE_KTY.OKP) {
	    const x = publicKeyCose.get(COSE_KEYS.x);
	    const key = new EdDSA('ed25519');
	    key.keyFromPublic(x);

	    return {
	      verified: true,
	      authrInfo: {
	        fmt: 'none',
	        publicKey: key,
	        counter: authenticatorDataStruct.counter,
	        credID: base64url$1(authenticatorDataStruct.credID),
	      },
	    };
	  }
	  return null;
	}

	var noneAttestation_1 = noneAttestation$1;

	const crypto = require$$0__default$4['default'];
	const base64url = base64url$9.exports;
	const cbor = cbor$5;
	const verifyU2FAttestation = u2fAttestation;
	const verifyPackedAttestation = packedAttestation;
	const verifyAndroidKeyAttestation = androidKeyAttestation;
	const verifyAndroidSafetyNetAttestation = androidSafetyNetAttestation;
	const noneAttestation = noneAttestation_1;

	async function verifySignature(signature, data, publicKey) {
	  return crypto.createVerify('SHA256').update(data).verify(publicKey, signature);
	}

	function checkPEM(pubKey) {
	  return pubKey.toString('base64').includes('BEGIN');
	}

	const randomBase64URLBuffer = (length) => {
	  const len = length || 32;

	  const buff = crypto.randomBytes(len);

	  return base64url(buff);
	};

	function randomHex32String() {
	  return crypto.randomBytes(32).toString('hex');
	}

	function serverMakeCred(id, name) {
	  const displayName = name;

	  const makeCredentialds = {
	    challenge: randomBase64URLBuffer(32),
	    rp: {
	      name: 'WebAuthn App',
	    },
	    user: {
	      id,
	      name,
	      displayName,
	    },
	    attestation: 'direct',
	    pubKeyCredParams: [
	      {
	        type: 'public-key',
	        alg: -7,
	      },
	      {
	        type: 'public-key',
	        alg: -35,
	      },
	      {
	        type: 'public-key',
	        alg: -36,
	      },
	      {
	        type: 'public-key',
	        alg: -257,
	      },
	      {
	        type: 'public-key',
	        alg: -258,
	      },
	      {
	        type: 'public-key',
	        alg: -259,
	      },
	      {
	        type: 'public-key',
	        alg: -38,
	      },
	      {
	        type: 'public-key',
	        alg: -39,
	      },
	      {
	        type: 'public-key',
	        alg: -8,
	      },
	    ],
	    authenticatorSelection: {
	      requireResidentKey: false,
	      userVerification: 'discouraged',
	    },
	  };

	  return makeCredentialds;
	}
	function serverGetAssertion(authenticators, options = {}) {
	  const rpId = options.rpId || process.env.RP_ID || 'localhost';
	  const allowCreds = authenticators.map((authr) => ({
	    type: 'public-key',
	    id: authr.credID,
	    transports: ['usb', 'nfc', 'ble', 'internal'],
	  }));
	  return {
	    challenge: randomBase64URLBuffer(32),
	    allowCredentials: allowCreds,
	    userVerification: 'discouraged',
	    rpId,
	    extensions: {
	      txAuthSimple: '',
	    },
	    timeout: 60000,
	  };
	}
	function hash(data) {
	  return crypto.createHash('SHA256').update(data).digest();
	}

	function ASN1toPEM(pkBuf) {
	  let pkBuffer = pkBuf;
	  if (!Buffer.isBuffer(pkBuffer)) throw new Error('ASN1toPEM: input must be a Buffer');
	  let type;
	  if (pkBuffer.length === 65 && pkBuffer[0] === 0x04) {
	    pkBuffer = Buffer.concat([Buffer.from('3059301306072a8648ce3d020106082a8648ce3d030107034200', 'hex'), pkBuffer]);
	    type = 'PUBLIC KEY';
	  } else type = 'CERTIFICATE';
	  const base64Certificate = pkBuffer.toString('base64');
	  let PEMKey = '';

	  for (let i = 0; i < Math.ceil(base64Certificate.length / 64); i++) {
	    const start = 64 * i;
	    PEMKey += `${base64Certificate.substr(start, 64)}\n`;
	  }

	  PEMKey = `-----BEGIN ${type}-----\n${PEMKey}-----END ${type}-----\n`;

	  return PEMKey;
	}

	async function verifyAuthenticatorAttestationResponse(webAuthnResponse) {
	  const attestationBuffer = base64url.toBuffer(webAuthnResponse.response.attestationObject);
	  const ctapMakeCredResp = cbor.decodeAllSync(attestationBuffer)[0];
	  const { clientDataJSON } = webAuthnResponse.response;
	  let verification;
	  if (ctapMakeCredResp.fmt === 'fido-u2f') { verification = await verifyU2FAttestation(ctapMakeCredResp, clientDataJSON); } else if (ctapMakeCredResp.fmt === 'packed') { verification = await verifyPackedAttestation(ctapMakeCredResp, clientDataJSON); } else if (ctapMakeCredResp.fmt === 'android-key') { verification = await verifyAndroidKeyAttestation(ctapMakeCredResp, clientDataJSON); } else if (ctapMakeCredResp.fmt === 'android-safetynet') { verification = await verifyAndroidSafetyNetAttestation(ctapMakeCredResp, clientDataJSON); } else if (ctapMakeCredResp.fmt === 'none') { verification = await noneAttestation(ctapMakeCredResp); }

	  const { verified, authrInfo } = verification;
	  if (verified) {
	    const response = {
	      verified,
	      authrInfo,
	    };
	    return response;
	  }
	  return {
	    verified: false,
	  };
	}

	function findAuthenticator(credID, authenticators) {
	  const authr = authenticators.find((x) => x.credID === credID);
	  if (authr) return authr;

	  throw new Error(`Unknown authenticator with credID ${credID}!`);
	}

	function parseGetAssertAuthData(buf) {
	  let buffer = buf;
	  const rpIdHash = buffer.slice(0, 32);
	  buffer = buffer.slice(32);

	  const flagsBuf = buffer.slice(0, 1);
	  buffer = buffer.slice(1);

	  const flagsInt = flagsBuf[0];
	  const flags = {
	    up: !!(flagsInt & 0x01),
	    uv: !!(flagsInt & 0x04),
	    at: !!(flagsInt & 0x40),
	    ed: !!(flagsInt & 0x80),
	    flagsInt,
	  };

	  const counterBuf = buffer.slice(0, 4);
	  buffer = buffer.slice(4);

	  const counter = counterBuf.readUInt32BE(0);

	  return {
	    rpIdHash, flagsBuf, flags, counter, counterBuf,
	  };
	}

	async function verifyAuthenticatorAssertionResponse(webAuthnResponse, authenticators) {
	  const authr = findAuthenticator(webAuthnResponse.id, authenticators);
	  const authenticatorData = base64url.toBuffer(webAuthnResponse.response.authenticatorData);

	  const response = { verified: false };
	  if (authr.fmt === 'fido-u2f' || authr.fmt === 'packed' || authr.fmt === 'android-safetynet' || authr.fmt === 'android-key' || authr.fmt === 'none') {
	    const authrDataStruct = parseGetAssertAuthData(authenticatorData);

	    if (!authrDataStruct.flags.up) throw new Error('User was NOT presented durring authentication!');

	    const clientDataHash = hash(base64url.toBuffer(webAuthnResponse.response.clientDataJSON));
	    const signatureBase = Buffer.concat([
	      authrDataStruct.rpIdHash,
	      authrDataStruct.flagsBuf,
	      authrDataStruct.counterBuf,
	      clientDataHash,
	    ]);
	    const publicKey = checkPEM(authr.publicKey)
	      ? authr.publicKey.toString('base64')
	      : ASN1toPEM(base64url.toBuffer(authr.publicKey));
	    const signature = base64url.toBuffer(webAuthnResponse.response.signature);
	    response.verified = await verifySignature(signature, signatureBase, publicKey);

	    if (response.verified) {
	      if (response.counter <= authr.counter) throw new Error('Authr counter did not increase!');

	      authr.counter = authrDataStruct.counter;
	    }
	  }

	  return response;
	}

	var helpers = {
	  randomBase64URLBuffer,
	  serverMakeCred,
	  randomHex32String,
	  serverGetAssertion,
	  verifyAuthenticatorAssertionResponse,
	  verifyAuthenticatorAttestationResponse,
	};

	/**
	 * Register method for server.
	 * Generate credential options with given user `name`.
	 * This will be sent to the front-end for generating credentials.
	 * @param {Object} user with name property
	 * @returns {Object} of user and credential options
	 */
	const register = (user) => {
	  const u = {
	    ...user,
	    id: helpers.randomBase64URLBuffer(8),
	  };

	  // Generate credentials
	  const makeCredChallenge = helpers.serverMakeCred(u.id, u.name);
	  makeCredChallenge.status = 'ok';

	  return {
	    user: u,
	    credentialOpt: makeCredChallenge,
	  };
	};

	/**
	 * Login method for server.
	 * Generates assertion given `user.authenticators`.
	 * This will be sent to the frontend for signature.
	 * @param {Object} user
	 * @param {Object} options
	 * @returns
	 */
	const login = (user, options = {}) => {
	  // Generate assertions for front-end
	  const getAssertion = helpers.serverGetAssertion(user.authenticators, options);
	  getAssertion.status = 'ok';

	  return getAssertion;
	};

	/**
	 * Verification method for server.
	 * This verifies authenticators given the session key and client credentials.
	 * @param {Object} arg of session object holding the challenge and data object with
	 * 					   the credentials sent from client
	 * @returns {Object} verification result
	 */
	const verify = async ({
	  session,
	  data: webAuthnResp,
	}) => {
	  // Sanity check for input
	  if (!webAuthnResp.id || !webAuthnResp.rawId || !webAuthnResp.response || !webAuthnResp.type) {
	    throw new Error('Parameter error');
	  }
	  if (webAuthnResp.type !== 'public-key') throw new Error('Wrong Key Type');

	  const clientData = JSON.parse(
	    base64url$6.decode(
	      webAuthnResp.response.clientDataJSON,
	    ),
	  );

	  //
	  if (clientData.challenge !== session.challenge) {
	    throw new Error('Challenges don\'t match');
	  }

	  let result = {};
	  const {
	    authenticators,
	  } = session;

	  // Verify registration or login
	  if (webAuthnResp.response.attestationObject !== undefined) {
	    result = await helpers.verifyAuthenticatorAttestationResponse(webAuthnResp);
	    if (result.verified) {
	      result.status = 'ok';
	      return result;
	    }
	  } else if (webAuthnResp.response.authenticatorData !== undefined) {
	    result = await helpers.verifyAuthenticatorAssertionResponse(
	      webAuthnResp,
	      authenticators,
	    );

	    if (result.verified) {
	      result.status = 'ok';
	      return result;
	    }
	  }

	  return {
	    status: 'failed',
	  };
	};

	exports.login = login;
	exports.register = register;
	exports.verify = verify;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
