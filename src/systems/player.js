import * as state from 'state'

state.world.system([], class {
	init() {
		console.log('player init()')

		let pos = {
			x: 100,
			y: 100
		}
		let radius = 16
		let graphics = new PIXI.Graphics()
		graphics.beginFill(0xFFFFFF)
		graphics.drawCircle(pos.x, pos.y, radius)
		graphics.endFill()

		// Create player
		// state.network.playerId = '5'
		let ent = state.world.entity(state.network.playerId)
		ent.set('position', pos.x, pos.y)
			.set('velocity')
			.set('force')
			.set('mass', 1)
			.set('shape', state.gameStage, graphics)
			.set('inputTranslational', 800)
			.set('player')
			.set('collidable')

		console.log('Player created:')
		console.log(ent)

		state.network.updateEntities([{
			id: state.network.playerId,
			update: JSON.parse(entity.toString())
		}])
	}
})
