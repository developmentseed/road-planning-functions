const { SQS } = require('aws-sdk');
const sqs = new SQS({ region: 'us-east-1' });

/**
 * Fetches messages from a queue
 *
 * @param {string} queueName Name of the queue.
 * @param {number} concurrency Maximum number of messages to retrieve,
 * from 1 to 10
 *
 * @returns {Promise<object>}
 */
async function fetchMessages (QueueUrl, concurrency) {
  const { Messages = [] } = await sqs
    .receiveMessage({
      MaxNumberOfMessages: concurrency,
      QueueUrl,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 20
    })
    .promise();

  return Messages.map(({ Body, ReceiptHandle }) => ({
    body: JSON.parse(Body),
    receiptHandle: ReceiptHandle
  }));
}

/**
 * Acknowledges a message from a queue by deleting it.
 *
 * @param {string} queueName Name of the queue.
 * @param {string} receiptHandle Message receipt handle
 *
 * @returns {Promise<object>}
 */
const ackMessage = (QueueUrl, receiptHandle) =>
  sqs
    .deleteMessage({
      QueueUrl,
      ReceiptHandle: receiptHandle
    })
    .promise();

/**
 * Sends a message to a queue with the given data.
 *
 * @param {string} queueName Name of the queue.
 * @param {object} data Data to store in the message body
 *
 * @returns {Promise<object>}
 */
const sendMessage = (QueueUrl, data) =>
  sqs
    .sendMessage({
      QueueUrl,
      MessageBody: JSON.stringify(data)
    })
    .promise();

/**
 * Creates a specially formatted message for starting an analysis process.
 *
 * @param {string} queueName Name of the queue.
 * @param {string} uuid Uuid of the results file on the S3 bucket.
 * @param {object} params Analysis parameters
 *
 * @returns {Promise<object>}
 */
const createAnalysisMessage = (QueueUrl, uuid, params) =>
  sqs
    .sendMessage({
      QueueUrl,
      MessageBody: JSON.stringify({
        key: uuid,
        params,
        createdAt: new Date().toISOString()
      })
    })
    .promise();

const getQueueUrl = (QueueName) =>
  sqs
    .getQueueUrl({ QueueName })
    .promise()
    .then(({ QueueUrl }) => QueueUrl);

module.exports = {
  fetchMessages,
  ackMessage,
  sendMessage,
  createAnalysisMessage,
  getQueueUrl
};
