class Recinto {
    constructor(bioma, tamanho, animaisPresentes, tamanhoTotal, id) {
        if (this.constructor === Recinto) {
            throw new Error("Não é possível instanciar classe abstrata recinto.");
        }
        this.bioma = bioma;
        this.tamanho = tamanho;
        this.animaisPresentes = animaisPresentes;
        this.tamanhoTotal = tamanhoTotal;
        this.id = id;
    }

    especiesDiferentes(animal) {
        for (const elemento of this.animaisPresentes) {
            if (elemento.nome != animal) {
                this.tamanho++;
                break;
            }
        }
    }

    compatibilidadeEspaco(animal, quantidade) {
        this.especiesDiferentes(animal.nome);
        const ocupacao = (animal.tamanho * quantidade);
        if ((ocupacao + this.tamanho) <= (this.tamanhoTotal)) {
            return true;
        } else {
            return false;
        }
    }

    compatibilidadeCarnivoros(animal) {
        if (animal.carnivoro) {
            for (const elemento of this.animaisPresentes) {
                if (elemento.nome != animal.nome) {
                    return false;
                }
            }
            return true;
        } else {
            for (const elemento of this.animaisPresentes) {
                if (elemento.carnivoro) {
                    return false;
                }
            }
            return true;
        }
    }

    hipopotamo(animal) {
        if (animal.nome != "HIPOPOTAMO") {
            return true;
        } else {
            for (const element of this.animaisPresentes) {
                if (element != "HIPOPOTAMO") {
                    if (this.bioma != "SavanaRio") {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
            return true;
        }

    }

    macaco(animal, quantidade) {
        if (animal.nome != "MACACO") {
            return true;
        } else if (quantidade > 1) {
            return true;
        } else if (this.tamanho > 0) {
            return true;
        } else {
            return false
        }
    }

}

class Savana extends Recinto {
    constructor(tamanho, animaisPresentes, tamanhoTotal, id) {
        super("Savana", tamanho, animaisPresentes, tamanhoTotal, id);
    }

    compatibilidadeBioma(animal) {
        if (animal == "LEAO" || animal == "LEOPARDO" || animal == "MACACO" || animal == "HIPOPOTAMO" || animal == "GAZELA") {
            return true;
        } else {
            return false
        }
    }

    aceitarAnimal(animal, quantidade) {
        if (this.compatibilidadeBioma(animal.nome) && this.compatibilidadeCarnivoros(animal) && this.compatibilidadeEspaco(animal, quantidade) && this.macaco(animal, quantidade) && this.hipopotamo(animal)) {
            return { erro: false, recintosViaveis: ("Recinto " + this.id + " (espaço livre: " + (this.tamanhoTotal - (this.tamanho + (animal.tamanho * quantidade))) + " total: " + this.tamanhoTotal + ")") }
        } else {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }
    }
}

class Floresta extends Recinto {
    constructor(tamanho, animaisPresentes, tamanhoTotal, id) {
        super("Floresta", tamanho, animaisPresentes, tamanhoTotal, id);
    }

    compatibilidadeBioma(animal) {
        if (animal == "MACACO") {
            return true;
        } else {
            return false;
        }
    }
    aceitarAnimal(animal, quantidade) {
        if (this.compatibilidadeBioma(animal.nome) && this.compatibilidadeCarnivoros(animal) && this.compatibilidadeEspaco(animal, quantidade) && this.macaco(animal, quantidade) && this.hipopotamo(animal)) {
            return { erro: false, recintosViaveis: ("Recinto " + this.id + " (espaço livre: " + (this.tamanhoTotal - (this.tamanho + (animal.tamanho * quantidade))) + " total: " + this.tamanhoTotal + ")") }
        } else {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }
    }
}

class Rio extends Recinto {
    constructor(tamanho, animaisPresentes, tamanhoTotal, id) {
        super("Rio", tamanho, animaisPresentes, tamanhoTotal, id);
    }

    compatibilidadeBioma(animal) {
        if (animal == "CROCODILO" || animal == "HIPOPOTAMO") {
            return true;
        } else {
            return false
        }
    }

    aceitarAnimal(animal, quantidade) {
        if (this.compatibilidadeBioma(animal.nome) && this.compatibilidadeCarnivoros(animal) && this.compatibilidadeEspaco(animal, quantidade) && this.macaco(animal, quantidade) && this.hipopotamo(animal)) {
            return { erro: false, recintosViaveis: ("Recinto " + this.id + " (espaço livre: " + (this.tamanhoTotal - (this.tamanho + (animal.tamanho * quantidade))) + " total: " + this.tamanhoTotal + ")") }
        } else {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }
    }
}

class SavanaRio extends Recinto {
    constructor(tamanho, animaisPresentes, tamanhoTotal, id) {
        super("SavanaRio", tamanho, animaisPresentes, tamanhoTotal, id);
    }

    compatibilidadeBioma(animal) {
        if (animal == "LEAO" || animal == "LEOPARDO" || animal == "MACACO" || animal == "HIPOPOTAMO" || animal == "GAZELA" || animal == "CROCODILO") {
            return true;
        } else {
            return false
        }
    }

    aceitarAnimal(animal, quantidade) {
        if (this.compatibilidadeBioma(animal.nome) && this.compatibilidadeCarnivoros(animal) && this.compatibilidadeEspaco(animal, quantidade) && this.macaco(animal, quantidade) && this.hipopotamo(animal)) {
            return { erro: false, recintosViaveis: ("Recinto " + this.id + " (espaço livre: " + (this.tamanhoTotal - (this.tamanho + (animal.tamanho * quantidade))) + " total: " + this.tamanhoTotal + ")") }
        } else {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }
    }
}
export { Floresta, Recinto, Rio, SavanaRio, Savana };