var express = require('express'),
	app = express(),
	Promise = require("bluebird"),
	writeFile = Promise.promisify(require("fs").writeFile),
	request = require('request'),
	cheerio = require('cheerio');

app.get('/scrape', function (req, res, next) {
	url = 'http://www.imdb.com/title/tt1229340/'

	request(url, function (error, response, html) {
		if (!error) {
			var $ = cheerio.load(html)

			// var title, release, rating

			// var json = {title:"", release:"", rating:""}

			// $('h1').filter(function () {
			// 	var data = $(this)


			// 	title = data.text()

			// 	release = data.children().children('a').text()

			// 	json.title = title

			// 	json.release = release
			// })

			// $('.ratingValue').filter(function () {
			// 	var data = $(this)

			// 	rating = data.children().first().children().text()

			// 	json.rating = rating
			// })
		}

		// writeFile('output.json', JSON.stringify(json, null, 4)).then(result => {
		// 	console.log('file successfully written')
		// }).catch(error =>{
		// 	next(error)
		// })

		meta_og = []

		for (var i = $('head meta[property^=og]').length - 1; i >= 0; i--) {
			elem = i + ''
			// if ($('head meta')[elem].attribs.property) {
				// first_letters = $('head meta')[elem].attribs.property.substring(0,2)
				// if ($('head meta[property^=og]')) {
					// ('head meta[property^=og]')[elem]
					var meta_attribs = $('head meta[property^=og]')[elem].attribs
					
					meta_og.push([meta_attribs.property, meta_attribs.content])
					// console.log("property---" + meta_attribs.property + '\ncontent---' + meta_attribs.content)

					// console.log($('head meta[property^=og]')[elem].attribs.content)
				// }
			// }
		}
		// console.log($('head meta').attribs)
		console.log(meta_og);
		res.send('check your console')
	})
})

app.listen('3000')

console.log('port is 3000')

exports = module.exports = app