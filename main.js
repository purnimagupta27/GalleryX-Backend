import 'dotenv/config'
import app from "./src/app.js"

const PORT = process.env.PORT

// console.log(process.env.POSTGRES_URL)

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))