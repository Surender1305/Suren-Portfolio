let erdate = document.querySelector(".error-date");
let ermonth = document.querySelector(".error-month");
let eryear = document.querySelector(".error-year");
const par = document.querySelector(".input1");


let activationBtn = document.querySelector(".sep .btn");
const monthsDaysLimit = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let yearsResult = document.querySelector(".results__years span");
let monthsResult = document.querySelector(".results__months span");
let daysResult = document.querySelector(".results__days span");

activationBtn.addEventListener("click", (e) => {


    // validateInputs();
    const y1 = document.querySelector(".year").value;
    const m1 = document.querySelector(".month").value;
    const d1 = document.querySelector(".date").value;

    var date = new Date();
    var d2 = date.getDate();
    var m2 = 1 + date.getMonth();
    var y2 = date.getFullYear();

    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


   
        if (d1 > d2) {
          d2 = d2 + month[m2 - 1];
          m2 = m2 - 1;
        }
        if (m1 > m2) {
          m2 = m2 + 12;
          y2 = y2 - 1;
        }
        var d = d2 - d1;
        var m = m2 - m1;
        var y = y2 - y1;
    
        yearsResult.innerHTML = y;
        monthsResult.innerHTML = m;
        daysResult.innerHTML = d;
      
        validateInputs();

 
});

function validateInputs(){

    if (d1 == null || d1 == "") {
        setError(d1,'Required');
    
 } 

    else {
   
    
  }
   if (m1 == null || m1 == "") {
    setError(m1,'Required');
   
  }
  else {
  
    
  } 
  
   if (y1 == null || y1 == "") {
    setError(d1,"Required")
    
  } 
  else {
    
    
  } 

}



function setError(element,message)
{
    // par =element.parentElement;
    const errorElement = par.querySelector('.error');

    errorElement.innerHTML= message;
    par.classList.add('error')
    // par.classList.remove('success')

}

    function setSuccess(element)
    {
        const par =element.parentElement;
        const errorElement = par.querySelector('.error');

        errorElement.innerHTML= '';
        // par.classList.add('success')
        par.classList.remove('error')

    }