function validateURI(uri, needles = []) {
  needles.forEach((needle) => {
    if (!uri.includes(needle)) {
      throw new Error('Invalid URL');
    }
  });
}

module.exports = { validateURI };
