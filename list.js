import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context, callback){
    const params = {
        TableName: process.env.tableName,
        /* 
        KeyconditionExpression defines the condition for the query
        which will return only the matching userId items
        ExpressionAttributeValues defines the value in the condition

        
        */
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };

    try{
        const result = await dynamoDbLib.call("query", params);
        //get the matching list of items in the response body
        callback(null, success(result.Items));
    } catch (e){
        console.log(e);
        callback(null, failure({status: false}));
    }
}