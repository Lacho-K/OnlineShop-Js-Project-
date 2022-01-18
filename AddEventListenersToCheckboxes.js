function AddEventListeners() {
    let checkboxesNames = ['courierCheckbox', 'presentCheckbox'];
    let labelNames = ['courierCheckboxLabel','presentCheckboxLabel'];

    let checkboxes = document.querySelectorAll('input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        let currentCheckbox = document.getElementById(checkboxesNames[i]);
        let currentLabel = document.getElementById(labelNames[i]);   

        currentCheckbox.addEventListener('click', function(){
            if(this.checked){
                currentLabel.style.color = 'green';
                currentLabel.innerHTML = '+ 1.20лв.';
            }
            else{
                currentLabel.style.color = 'black';
                if(i === 0){
                    currentLabel.innerHTML = 'Using courier';
                }          
                else if(i === 1){
                    currentLabel.innerHTML = 'Wrap like present';
                }      
            }
        });

    }
}
window.onload = AddEventListeners;