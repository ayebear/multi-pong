import * as state from 'state'

state.world.system(['force', 'mass', 'velocity'], class {
	every(force, mass, velocity) {
		velocity.x += (force.x / mass.mass) * state.dt.val
		velocity.y += (force.y / mass.mass) * state.dt.val
	}
})
