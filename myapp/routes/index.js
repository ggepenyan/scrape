var express = require('express'),
	router = express.Router(),
	Promise = require("bluebird"),
	writeFile = Promise.promisify(require("fs").writeFile),
	request = require('request'),
	cheerio = require('cheerio');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/scrape', function (req, res, next) {
	res.render('index')
})

router.post('/scrape', function (req, res, next) {
	if (!req.body.cont) {
		return res.redirect('/scrape')
	}

	url = req.body.cont

	request(url, function (error, response, html) {
		if (error) {
			return next(error)
		}
		
		var $ = cheerio.load(html)

		meta_og = []

		for (var i = $('head meta[property^=og]').length - 1; i >= 0; i--) {
			elem = i + ''

			var meta_attribs = $('head meta[property^=og]')[elem].attribs

			meta_og.push([meta_attribs.property, meta_attribs.content])
		}

		console.log(meta_og)

		res.render('index',{
			meta_dates: meta_og
		})
	})
})

module.exports = router;
