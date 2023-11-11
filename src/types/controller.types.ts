import { Request, Response } from "express";
import { ResponseBody } from "./response.types";

export type Route<DataType> = (request: Request, response: Response) => RouteReturn<DataType>

export type RouteReturn<DataType> = Promise<Response<ResponseBody<DataType | undefined>, Record<string, any>>>;