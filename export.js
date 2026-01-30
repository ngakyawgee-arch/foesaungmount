function exportPNG(){
  html2canvas(document.getElementById("printArea"))
  .then(c=>{
    let a=document.createElement("a");
    a.href=c.toDataURL();
    a.download="lfm-monthly.png";
    a.click();
  });
}