# broccoli-rework-single

Inspired heavily by [broccoli-less-single](https://github.com/gabrielgrant/broccoli-less-single)

## Installation & usage

```
npm install --save-dev broccoli-rework-single
```

```js
var rework = require('broccoli-rework-single');
var tree = rework(inputTrees, inputFile, outputFile, opts);
```

- `inputTrees`: A tree or array of trees.
- `inputFile`: The relative path of a file that exists in the `inputTree`(s). This is the file that will be read and passed into rework.
- `outputFile`: The relative path of the output file.
- `opts`: A hash of options for rework.

See `Brocfile.js` for an example.

## Tests!

```
npm test
```
