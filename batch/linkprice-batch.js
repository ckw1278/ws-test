'use strict';

require('../lib/helper/bootstrap');

const LinkPriceWorker = require('../lib/worker/linkprice');
const Batch = require('../lib/batch');
const batch = new Batch('storelink-linkprice');

batch.booking('storelink-linkprice', '0 0,30 * * * *', async () => {
  const linkPriceWorker = new LinkPriceWorker();

  await linkPriceWorker.run();
});
