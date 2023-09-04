//##########################################################################################################################################################
// section global function 

// create Function to Handle code Active

function handleActive(event) {
    event.target.parentElement.querySelectorAll(".active").forEach((el) => {
        el.classList.remove("active");
    });
    event.target.classList.add("active");
}

// create function to  handle code scroll
function scrollToSections(element) {
    element.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
};
//##########################################################################################################################################################
// section about event click on icon setting

document.querySelector(".setting-box .icon-setting .setting").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
};

//##########################################################################################################################################################
// Control color in website

// select all element li and but in array
let listColor = document.querySelectorAll(".color-list li");
let localColor = localStorage.getItem("color_option");
// make loop on all element li
listColor.forEach((li) => {
    // set event click on all element li
    li.addEventListener("click", (e) =>{
        // make loop agin on all element li because remove class active
        handleActive(e)
        // set color on variable root in css
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        // set color on local storage 
        localStorage.setItem("color_option", e.target.dataset.color);
        // set class active on li clicked
        
    });
});
// create local Storage to change color
if(localColor !== null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));
    listColor.forEach((el) => {
        el.classList.remove("active");
        if(el.dataset.color === localColor){
            el.classList.add("active");
        };
    });
};

//##########################################################################################################################################################
// control background image in landing page

// select all element span in box setting in btn change
let btnControl = document.querySelectorAll(".btn-change span");
let allImage = document.querySelectorAll(".select-background span");
let localBackground = localStorage.getItem("background_option");
let localBackgroundSelected = localStorage.getItem("select_background");
let backgroundOption;
let backgroundInterval;

btnControl.forEach((span) => {

    span.addEventListener("click", (e) =>{

        handleActive(e);

        if(e.target.dataset.background === "yes"){
            backgroundOption = true;
            randomizeBackground();
            document.querySelector(".select-background").classList.remove("active");
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            document.querySelector(".select-background").classList.add("active");
            localStorage.setItem("background_option", false);

            
        };
    });
});

// part select-background in setting-box
allImage.forEach((image) => {

    image.addEventListener("click", (e) => {
        
        handleActive(e);

        let dataImg = e.target.dataset.img;
        document.querySelector(".landing-page").style.backgroundImage = `url("../image/${dataImg}")`;
        localStorage.setItem("select_background", dataImg);
    });
});

// part local storage to change background
// check local storage empty or No
if(localBackground !== null) {
    btnControl.forEach((elSpan) => {
        elSpan.classList.remove("active");
    });
    if(localBackground === "true"){
        backgroundOption = true;
        document.querySelector(".btn-change .yes").classList.add("active");

    }else{
        backgroundOption = false;
        document.querySelector(".btn-change .no").classList.add("active");
        document.querySelector(".select-background").classList.add("active");
        
        allImage.forEach(img => {
            img.classList.remove("active");
            if(img.dataset.img == localBackgroundSelected){
                img.classList.add("active");
                document.querySelector(".landing-page").style.backgroundImage = `url("../image/${localBackgroundSelected}")`;
            }
        });
    };
};
//######################################################################################
// section about change background image landing page
let landingPage = document.querySelector(".landing-page");
let landingBackGround = ["10.jpg", "20.jpg", "30.jpg", "40.jpg", "50.jpg"];
function randomizeBackground() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * landingBackGround.length);
            landingPage.style.backgroundImage = `url("../image/${landingBackGround[randomNumber]}")`;
        }, 5000);
    };
};
randomizeBackground();

//##########################################################################################################################################################
// section about move progress in section Our-Skills

let skills = document.querySelector(".skills");
window.onscroll = function () {
    let skillsOffsetTop = skills.offsetTop;
    let skillOuterHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.scrollY;

    if(windowScrollTop > (skillsOffsetTop + skillOuterHeight - windowHeight) - 200) {
        let allSkills = document.querySelectorAll(".skills .skill-box .skill-progress span");
        allSkills.forEach((skill => {
            skill.style.width = skill.dataset.progress;
        }));
    };
};
//##########################################################################################################################################################
// section about Gallery 

let allImages = document.querySelectorAll(".gallery .image-box img");

allImages.forEach((image) => {
    image.addEventListener("click", (e) => {

        //create overlay Div 
        let popupOverlay = document.createElement("div");
        popupOverlay.className = "popup-overlay";
        document.body.appendChild(popupOverlay);

        // create popup image box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        //create title of image 
        if (image.alt !== null) {
            let titleHeading = document.createElement("h3");
            let textTitle = document.createTextNode(image.alt);
            titleHeading.appendChild(textTitle);
            popupBox.appendChild(titleHeading);
        }
        // create image in side popup Box
        let popupImg = document.createElement("img");
        popupImg.src = image.src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);
        // create button to close popup 
        let closeBtn = document.createElement("span")
        closeBtn.className = "close-btn";
        let textCloseBtn = document.createTextNode('X');
        closeBtn.appendChild(textCloseBtn);
        popupBox.appendChild(closeBtn);
    });
});

document.addEventListener("click", (e) =>{
    if(e.target.className == "close-btn") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});
//##########################################################################################################################################################
// section about bullets 

let allBullets = document.querySelectorAll(".nav-bullets .bullet");

let allLinks = document.querySelectorAll(".links a");

scrollToSections(allBullets);
scrollToSections(allLinks);

//##########################################################################################################################################################

// section about control bullets in setting-box

let bullets = document.querySelectorAll(".setting-option .bullet-change span");
let bulletsContainer = document.querySelector(".nav-bullets");
let localBullets = localStorage.getItem("bullets-option");


bullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
        if (e.target.dataset.display == "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets-option", "block")
        }else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets-option", "none")
        }
        handleActive(e);
    });
});

// part localStorage control bullets
if (localBullets !== null) {

    bullets.forEach(el => {
        el.classList.remove("active");
    });

    if(localBullets === "block"){
        bulletsContainer.style.display = "block";
        document.querySelector(".setting-option .bullet-change .yes").classList.add("active");
    }else {
        bulletsContainer.style.display = "none";
        document.querySelector(".setting-option .bullet-change .no").classList.add("active");
    };
};
//##########################################################################################################################################################
// section button reset setting box with setting website
document.querySelector(".btn-reset").onclick = function () {
    localStorage.clear();
    window.location.reload();
};

//##########################################################################################################################################################
// section toggle menu in responsive 

let toggle = document.querySelector(".toggle-btn");
let menuLinks = document.querySelector(".links");

menuLinks.onclick = function (e) {
    e.stopPropagation();
}
toggle.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    menuLinks.classList.toggle("open");
};

document.body.addEventListener('click', (e) => {
    if (e.target !== toggle && e.target !== menuLinks){
        menuLinks.classList.remove("open");
        toggle.classList.remove("menu-active");
    }
});