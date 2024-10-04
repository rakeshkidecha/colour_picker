let pick_color = document.querySelector("#pick_color");
let show_color = document.querySelector("#showColor");
let showHexaCode = document.querySelector("#showHexaCode");
let showRgbCode = document.querySelector("#showRgbCode");
let errorMsg = document.querySelector("#error");
let opacityRange = document.querySelector("#opacityRange");
let color;

async function color_picker() {
    if (!window.EyeDropper) {
        errorMsg.innerHTML = "Your browser does not support the EyeDropper API";
        return;
    }
    
    const eyeDropper = new EyeDropper();
    await eyeDropper.open()
        .then((result) => {
            color = result.sRGBHex;
        })
        .catch((error) => {
            errorMsg.innerHTML = error;
        });
    displayColorcode();
}


function displayColorcode() {
    opacityRange.value=100;
    console.log(color);
    let rgb = [];
    show_color.style.backgroundColor = color;
    showHexaCode.innerHTML = color;

    for (let i = 1; i < color.length; i += 2) {
        rgb.push(parseInt(color[i] + color[i + 1], 16));
    }
    showRgbCode.innerHTML = `rgb(${rgb.join(", ")})`;

    opacityRange.style.display = "block";
    document.querySelector("#opacityLable").style.display = "block";
}

function rgbOpacityToHex(rgbArray, opacity) {
    const alpha = Math.round((opacity / 100) * 255);
    
    let newRgbArray = rgbArray.map((value)=>{
        return value.toString(16).padStart(2, '0').toUpperCase();
    })

    let alphacode = alpha.toString(16).padStart(2, '0').toUpperCase();

    return newRgbArray.join('') + alphacode;
}


opacityRange.addEventListener("change", () => {
    let opacityValue = opacityRange.value;
    console.log(`Opacity Value: ${opacityValue}`);
    
    let rgb = [];
    for (let i = 1; i < color.length; i += 2) {
        rgb.push(parseInt(color[i] + color[i + 1], 16));
    }
    
    showRgbCode.innerHTML = `rgb(${rgb.join(", ")} / ${opacityValue}%)`;
    
    let hexaOpacity = rgbOpacityToHex(rgb, opacityValue);
    showHexaCode.innerHTML = `#${hexaOpacity}`;
    

    show_color.style.backgroundColor =  `#${hexaOpacity}`;
});


showHexaCode.addEventListener("click", () => {
    navigator.clipboard.writeText(showHexaCode.innerHTML);
    showHexaCode.innerHTML = "Copied!..";
});


showRgbCode.addEventListener("click", () => {
    navigator.clipboard.writeText(showRgbCode.innerHTML);
    showRgbCode.innerHTML = "Copied!..";
});

pick_color.addEventListener("click", color_picker);
