
(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

})(jQuery);


/*------------------
  Hide Show Tabs
    --------------------*/

$(".login").hide();
$(".register_li").addClass("active");

$(".login_li").click(function(){
  $(this).addClass("active");
  $(".register_li").removeClass("active");
  $(".login").show();
   $(".register").hide();
})

$(".register_li").click(function(){
  $(this).addClass("active");
  $(".login_li").removeClass("active");
  $(".register").show();
   $(".login").hide();
})


/*------------------
  jQuery Form Validation
    --------------------*/

$(document).ready(function() { 
$( "#submitform" ).on( "click", function() {
 
 let username = $('#username').val();
 let emailid = $('#emailid').val();
 let userpassword = $('#userpassword').val();
// Hiding error messages 
 $('.errorMsg').hide();
 
 if(checkUsername(username) == false){    
       $('#errorusername').show();    
       return false;  
 }else if(checkEmail(emailid) == false){    
    $('#erroremail').show(); 
       return false;   
 }else if(checkPassword(userpassword) == false){    
    $('#errorpassword').show();     
       return false; 
 }else{
  alert("Se ha registrado correctamente!")
 }
  
});
});

//function used to check valid email
function checkEmail(email){
    //regular expression for email
    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(pattern.test(email)){
        return true;
    } else {
        return false;
    }
}

//function used to validate username
function checkUsername(username){
 //regular expression for username
    let pattern = /^[a-z0-9_-]{5,15}$/;
    if(pattern.test(username)){
        return true;
    }else{
        return false;
    }
}

//function used to validate password
function checkPassword(password){
 //regular expression for password
    let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(pattern.test(password)){
        return true;
    }else{
        return false;
    }
}

/*------------------
  Loan Simulator
    --------------------*/

let totalPayment;

document.getElementById("loan-form").addEventListener("submit", computeResults);

function computeResults(e) {


  const UIamount = document.getElementById("amount").value;
  const UIinterest = document.getElementById("interest").value;
  const UIyears = document.getElementById("years").value;

 

  const principal = parseFloat(UIamount);
  const CalculateInterest = parseFloat(UIinterest) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears) * 12;



  const x = Math.pow(1 + CalculateInterest, calculatedPayments);
  const monthly = (principal * x * CalculateInterest) / (x - 1);
  const monthlyPayment = monthly.toFixed(2);



  const totalInterest = (monthly * calculatedPayments - principal).toFixed(2);
  totalPayment = (monthly * calculatedPayments).toFixed(2);



  document.getElementById("monthlyPayment").innerHTML = "$" + monthlyPayment;

  document.getElementById("totalInterest").innerHTML = "$" + totalInterest;

  document.getElementById("totalPayment").innerHTML = "$" + totalPayment;

  e.preventDefault();
}


/*------------------
  API Request - USD Exchange Rate
   --------------------*/

$('#dolar').click(function() {
$('#cotizacion').empty()
$.ajax({
  method: "GET",
          url: "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
          success: (respuesta) => {
            let currencyUsd = parseInt(respuesta[0].casa.venta);
            const loanUsd = Math.round(totalPayment/currencyUsd);
            $('#cotizacion').prepend(`
              <div class="column is-12-tablet is-6-desktop is-3-widescreen">
                <div class="notification is-usd has-text">
                  <p id="totalUsd" class="title is-1">u$${loanUsd}</p>
                  <p class="subtitle is-4">Monto en dolares</p>
                </div>
              </div>`)
          }
    });
})
