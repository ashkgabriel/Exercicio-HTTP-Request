import express from "express";

const app = express()
const port = 3000

app.use(express.json())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

let alunos = []
let habilidades = []

// let alunos = [
// {
// "ra": 123, 
// "nome": "Diego", 
// "turma": "ADS",
// "habilidades": ['Javascript', 'ReactJS', 'Redux']
// },
//     {
//         "ra": 123, 
//         "nome": "Leandro", 
//         "turma": "DSM",
//         "habilidades": ['VueJS', 'Ruby on Rails', 'Node']
//     }
// ]

// Lista todos os alunos

app.get('/alunos', (req, res) => {
    res.json(alunos)
})

// POST - Adiciona um aluno na lista

app.post('/alunos', (req, res) => {
    alunos.push(req.body)
    res.json(req.body)
})

// POST - Adiciona um curso para o aluno

app.post('/alunos/adiciona-curso/', (req, res) => {
    const index = alunos.findIndex(x => x.ra == req.query.ra)

    alunos.push(req.body.habilidades)
    res.json(req.body)
})

// PUT - Alterar os dados de um aluno através do RA

app.put('/alunos/', (req, res) => {
    const index = alunos.findIndex(x => x.ra == req.query.ra)
    alunos[index] = { ra: req.body.ra, nome: req.body.nome, turma: req.body.turma, habilidades: alunos[index].habilidades }
    res.send(JSON.stringify(alunos[index]))
})

// PUT - Alterar os dados dos cursos do aluno

app.put('/alunos/habilidades/', (req, res) => {
    const index = alunos.findIndex(x => x.ra == req.query.ra)
    alunos[index] = { habilidades: habilidades.push(req.body.habilidades) }
    res.send(JSON.stringify(alunos[index]))
})

// 