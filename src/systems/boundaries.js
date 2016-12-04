import * as state from 'state'

state.world.system(['position', 'velocity', 'collidable'], class {
	every(position, velocity, collidable) {
		if (position.x < 0) {
			position.x = 0
			velocity.x *= -1
			this.bounce(velocity, collidable.cor)
		}
		if (position.x > state.gameSize.width) {
			position.x = state.gameSize.width
			velocity.x *= -1
			this.bounce(velocity, collidable.cor)
		}
		if (position.y < 0) {
			position.y = 0
			velocity.y *= -1
			this.bounce(velocity, collidable.cor)
		}
		if (position.y > state.gameSize.height) {
			position.y = state.gameSize.height
			velocity.y *= -1
			this.bounce(velocity, collidable.cor)
		}
	}

	mag(vec) {
		return Math.sqrt(vec.x * vec.x + vec.y * vec.y)
	}

	normalize(vec, magnitude) {
		vec.x /= magnitude
		vec.y /= magnitude
	}

	bounce(velocity, cor) {
		let magnitude = this.mag(velocity)
		this.normalize(velocity, magnitude)
		let newMagnitude = magnitude * cor
		velocity.x *= newMagnitude
		velocity.y *= newMagnitude
		console.log('old: ' + magnitude + ', new: ' + newMagnitude)
	}
})
