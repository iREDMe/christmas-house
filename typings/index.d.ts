declare module 'christmas-house' {
	import { EventEmitter } from 'events';
	export = House;

	/** A House. */
	class House extends EventEmitter {
		constructor(hasChimney?: boolean);
		public presents: number;

		public restart(hasChimney?: boolean): House;
		public placeCookies(): House;
		public placeMilk(): House;
		public eatAllCookies(): House;
		public drinkAllMilk(): House;
		public watchSanta(): House;
		public stopWatching(): House;
		public addToWishlist(...items: string[]): House;

		public addListener(event: 'alert', listener: (message: string) => void): this;
		public removeListener(event: 'alert', listener: (message: string) => void): this;
		public on(event: 'alert', listener: (message: string) => void): this;
		public once(event: 'alert', listener: (message: string) => void): this;
	}
}