export class Pokemon {
    constructor(
        public id:number,
        public name: string,
        public types: string[],
        public weight: number,
        public height: number,
        public abilities: string[] = [],
        public spriteGifFront: string,
        public spriteGifBack: string,
        public spriteActive: string
        ) {
    }
}
    