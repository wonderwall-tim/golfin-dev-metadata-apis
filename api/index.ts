import dotenv from 'dotenv'
import app from './app';

dotenv.config()

app.listen(3001, () => {
    console.log('app is listening to 3001')
});


export { app }