# Hash-Based Pseudo-Random Number Generator

A deterministic number generator based on cryptographic hashing algorithms, with TypeScript typings.

## Installation

`$ npm install hbprng`

## Usage

```ts
import { Hbprng } from 'hbprng';

let generator = new Hbprng(Buffer.from('seed', 'utf8'), 'sha512');

console.log(generator.nextInt());
console.log(generator.nextInt());
console.log(generator.nextInt());

// Output:
// 3242175261
// 539230564
// 526738857
```

## Hbprng Class API

### constructor(seed: Buffer, [hashAlg: string = 'sha256'])

- `seed`: a `Buffer` used to initialise the number generator
- `hashAlg`: a `string` representing the hashing algorithm used to derive the sequence. Defaults to `sha256`. Please see the [Node Crypto Docs](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options) for more information on available hashing algorithms.

Given the same `seed` and `hashAlg`, the generator will produce the same sequence.

### nextByte(): number

Returns the next byte from the sequence.

### nextInt(): number

Returns the next 32-bit unsigned integer from the sequence. Note that this method moves 4 bytes along the sequence.
