export default class Network {
	constructor(socket, world) {
		this.socket = socket
		this.world = world

		this.updateQueue = []
		this.destroyQueue = []
		this.entityIdToEntity = {}
		this.internalEidToEntityId = {}

		socket.on('updateEntities', (entityList) => {
			this.updateQueue.push(entityList)
		})

		socket.on('destroyEntities', (entityList) => {
			this.destroyQueue.push(entityList)
		})
	}

	updateEntities(entities, updateActions, isPlayer = false) {
		// if ('update' in updateActions || 'remove' in updateActions) {
		console.log('update entities')
		console.log(entities)
		console.log(updateActions)
		let sendEvent = false
		let entityList = []
		for (let entity of entities) {
			let id = null
			if (entity['id'] in this.internalEidToEntityId) {
				id = this.internalEidToEntityId[entity['id']]
			} else if (isPlayer) {
				id = this.playerId
				this.internalEidToEntityId[entity['id']] = id
				this.entityIdToEntity[id] = entity
			}
			let updateEntityData = {
				'id': id,
				'update': {},
				'remove': []
			}

			if ('update' in updateActions) {
				for (let componentName of updateActions['update']) {
					let component = entity.get(componentName)
					if (component) {
						sendEvent = true
						updateEntityData['update'][componentName] = JSON.parse(JSON.stringify(component))
					}
				}
			}

			if ('remove' in updateActions) {
				for (let componentName of updateActions['remove']) {
					sendEvent = true
					updateEntityData['remove'].push(componentName)
				}
			}

			entityList.push(updateEntityData)
		}

		if (sendEvent) {
			this.socket.emit('updateEntities', entityList)
		}

		// }
	}

	destroyEntities(entityList) {
		this.socket.emit('destroyEntities', entityList)
	}

	onJoin(entityId, entityList) {
		console.log('onJoin()')
		console.log(entityList)
		this.playerId = entityId
		this.updateEntityArray(entityList)
	}

	updateEntityArray(entityArray) {
		for (let entityData of entityArray) {
			if (!(entityData['id'] in this.entityIdToEntity)) {
				let newEntity = this.world.entity()
				this.entityIdToEntity[entityData['id']] = newEntity
				this.internalEidToEntityId[newEntity.id] = entityData['id']
			}
			let entity = this.entityIdToEntity[entityData['id']]

			for (let compName in entityData['update']) {
				let comp = entity.access(compName)
				if (typeof comp.fromJSON === 'function') {
					comp.fromJSON(entityData['update'][compName])
				} else {
					entity.update(compName, entityData['update'][compName])
				}
			}
			if ('remove' in entityData) {
				for (let componentToRemove of entityData['remove']) {
					entity.remove(componentToRemove)
				}
			}
		}
	}

	destroyEntity(entityData) {

		if (entityData['id'] in this.entityIdToEntity) {
			let entity = this.entityIdToEntity[entityData['id']]
			delete this.internalEidToEntityId[entity['id']]
			delete this.entityIdToEntity[entityData['id']]
			entity.destroy()
		}
	}

	//loop through queues and handle entity actions
	update() {
		while (this.updateQueue.length > 0) {
			let entityData = this.updateQueue.pop()
			this.updateEntityArray(entityData)
		}

		while (this.destroyQueue.length > 0) {
			let entityData = this.destroyQueue.pop()
			this.destroyEntity(entityData)
		}
	}
}
