import * as state from 'state'

// Handle receiving events from the server
state.world.system([], class {
<<<<<<< HEAD
=======
	constructor() {
		this.updateQueue = []
		this.destroyQueue = []

		// state.network.socket.on('updateEntities', (data) => {
		// 	this.updateQueue.push(data)
		// })

		// state.network.socket.on('destroyEntity', (data) => {
		// 	this.destroyQueue.push(data)
		// })
	}
>>>>>>> master

	pre() {
		state.network.update()
	}
})
