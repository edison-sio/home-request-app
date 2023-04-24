const mongoose = require('mongoose');
const UserModel = require('./models/User');

const uri = 'mongodb://root:example@localhost:27017';
mongoose.connect(uri).then(() => {
    console.log('connected');
})

const main = async () => {
    // const result = await UserModel.findOne({ username: 'admin' });
    const result = await UserModel.updateOne(
        {
            username: 'test',
            token: '',
        },
        {
            $set: {
                username: 'testUser',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNjgyMzA0NjE4fQ.s8W5NLwPQyGwCZKksN3pLNxVOemPI_7fmtNWXB9VbG0',
            }
        }
    );
    console.log(result);
}

main();
