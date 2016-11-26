const CSS3D = require('css3d')

const isNum = val => !isNaN(val)
const pxToInt = str => parseInt(str.replace('px', ''), 10)
const prcToInt = str => parseInt(str.replace('%', ''), 10)

const getPositionZ = (opts, cfg) => {
  const {z} = opts.position
  if (isNum(z)) {
    return z
  }

  const degrees = Math.tan(CSS3D.Math.degToRad(cfg.fov * 0.5))
  const fov = (0.5 / degrees * cfg.aspectY)

  let multiplier = 1
  if (z && z.indexOf('%')) {
    const percent = prcToInt(z)
    multiplier = 100 / percent
  }

  return -(fov * multiplier)
}

const positioner = (key, opts = {}, obj, cfg) => {
  if (!opts.position) {
    opts.position = {}
  }

  if (key === 'z') {
    return getPositionZ(opts, cfg)
  }

  if (!opts.position[key]) {
    opts.position[key] = obj.position[key] || 0
  }

  let pos = 0

  const cordKey = opts.position[key]

  if (key === 'x' && (cordKey === 'left' || cordKey === 'right')) {
    const origWidth = pxToInt(obj.cfg.style.width)
    pos = (cfg.aspectX / 2) - (origWidth / 2)

    if (cordKey === 'left') {
      pos = -pos
    }
  }

  if (key === 'y' && (cordKey === 'top' || cordKey === 'bottom')) {
    const origHeight = pxToInt(obj.cfg.style.height)
    pos = (cfg.aspectY / 2) - (origHeight / 2)

    if (cordKey === 'bottom') {
      pos = -pos
    }
  }

  if (isNum(cordKey)) {
    pos = cordKey
  }

  if (opts.offset && opts.offset[key]) {
    pos += opts.offset[key]
  }

  return pos
}

export default positioner
