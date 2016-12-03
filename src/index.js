import * as state from 'state'
import 'components'

// let socket = io('http://localhost:3000')

// Import systems here
import 'network'
import 'player'
import 'input'
import 'forces'
import 'movement'
import 'render'

let lastTime = 0.0

// function load() {
// 	// Load textures
// 	let loader = PIXI.loader
// 	// loader.add('textures', 'data/textures.json')

// 	// Start when done loading
// 	loader.load(start)
// }

// Initialize systems and start the main loop
function start() {
	// socket.on('joined', function(joinedData) {
		// state.network.playerId = joinedData.playerId
		console.log('start()')
		state.world.init()
		requestAnimationFrame(gameLoop)
	// })
}

function gameLoop(time) {
	// Calculate delta-time
	state.dt.val = (time - lastTime) / 1000.0
	lastTime = time

	state.dt.total = time

	state.world.run()
	requestAnimationFrame(gameLoop)
}

start()
