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
let { database } = null
let { container } = null

add_item().catch(err => console.error(err))

async function add_item() {
    database = await cosmosClient.databases.createIfNotExists({id: databaseId})
    container = await database.containers.createIfNotExists({
        id: containers[0],
        partitionKey: {
            paths: partitionKeyPath
        }
    });
    const { resource } = await container.items.create(item);
}

async function fetch_ambulances() {
    const { resources } = await container.items
        .query("SELECT * from c") //fetches all items from entire container
        .fetchAll()

    return resources
}

// SQL Query specification
// const querySpec = {
//     // SQL query text using LIKE keyword and parameter
//     query: `select * from products p where p.name LIKE @propertyValue`,
//     // Optional SQL parameters, to be used in query
//     parameters: [
//         {
//             // name of property to find in query text
//             name: "@propertyValue",
//             // value to insert in place of property
//             value: `%Blue%`,
//         }
//     ]
// };
// Execute query
//const { resources } = await container.items.query(querySpec).fetchAll();

//inserting items
// const result = await container.items.upsert(item);