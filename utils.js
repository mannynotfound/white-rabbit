const CSS3D = require('css3d')

const createCamera = opts => new CSS3D.PerspectiveCamera(
  opts.fov, opts.aspectX / opts.aspectY, opts.near, opts.far
)

export {createCamera}
