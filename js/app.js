/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let nav_list = document.getElementById("navbar__list")
let section_list = document.querySelectorAll('section')
let defaultVisible = document.querySelector('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// returns the currently visible section
let getVisibleSection= ()=>{    
    let visibleSection = defaultVisible;
    let minorHeight = window.innerHeight
    section_list.forEach((section)=> {
        let offset = section.getBoundingClientRect();
        if(Math.abs(offset.top) < minorHeight){
            minorHeight   = Math.abs(offset.top);
            visibleSection = section;
        }
    });
    return visibleSection;
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav dynamically from existing items
let buildTheNav = ()=>{
        for(let i of section_list){            
        let li = document.createElement('li')
        li.className = 'menu__link';
        li.setAttribute("data-navigation", i.id);
        let section_link = document.createElement('a')
        // section_link.href = `#${i.id}`
        section_link.textContent = i.firstElementChild.firstElementChild.textContent
        console.log(i.firstElementChild.firstElementChild.textContent)
        li.appendChild(section_link)
        nav_list.appendChild(li)
    }
}

// Add class 'active' to section when near top of viewport
let setActive = ()=>{
    document.addEventListener('scroll',function(event){
        document.querySelectorAll('.your-active-class').forEach((old_active_item)=>{
            old_active_item.classList.remove('your-active-class')
            // remove active header class
            document.querySelector(`li[data-navigation="${old_active_item.id}"]`).classList.remove('active-nav')
        })
        // add active status to the selected classes
        let activeItem = getVisibleSection()
        activeItem.classList.add('your-active-class')

        document.querySelector(`li[data-navigation="${activeItem.id}"]`).classList.add('active-nav')
    })
}


// Scroll to anchor ID using scrollTO event
let scrollToId = ()=>{
    nav_list.childNodes.forEach((nav_list_item)=>{
        nav_list_item.addEventListener('click',function(event){
            document.getElementById(nav_list_item.getAttribute('data-navigation')).scrollIntoView();
        })
    })
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildTheNav()

// Scroll to section on link click
scrollToId()

// Set sections as active
setActive()