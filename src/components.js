import * as state from 'state'
import { updateZIndex } from 'utils'

state.world.component('position', function(x, y) {
	this.x = x || 0
	this.y = y || 0
})

state.world.component('velocity', function(x, y) {
	this.x = x || 0
	this.y = y || 0
})

state.world.component('force', function(x, y) {
	this.x = x || 0
	this.y = y || 0
})

// Pixi sprite - used with ZIndex class - instance in state
state.world.component('sprite', function(container, name, zIndex) {
	this.create = (container, name, zIndex) => {
		if (container && name) {
			this.s = new PIXI.Sprite.fromImage('data/' + name + '.png')
			this.s.anchor.x = 0.5
			this.s.anchor.y = 0.5
			this.s.zIndex = zIndex || 0
			this.name = name
			container.addChild(this.s)
			updateZIndex(container)
		} else {
			this.s = undefined
			this.container = undefined
			console.log('Sprite created without parameters')
		}
	}

	this.onRemove = () => {
		container.removeChild(this.s)
	}

	// {'texture': 'ball'}
	this.fromJSON = (data) => {
		console.log('fromJSON(' + JSON.stringify(data) + ')')
		if (data.texture) {
			if (this.s) {
				this.set(data.texture)
				console.log('Set texture')
			} else {
				this.create(state.gameStage, data.texture)
				console.log('Created sprite')
			}
		} else {
			console.log('Warning: data.texture is undefined')
		}
	}

	this.toJSON = () => {
		return {
			'texture': this.name
		}
	}

	// Set texture from name
	this.set = (name) => {
		this.s.texture = PIXI.utils.TextureCache['data/' + name + '.png']
		this.name = name
	}

	this.create(container, name, zIndex)
})

// For pixi.graphics shapes
state.world.component('shape', function(shape) {
	if (shape) {
		this.shape = shape
		state.gameStage.addChild(shape)
	} else {
		this.shape = null
	}

	this.fromJSON = (str) => {
		if (!this.shape) {
			let parsed = JSON.parse(str)
			let graphics = new PIXI.Graphics()
			graphics.beginFill(0xFFFFFF)
			graphics.drawCircle(pos.x, pos.y, radius)
			graphics.endFill()
		}
	}

	this.toJSON = () => {

	}
})

state.world.component('mass', function(mass) {
	this.mass = mass || 0
})

state.world.component('aabb', function(position, size, offset) {
	this.rect = new Rectangle(position, size, offset)
})

state.world.component('lineSegment', function(direction, length) {
	this.direction = direction
	this.length = length
})

state.world.component('collisions', function() {
	this.entities = {}
})

state.world.component('collidable', function(cor) {
	this.cor = cor || 0.5
})

state.world.component('puck')
state.world.component('player')
state.world.component('goal')

state.world.component('pixiStage', function(stage) {
	this.root = stage
})

state.world.component('inputTranslational', function(force) {
	this.force = force
})

state.world.component('inputRotational', function() {

})
