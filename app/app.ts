import * as $ from "jquery";
import { Board } from "./src/Board";

let board = new Board();

$(document).on('click', "button[data-role='erase-cell']", function(){
    $('td').off('click');
    $('td').on('click', function() {
        let x = $(this).data('x');
        let y = $(this).data('y');
        board.drawPoint(x, y, Board.EMPTY_PLACE, true);
    });
});

$(document).on('click', "button[data-role='place-walls']", function(){
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