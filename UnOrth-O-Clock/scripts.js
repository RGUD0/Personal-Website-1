function factorize(value) {
    let factors = [];
    if (value == 0) factors[0] = ["infinite"];
    else {
        for (let num = 1; num <= Math.sqrt(Math.abs(value)); num++) {
            if (value % num == 0) {
                factors.push(num)
                if (num != Math.sqrt(Math.abs(value))) factors.push(value / num);
                if (value < 0) {
                    factors.push((num*-1))
                    factors.push(((value / num)*-1));
                }
            }
        }
    }
    return factors.sort(function(a, b){return a - b});
}

function isPrime(value) {
    let factors = factorize(value);
    return factors.length == 2;
}

function turnLimit(value,limit) {
    if (value < 0 || value > limit) value = "00";
    else if (value < 10) value = "0"+value.toString();
    return value;
}

function turnPrimeLimit(value,limit) {
    if (value == 0) value = limit;
    else if (value == 1) value = limit + 1;
    return value;
}

function primeFactorize(value,limit) {
    primes = [];
    if (value < 0) primes.push(-1);
    else if (value == 0 || value == 1) primes.push("_");
    value = turnLimit(value,limit);
    let tempVal = Math.abs(value);
    let divisor = 2;
    while (tempVal > 1) {
        if (tempVal % divisor == 0 && isPrime(divisor)) {
            tempVal /= divisor;
            primes.push(divisor);
            divisor = 2;
        } else {
            divisor += 1;
        }
    }
    return primes;
}

function strSeparator(values,string) {
    let value = ""
    for (let index = 0; index < values.length - 1; index++) {
        value = value + values[index] + string
        console.log(index + " append " + values[index]);
    }
    value = value + values[values.length - 1]
    return value;
}

function getCurrentTime() {
    // hour,minute,second
    const cHMS = [];
    // current time
    const today = new Date();
    let cHour = today.getHours();
    let cMinute = today.getMinutes();
    let cSecond = today.getSeconds();
    cHMS[0] = cHour;
    cHMS[1] = cMinute;
    cHMS[2] = cSecond;
    return cHMS;
}

function getTotalTime() {
    // limits
    const hourL = 24;
    const minuteL = 60;
    const secondL = 60;
    // hour,minute,second
    const tHMS = [];
    const cHMS = getCurrentTime();
    let cHour = cHMS[0];
    let cMinute = cHMS[1];
    let cSecond = cHMS[2];
    // total time
    let tHours = cHour;
    let tMinutes = (tHours * minuteL) + cMinute;
    let tSeconds = (tMinutes * secondL) + cSecond;
    tHMS[0] = tHours;
    tHMS[1] = tMinutes;
    tHMS[2] = tSeconds;
    return tHMS;
}

function getTime() {
    // limits
    const hourL = 24;
    const minuteL = 60;
    const secondL = 60;

    // current time
    const today = new Date();
    let cHour = today.getHours();
    let cMinute = today.getMinutes();
    let cSecond = today.getSeconds();

    // total times
    let tHours = cHour;
    let tMinutes = (tHours * minuteL) + cMinute;
    let tSeconds = (tMinutes * secondL) + cSecond;

    // set clock strings
    let clockTime = turnLimit(cHour,hourL) + ":" + turnLimit(cMinute,minuteL) + ":" + turnLimit(cSecond,secondL);
    let primeClockTime = strSeparator(primeFactorize(cHour,hourL),"*") + ":" + strSeparator(primeFactorize(cMinute,minuteL),"*") + ":" + strSeparator(primeFactorize(cSecond,secondL),"*");

    // set clock times
    document.getElementById("hourF").innerHTML = strSeparator(factorize(cHour),", ");
    document.getElementById("minuteF").innerHTML = strSeparator(factorize(cMinute),", ");
    document.getElementById("secondF").innerHTML = strSeparator(factorize(cSecond),", ");
    document.getElementById("timeF").innerHTML = clockTime;
    document.getElementById("totalMinutesF").innerHTML = strSeparator(factorize(tMinutes),", ");
    document.getElementById("totalSecondsF").innerHTML = strSeparator(factorize(tSeconds),", ");

    // set prime clock time
    document.getElementById("hourPF").innerHTML = strSeparator(primeFactorize(cHour,hourL),"*");
    document.getElementById("minutePF").innerHTML = strSeparator(primeFactorize(cMinute,minuteL),"*");
    document.getElementById("secondPF").innerHTML = strSeparator(primeFactorize(cSecond,secondL),"*");
    document.getElementById("timePF").innerHTML = primeClockTime;
    document.getElementById("totalMinutesPF").innerHTML = strSeparator(primeFactorize(tMinutes),"*");
    document.getElementById("totalSecondsPF").innerHTML = strSeparator(primeFactorize(tSeconds),"*");
}


