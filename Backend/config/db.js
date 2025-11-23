const mongoose = require('mongoose');
const connectDB = async (uri) => {
try {
await mongoose.connect(uri, { connectTimeoutMS: 10000 });
console.log('MongoDB connected');
} catch (err) {
console.error(err);
process.exit(1);
}
};
module.exports = connectDB;