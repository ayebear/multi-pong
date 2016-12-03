import * as state from 'state'

state.world.system(['position', 'shape'], class {
	every(position, shape) {
		shape.shape.position.x = position.x
		shape.shape.position.y = position.y
	}
})
