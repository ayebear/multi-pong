import * as state from 'state'
import 'components'

// Import systems here
import 'network'
import 'player'
import 'input'
import 'forces'
import 'movement'
import 'boundaries'
import 'view'
import 'render'

let lastTime = 0.0

function load() {
	// Load textures
	let loader = PIXI.loader
	loader.add('ball', 'data/ball.png')
	loader.add('goal', 'data/goal.png')
	loader.add('bg-ice', 'data/bg-ice.png')
	loader.add('puck', 'data/puck.png')
	state.bgStage.addChild(new PIXI.Sprite.fromImage('data/bg-ice.png'))

	// Start when done loading
	loader.load(start)
}

// Initialize systems and start the main loop
function start() {
	console.log('Waiting to join...')
	state.network.socket.emit('join', {})
	state.network.socket.on('joined', function(joinedData) {
		console.log('Joining...')
		state.network.onJoin(joinedData.id, joinedData.entityList)
		state.world.init()

		requestAnimationFrame(gameLoop)
	})
}

function gameLoop(time) {
	// Calculate delta-time
	state.dt.val = (time - lastTime) / 1000.0
	lastTime = time

	state.dt.total = time

	state.world.run()
	requestAnimationFrame(gameLoop)
}

load()
