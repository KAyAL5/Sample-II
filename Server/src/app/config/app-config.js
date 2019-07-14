const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const expressConfig = require('./express-config');

class AppConfig{
	
	constructor(app){
		dotenv.config();
		this.app = app;
	}

	includeConfig() {
		this.app.use(
            bodyParser.json()
        );
        this.app.use(
        	cors()
        );        
		new expressConfig(this.app);
	}

}
module.exports = AppConfig;