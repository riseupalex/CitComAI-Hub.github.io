# Data Space Deployment

As we have seen in the [Data Space - Join one](./join.md) section, it is mandatory to deploy a connector in each organization that wants to share data in a Data Space. This connector is responsible for managing the data sharing process with the rest of the Data Space members.

These are the instructions to deploy a Data Space from scratch with Fiware technologies.

## Minimal Viable Data Space

The minimal viable data space is composed of a Trust Anchor and a Data Space Connector ([Reference](../../documentation/data_space_connectors/fiware/index.md#minimum-data-space)).

### FIWARE Data Space Connector

FIWARE developed a Data Space Connector that can be deployed in a [local](https://github.com/FIWARE/data-space-connector/blob/main/doc/deployment-integration/local-deployment/LOCAL.MD) environment. This connector is a minimal version of the Data Space Connector that can be used to test the Data Space functionalities.

### From scratch

This section describes how to deploy a Data Space from scratch in different scenarios:

- Cloud provider.
- On-premises infrastructure.

!!! warning

    This guide is a work in progress. It will be updated with more detailed in the next months. [Terraform deployment](https://github.com/CitComAI-Hub/Minimum_Viable_DataSpace_Infrastructure/tree/main/examples/kind_minimal_ds_local).

## Data Federation

The Data Federation is a more complex scenario where multiple Data Spaces or data platform are federated to share data. Depending on the technology used, the federation process can be different.

[Reference](../../documentation/data_federation/index.md)