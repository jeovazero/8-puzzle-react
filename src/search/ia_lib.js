const {PQ} = require('./ia_pq.js');
// ================================================================================
// =========================== MOVIMENTOS =========================================
// Cria uma Coordenada
function Coord(x, y, s=null, code=null){
    this.x = x;           // Linha
    this.y = y;           // Coluna
    this.simbol = s;      // Simbolo do movimento (^, >, v, <)
    this.digit = null;    // Digito de 0 a 8, do numero que trocara com o ZERO
    this.code = code;      // Codigo do movimento (0, 1, 2, 3)
}

// Retorna a coordenada do ZERO na array bidimensional
function whereiszero(arr){
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[0].length; j++){
            if(arr[i][j] == 0) return new Coord(i, j);
        }
    }
    return null;
}

// Movimentos possiveis para mover o ZERO - VAZIO - VOID - SEM NADA
const MOVES = [
    new Coord(-1, 0, '^', code=0),
    new Coord(0, -1, '<', code=1),
    new Coord(1, 0, 'v', code=2),
    new Coord(0, 1, '>', code=3)
];
// ===============================================================================
// ===============================================================================
// ======================= ESTADO INICIAL  ======================================

// Construtor de um ESTADO
function State(arr, custo=0, altura=0){
    this.arr = arr;
    this.str = toStr(arr);
    this.moves = [];
    this.zero = whereiszero(arr);
    this.custo = custo;
    this.altura = altura;
}

// Testa se um ESTADO eh o final
function isNumberFinal(state){
    // console.log(st.number)
    return state.str == '123456780';
}
// ===============================================================================
// ================================= UNTIL ======================================
// Soma de dois vetores
function sum(a, b){
    x = {x: (a.x+b.x), y: (a.y+b.y)};
    return x;
}

// Matrix to STR
function toStr(Matrix){
    var sum = '';
    for(var i = 0; i < 9; i++){
        sum += Matrix[Math.floor(i/3)][i%3];
    }
    return sum;
}

const LIM = [0, 2]

// Testa se o vetor X esta no intervalo certo baseado no LIM
function test_cmp(x){
    test = function(x0, i){ return x[i] >= LIM[0] && x[i] <= LIM[1]};
    if(test(x, 'x') && test(x, 'y') == true) return true;
    return false;
}

// Troca os valores nas posicoes a,b na array do State
function swap(st,a, b){
    var x = st.arr[a.x][a.y];
    st.arr[a.x][a.y] = st.arr[b.x][b.y];
    st.arr[b.x][b.y] = x;
}

var POS = [];
POS.push([2,2]);
for(var i = 0; i < 8; i++){
    POS.push([Math.floor(i/3), i % 3]);
}
// console.log("POS", POS)
function distanceSum(estado_inicial){
    var sum = 0, n;
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(j == 2 && i == 2) continue;
            n = estado_inicial.arr[i][j];
            m = POS[n];
            sum += (Math.abs(m[0] - i)+Math.abs(m[1] - j));
        }
    }
    return sum;
}


// GENERIC ================================================
// ========================================================
function Ed( ed ){
    this.ed = ed;
    this.extract = null;
    this.add = null;
    this.calc_custo = null;
    this.set = function(e){
        this.ed = e;
    }
    this.length = function(){
        return this.ed.length;
    }
    this.name = "BUSCA";
}
// DFS -=-=--=-=-=--=-=-=-=-=-=-=-=-=-=-=
function DFS_ed(){
    Ed.call(this, []);
    this.extract = function(){
        return this.ed.pop();
    }
    this.add = function(item){
        this.ed.push(item);
    }
    this.calc_custo = function(st){
        return st.custo + 1;
    }
    this.name = "DFS";
}
// -=-=--=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=
// BFS -=-=--=-=-=--=-=-=-=-=-=-=-=-=-=-=
function BFS_ed(){
    DFS_ed.call(this);
    this.extract = function(){
        var item =this.ed[0];
        this.ed = this.ed.splice(1, this.ed.length);
        return item;
    }
    this.name = "BFS";
}
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// GREEDY  =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function GREEDY_ed(){
    Ed.call(this, new PQ());
    this.extract = function(){
        var a = this.ed.extract(); 
        // console.log(a)
        return a;
    }
    this.add = function(item){
        //console.log("ITEM: " + item);
        this.ed.add(item);
    }
    this.calc_custo = function(st){
        return distanceSum(st);
    }
    this.length = function(){
        return this.ed.size();
    }
    this.name = "GREEDY";
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// AESTRELA  =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function AESTRELA_ed(){
    GREEDY_ed.call(this);
    this.calc_custo = function(st){
        return distanceSum(st) + st.altura;
    }
    this.name = "AESTRELA";
}

