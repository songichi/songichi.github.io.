

var r = document.querySelector(':root');

//declaring class
class group{
    constructor(image, color, colorS, quote, source, date){
        this.image = image;
        this.color = color;
        this.colorS = colorS;
        this.quote = quote;
        this.source = source;
        this.date = date;
    }
}
var groupList = [];

//adding new files
CreateNewGroup(
    "天人五衰", "type/tenningosui.png",
    "#ce1906", "#ffffff",
    "天人の五衰も目の前に見えてあさましや",
    "———『天人五衰』三島由紀夫",
    new Date(2022, 10, 4,     0, 0, 0, 0)
)
CreateNewGroup(
    "觀自在菩薩", "type/guanzizai.png",
    "#153513", "#ffffff",
    "觀自在菩薩，行深般若波羅蜜多時",
    "———『心經』",
    new Date(2022, 10, 4,     0, 0, 0, 0)
)
CreateNewGroup(
    "國殤", "type/guoshang.png",
    "#11f7af", "#000000",
    "操吳戈兮被犀甲，車錯轂兮短兵接",
    "———『國殤』屈原",
    new Date(2022, 10, 4,     0, 0, 0, 0)
)
CreateNewGroup(
    "濃妝淡抹", "type/nongzhuangdanmo.png",
    "#f7f5e2", "#f25e2f",
    "欲把西湖比西子，淡妝濃抹總相宜",
    "———『飲湖上初晴後雨二首·其二』蘇軾",
    new Date(2022, 10, 4,     0, 0, 0, 0)
)

//priting last element in the groupList array

var recent;
var newRecent;
console.log(recent);

//checking if the user is visiting this page the first time
if(sessionStorage.getItem("recentColor") == null){
    console.log("WELCOME");
    recent = groupList[0];
}
else{
    var p = sessionStorage.getItem("recentColor");
    var s = sessionStorage.getItem("recentColorS");
    var selectedGroup = groupList.find(
        item => item.color == p && item.colorS == s);
    recent = selectedGroup;
}

//for homepage
try{
    LoadHomepage();

    //adding eventlistener to button
    document.getElementById('homepageBtn').addEventListener('click',
        function() {
    
        Reroll();
        //document.getElementById('homepageBtn').style.scale = "1";
    });
}
catch{}

//on other pages
try{

    document.getElementById('homeBtnText').textContent = recent.name;
    //document.getElementById('homeBtnText').textContent = recent.name[0];
    
    document.getElementById('homeBtn').addEventListener('mouseover',
        function() {
    //document.getElementById('home').style.backgroundColor = "#ffffff";
        document.getElementById('homeBtn').style.scale = "1.5";
        var homeBtnText = document.getElementById('homeBtnText');
        homeBtnText.style.left = "0";
        homeBtnText.style.letterSpacing = "-0.6vw";
        homeBtnText.style.fontSize = "4.4vw";
        homeBtn.style.padding = "0px 0px";
        });

    document.getElementById('homeBtn').addEventListener('mouseleave',
        function() {
    //document.getElementById('home').style.backgroundColor = recent.color;
        document.getElementById('homeBtn').style.scale = "1";
        document.getElementById('homeBtnText').style.left = "-2.5vw";
        document.getElementById('homeBtnText').style.letterSpacing = "-5vw";
        homeBtnText.style.fontSize = "5vw";
        homeBtn.style.padding = "1vw 5vw";
    });
    
}
catch{}

function CreateNewGroup(name, image, color, colorS, quote, source, date){
    var newGroup = new group(
        image, color, colorS, quote, source, date
    )
    newGroup.name = name;
    groupList.push(newGroup);
}

function LoadHomepage(){
    //setting transition
    var transitionDelay = 300;
    document.getElementById('homepageGroup').style.transition = transitionDelay + "ms";
    //set transition
    document.getElementById('homepageImage').style.transition = "none";
    document.getElementById('homepageImage').style.opacity = "0%";
    document.getElementById('homepageImage').src = recent.image;
    
    document.getElementById('homepageGroup').style.background = recent.color;
    document.getElementById('homepageQuote').textContent = recent.quote;
    document.getElementById('homepageQuote').style.color = recent.colorS;
    document.getElementById('homepageSource').textContent = recent.source;
    document.getElementById('homepageSource').style.color = recent.colorS;
    document.getElementById('homepageFooter').textContent = 
        recent.name + " 更新于 " + recent.date.toDateString();

    //testing to change all ui's color
    r.style.setProperty('--primaryColor', recent.color);
    r.style.setProperty('--secondaryColor', recent.colorS);

    //delay changing image, otherwise there will be an ungly box
    
    document.getElementById('homepageImage').addEventListener("load", () => {
        //document.getElementById('homepageImage').style.transition = "800ms";
        //document.getElementById('homepageImage').style.opacity = "100%";
        setTimeout(() => {
            document.getElementById('homepageImage').style.transition = "800ms";
            document.getElementById('homepageImage').style.opacity = "100%";
          }, transitionDelay)
    });

    
}



function Reroll(){
    
    //document.getElementById('homepageImage').src = "type/blank.png";
    
    //newRecent = null;
    var rnd = Math.floor(Math.random() * groupList.length)
    var newRecent = groupList[rnd];
    while(recent == newRecent){
        rnd = Math.floor(Math.random() * groupList.length)
        newRecent = groupList[rnd];
    }
    
    recent = newRecent;
    LoadHomepage();

    //save "recent" data
    var primaryColor = recent.color;
    var secondaryColor = recent.colorS;
    sessionStorage.setItem("recentColor", primaryColor);
    sessionStorage.setItem("recentColorS", secondaryColor);

}
//don't know if these actually work
preloadImages();
function preloadImages(){
    groupList.forEach(function(g){
        var img = new Image();
        img.src = g.image;
    });
}

export var primaryColor = recent.color;
export var secondaryColor = recent.colorS;
export var groupList;
export var recent;





//export var primaryColor = recent.color;

/*
//GetImageColors();
function GetImageColors(){
    //for testing
    groupList[0].color = "#111111";


    const img = new Image();
    img.src = "./type/tenningosui.png";
    console.log(img);
    const cvs = document.getElementById("canvas");
    const ctx = cvs.getContext("2d");
    img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0, 3, 3, 0, 0, 20, 20);
        img.style.display = "none";
        cvs.display = "none";
        var pixel = ctx.getImageData( 1, 1, 1, 1);
        var data = pixel.data;
        console.log(data);
    });

    
    groupList[0].color;
    LoadHomepage();
}*/