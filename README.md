# express-botseo

Express BotSeo Npm Package

#### Basic example

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
    		const  html  =  botseo.setHtml({
    			title: 'Welcome to my site',
    			description: 'description of my website,
    			imageUrl: 'https://url-of-my-img.png',
    		});
    		return res.send(html);
    	}
    	else {
    		return  res.sendFile(path.join(__dirname, 'build', 'index.html'));
    	}
    });

    app.listen(3000, () => {
        console.log('listened on 3000');
    });
