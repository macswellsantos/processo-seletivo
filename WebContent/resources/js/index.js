var inicio = new Vue({
	el:"#inicio",
    data: {
        listaFuncionarios: [],
    	listaSetores: [],
        funcionario: "",
    	mensagem: "",
    	visible: false,
    	visibleCad: false,
    	hasError: false,
    	funcionario_id: "",
    	selecionado : "",
    	novoSetor: "",
    	botao:""
    },
    created: function(){
        let vm =  this;
        vm.inicia();
        vm.buscaFuncionarios();
    },
    methods:{
        buscaFuncionarios: function(){
			const vm = this;
			axios.get("/funcionarios/rs/funcionarios")
			.then(response => {vm.listaFuncionarios = response.data;
			}).catch(function (error) {
				vm.mostraAlertaErro("Não foi possível listar os funcionários");
			}).finally(function() {
			});
		},
		deletar: function(id){
			const vm = this;
			axios.delete("/funcionarios/rs/funcionarios/"+id).then(function(){
                inicio.buscaFuncionarios();
            }).catch(function (error) {
				vm.mostraAlertaErro("Não foi possível remover o funcionário");
			}).finally(function() {
			});
		},
		salvar: function(){
    		const vm = this;
    		
    		vm.funcionario = 
    		{ 
    		  nome:    vm.funcionario.nome,
    		  idade:   vm.funcionario.idade,
    		  email:   vm.funcionario.email,
    		  salario: vm.funcionario.salario,
    		  setor: {
    		  	id: vm.selecionado
    		  }
    		
    		}
    		
    		
    		axios.post("/funcionarios/rs/funcionarios",vm.funcionario)
			.then(function()  {
				vm.mostraAlertaErro("Cadastrado com sucesso!");
				vm.fechar();
				vm.buscaFuncionarios();
			}).catch(function (error) {
				vm.hasError = true;
				vm.mostraAlertaErro("Não foi possível cadastrar o funcionário");
			}).finally(function() {
			});
    		
    	},
    	alterar: function(){
    		const vm = this;
    		
    		vm.funcionario = 
    		{ 
    		  id:      vm.funcionario.id,
    		  nome:    vm.funcionario.nome,
    		  idade:   vm.funcionario.idade,
    		  email:   vm.funcionario.email,
    		  salario: vm.funcionario.salario,
    		  setor: {
    		  	id: vm.selecionado
    		  }
    		
    		}
    		
    		vm.mostraAlertaErro(vm.selecionado);
    		
    		
    		var uri = "/funcionarios/rs/funcionarios/"+vm.funcionario.id;
    		
    		axios.put(uri ,vm.funcionario)
			.then(function()  {
				vm.mostraAlertaErro("Alterado com sucesso!");
				vm.fechar();
				vm.buscaFuncionarios();
			}).catch(function (error) {
				vm.hasError = true;
				vm.mostraAlertaErro("Não foi possível alterar o funcionário");
			}).finally(function() {
			});
    		
    	},
		editar: function(id){
			const vm = this;
    		vm.visibleCad = true;
    		vm.flag = 1;
    		vm.botao = "Alterar"
			axios.get("/funcionarios/rs/funcionarios/"+id)
			.then( response => {vm.funcionario = response.data;
			vm.selecionado = vm.funcionario.setor.id;
			}).catch(function (error) {
			vm.hasError = true;
				vm.mostraAlertaErro("Erro: " +error);
			}).finally(function() {
			});
		},
		adicionaSetor: function(){
    		const vm = this;
    		
    		vm.setor = 
    		{ 
    		  nome: vm.novoSetor
    		}
    		
    		axios.post("/funcionarios/rs/setores",vm.setor)
			.then(function()  {
				vm.inicia();
			}).catch(function (error) {
				vm.hasError = true;
				vm.mostraAlertaErro("Não foi possível cadastrar o setor");
			}).finally(function() {
			});
    	},
    	mostraAlertaErro: function(msg){
    		const vm = this;
    		vm.mensagem = msg;
    		vm.visible = true;
    	},
    	
    	novo: function(){
    		const vm = this;
    		vm.funcionario = [];
    		vm.selected = ""
    		vm.visibleCad = true;
    		vm.flag = 0;
    		vm.botao = "Cadastrar"
    	},
    	inicia: function(){
    		const vm = this;
			axios.get("/funcionarios/rs/setores")
			.then(response => {vm.listaSetores = response.data;
			}).catch(function (error) {
				vm.hasError = true;
				vm.mostraAlertaErro("Não foi possível listar os setores");
			}).finally(function() {
			});
    	},
    	enviar: function(){
    		const vm = this;
    		if(vm.flag == 0){
    			vm.salvar();
    		} else { 
    			vm.alterar();
    		}
    	},
    	
    	fechar: function(){
    		const vm = this;
    		vm.visibleCad = false;
    		vm.funcionario_id = "";
    		vm.selecionado = "";
    	},
    	
	},
	computed: {
    SetoresOrdenados: function() {
      function compare(a, b) {
        if (a.nome < b.nome)
          return -1;
        if (a.nome > b.nome)
          return 1;
        return 0;
      }

      return this.listaSetores.sort(compare);
    }
  }
	
});