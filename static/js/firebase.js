// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAnNsFsJAEV-uPujv6SLlriCFNkcwXUqHU",
    authDomain: "shaantalk-b0a9a.firebaseapp.com",
    databaseURL: "https://shaantalk-b0a9a.firebaseio.com",
    projectId: "shaantalk-b0a9a",
    storageBucket: "",
    messagingSenderId: "1062088881012",
    appId: "1:1062088881012:web:e78e234475d4e55b837221"
};

//Initialize Firebase
var FireBaseProject = firebase.initializeApp(firebaseConfig);
var defaultStorage = firebase.storage();
var database = firebase.database();

renderPage();

function renderPage() {

    //About Quote section
    database.ref('/').once('value', () => {
        $('.preloader').show()
    }).then(
        (snapshot) => {
            if (snapshot.exists()) {

                $('.preloader').fadeOut(500);

                var dbSnapshot = snapshot.val()

                renderAboutMeQuote(dbSnapshot.Others.aboutMeQuote)

                renderSkillsSection(dbSnapshot.Skills);

                renderProjectSection(dbSnapshot.Projects, dbSnapshot.Others.projectIcons);
            }
        }
    )
}

function renderAboutMeQuote(strAboutMeQuote) {

    console.log(strAboutMeQuote)

    document.getElementById('aboutMeQuote').innerHTML += strAboutMeQuote;
}

function renderSkillsSection(jsonSkills) {

    skillContent = "";

    for (key in jsonSkills) {

        var currSkill = jsonSkills[key].skillName;
        var currSkillCoverage = jsonSkills[key].coverage;

        skillContent += `<div class="skillbar skill-item" style="margin-top: 25px;" data-percent="` + currSkillCoverage + `%">
                                    <div class="skillbar-title skill-title">` + currSkill + `</div>
                                    <div class="skill-bar-percent skill-percentage">` + currSkillCoverage + `%</div>
                                    <div class="skillbar-bar bar progress-line" style="width: ` + currSkillCoverage + `%;"></div>
                                </div>`;
    }
    document.getElementById('skillsContainer').innerHTML += skillContent;
}



function renderProjectSection(jsonProjects, jsonIcons) {

    projectContent = "";

    for (key in jsonProjects) {

        var currProjectName = jsonProjects[key].projectName;
        var currGithubLink = jsonProjects[key].githubLink;
        var currProjectDescription = jsonProjects[key].projectDescription;

        var currProjectType = jsonProjects[key].projectType;
        var currIcon = jsonIcons[currProjectType];

        projectContent += `<div class="col-lg-4 col-md-6 col-sm-8 d-flex">
                                <div class="single-service text-center mt-30">
                                    <div class="service-icon">` + currIcon + `</div>
                                    <div class="service-content flex-fill">
                                        <h4 class="service-title"><a href="` + currGithubLink + `" target="_blank">` + currProjectName + `</a></h4>
                                        <p>` + currProjectDescription + `</p>
                                    </div>
                                </div>
                                <!-- single project -->
                            </div>`;
    }
    document.getElementById('projectsContainer').innerHTML += projectContent;
}