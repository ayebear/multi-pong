import * as state from 'state'

// Handle receiving events from the server
state.world.system([], class {
	constructor() {
		this.updateQueue = []
		this.destroyQueue = []

		state.network.socket.on('updateEntities', (data) => {
			this.updateQueue.push(data)
		})

		state.network.socket.on('destroyEntity', (data) => {
			this.destroyQueue.push(data)
		})
	}

	pre() {
		for (let ent in this.updateQueue) {
			this.update(ent)
		}

		for (let ent in this.destroyQueue) {
			this.destroy(ent)
		}
	}

	update(ent) {
		// state.world.get(ent.).update()
		// for (let toUpdate of ent.)
	}

	destroy(ent) {

	}
})
