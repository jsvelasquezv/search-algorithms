import * as $ from "jquery";
import { Board } from "./src/Board";
import { Agent } from "./src/Agent";

let board = new Board();
let agent = new Agent();

$(document).on('click', "button[data-role='erase-cell']", function(){
    $('td').off('click');
    $('td').on('click', function() {
        let x = $(this).data('x');
        let y = $(this).data('y');
        board.drawPoint(x, y, Board.EMPTY_PLACE, true);
    });
});

$(document).on('click', "button[data-role='place-walls']", function(){
    // agent.bresenham(board, 0, 0, 3, 6);
    $('td').off('click');
    $('td').on('click', function() {
        let x = $(this).data('x');
        let y = $(this).data('y');
        board.drawPoint(x, y, Board.WALL_BLOCK, true);
    });

});

$(document).on('click', "button[data-role='place-agent']", function(){
    $('td').off('click');
    $('td').on('click', function() {
        let x = $(this).data('x');
        let y = $(this).data('y');
        board.drawPoint(x, y, Board.AGENT, true);
    });
});

$(document).on('click', "button[data-role='place-goal']", function(){
    $('td').off('click');
    $('td').on('click', function() {
        let x = $(this).data('x');
        let y = $(this).data('y');
        board.drawPoint(x, y, Board.GOAL, true);
    });
});

$(document).on('click', "button[data-role='calculate-goal']", function(){
    agent.wallTracing(board);
});