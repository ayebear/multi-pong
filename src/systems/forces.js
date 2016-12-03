import * as state from 'state'

state.world.system(['force', 'mass', 'velocity'], class {
	every(force, mass, velocity) {
		postion.x += velocity.x * state.dt.val
		postion.y += velocity.y * state.dt.val
	}
})
