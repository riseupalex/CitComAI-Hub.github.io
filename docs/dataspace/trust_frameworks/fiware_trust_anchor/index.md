---
title: Fiware Trust Anchor
---

> The default setup of the connector requires an [EBSI-Trusted Issuers Registry](https://hub.ebsi.eu/apis/pilot/trusted-issuers-registry/v4) to provide the list of participants. 
> The local Data Spaces comes with the FIWARE Trusted Issuers List as a rather simple implementation of that API, providing CRUD functionality for Issuers and storage in an MySQL Database. After deployment, the API is available at http://tir.127.0.0.1.nip.io:8080. Both participants are automatically registered as "Trusted Issuers" in the registry with their did's.

The Fiware Trust Anchor is based in: [FIWARE Trusted Issuers List](https://github.com/FIWARE/trusted-issuers-list)

![trust_anchor](./img/trust_anchor_arch.svg)

The Trusted-Issuers-List Service provides an EBSI Trusted Issuers Registry implementation to act as the Trusted-List-Service in the DSBA Trust and IAM Framework. In addition, a Trusted Issuers List API to manage the issuers is provided.

## API details

- [Trusted Issuers List](./api_trusted_issuers_list.md)
- [Trusted Issuers Registry](./api_trusted_issuers_registry.md)