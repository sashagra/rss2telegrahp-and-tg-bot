const { MAIL_PASS, MAIL_USER } = require('../config')
const isNewPost = require('../helpers/compare-date')

const FROM = 'Новости минской общины ИСККОН'

const newsFromMail = async () => {
  const { ImapFlow } = require('imapflow');
  const client = new ImapFlow({
      host: 'imap.gmail.com',
      port: 993,
      secure: true,
      auth: {
          user: MAIL_USER,
          pass: MAIL_PASS
      }
  });
  const news = []
  // Wait until client connects and authorizes
  await client.connect();

  // Select and lock a mailbox. Throws if mailbox does not exist
  let lock = await client.getMailboxLock('INBOX');
  try {
      // fetch latest message source
      // client.mailbox includes information about currently selected mailbox
      // "exists" value is also the largest sequence number available in the mailbox
      // let message = await client.fetchOne(client.mailbox.exists, { source: true });
      // console.log(message.source.toString());

      // list subjects for all messages
      // uid value is always included in FETCH response, envelope strings are in unicode.
      for await (let message of client.fetch('1:*', { source: true, envelope: true })) {
        if (message.envelope.from[0].name === FROM) {

          const newsId = message.source.toString().split('X-Postmaster-Msgtype: ')[1].split('\n')[0].trim()
          if (isNewPost(message.envelope.date)) {
            // news.push({newsId, date: message.envelope.date, title: message.envelope.subject});

            news.push(+newsId)
          }

        }          
      }
  } finally {
      // Make sure lock is released, otherwise next `getMailboxLock()` never returns
      lock.release();
  }

  // log out and close connection
  await client.logout();
  const links = news.sort((a, b) => b - a).map(id => `https://www.vioms.ru/mailings/${id}/full`)
  return links
};

module.exports = newsFromMail