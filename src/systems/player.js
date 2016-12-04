import * as state from 'state'

state.world.system([], class {
	init() {
		console.log('player init()')

		let pos = {
			x: 100,
			y: 100
		}

		// Create player
		// state.network.playerId = '5'
		let ent = state.world.entity()
		ent.set('position', pos.x, pos.y)
			.set('velocity')
			.set('force')
			.set('mass', 1)
			.set('sprite', state.gameStage, 'ball')
			.set('inputTranslational', 800)
			.set('player')
			.set('collidable', 0.8)

		console.log('Player created:')
		console.log(ent)

		let components = Object.keys(ent.data).filter(compName => compName !== 'inputTranslational')
		state.network.updateEntities([ent], {update: components})
	}
})
