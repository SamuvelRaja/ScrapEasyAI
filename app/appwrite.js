import { Client, Account } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

export const client = new Client();
client
    .setEndpoint(endpoint)
    .setProject(project);

export const account = new Account(client);
export { ID } from 'appwrite';