//class picker aangemaakt
class Picker {
    constructor(target, width, height) {
        this.target = target;
        this.width = width;
        this.height = height;
        this.target.width = width;
        this.target.height = height;
        //get context
        this.context = this.target.getContext("2d");
        //circle, maakt circle aan
        this.pickerCircle = { x: 10, y: 10, width: 7, height: 7 };

        this.listenForEvents();
    }
// draws de gradient box
    draw() {
        this.build();
    }
//maakt gradient box
    build() {
        let gradient = this.context.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, "rgba(255,0,0)");
        gradient.addColorStop(0.15, "rgba(255,0,255)");
        gradient.addColorStop(0.33, "rgba(0,0,255)");
        gradient.addColorStop(0.49, "rgba(0,255,255)");
        gradient.addColorStop(0.67, "rgba(0,255,0)");
        gradient.addColorStop(0.84, "rgba(255,255,0)");
        gradient.addColorStop(1, "rgba(255,0,0)");

        //fill, gradient filler
        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, this.height);

        //black and white
        gradient = this.context.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(0.1, "rgba(0, 0 ,0 , 1)");
        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, this.height);

        //circle
        this.context.beginPath();
        this.context.arc(
            this.pickerCircle.x,
            this.pickerCircle.y,
            this.pickerCircle.width,
            0,
            Math.PI * 2
        );
        this.context.strokeStyle = "black";
        this.context.stroke();
        this.context.closePath();
    }
//kijkt of events uitgevoert worden
    listenForEvents() {
        let isMouseDown = false;
        const onMouseDown = (e) => {
            let currentX = e.clientX - this.target.offsetLeft;
            let currentY = e.clientY - this.target.offsetTop;
            if(currentY > this.pickerCircle.y && currentY <
            this.pickerCircle.y + this.pickerCircle.width && currentX >
            this.pickerCircle.x && currentX < this.pickerCircle.x +
                this.pickerCircle.width){
                isMouseDown = true;
            } else {
                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;
            }

        }
        const onMouseMove = (e) => {
            if(isMouseDown) {
                let currentX = e.clientX - this.target.offsetLeft;
                let currentY = e.clientY - this.target.offsetTop;
                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;
            }
        }


// als mouse up true is, is mouse down false
        const onMouseUp = () => {
            isMouseDown = false;

        }

        //register events, kijks of mouse beweegt of is gedrukt
        this.target.addEventListener('mousedown', onMouseDown);
        this.target.addEventListener("mousemove", onMouseMove);
        this.target.addEventListener("mousemove", () =>
            this.onChangeCallback(this.getPickedColor()));

        document.addEventListener("mouseup", onMouseUp);
    }
    //get color from color picker
    getPickedColor(){
        let imageData = this.context.getImageData(
            this.pickerCircle.x, this.pickerCircle.y, 1, 1);
            return { r: imageData.data[0], g: imageData.data[1],
            b: imageData.data[2]};
    }

    onChange(callback) {
        this.onChangeCallback = callback;
    }

}

let picker = new Picker(document.getElementById("color-picker"), 250, 220);

//draw
setInterval(() => picker.draw(), 1);

picker.onChange((color) => {
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${color.r}, ${color.g},
    ${color.b})`; }
);


