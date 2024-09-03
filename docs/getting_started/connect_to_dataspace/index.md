# Join a Data Space

!!! warning

    Citcom.ai uses data spaces based on [Fiware technology](https://github.com/FIWARE/data-space-connector/tree/main).

Basically, a data space must be formed, at least, by the following components: 

- **Trust Anchor (TA)**: Responsible for managing trust in the data space. It is the manager of the identities of the different elements of the data space and of managing the trust in them. At least one TA shall exist in the data space, managed by the organization in charge of the data space. 

- **Data Space Connector (DSC)**: Responsible for managing the communication between the different elements of the data space. It oversees managing authentication, authorization and data access control. There must be at least two DSCs, one per organization, to be able to affirm that a data space exists.

![data space](img/basic_architectural_concepts_ids.png)

## What do I need? 

For access to a data space, you mainly need: 

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

See the deployment [instructions](../dataspace_deployment/index.md#fiware-data-space-connector) for more details.