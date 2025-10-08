let state = false;

//opens/closes menu
function toggleMenu(){

    let menuBar = document.getElementById("menu-bar");
    let menuName = document.getElementById("menuName");

    if(!state){
        menuBar.style.display ='flex';
        menuName.style.display ='none';

        //move information panel to the right when showing menu
        if(document.getElementById("information-panel")){
            let informationPanel = document.getElementById("information-panel");
            if(window.innerWidth > 1380){
            informationPanel.style.left="17%";
            }       
        }

        state = true;
        let currentWindow = window.location.href;

        //determines which page it's currently on
        if(currentWindow == "https://s1h2a3-art.github.io/Front-End-Web/Midterm/Navigation_Page/Explorer.html"){
            let navigationPage = document.getElementById("Navigation_Page");
            navigationPage.innerHTML = `
            <a>Navigator</a>
            <div class="circle"> </div>
            `
        }else{
            let navigationPage = document.getElementById("Navigation_Page");
            navigationPage.innerHTML = `
            <a href="../Navigation_Page/Explorer.html">Navigator</a>
            `
        }
        
        if(currentWindow == "https://s1h2a3-art.github.io/Front-End-Web/Midterm/Archive_Page/Archive.html"){
            let archivePage = document.getElementById("Archive_Page");
            archivePage.innerHTML = `
            <a>Archive</a>
            <div class="circle"> </div>
            `
        }else{
            let archivePage = document.getElementById("Archive_Page");
            archivePage.innerHTML = `
            <a href="../Archive_Page/Archive.html">Archive</a>
            `
        }

    }else{//close it
        menuBar.style.display ='none';
        menuName.style.display ='block';
        if(document.getElementById("information-panel")){
            let informationPanel = document.getElementById("information-panel");
            informationPanel.style.left="3%";
        }
        state = false;
    }
    
}