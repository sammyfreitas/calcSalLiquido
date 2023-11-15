function calcularSalarioLiquido() {
    var salarioBruto = parseFloat(document.getElementById('salarioBruto').value);
	document.getElementById('labelSalarioBruto').innerText = `R$ ${salarioBruto.toFixed(2)}`;
    var deducoes = parseFloat(document.getElementById('deducoes').value);

    if (isNaN(salarioBruto) || isNaN(deducoes)) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    // Cálculo do INSS
    var inssFaixas = [
        { limite: 1320, aliquota: 0.075 },
        { limite: 2571.29, aliquota: 0.09 },
        { limite: 3856.94, aliquota: 0.12 },
        { limite: Infinity, aliquota: 0.14 }
    ];

    var inss = 0;
    var inssAliquotaUtilizada = 0;
    
	for (var i = 0; i < inssFaixas.length; i++) {
    if (salarioBruto <= inssFaixas[i].limite) {
        inss = salarioBruto * inssFaixas[i].aliquota;
        inssAliquotaUtilizada = inssFaixas[i].aliquota;
        break;
    } else {
        inss += (inssFaixas[i].limite - (i > 0 ? inssFaixas[i - 1].limite : 0)) * inssFaixas[i].aliquota;
    }
}
	
	document.getElementById('labelINSSAliquota').innerText = `${(inssAliquotaUtilizada * 100).toFixed(2)}%`;
    document.getElementById('labelINSSValor').innerText = `R$ ${inss.toFixed(2)}`;

    
	

	// Definindo as faixas do IRPF
	var irpfFaixas = [
		{ limite: 2112, aliquota: 0 },
		{ limite: 2826.65, aliquota: 0.075 },
		{ limite: 3751.05, aliquota: 0.15 },
		{ limite: 4664.68, aliquota: 0.225 },
		{ limite: Infinity, aliquota: 0.275 }
	];

	// Definindo valores de exemplo
	var salarioBruto = 5500;
	var inss = 770;

	// Calculando a base de cálculo do IRPF
	var baseCalculoIrpf = salarioBruto - inss;

	// Inicializando variáveis para o cálculo do IRPF
	var irpf = 0;
	var irpfAliquotaUtilizada = 0;

	// Percorrendo as faixas do IRPF para calcular o valor acumulado
	for (var j = 0; j < irpfFaixas.length; j++) {
		if (baseCalculoIrpf <= irpfFaixas[j].limite) {
			// Calculando o IRPF utilizando a alíquota da faixa correta
			irpf += (baseCalculoIrpf - (j > 0 ? irpfFaixas[j - 1].limite : 0)) * irpfFaixas[j].aliquota;

			// Definindo a alíquota utilizada
			irpfAliquotaUtilizada = irpfFaixas[j].aliquota;

			// Saindo do loop, pois já encontrou a faixa correta
			break;
		} else {
			// Acumulando o valor da faixa atual
			irpf += (irpfFaixas[j].limite - (j > 0 ? irpfFaixas[j - 1].limite : 0)) * irpfFaixas[j].aliquota;
		}
	}

// Exibindo os resultados
console.log("Salário Bruto:", salarioBruto.toFixed(2));
console.log("INSS:", inss.toFixed(2));
console.log("Base de Cálculo IRPF:", baseCalculoIrpf.toFixed(2));
console.log("Alíquota Utilizada:", (irpfAliquotaUtilizada * 100) + "%");
console.log("IRPF:", irpf.toFixed(2));


	
	document.getElementById('labelIRPFAliquota').innerText = `${(irpfAliquotaUtilizada * 100).toFixed(2)}%`;
    document.getElementById('labelIRPFValor').innerText = `R$ ${irpf.toFixed(2)}`;

    var salarioLiquido = salarioBruto - inss - irpf - deducoes;

    document.getElementById('labelOutrasDeducoes').innerText = `R$ ${deducoes.toFixed(2)}`;
    document.getElementById('labelSalarioLiquido').innerText = `R$ ${salarioLiquido.toFixed(2)}`;
}
