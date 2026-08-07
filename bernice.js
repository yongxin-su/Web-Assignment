document.addEventListener("DOMContentLoaded", () => {
  const downloadbtn = document.getElementById("download");

  if (downloadbtn) {
    downloadbtn.addEventListener("click", () => {
      window.print();
    });
  }
});