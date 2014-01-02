var exports = exports || {};


	var Base = {
            red      : 'red', // high red
            orange   : 'orange', 
            yellow   : 'yellow',
            lime     : 'lime', // high green
            green    : 'green', // low green
            teal     : 'teal', // low cyan
            blue     : 'blue', // high blue
            purple   : 'purple', // low magenta 
            pink     : 'pink', 

            aqua     : 'aqua', // high cyan
            cyan     : 'cyan', 
            navy     : 'navy', // low blue
 
            white    : 'white', 
            lightgray: 'lightgray',
            silver   : 'silver', // lightgray
            gray     : 'gray', // darkgray
            darkgray : 'darkgray',
            black    : 'black', 

            fuchsia  : 'fuchsia', // high magenta
            magenta  : 'magenta', 
            maroon   : 'maroon', // low red

            brown    : 'brown', 
            olive    : 'olive' }; // brown?
            Base.grey = Base.gray;
	exports.Base = Base;

	var CGA = exports.CGA = {
            gray   : {light: Base.silver ,  dark: Base.gray},
            red    : {high : Base.red    ,  low : Base.maroon},
            green  : {high : Base.lime   ,  low : Base.green},
            cyan   : {high : Base.aqua   ,  low : Base.teal},
            blue   : {high : Base.blue   ,  low : Base.navy},
            magenta: {high : Base.fuchsia,  low : Base.purple }};

	var BaseToCGA = exports.BaseToCGA = {
            gray   : CGA.gray.dark,
            red    : CGA.red.high,
            green  : CGA.green.high,
            cyan   : CGA.cyan.high,
            blue   : CGA.blue.high,
            magenta: CGA.magenta.high,
            olive  : Base.brown };


	var Palette = exports.Palette = {
            Rainbow: [Base.red, Base.orange, Base.yellow, Base.lime, Base.green, Base.teal, Base.blue, Base.purple, Base.pink],
            BH: [Base.black, Base.darkgrey, Base.gray, Base.silver, Base.lightgrey, Base.white], // TODO remove 2x?
            RGB: {
                R: Base.red, 
                G: Base.green, 
                B: Base.blue },
            CMYK: {
                C: Base.cyan, 
                M: Base.magenta, 
                Y: Base.yellow, 
                K: Base.black }};


	var RGB = exports.RGB = {
            red      : {R:1                }, 
//          orange   : 'orange', 
            yellow   : {R:1,   G:1         },
            lime     : {       G:1         }, 
            green    : {       G:0.5       }, 
            teal     : {       G:0.5, B:0.5},
            blue     : {              B:1  }, 
            purple   : {R:0.5,        B:0.5}, 
//          pink     : 'pink', 

            aqua     : {       G:1,   B:1  },
//          cyan     : {       G:1,   B:1  },
            navy     : {              B:0.5}, 

            fuchsia  : {R:1,         B:1   }, 
            magenta  : {R:1,         B:1   }, 
            maroon   : {R:0.5}, 
//          brown    : 'brown', 
            olive    : {R:0.5, G:0.5       },

            white    : 1, 
            lightgray: 0.75,
            silver   : 0.75, 
            gray     : 0.5, 
            darkgray : 0.5,
            black    : 0 };


	var Composite = exports.Composite = {
            maroon   : [Base.red   , Base.black ],
            orange   : [Base.red   , Base.yellow],
            lime     : [Base.yellow, Base.green ],
            green    : [Base.yellow, Base.blue  ],
            navy     : [Base.blue  , Base.black ],
            teal     : [Base.green , Base.blue  ],
            gray     : [Base.white , Base.black ],
            lightgray: [Base.gray  , Base.white ],
            darkgray : [Base.gray  , Base.black ],
            purple   : [Base.red   , Base.blue  ],
            pink     : [Base.red   , Base.purple],
            olive    : [Base.red, Base.green, Base.black],
            brown    : [Base.red, Base.orange, Base.yellow, Base.pink, Base.black] };

