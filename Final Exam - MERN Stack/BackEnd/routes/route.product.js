const SpeedyController = require('../controllers/speedy.controller');

module.exports = function(app) {
    app.post('/api/create', SpeedyController.createSpeedy);
    app.get('/api/allspeedly', SpeedyController.getAllSpeedys);
    app.get('/api/speedy/:id', SpeedyController.getSpeedyById);
    app.delete('/api/speedy/:id', SpeedyController.deleteSpeedy);
    app.put('/api/speedy/:id', SpeedyController.updateSpeedy);

}