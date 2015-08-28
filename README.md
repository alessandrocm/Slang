# Slang
A nodejs web application for Slack slash command integrations. Custom slash commands are easily integrated with plugins

## Requirements

You'll need the following to get started.

* git
* node.js
* gulp

## Running Slang

1. Clone this repository

    `git clone https://github.com/alessandrocm/Slang.git`
2. Install dependencies
    
    `npm install`
3. Update `config.js` so Slang knows where to send responses

    `slack_hook : 'https:// https://hooks.slack.com/services/TXXXXX/BXXXXX/XYXYXYXYXYXYX'`
4. Run

    `npm start`
    
### Running unit tests and test coverage

    `gulp test`
    
## Plugins
Plugins are added by creating additional folders in the `/plugins` directory. 
The folder for your plugin must contain a `index.js` file with the following code.

```
function commandHandler(request, slack) {
    //Handle slack command here.
}

module.exports = function(slang) {
    slang.use('/command',commandHandler); //Change the first parameter to the slash command you wish to handle.
};
```

For another example see the `plugins/echo` folder already included.
The commandHandler function takes two parameters. 
* The Slack request payload.
* A Slack service to send messages back to Slack via incoming webhooks.

### Configuring your plugin in Slack

In the services page of your Slack organization, add a new Slash Command.

Under Integration Settings, set the following:

* Command - the slash command a Slack user should type to trigger your plugin.
* URL - the url of your Slang instance.
* Method - POST
* Token - If your plugin wishes to ensure the message came from slack.

Once complete, click save Integration. Now you can type your slash command in Slack and Slang will run your plugin in response.
