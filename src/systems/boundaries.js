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

	bounce() {
		let magnitude = this.mag(velocity)
		velocity = this.normalized(velocity)
		let newMagnitude = magnitude * collidable.cor
		velocity.x *= newMagnitude
		velocity.y *= newMagnitude
	}
})
