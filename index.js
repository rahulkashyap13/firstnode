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
const root = {
	hello: () => 'Hello welcome to Node Js',
	hn: () => 'Hello welcome to Node Js',
	abc: () => 'Hello welcome to Node Js',
	item: () => {
		return {
			id: 12,
			name: 'rahul'
		}
	},
	user: () => {
		return {
			firstName: 'Rahul',
			lastName: 'Kashyap',
			emails: [
				{
					email: 'rahulk.chapter247@gmail.com'
				},
				{
					email: 'rahulk1.chapter247@gmail.com'
				}
			] 
		}
	}

};
app.use('/graphql', graphlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
}))
app.listen(8000, () => {
    console.log("app workingin 8000"); 
})