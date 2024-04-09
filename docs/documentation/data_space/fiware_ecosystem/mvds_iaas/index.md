# Minimum Viable Data Space Infrastructure as a Service (MVDS-IaaS)

!!! warning
    This guide is still a work in progress. Errors may appear.

[Repository :simple-github:](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure){ .md-button .md-button--primary }

The Minimum Viable Data Space Infrastructure as a Service (MVDS-IaaS) is a set of components that are necessary to deploy a Data Space. The MVDS-IaaS is based on the [FIWARE](https://www.fiware.org/) ecosystem and is designed to be deployed on top of a Kubernetes cluster. The MVDS-IaaS is composed of the following components:

- [Data Space Operator](https://github.com/FIWARE-Ops/fiware-gitops/tree/master/aws/dsba/onboarding-portal)
- [Data Space Marketplace](https://github.com/FIWARE-Ops/fiware-gitops/tree/master/aws/dsba/marketplace)
- Data Space Connector:
    - [Provider](https://github.com/FIWARE-Ops/data-space-connector)
    - [Consumer](https://github.com/FIWARE-Ops/fiware-gitops/tree/master/aws/dsba/happypets)

## On premise/Local deployment

The MVDS-IaaS can be deployed on a local machine using [kind](https://kind.sigs.k8s.io/). The objective is provide an autonomous environment to test the components of the Data Space with the minimum cost and complexity possible.

### Environment setup

The environment is composed of a Kubernetes cluster created with kind, with one master node and two worker nodes. Also installed:

- [Ingress Nginx Controller](https://kind.sigs.k8s.io/docs/user/ingress/#ingress-nginx)

- [Load Balancer](https://kind.sigs.k8s.io/docs/user/loadbalancer/#installing-metallb-using-default-manifests)

![kind_cluster](img/kind_cluster.png)

### Data Space Operator

![operator_scheme](img/operator.png)

![operator_ingress](img/operator_ingress.png)

### Marketplace

### Connector

### Status

!!! abstract inline end "_Componet Status_"

    🛑 _not started._
    
    👷 _in development..._

    ✅ _running_

|     **Component**    |  **Status**  | **Services Deployed** |
| -----------------------------------------------: | :----------: | :-------------------: |
| [**Data Space Operator**](#data-space-operator)  |      👷      |          11/12         |
| [**Marketplace**](#data-space-marketplace)       |      👷      |          -/-         |
| [**Connector (Provider)**]() |      🛑      |          -/-         |
| [**Connector (Consumer)**]() |      🛑      |          -/-         |

!!! info "Detailed status"

    [_Reference_](deployment_status.md)