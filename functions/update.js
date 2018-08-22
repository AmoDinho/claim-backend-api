import { success, failure } from "../libs/response-lib";
import * as dynamoDbLib from "../libs/dynamodb-lib";


export async function main(event, context, callback){
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            claimId: event.pathParameters.id
        },
        UpdateExpression: "SET content = :content,claimNumber = :claimNumber,email = :email, attachment = :attachment,incidentDate = :incidentDate",
        ExpressionAttributeValues:{
            ":attachment": data.attachment ? data.attachment : null,
            ":content": data.content ? data.content : null,
            ":claimNumber": data.claimNumber ? data.claimNumber : null, 
            ":email": data.email ? data.email : null,
            ":incidentDate": data.incidentDate ? data.incidentDate : null,
        },
        returnValues: "ALL_NEW"
    };

    try {
        const result = await dynamoDbLib.call("update", params);
        callback(null, success({status: true}));
    } catch(e){
        console.log(e);
        callback(null, failure({status: false}));
    }
}