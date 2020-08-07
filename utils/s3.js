const { S3 } = require('aws-sdk');
const s3 = new S3();

/**
 * Store a s3 object with the given data.
 *
 * @param {object} param Options parameters
 * @param {string} param.key S3 object key
 * @param {string} param.bucket S3 bucket
 * @param {string} param.state Status of the operation. One of:
 *                 SUCCEEDED | FAILED | STARTED | PENDING
 * @param {object} param.output Results of the operation
 * @param {string} param.createdAt Creation date in ISO String
 *
 * @returns Promise
 */
function storeOutput ({ key, bucket, state, output, createdAt }) {
  return s3
    .putObject({
      Body: JSON.stringify({
        createdAt,
        updatedAt: new Date().toISOString(),
        state,
        output: output || null
      }),
      Key: key,
      Bucket: bucket,
      ContentType: 'application/json',
      Metadata:
        state === 'FAILED'
          ? {
            failed: '1'
          }
          : undefined
    })
    .promise();
}

/**
 * Store a kill signal on S3 to cancel the analysis.
 *
 * @param {object} param Options parameters
 * @param {string} param.uuid The analysis uuid
 * @param {string} param.bucket S3 bucket
 *
 * @returns Promise
 */
function storeKillSignal ({ uuid, bucket }) {
  return s3
    .putObject({
      Body: '',
      Key: `${uuid}.kill`,
      Bucket: bucket
    })
    .promise();
}

/**
 * Retrieves JSON results from an s3 object with the given uuid.
 *
 * @param {string} bucket S3 bucket
 * @param {string} uuid Uuid of the results to retrieve.
 *
 * @returns Promise
 */
function getResults (bucket, uuid) {
  return s3
    .getObject({
      Key: `${uuid}.json`,
      Bucket: bucket,
      ResponseContentType: 'application/json'
    })
    .promise()
    .then(data => data.Body.toString('utf-8'))
    .then(JSON.parse);
}

/**
 * Checks if file exists at provided key and bucket location.
 * Will resolve if it does, will reject if it does not.
 *
 * @param {string} bucket S3 bucket
 * @param {string} key S3 key
 *
 * @returns Promise
 */
const exists = ({ key, bucket }) =>
  s3.headObject({ Key: key, Bucket: bucket }).promise();

module.exports = {
  storeOutput,
  storeKillSignal,
  getResults,
  exists
};
