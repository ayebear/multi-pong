export default class Network {
	constructor(socket, world) {
		this.socket = socket
		this.world = world

		this.updateQueue = []
		this.destroyQueue = []
		this.entityIdToEntity = {}

		socket.on('updateEntities', (entityList) => {
			this.updateQueue.push(entityList)
		})

		socket.on('destroyEntities', (entityList) => {
			this.destroyQueue.push(entityList)
		})
	}

	updateEntities(entityList) {
		this.socket.emit(entityList)
	}

	destroyEntities(entityList) {
		this.socket.emit(entityList)
	}

	onJoin(entityId, entityList) {
		console.log('onJoin()')
		console.log(entityList)
		this.playerId = entityId
		for (let entity of entityList) {
			this.updateEntity(entity)
		}
	}

	updateEntity(entityData) {
		if (!(entityData['id'] in this.entityIdToEntity)) {
			this.entityIdToEntity[entityData['id']] = this.world.entity()
		}
		let entity = this.entityIdToEntity[entityData['id']]

		// entity.parse(entityData['update'].toJson())
		for (let comp in entityData['update']) {
			entity.update(comp, entityData['update'][comp])
		}
		if ('remove' in entityData) {
			for (let componentToRemove of entityData['remove']) {
				entity.remove(componentToRemove)
			}
		}
	}

	destroyEntity(entityData) {

		if (entityData['id'] in this.entityIdToEntity) {
			let entity = this.entityIdToEntity[entityData['id']]
			entity.destroy()
		}
	}

	//loop through queues and handle entity actions
	update() {
		while (this.updateQueue.length > 0) {
			let entityData = this.updateQueue.pop()
			this.updateEntity(entityData)
		}

		while (this.destroyQueue.length > 0) {
			let entityData = this.destroyQueue.pop()
			this.destroyEntity(entityData)
		}
	}
}
