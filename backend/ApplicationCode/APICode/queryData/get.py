import boto3
import json
import os
from thefuzz import fuzz




def query_cleanup(query):
    
    if 'hosting' in query.lower():
        query = query.replace('hosting', 'cloud')

    if 'host' in query.lower():
        query = query.replace('host', 'cloud')
    
    common_words = ['to', ' I ', "how", "when", "what", "free"]

    for word in common_words:
        if word in query.lower():
            query = query.replace(word, '')
    
    return query






def lambda_handler(event, context):
    response = {}

    client = boto3.client('s3')
    bucketname = os.environ['BUCKETNAME']

    data = client.get_object(Bucket=bucketname, Key='resources.json')
    data = json.loads(data['Body'].read().decode('utf-8'))
    print(data)

    query = event.get('queryStringParameters', {}).get('query', '')
    query = query_cleanup(query)
    print(query)

    for category in data:
        if fuzz.partial_ratio(query.lower(), category.lower()) > 80:
            response[category] = data[category]
        
        else:
            for item in data[category]:
                if fuzz.partial_ratio(query.lower(), item['description'].lower()) > 80:
                    response[category] = [item]
    
    print(response)
    
    return {    
        'statusCode': 200,
        'body': json.dumps(response)
    }
