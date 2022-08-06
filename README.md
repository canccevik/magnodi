<p align="center">
<img src="https://i.imgur.com/aUFQrKY.jpg" alt="MagnoDI Logo" width="500" height="150"/>
</p>

<br>

<p align="center">💉A simple dependency injection package for TypeScript.</p>

## Features

- Lightweight
- Constructor based injection
- Property based injection
- Easy usage with TS decorators

## Installation

Using npm:

```js
npm install magnodi reflect-metadata
```

Import the reflect-metadata package at the first line of your application:

```js
import 'reflect-metadata'

// your code comes here after you imported the reflect-metadata package
```

As a last step, you need to enable emitting decorator metadata in your Typescript config. Add these two lines to your tsconfig.json file under the compilerOptions key:

```js
"emitDecoratorMetadata": true,
"experimentalDecorators": true
```

## Constructor Based Injection

```ts
import { Container, Injectable } from 'magnodi'

@Injectable()
class ExampleInjectedService {
  sayHi() {
    console.log('Hi from injected service!')
  }
}

@Injectable()
class ExampleService {
  constructor(private injectedService: ExampleInjectedService) {}

  greet() {
    this.injectedService.sayHi()
  }
}

const exampleService = Container.resolve<ExampleService>(ExampleService)

exampleService.greet()
// Output: 'Hi from injected service!'
```

## Property Based Injection

```ts
import { Container, Injectable, Inject } from 'magnodi'

@Injectable()
class UserService {
  private users = [{ id: 1, name: 'John Doe' }]

  getUsers() {
    return this.users
  }
}

@Injectable()
class App {
  @Inject()
  private userService!: UserService

  printUsers() {
    const users = this.userService.getUsers()
    console.log(users)
  }
}

const app = Container.resolve<App>(App)

app.printUsers()
// Output: [{ id: 1, name: 'John Doe' }]
```

## Contributing

1. Fork this repository.
2. Create a new branch with feature name.
3. Create your feature.
4. Commit and set commit message with feature name.
5. Push your code to your fork repository.
6. Create pull request.

## License

[MIT](https://github.com/canccevik/magno-di/blob/master/LICENSE)

Copyright (c) 2022 [Can Çevik](https://github.com/canccevik)
