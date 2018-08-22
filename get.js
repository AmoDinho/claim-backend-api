import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context, callback){
    const params = {
        TableName: process.env.tableName,
        //Key specs the partition key and sort ket for the retrieved item
        Key:{
        userId: event.requestContext.identity.cognitoIdentityId,
        claimId: event.pathParameters.id
        }
    };

    try{
        const result = await dynamoDbLib.call("get", params);
        if (result.Item){
            //return the retrieved Item
            callback(null, success(result.Item));
        } else {
            callback(null, failure({status: false, error:"Item not found."}));
        }
    } catch(e){
        console.log(e);
        callback(null, failure({status: false}));
    }
}