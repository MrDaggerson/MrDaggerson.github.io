const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector(".breeds");
const img = document.querySelector(".dog-img");


fetch(BREEDS_URL)
.then(function(response){
    return response.json();
})
.then(function(data){
    const breedsObject = data.message;
    const breedsArray = Object.keys(breedsObject);
    
    for (let i = 0; i < breedsArray.length; i++) {
        const option = document.createElement("option");
        option.value = breedsArray[i];
        option.innerText = breedsArray[i];
        select.appendChild(option);
    }
});

select.addEventListener("change", function(event) {
    const url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
    document.querySelector(".doggos").classList.remove("active");
    document.querySelector(".spin").classList.add("active");

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        img.src = data.message;
    })

    img.addEventListener("load", function(loadimg){
        document.querySelector(".spin").classList.remove("active");
        document.querySelector(".doggos").classList.add("active");
    })
});

const { styler, spring, listen, pointer, value } = window.popmotion;

const ball = document.querySelector('.dog-img');
const divStyler = styler(ball);
const ballXY = value({ x: 0, y: 0 }, divStyler.set);

listen(ball, 'mousedown touchstart')
.start((e) => {
    e.preventDefault();
    pointer(ballXY.get()).start(ballXY);
});

listen(document, 'mouseup touchend')
.start(() => {
    spring({
    from: ballXY.get(),
    velocity: ballXY.getVelocity(),
    to: { x: 0, y: 0 },
    stiffness: 200,
    mass: 1,
    damping: 5,
    }).start(ballXY);
});



