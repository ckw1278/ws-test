const storeService = require('../store');
const epService = require('../ep');

class EpWorker {
  constructor() {}

  async run() {
    try {
      // GET /stores
      const stores = await storeService.stores();

      for(const store of stores) {
        // GET /store/products
        const products = await storeService.storeProducts(store);

        //ep 등록
        await epService.setEnginePage(store, products);
      }

    } catch(err) {
      logger.error(err);
    }
  }
}

module.exports = EpWorker;
