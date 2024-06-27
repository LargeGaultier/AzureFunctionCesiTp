const { app,output  } = require('@azure/functions');
const tableOutput = output.table({
    tableName: 'Messages',
    connection: 'fa1307_STORAGE',
});
app.storageQueue('ConsumeMessage', {
    queueName: 'js-queue-items',
    connection: 'fa1307_STORAGE',
    extraOutputs: [tableOutput],
    handler: (queueItem, context) => {
        
        context.log('Storage queue function processed work item:', queueItem);
        let row ={
            PartitionKey: 'message',
            RowKey: uuidv4(),
            Name: queueItem,
        };
        context.extraOutputs.set(tableOutput, row);
    }
});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
