const escape = require('./string_escape');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;


var optimige = {
    async: function (input, output) {
        input = escape.bash_escape(input);
        output = escape.bash_escape(output);

        exec(' convert ' + input + ' -layers Optimize ' + output, (err, stdout, stderr) => {
            if (err) { console.log(err); }
            console.log(stdout);
        });
    },

    sync: function (input, output) {
        const result = execSync(' convert ' + input + ' -layers Optimize ' + output).toString();
        console.log(result);
    }

}

module.exports = optimige
