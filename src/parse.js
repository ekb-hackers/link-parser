import fs from 'fs';
import cheerio from 'cheerio'

const linkReg = getRegex([
  'http',
  '#',
  '\/topic',
  '\/profile',
  '\/about',
  '\/contact',
  '\/privacy',
  '\/careers',
  '.+\/answer\/'
]);

function getRegex(prefixes) {
  const str = prefixes.map(el => `^${el}`).join('|')
  return new RegExp(str, 'i')
}





export const parseHtml = (filename) =>(html) => {
  const $ = cheerio.load(html);
  const data = [];
  const links = {};
  $('a').each((i, elem) => {
    const title = $(elem).text()
    const link = $(elem).attr('href');

    if (!linkReg.test(link) && !links[link]) {
      data.push({ title, link })
    }

    links[link] = true;
  })

  fs.writeFileSync(`./${filename}.json`, JSON.stringify(data, null, 3))
  console.log('success', data.length)
}