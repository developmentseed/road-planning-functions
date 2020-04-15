export function fetchMessages (queueName: string, concurrency: number): Promise<Message[]>

export function ackMessage (queueName: string, receiptHandle: string): Promise<any>

export function sendMessage (queueName: string, data: object): Promise<any>

export function createAnalysisMessage (queueName: string, uuid: string, params: object): Promise<any>

export function getQueueUrl (queueName: string): Promise<string>

interface Message {
  body: {
    key: string;
    params: object;
    createdAt: string;
  };
  receiptHandle: string;
}
