// requires taroutils.js

const cursor = $(".tarocursor")
let curMiddle = 12
const textTags = ["H1", "H2", "H3", "P", "SPAN"]

html.onmousemove = event => {
    let pos = {x: event.clientX - curMiddle, y: event.clientY - curMiddle}
    let target = event.target

    cursor.style.setProperty("left", `${pos.x}px`)
    cursor.style.setProperty("top", `${pos.y}px`)

    if (textTags.includes(target.tagName) && window.getComputedStyle(target, null).userSelect !== "none") {
        cursor.classList.add("text")
        cursor.classList.remove("link")
    } else if (target.tagName == "A") {
        cursor.classList.add("link")
    } else {
        cursor.classList.remove("text")
        cursor.classList.remove("link")
    }
}

html.onmousedown = () => cursor.classList.add("down")

html.onmouseup = () => cursor.classList.remove("down")

/* Foireux window.onwheel = event => {
    if (window.scrollY < $("header").offsetHeight && event.deltaY >= 0) $("main").scrollIntoView({behavior: "smooth"})
    if (window.scrollY > $("header").offsetHeight && event.deltaY != 0) {
        window.scrollTo(0, 0, {behavior: "smooth"})
        log()
    }
}*/

body.onscroll = () => {
    let scrRatio = {
        positive: window.scrollY / $("header").offsetHeight,
        negative: 1 + (window.scrollY / $("header").offsetHeight) * -1
    }

    if (scrRatio.positive > 1) scrRatio.positive = 1
    if (scrRatio.negative < 0) scrRatio.negative = 0

    $(".tarocursor").style.opacity = scrRatio.positive + .1
    $$("header *:not(.symbol)")[0].style.opacity = scrRatio.negative
    $$("header *:not(.symbol)")[1].style.opacity = scrRatio.negative
    $$("header *:not(.symbol)")[1].style.transform = `translateY(${scrRatio.positive * 32}px)`
    $("header .symbol").style.opacity = scrRatio.negative + .1
    $("header .symbol").style.transform = `translateY(${scrRatio.positive * 64}px) scale(${1 + scrRatio.positive}) rotate(${360 * window.scrollY / 2e3}deg)`
    // inutile $("header").style.pointerEvents = Math.floor(scrRatio.negative) ? "none" : "all"

}
