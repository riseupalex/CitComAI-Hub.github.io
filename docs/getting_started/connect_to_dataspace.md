# Join a Data Space

!!! warning

    Citcom.ai uses data spaces based on [Fiware technology](https://github.com/FIWARE/data-space-connector/tree/main).


To access to a data space, you mainly need: 

1. **A digital certificate**: To be able to identify yourself as an organization within the data space. 

2. **A data space connector**: To be able to communicate with the data space. 
Data Space Deployment. 

### Sing Up

!!! warning "Current sing up process"

    In general, it will be necessary to **contact via email the managers of the data space** so that they authorize our organization.

Depending on the configuration of the data space, the registration process may vary.  

Currently, most commonly, you will need to contact the data space TA administrator for information on the type of certificate you need and how to provide it so that they can authorize you as an authorized entity in the data space. 

In the future, this process will be automated, and you will be able to do it directly from the data space platform. Using the European digital identity, you will be able to register in the data space in a simple and secure way. 

### Data Space Connector

The Data Space Connector (DSC) is a software component that is responsible for managing the communication between the different elements of the data space. It oversees managing authentication, authorization, and data access control.

Fiware provides a reference implementation of the DSC, which is available in the [Fiware GitHub repository](https://github.com/FIWARE/data-space-connector/tree/main)

See the deployment [instructions](./../documentation/data_space_connectors/fiware/data_space_deployment.md) for more details.