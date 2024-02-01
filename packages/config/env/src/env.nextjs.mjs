import dotenv from "dotenv-vault"

export const configEnv = () => {
  const serverConfig = dotenv.config({path: '../../.env'}).parsed ?? dotenv.config({path: '../../.env.vault'}).parsed ?? process.env
  const publicConfig = Object.keys(serverConfig)
    .filter((key) => key.startsWith('NEXT_PUBLIC'))
    .reduce((obj, key) => {
      return Object.assign(obj, {
        [key]: serverConfig[key]
      })
    }, {})
  if(serverConfig?.DOTENV_VAULT) {
    console.error("ERROR ACCESSING DOTENV VAULT:  Is DOTENV_KEY set?")
    // console.log(`${JSON.stringify(serverConfig, null, 2)} - serverConfig`)
  }
  // console.log(`${JSON.stringify(publicConfig, null, 2)} - publicConfig`)
  return {serverConfig, publicConfig}
}
