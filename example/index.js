require('./app.css')
const WR = require('../src').default

// scene
const scene = new WR({
  container: document.getElementById('container'),
})

// add thing
const thing = scene.add({
  html: 'lol',
  style: {
    height: '300px',
    width: '300px',
    fontWeight: 'bolder',
    fontSize: '100px',
    border: '10px solid red',
  },
  position: {
    x: 'left',
    y: 'top',
    //z: '50%',
  },
})

const ANIM_SPEED = 2000
//animate thing in
thing.animate({
  speed: ANIM_SPEED,
  position: {
    y: 'center',
    x: 'center',
  },
  easing: 'exponential-out',
}, done => {
  console.log('FINISHED ANIMATING')
})

setTimeout(() => {
  thing.animate({
    speed: 'fast',
    offset: {
      y: -50,
      x: -50,
    },
    easing: 'exponential-in-out',
  }, done => {
    console.log('FINISHED ANIMATING AGAIN')
  })
}, ANIM_SPEED)

const addStat = text => {
  const stats = document.getElementById('stats')
  const stat = document.createElement('div')
  stat.innerText = text
  stats.appendChild(stat)
}


addStat(`WINDOW WIDTH: ${window.innerWidth}`)
addStat(`WINDOW HEIGHT: ${window.innerHeight}`)
addStat('FOV: 100')
addStat(`X POS: ${Math.round(thing.position.x)}`)
addStat(`Y POS: ${Math.round(thing.position.y)}`)
addStat(`Z DEPTH: ${Math.round(thing.position.z)}`)

const perspective = document.getElementById('container').childNodes[0].style.perspective
addStat(`PERSPECTIVE: ${(perspective)}`)
