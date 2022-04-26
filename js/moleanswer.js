let score = 0;
const maxScore = 20;

function getSadInterval(){
    return Date.now() + 1000;
}

function getLeavingInterval(){
    return Date.now() + 1000;
}

function getGoneInterval(){
    return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInretval(){
    return Date.now() + 2000;
}

function getKingStatus(){
    return Math.random() > 0.9;
}

const moles = [
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-0")
        //node: document.querySelector("#hole-0");
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-1")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-2")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-3")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-4"),
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-5"),
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-6")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-7")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-8")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-9")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-10")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-11")
    }
]

function getNextStatus(mole) {
    switch (mole.status) {
        case "sad":
        case "fed":
            mole.next = getLeavingInterval();
            mole.status = "leaving";
            if (mole.king) {
                mole.node.children[0].src = "img/king-mole-leaving.png";
            } else {
                mole.node.children[0].src = "img/mole-leaving.png";
            }
            break;
        case "leaving":
            mole.next = getGoneInterval();
            mole.status = "gone";
            mole.node.children[0].classList.add("gone");
            break;
        case "gone":
            mole.next = getHungryInretval();
            mole.king = getKingStatus();
            mole.status = "hungry";
            if (mole.king) {
                mole.node.children[0].src = "img/king-mole-hungry.png";
            } else {
                mole.node.children[0].src = "img/mole-hungry.png";
            }
            mole.node.children[0].classList.add("hungry");
            mole.node.children[0].classList.remove("gone");
            break;
        case "hungry":
            mole.next = getSadInterval();
            mole.status = "sad";
            if (mole.king) {
                mole.node.children[0].src = "img/king-mole-sad.png";
            } else {
                mole.node.children[0].src = "img/mole-sad.png";
            }
            mole.node.children[0].classList.remove("hungry");
            break;
    }
}

function feed (event) {
    if (event.target.tagName !== "IMG" || !event.target.classList.contains("hungry")) {
        document.querySelector(".midfing").classList.remove("hide");
        setTimeout(function(){
            document.querySelector(".midfing").classList.add("hide");
        }, 1500);
    }

    const mole = moles[parseInt(event.target.dataset.index)]

    mole.next = getLeavingInterval();
    mole.status = "fed";
    if (mole.king) {
        mole.node.children[0].src = "img/king-mole-fed.png";
    } else {
        mole.node.children[0].src = "img/mole-fed.png";
    }
    mole.node.children[0].classList.remove("hungry");

    if (mole.king) {
        score += 2;
    } else {
        score++;
    }

    console.log(score);

    if (score >= maxScore) {
        win();
    }

    document.querySelector(".worm-container").style.width = `${(100/maxScore) * score}%`;
}

function win() {
    document.querySelector(".bg").classList.add("hide");
    document.querySelector(".win").classList.remove("hide");
    document.querySelector(".body").style.cursor = "default";
}

let runAgainAt = Date.now() + 100;
function nextFrame () {
    const now = Date.now();

    if (runAgainAt <= now) {
        for (let i = 0; i < moles.length; i++) {
            if (moles[i].next <= now) {
                getNextStatus(moles[i]);
            }
        }
        runAgainAt = now + 100;
    }
    requestAnimationFrame(nextFrame); 
}

document.querySelector(".bg").addEventListener("click", feed);

nextFrame();