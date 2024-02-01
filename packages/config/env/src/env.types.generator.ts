import * as dotenv from 'dotenv'
const result = dotenv.config()

if (result.error) {
  throw result.error
}

const generateInterface = (parsed:Record<string,string>) => {
  const keys = Object.keys(parsed).sort()
  process.stdout.write('export const BiproxiRuntimeConfigSchema = z.object({\n')
  keys.map((k) => {
    process.stdout.write(`  ${k}: z.string().min(1),\n`)
    return null
  })
  process.stdout.write('})\n\n')
  process.stdout.write(`export type BiproxiRuntimeConfig = z.infer<typeof BiproxiRuntimeConfigSchema>\n\n`)
}

const generateEnvironment = (parsed:Record<string,string>) => {
  process.stdout.write('export const getRuntimeConfig = (cfg: BiproxiRuntimeConfig): BiproxiRuntimeConfig => ({\n')
  // process.stdout.write('  return {\n');
  Object.keys(parsed).sort().map((k) => {
    // const v = parsed[k]
    // isNaN(v) ? (v === 'true' || v === 'false' ? ` ? process.env.${k} === 'true' : undefined` : ``) : `? Number(process.env.${k}) : undefined`
    process.stdout.write(`  ${k}: cfg.${k},\n`)
    return null
  })
  // process.stdout.write('  };\n');
  process.stdout.write('})\n')
}

process.stdout.write('/*\n * Do Not Manually Modify\n * Generated with env.types.generator.ts\n */\n\n')
process.stdout.write(`import {z} from 'zod'\n\n`)
generateInterface(result.parsed as Record<string,string>)
generateEnvironment(result.parsed as Record<string,string>)
