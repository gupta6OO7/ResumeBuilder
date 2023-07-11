const express = require('express');

const router = express.Router()

//document generation API by Adobe
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
const fs = require('fs');

router.post('/resume', async (req, res) => {

    try {

        //to convert raw link in anchor format
        let linkedin = '<a href="' + req.body.creds.LinkedIn + '">LinkedIn</a>';
        req.body.creds.LinkedIn = linkedin;

        //output will be generated in this file
        const OUTPUT = '../public/generatedResume.pdf';

        // If our output already exists, remove it so we can run the application again.
        if (fs.existsSync(OUTPUT)) fs.unlinkSync(OUTPUT);

        //using template chosen by user
        const INPUT = '../templates/' + req.body.template + '.docx';


        //converting our input object to JSON data
        const JSON_INPUT = JSON.parse(JSON.stringify(req.body.creds));


        // Set up our credentials object.
        const credentials = PDFServicesSdk.Credentials
            .servicePrincipalCredentialsBuilder()
            .withClientId("54cdf1b2f88c4cf683b547c0e42037a1")
            .withClientSecret("p8e-vsjJyGGij2gnrJVWZMHG6x1tK0YCtXsj")
            .build();

        // Create an ExecutionContext using credentials
        const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

        // This creates an instance of the Export operation we're using, as well as specifying output type (DOCX)
        const documentMerge = PDFServicesSdk.DocumentMerge,
            documentMergeOptions = documentMerge.options,
            options = new documentMergeOptions.DocumentMergeOptions(JSON_INPUT, documentMergeOptions.OutputFormat.PDF);

        // Create a new operation instance using the options instance.
        const documentMergeOperation = documentMerge.Operation.createNew(options);

        // Set operation input document template from a source file.
        const input = PDFServicesSdk.FileRef.createFromLocalFile(INPUT);
        documentMergeOperation.setInput(input);


        // Execute the operation and Save the result to the specified location.
        documentMergeOperation.execute(executionContext)
            .then(result => result.saveAsFile(OUTPUT))
            .catch(err => {
                if (err instanceof PDFServicesSdk.Error.ServiceApiError
                    || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                    console.log('Exception encountered while executing operation', err);
                } else {
                    console.log('Exception encountered while executing operation', err);
                }
            });

        //console.log(JSON.stringify(req.body.creds));

        //returning success = true 
        res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

module.exports = router; 