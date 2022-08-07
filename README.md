# Real-world like example for injectable-react

1. `yarn install`
1. `yarn server`
1. `yarn client`

## Project structure


```sh
└── src/
    ├── app/                                 # Application bootstrap point
    |   └── resolved.ts                      #     All resolved entities lives here
    |                                        #
    ├── hooks/                               # UI hooks
    |                                        #
    ├── injectable/index.ts                  # Configured injectable instance
    |                                        #
    ├── modules/                             # Modules separated by domain
    |   ├── {some-module}/                   #     
    |   |   ├── containers/                  #         Containers belonging the module
    |   |   ├── model/                       #         Module typings. <model.ts> - domain model. <ports.ts> - module adapters typings
    |   |   ├── ui/                          #         UI components belonging the module
    |   |   ├── utils/                       #         Shared module utils
    |   |   └── view-model/                  #         View-models belonging the module
    |   ...                                  #
    |                                        #
    ├── pages/                               # Application pages
    |                                        #
    ├── shared/                              # Shared to all modules
    |   ├── constants/                       #         Shared constants
    |   ├── containers/                      #         Shared containers
    |   ├── services/                        #         Shared services
    |   └── utils/                           #         Shared utils
    |   ...                                  #
    |                                        #
    ├── pages/                               # Application pages
    |                                        #
    ├── uikit/                               # Shared non-business UI components
    |                                        #
    └── index.tsx/                           # Application entry point
```