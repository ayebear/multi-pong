import * as state from 'state'
import Mousetrap from 'mousetrap'

state.world.system(['inputTranslational', 'force'], class {
	constructor() {
		this.moveDelta = {}
		this.keys = {}

		this.initKeyboardInput()
	}

	pre() {
		// Process keyboard input
		this.moveDelta = {x: 0, y: 0}
		for (let name in this.keys) {
			let key = this.keys[name]
			if (key.down) {
				this.moveDelta.x += key.delta.x
				this.moveDelta.y += key.delta.y
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

	every(input, force, ent) {
		// Set force based on input
		let oldForce = {
			x: force.x,
			y: force.y
		}
		force.x = this.moveDelta.x * input.force
		force.y = this.moveDelta.y * input.force

		// Update position and force components if user input changes
		if (force.x !== oldForce.x || force.y !== oldForce.y) {
			state.network.updateEntities([ent], {update: ['position', 'force']})
		}
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
