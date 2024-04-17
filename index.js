import express from "express";

const app = express()
const port = 3000

app.use(express.json())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

let alunos = []
let habilidades = []

// Lista todos os alunos

app.get('/alunos', (req, res) => {
    res.json(alunos.map(({ ra, nome, turma }) => ({ ra, nome, turma })))
})

// Lista aluno filtrado pelo RA

app.get('/alunos/:ra', (req, res) => {
    const ra = parseInt(req.params.ra)
    const index = alunos.find(x => x.ra == ra)

    if (index) {
        res.json({ nome: index.nome, turma: index.turma, habilidades: index.habilidades })
    } else return res.status(400).json({ error: 'Aluno não encontrado..' })
})

// POST - Adiciona um aluno na lista

app.post('/alunos', (req, res) => {
    alunos.push(req.body)
    res.json(req.body)
})

// POST - Adiciona um curso para o aluno

app.post('/alunos/:ra/adiciona-curso/', (req, res) => {
    const ra = parseInt(req.params.ra);
    const habilidade = req.body.habilidade;
    const aluno = alunos.find(a => a.ra === ra);
    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado.' });
    }
   
    aluno.habilidades.push(habilidade);
    res.status(201).json(aluno);
})

// PUT - Alterar os dados de um aluno através do RA

app.put('/alunos/:ra', (req, res) => {
    const ra = parseInt(req.params.ra);
    const novosDados = req.body;
    const index = alunos.findIndex(a => a.ra === ra);
    if (index === -1) {
        return res.status(404).json({ error: 'Aluno não encontrado.' });
    }
    alunos[index] = { ...alunos[index], ...novosDados };
    res.json(alunos[index]);
})

// PUT - Alterar os dados dos cursos do aluno

app.put('/alunos/:ra/habilidades/', (req, res) => {
    const ra = parseInt(req.params.ra);
    const habilidades = req.body.habilidades;
    const aluno = alunos.find(a => a.ra === ra);
    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado.' });
    }
    aluno.habilidades = habilidades;
    res.json(aluno);
})

// DELETE - Deleta um aluno

app.delete('/alunos/:ra', (req, res) => {
    const ra = parseInt(req.params.ra);
    const index = alunos.findIndex(a => a.ra === ra);
    if (index === -1) {
        return res.status(404).json({ error: 'Aluno não encontrado.' });
    }
    alunos.splice(index, 1);
    res.sendStatus(204);
})

// DELETE - Deleta uma habilidade de um aluno

app.delete('/alunos/:ra/habilidades/:habilidade', (req, res) => {
    const ra = parseInt(req.params.ra);
    const habilidade = req.params.habilidade;
    const aluno = alunos.find(a => a.ra === ra);
    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado.' });
    }
    const index = aluno.habilidades.indexOf(habilidade);
    if (index === -1) {
        return res.status(404).json({ error: 'Habilidade não encontrada para este aluno.' });
    }
    aluno.habilidades.splice(index, 1);
    res.sendStatus(204);
})