import mongoose from "mongoose"

const MongoHelper = {
  client: null,
  uri: null,
  async connect (uri) {
    this.uri = uri;
    await mongoose.connect(uri);
    console.log('Connected with database 📦')
  },
  async disconnect () {
    await mongoose.connection.close()
    this.client = null
  },
  async getCollection(name) {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return mongoose.connection.collection(name)
  }
}

export { MongoHelper };