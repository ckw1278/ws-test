'use strict';

require('../lib/helper/bootstrap');

const SellersWorker = require('../lib/worker/sellers');
const Batch = require('../lib/batch');
const batch = new Batch('storelink-sellers');

batch.booking('storelink-sellers', '0 */10 * * * *', async () => {
  const sellersWorker = new SellersWorker();

  await sellersWorker.run();
});
