# Minimum Interoperable AI Service (MIAIS) - Waste Collection 
[Repository :simple-github:](https://github.com/CitCom-VRAIN/waste-collection-demo){ .md-button .md-button--primary }

<figure markdown>
  ![Waste Collection](img/waste_collection.gif){ loading=lazy }
</figure>

## Introduction
This tutorial shows how to implement an AI-based service for optimizing city waste collection using context information and [Openroute](https://openrouteservice.org/) optimization service. This limited example illustrates how to implement a **Minimum Interoperable AI Service (MIAIS)** following MIMs embraced by the CitCom.ai project.

!!! abstract "Scenario"
    Different sensors are deployed throughout the city to monitor the fill levels of waste containers. These sensors periodically collect data on the fill levels and send it to the city data platform. The goal is to use context information to create optimal waste collection routes for the trucks. The solution will only consider the current waste container filling level, their location, available trucks, their capacity, start and end location, and time restrictions.

### Entities
The following entities in NGSI-LD format will be used: [WasteContainer](https://github.com/smart-data-models/dataModel.WasteManagement/tree/master/WasteContainer), [Vehicle](https://github.com/smart-data-models/dataModel.Transportation/tree/master/Vehicle). Feel free to click on them and explore their corresponding Smart Data Model specifications.

### Architecture
```mermaid
graph LR
  A["🏛️ City data platform"] ---|NGSI-LD| B["🤖 AI service"];
  B --- C["📈 Dashboard"];
  C["📈 Dashboard"] --- D["👥 Users"];
```

The above image shows the overall architecture: The AI service will get the necessary data from the city platform using the NGSI-LD specification. In the future, once [the data space connector](./../data%20space%20connectors/Fiware%20Connector/index.md) is deployed, the AI service will get the data through it. 

An intermediary adapter may be required in cases where the city data platform does not comply with the proposed NGSI-LD standard. If your current data platform uses the NGSIv2 specification, check the adaptors section for more details about using [Lepus](../adaptors/lepus.md) or [connecting an NGSI-V2 broker with an NGSI-LD broker through subscriptions](../adaptors/iot_agent.md). 

The AI service will use the gathered information to offer an interactive service through a web dashboard. Once the user provides a desired config the AI service will produce an optimal solution.

### Openroute optimization service
[Openroute](https://openrouteservice.org/) offers a free vehicle routing optimization service based on the [Vroom](https://github.com/VROOM-Project/vroom) project. This demo will employ this service to provide and optimal solution. 

To access the service you will need a valid API key, so go over to [openrouteservice.org](https://openrouteservice.org) and get one; you will need it later. The API and parameters specification are explained [in the following page](https://github.com/VROOM-Project/vroom/blob/master/docs/API.md).

## Getting started
Below, you will find step-by-step instructions on how to deploy waste collection minimum viable service. Tested with Python `3.10.12` and Ubuntu 22.04.

1. Clone the repository and navigate to its root folder:
```bash
git clone https://github.com/CitCom-VRAIN/waste-collection-demo.git && cd waste-collection-demo
```

2. Init git submodules with the following command. This will clone and install a dead simple [ngsi-ld client library](https://github.com/CitCom-VRAIN/ngsild-client) in `lib` folder.
```bash
git submodule init && git submodule update
```

3. Next, create and run the Orion-LD Docker image. It is necessary to have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose) installed. This will set-up an Orion-LD broker with a MongoDB database. Check out the [`docker-compose.yaml`](https://github.com/CitCom-VRAIN/waste-collection-demo/blob/mvs-orionld/docker-compose.yaml) file for more details.
```bash
docker compose up
```

4. Create and activate a Python virtual environment:
```bash
python3 -m venv ./venv && source ./venv/bin/activate
```

5. Install all requirements:
```bash
pip install -r requirements.txt
```

6. Create an `.env` file using `.env.example` as a guide: 
```bash
cp .env.example .env
```

7. Then edit the `.env` file and replace the `OPENROUTESERVICE_API_KEY` value with your own Openroute service API key.
```bash
PROTOCOL="http"
ENDPOINT_CB="127.0.0.1:1026"
OPENROUTESERVICE_API_KEY="Replace this string with your Openroute API key"
WASTECONTAINERS_CONTEXT="https://raw.githubusercontent.com/smart-data-models/dataModel.WasteManagement/master/context.jsonld"
VEHICLEMODEL_CONTEXT="https://raw.githubusercontent.com/smart-data-models/dataModel.Transportation/master/context.jsonld"
```

8. After editing the file and saving it, read the .env file:
```bash
source .env
```  

9. Populate the context broker with some fake data by running the following command. This will create some `WasteContainer` and `VehicleModel` entities in the broker:
```bash
python3 upsert_fake_data.py
```

10. Finally, start the server and open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser:
```bash
flask --app server run
```

## Adapting the MIAIS
The Minimum Viable AI Service is a starting point for implementing a custom AI service. Therefore, feel free to explore and edit the project to start building up your own. Here are some tips that can help you adapt this example to your needs:

- Brief project structure:
	- `static/`: Frontend folder. 
		- `index.html`: Defines the UI
		- `main.js`: Defines the main logic.
		- `modules/`: Includes entity classes, API rest client, optimization logic, leaflet stuff, and UI functions.
		- `style.css`: Main CSS style sheet.
	- `server.py`:  Sets up the Flask server and exposes the service API.
	- `services/Optimization.py`: Defines the query for Openroute optimization service. 
	- `lib/`: External python libraries.

- We worked with optimizing trucks routes ([`Vehicle`](https://github.com/smart-data-models/dataModel.Transportation/tree/master/Vehicle) entity) to pickup [`WasteContainers`](https://github.com/smart-data-models/dataModel.WasteManagement/tree/master/WasteContainer) that are full (`fillingLevel` attribute). However, these entities can be replaced to formulate new delivery/pickup problems. Visit the [Smart Data Models repositories](https://github.com/smart-data-models) for more entities and decide which attributes are important for your problem. To integrate these changes in the project, you should modify the [`upsert_fake_data.py`](https://github.com/CitCom-VRAIN/waste-collection-demo/blob/mvs-orionld/upsert_fake_data.py) script accordingly. Then, create the corresponding entity classes in `static/modules/` folder, just like [`WasteContainer.js`](https://github.com/CitCom-VRAIN/waste-collection-demo/blob/mvs-orionld/static/modules/WasteContainer.js). Take also a look at [`main.js`](https://github.com/CitCom-VRAIN/waste-collection-demo/blob/mvs-orionld/static/main.js) to modify the main logic. 

- Moreover, maybe your situation needs to consider some time restrictions or priorities. Check out the [Openroute service API specification](https://github.com/VROOM-Project/vroom/blob/master/docs/API.md), which is powerful and includes many parameters to fit your optimization needs. To change/add additional query parameters, go over [`Optimization.py`](https://github.com/CitCom-VRAIN/waste-collection-demo/blob/mvs-orionld/services/Optimization.py) and [`Optimizer.js`](https://github.com/CitCom-VRAIN/waste-collection-demo/blob/mvs-orionld/static/modules/Optimizer.js) files.

- When working with brokers in a production state, authentication is often required. The [`ngsild-client`](https://github.com/CitCom-VRAIN/ngsild-client) library included in the example comes with authentication support, with optional service and subservice options. See the following code as a guide to include these features in your project:

  ```python
  from lib.ngsildclient.Auth import Auth
  from lib.ngsildclient.Client import Client


  # Define service & subservice
  service = "tef_city"
  subservice = "/containers"

  # Authenticate
  auth = Auth()
  token = auth.get_auth_token_subservice(service, subservice)

  # Ngsi-ld broker client
  client = Client()

  # Fetch WasteContainer entities
  containers = broker.get_all_entities_by_type("WasteContainer", context, 100, 0, service, subservice, toke).json()
  ```

## Prediction service
!!! info
    This feature is still a work in progress. Thus, it is not available right now.

In addition to the waste collection optimization, the service will include a prediction of waste containers filling level. The generated data from the AI service will be accessible following MIM1 and MIM2 recomendations.

## Track and status of known problems
- [X] Openroute optimization service has a maximum limit of 70 locations. This can be solved by [deploying your own Openroute instance](https://giscience.github.io/openrouteservice/getting-started).
- [ ] Solutions should be provided using Smart data models ([FleetVehicle](), [FleetVehicleOperation](), [Road]() and [RoadSegment]()).