const { WebClient } = require('@slack/web-api');

// Initialize Slack Web API client
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

// Constants
const RTM_READ_DELAY = 1000; // 1 second delay between reading from RTM
const EXAMPLE_COMMAND = 'do';
const MENTION_REGEX = /^<@(|[WU].+?)>(.*)/;

// Function to parse Slack events and find bot commands
function parseBotCommands(slackEvents) {
    for (const event of slackEvents) {
        if (event.type === 'message' && !event.subtype) {
            const [user_id, message] = parseDirectMention(event.text);
            if (user_id === process.env.SLACK_BOT_USER_ID) {
                return { command: message, channel: event.channel };
            }
        }
    }
    return { command: null, channel: null };
}

// Function to parse direct mentions in message text
function parseDirectMention(messageText) {
    const matches = messageText.match(MENTION_REGEX);
    return matches ? [matches[1], matches[2].trim()] : [null, null];
}

// Function to handle bot commands
async function handleCommand(command, channel) {
    let response = null;
    const defaultResponse = `Not sure what you mean. Try *${EXAMPLE_COMMAND}*.`;

    if (command.startsWith(EXAMPLE_COMMAND)) {
        response = 'Sure...write some more code then I can do that!';
    }

    // Send the response back to the channel
    await slackClient.chat.postMessage({ channel, text: response || defaultResponse });
}

(async () => {
    // Connect to Slack RTM API
    const { self, team } = await slackClient.auth.test();
    console.log(`Starter Bot connected and running as ${self.name} in team ${team.name}`);

    // Store bot user ID
    process.env.SLACK_BOT_USER_ID = self.id;

    // Start reading events from RTM
    while (true) {
        const { data } = await slackClient.conversations.history({ channel: process.env.SLACK_CHANNEL_ID });
        const { messages } = data;
        const { command, channel } = parseBotCommands(messages);
        if (command) {
            await handleCommand(command, channel);
        }
        await new Promise(resolve => setTimeout(resolve, RTM_READ_DELAY));
    }
})();
const { WebClient } = require('@slack/web-api');

// Initialize Slack Web API client
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

// Constants
const RTM_READ_DELAY = 1000; // 1 second delay between reading from RTM
const EXAMPLE_COMMAND = 'do';
const MENTION_REGEX = /^<@(|[WU].+?)>(.*)/;

// Function to parse Slack events and find bot commands
function parseBotCommands(slackEvents) {
    for (const event of slackEvents) {
        if (event.type === 'message' && !event.subtype) {
            const [user_id, message] = parseDirectMention(event.text);
            if (user_id === process.env.SLACK_BOT_USER_ID) {
                return { command: message, channel: event.channel };
            }
        }
    }
    return { command: null, channel: null };
}

// Function to parse direct mentions in message text
function parseDirectMention(messageText) {
    const matches = messageText.match(MENTION_REGEX);
    return matches ? [matches[1], matches[2].trim()] : [null, null];
}

// Function to handle bot commands
async function handleCommand(command, channel) {
    let response = null;
    const defaultResponse = `Not sure what you mean. Try *${EXAMPLE_COMMAND}*.`;

    if (command.startsWith(EXAMPLE_COMMAND)) {
        response = 'Sure...write some more code then I can do that!';
    }

    // Send the response back to the channel
    await slackClient.chat.postMessage({ channel, text: response || defaultResponse });
}

(async () => {
    // Connect to Slack RTM API
    const { self, team } = await slackClient.auth.test();
    console.log(`Starter Bot connected and running as ${self.name} in team ${team.name}`);

    // Store bot user ID
    process.env.SLACK_BOT_USER_ID = self.id;

    // Start reading events from RTM
    while (true) {
        const { data } = await slackClient.conversations.history({ channel: process.env.SLACK_CHANNEL_ID });
        const { messages } = data;
        const { command, channel } = parseBotCommands(messages);
        if (command) {
            await handleCommand(command, channel);
        }
        await new Promise(resolve => setTimeout(resolve, RTM_READ_DELAY));
    }
})();
