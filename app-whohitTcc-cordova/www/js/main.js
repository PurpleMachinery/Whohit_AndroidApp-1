window.addEventListener('load',carrega);

function carrega(){
    document.getElementById('email').addEventListener('blur', leave);
    document.getElementById('senha').addEventListener('blur', leave);
    document.getElementById('nome').addEventListener('blur', leave);   
    document.getElementById('data').addEventListener('blur', leave);
    document.getElementById('cpf').addEventListener('blur', leave);
    document.getElementById('endereco').addEventListener('blur', leave);
    document.getElementById('bairro').addEventListener('blur', leave);
    document.getElementById('cidade').addEventListener('blur', leave);
    document.getElementById('estado').addEventListener('blur', leave);
}
function leave(){
    if(this.value != ''){
        this.offsetParent.className += " ativo";
    }
}

function inputSHOW(_show){
    if(_show){
        document.getElementById('email').offsetParent.className += " ativo";
        document.getElementById('senha').offsetParent.className += " ativo";
        document.getElementById('nome').offsetParent.className += " ativo";
        document.getElementById('data').offsetParent.className += " ativo";
        document.getElementById('cpf').offsetParent.className += " ativo";
        document.getElementById('endereco').offsetParent.className += " ativo";
        document.getElementById('bairro').offsetParent.className += " ativo";
        document.getElementById('cidade').offsetParent.className += " ativo";
        document.getElementById('estado').offsetParent.className += " ativo";
        //document.getElementById('btn-deletar').style.display = 'block';
    }
}

function limpaCampo(){
    
    document.getElementById('field-id').value = '';
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('data').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}