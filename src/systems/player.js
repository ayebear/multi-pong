import * as state from 'state'

state.world.system([], class {
	init() {
		console.log('player init()')

		let pos = {
			x: 200,
			y: 200
		}
		let radius = 100
		let graphics = new PIXI.Graphics()
		graphics.beginFill(0xFFFFFF)
		graphics.drawCircle(pos.x, pos.y, radius)
		graphics.endFill()

		// Create player
		state.network.playerId = '5'
		let ent = state.world.entity(state.network.playerId)
		ent.set('position', pos.x, pos.y)
			.set('velocity')
			.set('force')
			.set('mass')
			.set('shape', state.gameStage, graphics)
			.set('inputTranslational', 200)
			.set('player')

		// Link shape position with position component
		ent.get('shape').shape.position = ent.get('position')

		console.log(ent)

		// state.network.updateEntites(playerEntity)
	}
})
