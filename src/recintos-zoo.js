const recintos = [
    { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'macaco', quantidade: 3 }] },
    { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
    { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'gazela', quantidade: 1 }] },
    { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
    { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'leao', quantidade: 1 }] },
];

const animais = {
    leao: { tamanho: 3, bioma: ['savana'], carnivoro: true },
    leopardo: { tamanho: 2, bioma: ['savana'], carnivoro: true },
    crocodilo: { tamanho: 3, bioma: ['rio'], carnivoro: true },
    macaco: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
    gazela: { tamanho: 2, bioma: ['savana'], carnivoro: false },
    hipopotamo: { tamanho: 4, bioma: ['savana e rio'], carnivoro: false },
};


class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        if (!animais[animal.toLowerCase()]) {
            return "Animal inválido";
        }
    
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return "Quantidade inválida";
        }
    
        const animalInfo = animais[animal.toLowerCase()];
        const recintosViaveis = [];
    
        recintos.forEach(recinto => {
            let espacoOcupado = recinto.animais.reduce((total, animal) => total + (animais[animal.especie.toLowerCase()].tamanho * animal.quantidade), 0);
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
            
            if (animalInfo.bioma.includes(recinto.bioma)) {
                if (espacoLivre >= (animalInfo.tamanho * quantidade)) {
                    if (recinto.animais.length > 0) {
                        const primeiroAnimal = recinto.animais[0].especie.toLowerCase();
                        if (animais[primeiroAnimal].carnivoro && animais[animal.toLowerCase()].carnivoro && primeiroAnimal !== animal.toLowerCase()) {
                            return; 
                        }
                        if (animal.toLowerCase() === 'hipopotamo' && recinto.bioma !== 'savana e rio') {
                            return;
                        }
                        if (animal.toLowerCase() === 'macaco' && recinto.animais.length === 0) {
                            return;
                        }
                    }
                    recintosViaveis.push(`Recinto nro ${recinto.numero} (espaço livre: ${espacoLivre - animalInfo.tamanho * quantidade} total: ${recinto.tamanhoTotal})`);
                }
            }
        });
    
        return recintosViaveis.length > 0 ? recintosViaveis.sort((a, b) => a.numero - b.numero) : "Não há recinto viável";
    }

}

export { RecintosZoo as RecintosZoo };
