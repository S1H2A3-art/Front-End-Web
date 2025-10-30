 function preload(){
    projectInformation = loadJSON("../Projects/projectInformation.json", processProjectsInformation);
 }

 function setup(){
   projects.sort((a, b) => new Date(b.date) - new Date(a.date));

   for(let project of projects){
      if(project.title){
         let projectContent = ""; 
         
         projectContent += `

         <div class = "project">
            <div class = "projectInformation">
               <a href = "../${project.page}?project=${encodeURIComponent(project.title)}"><h1>${project.title} - ${project.secondary_title}</h1></a>
               <p class = "projectDate"><i>${project.date}</i>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${project.category}</p>
               <p>${project.description}</p>         
                  
            <div class = "projectConcepts">
         `
         for(let concept of project.concepts){
            projectContent += `
               <a class = "conceptTag" href = "../Navigation_Page/Explorer.html?concept=${encodeURIComponent(concept)}">
                  ${concept}
               </a>   
            `
         }

         projectContent += `
            </div>
            
            </div> 
            
            <!--<img src = "../${project.mini_icon}" width="600*0.3" height="400*0.3" style="margin-left:2rem">-->
         
            <div class = "space">
               placeholder
            </div>
         </div> 
         `


         archiveContent.innerHTML += projectContent;
      }
   }
   
 }