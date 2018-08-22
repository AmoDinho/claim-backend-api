//create claim

import uuid from "uuid";
import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";


export async function main(event, context, callback){
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            claimId: uuid.v1(),
            content: data.content,
            claimNumber: data.claimNumber,
            email: data.email,
            attachment: data.attachment,
            incidentDate: data.incidentDate,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        callback(null, success(params.Item));
    } catch (e){
        console.log(e);
        callback(null, failure({status: false}));
    }
}