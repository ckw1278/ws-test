'use strict';

require('../lib/helper/bootstrap');

const EpWorker = require('../lib/worker/ep');
const Batch = require('../lib/batch');
const batch = new Batch('storelink-ep');

batch.booking('storelink-ep', '0 0 5,10,16,23 * * *', async () => {
  const epWorker = new EpWorker();

  await epWorker.run();
});
