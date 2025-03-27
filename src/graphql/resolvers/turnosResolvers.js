const { turnoController } = require('../../controllers')

const createTurno = (parent, args, context) => {
  const newTurno = { ...args }
  return turnoController.createTurno(newTurno)
}

const turnosByProcesion = (parent, args, context) => {
  return turnoController.turnosByProcesion(args)
}

const disponiblesByProcesion = (parent, args, context) => {
  return turnoController.disponiblesByProcesion(args)
}

const checkDevotoExtraordinario = async (parent, args, context) => {
  const extraordinarioCount = await turnoController.checkDevotoExtraordinario(args)
  const tieneListaDeEspera = await turnoController.checkDevotoListaEspera(args)
  const tieneExtaordinarioCortejo = await turnoController.checkDevotoExtraordinarioProcesion(args)

  return {
    tipo_turno: args.tipo_turno,
    tiene_extraordinario: extraordinarioCount > 0,
    en_lista_espera: tieneListaDeEspera > 0,
    ya_cuenta_extraordinario: tieneExtaordinarioCortejo > 0,
    devoto: args.devoto,
    devoto_extraordinario: extraordinarioCount
  }
}

const guardarExtraordinarioProcesion = (parent, args, context) => {
  return turnoController.guardarExtraordinarioProcesion(args)
}

const guardarDevotoListaEspera = (parent, args, context) => {
  return turnoController.guardarDevotoListaEspera(args)
}

const getClaves = (parent, args, context) => {
  return turnoController.getClave(args)
}

const getClavesDetalleTipoTurno = (parent, args, context) => {
  return turnoController.getClavesDetalleTipoTurno(args)
}

const agregarNuevaClave = (parent, args, context) => {
  return turnoController.agregarNuevaClave(args)
}

const comprarClave = (parent, args, context) => {
  return turnoController.comprarClave(args)
}

const inscribir = (parent, args, context) => {
  return turnoController.inscribir(args)
}

module.exports = {
  createTurno,
  turnosByProcesion,
  disponiblesByProcesion,
  checkDevotoExtraordinario,
  guardarExtraordinarioProcesion,
  guardarDevotoListaEspera,
  getClaves,
  getClavesDetalleTipoTurno,
  agregarNuevaClave,
  comprarClave,
  inscribir
}
