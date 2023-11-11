import HTTP from "http";

export type Server = HTTP.Server<typeof HTTP.IncomingMessage, typeof HTTP.ServerResponse>