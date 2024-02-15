# AWS deployment

!!! warning
    This guide is still a work in progress. Errors may appear.

## AWS Account Preparation
Here are the steps for preparing an AWS account to deploy a Red Hat OpenShift Service (ROSA) cluster.

###  Required AWS Service Fees
The following table describes the AWS quotas and service levels required to create and run a Red Hat OpenShift Service (ROSA) cluster.

| **Service code** | Quota name                                                       | Quota code | AWS default | Minimum required | Description                                                                                                                                                                                                                                                |
| ---------------- | ---------------------------------------------------------------- | ---------- | ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ec2              | Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances | L-1216C47A | 5           | 100              | Maximum number of vCPUs assigned to the Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances.<br><br>The default value of 5 vCPUs is not sufficient to create ROSA clusters. ROSA has a minimum requirement of 100 vCPUs for cluster creation. |
| ebs              | Storage for General Purpose SSD (gp2) volume storage in TiB      | L-D18FCD1D | 50          | 300              | The maximum aggregated amount of storage, in TiB, that can be provisioned across General Purpose SSD (gp2) volumes in this Region.                                                                                                                         |
| ebs              | Storage for General Purpose SSD (gp3) volume storage in TiB      | L-7A658B76 | 50          | 300              | The maximum aggregated amount of storage, in TiB, that can be provisioned across General Purpose SSD (gp3) volumes in this Region.<br><br>300 TiB of storage is the required minimum for optimal performance.                                              |
| ebs              | Storage for Provisioned IOPS SSD (io1) volumes in TiB            | L-FD252861 | 50          | 300              | The maximum aggregated amount of storage, in TiB, that can be provisioned across Provisioned IOPS SSD (io1) volumes in this Region.<br><br>300 TiB of storage is the required minimum for optimal performance.                                             |

### Creating an IAM user
Creating an IAM (Identity and Access Management) user in AWS is necessary to securely manage access and permissions associated with AWS resources that will be used by the OpenShift cluster.

We will create this user from the AWS portal IAM service (IAM > Users > Create User). We will then specify a user name and select the option "Provide user access to the AWS Management Console" and "I want to create an IAM user" as shown in the following image:

After clicking on "Next", we will have to configure the user's permissions. We must select the option "Attach policies directly" and select the **AdministratorAccess** permissions policy.

After creating the user, we will be shown the login details. We will be able to log in as an IAM user via the URL provided.

### AWS CloudShell: Installing the CLI
Once logged in with the new IAM user, the CloudShell console can be accessed from the top panel of the AWS portal.https://062041447189.signin.aws.amazon.com/console.

Download ROSA CLI, unzip it and add it to the PATH:
```bash
wget https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/rosa/latest/rosa-linux.tar.gz
tar zxvf rosa-linux.tar.gz
export PATH=~:$PATH
```

Download Openshift CLI through ROSA:
```bash
rosa download oc
tar zxvf openshift-client-linux.tar.gz
```

## Creating the cluster
We will explain the steps involved in creating a Red Hat OpenShift Service cluster on AWS (ROSA).

### Login and quota verification
To log in to ROSA CLI, we need to obtain our Red Hat account token from the following link: https://console.redhat.com/openshift/create/rosa/getstarted

```bash
rosa login --token=<RED_HAT_TOKEN>
```

Then we can check our user:
```bash
rosa whoami
```

<figure markdown>
  ![Whoami](img/whoami.png){ loading=lazy }
</figure>

Before proceeding with the creation of the Openshift cluster, let's check that our AWS account meets the minimum required quotas:

```bash
rosa verify quota
```

<figure markdown>
  ![Verify quota](img/verify_quota.png){ loading=lazy }
</figure>

If everything is correct, we can proceed with the creation of roles for our Red Hat account account (first time only):

```bash
rosa create account-roles --mode auto --yes
```

<figure markdown>
  ![Create account](img/create_account.png){ loading=lazy }
</figure>

### Creating the cluster
Next, we can proceed to create the cluster. The creation time is approximately 30/40 minutes.

```bash
rosa create cluster --cluster-name rosa-dataspaces --sts --mode auto --yes
--version 4.12.41
```

After the installation is complete, obtain the cluster information:

```bash
rosa list clusters
```

```bash
rosa describe cluster --cluster <name>
```

<figure markdown>
  ![Create account](img/describe_cluster.png){ loading=lazy }
</figure>

Create the cluster admin user:

```bash
rosa create admin --cluster=<name>
```

