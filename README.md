# express-botseo

### Express BotSeo Npm Package

This package detect social networks user agent to redirect them on real page witch has graph metas
It usefull used for no-ssr application.

Your application has to be online

#### Basic example

```js
const  express  =  require('express');
const  app  =  new  express();
const  BotSeo  =  require('express-botseo');

app.get('*', (req, res) => {

    // Global configuration
    const botseo = new BotSeo(req, {
        siteName: 'My site name',
    });

    // Facebook, Twitter, LinkedIn user-agent detection
    if (botseo.isBot(req.headers['user-agent'])) {
        const html = botseo.setHtml({
            title: 'Welcome to my site',
            description: 'description of my website,
            imageUrl: 'https://url-of-my-img.png',
        });
        return res.send(html);
    }
    else {
        return res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});

app.listen(3000, () => {
    console.log('listened on 3000');
});
```

You can set configurations

```js
botseo.setType("article"); // or blog - default is website
botseo.setProtocol("http"); // default is https
botseo.setSiteName("My site name");
```

You can set prefix and suffix with delimiter for your title

```js
// produce "Welcome to my site | My site name
botseo.setPrefix(true); // default is false

// produce "Welcome to my site - My site name
botseo.setPrefix({ delimiter: " - " }); // default is ' | '

// produce "Welcome to my site | My prefix
botseo.setPrefix({ value: "My prefix" }); // default is siteName

// produce "Welcome to my site - My prefix
botseo.setPrefix({ value: "My prefix", delimiter: " - " });
```

You can config options in the constructor

```js
const botseo = new BotSeo(req, {
  siteName: "My website",
  protocol: "http",
  type: "blog",
  prefix: false,
  suffix: { delimiter: " - ", value: "My suffix" },
});
```
