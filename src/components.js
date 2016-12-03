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

// Pixi sprite - used with ZIndex class - instance in state
state.world.component('sprite', function(container, name, zIndex) {
	this.s = new PIXI.Sprite(PIXI.utils.TextureCache[name + '.png'])
	this.s.anchor.x = 0.5
	this.s.anchor.y = 0.5
	this.s.zIndex = zIndex || 0
	container.addChild(this.s)
	updateZIndex(container)

	this.onRemove = () => {
		container.removeChild(this.s)
	}

	// Set texture from name
	this.set = (name) => {
		this.s.texture = PIXI.utils.TextureCache[name + '.png']
	}
})

state.world.component('mass', function(mass) {
	this.mass = mass || 0
})

state.world.component('aabb', function(position, size, offset) {
	this.rect = new Rectangle(position, size, offset)
})

state.world.component('lineSegment', function(direction, length) {

})

state.world.component('collisions', function() {
	this.entities = {}
})

state.world.component('puck')
state.world.component('player')
state.world.component('goal')
