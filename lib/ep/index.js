const config = require('@wmp-sbd/config');
const s3 = require('../aws/s3-handler');

class EnginePage {
  constructor() {}

  // TODO : 리팩토링 필요
  async setEnginePage(store, products) {
    let rows = 'id\ttitle\tprice_pc\tprice_mobile\tnormal_price\tlink\tmobile_link\timage_link\tcategory_name1\tcategory_name2\tcategory_name3\tmanufacture_define_number\tmodel_number\tbrand\tmaker\treview_count\tshipping\tevent_word\tparallel_import\tinterest_free_event\tpoint\n';

    for(let i = 0; i < products.length; i++) {
      rows += (products[i].storeProductId || '') + '\t';
      rows += (products[i].title || '') + '\t';
      rows += (products[i].localPrice && products[i].localPrice.value || '') + '\t';
      rows += (products[i].localPrice && products[i].localPrice.value || '') + '\t';
      rows += (products[i].localPrice && products[i].localPrice.value || '') + '\t';
      rows += (products[i].uri || '') + '\t';
      rows += (products[i].uri || '') + '\t';
      rows += (products[i].imageUri || '') + '\t';
      rows += (products[i].storeCategoryTop || '') + '\t';
      rows += (products[i].storeCategoryMid || '') + '\t';
      rows += (products[i].storeCategoryBtm || '') + '\t';
      rows += '\t';
      rows += '\t';
      rows += (products[i].brand || '') + '\t';
      rows += '\t';
      rows += '\t';
      rows += '\t';
      rows += '\t';
      rows += '\t';
      rows += '\t';

      if((products.length - 1) !== i) rows += '\n';
    }
    console.log(store.ffuid);
/*
    const params = {
      Bucket: config.get('s3.bucket'),
      Key: 'etl/' + store.ffuid + '.tsv',
      Body: rows,
      ContentType: 'text/plain;charset=utf-8',
      ACL: 'public-read'
    };

    await s3.upload(params);
*/
  }
}

module.exports = new EnginePage();
