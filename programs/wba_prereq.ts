export type WbaPrereq = {
    version: "0.1.0";
    name: "wba_prereq";
    instructions: [
      {
        name: "initialize";
        accounts: [
          {
            name: "initializer";
            isMut: true;
            isSigner: true;
          }
        ];
        args: [];
      }
    ];
    accounts: [
      {
        name: "initializerAccount";
        type: {
          kind: "struct";
          fields: [
            {
              name: "initializer";
              type: "publicKey";
            }
          ];
        };
      }
    ];
  };
  
  export const IDL: WbaPrereq = {
    version: "0.1.0",
    name: "wba_prereq",
    instructions: [
      {
        name: "initialize",
        accounts: [
          {
            name: "initializer",
            isMut: true,
            isSigner: true
          }
        ],
        args: []
      }
    ],
    accounts: [
      {
        name: "initializerAccount",
        type: {
          kind: "struct",
          fields: [
            {
              name: "initializer",
              type: "publicKey"
            }
          ]
        }
      }
    ]
  };
  