import * as state from 'state'

// Handle receiving events from the server
state.world.system([], class {

	pre() {
		state.network.update()
	}
})
