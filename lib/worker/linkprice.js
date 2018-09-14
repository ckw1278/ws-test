const config = require('@wmp-sbd/config');
const linkPriceService = require('../linkprice');
const epService = require('../ep');

class LinkPriceWorker {
  constructor() {}

  async run() {
    const res = await linkPriceService.productDatas();

    for(const item of res) {
      await epService.setEnginePage(item.store, item.products);
    }
  }
}

module.exports = LinkPriceWorker;