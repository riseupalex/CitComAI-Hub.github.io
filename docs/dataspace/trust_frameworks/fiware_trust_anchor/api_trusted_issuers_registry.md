---
title: Trusted Issuers Registry API
---

- [API source](https://api-pilot.ebsi.eu/docs/apis/trusted-issuers-registry/v4#/)
- Version: v4

| Request | Endpoint | Description |
| ------- | -------- | ----------- |
| [GET](#get) | /v4/issuers/ | Returns a list of trusted issuers |
| [GET](#get-1) | /v4/issuers/{did} | Returns a trusted issuer by DID |

## Endpoints

### /v4/issuers/

#### GET

| Response | Status | Description |
| -------- | ------ | ----------- |
| 200 | ok | Successfully returned a list of issuers. |
| 400 | error | Bad Request Error. |

- **operationId:** `getIssuersV4`
- **Summary:** Returns a list of trusted issuers.
- **Parameters:**
    ```
    $ref: '#/components/parameters/Size'
    $ref: '#/components/parameters/After'
    ```

### /v4/issuers/{did}

#### GET

| Response | Status | Description |
| -------- | ------ | ----------- |
| 200 | ok | Successfully returned the issuer. |
| 400 | error | Bad Request. |
| 404 | error | Not Found. |

- **operationId:** `getIssuerV4`
- **Summary:** Returns a trusted issuer identified by its decentralized identifier (DID).
- **Parameters:**
    ```
    $ref: '#/components/parameters/Did'
    ```
