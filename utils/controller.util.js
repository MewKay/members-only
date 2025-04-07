const { formatDistanceToNowStrict } = require("date-fns");

const formatMessagesDate = (messages) => {
  const formattedMessages = messages.map((message) => {
    const formattedDate = formatDistanceToNowStrict(message.created_at, {
      addSuffix: true,
    });

    return {
      ...message,
      created_at: formattedDate,
    };
  });

  return formattedMessages;
};

module.exports = { formatMessagesDate };
