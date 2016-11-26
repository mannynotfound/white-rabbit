const CSS3D = require('css3d')

const EASING = CSS3D.TWEEN.Easing
const easeMap = {
  'linear': EASING.Linear.None,
  'quadratic-in': EASING.Quadratic.In,
  'quadratic-out': EASING.Quadratic.Out,
  'quadratic-in-out': EASING.Quadratic.InOut,
  'cubic-in': EASING.Cubic.In,
  'cubic-out': EASING.Cubic.Out,
  'cubic-in-out': EASING.Cubic.InOut,
  'quartic-in': EASING.Quartic.In,
  'quartic-out': EASING.Quartic.Out,
  'quartic-in-out': EASING.Quartic.InOut,
  'quintic-in': EASING.Quintic.In,
  'quintic-out': EASING.Quintic.Out,
  'quintic-in-out': EASING.Quintic.InOut,
  'sinusoidal-in': EASING.Sinusoidal.In,
  'sinusoidal-out': EASING.Sinusoidal.Out,
  'sinusoidal-in-out': EASING.Sinusoidal.InOut,
  'exponential-in': EASING.Exponential.In,
  'exponential-out': EASING.Exponential.Out,
  'exponential-in-out': EASING.Exponential.InOut,
  'circular-in': EASING.Circular.In,
  'circular-out': EASING.Circular.Out,
  'circular-in-out': EASING.Circular.InOut,
  'elastic-in': EASING.Elastic.In,
  'elastic-out': EASING.Elastic.Out,
  'elastic-in-out': EASING.Elastic.InOut,
  'back-in': EASING.Back.In,
  'back-out': EASING.Back.Out,
  'back-in-out': EASING.Back.InOut,
  'bounce-in': EASING.Bounce.In,
  'bounce-out': EASING.Bounce.Out,
  'bounce-in-out': EASING.Bounce.InOut,
}

const getSpeed = (tweenOpts = {}) => {
  if (!isNaN(parseInt(tweenOpts.speed, 10))) {
    return tweenOpts.speed
  }

  let base = 2000
  switch (tweenOpts.speed) {
    case 'slow':
      return base * 2
    case 'fast':
      return base / 2
    default:
      return base
  }
}

const getEasing = ({easing}) => {
  if (!easing || !easeMap.hasOwnProperty(easing)) {
    return easeMap['linear']
  }

  return easeMap[easing]
}

const tweener = (obj, tweenOpts = {}, cb) => {
  const speed = getSpeed(tweenOpts)
  const ease = getEasing(tweenOpts)

  new CSS3D.TWEEN.Tween(obj.position)
    .to(tweenOpts.to, speed)
    .easing(ease)
    .onComplete(() => cb && cb())
    .start()
}

export default tweener
