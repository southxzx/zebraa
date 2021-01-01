const handleContentLoaded = {

    zoom : () =>{
        ///zoom
        const mainContainer = document.querySelector('.thumbnail');
        const rect = document.querySelector('.rect');
        const zoom = document.querySelector('.zoom');

        //Moving the selector box
        function move(event) {
            //Width and height of main img
            let w1 = mainContainer.offsetWidth;
            let h1 = mainContainer.offsetHeight;

            //Zoom ratio
            let ratio = 2;
            //Zoom window background-image size
            zoom.style.backgroundSize = w1 * ratio + 'px' + h1 * ratio + 'px';

            //Width and height of selector
            let w2 = rect.offsetWidth;
            let h2 = rect.offsetHeight;

            //Zoom window width and height
            zoom.style.width = w2 * ratio + 'px';
            zoom.style.height = h2 * ratio + 'px';


            //Half of selector show outside the main img
            w2 = w2/2;
            h2 = h2/2;

            //Coordinates of mouse cursor
            let x,y,xx,yy;
            //How far is the mouse cursor from the element
            //x how far from the cursor left of element
            x = event.offsetX;
            //y how far from the cursor top of element
            y = event.offsetY;

            xx = x - w2;
            yy = y - h2;
            //Keeping the selector inside the main img
            if(x < w2){ // left of img
                x = w2;
                //Matching the zoom window with the selector
                xx = 0;
            }
            if(x > w1 - w2){ // right of img
                x = w1 - w2;
                xx = x - w2;
            }
            if(y < h2){ // top of img
                y = h2;
                yy = 0;
            }
            if(y > h1 - h2){ // bottom of img
                y = h1 - h2;

            }

            xx = xx * ratio;
            yy = yy * ratio;

            //Changing the position of the selector
            rect.style.left = x + 'px';
            rect.style.top = y + 'px';

            let t = '-' + xx + 'px' + " " + '-' + yy + 'px';
    
            //Changing background image of zoom
            zoom.style.backgroundPosition = t;
        }

        if(mainContainer == null) return;
        else{
            mainContainer.addEventListener('mousemove',move);
        }
    }

}

export default handleContentLoaded;