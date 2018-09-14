'use strict';

const cheerio = require('cheerio');
const Codec = require('../codec');

class Gmarket extends Codec {

  init() {
    this.productUri = 'http://corners.gmarket.co.kr/SuperDeals';
  }

  eventUriPatterns() {
    return [
      /<a\shref="javascript:GoSNAChannel\('CHM2J040',\s'([0-9]+)',\s'.*?'\);">((.|\n)*?)<\/a>/gm
    ];
  }

  async getProducts() {
    const doc = await this._openDocument(this.productUri);
    const $ = cheerio.load(doc, {decodeEntities: false});
    const products = [];

    const items = $("ul.item_list > li");
    const that = this;

    items.each(function(i, ele) {
      //console.log($(this).find("a").attr("href"));

      products.push({
        "title": $(this).find("span.title").text(),
        "localPrice": $(this).find("span.price strong").text(),
        "uri": "",
        "image_url": $(this).find("img.thumb").attr("src")
      });
    });

    //console.log('------------------');
    //console.log(JSON.stringify(products));
    //console.log('------------------');
    return products;
  }


  async eventMeta(event) {
    const doc = await this._openDocument(event.event_uri);

    this.titleMeta(doc, event);
    this.descriptionMeta(doc, event);
  }

  titleMeta(doc, event) {
    const ptrn = /<meta.*property=["']og:description["'].*content=["'](.*?)["'].*?>/gm;
    let res = ptrn.exec(doc);

    if(!res || !res[1]) return;

    let title = res[1].trim();

    if(title && title.length) event.title = title;
  }

  descriptionMeta(doc, event) {
    const ptrn = /<meta.*property=["']og:description["'].*content=["'](.*)["']/gm;
    let res = ptrn.exec(doc);

    if(!res || !res[1]) return;

    let description = res[1].trim();

    if(description && description.length) event.description = description;
  }
}

module.exports = Gmarket;
