import * as state from 'state'
import Mousetrap from 'mousetrap'

state.world.system([], class {
	constructor() {
		this.moveDelta = {}
		this.keys = {}

		this.initKeyboardInput()
	}

	pre() {
		// Handle resetKeys events
		events.process('resetKeys', () => {this.resetKeys()})

		// Process keyboard input
		if (!this.touching) {
			this.moveDelta = {x: 0, y: 0}
			for (let name in this.keys) {
				let key = this.keys[name]
				if (key.down) {
					this.moveDelta.x += key.delta.x
					this.moveDelta.y += key.delta.y
				}
			}
		}

		if (this.moveDelta.x !== 0 || this.moveDelta.y !== 0) {
			// Normalize vector
			// TODO: Seriously need a vector class/library for this stuff
			let length = Math.sqrt(this.moveDelta.x * this.moveDelta.x + this.moveDelta.y * this.moveDelta.y)
			this.moveDelta.x /= length
			this.moveDelta.y /= length
		}
	}

	every(input, velocity) {
		// Set force based on input
		velocity.x = this.moveDelta.x * input.speed
		velocity.y = this.moveDelta.y * input.speed

		// Set last direction
		input.lastDirection.x = this.lastMoveDelta.x
		input.lastDirection.y = this.lastMoveDelta.y
	}

	makeKey(deltaX, deltaY) {
		return {
			delta: {
				x: deltaX,
				y: deltaY
			},
			down: false
		}
	}

	resetKeys() {
		for (let name in this.keys) {
			this.keys[name].down = false
		}
	}

	bindKey(key) {
		Mousetrap.bind(key, () => {
			this.keys[key].down = true
		})
		Mousetrap.bind(key, () => {
			this.keys[key].down = false
		}, 'keyup')
	}

	initKeyboardInput() {
		this.keys = {
			w: this.makeKey(0, -1),
			a: this.makeKey(-1, 0),
			s: this.makeKey(0, 1),
			d: this.makeKey(1, 0),
			up: this.makeKey(0, -1),
			left: this.makeKey(-1, 0),
			down: this.makeKey(0, 1),
			right: this.makeKey(1, 0)
		}
		for (let key in this.keys) {
			this.bindKey(key)
		}
	}
})
