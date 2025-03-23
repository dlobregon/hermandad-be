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
        tipo_procesion:Int!
        sexo: Int!
        brazos: Int!
        total_turnos: Int
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

    type ReporteTurno {
        turno: Int!
        dpi: Float!
        nombres: String!
        apellidos: String!
        nombre_procesion: String!
        cantidad: Int
        fecha: Date!
        nombre_turno: String!
        recibo: Int
    }

    type TurnoDisponibles  {
        tipo_turno: Int!
        nombre: String!
        disponibles: Int!
        extraordinario: Boolean!
    }

    type TieneExtraordinario {
        tipo_turno: Int!
        tiene_extraordinario: Boolean!
        en_lista_espera: Boolean!
        ya_cuenta_extraordinario: Boolean!
        devoto: Int!
        devoto_extraordinario: Int!
    }

    type CortejoExtraordinario  {
        procesion:    Int
        tipo_turno:   Int
        devoto:       Int
        devoto_extraordinario: Int
        fecha:       String!
        consesion:   String
        comentario:  String
        recibo:      String
    }

    type DevotoListaEsperaProcesion {
        tipo_turno: Int! 
        tipo_procesion: Int! 
        devoto: Int! 
    }

    type DevotoClave {
        clave: String!
    }
    
    type DetalleTipoTurnoClave {
        nombre_tipo_turno: String!
        clave: String!
        disponible: Boolean!
    }

    type Query {
        devotos: [Devoto]!
        usuarios: [Usuario]!
        procesionesHabilitadas: [Procesion]!
        procesiones: [Procesion]!
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

        turnosByProcesion(procesion: Int!) : [ReporteTurno!]!
        
        disponiblesByProcesion(
            procesion: Int!,
            tipo_procesion: Int!,
        ): [TurnoDisponibles]

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
            procesion: Int!, 
            cantidad: Int!
        ): Turno!

        guardarExtraordinarioProcesion(
            procesion:    Int!
            tipo_turno:   Int!
            devoto:       Int!
            devoto_extraordinario: Int!
            fecha:       String!
            consesion:   String
            comentario:  String
            recibo:      String
        ): CortejoExtraordinario!

        guardarDevotoListaEspera(
            tipo_turno: Int! 
            tipo_procesion: Int! 
            devoto: Int! 
        ): DevotoListaEsperaProcesion!

        checkDevotoExtraordinario(
            devoto: Int!,
            tipo_turno: Int!,
            procesion: Int!
        ): TieneExtraordinario!

        getClaves(
            devoto: Int!
        ): [DevotoClave]

        getClavesDetalleTipoTurno(
            devoto: Int!
        ): [DetalleTipoTurnoClave]
    }
`
module.exports = schema
