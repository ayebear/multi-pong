import * as state from 'state'

state.world.system(['postion', 'velocity'], class {
	every(postion, velocity) {
		postion.x += velocity.x * state.dt.val
		postion.y += velocity.y * state.dt.val
	}
})
