const generatorDiv = document.querySelector(".generator");
const generateBtn = generatorDiv.querySelector(".generator-form button");
const qrInput = generatorDiv.querySelector(".generator-form input");
const qrImg = generatorDiv.querySelector(".generator-img img");
const downloadBtn = generatorDiv.querySelector(".generator-btn .btn-link");

let imgURL = "";
generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value;
  if (!qrValue.trim()) return; //If value empty -> stop here
  generateBtn.innerText = "Generating QR Code...";
  // If the value is valid =>using qrsserver api to generate QR code
  imgURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  qrImg.src = imgURL;
  // console.log(imgURL);

  qrImg.addEventListener("load", () => {
    generatorDiv.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
  });
});

downloadBtn.addEventListener("click", () => {
  if (!imgURL) return;
  fetchImage(imgURL);
});

// function fetchImage(url) {
//   // console.log(url);
//   fetch(url)
//     .then((res) => res.blob())
//     .then((file) => {
//       // console.log(file);
//       let tempFile = URL.createObjectURL(file);
//     //   let file_name = url.split("/").pop().split(".")[0];
//     //   let extension = file.type.split("/")[1];
//     //   download(tempFile, file_name, extension);
//         let a = document.createElement("a");
//         a.href = tempFile;
//         a.download = 'img.png';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//     })
//     .catch(() => (imgURL = ""));
// }
async function fetchImage(url){
    const image =await fetch(url)
    const imgBlog=await image.blob()
    const imageUrl=URL.createObjectURL(imgBlog)

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = 'img.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// function download(tempFile, file_name, extension) {
//   let a = document.createElement("a");
//   a.href = tempFile;
//   s.download = `${file_name}.${extension}`;
//   document.body.appendChild(a);
//   a.click();
//   a.remove();
// }


// if value is empty->remove active class
qrInput.addEventListener("input",()=>{
    if(!qrInput.value.trim())
        return generatorDiv.classList.remove("active")
})
