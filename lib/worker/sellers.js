const sellerService = require('../seller');
const storeService = require('../store');

class SellersWorker {
  constructor() {}

  async run() {
    try {
      //cpc 업체리스트 조회
      const sellers = await sellerService.sellers();

      // papi 스토어 등록
      const payload = [];

      for(const seller of sellers) {
        //유효성 확인
        await sellerService.sellersAvailability(seller);

        if(seller.sellerState === 'ACTIVE') {
          const store = {
            ffuid: seller.ffuid,
            name: seller.shopName,
            country: seller.countryCode,
            webUri: seller.shopUrlPC,
            mobileUri: seller.shopUrlMobild || seller.shopUrlMobile,
            isActiveCPC: seller.isActiveCPC,
            agencyId: seller.agencyId
          };

          payload.push(store);
        }
      }

      const result = await storeService.setStores(payload);

      for(const item of result) {
        if(item.error) logger.error(JSON.stringify(item.req)+ '\n' +item.error);
      }
    } catch(err) {
      logger.error(err);
    }
  }
}

module.exports = SellersWorker;