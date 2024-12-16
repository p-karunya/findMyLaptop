# FreeStuff
Supposed to be a website to find free stuff teenagers/student can use to build projects and explore tech.

# Backend Architecture on AWS

```mermaid
graph TB;
    A[Github Student Dev Pack]; B[Hack Club Tool Box]
    C[S3 bucket]
    D[Lambda Function]
    E[API Gateway]
    A -->C
    B -->C
    C <-->D
    D --> E
```
**The Tech Stack used to build the backed was:**
- AWS CDK using Typescript
- Python3 to write the lambda code

