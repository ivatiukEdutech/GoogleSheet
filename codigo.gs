let url = "https://docs.google.com/spreadsheets/d/1THqxd3yDRU99DAEV1f4xkxJr4tU5y84mdf_SZUMzOCU/edit#gid=0"
function doGet(request)
{
  return HtmlService.createTemplateFromFile('index').evaluate();
    
}

//Inclui os arquivos separados
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}



function salvar(nome,cpf,email,telefone){ 
     let sheet = SpreadsheetApp.openByUrl(url)
    let planilha = sheet.getSheetByName("cad1")
    
    let lr = planilha.getLastRow()
    if(nome==""|| email == ""||telefone==" "){
      return "<div class='alert alert-danger'>Existem campos em branco!</div>"
    }
    if(validarCPF(cpf)){
    planilha.getRange(lr+1,1).setValue(nome);
    planilha.getRange(lr+1,2).setValue(cpf);
    planilha.getRange(lr+1,3).setValue(email);
    planilha.getRange(lr+1,4).setValue(telefone);
  
     return "<div class='alert alert-success'>Os dados foram inseridos com sucesso</div>"   
    }else{
      return "<div class='alert alert-danger'>O cpf não é válido!</div>"
    } 


 }  function validarCPF(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;
}
