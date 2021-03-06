export default {
  oidc: {
    clientId: '0oae6giclrPt2JoAt0h7',
    issuer: 'https://dev-398658.oktapreview.com',
    // Okta can only accept one absolute redirect URI
    // You can create your own heroku instance and replace its uri below in order to push to Heroku
    // (ie. https://<your heroku instance here>.herokuapp.com/implicit/callback)
    redirectUri: 'http://localhost:3000/implicit/callback',
    scope: 'openid profile email',
  },
  resourceServer: {
    messagesUrl: 'http://localhost:3000/api/messages',
  },
};
