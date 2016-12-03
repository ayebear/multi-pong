import {World} from 'picoes'

let world = new World()
let dt = {
	val: 0.0,
	total: 0.0
}

// Create pixi containers
let stage = new PIXI.Container()
let bgStage = new PIXI.Container()
let gameStage = new PIXI.Container()
let uiStage = new PIXI.Container()

stage.addChild(bgStage)
stage.addChild(gameStage)
stage.addChild(uiStage)

let network = {}

let gameSize = {
	width: 1600,
	height: 900
}

export { world, dt, stage, bgStage, gameStage, uiStage, network, gameSize }
