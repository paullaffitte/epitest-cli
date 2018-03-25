function filterPrompt(prompt, data) {
	return prompt.filter(entry => {
		return !data[entry.name];
	});
}

module.exports = {
	filterPrompt
};
