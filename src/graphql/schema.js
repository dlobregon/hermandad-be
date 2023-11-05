const { gql } = require('apollo-server')

const schema = gql`
    scalar Date
    type Sexo {
        sexo: ID!
        nombre: String!, 
        tipo_turnos: [TipoTurno!]!
        #devotos: [Devoto!]!
    }

    type TipoUsuario {
        tipo_usuario: ID!
        nombre: String!
        comentario:String
        #usuarios:[Usuario!]!
    }

    type Usuario {
        usuario: ID!
        nombres: String!
        apellidos: String!
        correo: String!
        password: String!
        tipo_usuario: TipoUsuario!
        habilitado: Boolean!
        #tunos: [Turno!]!
        #devotos: [Devoto!]!
    }

    type Procesion {
        procesion: ID!
        nombre: String!
        fecha:  Date!
        comentario: String
        habilitado: Boolean!
        #turnos: [Turno!]!
    }

    type Devoto {
        devoto: ID!
        dpi: Float!
        nombres: String!
        apellidos: String!
        #sexo: Sexo!
        sexo: Int
        altura: Float
        telefono: String
        email: String
        #usuario: Usuario! 
        #turnos: [Turno!]!
    }

    type TipoTurno {
        tipo_turno: ID!
        nombre: String!
        sexo: Sexo!
        direccion: String!
        #turnos: [Turno!]!
    }

    type Turno {
        turno: ID!
        numero: Int!
        recibo: String!
        fecha: Date!
        tipo_turno: Int
        usuario: Int
        devoto: Int
        procesion: Int
    }

    type Query {
        devotos: [Devoto!]!
        usuarios: [Usuario!]!
    }

    type Mutation {
        createDevoto(dpi: Float!, 
            nombres: String!, 
            apellidos: String!, 
            sexo: Int!,
            altura: Float, 
            telefono: String, 
            email: String
        ): Devoto!

        editDevoto(
            devoto: ID!,
            dpi: Float!, 
            nombres: String!, 
            apellidos: String!, 
            sexo: Int!,
            altura: Float, 
            telefono: String, 
            email: String
        ): Devoto!

        createTurno(
            numero: Int!,
            recibo: Int!,
            fecha: Date!,
            tipo_turno: Int!,
            usuario: Int!,
            devoto: Int!,
            procesion: Int!
        ): Turno!
    }
`
module.exports = schema
