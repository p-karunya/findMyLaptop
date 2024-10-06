import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda_fuction = new cdk.aws_lambda.Function(this, 'Bestbuy', {runtime: cdk.aws_lambda.Runtime.PYTHON_3_12, handler: 'bestBuy.py', code: cdk.aws_lambda.Code.fromAsset('Application code/')});
  }
}
