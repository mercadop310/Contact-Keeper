const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//async await style
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Mongodb Connected');
  } catch (error) {
    console.error(error.message);
    //cancels process
    process.exit(1);
  }
};

// const connectDB = () => {
//   mongoose
//     .connect(db, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log('Mongodb Connected'))
//     .catch((err) => {
//       console.error(err.message);
//       //cancels process
//       process.exit(1);
//     });
// };

module.exports = connectDB;
