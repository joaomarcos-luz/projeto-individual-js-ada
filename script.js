const enviarEmail = require('./email');

const informacoesVeiculos = {
  maisVendidos: ["Gol", "Corola", "Onix"],
  novosVeiculos: ["Polo", "Civic", "Cruze"],
};

const montarCorpoEmail = (nome) => {
  const maisVendidos = informacoesVeiculos.maisVendidos.join(", ");
  const novosVeiculos = informacoesVeiculos.novosVeiculos.join(", ");

  return `
      Olá ${nome}
      Bem-vindo à CarStore! Confira nossas ofertas exclusivas esta semana:
      
      - Veículos Mais Vendidos: ${maisVendidos}
      - Novos Veículos na Loja: ${novosVeiculos}
      
      Não perca a oportunidade de adquirir o carro dos seus sonhos!
  `
}

const getDiaSemana = () => {
  const diasSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
  const dia = new Date().getDay()
  return diasSemana[dia];
};

const enviarEmailCliente = (objClient, funcDate, funcCorpo) => {
  let novaLista = objClient.filter(c => c.decisaoMarketing === "sim")
    if(funcDate() === "Segunda-Feira"){
      for (const cliente of novaLista) {
          enviarEmail(cliente.email, "Novidades da semana", funcCorpo(cliente.nome))
      }
    }else{
      return "Hoje não é o dia de enviar E-mail."
    }
}

const listaClientes = [
  {nome: "Jose",  email: "jose@gmail.com", decisaoMarketing: "sim" },
  {nome: "maria",  email: "maria@gmail.com", decisaoMarketing: "sim" },
  {nome: "João",  email: "joao@gmail.com", decisaoMarketing: "sim" },
  {nome: "Ana", email: "ana@gmail.com", decisaoMarketing: "não" },
];

console.log(enviarEmailCliente(listaClientes, getDiaSemana, montarCorpoEmail))