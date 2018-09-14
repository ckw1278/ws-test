'use strict';

const url = require('url');
const browser = require('@wmp-sbd/browser');

// 모바일 에이전트 사용
const BROWSER_AGENT_MOBILE = 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36';
const BROWSER_AGENT_DESKTOP = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36';

class Codec {
  constructor(uri) {
    this.uri = uri;
    this.origin = this.getOrigin(uri);

    this.init();
  }

  eventUriPatterns() {
    return [];
  }

  imageUrlPattern() {
    return;
  }

  eventPath() {
    return '';
  }

  async event() {
    const events = await this.decodeEvents();

    for(const event of events) {
      await this.eventMeta(event);
    }

    return events;
  }

  async products() {
    const products = await this.getProducts();
    return products;
  }

  async _openDocument(uri) {
    let body = await browser.open(uri, 'UTF-8', BROWSER_AGENT_DESKTOP);
    let html = this.documentModifier(body.toString());

    html = this._replaceRelativeUri(html, uri);

    return html;
  }

  _replaceRelativeUri(html, uri) {
    return html.replace(/href=['"]((\?|\.\.\/|\.\/)([^'"\s>]+))/gi, (block, relUri) => {
      return block.replace(relUri, url.resolve(uri, relUri));
    });
  }

  documentModifier(html) {
    return html;
  }

  async decodeEvents() {
    return [];
  }

  async eventMeta(event) {}

  getOrigin(uri) {
    const res = /(^http:\/\/.*?)\//g.exec(uri);

    return res && res[1];
  }

  init() {}
}

module.exports = Codec;
