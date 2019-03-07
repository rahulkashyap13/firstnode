import {buildSchema} from 'graphql';

const schema = buildSchema(`
	type HackerNewsItem {
		id: Int,
		name: String
	}
	type Email {
		email: String
	}
	type User {
		firstName: String!,
		lastName: String,
		emails: [Email]
	}
	type Query {
		hello: String,
		hn: String,
		abc: String,
		item: HackerNewsItem,
		user: User
	}
`);

export default schema;
