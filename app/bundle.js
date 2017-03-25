System.register("Board", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Board;
    return {
        setters: [],
        execute: function () {
            Board = (function () {
                function Board() {
                }
                Board.prototype.printBoard = function () {
                };
                Board.prototype.getBoard = function () {
                };
                Board.prototype.saludar = function () {
                    console.log("Saludando");
                };
                return Board;
            }());
            exports_1("Board", Board);
        }
    };
});
//# sourceMappingURL=bundle.js.map