const { ApolloServer, UserInputError, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

// 创建模式
const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }
  
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }  
`

// 创建查询解析器
const resolvers = {
  // 如果默认解析器不满足场景的需要时，可以自定义解析器
  Person: {
    address: (parent) => {
      return {
        street: parent.street,
        city: parent.city
      }
    }
  },
  Query: {
    personCount: () => persons.length,
    allPersons: (parent, args) => {
      if (!args.phone) {
        return persons
      }
      return persons.filter((person) => args.phone === 'YES' ? person.phone : !person.phone);
    },
    // 解析器的参数由graph引擎提供，是固定的四个parent, args, context, info。具体解释可以参考官网链接https://www.apollographql.com/docs/tutorial/resolvers/
    findPerson: (parent, args) => {
      return persons.find(p => p.name === args.name)
    }
  },
  Mutation: {
    addPerson: (parent, args) => {
      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name
        })
      }
      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    },
    editNumber: (parent, args) => {
      const person = persons.find(p => p.name === args.name)
      if (!person) {
        return null
      }

      const updatedPerson = { ...person, phone: args.phone }
      persons = persons.map(p => p.name === args.name ? updatedPerson : p)
      return updatedPerson
    }
  }
}

// 创建阿波罗服务器并启动
const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
})