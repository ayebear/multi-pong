import * as state from 'state'

state.world.component('position', function(x, y) {
	this.x = x || 0
	this.y = y || 0
})

state.world.component('velocity', function(x, y) {
	this.x = x || 0
	this.y = y || 0
})
