import * as state from 'state'

state.world.system([], class {
	init() {
		let pos = {
			x: 200,
			y: 200
		}
		let radius = 100
		let graphics = PIXI.Graphics()
		graphics.beginFill(0xFFFFFF)
		graphics.drawCircle(pos.x, pos.y, radius)
		graphics.endFill()

		// Create player
		let ent = state.world.entity(state.playerId)
		ent.set('position')
			.set('velocity')
			.set('shape', state.gameStage, graphics)
			.set('inputTranslational', 200)

		// Link shape position with position component
		ent.get('shape').shape.position = ent.get('position')
	}
})