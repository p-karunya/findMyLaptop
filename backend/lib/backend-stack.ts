import * as cdk from 'aws-cdk-lib';
import { Lambda, S3 } from 'aws-cdk-lib/aws-ses-actions';
import { Construct } from 'constructs';


export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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
      timeout: cdk.Duration.seconds(30)
    });

    const GithubStudentPack_lambda_fuction = new cdk.aws_lambda.Function(this, 'GithubStudentPack', {
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
      handler: 'Github.lambda_handler',
      code: cdk.aws_lambda.Code.fromAsset('ApplicationCode/DataLoaders/StudentDeveloperPack'),
      timeout: cdk.Duration.seconds(30)
    });

    S3Bucket.grantReadWrite(HackClubToolBox_lambda_fuction);
    S3Bucket.grantReadWrite(GithubStudentPack_lambda_fuction);   

    HackClubToolBox_lambda_fuction.addEnvironment('BUCKETNAME', S3Bucket.bucketName);
    GithubStudentPack_lambda_fuction.addEnvironment('BUCKETNAME', S3Bucket.bucketName);

  }
}
