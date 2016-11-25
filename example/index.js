require('./app.css')
const WR = require('../index').default

// scene
const scene = new WR({
  container: document.getElementById('container'),
})

// thing
const thing = scene.add({
  html: 'lol',
  className: 'wr-thing',
  style: {
    height: '300px',
    width: '300px',
    fontWeight: 'bolder',
    fontSize: '100px',
  },
}).animateIn({
  speed: 'slow',
  to: 'middle',
})
