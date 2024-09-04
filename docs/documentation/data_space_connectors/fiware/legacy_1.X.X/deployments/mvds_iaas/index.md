# Minimum Viable Data Space Infrastructure as a Service (MVDS-IaaS)

!!! warning
    This guide is still a work in progress. Errors may appear.

[Repository :simple-github:](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure){ .md-button .md-button--primary }

The Minimum Viable Data Space Infrastructure as a Service (MVDS-IaaS) is a set of components that are necessary to deploy a Data Space. The MVDS-IaaS is based on the [FIWARE](https://www.fiware.org/) ecosystem and is designed to be deployed on top of a Kubernetes cluster. The MVDS-IaaS is composed of the following components:

- Data Space Operator (*Trusted Issuers Registry*)
- Data Space Connector

## On premise/Local deployment

The MVDS-IaaS can be deployed on a local/cloud/on-premise machine using [Kind](https://kind.sigs.k8s.io/). The objective is provide an autonomous environment to test the components of the Data Space with the minimum cost and complexity possible.

### Environment setup

The environment is composed of a Kubernetes cluster created with Kind, with one master node and two worker nodes (for example).

![kind_cluster](img/kind_cluster.png)

!!! abstract inline end "Other components that need to be installed in the cluster:"

    - [Ingress Nginx Controller](https://kind.sigs.k8s.io/docs/user/ingress/#ingress-nginx)

    - [Load Balancer](https://kind.sigs.k8s.io/docs/user/loadbalancer/#installing-metallb-using-default-manifests)


| **Component** | **Version** |
| ------------: | :---------- |
| OS            | Ubuntu 20.04  |
| [Docker](https://docs.docker.com/engine/install/ubuntu/) | 26.0.1 |
| [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installing-from-release-binaries) | 0.20.0 |
| [Helm](https://helm.sh/docs/intro/install/#from-apt-debianubuntu) | 3.14.2 |
| [Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) |  v1.28.3 |
| [Terraform](https://developer.hashicorp.com/terraform/install?product_intent=terraform) |  v1.8.1 |


### Status

!!! abstract inline end "_Componet Status_"

    🛑 _not started._
    
    👷 _in development..._

    ✅ _running_

|         **Component**          |  **Status**  | **Services Deployed** |
| -----------------------------: | :----------: | :-------------------: |
| **Minimal Trust Anchor**       |      ✅      |           3/3         |
| **Data Space Connector**       |      👷      |          14/15        |
| **Data Space Operator (DSBA)** |      👷      |          11/12        |
| **Marketplace**                |      🛑      |          -/-          |

!!! info "Detailed status"

    [_Reference_](deployment_status.md)