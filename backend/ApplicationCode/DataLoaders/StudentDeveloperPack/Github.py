import requests
from bs4 import BeautifulSoup
import json
import boto3
import os

def lambda_handler(event, context):
    bucketname = os.environ['BUCKETNAME']
    client = boto3.client('s3')

    data = requests.get('https://education.github.com/pack?sort=az')
    data = BeautifulSoup(data.text, 'html.parser')

    offers_json = {}
    #Get all the offers
    for x in data.find_all('div', class_="pack-offer-card border rounded-2 p-3"):
        perk = {}

        name = x.find('h3').text
        offer_details = x.find('div', class_='color-bg-subtle rounded-2')
        description = offer_details.find('p').text
    #_____________________________________________

        perk['name'] = name
        perk['description'] = description
        perk['url'] = 'https://education.github.com/discount_requests/application?type=student'
        perk['forUseBy'] = "GHstudents"

        tagholder = offer_details.find('ul', class_= 'list-style-none d-flex flex-wrap')
        for tag in tagholder.find_all('li'):
            tag = tag.text
            tag = tag.replace("\n", "")
            if tag in offers_json:
                offers_json[tag].append(perk)
            
            else:
                offers_json[tag] = [perk]
    
    current_resources = {}

    

    list_objects = [x['Key'] for x in client.list_objects_v2(Bucket=bucketname)['Contents']]
    if 'resources.json'  in list_objects :
        print("resources.json exists")
        current_resources = client.get_object(Bucket=bucketname, Key='resources.json')
        current_resources = json.loads(current_resources['Body'].read().decode('utf-8'))
    else:
        current_resources = {}


    
    for search_category in offers_json:
        if search_category not in current_resources.keys():
            current_resources[search_category] = []
        
        for item in offers_json[search_category]:
            if item not in current_resources[search_category]:
                current_resources[search_category].append(item)
    

    client.put_object(Bucket=bucketname, Key='resources.json', Body=json.dumps(current_resources, indent=4))   
    
