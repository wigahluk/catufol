module.exports = function (path, callback) {
    exec = require('child_process').exec;
    exec('git rev-parse --short HEAD', {cwd: path}, function (error, stdout, stderr) {
        if (error) {
            callback(error, stderr.trim());
            return;
        }
        callback(null, stdout.trim());
    });

};