The user will not be available immediately, we will have to wait several minutes (about 5 minutes) before proceeding with the login to the Openshift cluster. 

Source: [https://youtu.be/amLN6-JxygU?feature=shared](https://youtu.be/amLN6-JxygU?feature=shared)

## Creating Hosted Zone on AWS Route53
Hosted zones on Amazon Route 53 are log containers that contain information about how you want to route traffic for a given domain and its corresponding subdomains.

We are going to create a Hosted Zone in Route53 to route the traffic of the subdomains where we are going to host the applications of the Openshift cluster, which are the different components of the Data Space Connector.

To do this, we need to have in our possession a given domain. In our case, the domain used is ds.smartcity-marketplace.com.

Through the AWS services panel, we will be able to go to AWS Route53. There we can create a hosted zone by clicking on Hosted Zones > Create a hosted zone. We will have to set our domain as the zone name and select "Public hosted zone". After creating it, we will be able to access the created zone and consult the assigned nameservers. We will have to set these name servers as the Custom DNS of our domain at the provider where we purchased it.

## Domains, Routes and Certificates
The deployment of the FIWARE Data Space Connector assumes that you have an Openshift cluster that is able to manage domains, SSL certificates and configure routes. To achieve this, we need to install the following operators in our cluster:

- **External-DNS**, which facilitates the automatic allocation and update of DNS records for services exposed in the cluster. When a service is created in Openshift, External-DNS detects these services and automatically creates or updates external DNS records (in our case, the hosted zone created in Route53) to point to the IP addresses of those services.

- **Cert-Manager**, which automates the issuance, renewal and management of SSL certificates in the cluster. Cert-Manager can integrate with services such as Let's Encrypt to automatically provide SSL certificates to applications that need them.

- **Cert-Utils**, which is an OpenShift-specific operator and is used to automatically inject certificates into Route objects. In OpenShift, routes are objects that define how an application is exposed to external traffic. Cert-Utils is used to automate the injection of SSL certificates into these route objects.

The process to follow to install these components is explained in the FIWARE repository: [ROUTES.md](https://github.com/FIWARE-Ops/fiware-gitops/blob/master/doc/ROUTES.md).

<figure markdown>
  ![DSC components](img/dsc_components.png){ loading=lazy }
</figure>

### Using External-DNS
After installing, we can check that the operator has been deployed correctly by executing:

```bash
kubectl get all -n external-dns-operator
```
<figure markdown>
  ![External DNS](img/external_dns.png){ loading=lazy }
</figure>

If everything is OK, we can move on to the creation of the External DNS resource that will be responsible for creating entries in our Route53 Hosted Zone.

First we create a Kubernetes secret with the access key and the AWS secret. If we do not have this access key + secret, we can create them from the AWS IAM Portal. It is important to verify that the user associated with the access key has permissions for CRUD in Route53 (users with AdministratorAccess have these permissions).

```bash
apiVersion: v1
kind: Secret
metadata:
name: aws-access-key
namespace: external-dns-operator
type: Opaque
data:
aws_access_key_id: <BASE 64 ACCES KEY ID>
aws_secret_access_key: <BASE 64 ACCESS KEY SECRET>
```

**Note:** to execute any resource in Openshift, we create a YAML file (.yaml extension) with its definition. Then run `kubectl apply -f <YAML FILE>`.

The values of the secrets must be in base 64. We can use the following command to get our access ID and key in base 64:

```bash
echo -n "<BASE 64 ACCESS KEY ID>" | base64
echo -n "<BASE 64 ACCESS KEY SECRET>" | base64
```

Next, we are going to create a resource of type ExternalDNS and associate it to our Route 53 DNS Zone. The idea is that, every time a service (with assigned host) is created in the cluster, the External DNS will automatically create the entry in our DNS Zone.

```bash
apiVersion: externaldns.olm.openshift.io/v1alpha1
kind: ExternalDNS
metadata:
name: aws-routes-libelium-dev
spec:
provider:
type: AWS
aws:
credentials:
name: aws-access-key
zones:
- "Z08275492EDOR2ZSK994S"
source:
type: OpenShiftRoute
openshiftRouteOptions:
routerName: default
```

The value Z08275492EDOR2ZSK994S is the ID of the Route53 hosted zone, which in our case is the zone of the domain ds.smartcity-marketplace.com.

### Using Cert Manager
After the installation, we can check that the operator has been deployed correctly by running by executing:

```bash
kubectl get all -n openshift-operators
```

<figure markdown>
  ![Cert manager](img/cert_manager.png){ loading=lazy }
</figure>

Now we are going to create a Kubernetes secret with the access key and the AWS secret, in the same way as we did in the previous section. This is necessary because the secrets are created at namespace level, if we want to have a secret in several namespaces, we will have to create it in each of them independently.

```bash
apiVersion: v1
kind: Secret
metadata:
name: aws-access-key
namespace: openshift-operators
type: Opaque
data:
aws_secret_access_key: <BASE 64 ACCESS KEY SECRET>
```

We can now move on to create a new Kubernete resource called Cluster Issuer. This resource represents Certificate Authorities (CA) that can generate signed certificates in response to requests. response to requests. In our case, we are going to create two different Cluster Issuers, one that will use Let's Encrypt as CA and another that will generate self-signed certificates. The first one is the one that we are interested in using when we do the final deployment of the connector, since it provides us with reliable certificates. provides us with trusted certificates. The second one will be used to test the deployment of the connector. connector.

This is because during the deployment of the connector it is very likely that we will encounter errors that we will have to debug, so we will perform the deployment several times until all the components work correctly. Let's Encrypt has a policy of not generating more than 5 certificates for the same domain in a given period of time. It is crucial to take this limitation into account during the deployment process, since exceeding this limit could lead to restrictions in the issuance of certificates for our domain.

Therefore, it is advisable to use self-signed certificates until all the connector components are working properly.

```bash
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
name: letsencrypt-prod
spec:
acme:
email: mj.bernal@libelium.com
preferredChain: ""
privateKeySecretRef:
name: lets-encrypt-prod-issuer-account-key
server: https://acme-v02.api.letsencrypt.org/directory
solvers:
- selector:
dnsZones:
- "ds.smartcity-marketplace.com"
dns01:
route53:
region: eu-west-1
hostedZoneID: Z08275492EDOR2ZSK994S
accessKeyID: AKIAQ44PVLMK76NPBH63
secretAccessKeySecretRef:
name: aws-access-key
key: aws_secret_access_key
```

ClusterIssuer to generate TLS certificates through Let's Encrypt:

```bash
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
name: self-signed
spec:
selfSigned: {}
```

<figure markdown>
  ![Cluster issuers](img/cluster_issuers.png){ loading=lazy }
</figure>

Once we have created the Cluster Issuers, let's check if they are able to request and store the certificates. store the certificates. To do this we create Certificate type resources.

```bash
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
name: letsencrypt-cert
spec:
secretName: letsencrypt-tls-secret
issuerRef:
kind: ClusterIssuer
name: letsencrypt-prod
commonName: "*.ds.smartcity-marketplace.com"
dnsNames:
- "*.ds.smartcity-marketplace.com"
```

```bash
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
name: selfsigned-cert
spec:
secretName: selfsigned-tls-secret
issuerRef:
kind: ClusterIssuer
name: self-signed
commonName: "*.ds.smartcity-marketplace.com"
dnsNames:
- "*.ds.smartcity-marketplace.com"
```

We can check the status of the certificates by executing the following command:

```bash
kubectl get certificates
```

<figure markdown>
  ![Get certificates](img/get_certificates.png){ loading=lazy }
</figure>

If the value TRUE appears in the READY column, it means that the certificates have been successfully obtained and stored in the indicated secrets. We can also check the secrets by executing the following command:

```bash
kubectl get secrets --field-selector type=kubernetes.io/tls
```

<figure markdown>
  ![Get secrets](img/get_secrets.png){ loading=lazy }
</figure>

These secrets contain the following values:
  - tls.key: private key of the certificate
  - tls.crt: certificate
  - ca.crt: the CA that validates the certificate.
  - 
In the case of self-signed certificates, it only contains the first two.

### Routes and Certificates in FIWARE DS Connector
It is necessary to have all these Openshift components working properly in our cluster, because during the installation of the FIWARE Data Space Connector with Helm the services are exposed using these resources. The services that are exposed through a subdomain are: **keyrock, activation-service, keycloak, kong, trusted-issuers-list-til, trusted-issuers-list-tir, vcverifier, vcwaltid and vcwaltid-cert**.

To expose each of these services, a number of objects are automatically created:

- **Route objects:** This resource is used to expose services across the network and allow external access to connector applications.
    <figure markdown>
    ![Route objects](img/route_objects.png){ loading=lazy }
    </figure>
- **Certificate objects:** this resource is used for the management (obtaining, maintenance...) of TLS/SSL certificates for the connector's applications.
     <figure markdown>
    ![Certificate objects](img/certificate_objects.png){ loading=lazy }
    </figure>
- **Secret objects (TLS secret):** these secrets contain the tls.crt and tls.key values associated with each path to services in the cluster. If these secrets are not being created correctly, the connector deployment fails. connector deployment fails.
     <figure markdown>
    ![Secret objects](img/secret_objects.png){ loading=lazy }
    </figure>

## Deployment with Helm
Helm is a package manager for Kubernetes, which simplifies and automates the deployment and management of applications. A "Helm chart" is a pre-configured Kubernetes resource bundle, designed to be easily shared, versioned and installed using Helm.

The FIWARE Data Space Connector is distributed as an Umbrella-Chart that contains all of the sub-charts (one for each component of the connector) and the necessary dependencies for deployment. deployment.

### Download connector Helm Chart
We can download the connector via the chart repository:

```bash
# add the repo
helm repo add dsc https://fiware-ops.github.io/data-space-connector/
# Check repo
helm repo list
```

Tras esto, tendremos el chart disponible para su uso.
    <figure markdown>
    ![Helm repo list](img/helm_rempo_list.png){ loading=lazy }
    </figure>

We can also download the source code (releases) directly:
```bash
# set version you are interested in
version=0.9.0
wget
https://github.com/FIWARE-Ops/data-space-connector/releases/download/data-sp
ace-connector-$version/data-space-connector-$version.tgz && tar -xzvf
data-space-connector-$version.tgz
```

### Configuration using values.yaml
As we have seen, a Helm Chart is a package that contains all the necessary resources to deploy an application in Kubernetes, in our case, to launch each of the components of the connector.

In the source code we can see that each of the components is presented as a sub-chart, which in turn has its own templates, dependencies, sub-charts and configuration files. configuration files.

<figure markdown>
![Project folder](img/project_folder.png){ loading=lazy }
</figure>

To finish defining everything necessary for the deployment of the connector, we will have to create a global configuration file (values.yaml) in which, for each of the components, we define the necessary parameters so that the connector can be deployed in our environment. The values that we define in this global configuration file, somehow complete or overwrite the configuration parameters that come by default in the helm chart. Let's start from the configuration file provided by FIWARE: [values.yaml](https://github.com/FIWARE-Ops/fiware-gitops/blob/master/aws/dsba/packet-delivery/data-space-connector/values.yaml).

For example, the configuration for the VCWaltid component would be as follows:

```bash
# Nombre del componente a configurar
vcwaltid:
# Permitir el despliegue del compoente vcwaltid
deploymentEnabled: true
# Definir el Decentralized ID de la organización
did: did:web:pdc-demo.ds.smartcity-marketplace.com:did
# Definir la ruta al host de la aplicación vcwaltid
route:
enabled: true
# Subdominio que alojará la aplcación
host: pdc-demo.ds.smartcity-marketplace.com
# Configuración TLS
tls:
insecureEdgeTerminationPolicy: Redirect
termination: edge
# Indicamos quien maneja los certificados
# En nuestro caso el Cluster Issuer que hemos creado en pasos anteriores
certificate:
issuer:
kind: ClusterIssuer
name: letsencrypt-prod
# Walt-id configuración interna
vcwaltid:
# Persistence
persistence:
enabled: true
pvc:
size: 1Gi
# Lista de plantillas a crear
templates:
GaiaXParticipantCredential.json: |
{
"@context": [
"https://www.w3.org/2018/credentials/v1",
"https://registry.lab.dsba.eu/development/api/trusted-shape-registry/v1/shap
es/jsonld/trustframework#"
],
"type": [
"VerifiableCredential"
],
"id": "did:web:raw.githubusercontent.com:egavard:payload-sign:master",
"issuer":
"did:web:raw.githubusercontent.com:egavard:payload-sign:master",
"issuanceDate": "2023-03-21T12:00:00.148Z",
"credentialSubject": {
"id": "did:web:raw.githubusercontent.com:egavard:payload-sign:master",
"type": "gx:LegalParticipant",
"gx:legalName": "dsba compliant participant",
"gx:legalRegistrationNumber": {
"gx:vatID": "MYVATID"
},
"gx:headquarterAddress": {
"gx:countrySubdivisionCode": "BE-BRU"
},
"gx:legalAddress": {
"gx:countrySubdivisionCode": "BE-BRU"
},
"gx-terms-and-conditions:gaiaxTermsAndConditions":
"70c1d713215f95191a11d38fe2341faed27d19e083917bc8732ca4fea4976700"
}
}
NaturalPersonCredential.json: |
{
"@context": ["https://www.w3.org/2018/credentials/v1"],
"credentialSchema": {
"id":
"https://raw.githubusercontent.com/FIWARE-Ops/tech-x-challenge/main/schema.j
son",
"type": "FullJsonSchemaValidator2021"
},
"credentialSubject": {
"type": "gx:NaturalParticipant",
"familyName": "Happy",
"firstName": "User",
"roles": [{
"names": ["LEGAL_REPRESENTATIVE"],
"target": "did:web:onboarding"
}]
},
"id": "urn:uuid:3add94f4-28ec-42a1-8704-4e4aa51006b4",
"issued": "2021-08-31T00:00:00Z",
"issuer": "did:ebsi:2A9BZ9SUe6BatacSpvs1V5CdjHvLpQ7bEsi2Jb6LdHKnQxaN",
"validFrom": "2021-08-31T00:00:00Z",
"issuanceDate": "2021-08-31T00:00:00Z",
"type": ["VerifiableCredential", "LegalPersonCredential"]
}
MarketplaceUserCredential.json: |
{
"@context": ["https://www.w3.org/2018/credentials/v1"],
"credentialSchema": {
"id":
"https://raw.githubusercontent.com/FIWARE-Ops/tech-x-challenge/main/schema.j
son",
"type": "FullJsonSchemaValidator2021"
},
"credentialSubject": {
"type": "gx:NaturalParticipant",
"email": "normal-user@fiware.org",
"familyName": "IPS",
"firstName": "employee",
"lastName": "IPS",
"roles": [{
"names": ["LEGAL_REPRESENTATIVE"],
"target": "did:web:onboarding"
}]
},
"id": "urn:uuid:3add94f4-28ec-42a1-8704-4e4aa51006b4",
"issued": "2021-08-31T00:00:00Z",
"issuer": "did:ebsi:2A9BZ9SUe6BatacSpvs1V5CdjHvLpQ7bEsi2Jb6LdHKnQxaN",
"validFrom": "2021-08-31T00:00:00Z",
"issuanceDate": "2021-08-31T00:00:00Z",
"type": ["MarketplaceUserCredential"]
}
EmployeeCredential.json: |
{
"@context": ["https://www.w3.org/2018/credentials/v1"],
"credentialSchema": {
"id":
"https://raw.githubusercontent.com/FIWARE-Ops/tech-x-challenge/main/schema.j
son",
"type": "FullJsonSchemaValidator2021"
},
"credentialSubject": {
"type": "gx:NaturalParticipant",
"email": "normal-user@fiware.org",
"familyName": "IPS",
"firstName": "employee",
"lastName": "IPS",
"roles": [{
"names": ["LEGAL_REPRESENTATIVE"],
"target": "did:web:onboarding"
}]
},
"id": "urn:uuid:3add94f4-28ec-42a1-8704-4e4aa51006b4",
"issued": "2021-08-31T00:00:00Z",
"issuer": "did:ebsi:2A9BZ9SUe6BatacSpvs1V5CdjHvLpQ7bEsi2Jb6LdHKnQxaN",
"validFrom": "2021-08-31T00:00:00Z",
"issuanceDate": "2021-08-31T00:00:00Z",
"type": ["EmployeeCredential"]
}
```

### Required secrets

### DS Connector installation

### Access routes

## Kubectl Cheat Sheet
TO-DO

## Troubleshooting
TO-DO

## Sources
- [FIWARE Data Space Connector, FIWARE](https://github.com/FIWARE/data-space-connector)
- [FIWARE Data Space Connector, FIWARE Ops](https://github.com/FIWARE-Ops/data-space-connector)
- [Demo-Setup DSBA-compliant Dataspace, FIWARE Ops](https://github.com/FIWARE-Ops/fiware-gitops/tree/master/aws/dsba)
- [Routes & Certs, FIWARE Ops](https://github.com/FIWARE-Ops/fiware-gitops/blob/master/doc/ROUTES.md)
- [ROSA Build - 30 mins to build a Red Hat OpenShift Service on AWS Cloud by Yongkang](https://youtu.be/amLN6-JxygU?feature=shared)
- [Required AWS service quotas, Red Halt Openshift](https://docs.openshift.com/rosa/rosa_install_access_delete_clusters/rosa_getting_started_iam/rosa-required-aws-service-quotas.html)