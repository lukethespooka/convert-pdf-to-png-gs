
// original code by Amit Agarwal (https://ctrlq.org/code/20043-convert-image-to-pdf)

// detect new PDF in particular folder URL (https://drive.google.com/open?id=0B9yCGkx...) 

var location

function detectNewPDF() {
}

// get the file name 
// make filename = (filename)

function convertImageToPNG(filename) {
  
  var image;

  // Is it a local file or web URL?
  if (filename.match(/^https?:\/\//i)) {
    image = UrlFetchApp.fetch(filename);
  } else {
    image = DriveApp.getFilesByName(filename).next();
  } 
  
  // grab its bytes and base64-encode them.
  var base64 = Utilities.base64Encode(application.getBlob().getBytes());
  var html = '<img src="data:application/pdf;base64,'+base64+'" />';

  // create a blob, convert to PNG
  var blob = Utilities.newBlob(html, MimeType.HTML).setName(filename + ".png");
  
  MailApp.sendEmail("hayler.luke@gmail.com", "Image to PNG", "", {
    attachments:blob.getAs(MimeType.PNG)
  });
  
}
 
