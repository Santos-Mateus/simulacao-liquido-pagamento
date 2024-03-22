const btnMobile = document.getElementById('btn-mobile');
const formulario = document.getElementById('formulario');

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    const nav = document.getElementById('nav');
    
    nav.classList.toggle('active');
    const active = nav.classList.contains('active');
    
    event.currentTarget.setAttribute('aria-expended', active);
    if (active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar menu')
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir menu')
    }
}

function calcularInss() {
    let salarioBruto = parseFloat(document.getElementById('salario-bruto').value);
    salarioBruto *= 1000;

    if (salarioBruto <= 1412) {
        return salarioBruto * 0.075;
    } else if (salarioBruto > 1412 && salarioBruto <= 2666.68) {
        return (salarioBruto * 0.09) - 21.18;
    } else if (salarioBruto > 2666.68 && salarioBruto <= 4000.03) {
        return (salarioBruto * 0.12) - 101.18;
    } else if (salarioBruto > 4000.03 && salarioBruto < 7786.03) {
        return (salarioBruto * 0.14) - 181.18;
    } else {
        return 908.86; 
    }

}

function calcularIrrf() {
    let salarioBruto = parseFloat(document.getElementById('salario-bruto').value);
    salarioBruto *= 1000;
    const dependentes = document.getElementById('dependentes').value;
    const deducaoDependenteIrrf = dependentes * 189.59;
    const baseIrrf = salarioBruto - calcularInss() - deducaoDependenteIrrf;
    let irrf = 0;

    if (baseIrrf <= 2259.20) {
        return baseIrrf * 0;
    } else if (baseIrrf > 2259.20 && baseIrrf <= 2826.65) {
        return (baseIrrf * 0.075) - 169.44;
    } else if (baseIrrf > 2826.65 && baseIrrf <= 3751.05) {
        return (baseIrrf * 0.15) - 381.44;
    } else if (baseIrrf > 3751.05 && baseIrrf < 4664.68) {
        return (baseIrrf * 0.225) - 662.77;
    } else {
        return (baseIrrf * 0.275) - 896;       
    }
}

formulario.addEventListener('submit', event => {
    event.preventDefault();

    // CAPTAÇÃO DE DADOS DO FORMULÁRIO
    const salarioBruto = document.getElementById('salario-bruto').value;
    const descontos = document.getElementById('descontos').value;
     
    document.getElementById('resultado').classList.remove('hidden');

    // CÁLCULOS: TOTAL DE DESCONTOS, VALOR LÍQUIDO, ALÍQUOTA REAL INSS E IRRF
    const aliquotaInss = (calcularInss() / parseFloat(salarioBruto)) / 10;
    const aliquotaIrrf = (calcularIrrf() / parseFloat(salarioBruto)) / 10;
    const totalDescontos = parseFloat(descontos) + calcularInss() + calcularIrrf();
    function calcularLiquido() {
        let salarioBruto = parseFloat(document.getElementById('salario-bruto').value);
        salarioBruto *= 1000;
    
        return salarioBruto - totalDescontos;
    }

    // INCLUSÃO DE INFORMAÇÕES NA TABELA
    document.getElementById('salario').textContent = (parseFloat(salarioBruto) * 1000).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    document.getElementById('tabela-descontos').textContent = parseFloat(descontos).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    
    document.getElementById('aliquota-inss').textContent = aliquotaInss.toFixed(2).replace('.', ',') + '%';
    document.getElementById('valor-inss').textContent = calcularInss().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    
    document.getElementById('aliquota-irrf').textContent = aliquotaIrrf.toFixed(2).replace('.', ',') + '%';
    document.getElementById('valor-irrf').textContent = calcularIrrf().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    
    document.getElementById('total-proventos').textContent = (parseFloat(salarioBruto) * 1000).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    document.getElementById('total-descontos').textContent = totalDescontos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    
    document.getElementById('liquido').textContent = calcularLiquido().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    
}
)

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);
