# Eclipse Connector
## Introduction
The [Eclipse Dataspace Components (EDC)](https://github.com/eclipse-edc) provide a framework for sovereign, inter-organizational data sharing. They implement the IDS Dataspace Protocol (DSP) as well as relevant protocols associated with GAIA-X. The EDC are designed in an extensible way in order to support alternative protocols and integrate in various ecosystems. 

Eclipse also offers the [Minimum Viable Dataspace (MVD)](https://github.com/eclipse-edc/MinimumViableDataspace), a sample implementation of a dataspace that leverages the Eclipse Dataspace Components (EDC). The main purpose is to demonstrate the capabilities of the EDC, make dataspace concepts tangible based on a specific implementation, and to serve as a starting point to implement a custom dataspace.

Below is a step-by-step description of deploying this example locally, and some first impressions are documented.

## Getting started
The example shows three companies forming a data space through their corresponding connectors. In addition, each company has access to a web dashboard where, among other things, they can see a catalog of the data offered by the other companies.  

The dashboard lets you "negotiate contracts" to access the data offered by the other companies. Once a contract has been negotiated, the data can be downloaded.

The data exchanged are files stored in Azurite (a local Azure instance, just like Amazon's buckets). In other words, the Eclipse Minimum Viable Data space essentially provides a controlled environment for file exchange. 

### Hands on
1. First, make sure that Java 17 is installed in your system. If you are on Ubuntu / Debian you can install it by:
```bash
sudo apt install openjdk-17-jdk
```

2. Once your system is ready, clone the web dashboard:
```bash
git clone https://github.com/eclipse-edc/DataDashboard
```

3. Then set the environment variable `MVD_UI_PATH` to the path of the cloned DataDashboard repository:
```bash
export MVD_UI_PATH="/path/to/mvd-datadashboard"
```

4. Now, clone the MVD repository and navigate to its root folder:
```bash
git clone https://github.com/eclipse-edc/MinimumViableDataspace && cd MinimumViableDataspace
```
5. Build the MVD
```bash
./gradlew build -x test
```
6. Build the `EDC Connector` and `RegistrationService` runtimes. As we are running MVD locally, we include `useFsVault` to indicate that the system will be using the local file-system based key vault. Execute the following command to build the connector JAR and registration service JAR:
```bash
./gradlew -DuseFsVault="true" :launchers:connector:shadowJar
./gradlew -DuseFsVault="true" :launchers:registrationservice:shadowJar
```
7. Then, to bring up the dataspace with the `ui` profile, please execute the following command from the MVD root folder:
```bash
docker compose --profile ui -f system-tests/docker-compose.yml up --build
```

8. Set the environment variable `TEST_ENVIRONMENT`` to local to enable local blob transfer test and then run MVD system test using the following command:
```bash
export TEST_ENVIRONMENT=local
./gradlew :system-tests:test -DincludeTags="ComponentTest,EndToEndTest"
```