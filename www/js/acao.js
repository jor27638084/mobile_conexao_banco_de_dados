// This is a JavaScript file

/* ----------------------------------------------------------------------------------------------------------------------- */
//Função que nos leva para a pagina registros.html
$(document).on("click", "#list", function(){
  $(location).attr("href","registros.html");
});

/* ----------------------------------------------------------------------------------------------------------------------- */
//Função que salva um registro
$(document).on("click","#save", function(){
function alertCallback(){
}

  navigator.notification.alert("Cadastrado com sucesso!", alertCallback, "Cadastro de Usuario", "OK");
  var parameters ={
    "nome":$("#nome").val(),
    "email":$("#email").val(),
    "senha":$("#senha").val()
    
  }
  $.ajax({
    type:"post",
    url:"https://wordpress-online-2.000webhostapp.com/webservice/cadastra.php",
    data:parameters,
    success: function(data){
      navigator.notification.alert(data, alertCallback, "Cadastro de Usuario", "OK");
      $("#nome").val(""),
      $("#email").val(""),
      $("#senha").val("")
    },
    error: function(data){
      navigator.notification.alert("Erro ao cadastrar..."<br>"Tente novamente.", alertCallback, "Cadastro de Usuario", "OK");
    },
  });
});

/* --------------------------------------------------------------------------------------------------------------------- */
//Função que carrega a lista de dados cadastrados no banco
function listar(){
  $.ajax({
    type: "post",
    url: "https://wordpress-online-2.000webhostapp.com/webservice/listar.php",
    dataType: "json",
    success: function(data){
      var itemLista = "";
      $.each(data, pessoas, function(i,dados){
        itemLista += "<option value="+dados.codigo+">"+dados.nome+"</option>";
      });
      $("#personList").html(itemLista);
    },
    error: function(data){
      navigator.notification.alert("Erro ao buscar registro.");
    } 
  })
}

/* -------------------------------------------------------------------------------------------------------- */
//Função Acionada assim que carrega a pagina registros.html, chama a função listar()
$(document).ready("registros.html", function(){
  listar();
});

/* ---------------------------------------------------------------------------------------------------------- */
//Função para navegar entre os registros regsitrados
$(document).on("change", "#personList", function(){
  var parameter = {
    "codigo": $("option:select", ("#personList")).val()
  }
  $.ajax({
    type: "post",
    url: "https://wordpress-online-2.000webhostapp.com/webservice/listar-um-registro.php",
    data: parameter,
    dataType: "json",
    success: function(data){
      $("#codigo").val(data.pessoa.codigo);
      $("#nome").val(data.pessoa.nome);
      $("#email").val(data.pessoa.email);
      $("#senha").val(data.pessoa.senha);
    },
     error: function(data){
      navigator.notification.alert("Erro ao buscar registro.");
    } 
  })
})

/* --------------------------------------------------------------------------------------------------------------------- */

//Funções que habilitam e desabilitam o readonly
function unlock(){
   $("#nome").prop("readonly", false);
   $("#email").prop("readonly", false);
   $("#senha").prop("readonly", false);
}

function block(){
   $("#nome").prop("readonly", true);
   $("#email").prop("readonly", true);
   $("#senha").prop("readonly", true);
}
/* --------------------------------------------------------------------------------------------------------------------- */
//Botão editar
$(document).on("click", "#edition", function(){
  unlock();
})

/* ------------------------------------------------------------------------------------------------------------------------ */

//Botão Salvar
$(document).on("click", "#save_edition", function(){

  var parameters = {
    "codigo":("#codigo").val(),
    "nome":$("#nome").val(),
    "senha":$("#senha").val(),
    "email":$("#email").val()
  }

   $.ajax({
     type: post,
     url: "https://wordpress-online-2.000webhostapp.com/webservice/atualiza.php",
     data: parameters,
     success: function(){
       navigator.notification.alert(data);
       location.reload();
       block();
     },
     error: function(){
       navigator.notification.alert("Erro ao salvar cadastro.")
     }

   })
})