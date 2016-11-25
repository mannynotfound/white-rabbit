const CSS3D = require('css3d')

const createCamera = opts => new CSS3D.PerspectiveCamera(
  opts.fov, opts.aspectX / opts.aspectY, opts.near, opts.far
)

const getActualZ = (camera, cfg) => {
  const degrees = Math.tan(CSS3D.Math.degToRad(camera.fov * 0.5))
  const fov = (0.5 / degrees * cfg.aspectY)

  return -fov - 30 // 30 is size of both scroll bars?
}

export {
  createCamera,
  getActualZ,
}
