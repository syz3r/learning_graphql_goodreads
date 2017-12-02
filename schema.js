// key: qS6uGMXwUOXQOQZllUtVDQ
// secret: Du3Bu2EUZ6mZIkqPzvtjXPGvPpQqcxsgYRCx1XA8U
const fetch = require('node-fetch')
const util = require('util')
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql')
const parseXML = util.promisify(require('xml2js').parseString)


const BookType = new GraphQLObjectType({
    name: 'Book',
    description: '...',

    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: xml => 
            xml.title[0]
            //console.log(JSON.stringify(xml, null, 2))
        },
        isbn: {
            type: GraphQLString,
            resolve: xml => xml.isbn[0]
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: '...',

    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: xml => 
            xml.GoodreadsResponse.author[0].name[0]
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: xml =>
            xml.GoodreadsResponse.author[0].books[0].book
        }
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',

        fields: () => ({
            author: {
                type: AuthorType,
                args: {
                  id: { type: GraphQLInt } 
                },
                resolve: (root, args) => fetch(`
                https://www.goodreads.com/author/show/${args.id}?format=xml&key=qS6uGMXwUOXQOQZllUtVDQ`
            )
                .then(res => res.text())
                .then(xml => parseXML(xml, {trim: true})) 
            }
        })
    })
})