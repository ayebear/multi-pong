import * as state from 'state'

state.world.system(['position', 'velocity'], class {
	every(position, velocity) {
		position.x += velocity.x * state.dt.val
		position.y += velocity.y * state.dt.val
	}
})
