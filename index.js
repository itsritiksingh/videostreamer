const fileInput = document.querySelector("input[type=file]");
const fileDuration = document.getElementById("file-duration");

// Listen for any change to the value of the file input

fileInput.addEventListener("change", (event) => {
  fileDuration.textContent = "Fetching video duration...";

  // When the file selected by the user changes:
  // - create a fresh <video> element that has not yet fired any events
  // - create a file reader to safely retrieve and manipulate the file

  const file = event.target.files[0];
  const video = document.createElement("video");
  const reader = new FileReader();

  // Cancel if the initial filesize just seems too large.
  // If the maximum allowed is 30 seconds, then a Gigabyte of file seems too much.

  // Before setting any source to the <video> element,
  // add a listener for `loadedmetadata` - the event that fires
  // when metadata such as duration is available.
  // As well as an error event is case something goes wrong.

  video.addEventListener("loadedmetadata", (event) => {
    // When the metadata is loaded, duration can be read.
    console.dir(video);
    fileDuration.textContent = console.dir(video);
  });

  video.addEventListener("error", (event) => {
    // If the file isn't a video or something went wrong, print out an error message.

    fileDuration.textContent = `Could not get duration of video, an error has occurred.`;
  });

  // Before reading any file, attach an event listener for
  // when the file is fully read by the reader.
  // After that we can use this read result as a source for the <video>

  reader.addEventListener("loadend", function () {
    // reader.result now contains a `blob:` url. This seems like a
    // nonsensical collection of characters, but the <video> element
    // should be able to play it.

    video.src = reader.result;

    // After we assigned it to the `src` of the <video>, it will be
    // act like any other video source, and will trigger the related
    // events such as `loadedmetadata`, `canplay`, etc...
  });

  // Instruct the reader to read the file as a url. When its done
  // it will trigger the `loadend` event handler above.

  reader.readAsDataURL(file);
});
