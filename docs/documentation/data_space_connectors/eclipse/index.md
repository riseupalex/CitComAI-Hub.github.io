# Eclipse Connector

## Introduction
The [Eclipse Dataspace Components (EDC)](https://github.com/eclipse-edc) provide a framework for sovereign, inter-organizational data sharing. They implement the **IDS Dataspace Protocol (DSP)** as well as **relevant protocols associated with GAIA-X**. The EDC are designed in an extensible way in order to support alternative protocols and integrate in various ecosystems. 

It is important to note that **EDC is not a prepackaged system or application and, as such, does not ship an installable distribution**—downstream projects, such as Simpl, take EDC as a foundational component and customize it to meet their specific requirements. Moreover, EDC does not supply the underlying infrastructure for storing, processing, or moving data; instead, it seamlessly integrates with third-party data planes that deliver these essential services.
 

Therefore,** EDC needs further downstream work to adapt and make it work in the CitCom.ai context**. 

### Key points
- The working group formed by IDSA, Gaia-X, and Eclipse is quite solid (+ Simpl). It seems to be the EU's direction.​
- Agnostic 
- Push and pull data transfer mechanism. It also supports streaming data.
- EDC is a framework. It needs further work to deploy it. EDC development is very active.

## Getting started
If you’re eager to put EDC to the test and see how it functions in real-world scenarios, the next step is to dive into the practical examples available. We recommend starting with the comprehensive samples, which are designed to give you immediate insights and hands-on experience.

Go to [samples repository](https://github.com/eclipse-edc/Samples) and take a high-level look at the available sample scopes. The repository is organized by topics such as basic setup, data transfer, advanced integrations, and policy enforcement. If you’re new to EDC, start with the “basic” samples to learn how to set up and run a connector. Once you have a handle on the basics, consider exploring other scopes (e.g., “transfer” or “policy”) to delve deeper into specific aspects of the framework.

## Experiments
Once you successfully run samples, consider modifying configuration files or sample code to see how changes affect the behavior. This hands-on approach will help cement your understanding of how EDC can be extended to meet your organization’s needs. For example, by modifying the [transfer-03 example](https://github.com/eclipse-edc/Samples/tree/main/transfer/transfer-03-consumer-pull) it is possible to perform a quick and dirty experiment in order to connect your current TEF data platform to the connector. Take a look at the Valencia TEF setup.

<figure markdown>
  ![Eclipse connector experiment](img/eclipse_experiment.png){ loading=lazy }
</figure>

Using a middleware makes it possible to connect the Eclipse connector to the current data platform. The middleware, an API rest server built with Flask, handles authentication and redirects all data requests to the data platform (via [Lepus](../../data_federation/ngsiv2_to_ld/lepus.md) to translate NGSIv2 to NGSI-LD).

=== "middleware.py"
    ```python
    import os
    from lib.ngsildclient.Client import Client
    from lib.ngsildclient.Authv2 import Authv2

    # Ngsi-ld broker client
    client = Client()

    # Init flask server
    from flask import Flask, request
    from flask_cors import CORS

    app = Flask(__name__)
    CORS(app)


    # API REST
    @app.route("/wastecontainers/")
    def waste_containers():
        containers = get_all_WasteContainers()
        return containers


    # Data functions
    def get_all_WasteContainers():
        # Define service & subservice
        service = "tef_vlci"
        subservice = "/residuos_contenedores_vlc"

        # Authenticate
        auth = Authv2()
        token = auth.get_auth_token_subservice(service, subservice)

        # Fetch all WasteContainer entities
        context = os.environ.get("WASTECONTAINERS_CONTEXT")
        containers = client.get_all_entities_by_type("WasteContainer", context, 100, 0, service, subservice, token).json()
        return containers
    ```

=== "create-asset.json"
    ```json
    {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@id": "assetId",
        "properties": {
            "name": "product description",
            "contenttype": "application/json"
        },
        "dataAddress": {
            "type": "HttpData",
            "name": "WasteContainers",
            "baseUrl": "http://127.0.0.1:5000/wastecontainers",
            "proxyPath": "true"
        }
    }
    ```

