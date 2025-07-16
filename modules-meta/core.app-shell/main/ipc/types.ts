export interface IpcChannels {
  'ping': { // Example channel
    request: string; // Type for the request payload
    response: string; // Type for the response payload
  };
  // Add more channels as needed
}