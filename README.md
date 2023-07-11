
# Resume Builder

Resume Builder is a React application with Node backend where one can effectively build a single page professional resume.

For given user input, custom resume can be generated within minutes with the help of Adobe's Document Generation API.

### Features:

- Customise with templates
- Simple interface that helps you build quicky!
- No sign up needed — go straight to building!
- Your data never leaves your device
- Add custom links




## Packages Used

To deploy this project, following were used:

**For frontend:**
- react-router-dom
- react-bootstrap

**For backend:**
- adobe/pdfservices-node-sdk
- express @4.18.1
- nodemon @2.0.20

## Run Locally

Go to the project directory and install dependencies

```bash
  cd my-app
  npm i react-router-dom
  npm i react-bootstrap
  cd backend
  npm install --save @adobe/pdfservices-node-sdk
  npm install express@4.18.1 nodemon@2.0.20
```

For client-

```bash
  cd my-app
  npm start
```

For server-

```bash
  cd my-app
  cd backend
  nodemon index.js
```

## Usage

User can insert personal information in the form provided in React application. This message is then fed to following endpoint-

```bash
http://localhost:8080/api/resume
```
On the server end, this message is converted into JSON format and with the help of Document Generation API, resume is generated in PDF format.

After successful generation, we will be navigated to download page.
#### 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/om-gupta-71b289241/)


