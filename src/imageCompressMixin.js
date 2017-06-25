export default {
  methods: {
    processImages
  }
}

function processImages (files) {
  var imageNames = []
  var resizedImages = [];

  [...files].forEach((item) => processImage(item, imageNames, resizedImages))

  return {
    imageNames,
    resizedImages
  }
}

function processImage (file, imageNames, resizedImages) {
  // read the file
  var reader = new FileReader()
  reader.readAsArrayBuffer(file)

  reader.onload = function (event) {
    // blob stuff
    var blob = new Blob([event.target.result]) // create blob...
    window.URL = window.URL || window.webkitURL
    var blobURL = window.URL.createObjectURL(blob) // and get it's URL

    // helper Image object
    var image = new Image()
    image.src = blobURL
    image.onload = function () {
      // have to wait till it's loaded
      resizedImages.push(resizeMe(image))
      imageNames.push(file.name)
    }
  }
}

const maxHeight = 900
const maxWidth = 16 / 7 * maxHeight

function resizeMe (img) {
  var canvas = document.createElement('canvas')

  var width = img.width
  var height = img.height

  // calculate the compressionValue, width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      // height *= max_width / width;
      height = Math.round(height *= maxWidth / width)
      width = maxWidth
    }
  } else {
    if (height > maxHeight) {
      // width *= max_height / height;
      width = Math.round(width *= maxHeight / height)
      height = maxHeight
    }
  }

  // resize the canvas and draw the image data into it
  canvas.width = width
  canvas.height = height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)

  return canvas.toDataURL('image/jpeg')
}
