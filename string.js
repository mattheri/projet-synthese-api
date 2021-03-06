function pluralize(thing) {
	return `${thing}s`;
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function methodize(string, method) {
	const capitalized = capitalize(string);

	return `${method}${capitalized}`;
}

function camelCase(string) {
	return string.replace(/[-_](\w)/g, (match, letter) => letter.toUpperCase());
}

function normalize(string) {
	return pluralize(string.toLowerCase().replace(/[-_]/g, ''));
}

module.exports = {
	pluralize,
	capitalize,
	methodize,
	camelCase,
	normalize
}