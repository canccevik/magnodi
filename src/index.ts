import { ReflectNotFoundError } from './errors'

if (!Reflect) {
  throw new ReflectNotFoundError()
}

export { container as Container } from './container'
