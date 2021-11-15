const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Somewhere in the config module
const masterKey = '<masterKey>';


app.get('/', (req, res) => {
    // Validate user access and generate a JWT token.
    const token = jwt.sign({}, masterKey);
    const redirectURL = `https://portals.docsie.io/path/to/portal/?token=${token}`

    res.redirect(redirectURL);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
