 function validateInputAndAddProduct(){
    let productNameEl = document.getElementById('ProductName');
    let productPriceEl = document.getElementById('ProductPrice');   

    let courierCheckbox = document.getElementById('courierCheckbox');
    let presentCheckbox = document.getElementById('presentCheckbox');

    if(inputsAreValid(productNameEl.value, productPriceEl.value)){
        
        let tbody = document.querySelector('tbody');
        let tr = document.createElement('tr');

        let tdForName = document.createElement('td');
        let tdForPrice = document.createElement('td');
        let removeButton = document.createElement('button');

        removeButton.innerHTML = 'Remove';       

        let currentPrice = (Number(productPriceEl.value) + addCheckboxesCost(courierCheckbox, presentCheckbox)).toFixed(2);

        tdForName.innerHTML = productNameEl.value;
        tdForPrice.innerHTML = `${currentPrice}лв.`;

        tr.appendChild(tdForName);
        tr.appendChild(tdForPrice);
        tr.appendChild(removeButton);

        removeButton.addEventListener('click', function(){
            tbody.removeChild(tr);
            updateTotalCostOfProducts();
        });

        tbody.appendChild(tr);

        resetInputValues(productNameEl, productPriceEl);

        updateTotalCostOfProducts(currentPrice);

    }    
    resetInputValues(productNameEl, productPriceEl);
}

function inputsAreValid(productNameEl, productPriceEl){
    if(productNameEl === '' || productPriceEl === ''){
        alert('Input fields cannot be empty!');
        return false;
    }
    else if(isNaN(+productPriceEl) || +productPriceEl < 0){
        alert('Price has to be a number bigger than zero!');
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

function updateTotalCostOfProducts(){
    let currentSum = 0.00;
    let total = document.getElementById('Total');
    let tableData = document.querySelectorAll('#ProductInfo tr td');

    for (let i = 1; i < tableData.length; i+=2) {
        currentSum += +tableData[i].innerHTML.match(/[\d.]+/);
    }

    total.innerHTML = `${currentSum.toFixed(2)}лв.`;

}

function resetInputValues(input1, input2){
    input1.value = '';
    input2.value = '';
}

function checkout() {
    let tableData = document.querySelectorAll('#ProductInfo tr td');

    if(tableData.length > 0){
        alert('Thanks for purchasing!');
        return;
    }
    
    alert('You haven\' purchased anything yet!');
}