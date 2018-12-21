"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class House extends events_1.EventEmitter {
    constructor(hasChimney = false) {
        if (typeof hasChimney !== 'boolean')
            throw new TypeError('hasChimney must be boolean!');
        super();
        this.restart(hasChimney);
    }
    restart(hasChimney = false) {
        this.cookieCount = this.milkCount = this.warnings = this.presentCount = 0;
        this.preActivated = this.onWatch = this.presents = this.santaCompleted = false;
        this.hasChimney = hasChimney;
        this.unwrappedPresents = this.wishlist = [];
        return this;
    }
    placeCookies() {
        this.cookieCount++;
        return this;
    }
    placeMilk() {
        this.milkCount++;
        return this;
    }
    eatAllCookies() {
        this.cookieCount = 0;
        return this;
    }
    drinkAllMilk() {
        this.milkCount = 0;
        return this;
    }
    watchSanta() {
        this.onWatch = true;
        if (!this.preActivated)
            this._activate();
        return this;
    }
    stopWatching() {
        this.onWatch = false;
        return this;
    }
    addToWishlist(...items) {
        if (!(items instanceof Array))
            throw new TypeError('items must be an array.');
        if (items.some((i) => typeof i !== 'string'))
            throw new TypeError('items must not include any non-strings!');
        this.wishlist.push(...items);
        return this;
    }
    checkPresents() {
        if (!this.santaCompleted)
            return;
        if (this.presentCount === 0)
            return [];
        if (this.presents)
            return this.unwrappedPresents;
        const allPresents = [];
        for (let i = this.presentCount; i > 0; i--) {
            allPresents.push(this.wishlist.filter((contents) => !allPresents.includes(contents))[Math.floor(Math.random() * this.wishlist.length)]);
        }
        this.presents = true;
        return this.unwrappedPresents = allPresents;
    }
    _alert(message) {
        if (!this.onWatch)
            return;
        this.emit('alert', message);
    }
    _activate() {
        this.preActivated = true;
        setTimeout(() => {
            if (!this.hasChimney) {
                this.warnings++;
                this._alert('Santa has had to open the window to get inside your house. ' +
                    'He takes note to ignore your house the next year if no chimney is bought.');
            }
            else
                this._alert('Santa got inside with the chimney.');
            this._toTheCookies();
        }, (Math.floor(Math.random() * 10) + 7) * 1000);
    }
    _toTheCookies() {
        setTimeout(() => {
            if (this.cookieCount === 0) {
                this._alert('Santa was looking for some cookies, but he discovered no cookies were put for him. He puts a note requesting cookies for next year.');
                this.warnings++;
            }
            else if (this.cookieCount > 5) {
                this.warnings--;
                this.cookieCount = this.cookieCount - 5;
                this._alert(`Santa was able to eat 5 cookies, but was too full to eat the other ${this.cookieCount}. He puts a note, saying how thankful he was.`);
            }
            else {
                this.cookieCount = 0;
                this._alert('Santa eats the cookies. He seems satisfied.');
            }
            this._toTheMilk();
        }, (Math.floor(Math.random() * 10) + 7) * 1000);
    }
    _toTheMilk() {
        setTimeout(() => {
            if (this.milkCount === 0 && this.cookieCount > 0) {
                this._alert('Santa desperately searched for milk to wash down the cookies, but to no avail. The note is now gone, but still drinks from his water bottle.');
            }
            else if (this.milkCount === 0) {
                this.warnings++;
                this._alert('Santa looked for some milk, but found none.');
            }
            else {
                this.warnings--;
                this._alert('Santa drank the milk and felt happy.');
            }
            this._review();
        }, (Math.floor(Math.random() * 10) + 7) * 1000);
    }
    _review() {
        this.santaCompleted = true;
        if (!this.wishlist.length)
            return this._alert('Santa, noticing you had nothing on your wishlist, leaves.');
        switch (this.warnings) {
            case -2:
                this.presentCount = this.wishlist.length < 5 ? this.wishlist.length : 5;
                this._alert(`Santa, happy of your generosity, deposits ${this.presentCount} presentCount below the tree!`);
                break;
            case -1:
                this.presentCount = this.wishlist.length < 3 ? this.wishlist.length : 3;
                this._alert(`Santa, despite no milk, deposits ${this.presentCount} presentCount below the tree!`);
                break;
            case 0:
                this.presentCount = this.wishlist.length < 2 ? this.wishlist.length : 2;
                this._alert(`Santa, having no warnings nor positive feelings, deposits ${this.presentCount} presentCount below the tree.`);
                break;
            case 1:
                this.presentCount = this.wishlist.length < 1 ? 0 : 1;
                this._alert(`Santa, slightly disappointed, only deposits ${this.presentCount} present.`);
                break;
            default:
                this._alert('Santa, very disappointed, believes you do not deserve any presentCount.');
        }
    }
}
module.exports = House;
