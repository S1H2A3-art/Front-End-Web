let state = false;

//opens/closes menu
function toggleMenu(){

    let menuBar = document.getElementById("menuBar");
    let menuName = document.getElementById("menuName");

    if(!state){
        menuBar.style.display ='flex';
        menuName.style.display ='none';

        //move information panel to the right when showing menu
        if(document.getElementById("informationPanel")){
            let informationPanel = document.getElementById("informationPanel");
            if(window.innerWidth > 1380){
            informationPanel.style.left="23%";
            }       
        }

        if(document.getElementById("archiveContent")){
            let archiveContent = document.getElementById("archiveContent");
            if(window.innerWidth > 1380){
            archiveContent.style.marginLeft="23%";
            }       
        }
    
        state = true;
        let currentWindow = window.location.pathname;
        console.log(currentWindow);
        //determines which page it's currently on
        if(currentWindow.endsWith("Explorer.html")){
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
        
        if(currentWindow.endsWith("Archive.html")){
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
        if(document.getElementById("informationPanel")){
            let informationPanel = document.getElementById("informationPanel");
            informationPanel.style.left="10%";
        }
        if(document.getElementById("archiveContent")){
            let archiveContent = document.getElementById("archiveContent");
            archiveContent.style.marginLeft="10%";
        }
        state = false;
    }
    
}
