<script>

  var n = document.getElementById("nome")
  var c = document.getElementById("cpf")
  var e = document.getElementById("email")
  var t = document.getElementById("telefone")


  function preventFormSubmit() {
        let forms = document.querySelectorAll('form');
        for (let i = 0; i < forms.length; i++) {
            forms[i].addEventListener('submit', function(event) {
                event.preventDefault();
            });
        }
    }
    window.addEventListener('load', preventFormSubmit);

    //Processamento no lado cliente

     //var b = document.getElementById("btnS").addEventListener("click",salvar)

    function salvar(){
      var nome = n.value
      var cpf = c.value.replace(/\./g,'').replace('-','')
      var email = e.value
      var telefone = t.value.replace(/\D/g,"")
      document.getElementById("btnS").setAttribute("disabled","true")
        google.script.run.withSuccessHandler(retorno).salvar(nome, cpf,email, telefone); 
     
  

      
      
    }

    function limpar(){
        n.value=""
        c.value=""
        e.value=""
        t.value=""
    }


    function retorno (data){
      
        let div = document.getElementById('output');
        div.innerHTML = data
       limpar()
    }
    function fMasc(objeto,mascara) {
    obj=objeto
    masc=mascara
    setTimeout("fMascEx()",1)
}
function fMascEx() {
    obj.value=masc(obj.value)
}
function mCPF(cpf){
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return cpf
}
function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}
function id( el ){
	return document.getElementById( el );
}
window.onload = function(){
	id('telefone').onkeyup = function(){
		mascara( this, mtel );
	}
}
</script>
  </body>
</html>
