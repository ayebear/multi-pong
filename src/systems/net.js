export default class Network {
	constructor(socket, world) {
		this.socket = socket

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
		this.playerId = entityId
		for (let entity of entityList) {
			updateEntity(entity)
		}
	}

	updateEntity(entityData) {
		if (!(entityData['id'] in entityIdToEntity)) {
			entityIdToEntity[entityData['id']] = state.world.entity()
		}
		let entity = entityIdToEntity[entityData['id']]

		entity.parse(entityData['update'])
		for (let componentToRemove of entityData['remove']) {
			entity.remove(componentToRemove)
		}
	}

	destroyEntity(entityData) {

		if (entityData['id'] in entityIdToEntity) {
			let entity = entityIdToEntity[entityData['id']]
			entity.destroy()
		}
	}

	//loop through queues and handle entity actions
	update() {
		while (updateQueue.length > 0) {
			let entityData = updateQueue.pop()
			updateEntity(entityData)
		}

		while (destroyQueue.length > 0) {
			let entityData = destroyQueue.pop()
			destroyEntity(entityData)
		}
	}
}
