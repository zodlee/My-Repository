import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_TEST, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			// useCreateIndex: true,
		})

		console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch (error) {
		console.log(`Error: ${error}`)
		process.exit(1)
	}
}

export default connectDB