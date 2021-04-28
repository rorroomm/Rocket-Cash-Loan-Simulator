/*------------------
    Loan Simulator
      --------------------*/
  
      let totalPayment;
      let totalInterest;
      
      document.getElementById("loan-form").addEventListener("submit", validate);
      
      function validate(e) {
        
        e.preventDefault();
      
        const UIamount = document.getElementById("amount").value;
        const UIinterest = document.getElementById("interest").value;
        const UIdues = document.getElementById("dues").value;
        
        if (UIamount < 1000 || parseInt(UIamount) != UIamount) {
          swal("El monto mínimo del préstamo debe ser $1000");
          document.getElementById("amount").value = "";  
        }
      
        else if (UIinterest <= 0 || parseInt(UIinterest) != UIinterest) {
          swal("ingrese un porcentaje de interés válido");
          const UIyears = document.getElementById("interest").value = "";  
        }
      
        else if (UIdues <= 0 || parseInt(UIdues) != UIdues) {
          swal("ingrese un número de cuotas válido");
          const UIdues = document.getElementById("dues").value = "";  
        }
      
        else {
          computeResults(e);
        }
      
      }
      
      function computeResults(e) {
      
        const UIamount = document.getElementById("amount").value;
        const UIinterest = document.getElementById("interest").value;
        const UIdues = document.getElementById("dues").value;
      
      
        const principal = parseFloat(UIamount);
        const CalculateInterest = parseFloat(UIinterest) / 100;
        const calculatedPayments = parseFloat(UIdues);
      
      
        const x = Math.pow(1 + CalculateInterest, calculatedPayments);
        const monthly = (principal * x * CalculateInterest) / (x - 1);
        const monthlyPayment = monthly.toFixed(2);
      
      
        totalInterest = (monthly * calculatedPayments - principal).toFixed(2);
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