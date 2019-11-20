# TapSearch
## Problem 1 - Indexing the text paragraphs
#### 1) Input the paragraphs separated by two lines.<br/>
#### 2) After indexing the paragraph enter a search key which will fetch 10 documents(pdf) if it is present or else it will not return any documents.
Ex:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus. Elit duis tristique sollicitudin nibh sit amet commodo. Senectus et netus et malesuada fames. Fermentum iaculis eu non diam phasellus vestibulum lorem sed. Dictumst quisque sagittis purus sit amet volutpat consequat mauris. Aliquam ut porttitor leo a diam sollicitudin tempor. Consectetur a erat nam at lectus urna duis convallis. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque.
<br/>
<br/>
Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Lectus sit amet est placerat in egestas erat imperdiet. Ante in nibh mauris cursus mattis. Tellus rutrum tellus pellentesque eu tincidunt. Euismod quis viverra nibh cras pulvinar mattis. Proin nibh nisl condimentum id venenatis a. Quam elementum pulvinar etiam non quam. Arcu dictum varius duis at consectetur lorem donec. Aliquet porttitor lacus luctus accumsan tortor. Duis ut diam quam nulla porttitor massa id.
<img src="Screenshot (362).png" alt="drawing" width="500" height="300" />
<img src="Screenshot (363).png" alt="drawing" width="500" height="300" />

## Problem 2 - Indexing the PDF documents.
#### NOTE: Uploading of PDF will take time and upload only one PDF at a time.
#### 1) Click on "TapPDF" link on the left corner. Click on "choose file" button (select only one pdf at a time) and then click on "Submit PDF For Indexing"
#### 2) After the PDF file is loaded it redirects to a page where you have to click on "Index" button, you can see a message saying "pdf document indexed".
#### 3) After indexing type the search key and click on "Search For A Word In The Uploaded PDFs" button, then if the word is present in any of the uploaded PDFs it will return those PDFs with downloadable link or else it says "key not found in any document".
<img src="Screenshot (365).png" alt="drawing" width="500" height="300" />
<img src="Screenshot (366).png" alt="drawing" width="500" height="300" />
<img src="Screenshot (367).png" alt="drawing" width="500" height="300" />

## Problem 3 - Searching for Images based on their features.
#### NOTE: Uploading of image will take time and upload only one image at a time. Extracting the features from mobilenet will also take time, so don't reload when image is uploading.

#### First upload all the images one at a time, I have used "mobilenet" network to extract feature. After uploading enough images then upload the query image.
#### 1) Click on "TapImage" link on the left corner. Click on "choose file" button to upload a image. Then click on "Image For Indexing" button it will redirect to a page where you have to click on "Index button". Do upload enough images which are similar i.e class of elephants,lions etc.
#### 2) After uploading enough images then click on "choose file" below the "blue" button then click on "Upload Image for querying". This will load the image and extract its features then it will lead to a page where you will find a button "Search" click on it.
#### 3) If the query image is similar to any previously uploaded image then it will return the similar images or else not.
<img src="Screenshot (368).png" alt="drawing" width="500" height="300" />
<img src="Screenshot (369).png" alt="drawing" width="500" height="300" />
<img src="Screenshot (361).png" alt="drawing" width="500" height="300" />

# Future Work:
#### 1) This method can be exteded to indexing videos. Most of the videos come with subtitle file or annotations, we can provide the user an option to search for a word or paragraph he had heard long time ago and we will output all the videos which has that paragraph.
#### 2) Often we forget the song name but we just remember a word in a song. So if a user wants to search for a song he can input specific word through speech and we can provide all the songs that have that word.
#### For the above ideas we have to use speech 2 text and then apply indexing.
