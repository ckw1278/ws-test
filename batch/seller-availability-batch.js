'use strict';

require('../lib/helper/bootstrap');

const Availability = require('../lib/worker/availability');
const Batch = require('../lib/batch');
const batch = new Batch('storelink-availability');

batch.booking('storelink-availability', '0 * * * * *', async () => {
  const availabilityWorker = new Availability();

  await availabilityWorker.run();
});
