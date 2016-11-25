const CSS3D = require('css3d')
const merge = require('merge')
const {defaultScene} = require('./defaults')
const {createCamera} = require('./utils')

class WhiteRabbit {
  constructor(cfg) {
    this.cfg = merge(defaultScene, cfg)
    this.newScene()
  }

  newScene = () => {
    this.camera = createCamera(this.cfg)
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
    el.className = 'wr-element'
    el = this.setElement(el, opts)

    let obj = this.createObject(el, opts)
    el.properties = {object: obj}

    return obj
  };

  createObject = (el, opts = {}) => {
    const obj = new CSS3D.CSS3DObject(el)

    obj.name = 'wr-element-' + opts.idx
    obj.position.x = 0
    obj.position.y = -200
    obj.position.z = -640

    obj.animateIn = tweenOpts => {
      this.scene.add(obj)
      this.tweenIn(obj, tweenOpts)
    }

    return obj
  };

  setElement = (el, opts = {}) => {
    const {style, html, className} = opts

    const child = document.createElement('div')
    child.innerHTML = html || ''
    child.className = className || ''
    Object.keys(style).forEach(s => child.style[s] = style[s])

    el.appendChild(child)
    return el
  };

  tweenIn = (obj, tweenOpts) => {
    new CSS3D.TWEEN.Tween(obj.position)
      .to({ y: 0 }, 2000)
      .easing(CSS3D.TWEEN.Easing.Exponential.Out)
      .start()
  };
}

export default WhiteRabbit
