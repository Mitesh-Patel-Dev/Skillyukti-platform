const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/skillyukti').then(async () => {
    const db = mongoose.connection;
    await db.collection('courses').updateMany({}, { $set: { mobileThumbnail: 'https://i.ibb.co/3sX8M7J/sample-portrait.jpg' } });
    console.log('Database updated locally!');
    process.exit(0);
});
