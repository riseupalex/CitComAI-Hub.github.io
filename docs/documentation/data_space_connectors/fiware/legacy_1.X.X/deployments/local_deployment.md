# Local deployment

!!! warning
    This guide is still a work in progress. Errors may appear.

[Repository :simple-github:](https://github.com/CitComAI-Hub/Minimum_Viable_DataSpace_Infrastructure){ .md-button .md-button--primary-light }

FIWARE has designed its connector in a Helm package, so you need to have a Kubernetes cluster to be able to deploy it. In order to be replicable on the largest number of systems without needing to have a large Kubernetes infrastructure, it has been decided to virtualize a cluster with Kind.

To deploy the cluster, you must have installed: Docker, Kind, Helm, Kubectl and Terraform. You can find an example of the necessary cluster in this repository.

![kind_cluster](img/kind_cluster.png)

With the cluster configured, the next step is to deploy the connector following the instructions provided by [FIWARE](https://github.com/FIWARE-Ops/data-space-connector/tree/deploy/dsba).