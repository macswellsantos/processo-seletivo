var inicio = new Vue({
	el:"#inicio",
    data: {
        listaFuncionarios: [],
        funcionario: ""
    },
    created: function(){
        let vm =  this;
        vm.buscaFuncionarios();
    },
    methods:{
        buscaFuncionarios: function(){
			const vm = this;
			axios.get("/funcionarios/rs/funcionarios")
			.then(response => {vm.listaFuncionarios = response.data;
			}).catch(function (error) {
				vm.mostraAlertaErro("Erro interno", "Não foi listar natureza de serviços");
			}).finally(function() {
			});
		},
		deletar: function(id){
			console.log("OH!");
			const vm = this;
			axios.delete("/funcionarios/rs/funcionarios/"+id).then(function(){
                inicio.buscaFuncionarios();
            }).catch(function (error) {
				vm.mostraAlertaErro("Erro interno", "Não foi listar natureza de serviços");
			}).finally(function() {
			});
		},
		editar: function(id){
			console.log("OH!");
			const vm = this;
			axios.get("/funcionarios/rs/funcionarios/"+id)
			.then( response => {vm.funcionario = response.data;
			}).catch(function (error) {
				vm.mostraAlertaErro("Erro interno", "Não foi listar natureza de serviços");
			}).finally(function() {
			});
		},
	}
	
});