import requests
import json
import boto3
import os


def lambda_handler(event, context):
    bucket_name = os.environ['BUCKETNAME']

    file = requests.get('https://raw.githubusercontent.com/hackclub/toolbox/refs/heads/main/manifest.js')
    content = file.text
    content = content.strip("export default ")

    json_raw_data = ""
    lines = content.split("\n")
    index = 0

    for line in lines:
        line = line.lstrip(" ")

        if ":" in line:
            line = '"' + line.split(":",1)[0] + '"' + ": " + line.split(":",1)[1]

        if index == len(lines) - 1:
            line = line.rstrip(",; \n")

        elif "}" in lines[index + 1] or "]" in lines[index + 1]:
            line = line.rstrip(",; \n")

        index += 1
        json_raw_data += line
    
    json_raw_data = json_raw_data.rstrip(",; \n")
    json_raw_data = json.loads(json_raw_data)
    json_schema_data = {}

    for category in json_raw_data:
        name = category['category']
        category.pop('category', None)
        category.pop('color', None)
        category.pop('icon', None)

        for item in category['items']:
            if item['forUseBy'] == "leaders":
                category['items'].remove(item)
            
            else:
                item.pop('icon', None)
                item.pop('external', None)

                if item['url'].startswith("/"):
                    item['url'] = "https://toolbox.hackclub.com" + item['url']

                if item['forUseBy'] == "clubbers":
                    item['forUseBy'] = "hackclubbers"

                #actual_category = map_categories("Name :" + item['name'] + ", " + item['description'] + ", can be used by " + item['forUseBy'])

        json_schema_data[name] = category['items']
    
    client = boto3.client('s3')

    list_objects = [x['Key'] for x in client.list_objects_v2(Bucket=bucket_name)['Contents']]

    if 'resources.json' in list_objects:
        print("resources.json exists")
        current_resources = client.get_object(Bucket= bucket_name, Key='resources.json')
        current_resources = json.loads(current_resources['Body'].read().decode('utf-8'))
    else:
        current_resources = {}

    for search_category in json_schema_data:
        if search_category not in current_resources.keys():
            current_resources[search_category] = json_schema_data[search_category]
        
        else:
            for item in json_schema_data[search_category]:
                if item not in current_resources[search_category]:
                    current_resources[search_category].append(item)

    client.put_object(Bucket= bucket_name, Key='resources.json', Body=json.dumps(current_resources, indent=4))   

#Somehow map HC Toolbox categories to the categories in GH Student Developer Pack
"""Github categories:
Marketing
Security & analytics
Machine Learning & AI
Virtual Events
Productivity
Domains
Internet of Things
Learn
Design
Mobile
Infrastructure & APIs
Cloud
Developer tools
Personal Portfolio
"""
def map_categories(offer):
    categories = ["Marketing", "Security & analytics", "Machine Learning & AI", "Virtual Events", "Productivity", "Domains", "Internet of Things", "Learn", "Design", "Mobile", "Infrastructure & APIs", "Cloud", "Developer tools", "Personal Portfolio"]
    
    