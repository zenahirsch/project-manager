var Handlebars = require('handlebars');
var template_cache = {};
var layout_path = 'layout';
var cache_templates = false;
var fs = require('fs');
var partials_dir = './src/templates/partials/';

// Read in partials content and register them to Handlebars
fs.readdirSync(partials_dir)
    .forEach(function (filename) {
        var name = filename.replace(/\.[^/.]+$/, '');
        var content = fs.readFileSync(partials_dir + filename, 'utf-8');
        Handlebars.registerPartial(name, content);
    });

var getTemplate = function (path) {
    if (!template_cache[path]) {
        template_cache[path] = Handlebars.compile(fs.readFileSync('./src/templates/' + path + '.hbs').toString());
    }

    var template = template_cache[path];
    cache_templates ? null : template_cache[path] = null;

    return template;
};

module.exports = function (req, res, next) {
    res.render = function (path, vars) {
        res.set('content-type', 'text/html');
        res.set('cache-control', 'no-cache');

        var template = getTemplate(path);

        if (layout_path && !req.query.ajax) {
            var compiled_layout = getTemplate(layout_path);
            res.end(compiled_layout({
                title: 'Zena Hirsch',
                content: template(vars)
            }));
        } else {
            res.end(template(vars));
        }
    }

    next();
};