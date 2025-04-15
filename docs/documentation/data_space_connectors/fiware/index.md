# FIWARE Connector

## Introduction
The [FIWARE Data Space Connector](https://github.com/FIWARE/data-space-connector) is an integrated suite of components every organization participating in a data space should deploy to “connect” to a data space. Following the DSBA recommendations, it allows to:

* Interface with Trust Services aligned with [EBSI specifications](https://api-pilot.ebsi.eu/docs/apis)
* Implement authentication based on [W3C DID](https://www.w3.org/TR/did-core/) with 
 [VC/VP standards](https://www.w3.org/TR/vc-data-model/) and 
 [SIOPv2](https://openid.net/specs/openid-connect-self-issued-v2-1_0.html#name-cross-device-self-issued-op) / 
 [OIDC4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#request_scope) protocols
* Implement authorization based on attribute-based access control (ABAC) following an 
 [XACML P*P architecture](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=xacml) using 
 [Open Digital Rights Language (ODRL)](https://www.w3.org/TR/odrl-model/) and the 
 [Open Policy Agent (OPA)](https://www.openpolicyagent.org/)
* Provide compatibility with [ETSI NGSI-LD](https://www.etsi.org/committee/cim) as data exchange API
* Supports the [TMForum APIs](https://www.tmforum.org/oda/open-apis/) for contract negotiation

**Note:** Although the FIWARE Data Space Connector provides compatibility with NGSI-LD as the data exchange 
API, it could also be used for any other RESTful API by replacing or extending the PDP component of the 
connector.

The functionalities mentioned above can be used by an organization to connect to the data space in its role 
as data (processing) service provider, consumer of data (processing) services, or both.

### Key points

- Final and ready-to-use software (versus the framework approach of Eclipse)
- (Partial support for) IDS Dataspace Protocol (DSP)
- Not as agnostic as Eclipse, although its modular approach makes it possible (in theory) to extend its capabilities.
- It is not very tested; expect bugs and error reporting work.
- Development is relatively slow.

## Getting started
The [Minimum Viable Data Space Infrastructure](https://github.com/CitComAI-Hub/Minimum_Viable_DataSpace_Infrastructure) repository provides a ready-to-use, minimal deployment of a FIWARE Data Space Connector. Its main purpose is to offer an easy way to deploy the FIWARE connector locally.

### Minimum Viable Data Space (Local)
Check out the [examples/kind_minimal_ds_local exmple](https://github.com/CitComAI-Hub/Minimum_Viable_DataSpace_Infrastructure/tree/main/examples/kind_minimal_ds_local). This example is composed of the following blocks:

- Fiware Data Space (FDS) Operator or Trust Anchor: Trust Anchor that manages the issuers and credentials.
- FDS Connector A (Provider): Entity that provides and consumes data from the data space.
- FDS Connector B (Consumer): Entity that only consumes data from the data space.

<figure markdown>
  ![FIWARE minimal data space](img/minimum_dataspace_arch.png){ loading=lazy }
</figure>

For further details and to get started, please visit the [repository on GitHub](https://github.com/CitComAI-Hub/Minimum_Viable_DataSpace_Infrastructure).


