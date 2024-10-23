import fs from 'fs'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import router from './routes/todo.routes.js'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import swaggerAutogen from 'swagger-autogen'

const _dirname = dirname(fileURLToPath(import.meta.url))

const doc = {
    info: {
        title: 'Todo API',
        description: 'My todo API'
    },
    definitions: {
        Todo: {
            id: '1',
            text: 'test',
            done: false
        },
        Todos: [
            {
                $ref: '#/definitions/Todo'
            }
        ],
        Text: {
            text: 'test'
        },
        Changes: {
            changes: {
                text: 'test',
                done: true
            }
        }
    },
    host: 'localhost:3000',
    schemes: ['http']
}

const outputFile = join(_dirname, 'output.json')
const endpointsFiles = []


fs.mkdirSync('./copy/', { recursive: true })
const testFolder = './copy/';
fs.readdirSync(testFolder).forEach(file => {
    console.log(join(_dirname, "copy/" + file))
    endpointsFiles.push(join(_dirname, "copy/" + file))
});

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(
    ({ success }) => {
        console.log(`Generated: ${success}`)
    }
)

const swaggerFile = JSON.parse(fs.readFileSync('./output.json'))

const app = express()

app.use(express.json())
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/', router)
app.get('*', (req, res) => {
    res.send('Only /todos and /api-doc endpoints are available.')
})

app.use((err, req, res, next) => {
    console.log(err)
    const status = err.status || 500
    const message = err.message || 'Something went wrong. Try again later'
    res.status(status).json({message})
})

app.listen(3000, () => {
    console.log('🚀 Server ready')
})