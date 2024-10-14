# Legacy version 1.X.X

As explained [earlier](../index.md#legacy-version-1xx), the legacy version of the data space was composed of: the Operator, the Marketplace, and the Connector. Here, their architectures are detailed.

## Architectures

### Data Space Operator

The Dataspace Operator acts as the Trust Anchor of the Data Space. It provides the particpants information on whom to trust.

![operator_scheme](img/operator.png)

#### Minimal Operator (Trust Anchor)

For a minimal trust anchor, the Trusted Participants Registry (or *Trusted Issuers Registry*) is the unique service that is necessary. This can be managed through its [API](https://github.com/FIWARE/trusted-issuers-list/blob/main/api/trusted-issuers-registry.yaml).

![trust_anchor](img/trust_anchor.png)

### Marketplace

!!! warning
    
    This architecture has been derived from the different [Helm packages that form the marketplace](https://github.com/FIWARE-Ops/fiware-gitops/tree/master/aws/dsba/marketplace), so there may be some differences or connections between services that are not reflected.

The marketplace that Fiware proposes in this example is composed of the following services:

![marketplace_scheme](img/fiware_marketplace.png)

### Fiware Data Space Connector

Fiware Data Space Connector is a component that allows the data owner to share data with other participants in a secure and controlled way. 

> A more extensive documentation about the connector and the supported flows in a data space it supports can be found at the FIWARE [data-space-connector repository](https://github.com/FIWARE/data-space-connector).

To deploy the Data Space Connector Fiware provides this [repository](https://github.com/FIWARE-Ops/data-space-connector).

This component is composed of the following services:

![connector_scheme](img/fiware_connector.png)

## Deployments

- [AWS Deployment](./deployments/aws_deployment.md)
- [Local Deployment](./deployments/local_deployment.md)
- [Minimal Viable Data Space Infrastructure (MVDS-IaaS)](./deployments/mvds_iaas/index.md)
