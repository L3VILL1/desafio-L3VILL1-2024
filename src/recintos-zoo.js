import { Recinto, Floresta, Rio, SavanaRio, Savana } from './Recinto';

class RecintosZoo {
    constructor() {
        this.animais = [
            { nome: 'LEAO', tamanho: 3, carnivoro: true },
            { nome: 'LEOPARDO', tamanho: 2, carnivoro: true },
            { nome: 'CROCODILO', tamanho: 3, carnivoro: true },
            { nome: "MACACO", tamanho: 1, carnivoro: false },
            { nome: "GAZELA", tamanho: 2, carnivoro: false },
            { nome: "HIPOPOTAMO", tamanho: 4, carnivoro: false },
        ];

        const animalMap = this.animais.reduce((map, animal) => {
            map[animal.nome] = animal;
            return map;
        }, {});

        this.recintos = [
            new Savana(3, [animalMap["MACACO"], animalMap["MACACO"], animalMap["MACACO"]], 10, 1),
            new Floresta(0, [], 5, 2),
            new SavanaRio(2, [animalMap["GAZELA"]], 7, 3),
            new Rio(0, [], 8, 4), //TIRAR GAZELA
            new Savana(3, [animalMap["LEAO"]], 9, 5),
        ];
    }

    analisaRecintos(animal, quantidade) {
        animal = this.animais.find(a => a.nome === animal);
        if (animal == undefined) {
            return { erro: "Animal inválido", recintosViaveis: false };
        } else if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: false };
        } else {
            let recintosViaveis = [];

            for (const recinto of this.recintos) {
                const resultado = recinto.aceitarAnimal(animal, quantidade);
                if (resultado.erro === false) {
                    recintosViaveis.push(resultado.recintosViaveis);
                }
            }

            if (recintosViaveis.length > 0) {
                return { erro: false, recintosViaveis: recintosViaveis };
            } else {
                return { erro: "Não há recinto viável", recintosViaveis: false };
            }
        }
    }
}

export { RecintosZoo as RecintosZoo };