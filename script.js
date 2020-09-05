const words = [
    "Hi,I am Sayanjit",
    "I am a Software developer",
    "What do you want to know??"
]

let counter = 0

sliderList = [
    ['about',0],
    ['skills',0],
    ['projects',0],
    ['contact',0]
]

let prevSlide = "";

//Initial set state for gsap
gsap.to("#cursor",{duration:0.8,opacity:0,repeat:-1});
gsap.set("#about",{opacity:0});
gsap.set("#skills",{opacity:0});
gsap.set("#projects",{opacity:0});
gsap.set("#contact",{opacity:0});
gsap.set("#about-content",{x:1000});
gsap.set("#skills-content",{x:1000});
gsap.set("#projects-content",{x:1000});
gsap.set("#contact-content",{x:1000});
gsap.set(".logo",{y:-20,opacity:0})


gsap.to(".logo",{duration:0.8,y:0,opacity:1})


function TypingAnimation(){

    let mastertl = gsap.timeline({delay:1,onComplete:function(){
        gsap.to("#about",{duration:0.5,opacity:1});
        gsap.to("#skills",{duration:0.5,opacity:1,delay:1});
        gsap.to("#projects",{duration:0.5,opacity:1,delay:2});
        gsap.to("#contact",{duration:0.5,opacity:1,delay:3});

    }});


    words.forEach(word => {
        let tl = gsap.timeline()
        if(counter !== 2 ){
            tl.to("#typewriter", {
                duration: 2, 
                text:word,
                repeat:1,
                repeatDelay:1,
                yoyo:true, 
                ease:"none"});
            counter++;
        }else{
            tl.to("#typewriter", {
                duration: 2, 
                text:word,
                ease:"none"});
            counter = 0;
        }
        mastertl.add(tl);
    })

}



//content slider handler......
function sliderHandler(section){

    gsap.to(".mynav",{duration:1,x:-250})
    
    if(section === prevSlide){
        return
    }

    sliderList.forEach(slide=>{
        if(slide[1] === 1){
                gsap.to(`#${slide[0]}-content`,{duration:1,x:1000});
        }
    })
    sum = 0;
    sliderList.forEach(slide => sum += slide[1])
    if(sum == 0){
        gsap.to(`#${section}-content`,{duration:1,x:0,onComplete:function(){
        }});  
    }else{
        gsap.to(`#${section}-content`,{duration:1,x:0,delay:0.4,onComplete:function(){
        }}); 
    }
    sliderList.forEach(slide =>{
        if(slide[0] === section){
            slide[1] = 1;
        }else{
            slide[1] = 0;
        }
    })
    prevSlide = section;
}

document.querySelector('#about').addEventListener('click',function(){sliderHandler('about')});
document.querySelector('#skills').addEventListener('click',function(){sliderHandler('skills')});
document.querySelector('#projects').addEventListener('click',function(){sliderHandler('projects')});
document.querySelector('#contact').addEventListener('click',function(){sliderHandler('contact')});

document.querySelector(".logo").addEventListener('click',function(){
    sliderList.forEach(slide=>{
        if(slide[1] === 1){
                gsap.to(`#${slide[0]}-content`,{duration:1,x:1000});
                slide[1] = 0;
        }
    })
    prevSlide = "";
    gsap.to(".mynav",{duration:1,x:0,onComplete:function(){
        document.querySelector("#typewriter").innerHTML= "";
        TypingAnimation();
    }});

    
})


//initial call on pageload
TypingAnimation()