import {World} from 'picoes'
import Network from 'net.js'

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


let socket = io('http://localhost:3000')
let network = new Network(socket, world)

let gameSize = {
	width: 1320,
	height: 720
}

export { world, dt, stage, bgStage, gameStage, uiStage, network, gameSize }
