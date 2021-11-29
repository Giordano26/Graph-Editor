var image

function upload(){
    var fileinput = document.getElementById("finput");


    image = new SimpleImage(fileinput)

    var canvas = document.getElementById("can");


    image.drawTo(canvas);

   
} 

function makeGray(){
    
    for(let pixel of image.values()){
        let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;

        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }

    var imgcanvas = document.getElementById("can");
    image.drawTo(imgcanvas);
}

function binaryFilter(){
  
    
    makeGray()
    for(let pixel of image.values()){
        let r,g,b;
        r = pixel.getRed(); 
        g = pixel.getGreen();
        b = pixel.getBlue();
        
       if(r > 180){
           r = 255
       }else{
           r = 0
       }

       if(g > 180){
           g = 255
       }else{
           g = 0
       }

       if(b > 180){
           b = 255
       }else{
           b = 0
       }
       
       pixel.setRed(r);
       pixel.setGreen(g);
       pixel.setBlue(b);
        
    }

    var imgcanvas = document.getElementById("can");
    image.drawTo(imgcanvas);
}

function gammaCorrection(){

    for(let pixel of image.values()){
        let r,g,b;

        r = pixel.getRed();
        g = pixel.getGreen();
        b = pixel.getBlue();

        r = 255 * (Math.pow((r/256),0.45))
        g = 255 * (Math.pow((g/256),0.45))
        b = 255 * (Math.pow((b/256),0.45))

        pixel.setRed(r);
        pixel.setGreen(g);
        pixel.setBlue(b);

    }

    var imgcanvas = document.getElementById("can");
    image.drawTo(imgcanvas);
}

function negativeFilter(){
    for(let pixel of image.values()){
        let r,g,b;

        r = pixel.getRed();
        g = pixel.getGreen();
        b = pixel.getBlue();

        r = 255 - r
        g = 255 - g
        b = 255 - b

        pixel.setRed(r);
        pixel.setGreen(g);
        pixel.setBlue(b);

    }

    var imgcanvas = document.getElementById("can");
    image.drawTo(imgcanvas);
}

function createHistogram(){

    let nRed = []
    let nGreen = []
    let nBlue = []
    
    for(let pixel of image.values()){
        nRed.push(pixel.getRed());
        nGreen.push(pixel.getGreen());
        nBlue.push(pixel.getBlue());
    }

    var red_pixel ={
        x : nRed,
        type: 'histogram',
        opacity: 0.5,
        marker: {
            color: 'red'
        },
    };
    
    var green_pixel ={
        x : nGreen,
        type: 'histogram',
        opacity: 0.5,
        marker: {
            color: 'green'
        },
    };

    var blue_pixel ={
        x : nBlue,
        type: 'histogram',
        opacity: 0.5,
        marker: {
            color: 'blue'
        },
    };

    var data = [red_pixel,green_pixel,blue_pixel];
    var layout = {barmode: "overlay"}
    Plotly.newPlot('myDiv', data,layout); 
} 
