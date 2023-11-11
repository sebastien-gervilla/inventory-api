import supertest from 'supertest';

export interface ResponseBody<DataType> {
    data: DataType
    meta: {}
}

export interface Response<DataType = any> extends supertest.Response {
    body: ResponseBody<DataType>
}