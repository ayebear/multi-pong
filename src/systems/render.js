import * as state from 'state'

// Render the stage
state.world.system(['pixiStage'], class {
	constructor() {
		this.renderer = null
	}

	init() {
		// Setup pixi renderer and add to page
		this.renderer = PIXI.autoDetectRenderer(state.gameSize.width, state.gameSize.height, {antialias: true})
		document.body.appendChild(this.renderer.view)

		// Add entity with pixi stage
		state.world.entity().set('pixiStage', state.stage)
	}

	every(pixiStage) {
		this.renderer.render(pixiStage.root)
	}
})
