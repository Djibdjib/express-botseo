class BotSeo {
  siteName = '';
  type = 'website';
  protocol = 'https';

  constructor(req, options = {}) {
    this.originalUrl = req.originalUrl;
    this.headers = req.headers;
    this.host = this.headers.host;

    this.siteName = options.siteName ?? this.siteName;
    this.protocol = options.protocol ?? this.protocol;
    this.type = options.type ?? this.type;

    this.setPrefix(options.prefix);
    this.setSuffix(options.suffix);
  }

  setSiteName(siteName) {
    this.siteName = siteName;
  }

  setType(type) {
    this.type = type;
  }

  setProtocol(protocol) {
    this.protocol = protocol;
  }

  setPrefix(options) {
    this.prefix = options ? true : false;
    this.prefixDelimiter = options?.delimiter ?? ' | ';
    this.prefixKey = options?.key ?? 'siteName';
    this.prefixValue = options?.value ?? '';

    if (this.prefixValue !== '') {
      this.prefixKey = false;
    }
  }

  setSuffix(options) {
    this.suffix = options ? true : false;
    this.suffixDelimiter = options?.delimiter ?? ' | ';
    this.suffixKey = options?.key ?? 'siteName';
    this.suffixValue = options?.value ?? '';

    if (this.suffixValue !== '') {
      this.suffixKey = false;
    }
  }

  setTitle(title) {
    let prefixValue = this.prefixKey !== false ? this[this.prefixKey] : this.prefixValue;
    let suffixValue = this.suffixKey !== false ? this[this.suffixKey] : this.suffixValue;

    let returnTitle = this.prefix ? prefixValue + this.prefixDelimiter + title : title;
    returnTitle = this.suffix ? returnTitle + this.suffixDelimiter + suffixValue : returnTitle;

    return returnTitle;
  }

  isBot(userAgent) {
    if(userAgent) {
      return (
        userAgent.includes('facebookexternalhit') ||
        userAgent.includes('Twitterbot') ||
        userAgent.includes('LinkedInBot')
      );
    }
    else return false;
  }

  setHtml(seo) {
    if (seo.prefix !== undefined) this.setPrefix(seo.prefix);
    if (seo.suffix !== undefined) this.setSuffix(seo.suffix);

    const title = this.setTitle(seo.title);

    let htmlData = `
          <!DOCTYPE html>
          <html prefix="og: http://ogp.me/ns#" lang="en">
            <head>
              <meta charset="UTF-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
              <meta property="og:url" content="${this.protocol}://${this.host}${this.originalUrl
      }" />
              <meta property="og:site_name" content="${this.siteName}" />
              <meta property="og:type" content="${this.type}" />
              <meta property="og:title" content="${title}" />
              <meta property="og:description" content="${seo.description}" />
              <meta property="og:image" content="${seo.imageUrl ?? ''}" />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="627" />
              <meta property="og:image:alt" content="${title}" />
              <meta name="twitter:card" content="summary"></meta>
              <title>${title}</title>
            </head>
          </html>
        `;

    return htmlData;
  }
}
module.exports = BotSeo;
