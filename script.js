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


formulario.addEventListener('submit', event => {
    event.preventDefault();

    // CAPTAÇÃO DE DADOS DO FORMULÁRIO
    const salarioBruto = document.getElementById('salario-bruto').value;
    const descontos = document.getElementById('descontos').value;
    const dependentes = document.getElementById('dependentes').value;

    //CÁLCULO INSS
    let inss = 0;
    let aliquotaInss = 0;
    
    if (salarioBruto <= 1412) {
        inss = salarioBruto * 0.075;
        aliquotaInss = (inss / salarioBruto) * 100;
    } else if (salarioBruto > 1412 && salarioBruto <= 2666.68) {
        inss = (salarioBruto * 0.09) - 21.18;
        aliquotaInss = (inss / salarioBruto) * 100;
    } else if (salarioBruto > 2666.68 && salarioBruto <= 4000.03) {
        inss = (salarioBruto * 0.12) - 101.18;
        aliquotaInss = (inss / salarioBruto) * 100;
    } else if (salarioBruto > 4000.03 && salarioBruto < 7786.03) {
        inss = (salarioBruto * 0.14) - 181.18;
        aliquotaInss = (inss / salarioBruto) * 100;
    } else {
        inss = 908.86;
        aliquotaInss = (inss / salarioBruto) * 100;     
    }

    // CÁLCULO IRRF
    let irrf = 0;
    let aliquotaIrrf = 0;
    const deducaoDependente = dependentes * 189.59;
    const baseIrrf = salarioBruto - inss - deducaoDependente;

    if (baseIrrf <= 2259.20) {
        irrf = baseIrrf * 0;
        aliquotaIrrf = 0;
    } else if (baseIrrf > 2259.20 && baseIrrf <= 2826.65) {
        irrf = (baseIrrf * 0.075) - 169.44;
        aliquotaIrrf = (irrf / salarioBruto) * 100;
    } else if (baseIrrf > 2826.65 && baseIrrf <= 3751.05) {
        irrf = (baseIrrf * 0.15) - 381.44;
        aliquotaIrrf = (irrf / salarioBruto) * 100;
    } else if (baseIrrf > 3751.05 && baseIrrf < 4664.68) {
        irrf = (baseIrrf * 0.225) - 662.77;
        aliquotaIrrf = (irrf / salarioBruto) * 100;
    } else {
        irrf = (baseIrrf * 0.275) - 896;
        aliquotaIrrf = (irrf / salarioBruto) * 100;
        
    }
    
    document.getElementById('resultado').classList.remove('hidden');

    // CÁLCULO TOTAL DE DESCONTOS
    const totalDescontos = parseFloat(descontos) + inss + irrf;
    const valorLiquido = salarioBruto - totalDescontos;


    // INCLUSÃO DE INFORMAÇÕES NA TABELA
    document.getElementById('salario').textContent = salarioBruto;
    document.getElementById('tabela-descontos').textContent = descontos.replace('.', ',');
    document.getElementById('total-proventos').textContent = salarioBruto.replace('.', ',');

    document.getElementById('valor-inss').textContent = inss.toFixed(2).replace('.', ',');
    document.getElementById('aliquota-inss').textContent = aliquotaInss.toFixed(2).replace('.', ',') + '%';

    document.getElementById('valor-irrf').textContent = irrf.toFixed(2).replace('.', ',');
    document.getElementById('aliquota-irrf').textContent = aliquotaIrrf.toFixed(2).replace('.', ',') + '%';
    document.getElementById('total-descontos').textContent = totalDescontos.toFixed(2).replace('.', ',');
    document.getElementById('liquido').textContent = valorLiquido.toFixed(2).replace('.', ',');

    
}
)

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);