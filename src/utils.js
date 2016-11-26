const CSS3D = require('css3d')

const createCamera = opts => new CSS3D.PerspectiveCamera(
  opts.fov, opts.aspectX / opts.aspectY, opts.near, opts.far
)

const setElement = (el, opts = {}) => {
  const {style, html, className} = opts

  const child = document.createElement('div')
  child.innerHTML = html || ''
  child.className = className || ''
  Object.keys(style).forEach(s => child.style[s] = style[s])

  el.appendChild(child)
  return el
}

export {
  createCamera,
  setElement,
}
