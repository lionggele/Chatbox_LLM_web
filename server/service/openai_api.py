import json
import boto3
import base64
from botocore.exceptions import ClientError

def get_open_api_key():
    secret_name = "onboarding/openai_key"
    region_name = "us-west-2"
    service_name = 'secretsmanager'

    session = boto3.Session()
    client = session.client(service_name=service_name, region_name=region_name)

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        if 'SecretString' in get_secret_value_response:
            # Parse the SecretString (JSON string) to get the API key
            secret_json = json.loads(get_secret_value_response['SecretString'])
            return secret_json.get('OPENAI_API_KEY')
        else:
            return base64.b64decode(get_secret_value_response['SecretBinary'])
    except ClientError as e:
        handle_aws_secret_error(e)
        return None

def handle_aws_secret_error(e):
    if e.response['Error']['Code'] == 'ResourceNotFoundException':
        print(f"The requested secret was not found")
    elif e.response['Error']['Code'] == 'InvalidRequestException':
        print(f"The request was invalid: {e}")
    elif e.response['Error']['Code'] == 'InvalidParameterException':
        print(f"Invalid parameters: {e}")
    elif e.response['Error']['Code'] == 'DecryptionFailure':
        print(f"Could not decrypt the secret: {e}")
    elif e.response['Error']['Code'] == 'InternalServiceError':
        print(f"An internal error occurred: {e}")
