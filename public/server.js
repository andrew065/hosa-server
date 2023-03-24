const CosmosClient = require('@azure/cosmos').CosmosClient

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containers = ['AmbulanceData', 'PatientInfo']
const partitionKeyPath = ['/id']

const item = [
    {
        'id': 'ambulance1',
        'status': 'with patient',
        'unit': 'cardiac'
    }
]

const cosmosClient = new CosmosClient({endpoint: endpoint, key: primaryKey})


add_item().catch(err => console.error(err))

async function add_item() {
    const { database } = await cosmosClient.databases.createIfNotExists({id: databaseId})
    const { container } = await database.containers.createIfNotExists({
        id: containers[0],
        partitionKey: {
            paths: partitionKeyPath
        }
    });
    const { resource } = await container.items.create(item);
}
