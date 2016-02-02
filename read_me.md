# convert-pdf-to-png-gs
Create code to convert pdf files that hit a gDrive folder into .png, then email to podio.
// original code by Amit Agarwal (https://ctrlq.org/code/20043-convert-image-to-pdf)
 
function convertImageToPDF(filename) {
  
  var image;

  // Is it a local file or web URL?
  if (filename.match(/^https?:\/\//i)) {
    image = UrlFetchApp.fetch(filename);
  } else {
    image = DriveApp.getFilesByName(filename).next();
  } 
  
  // grab its bytes and base64-encode them.
  var base64 = Utilities.base64Encode(image.getBlob().getBytes());
  var html = '<img src="data:image/png;base64,'+base64+'" />';
  
  // create a blob, convert to PDF
  var blob = Utilities.newBlob(html, MimeType.HTML).setName(filename + ".pdf");
  
  MailApp.sendEmail("ctrlq@labnol.org", "Image to PDF", "", {
    attachments:blob.getAs(MimeType.PDF)
  });
  
}
 
