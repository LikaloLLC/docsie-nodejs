const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Somewhere in the config module
const DEPLOYMENT_1_ID = 'deployment_cQPneKKawjVsample';
const DEPLOYMENT_1_MASTER_KEY = 'key_XREeuYWSOkfG1UcYY4TqOs52US3fSlEj97Zldoc' +
    'MQUbRZXUiOxXxj7IXR8RvPRr2ACqsiaX2xIaDaVu22l' +
    'dXYfDpvLvUoBNaWKZxUAtkXbJ3nxh2jKihuJJE9Gsample';

const DEPLOYMENT_2_ID = 'deployment_F2fHsQkpBoPsample';
const DEPLOYMENT_2_MASTER_KEY = 'key_c2C1OPimUlnhAgZq4PSWhYmKe77DfdhnHMv8WII' +
    'VXdHNBOXvyKwRgZQyLa8n8ppf7ddguJpu6Wlbk6a7y1' +
    'xGPaeSAeDDxLPcJuTiZ73gOVtC5tcyQbT2oHePL6sample';

const deploymentKeyMap = new Map([
    [DEPLOYMENT_1_ID, DEPLOYMENT_1_MASTER_KEY],
    [DEPLOYMENT_2_ID, DEPLOYMENT_2_MASTER_KEY]
]);


app.get('/', (req, res) => {
    // Validate user access and generate a JWT token.

    if (req.query.deployment === undefined) {
        return res.status(400).json({error: 'Missing `deployment` query param.'});
    }

    const masterKey = deploymentKeyMap.get(req.query.deployment)
    if (masterKey === undefined) {
        return res.status(404).json({error: 'Deployment not found.'});
    }

    const token = jwt.sign({}, masterKey);

    res.json({token: token})
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
