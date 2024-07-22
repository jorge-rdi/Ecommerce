require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
require("./config/mongoose.config");
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: [
            `${process.env.API_URL}`,"https://zdq13561-3000.brs.devtunnels.ms"]}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const postRoutes = require("./routes/post.routes");
app.use('/api/post', postRoutes);

const sessionRoutes = require('./routes/session.routes');
app.use("/api/session", sessionRoutes);

const userRoutes = require('./routes/user.routes');
app.use("/api/user", userRoutes);


app.listen(port, () => console.log(`listen port: ${port}`));
