---
title: Trusted Issuers List API
---

- [API source](https://github.com/FIWARE/trusted-issuers-list/blob/0.0.2/api/trusted-issuers-list.yaml)
- Version: 0.0.2

| Request | Endpoint | Description |
| ------- | -------- | ----------- |
| [POST](#post) | /issuer | Create a trusted issuer |
| [DELETE](#delete) | /issuer/{did} | Delete a trusted issuer |
| [PUT](#put) | /issuer/{did} | Update a trusted issuer |

## Endpoints

### /issuer

#### POST

| Response | Status | Description |
| -------- | ------ | ----------- |
| 201 | ok | Issuer created successfully. |
| 400 | error | Invalid issuer provided. |
| 409 | error | Issuer with the specified did already exists. |

- **operationId:** `createTrustedIssuer`
- **Sumary:** Create a trusted issuer and its credentials.
- **Request Body:** 
    - required: true
    - content:
        ```
        application/json:
          schema:
            $ref: '#/components/schemas/TrustedIssuer'
        ```

### /issuer/{did}

#### DELETE

| Response | Status | Description |
| -------- | ------ | ----------- |
| 204 | ok | Issuer deleted successfully. |
| 404 | error | Issuer not found. |

- **operationId:** `deleteIssuerById`
- **Sumary:** Delete a specific issuer.
- **Parameters:**
    ```
    $ref: '#/components/parameters/Id'
    ```

#### PUT

| Response | Status | Description |
| -------- | ------ | ----------- |
| 200 | ok | Issuer updated successfully. |
| 404 | error | Issuer not found. |
| 400 | error | Invalid issuer provided. |

- **operationId:** `updateIssuer`
- **Sumary:** Update a specific issuer.
- **Parameters:**
    ```
    $ref: '#/components/parameters/Id'
    ```
- **Request Body:**
    - required: true
    - content:
        ```
        application/json:
          schema:
            $ref: '#/components/schemas/TrustedIssuer'
        ```