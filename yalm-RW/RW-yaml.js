const fs = require('fs');
const yaml = require('js-yaml');

try {
    let fileContents = fs.readFileSync('./test-input.yaml', 'utf8');
    let data = yaml.safeLoad(fileContents);

    console.log(data);

    fs.writeFile('./test-output.yaml', yaml.safeDump(data), (err) => {
        if (err) {
            console.log(err);
        }
    });

} catch (e) {
    console.log(e);
}