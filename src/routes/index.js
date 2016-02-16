var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('main', {});
});

router.get('/projects', function (req, res) {
    var db = req.db;
    var projects = db.get('projects');

    projects.find({}, {}, function (e, docs) {
        res.render('projects', {
            'projects': docs
        });
    });
});

router.get('/manager', function (req, res) {
    var db = req.db;
    var projects = db.get('projects');

    projects.find({}, {}, function (e, docs) {
        res.render('manager', {
            'projects': docs
        });
    });
});

router.post('/manager', function (req, res) {
    var db = req.db;
    var projects = db.get('projects');

    var project = {
        'name': req.body.name,
        'description': req.body.description,
        'url': req.body.url,
        'githubUrl': req.body.githubUrl,
        'startDate': req.body.startDate,
        'endDate': req.body.endDate,
        'startDatePretty': moment(req.body.startDate).format('MMMM YYYY'),
        'endDatePretty': moment(req.body.endDate).format('MMMM YYYY'),
        'tools': req.body.tools.split(',')
    };

    projects.insert(project, function (err, doc) {
        if (err) {
            return res.send('There was a problem adding the information to the database.');
        }

        res.redirect('/manager');
    });
});

router.delete('/manager', function (req, res) {
    var db = req.db;
    var projects = db.get('projects');

    projects.remove({ _id: req.body.id }, function (error, doc) {
        if (error) {
            return res.sendStatus(500);
        }

        res.sendStatus(200);
    });
});

module.exports = router;