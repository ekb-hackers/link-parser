import Nightmare from 'nightmare'
import tress from 'tress';
import { parseHtml } from './parse';

const nightmare = Nightmare({ show: false })
nightmare.withScroll = withScroll;

const targetLinks = [
  'Science',
  'Technology',
  'Web-Design',
  'Functions-mathematics',
  'Designers'
]

const q = tress((link, done) => {
  nightmare
    .goto(`https://www.quora.com/topic/${link}`)
    // .type('#search_form_input_homepage', 'github nightmare')
    // .click('#search_button_homepage')
    // .wait('#r1-0 a.result__a')
    .withScroll(50)
    .evaluate(() => document.querySelector('body').innerHTML)
    .then((html) => {
      parseHtml(link)(html);
      done(null)
    })
    .catch(error => {
      console.error('Search failed:', error)
    })
})

q.drain = () => {
  nightmare.end()
  console.log('finished')
}

targetLinks.forEach(link => q.push(link))


function withScroll(times) {
  for(let i = 0; i < times; i++) {
    this.wait(300)
    this.scrollTo((i+1) * 1000, 0)
  }
  return this;
}