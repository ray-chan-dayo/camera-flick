const utils = new Utils('errorMessage');
//const imageUsed = document.getElementById('sample').getAttribute('src')
//console.log(imageUsed)
const applyButton = document.getElementById('apply')
const setUpApplyButton = function setUpApplyButton(tl, tr, br, bl) { 
    //console.log(cv)
    let pointsArray = [
        Math.round(tl.x),
        Math.round(tl.y),
        Math.round(canvasElement.width-tr.x),
        Math.round(tr.y),
        Math.round(canvasElement.width-br.x),
        Math.round(canvasElement.height-br.y),
        Math.round(bl.x),
        Math.round(canvasElement.height-bl.y)
    ]
    /*const children = document.querySelectorAll('#window_g .handle')
    console.log(children)
    children.forEach(e =>{
        const pos = e.getAttribute('transform');
        console.dir(pos)
        const point = pos.replace('translate(','').replace(')','').split(',')
        pointsArray.push(point[0])
        pointsArray.push(point[1])
    })*/
    console.log(pointsArray)
    //utils.loadImageToCanvas(imageUsed, 'imageInit')imageinitはcanvasのID
    //setTimeout(()=>{
    //let src = cv.imread('imageInit');
    let src = cv.imread('canvas');
    //const imageHeight = document.getElementById('imageInit').height
    const imageHeight = document.getElementById('canvas').height
    //const imageWidth = document.getElementById('imageInit').width
    const imageWidth = document.getElementById('canvas').width
    //const svgCropHeight =  document.querySelector('#background svg').getAttribute('height') - 80//wont work
    const svgCropHeight = Math.max(
            Math.round(tl.y),
            Math.round(tr.y),
            Math.round(br.y),
            Math.round(bl.y)
        )-Math.min(
            Math.round(tl.y),
            Math.round(tr.y),
            Math.round(br.y),
            Math.round(bl.y)
        )
    //const svgCropWidth =  document.querySelector('#background svg').getAttribute('width') - 80//wont work
    const svgCropWidth = Math.max(
            Math.round(tl.x),
            Math.round(tr.x),
            Math.round(br.x),
            Math.round(bl.x)
        ) - Math.min(
            Math.round(tl.x),
            Math.round(tr.x),
            Math.round(br.x),
            Math.round(bl.x)
        )
    console.log('h : ',svgCropHeight,' w : ',svgCropWidth)
    const scaleFactor = parseInt(imageWidth / svgCropWidth)
    //debugger
    pointsArray = pointsArray.map( e => {
        const num = parseInt((parseInt(e)/* + 40*/)/scaleFactor)
        return num
    })
    let dst = new cv.Mat();
    let dsize = new cv.Size(imageHeight, imageWidth);
    let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, pointsArray);
    let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, imageHeight, 0, imageHeight, imageWidth, 0, imageWidth]);
    let M = cv.getPerspectiveTransform(srcTri, dstTri);
    cv.warpPerspective(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    //document.getElementById('imageInit').style.display = "none"
    //document.getElementById('canvas').style.display = "none"
    cv.imshow('imageResult', dst);
    src.delete(); dst.delete(); M.delete(); srcTri.delete(); dstTri.delete();
    //},500)
    
        
}

//applyButton.setAttribute('disabled','true')
//applyButton.onclick = setUpApplyButton

utils.loadOpenCv(() => {
    setTimeout(function () { 
        //applyButton.removeAttribute('disabled');
    },500)
});