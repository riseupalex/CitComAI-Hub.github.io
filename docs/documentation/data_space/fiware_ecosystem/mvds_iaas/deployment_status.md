# Status

!!! warning
    This guide is still a work in progress. Errors may appear.

Detailed local deployment status.

---

## Data Space Operator

??? status  "Status (12 total): 0 🛑 / 1 ❌ / 3 ⚠️ / 2 ❓ / 6 ✅" 

    !!! abstract inline end "_Services Status_"

        🛑 _not started._

        ❌ _not running CRITICAL ERROR_

        ⚠️ _running with doubts/ERRORS_

        ❓ _running with doubts_

        ✅ _running_

    |     **Component**         |  **Status**  | 
    | ------------------------: | :----------: | 
    | [**MongoDB**](#mongodb)   |      ✅      | 
    | [**MySQL**](#mysql)       |      ✅      | 
    | [**WaltID**](#-waltid)     |      ⚠️       |
    | [**Orion LD**](#orion-ld) |      ✅      | 
    | [**Credentials Config Service**](#credentials-config-service) |      ✅      |
    | [**Trusted ISSUERS List**](#trusted-issuers-list) |      ✅      |
    | [**Trusted PARTICIPANTS Registry**](#-trusted-participants-registry) |      ❓      |
    | [**Verifier**](#-verifier)       |      ⚠️      |
    | [**PDP**](#-pdp)                 |      ❓     |
    | [**Kong (Proxy)**](#kong-proxy) |      ⚠️      |
    | [**Portal**](#portal)           |      ✅     |
    | [**Keyrock**](#keyrock)         |      ❌     |

=== "MongoDB"

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    | ✅     | -          | [mongodb.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/mongodb.yaml) | _LoadBalancer_ | 

    - **values.yaml**: [modules/ds_operator/config/helm_values/mongodb.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/mongodb.yaml)
        - **variables**:
            - `service_name = mongodb`
            - `root_password = admin`
        - **FIWARE definitions**:
            - `service name = dsba-onboarding-portal-mongodb` (value we assume when reading the [orion ld configuration](https://github.com/FIWARE-Ops/fiware-gitops/blob/master/aws/dsba/onboarding-portal/orion-ld/values.yaml#L12))

=== "MySQL"

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    | ✅     | -          | [mysql.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/mysql.yaml) | - |
    
    - **values.yaml**: [modules/ds_operator/config/helm_values/mysql.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/mysql.yaml)
        - **variables**:
            - `service_name = mysql`
            - `root_password = admin`
            - `til_db = til`
            - `ccs_db = ccs`
        - **FIWARE definitions**:
            - `fullnameOverride (service name) = mysql-onboarding`   

=== "⚠️ WaltID"

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    |  ⚠️     | -          | [waltid.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/waltid.yaml) | `waltid.ds-operator.io` (NOT WORKING) |

    !!! warning "Doubts/Errors"
        Ingress is [configured](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/waltid.yaml#L9) as in other services but the corresponding endpoint is not generated.

        **Other doubts:**

        - [**templates**](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/waltid.yaml#L80):
            - What is this credential (GaiaXParticipantCredential.json)?
            - Where do you get it from? 
            - What is its function?

    - **values.yaml**: [modules/ds_operator/config/helm_values/waltid.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/waltid.yaml)
        - **variables**:
            - `service_name = waltid`
            - `service_domain = waltid.ds-operator.io`
            - `secret_tls_name = waltid-tls-secret`
            - `did_domain = did:web:waltid.ds-operator.io:did`
        - **FIWARE definitions**:
            - `route endpoint = onboarding.dsba.fiware.dev`
            - `did:web = did:web:onboarding.dsba.fiware.dev:did`
    - **endpoint type**: `ClusterIP + Ingress`
        - **ingress**: `waltid.ds-operator.io` (NOT WORKING)    

=== "Orion LD"

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    |  ✅    | [MongoDB](#mongodb) | [orionld.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/orionld.yaml) | - |

    - **values.yaml**: [modules/ds_operator/config/helm_values/orionld.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/orionld.yaml)
        - **variables**:
            - `service_name = mongodb`
            - `root_password = admin`
            - `orion_db_name = orion-oper`
    - **endpoint type**: `ClusterIP no Ingress`

=== "Credentials Config Service"

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    |  ✅    | [MySQL](#mysql) | [credentials_config_service.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/credentials_config_service.yaml) | - |

    - **values.yaml**: [modules/ds_operator/config/helm_values/credentials_config_service.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/credentials_config_service.yaml)
        - **variables**:
            - `service_name = cred-conf-service`
            - `mysql_service = mysql`
            - `ccs_db = ccs`
            - `root_password = admin`
    - **endpoint type**: `ClusterIP no Ingress`

=== "Trusted ISSUERS List"

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    |  ✅    | [MySQL](#mysql) | [trusted_issuers_list.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/trusted_issuers_list.yaml) | `til.ds-operator.io`<br>`tir.ds-operator.io` |

    - **values.yaml**: [modules/ds_operator/config/helm_values/trusted_issuers_list.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/trusted_issuers_list.yaml)
        - **variables**:
            - `service_name = trusted-issuers-list`
            - `service_domain_til = til.ds-operator.io`
            - `secret_tls_name_til = trusted-issuers-list-tls-secret`
            - `service_domain_tir = tir.ds-operator.io`
            - `secret_tls_name_tir = trusted-issuers-registry-tls-secret`
            - `mysql_service = mysql`
            - `root_password = admin`
            - `til_db = til`
    - **endpoint type**: `ClusterIP + Ingress`
        - **ingress**: 
            - _trusted issuers list_: `til.ds-operator.io`
            - _trusted issuers registry_: `tir.ds-operator.io`

=== "❓ Trusted PARTICIPANTS Registry"

    Also called: Trusted Issuers Registry [_for FIWARE_](https://github.com/FIWARE-Ops/fiware-gitops/tree/master/aws/dsba/onboarding-portal/trusted-issuers-registry)

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    |  ❓    | [Orion LD](#orion-ld) | [trusted_participants_registry.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/trusted_participants_registry.yaml) | `tpr.ds-operator.io` |

    !!! warning "Doubts/Errors"
        - [**satellite**](https://github.com/FIWARE-Ops/fiware-gitops/blob/master/aws/dsba/onboarding-portal/trusted-issuers-registry/values.yaml#L27): 
            - What is this satelite? 
            - Where do you get it from? 
            - What is its function? 
            - Can the ID name (EU.EORI.FIWARESATELLITE) be any name or does it have to be that name for some reason?

    - **values.yaml**: [modules/ds_operator/config/helm_values/trusted_participants_registry.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/trusted_participants_registry.yaml)
        - **variables**:
            - `service_name = trusted-participants-registry`
            - `service_domain = tpr.ds-operator.io`
            - `secret_tls_name = trusted-participants-registry-tls-secret `
            - `did_domain = did:web:waltid.ds-operator.io:did`
            - `orion_service_name = orionld`
    - **endpoint type**: `ClusterIP + Ingress`
        - **ingress**: `tpr.ds-operator.io`

=== "⚠️ Verifier"

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    |  ⚠️    | [Credentials Config Service](#credentials-config-service)<br>[Trusted ISSUERS List](#trusted-issuers-list)<br>[WaltID](#-waltid) | [verifier.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/verifier.yaml) | `verifier.ds-operator.io` |

    !!! warning "Doubts/Errors"
        With the _initContainers_ configuration as [Fiware](https://github.com/FIWARE-Ops/fiware-gitops/blob/master/aws/dsba/onboarding-portal/verifier/values.yaml#L26) has it, the service is not deployed.
            ```bash
            Defaulted container "vcverifier" out of: vcverifier, load-did (init)
            ```

        **Other doubts:**

        - [**m2m**](https://github.com/FIWARE-Ops/fiware-gitops/blob/master/aws/dsba/onboarding-portal/verifier/values.yaml#L18): 
            - What is this m2m? 
            - Is it correctly configured in [this way](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/verifier.yaml#L43)? 
    - **FIWARE repository**:
        - **code**: [github](https://github.com/FIWARE/VCVerifier)
        - **helm-chart**: [i4Trust v1.0.23](https://github.com/i4Trust/helm-charts/tree/vcverifier-1.0.23/charts/vcverifier)
    - **values.yaml**: [modules/ds_operator/config/helm_values/verifier.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/verifier.yaml)
        - **variables**:
            - `namespace = ds-operator`
            - `service_name = verifier`
            - `service_domain = verifier.ds-operator.io`
            - `secret_tls_name = verifier-tls-secret`
            - `waltid_service = waltid`
            - `tir_service = tir.ds-operator.io`
            - `did_domain = did:web:waltid.ds-operator.io:did`
            - `ccs_service = cred-conf-service`
            - `verifier_service = verifier`
    - **endpoint type**: `ClusterIP + Ingress`
        - **ingress**: `verifier.ds-operator.io`

=== "❓ PDP"

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    |  ❓    | [WaltID](#-waltid)<br>[Verifier](#-verifier)<br>[Keyrock?](#keyrock) | [pdp.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/pdp.yaml) | - |

    !!! warning "Doubts/Errors"
        - [**ishare.existingSecret**](): 
            - Are the secrets of waltid?
        - [**ishare.trustedFingerprints**]():
            - What CA is this fingerprint?
        - [**ishare.ar**]():
            - _ar_ is the keyrock service?
        - [**ishare.trustAnchor**]():
            - What does this have to do with TPR (trusted-participants-registry)? - When talking about trustAnchor, does it refer to TPR?
        - [**additionalEnvVars**]():
            - What is this?
            - Is it set correctly with the default value?

    - **values.yaml**: [modules/ds_operator/config/helm_values/pdp.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/pdp.yaml)
        - **variables**:
            - `service_name = pdp`
            - `secret_tls_name_waltid = `
            - `did_domain = did:web:waltid.ds-operator.io:did`
            - `keyrock_domain = keyrock.ds-operator.io`
            - `tpr_domain = tpr.ds-operator.io`
            - `verifier_domain = verifier.ds-operator.io`
    - **endpoint type**: `ClusterIP`

=== "Kong (Proxy)"

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    |  ⚠️    | [Orion LD](#orion-ld)<br>[PDP](#-pdp) | [pdp.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/pdp.yaml) | - |

    !!! warning "under configuration ..."

    ```bash
    2024/03/31 11:36:52 [error] 1#0: init_by_lua error: /usr/local/share/lua/5.1/kong/init.lua:553: error parsing declarative config file /kong_dbless/kong.yml:
    in '_format_version': required field missing
    in 'apiVersion': unknown field
    in 'metadata': unknown field
    in 'data': unknown field
    in 'kind': unknown field
    stack traceback:
        [C]: in function 'error'
        /usr/local/share/lua/5.1/kong/init.lua:553: in function 'init'
        init_by_lua:3: in main chunk
    nginx: [error] init_by_lua error: /usr/local/share/lua/5.1/kong/init.lua:553: error parsing declarative config file /kong_dbless/kong.yml:
    in '_format_version': required field missing
    in 'apiVersion': unknown field
    in 'metadata': unknown field
    in 'data': unknown field
    in 'kind': unknown field
    stack traceback:
        [C]: in function 'error'
        /usr/local/share/lua/5.1/kong/init.lua:553: in function 'init'
        init_by_lua:3: in main chunk
    ```

=== "Portal"

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    |  ✅    | - | [portal.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/portal.yaml) | - |

=== "❌ Keyrock"

    | Status | Depends on | Values.yaml | Endpoint |
    | :----: | :--------: | :---------  | :------  |
    |  ❌     | [WaltID](#-waltid)<br>[MySQL](#mysql)<br>[PDP](#-pdp) | [kong.yaml](https://github.com/CitCom-VRAIN/Minimum_Viable_DataSpace_Infrastructure/blob/develop/modules/ds_operator/config/helm_values/kong_conf.yaml) | - |

    ```bash
    > fiware-idm@8.3.0 start /opt/fiware-idm
    <!-- # > node --max-http-header-size=${IDM_SERVER_MAX_HEADER_SIZE:-8192} ./bin/www

    Connection has been established successfully
    Database created
    Database migrated
    Unable to seed database:  Error: Command failed: npm run seed_db --silent
    ERROR: Validation error

        at ChildProcess.exithandler (child_process.js:383:12)
        at ChildProcess.emit (events.js:400:28)
        at maybeClose (internal/child_process.js:1088:16)
        at Process.ChildProcess._handle.onexit (internal/child_process.js:296:5) {
      killed: false,
      code: 1,
      signal: null,
      cmd: 'npm run seed_db --silent'
    }
    internal/fs/watchers.js:251
        throw error;
        ^

    Error: EMFILE: too many open files, watch '/opt/fiware-idm/etc/translations/'
        at FSWatcher.<computed> (internal/fs/watchers.js:243:19)
        at Object.watch (fs.js:1587:34)
        at module.exports (/opt/fiware-idm/node_modules/i18n-express/index.js:68:6)
        at Object.<anonymous> (/opt/fiware-idm/app.js:177:5)
        at Module._compile (internal/modules/cjs/loader.js:1085:14)
        at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
        at Module.load (internal/modules/cjs/loader.js:950:32)
        at Function.Module._load (internal/modules/cjs/loader.js:790:12)
        at Module.require (internal/modules/cjs/loader.js:974:19)
        at require (internal/modules/cjs/helpers.js:101:18)
        at start_server (/opt/fiware-idm/bin/www:106:15)
        at /opt/fiware-idm/bin/www:140:7
        at /opt/fiware-idm/lib/database.js:112:11
        at /opt/fiware-idm/lib/database.js:39:18
        at ChildProcess.exithandler (child_process.js:390:5)
        at ChildProcess.emit (events.js:400:28)
        at maybeClose (internal/child_process.js:1088:16)
        at Process.ChildProcess._handle.onexit (internal/child_process.js:296:5) {
      errno: -24,
      syscall: 'watch',
      code: 'EMFILE',
      path: '/opt/fiware-idm/etc/translations/',
      filename: '/opt/fiware-idm/etc/translations/'
    }
    npm ERR! code ELIFECYCLE
    npm ERR! errno 1
    npm ERR! fiware-idm@8.3.0 start: `node --max-http-header-size=${IDM_SERVER_MAX_HEADER_SIZE:-8192} ./bin/www`
    npm ERR! Exit status 1
    npm ERR! 
    npm ERR! Failed at the fiware-idm@8.3.0 start script.
    npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

    npm ERR! A complete log of this run can be found in:
    npm ERR!     /root/.npm/_logs/2024-03-14T13_19_08_227Z-debug.log -->
    ```

---

## Data Space Marketplace


---

## Data Space Connector