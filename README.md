# FreeStuff
Supposed to be a website to find free stuff teenagers/student can use to build projects and explore tech.

# Backend Architecture on AWS

```mermaid
graph TB;
    A[Github Student Dev Pack]; B[Hack Club Tool Box]
    C[S3 bucket]
    D[Lambda Function]
    E[API Gateway]
    A -->|Dataloader Lambda|C
    B -->|Dataloader Lambda|C
    C <--> D
    D --> E
```
**The Tech Stack used to build the backed was:**
- AWS CDK using Typescript
- Python3 to write the lambda code
- AWS S3 for storage

**The Tech Stack used to build the backed was:**
- React with Next.js
- Tailwind CSS
- TypeScript
- shadcn for components

What I learned?
I learned the basics of next.js and got a grasp on reacts structure.






