Package.describe({
    summary: "Ace editor repackaged for Meteor"
});

var path = Npm.require("path");
var fs = Npm.require("fs");
var packagePath = path.join(path.resolve("."), "packages", "ace-editor");
Package.on_use(function(api) {
    var files = fs.readdirSync(path.join(packagePath, "ace-builds", "src"));
    files.forEach(function(file) {
        if (file === "snippets") { return; }
        var filePath = path.join("ace-builds", "src", file);
        console.log(filePath);
        api.add_files(filePath, "client", {isAsset: true});
    });

    var snippets = fs.readdirSync(path.join(packagePath, "ace-builds", "src", "snippets"));
    snippets.forEach(function(file) {
        var snippetPath = path.join("ace-builds", "src", "snippets", file);
        console.log("snippet: " + snippetPath);
        api.add_files(snippetPath, "client", {isAsset: true});
    });

    // aceConfig.js must load after ace.js. It configures the right path to load themes, mode, etc.
    api.add_files(["ace-builds/src/ace.js", "ace-builds/src/ext-language_tools.js", "ace-builds/src/ext-modelist.js", "aceConfig.js"], "client");
});

Package.on_test(function(api) {
    api.use(["tinytest"]);

    var files = fs.readdirSync(path.join(packagePath, "ace-builds", "src"));
    files.forEach(function(file) {
        if (file === "snippets") { return; }
        api.add_files(path.join("ace-builds", "src", file), "client", {isAsset: true});
    });

    var snippets = fs.readdirSync(path.join(packagePath, "ace-builds", "src", "snippets"));
    snippets.forEach(function(file) {
        api.add_files(path.join("ace-builds", "src", "snippets", file), "client", {isAsset: true});
    });

    // aceConfig.js must load after ace.js. It configures the right path to load themes, mode, etc.
    api.add_files(["ace-builds/src/ace.js", "ace-builds/src/ext-language_tools.js", "ace-builds/src/ext-modelist.js", "aceConfig.js"], "client");

    api.add_files("packageTest.js", "client");
});