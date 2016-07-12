# EmoJiS
A JavaScript interpreter with Unicode emojis. ✏ with ❤ by charredgrass.

##Dependencies

* node.js to compile, as well as the colors npm module

##Usage

Clone the repository. Compile stuff by `node`-ing the interpret.js file with certain arguments.

    node ./interpret.js ./test/HelloWorld.★js

`★` can be replaced with `STAR` if you can't type that into your terminal.

General syntax

    node [path to interpret] [file to compile] [flags]

##Language

Similar to Pyth converting code to Python, EmoJiS translates your emojis into JavaScript using macros. Some example code:

    👋🌎

(*see [HelloWorld.★js](./test/HelloWorld.★js)*) This compiles into

    console.log("Hello World!"); 
