const CSS3D = require('css3d')
const merge = require('merge')
const {defaultScene} = require('./defaults')
const utils = require('./utils')
const positioner = require('./positioner').default
const tweener = require('./tweener').default

class WhiteRabbit {
  constructor(cfg) {
    this.cfg = merge(defaultScene, cfg)
    this.newScene()
  }

  newScene = () => {
    this.camera = utils.createCamera(this.cfg)
    this.camera.position.y = this.cfg.cameraY
    this.scene = new CSS3D.Scene()
    this.objects = []
    this.renderer = new CSS3D.CSS3DRenderer()
    this.renderer.setSize(this.cfg.aspectX, this.cfg.aspectY)
    this.cfg.container.appendChild(this.renderer.domElement)
    this.animate()
  };

  animate = () => {
    requestAnimationFrame(this.animate.bind(this))
    CSS3D.TWEEN.update()
    this.renderer.render(this.scene, this.camera)
  };

  add = (opts = {}) => {
    if (!opts.idx) {
      opts.idx = this.objects.length
    }

    let el = document.createElement('div')
    el.id = `wr-element-${opts.idx}`
    el.className = 'wr-element'
    el = utils.setElement(el, opts)

    let obj = this.createObject(el, opts)
    el.properties = {object: obj}

    return obj
  };

  createObject = (el, opts = {}) => {
    const obj = new CSS3D.CSS3DObject(el)
    obj.cfg = {...opts}
    obj.name = 'wr-element-' + opts.idx

    const posArgs = [opts, obj, this.cfg]
    obj.position.x = positioner('x', ...posArgs)
    obj.position.y = positioner('y', ...posArgs)
    obj.position.z = positioner('z', ...posArgs)

    obj.animate = (tweenOpts, cb) => {
      if (!tweenOpts.position && !tweenOpts.offset) {
        return console.warning('Must provide at least position or offset.')
      }

      const tweenPosArgs = [tweenOpts, obj, this.cfg]
      tweenOpts.to = {
        x: positioner('x', ...tweenPosArgs),
        y: positioner('y', ...tweenPosArgs),
      }

      tweener(obj, tweenOpts, cb)
    }

    this.scene.add(obj)
    return obj
  };
}

export default WhiteRabbit
