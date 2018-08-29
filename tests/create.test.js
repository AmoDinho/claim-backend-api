import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import AWS from 'aws-sdk-mock';

//import {promisify} from "util";

const handler = require('../functions/create');

//Add the params here

describe(`Create Claim: Dynamodb mock for successfull claim creation`, ()=>{
  beforeAll(() => {
    AWS.mock('DynamoDB', 'putItem', function(params, callback){
        callback(null, "Created a Claim");
    });
  });
});

afterAll(() =>{
  AWS.restore('DynamoDB');
});

test(`Replies back with a JSON for successfull created claim`, async () =>{
    const event = {};
    const context = {};


    const result = await handler(event, context);
    result.then(data => expect(data).toMatchSnapshot());
    
});

test(`Replies back with a JSON for an unsuccessfull created claim`, () =>{

    const event = {};
    const context = {};
    
    expect(handler(event, context)).rejects.toThrow(
        `Unable to create claim`
    );
});