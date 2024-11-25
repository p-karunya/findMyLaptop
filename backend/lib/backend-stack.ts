import * as cdk from 'aws-cdk-lib';
import { Lambda, S3 } from 'aws-cdk-lib/aws-ses-actions';
import { Construct } from 'constructs';


export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const Basic_Search_lambda_layer = new cdk.aws_lambda.LayerVersion(this, 'BasicSearchLayer', {
      code: cdk.aws_lambda.Code.fromAsset('ApplicationCode/APICode/Layers/queryData/'),
      compatibleRuntimes: [cdk.aws_lambda.Runtime.PYTHON_3_12]
    });

    const StudentDeveloperPack_lambda_layer = new cdk.aws_lambda.LayerVersion(this, 'ToolboxLayer', {
      code: cdk.aws_lambda.Code.fromAsset('ApplicationCode/DataLoaders/Layers/StudentDevPack/'),
      compatibleRuntimes: [cdk.aws_lambda.Runtime.PYTHON_3_12]
    });

    const HackClubToolBox_lambda_layer = new cdk.aws_lambda.LayerVersion(this, 'HackClubToolBoxLayer', {
      code: cdk.aws_lambda.Code.fromAsset('ApplicationCode/DataLoaders/Layers/Toolbox/'),
      compatibleRuntimes: [cdk.aws_lambda.Runtime.PYTHON_3_12]
    });

    const S3Bucket = new cdk.aws_s3.Bucket(this, 'FreeStuffBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const HackClubToolBox_lambda_fuction = new cdk.aws_lambda.Function(this, 'HackClubToolBox', {
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
      handler: 'Toolbox.lambda_handler',
      code: cdk.aws_lambda.Code.fromAsset('ApplicationCode/DataLoaders/HackClubToolbox'),
      layers: [HackClubToolBox_lambda_layer],
      timeout: cdk.Duration.seconds(360)
    });

    const GithubStudentPack_lambda_fuction = new cdk.aws_lambda.Function(this, 'GithubStudentPack', {
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
      handler: 'Github.lambda_handler',
      code: cdk.aws_lambda.Code.fromAsset('ApplicationCode/DataLoaders/StudentDeveloperPack'),
      layers: [StudentDeveloperPack_lambda_layer],
      timeout: cdk.Duration.seconds(120)
    });

    const Basic_Search_lambda_function = new cdk.aws_lambda.Function(this, 'APIlambda', {
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
      handler: 'get.lambda_handler',
      code: cdk.aws_lambda.Code.fromAsset('ApplicationCode/APICode/queryData'),
      environment: {
        BUCKETNAME: S3Bucket.bucketName
      },
      layers: [Basic_Search_lambda_layer],
    });

    S3Bucket.grantReadWrite(HackClubToolBox_lambda_fuction);
    S3Bucket.grantReadWrite(GithubStudentPack_lambda_fuction);
    S3Bucket.grantReadWrite(Basic_Search_lambda_function);

    HackClubToolBox_lambda_fuction.addEnvironment('BUCKETNAME', S3Bucket.bucketName);
    GithubStudentPack_lambda_fuction.addEnvironment('BUCKETNAME', S3Bucket.bucketName);
    
    const api = new cdk.aws_apigateway.LambdaRestApi(this, 'API', {
      handler: Basic_Search_lambda_function,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: cdk.aws_apigateway.Cors.ALL_ORIGINS
      },
      deploy: true,
      deployOptions: {
        stageName: 'dev'
      }
    });

    const search = api.root.addResource('search');

    const searchResquestValidator = new cdk.aws_apigateway.RequestValidator(this, 'SearchRequestValidator', {
      restApi: api,
      requestValidatorName: 'SearchRequestValidator',
      validateRequestParameters: true
    });

    search.addMethod('GET', new cdk.aws_apigateway.LambdaIntegration(Basic_Search_lambda_function),{
      requestValidator: searchResquestValidator,
      requestParameters: {"method.request.querystring.query": true}
    });

  }
}
