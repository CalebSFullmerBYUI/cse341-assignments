const express = require('express');
const router = express.Router();

// Get default data for page.
router.get('/', (req, res, next) => {
    //res.render('/pages/prove01Input');
    res.render('pages/prove01Input',{
        path: '/prove01Input'
    });
});


// Parse form data and render response page.
// Form data will be concatenated.
router.post('/responseData', (req, res, next)=> {
    const incomingData = []
    // Get incoming data.
    req.on('data', (data)=> {
        incomingData.push(data);
    });

    return req.on('end', () => {
        // This does not handle special characters. With my present knowledge,
        // it seems those chars must be handled individually.
        parsedData = Buffer.concat(incomingData).toString();
        parsedData = parsedData.split('&');

        // Get input1 and input2 and concatenate them.
        concatText = (parsedData[0].split('=')[1].split('+').join(' ') + parsedData[1].split('=')[1].split('+').join(' ')).trim();

        // Render output page.
        res.render('pages/prove01Output',{
            path: '/prove01Output',
            // If nothing (or only whitespace) was entered, display a title indicating nothing was entered.
            title: (concatText) === '' ? 'Nothing Entered' : 'Your Concatenated Text',
            concatenatedText: concatText
        });
        res.end();
    });
});


module.exports = router;