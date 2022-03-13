const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getPessoas = (request, response, next) => {
    pool.query('SELECT * FROM pessoas', (error, results) => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(200).json(results.rows)
    })
}

const addPessoa = (request, response, next) => {
    const { nome, idade } = request.body

    pool.query(
        'INSERT INTO pessoas (nome, idade) VALUES ($1, $2)',
        [nome, idade],
        (error) => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Pessoa criada.' })
        },
    )
}

const updatePessoa = (request, response, next) => {
    const { codigo, nome, idade } = request.body
    pool.query('UPDATE pessoas set nome=$1, idade=$2 where codigo=$3',
        [nome, idade, codigo], error => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Pessoa atualizada.' })
        })
}

const deletePessoa = (request, response, next) => {
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM pessoas where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(201).json({ status: 'success', message: 'Pessoa apagada.' })
    })
}

const getPessoaPorID = (request, response, next) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM pessoas where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/pessoas')
    // GET endpoint
    .get(getPessoas)
    // POST endpoint
    .post(addPessoa)
    // PUT
    .put(updatePessoa)

app.route('/pessoas/:id')
    .get(getPessoaPorID)
    .delete(deletePessoa)


// Start server
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando nas porta 3003`)
})