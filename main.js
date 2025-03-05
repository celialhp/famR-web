const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click',()=>{
    <a href="#landing.html"></a>
}
submitBtn.addEventListener('click',()=>{
    const effectiveDate=document.getElementById('effectiveDate').value;
    const currency=document.getElementById('currency').value;
    const amount=document.getElementById('amount').value;
    const goodsCode=document.getElementById('goodsCode').value;
    const localgoods=document.getElementById('localgoods').value;
    const customerID=document.getElementById('customerID').value;
    const referenceNumber=document.getElementById('referenceNumber');

    //This is the data that we are going to send to the server
    // It should follow the format of JSON that we test in Postman
    const data={
        "employee":{
            "referencenumber":referenceNumber,
            "customerid":customerID,
            "effectivedate":effectiveDate,
            "currency":currency,
            "amount":amount,
            "goodscode":goodsCode,
            "localgoods":localgoods,
            
        }
    }
    

    fetch("https://api.sheety.co/d792aa63534fe576fcacb7d43382021f/mockData/employee",
        {
            "method":"POST",
            "body":JSON.stringify(data),
            "headers":{"Authorization":"Bearer dcelz1secretkey",
            "Content-Type":"application/json" //We pass data in JSON 
            }
        })
        .then(response =>response.json())
        .then(data =>{
            alert("Data successfully added!")
        }).catch(err =>{
            alert("There was an error!")
            console.log(err);
        })
    
})

$(document).ready(function () {
    // Add new row
    $("#addRow").click(function () {
        let newRow = `<tr>
            <td><input type="date" class="form-control"></td>
            <td><input type="text" class="form-control" placeholder="INV12345"></td>
            <td>
                <select class="form-control">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                </select>
            </td>
            <td><input type="number" class="form-control" placeholder="100.00"></td>
            <td><input type="text" class="form-control" placeholder="Remarks"></td>
            <td>
                <button class="btn btn-primary saveBtn">💾 Save</button>
                <button class="btn btn-danger deleteBtn">❌ Delete</button>
            </td>
        </tr>`;
        $("#invoiceTable").append(newRow);
    });

    // Delete row
    $(document).on("click", ".deleteBtn", function () {
        $(this).closest("tr").remove();
    });

    // Save row data
    $(document).on("click", ".saveBtn", function () {
        let row = $(this).closest("tr");
        let data = {
            date: row.find("input[type='date']").val(),
            invoiceNo: row.find("input[type='text']").eq(0).val(),
            currency: row.find("select").val(),
            amount: row.find("input[type='number']").val(),
            remarks: row.find("input[type='text']").eq(1).val()
        };
        console.log("Saved Data:", data);
        alert("Data Saved: " + JSON.stringify(data));
    });
});