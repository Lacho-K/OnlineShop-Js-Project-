 function validateInputAndAddProduct(){

    let productName = document.getElementById('ProductName');
    let productPrice = document.getElementById('ProductPrice');   

    let courierCheckbox = document.getElementById('courierCheckbox');
    let presentCheckbox = document.getElementById('presentCheckbox');

    if(inputsAreValid(productName.value, productPrice.value)){
        
        AddProductToShoppingCart(productName.value, productPrice.value, courierCheckbox, presentCheckbox);

    }    
    resetInputValues(productName, productPrice, courierCheckbox, presentCheckbox);
    uncheckCheckboxes(courierCheckbox, presentCheckbox);
}

function inputsAreValid(productNameEl, productPriceEl){
    if(productNameEl === '' || productPriceEl === ''){
        alert('Input fields cannot be empty!');
        return false;
    }
    else if(isNaN(+productPriceEl) || +productPriceEl < 0){
        alert('Price has to be a number which is bigger than zero!');
        return false;
    }
    else if(productPriceEl.includes('.')){
        let lenghtAfterDecimalPoint = productPriceEl.substr(productPriceEl.indexOf('.') + 1).length;

        if(lenghtAfterDecimalPoint > 2){
            alert('Numbers after decimal point cannot be more than two!');
            return false;
        }
    }
    return true;
}

function addCheckboxesCost(courierCheckbox, presentCheckbox){
    let sumCost = 0;

    if(courierCheckbox.checked){
        sumCost += 1.20;
    }
    if(presentCheckbox.checked){
        sumCost += 1.20;
    }

    return sumCost;
}

function updateTotalCostAndReturnSum(){
    let currentSum = 0.00;
    let total = document.getElementById('Total');
    let tableData = document.querySelectorAll('#ProductInfo tr td');

    for (let i = 1; i < tableData.length; i+=2) {
        currentSum += +tableData[i].innerHTML.match(/[\d.]+/);
    }

    total.innerHTML = `${currentSum.toFixed(2)}лв.`;
    return currentSum;

}

function resetInputValues(input1, input2){
    input1.value = '';
    input2.value = '';
}

function uncheckCheckboxes(checkbox1, checkbox2){
    if(checkbox1.checked){
        checkbox1.click();
    }
    if(checkbox2.checked){
        checkbox2.click();
    }
}

function checkout() {
    let tableData = document.querySelectorAll('#ProductInfo tr td');

    if(tableData.length > 0){
        alert('Thanks for purchasing!');
        if(tableData.length > 2){
            let sum = updateTotalCostAndReturnSum();
            alert(`You get a 5% discount! Total sum: ${sum.toFixed(2)}лв. discount: ${(sum * 0.05).toFixed(2)}лв. result: ${(sum - sum * 0.05).toFixed(2)}лв.`);
        }
        document.querySelector('#ProductInfo').innerHTML = '';
        updateTotalCostAndReturnSum();
        return;
    }
    
    alert('You haven\' purchased anything yet!');
}

function AddProductToShoppingCart(productName, productPrice, courierCheckbox, presentCheckbox){
    let tbody = document.querySelector('tbody');
    let tr = document.createElement('tr');

    let tdForName = document.createElement('td');
    let tdForPrice = document.createElement('td');
    let removeButton = document.createElement('button');

    removeButton.innerHTML = 'Remove';       

    let currentPrice = (Number(productPrice) + addCheckboxesCost(courierCheckbox, presentCheckbox)).toFixed(2);

    tdForName.innerHTML = productName;
    tdForPrice.innerHTML = `${currentPrice}лв.`;

    tr.appendChild(tdForName);
    tr.appendChild(tdForPrice);
    tr.appendChild(removeButton);

    removeButton.addEventListener('click', function(){
        tbody.removeChild(tr);
        updateTotalCostAndReturnSum();
    });

    tbody.appendChild(tr);

    updateTotalCostAndReturnSum(currentPrice);
}

function AddTopProduct(){
    let currentProductRow = event.target.parentNode.parentNode;
    let currentProductName = currentProductRow.children[1].innerHTML;
    let currentProductPrice = currentProductRow.children[2].innerHTML.substr(0, currentProductRow.children[2].innerHTML.indexOf('л'));

    AddProductToShoppingCart(currentProductName, currentProductPrice, courierCheckbox, presentCheckbox);
    uncheckCheckboxes(courierCheckbox, presentCheckbox);
}