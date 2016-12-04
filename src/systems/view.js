import * as state from 'state'

state.world.system(['position', 'shape'], class {
	every(position, shape) {
		shape.shape.position.x = position.x
		shape.shape.position.y = position.y
	}
})

state.world.system(['position', 'sprite'], class {
	every(position, sprite) {
		if (sprite.s) {
			sprite.s.position.x = position.x
			sprite.s.position.y = position.y
		}
	}
})
