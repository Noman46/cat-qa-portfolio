burgerButton.addEventListener('click', function(){
    let toggelCount = 0;
    function toggleNavBar() {
        if(toggelCount%2 === 0){
            document.getElementById("myNav").style.width = "100%";
        }
        else{
            document.getElementById("myNav").style.width = "0%";
        }
        toggelCount = toggelCount+1
    }
    
})