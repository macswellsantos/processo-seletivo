var app = new Vue({
	el:"#app", 
    data: {
    	mensagem: $inicio.$root.funcionario.id,
    	visible: true,
    	funcionario: [],
    	selecionado : "",
    	setores: [],
    	hasError: false
    },
    created: function(){
        let vm =  this;
        vm.inicia();
    }, 
    methods:{
    	enviar: function(){
    		const vm = this;
    		if(vm.funcionario.id != "" && vm.selecionado != ""){
    			vm.salvar();
    		} else { 
    			vm.editar();
    		}
    	},
    	inicia: function(){
    		const vm = this;
			axios.get("/funcionarios/rs/setores")
			.then(response => {vm.setores = response.data;
			}).catch(function (error) {
				vm.hasError = true;
				vm.mostraAlertaErro("Não foi possível listar os setores");
			}).finally(function() {
			});
    	},
    	mostraAlertaErro: function(msg){
    		const vm = this;
    		vm.mensagem = msg;
    		vm.visible = true;
    	},
    	salvar: function(){
    		const vm = this;
    		
    		vm.funcionario = 
    		{ nome:    vm.funcionario.nome,
    		  idade:   vm.funcionario.idade,
    		  email:   vm.funcionario.email,
    		  salario: vm.funcionario.salario,
    		  setor: {
    		  	id: vm.selecionado
    		  }
    		
    		}
    		
    		vm.mostraAlertaErro(vm.selecionado);
    		
    		axios.post("/funcionarios/rs/funcionarios",vm.funcionario)
			.then(vm.mostraAlertaErro("Cadastrado com sucesso!")).catch(function (error) {
				vm.hasError = true;
				vm.mostraAlertaErro("Não foi possível cadastrar o funcionário");
			}).finally(function() {
			});
    		
    	},
    	editar: function(){
    		const vm = this;
    		vm.hasError = true;
    		vm.mostraAlertaErro("Editar");
    	},
    	teste: function(){
    		const vm = this;
    		vm.mostraAlertaErro("Novo setor");
    	},
    	
    	
	}
	
});