const viewRowBtn = document.getElementById('viewRowBtn');
const editRowBtn = document.getElementById('editRowBtn');
const delRowBtn = document.getElementById('delRowBtn');

let newRows = [];

document.addEventListener("DOMContentLoaded",function(){
    // After the page is loaded, this will be executed

    function fetchDataFromAPI(){

        fetch("https://api.sheety.co/d792aa63534fe576fcacb7d43382021f/mockData/invoice")
        .then(response=>response.json())
        .then(data=> {
            console.log(data)
            //Verify with you API /Sheety data
            const invoice = data.invoice;
            
            for (let i=0; i< invoice.length;i++){
                //Create a new row tr
                let newTr = document.createElement("tr");
                //Verify on your table how many columns are there - 6
                //Create new column ? 6 columns
                let newTd1 = document.createElement("td");
                let newTd2 = document.createElement("td");
                let newTd3 = document.createElement("td");
                let newTd4 = document.createElement("td");
                let newTd5 = document.createElement("td");
                let newTd6 = document.createElement("td");

                //Set the innerHTML of the column
                newTd1.innerHTML = invoice[i].invoicedate;
                newTd2.innerHTML = invoice[i].invoicenumber;
                newTd3.innerHTML = invoice[i].invoicecurrency;
                newTd4.innerHTML = invoice[i].invoiceamount;
                newTd5.innerHTML = invoice[i].invoiceremark;   
                //Create 3 buttons
                //Add class to the button "btn btn-primary" "btn btn-secondary" "btn btn-danger"
                //Append to n TD
              
                newTd6.innerHTML = `
                <button type="button" class="btn btn-primary id="viewRowBtn">View</button>
                <button type="button" class="btn btn-warning" id="editRowBtn">Edit</button>
                <button type="button" class="btn btn-danger" id="delRowBtn">Delete</button>

                
            `;
                
                //Add the columns to the row
                newTr.appendChild(newTd1);
                newTr.appendChild(newTd2);
                newTr.appendChild(newTd3);
                newTr.appendChild(newTd4);
                newTr.appendChild(newTd5);
                newTr.appendChild(newTd6);

                

                //Add the rows to the tbody
                let tbody = document.getElementById("invoice_tbody");
                tbody.appendChild(newTr)
            }
        })
        .catch(err=>console.log(err))
        }



        //Invoke the function
    fetchDataFromAPI()
    
})

function addRow() {
    let table = document.getElementById("invoice_table").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let newTd1 = newRow.insertCell(0);
    newTd1.innerText = ""; 
    newTd1.contentEditable = true;

    let newTd2 = newRow.insertCell(1);
    newTd2.innerText = ""; 
    newTd2.contentEditable = true;

    let newTd3 = newRow.insertCell(2);
    newTd3.innerText = ""; 
    newTd3.contentEditable = true;

    let newTd4 = newRow.insertCell(3);
    newTd4.innerText = ""; 
    newTd4.contentEditable = true;
    
    let newTd5 = newRow.insertCell(4);
    newTd5.innerText = ""; 
    newTd5.contentEditable = true;

    
    newRows.push(newRow);
    
}

function saveData() {
    
    let data = newRows.map(row => ({
        ourreference:90000001001,
        invoicenumber: row.cells[1].innerText.trim(),
        invoicedate: row.cells[0].innerText.trim(),
        invoicecurrency: row.cells[2].innerText.trim(),
        invoiceamount: row.cells[3].innerText.trim(),
        invoiceremark: row.cells[4].innerText.trim()
    }));

    if (data.length === 0) {
        alert("No new records to save!");
        return;
    }

    fetch("https://api.sheety.co/d792aa63534fe576fcacb7d43382021f/mockData/invoice", 
    // {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ records: data }),
        
    // })
    {
        "method":"POST",
        "body":JSON.stringify(data),
        "headers":{"Authorization":"Bearer dcelz1secretkey",
        "Content-Type":"application/json" //We pass data in JSON 
        }
    })
    .then(response => response.json())
    .then(data => {
        alert("New records saved successfully!");
        newRows = []; // Clear tracked rows after saving
    })
    .catch(error => console.error("Error:", error));
}