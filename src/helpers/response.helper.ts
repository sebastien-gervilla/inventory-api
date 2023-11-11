import { Response } from "express";

export default class ResponseHelper<T> {

    constructor(private _response: Response<ResponseBody<T | undefined>>) { }

    send(httpCode: number, message: string, data?: T) {
        this._response.statusCode = httpCode;
        this._response.statusMessage = message;

        return this._response.json({
            data,
            meta: {}
        });
    }
}

export interface ResponseBody<DataType> {
    data: DataType
    meta: {}
}