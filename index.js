import express from 'express';
import graphlHTTP from 'express-graphql';
const app = express();
import schema from './schema';
// const apiRoutes = require('./routes/apiRoutes');
// app.use("/api", apiRoutes);


app.get('/',(req,res) => {
	return res.json({
		msg: 'welcome to world'
	})
})
const root = {};
app.use('/graphql', graphlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
}))
app.listen(8000, () => {
    console.log("app workingin 8000"); 
})