import requests
import json
import boto3
import os


def lambda_handler(event, context):
    bucket_name = os.environ['BUCKETNAME']

    file = requests.get('https://raw.githubusercontent.com/hackclub/toolbox/refs/heads/main/manifest.js')
    content = file.text
    content = content.strip("export default ")

    json_string = ""
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
        
        print(line)
        index += 1
        json_string += line
    
    json_string = json_string.rstrip(",; \n")
    json_string = json.loads(json_string)

    client = boto3.client('s3')

    client.put_object(
        Body=json.dumps(json_string),
        Bucket=bucket_name,
        Key='hackclub-toolbox.json' 
    )
