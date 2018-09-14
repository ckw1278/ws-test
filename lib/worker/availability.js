const sellerService = require('../seller');
const storeService = require('../store');

class Availability {
  constructor() {}

  async run() {
    try {
      // GET /store
      const stores = await storeService.stores();
      const payload = [];
      // GET /sellersAvailability
      for(const store of stores) {
        await sellerService.sellersAvailability(store);
        store.country = store.country[0];
        payload.push(_.pick(store, ['ffuid', 'name', 'country', 'webUri', 'mobileUri', 'isActiveCPC', 'agencyId']));
      }
      // PUT /stores
      const result = await storeService.setStores(payload);

      for(const item of result) {
        if(item.error) logger.error(JSON.stringify(item.req)+ '\n' +item.error);
      }
    } catch(err) {
      logger.error(err);
    }
  }
}

module.exports = Availability;