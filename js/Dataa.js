(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "blockNumber",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "timeStamp",
            alias: "timeStamp",
            dataType: tableau.dataTypeEnum.int
        },
		 {
            id: "nonce",
            alias: "nonce",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "hash",
            alias: "hash",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "blockHash",
            alias: "blockHash",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "from",
            alias: "from",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "contractAddress",
            alias: "contractAddress",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "to",
            alias: "to",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "value",
            alias: "value",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "tokenName",
            alias: "tokenName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "tokenSymbol",
            alias: "tokenSymbol",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "transactionIndex",
            alias: "transactionIndex	",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "gas",
            alias: "gas",
            dataType: tableau.dataTypeEnum.float
        }
		, {
            id: "gasPrice",
            alias: "gasPrice",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "gasUsed",
            alias: "gasUsed",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "cumulativeGasUsed",
            alias: "cumulativeGasUsed",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "input",
            alias: "input",
            dataType: tableau.dataTypeEnum.string
			}
        , {
            id: "confirmations",
            alias: "confirmations",
            dataType: tableau.dataTypeEnum.float
        }	
		
		];

        var tableSchema = {
            id: "earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback)  {
        var dateObj = JSON.parse(tableau.connectionData),
            dateString = dateObj.startDate,
            apiCall = "https://api.etherscan.io/api?module=account&action=tokentx&address=" + dateString + "&startblock=0&endblock=999999999&sort=asc&apikey=P7QMVKX49MUZV3I99WBPVNMBIV4B8GBX537";

        $.getJSON(apiCall, function(resp) {
            var feat = resp.features,
                tableData = [];
	
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "blockNumber": feat[i].blockNumber,
                    "timeStamp": feat[i].timeStamp,
					"hash": feat[i].hash,
                    "nonce": feat[i].nonce,
					"blockHash": feat[i].blockHash,
                    "from": feat[i].from,
					"contractAddress": feat[i].contractAddress,
                    "to": feat[i].to,
                    "value": feat[i].value,"tokenName": feat[i].tokenName,
                    "tokenSymbol": feat[i].tokenSymbol,
					"transactionIndex": feat[i].transactionIndex,
                    "gas": feat[i].gas,
					"gasPrice": feat[i].gasPrice,
                    "gasUsed": feat[i].gasUsed,
					"cumulativeGasUsed": feat[i].cumulativeGasUsed,
                    "input": feat[i].input,
					"confirmations": feat[i].confirmations
                   
                  
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };
		setupConnector = function() {
       var x = document.getElementById("myText").value;
            tableau.connectionData = JSON.stringify(connectionData);
            tableau.submit();
        }
     };
     tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function()  $(document).ready(function() {	
        $("#submitButton").click(function() { // This event fires when a button is clicked
            setupConnector();
        });
        $('#inputForm').submit(function(event) {
            event.preventDefault();
            setupConnector();
        });
    }
		
	
	);
})();

