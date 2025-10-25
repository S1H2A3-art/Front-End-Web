
//show projects that contain selected concept based on project information
function showProjects(){
    if(lockMode >= 0){
        let projectsHTML =`<h3>Related Projects</h3>`;
        for(let project of concepts[lockMode].projects){
            projectsHTML += `
            <div class="project-information">
                <div class="image-container">
                <img class="icons" src="../${project.mini_icon}">
                </div>
                <div class="project-description">
                    <a class="project-title" href="${project.page}"><p><strong>${project.title}</strong></p></a>
                    <p class="category-title"> ${project.category} </p>
                    <p class="date-title"> ${project.date} </p>
                </div>
            </div>
                `
        }
        document.getElementById("projects-information").innerHTML = projectsHTML;
    }
    else{
        document.getElementById("projects-information").innerHTML = "";
    }   
}