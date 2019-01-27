# The Christmas House

*This was an experiment with TypeScript compiling into JavaScript. Certainly fun with TS's Error Catching.*

You are to be able to make cookies and milk for Santa to come around, while watching him.

Unlike my other joke modules, there are NO PROMISES this time around. You will not have delays on functions; The only thing included is functions.

__Events.__

**Sandvich**

```js
// Create your house
const House = require('christmas-house');
const MyHouse = new House(true);

// Add cookies/milk
MyHouse.placeCookies();
MyHouse.placeMilk();

// Deplete all cookies/milk
MyHouse.eatAllCookies();
MyHouse.drinkAllMilk();

// Add items you want!
MyHouse.addToWishlist('Sandvich');
MyHouse.addToWishlist('BONK! Atomic Punch', 'Crit-a-Cola');

// Start watching Santa!
MyHouse.watchSanta();
MyHouse.on('alert', console.log); // Console logs alerts.

// Stop receiving alerts.
MyHouse.stopWatching();
MyHouse.watchSanta(); // Start to watch again.

// Finished?
MyHouse.checkPresents();
MyHouse.presents; // Has a value when checkPresents() is run.
```
