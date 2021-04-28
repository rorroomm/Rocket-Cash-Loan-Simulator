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
    
    // Register Validation  
    
    $(document).ready(function() { 
      $( "#submitform" ).on( "click", function() {
       
       let username = $('#username').val();
       let emailid = $('#emailid').val();
       let userpassword = $('#userpassword').val();
      
      // Save to Local Storage
      localStorage.setItem("us", username);
      localStorage.setItem("em", emailid);
      localStorage.setItem("pass", userpassword);
      
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
          swal({
          title: "Se ha registrado correctamente!",
          text: "Le enviamos un mail a" + " " + localStorage.getItem('em') + " para que active su cuenta",
          icon: "success",
          button: "Entendido",
          });
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
      
      // Login Validation
      
      $( "#loginsubmit" ).on( "click", function() {
        let loginUser = $('#loguser').val();
        let logPassword = $('#logpassword').val();
       
       if (localStorage.getItem('us') != loginUser ){
        swal("Ingrese un usuario válido");
       }
       else if (localStorage.getItem('pass') != logPassword ){
        swal("Contraseña incorrecta");
       }
       else {
        swal({
          title: "Bienvenido " + localStorage.getItem('us'),
          icon: "success",
          button: "Ir a mi cuenta",
          });
       }
      
      })