getTime();
setInterval(getTime, 1000);

function createClock(idName,width,height) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id",idName);
    canvas.setAttribute("width",width);
    canvas.setAttribute("height",height);
    canvas.setAttribute("style","border:0px solid #000000;");
    document.querySelector("#clockTarget").appendChild(canvas);
    
    console.log("Appended Canvas")
    const ctx = canvas.getContext("2d");
    // Dimensions
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const midHeight = canvasHeight/2;
    const midWidth = canvasWidth/2;
    // outerframe
    const frameWidth = 5;
    const radius = (width/2) - (frameWidth/2);

    drawClock();
    setInterval(drawClock, 1000);

    function drawClock() {
        // clear canvas
        canvas.height = height;
        // translate origin
        ctx.translate(midWidth,midHeight);
        drawSets(ctx, radius);
        drawTime(ctx, radius);
        drawFace(ctx, radius);
    }

    function drawFace(ctx, radius) {
        // Main Clock Frame
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI,false);
        ctx.strokeStyle = "black";
        ctx.lineWidth = frameWidth;
        ctx.stroke();
        // Center Dot
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, 2 * Math.PI,false);
        ctx.fillStyle = "black";
        ctx.fill();
    }
                        
    function drawSets(ctx, radius) {
        const hourScalar = 0.88;
        const minSecScalar = 0.60;
        drawNumbers(ctx, radius, 24, hourScalar, 20, 1);
        drawNumbers(ctx, radius, 60, minSecScalar, 15, 5);
    }

    function drawNumbers(ctx, radius, count, scale, fontSize, multiple) {
        for(let index = 0; index < (count/multiple); index++) {
            // Number Positions
            let numAngle = ((2*Math.PI)/(count/multiple)) * index;
            let oneShift = (2 * Math.PI)/(count/multiple);
            let trueAngle = numAngle - (Math.PI/2) + oneShift;
            let xWidth = (scale * radius * Math.cos(trueAngle));
            let yHeight = (scale * radius * Math.sin(trueAngle)) + (fontSize/3);
            // Numbers
            ctx.font = fontSize.toString() + "px Arial";
            ctx.textAlign = "center";
            ctx.fillText(((index + 1)*multiple).toString(),xWidth,yHeight);
        }
    }

    function drawTime(ctx, radius) {
         // hand scalars
        const secondScalar = 0.93;
        const minuteScalar = 0.60; // 0.80
        const hourScalar = 0.60;
        // current times
        const now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        // angles: second, minute, hour
        let secondAngle = (second * ((2 * Math.PI)/60));
        let minuteAngle = (minute * ((2 * Math.PI)/60)) + (second * ((2 * Math.PI)/(60*60)));
        let hourAngle = (hour * ((2 * Math.PI)/24)) + (minute * ((2 * Math.PI)/(24*60))) + (second * ((2 * Math.PI)/(24 * 60*60)));
        // hand lengths: second, minute, hour
        let secondHLength = radius * secondScalar;
        let minuteHLength = radius * minuteScalar;
        let hourHLength = radius * hourScalar;
        // draw hands
        drawHand(ctx, secondAngle, hourHLength, 10, "red");
        drawHand(ctx, minuteAngle, minuteHLength, 6, "black");
        drawHand(ctx, hourAngle, secondHLength, 3, "black");
    }
                        
    function drawHand(ctx, angle, length, width, color) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.moveTo(0,0);
        ctx.rotate(angle);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-angle);
    }
}



/*
function isPrime(value) {
    var prime = true;
    if (value < 2) {
        prime = false;
    } else {
        switch(value%10) {
            case 1: case 3: case 7: case 9:
                for (let num = 2; num <= Math.sqrt(Math.abs(value)); num++) {
                    if (value % num == 0) {
                        prime = false;
                        break;
                    }
                }
            break;
            default:
                prime = false;
            break;
        }
    }
    return prime;
}


const hours = 24;
const minutes = 60;
const seconds = 60;

var thours = 24;
var tminutes = thours * minutes;
var tseconds = tminutes * seconds;

// Log to console
console.log(message)

console.log(thours)
for (let x = 1; x <= thours + 1; x++) {
    if (isPrime(x)) {
        console.log(x)
    }
}

console.log(tminutes)
for (let x = 1; x <= tminutes + 1; x++) {
    if (isPrime(x)) {
        console.log(x)
    }
}

console.log(tseconds)
for (let x = 1; x <= tseconds + 1; x++) {
    if (isPrime(x)) {
        console.log(x)
    }
}
*/