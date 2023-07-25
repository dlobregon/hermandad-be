const { gql } = require('apollo-server')

const schema = gql`
    scalar Date
    type Sexo {
        sexo: ID!
        nombre: String!, 
        tipo_turnos: [TipoTurno!]!
        devotos: [Devoto!]!
    }

    type TipoUsuario {
        tipo_usuario: ID!
        nombre: String!
        comentario:String
        usuarios:[Usuario!]!
    }

    type Usuario {
        usuario: ID!
        nombres: String!
        apellidos: String!
        correo: String!
        password: String!
        tipo_usuario: TipoUsuario!
        habilitado: Boolean!
        tunos: [Turno!]!
        devotos: [Devoto!]!
    }

    type Procesion {
        procesion: ID!
        nombre: String!
        fecha:  Date!
        comentario: String
        habilitado: Boolean!
        turnos: [Turno!]!
    }

    type Devoto {
        devoto: ID!
        dpi: Float!
        nombres: String!
        apellidos: String!
        sexo: Sexo!
        altura: Float
        telefono: String
        email: String
        usuario: Usuario! 
        turnos: [Turno!]!
    }

    type TipoTurno {
        tipo_turno: ID!
        nombre: String!
        sexo: Sexo!
        direccion: String!
        turnos: [Turno!]!
    }

    type Turno {
        turno: ID!
        numero: Int!
        recibo: String!
        fecha: Date!
        tipo_turno: TipoTurno!
        usuario: Usuario!
        devoto: Devoto!
        procesion: Procesion!
    }

    type Query {
        devotos: [Devoto!]!
        usuarios: [Usuario!]!
    }

    type Mutation {
        createDevoto(dpi: Int!, 
            nombres: String!, 
            apellidos: String!, 
            sexo: Int!,
            altura: Float, 
            telefono: String, 
            email: String
        ): Devoto!
    }
`
module.exports = schema
