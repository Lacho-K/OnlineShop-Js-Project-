function AddEventListeners() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    let labels = document.getElementsByClassName('CheckboxLabel');

    for (let i = 0; i < checkboxes.length; i++) { 
        checkboxes[i].addEventListener('click', function(){
            if(this.checked){
                labels[i].style.color = 'green';
                labels[i].innerHTML = '+ 1.20лв.';
            }
            else{
                labels[i].style.color = 'black';
                if(i === 0){
                    labels[i].innerHTML = 'Using courier';
                }          
                else if(i === 1){
                    labels[i].innerHTML = 'Wrap like present';
                }      
            }
        });
    }
}
window.onload = AddEventListeners;