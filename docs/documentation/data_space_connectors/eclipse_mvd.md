# Eclipse Connector
## Introduction
The [Eclipse Dataspace Components (EDC)](https://github.com/eclipse-edc) provide a framework for sovereign, inter-organizational data sharing. They implement the IDS Dataspace Protocol (DSP) as well as relevant protocols associated with GAIA-X. The EDC are designed in an extensible way in order to support alternative protocols and integrate in various ecosystems. 

Eclipse also offers the [Minimum Viable Dataspace (MVD)](https://github.com/eclipse-edc/MinimumViableDataspace), a sample implementation of a dataspace that leverages the Eclipse Dataspace Components (EDC). The main purpose is to demonstrate the capabilities of the EDC, make dataspace concepts tangible based on a specific implementation, and to serve as a starting point to implement a custom dataspace.

Below is a step-by-step description of deploying this example locally, and some first impressions are documented.

## Getting started
The example shows three companies forming a data space through their corresponding connectors. In addition, each company has access to a web dashboard where, among other things, they can see a catalog of the data offered by the other companies.  

The dashboard lets you "negotiate contracts" to access the data offered by the other companies. Once a contract has been negotiated, the data can be downloaded.

The data exchanged are files stored in Azurite (a local Azure instance, just like Amazon's buckets). In other words, the Eclipse Minimum Viable Data space essentially provides a controlled environment for file exchange. 

### Set-up 
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

### File transfer demo
1. Download and install [Microsoft Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/) to connect to the `Azurite` storage container. It will let us view the transferred files.

2. Using Microsoft Azure Storage Explorer, connect to the local blob storage account on `localhost:10000` (provided by Azurite) of `company1`:
    - Account name: `company1assets`
    - Password: `key1`

3. Create a container named `src-container`.
4. Upload a dummy `text-document.text` file into the newly created container.
5. The following steps initiate and complete a file transfer with the provided test document:
    1. Open the website of company1 (e.g. <http://localhost:7080>) and verify the existence of two assets in the
      section `Assets`.
    2. Open the website of the company2 (e.g. <http://localhost:7081>) and verify six existing assets from all participants in
      the `Catalog Browser`.
        - In the `Catalog Browser` click `Negotiate` for the asset `test-document_company1`.
            - There should be a message `Contract Negotiation complete! Show me!` in less than a minute.
    3. From the previous message click `Show me!`. If you missed it, switch manually to the section `Contracts`.
        - There should be a new contract. Click `Transfer` to initiate the transfer process.
        - A dialog should open. Here, select as destination `AzureStorage` and click `Start transfer`.
        - There should be a message `Transfer [id] complete! Show me!` in less than a minute. (Where `id` is a UUID.)
    4. To verify the successful transfer the Storage Explorer can be used to look into the storage account of `company2`.
        - Storage account name and key is set in `system-tests/docker-compose.yml` for the service `azurite`. Default name
          is `company2assets`, key is `key2`.
        - There should be new container in the storage account containing two files `.complete` and `text-document.txt`.