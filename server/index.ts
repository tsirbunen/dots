import { startServer } from './server'

const startDotsServer = async () => {
    await startServer()
}

try {
    void startDotsServer()
} catch (error) {
    console.log(error)
}