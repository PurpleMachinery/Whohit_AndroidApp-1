var App = {
	db: null,
	initialize:function(){
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},
	//Metodo handler
	onDeviceReady:function() {
	    this.createDatabase();
        document.getElementById('btnEntrar').addEventListener('click', App.newLogin);
		document.getElementById('btn-salvaAltera').addEventListener('click', App.updateValues);
        document.getElementById('proximo').addEventListener('click', App.insertValues);
        document.getElementById('btn-conectar').addEventListener('click', App.insertValues);
		
		FCMPlugin.subscribeToTopic('tstWhohit')
    }
	,

    createDatabase: function(){
	    App.db = window.openDatabase("dbWhohit", "1.0", "dbWhohit", 1000000);
        this.db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (email,senha,nome,data_nascimento,cpf unique,endereco,bairro,cidade,estado)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS raspIP(ip)');
        });
    },
    newLogin:function(){
        App.db.transaction(function (tx){
            var ssql = "select * from usuario where email = '" + document.getElementById('loginUser').value + "' AND senha = '"+ document.getElementById('loginSenha').value +"'";
            tx.executeSql(ssql, [], function (tx, result) {
                if(result.rows.length) {
					console.log(result);
                    document.getElementById('txtNome').value = result.rows[0].nome;
                    document.getElementById('txtEmail').value = result.rows[0].email;
                    document.getElementById('txtEndereco').value = result.rows[0].endereco;
                    document.getElementById('txtBairro').value = result.rows[0].bairro;
                    document.getElementById('txtCidade').value = result.rows[0].cidade;
                    document.getElementById('txtEstado').value = result.rows[0].estado;
                    console.log(result);
                    $.mobile.changePage("#pageHome");
                }
                else{
                    alert("Login ou senha invalidos!!");
                }
            });
        });
    },
	insertValues:function() {
		if(document.getElementById('email').value  == ""){
			alert("Preenchimento de email vazio ");
		}
		else if(document.getElementById('senha').value  == ""){
			alert("Preenchimento de senha vazio");
		}
		else if(document.getElementById('nome').value  == ""){
			alert("Preenchimento de nome vazio");
		}
		else if(document.getElementById('data_nascimento').value  == ""){
			alert("Preenchimento de data de nascimento vazio");
		}
		else if(document.getElementById('cpf').value  == ""){
			alert("Preenchimento de cpf vazio");
		}
		else if(document.getElementById('endereco').value  == ""){
			alert("Preenchimento de endereço vazio");
		}
		else if(document.getElementById('bairro').value  == ""){
			alert("Preenchimento de bairro vazio");
		}
		else if(document.getElementById('cidade').value  == ""){
			alert("Preenchimento de cidade vazio");
		}
		else if(document.getElementById('estado').value  == ""){
			alert("Preenchimento de estado vazio");
		}
		else
		{
			var addDados = 'INSERT INTO usuario (email,senha,nome,data_nascimento,cpf,endereco,bairro,cidade,estado) VALUES ("' + document.getElementById('email').value + '","' + document.getElementById('senha').value + '","' + document.getElementById('nome').value +
				'","' + document.getElementById('data_nascimento').value + '","' + document.getElementById('cpf').value + '","' + document.getElementById('endereco').value + '","' + document.getElementById('bairro').value + '","' + document.getElementById('cidade').value +
				'","' + document.getElementById('estado').value + '")';
			var addIP = 'INSERT INTO raspIP(ip) VALUES("' + document.getElementById('ip').value +'")';	
			App.db.transaction(function (tx){
				tx.executeSql(addDados);
				tx.executeSql(addIP);
				tx.executeSql("select * from usuario where cpf = '" + document.getElementById('cpf').value + "'", [], function (tx, result) {
					document.getElementById('txtNome').value = result.rows[0].nome;
					document.getElementById('txtEmail').value = result.rows[0].email;
					document.getElementById('txtEndereco').value = result.rows[0].endereco;
					document.getElementById('txtBairro').value = result.rows[0].bairro;
					document.getElementById('txtCidade').value = result.rows[0].cidade;
					document.getElementById('txtEstado').value = result.rows[0].estado;
					console.log(result);
				});
				tx.executeSql("select * from raspIP where ip = '" + document.getElementById('ip').value + "'", [], function(tx,result){
					document.getElementById('valor').value = result.rows[0].ip;
					console.log(result);
				});
				$.mobile.changePage("#pageHome");
			});
			$.mobile.changePage("#pageCadPorteiro");
		}
    },
	updateValues:function(){
		App.db.transaction(function (tx){
			var nome, email, endereco, bairro, cidade, estado;
			//var update = "UPDATE usuario set nome = ?, email = ?,endereco = ?,bairro = ?,cidade = ?,estado = ?";
			//tx.executeSql(update,[document.getElementById('nome').value,document.getElementById('email').value,document.getElementById('endereco').value,document.getElementById('bairro').value,document.getElementById('cidade').value,document.getElementById('estado').value]);
			tx.executeSql("select * from usuario where email = '"+document.getElementById('loginUser').value+"'", [], function(tx, result){
				nome = result.rows[0].nome;
				email = result.rows[0].email;
				endereco = result.rows[0].endereco;
				bairro =  result.rows[0].bairro;
				cidade =  result.rows[0].cidade;
				estado = result.rows[0].estado;		
				if(document.getElementById('txtEstado').value!=""){
					estado = document.getElementById('txtEstado').value;
				}
				if(document.getElementById('txtNome').value!=""){
					nome = document.getElementById('txtNome').value;					
				}
				if(document.getElementById('txtEmail').value!=""){
					email = document.getElementById('txtEmail').value;					
				}
				if(document.getElementById('txtEndereco').value!=""){
					endereco = document.getElementById('txtEndereco').value;					
				}
				if(document.getElementById('txtBairro').value!=""){
					bairro = document.getElementById('txtBairro').value;					
				}
				if(document.getElementById('txtCidade').value!=""){
					cidade = document.getElementById('txtCidade').value;					
				}
				var uup = "update usuario set nome = '"+nome+"', email = '"+email+"', endereco = '"+endereco+"', bairro = '"+bairro+"', cidade = '"+cidade+"', estado = '"+estado+"' where email = '"+document.getElementById('loginUser').value+"'";
				tx.executeSql(uup);
				alert('Dados salvos com sucessso!!');
			});
		});
	}
	/*
		$(document).ready( function(){			
            document.addEventListener("deviceready", function () {
            	console.log("6");
                var db = window.openDatabase("dbWhohit", "1.0", "dbWhohit", 1000000);
                //var db = window.sqlitePlugin.openDatabase("dbWhohit", "1.0", "dbWhohit", 1000000);
                //db.transaction(populateDB, TxErrorCB);
            }, false); 
            console.log("2");
            function QuerySuccessCB(Tx, results) {            	
        		console.log("3");
                for(var i=0;i<results.rows.length;i++){
                	alert(".id = " + results.rows.item(i).id + " .data = "+results.rows.item(i).data);
            	}
            }
            function populateDB(tx) {
        		console.log("4");
                //tx.executeSql('DROP TABLE IF EXISTS usuario');
                tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (email,senha,nome,data_nascimento,cpf,endereco,bairro,cidade,estado)');
                var test22 = 'INSERT INTO usuario (email,senha,nome,data_nascimento,cpf,endereco,bairro,cidade,estado) VALUES ("' + document.getElementById('email').value + '","' + document.getElementById('senha').value + '","' + document.getElementById('nome').value +
					'","' + document.getElementById('data_nascimento').value + '","' + document.getElementById('cpf').value + '","' + document.getElementById('endereco').value + '","' + document.getElementById('bairro').value + '","' + document.getElementById('cidade').value + 
					'","' + document.getElementById('estado').value +'")';
				tx.executeSql(test22);
                //tx.executeSql('INSERT INTO usuario (id, data) VALUES (2, "Second row")');
                //tx.executeSql('INSERT INTO usuario (email,senha,nome,data_nascimento,cpf,endereco,bairro,cidade,estado) VALUES (3, "Third one")');
                //tx.executeSql('SELECT * FROM usuario', [], QuerySuccessCB);
            }
            function TxErrorCB() {
        		console.log("5");
                console.log("Error processing SQL!");
            }           
        	console.log("7");
		});*/
}
App.initialize();
