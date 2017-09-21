import * as crypto from 'crypto';


export class Hbprng {
  private block1: Buffer;
  private pos1: number;

  private block2: Buffer;
  private pos2: number;

  private hashLength: number;

  constructor(private seed: Buffer, private hashAlg: string = 'sha256') {
    let hash = crypto.createHash(this.hashAlg);

    hash.update(this.seed);

    this.block1 = hash.digest();

    this.hashLength = this.block1.length;

    this.pos1 = Math.floor(this.hashLength / 2);

    this.block2 = this.nextBlock(this.block1);
    this.pos2 = 0;
  }

  private nextBlock(prevBlock: Buffer): Buffer {
    let hash = crypto.createHash(this.hashAlg);
    hash.update(this.seed);
    hash.update(prevBlock);
    return hash.digest();
  }

  public nextByte(): number {
    let next = this.block1[this.pos1] ^ this.block2[this.pos2];

    this.pos1++;
    this.pos2++;

    if (this.pos1 >= this.hashLength) {
      this.block1 = this.nextBlock(this.block2);
      this.pos1 = 0;
    }

    if (this.pos2 >= this.hashLength) {
      this.block2 = this.nextBlock(this.block1);
      this.pos2 = 0;
    }

    return next;
  }

  public nextInt() {
    let result = 0;

    for (let i = 0; i < 4; i++) {
      result = result * 256 + this.nextByte();
    }

    return result;
  }
}

