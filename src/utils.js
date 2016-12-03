Math.toRadians = function(degrees) {
	return degrees * Math.PI / 180.0
}

Math.toDegrees = function(radians) {
	return radians * 180.0 / Math.PI
}

function deltaToDegrees(delta) {
	return Math.atan2(delta.y, delta.x) * 180 / Math.PI
}

function isObject(item) {
	return (item && typeof item === 'object' && !Array.isArray(item) && item !== null)
}

// Original source from http://stackoverflow.com/a/37164538
function mergeDeepObject(target, source) {
	let output = Object.assign({}, target)
	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach(key => {
			if (isObject(source[key])) {
				if (!(key in target)) {
					Object.assign(output, { [key]: source[key] })
				}
				else {
					output[key] = mergeDeepObject(target[key], source[key])
				}
			} else {
				Object.assign(output, { [key]: source[key] })
			}
		})
	}
	return output
}

// Works like Object.assign(), but does a recursive merge
function mergeDeep(...sources) {
	let output = {}
	for (let source of sources) {
		output = mergeDeepObject(output, source)
	}
	return output
}

// Returns A - B
// Note: Only works on flat dictionaries
function diff(dictA, dictB) {
	let result = Object.assign({}, dictA)
	for (let key in dictB) {
		delete result[key]
	}
	return result
}

// Re-orders top level of child containers based on their zIndex values
function updateZIndex(container) {
	container.children.sort((a, b) => {
		a.zIndex = a.zIndex || 0
		b.zIndex = b.zIndex || 0
		return a.zIndex - b.zIndex
	})
}

// Distance between two vectors (end - start)
function vecDistance(vecStart, vecEnd) {
	let x = (vecEnd.x - vecStart.x)
	let y = (vecEnd.y - vecStart.y)
	return Math.sqrt((x * x) + (y * y))
}

export { deltaToDegrees, mergeDeep, diff, updateZIndex, vecDistance }