function genericSearch(estado_inicial, ED){
    ED.add(estado_inicial);
    var nos_fronteira = 1;
    var nos_visitados = 0;
    var nos_ja_visitados = 0;
    var max_fronteira = 0;

    // console.log(ED);
    var atual, neo;
    var visitados = new Map();
    var str_result = [], str = [];

    var max_profundidade = 0;

    // Enquanto tiver estados na ED
    while(ED.length() > 0){
        // Retirar estado atual
        atual = ED.extract();

        // Contando os nos visitados
        nos_visitados++;

        // Calculando a profundidade maxima
        max_profundidade = Math.max(atual.altura, max_profundidade);
        max_fronteira = Math.max(ED.length(), max_fronteira);

        str = [];
        str.push("ESTOU EM:<br>" + atual.arr.join("<br>")+"<br>");
        
        // Se eh o estado final retorne o estado atual
        if(isNumberFinal(atual) == true){
            str.push("EH A SOLUCAO<br>");
            str_result.push(str.join(' '));
            return {
                estado_resultado: atual,
                logs: str_result,
                nos_visitados: nos_visitados,
                nos_fronteira: nos_fronteira,
                max_profundidade: max_profundidade,
                name: ED.name,
                ja_visitados: nos_ja_visitados,
                max_fronteira: max_fronteira
            };
        }

        // Se o estado atual ja foi visitado continue para o proximo da ED
        if(visitados.has(atual.str) == true) {
            nos_ja_visitados++;
            str.push("JA VISITADO!<br>");
            str_result.push(str.join(' '));
            continue;
        }
        // Senao adiciona-se o estado atual aos visitados
        else visitados.set(atual.str, true);

        str.push("Adicionado: <br>");

        // Para cada movimento eh gerado um novo estado
        MOVES.map(function(move){
            // Calculando a nova posicao do ZERO
            neo = sum(atual.zero, move);

            // Testa se a nova posicao do ZERO eh valida
            if(test_cmp(neo) == true){
                // Cria uma copia do estado atual
                var copy = JSON.parse(JSON.stringify(atual));

                // Numero que fez swap com o ZERO
                move.digit = copy.arr[neo.x][neo.y];

                // Trocando a pos. do elemento zero com
                // a nova posicao na copy
                swap(copy, copy.zero, neo);
                
                // Atualizando o zero de copy
                copy.zero = neo;

                // Atualizando o numero da matriz
                copy.str = toStr(copy.arr);
               
                // Adicionando o movimento de origem 
                copy.moves.push(JSON.parse(JSON.stringify(move)));
                
                // Atualizar altura
                copy.altura = atual.altura + 1;
                
                // Atualizar custo
                copy.custo = ED.calc_custo(copy);
                
                // Adicionando na ED
                ED.add(copy);

                str.push(copy.arr.join('<br>')+"<br>--custo: "+ copy.custo +"--<br><br>");

                nos_fronteira++;
            }
        });
        str_result.push(str.join(' '));
    }
    return null;
}

function DFS(estado_inicial){
    return perf(estado_inicial, new DFS_ed());
}
function BFS(estado_inicial){
    return perf(estado_inicial, new BFS_ed());
}
function GREEDY(estado_inicial){
    return perf(estado_inicial, new GREEDY_ed());
}
function AESTRELA(estado_inicial){
    return perf(estado_inicial, new AESTRELA_ed());
}

function perf(estado_inicial, ED){
    var t0 = performance.now();
    var result = genericSearch(estado_inicial, ED);
    var t1 = performance.now();
    return {time: t1-t0, resultado_busca: result};
  }

module.exports = {
    DFS,
    BFS,
    GREEDY,
    AESTRELA,
    State
}