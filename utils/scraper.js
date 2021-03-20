const axios = require('axios');
const cheerio = require('cheerio');
const Add = require('../models/addModel');

const url = 'https://www.olx.ua/';

const WebScraper = async () => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data, {
      html: {
        normalizeWhitespace: true,
      },
    });
    const addArray = [];
    $('#gallerywide li').each((index, item) => {
      if ($(item).attr('data-id') !== undefined
        && $(item).find('.mheight a').attr('href') !== undefined
        && $(item).find('.mheight a').attr('title') !== undefined
        && $(item).find('.date-location > li:first-child').text() !== undefined
        && $(item).find('.date-location > li:nth-child(2)').text() !== undefined
        && $(item).find('.price').text() !== undefined
      ) {
        addArray.push({
          _id: $(item).attr('data-id'),
          link: $(item).find('.mheight a').attr('href'),
          title: $(item).find('.mheight a').attr('title'),
          location: $(item)
            .find('.date-location > li:first-child')
            .text()
            .trim(),
          date: $(item).find('.date-location > li:nth-child(2)').text().trim(),
          price: $(item).find('.price').text().trim(),
        });
      }
    });

    addArray.forEach((item) => {
      Add.exists({ _id: item._id }, (error, doc) => {
        if (error) {
          console.log(error);
        } else if (doc) {
          throw new Error('item exist');
        }
        return true;
      });
    });

    Add.insertMany(addArray, (error, docs) => {
      if (error) console.log(error);
      console.log('Adds added to db');
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = WebScraper;
